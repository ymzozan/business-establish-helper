import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};
  if (body.status) updateData.status = body.status;
  if (body.notes !== undefined) updateData.notes = body.notes;
  if (body.assignedToId !== undefined) updateData.assignedToId = body.assignedToId;

  const application = await prisma.application.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(application);
}
