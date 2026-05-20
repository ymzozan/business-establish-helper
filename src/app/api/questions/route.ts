import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const sector = await prisma.sector.findUnique({
      where: { slug: body.sectorSlug || "kuyumcu" },
    });
    if (!sector) {
      return NextResponse.json({ error: "Sector not found" }, { status: 404 });
    }

    const question = await prisma.question.create({
      data: {
        sectorId: sector.id,
        text: body.text,
        type: body.type,
        options: body.options ? JSON.stringify(body.options) : null,
        order: body.order || 0,
        appType: body.appType || null,
        dependsOn: body.dependsOn ? JSON.stringify(body.dependsOn) : null,
      },
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    console.error("Question creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sectorSlug = searchParams.get("sectorSlug");
  const appType = searchParams.get("appType");

  if (!sectorSlug || !appType) {
    return NextResponse.json(
      { error: "sectorSlug and appType are required" },
      { status: 400 }
    );
  }

  const sector = await prisma.sector.findUnique({
    where: { slug: sectorSlug },
  });

  if (!sector) {
    return NextResponse.json({ error: "Sector not found" }, { status: 404 });
  }

  const questions = await prisma.question.findMany({
    where: {
      sectorId: sector.id,
      OR: [{ appType: appType }, { appType: null }],
    },
    orderBy: { order: "asc" },
  });

  // Parse JSON strings
  const parsed = questions.map((q) => ({
    ...q,
    options: q.options ? JSON.parse(q.options) : null,
    dependsOn: q.dependsOn ? JSON.parse(q.dependsOn) : null,
  }));

  return NextResponse.json(parsed);
}
