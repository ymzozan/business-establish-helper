import { z } from "zod";
import { requestStatuses } from "@/lib/request-status";
import { requireStaff } from "@/lib/api-access";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireStaff();
  if (denied) return denied;

  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      answers: { include: { question: true } },
      package: { include: { items: { include: { service: true } } } },
      assignedTo: { select: { id: true, name: true, email: true } },
    },
  });

  if (!application) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(application);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireStaff();
  if (denied) return denied;

  const { id } = await params;
  const date = z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((value) => {
      const parsed = new Date(value);
      return (
        !Number.isNaN(parsed.getTime()) &&
        parsed.toISOString().slice(0, 10) === value
      );
    })
    .nullable();
  const schema = z
    .object({
      status: z
        .enum(
          Object.keys(requestStatuses) as [
            keyof typeof requestStatuses,
            ...(keyof typeof requestStatuses)[],
          ],
        )
        .optional(),
      notes: z.string().max(5000).optional(),
      assignedToId: z.string().min(1).nullable().optional(),
      quoteAmount: z
        .number()
        .finite()
        .positive()
        .max(999999999999)
        .multipleOf(0.01)
        .nullable()
        .optional(),
      quoteScope: z.string().trim().max(5000).nullable().optional(),
      quoteValidUntil: date.optional(),
      nextContactDate: date.optional(),
    })
    .strict();
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json(
      { error: "Alanları ve tarihleri kontrol edin." },
      { status: 400 },
    );
  const current = await prisma.application.findUnique({ where: { id } });
  if (!current)
    return NextResponse.json({ error: "Talep bulunamadı." }, { status: 404 });
  const data = parsed.data;
  if (data.assignedToId) {
    const user = await prisma.user.findFirst({
      where: { id: data.assignedToId, role: { in: ["ADMIN", "SALES"] } },
    });
    if (!user)
      return NextResponse.json(
        { error: "Geçerli bir sorumlu seçin." },
        { status: 400 },
      );
  }
  const merged = { ...current, ...data };
  if (
    ["QUOTED", "APPROVED"].includes(merged.status) &&
    (!merged.quoteAmount ||
      !merged.quoteScope?.trim() ||
      !merged.quoteValidUntil)
  )
    return NextResponse.json(
      { error: "Önce teklif tutarı, kapsamı ve geçerlilik tarihini girin." },
      { status: 400 },
    );
  const application = await prisma.application.update({ where: { id }, data });
  return NextResponse.json(application);
}
