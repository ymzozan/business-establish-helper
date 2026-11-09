import { receiptName, validReceipt } from "@/lib/application-receipt";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { evaluateRules } from "@/lib/rule-engine";

export async function POST(request: NextRequest) {
  try {
    const { applicationId } = await request.json();

    if (typeof applicationId !== "string" || !/^c[a-z0-9]{24}$/.test(applicationId)) {
      return NextResponse.json(
        { error: "applicationId is required" },
        { status: 400 }
      );
    }

    if (!validReceipt(applicationId, request.cookies.get(receiptName(applicationId))?.value)) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const application = await prisma.application.findUnique({
      where: { id: applicationId },
      include: { answers: true },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    // Build answers map: questionId -> parsed value
    const answersMap: Record<string, unknown> = {};
    for (const answer of application.answers) {
      answersMap[answer.questionId] = JSON.parse(answer.value);
    }

    // Find sector to get sectorId
    const sector = await prisma.sector.findUnique({
      where: { slug: application.sectorSlug },
    });

    if (!sector) {
      return NextResponse.json(
        { error: "Sector not found" },
        { status: 404 }
      );
    }

    const sectorServices = await prisma.service.findMany({
      where: { sectorId: sector.id },
    });

    // Evaluate rules for each service
    const matchedServices = sectorServices.filter((service) => {
      const rules = JSON.parse(service.rules);
      return evaluateRules(rules, answersMap);
    });

    // Calculate totals
    let totalMin = 0;
    let totalMax = 0;
    for (const service of matchedServices) {
      totalMin += service.priceMin || 0;
      totalMax += service.priceMax || 0;
    }

    const items = matchedServices.map(({ id }) => ({ serviceId: id }));
    const pkg = await prisma.package.upsert({
      where: { applicationId },
      create: { applicationId, totalMin, totalMax, items: { create: items } },
      update: { totalMin, totalMax, items: { deleteMany: {}, create: items } },
      select: { id: true },
    });

    return NextResponse.json(pkg);
  } catch (error) {
    console.error("Package generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
