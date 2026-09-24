import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { requireStaff } from "@/lib/api-access";

import { requestDetailsSchema } from "@/lib/request-details";

const applicationSchema = z.object({
  type: z.enum(["NEW_BUSINESS", "RENOVATION", "WHOLESALE", "REPAIR"]),
  sectorSlug: z.string().min(1).max(100),
  details: requestDetailsSchema.optional(),
  budget: z.string().trim().max(100).optional(),
  customerNote: z.string().trim().max(2000).optional(),
  notes: z.string().max(5000).optional(),
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(10).max(30).refine((value) => /^\d{10,15}$/.test(value.replace(/\D/g, ""))),
  email: z.union([z.string().trim().email().max(254), z.literal("")]).default(""),
  city: z.string().trim().max(100).optional(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      value: z.unknown(),
    })
  ),
}).refine((data) => !data.details || data.details.kind === data.type, { message: "Service and details must match", path: ["details"] });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = applicationSchema.parse(body);

    const application = await prisma.application.create({
      data: {
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

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Application creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
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
