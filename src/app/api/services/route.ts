import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    include: { sector: { select: { name: true } } },
  });

  const parsed = services.map((s) => ({
    ...s,
    rules: JSON.parse(s.rules),
  }));

  return NextResponse.json(parsed);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sector = await prisma.sector.findUnique({
      where: { slug: body.sectorSlug || "kuyumcu" },
    });
    if (!sector) {
      return NextResponse.json({ error: "Sector not found" }, { status: 404 });
    }

    const service = await prisma.service.create({
      data: {
        sectorId: sector.id,
        name: body.name,
        description: body.description || null,
        priceMin: body.priceMin ? parseFloat(body.priceMin) : null,
        priceMax: body.priceMax ? parseFloat(body.priceMax) : null,
        category: body.category || null,
        partnerType: body.partnerType || null,
        rules: JSON.stringify(body.rules || { conditions: [], logic: "AND" }),
      },
    });

    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Service creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
