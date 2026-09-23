import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { requireStaff } from "@/lib/api-access";

const applicationSchema = z.object({
  type: z.enum(["NEW_BUSINESS", "RENOVATION", "WHOLESALE", "REPAIR"]),
  sectorSlug: z.string().min(1).max(100),
  notes: z.string().max(5000).optional(),
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(10).max(30),
  email: z.string().trim().email().max(254),
  city: z.string().trim().max(100).optional(),
  answers: z.array(
    z.object({
      questionId: z.string(),
      value: z.unknown(),
    })
  ),
});

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
