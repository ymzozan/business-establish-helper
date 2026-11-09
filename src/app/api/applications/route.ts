import { checkPanelApi, applicationScope } from "@/lib/panel-access";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { evaluateRules } from "@/lib/rule-engine";
import { receiptLifetime, receiptName, signReceipt } from "@/lib/application-receipt";

const applicationSchema = z.object({
  type: z.enum(["NEW_BUSINESS", "RENOVATION"]),
  sectorSlug: z.string(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email(),
  city: z.string().optional(),
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

    const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;
    if (!secret) {
      return NextResponse.json({ error: "Application service unavailable" }, { status: 503 });
    }

    const sector = await prisma.sector.findUnique({
      where: { slug: data.sectorSlug, isActive: true },
      select: { services: true, questions: { select: { id: true, appType: true } } },
    });
    const allowedQuestions = new Set(sector?.questions
      .filter((question) => !question.appType || question.appType === data.type)
      .map((question) => question.id));
    const answersMap = Object.fromEntries(data.answers.map(({ questionId, value }) => [questionId, value]));
    if (!sector || allowedQuestions.size < data.answers.length
        || data.answers.some(({ questionId }) => !allowedQuestions.has(questionId))
        || Object.keys(answersMap).length !== data.answers.length) {
      return NextResponse.json({ error: "Invalid sector or answers" }, { status: 400 });
    }
    const services = sector.services.filter((service) =>
      evaluateRules(JSON.parse(service.rules), answersMap)
    );

    const application = await prisma.application.create({
      data: {
        type: data.type,
        sectorSlug: data.sectorSlug,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        email: data.email,
        city: data.city,
        package: {
          create: {
            totalMin: services.reduce((total, service) => total + (service.priceMin ?? 0), 0),
            totalMax: services.reduce((total, service) => total + (service.priceMax ?? 0), 0),
            items: { create: services.map(({ id }) => ({ serviceId: id })) },
          },
        },
        answers: {
          create: data.answers.map((a) => ({
            questionId: a.questionId,
            value: JSON.stringify(a.value),
          })),
        },
      },
      select: { id: true },
    });

    const response = NextResponse.json(application, { status: 201 });
    response.cookies.set(receiptName(application.id), signReceipt(application.id, secret), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/basvuru",
      maxAge: receiptLifetime,
    });
    return response;
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
  const access = await checkPanelApi();
  if (access.error) return access.error;
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = applicationScope(access.user);
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
