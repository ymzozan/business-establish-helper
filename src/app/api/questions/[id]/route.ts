import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};
  if (body.text !== undefined) updateData.text = body.text;
  if (body.type !== undefined) updateData.type = body.type;
  if (body.options !== undefined) updateData.options = JSON.stringify(body.options);
  if (body.order !== undefined) updateData.order = body.order;
  if (body.appType !== undefined) updateData.appType = body.appType || null;
  if (body.dependsOn !== undefined)
    updateData.dependsOn = body.dependsOn ? JSON.stringify(body.dependsOn) : null;

  const question = await prisma.question.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(question);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.answer.deleteMany({ where: { questionId: id } });
  await prisma.question.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
