import { createHash } from "node:crypto";
import { Prisma } from "@prisma/client";
import sharp from "sharp";
import { NextRequest, NextResponse, after } from "next/server";
import { notifyRequest } from "@/lib/request-notification";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { requireStaff } from "@/lib/api-access";

import { requestDetailsSchema } from "@/lib/request-details";

const applicationSchema = z
  .object({
    requestKey: z.string().uuid().optional(),
    photo: z
      .string()
      .max(800000)
      .regex(/^data:image\/jpeg;base64,[A-Za-z0-9+/]+=*$/)
      .optional(),
    type: z.enum(["NEW_BUSINESS", "RENOVATION", "WHOLESALE", "REPAIR"]),
    sectorSlug: z.string().min(1).max(100),
    details: requestDetailsSchema.optional(),
    budget: z.string().trim().max(100).optional(),
    customerNote: z.string().trim().max(2000).optional(),
    notes: z.string().max(5000).optional(),
    firstName: z.string().trim().min(2).max(100),
    lastName: z.string().trim().min(2).max(100),
    phone: z
      .string()
      .trim()
      .min(10)
      .max(30)
      .refine((value) => /^\d{10,15}$/.test(value.replace(/\D/g, ""))),
    email: z
      .union([z.string().trim().email().max(254), z.literal("")])
      .default(""),
    city: z.string().trim().max(100).optional(),
    answers: z.array(
      z.object({
        questionId: z.string(),
        value: z.unknown(),
      }),
    ),
  })
  .refine((data) => !data.details || data.details.kind === data.type, {
    message: "Service and details must match",
    path: ["details"],
  });

export async function POST(request: NextRequest) {
  try {
    const text = await request.text();
    if (Buffer.byteLength(text) > 900000)
      return NextResponse.json(
        { error: "Fotoğraf çok büyük." },
        { status: 413 },
      );
    const body = JSON.parse(text);
    const data = applicationSchema.parse(body);

    const { requestKey, ...content } = data;
    const requestHash = createHash("sha256")
      .update(JSON.stringify(content))
      .digest("hex");
    const replay = async () => {
      const previous = await prisma.application.findUnique({
        where: { requestKey: requestKey! },
        select: { id: true, requestHash: true },
      });
      if (!previous) return null;
      return previous.requestHash === requestHash
        ? NextResponse.json({ id: previous.id }, { status: 200 })
        : NextResponse.json(
            {
              error:
                "Talep bilgileri değişti. Yeni bir talep olarak tekrar gönderin.",
            },
            { status: 409 },
          );
    };
    if (requestKey) {
      const previous = await replay();
      if (previous) return previous;
    }
    let photoData: Buffer | undefined;
    if (data.photo) {
      if (data.type !== "REPAIR")
        return NextResponse.json(
          { error: "Fotoğraf yalnızca tamirat talebine eklenebilir." },
          { status: 400 },
        );
      try {
        const source = Buffer.from(data.photo.split(",")[1], "base64");
        const processor = sharp(source, { limitInputPixels: 16000000 });
        if ((await processor.metadata()).format !== "jpeg") throw Error();
        photoData = await processor
          .rotate()
          .resize({
            width: 1200,
            height: 1200,
            fit: "inside",
            withoutEnlargement: true,
          })
          .jpeg({ quality: 75 })
          .toBuffer();
        if (photoData.length > 400000) throw Error();
      } catch {
        return NextResponse.json(
          {
            error: "Fotoğraf okunamadı. JPG, PNG veya WebP bir fotoğraf seçin.",
          },
          { status: 400 },
        );
      }
    }
    try {
      const application = await prisma.application.create({
        data: {
          requestKey,
          requestHash,
          notification: { create: {} },
          photo: photoData
            ? { create: { data: new Uint8Array(photoData) } }
            : undefined,
          type: data.type,
          sectorSlug: data.sectorSlug,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email,
          city: data.city,
          notes: data.notes,
          details: data.details,
          customerNote: data.customerNote,
          budget: data.budget,
          answers: {
            create: data.answers.map((a) => ({
              questionId: a.questionId,
              value: JSON.stringify(a.value),
            })),
          },
        },
        include: {
          answers: true,
        },
      });

      after(async () => {
        try {
          await notifyRequest(application.id);
        } catch {
          console.error("Notification processing failed");
        }
      });
      return NextResponse.json({ id: application.id }, { status: 201 });
    } catch (error) {
      if (
        requestKey &&
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        const previous = await replay();
        if (previous) return previous;
      }
      throw error;
    }
  } catch (error) {
    if (error instanceof SyntaxError)
      return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 },
      );
    }
    console.error("Application creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  const denied = await requireStaff();
  if (denied) return denied;
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { firstName: { contains: search } },
      { lastName: { contains: search } },
      { email: { contains: search } },
      { phone: { contains: search } },
    ];
  }

  const applications = await prisma.application.findMany({
    where,
    include: {
      assignedTo: { select: { id: true, name: true } },
      _count: { select: { answers: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(applications);
}
