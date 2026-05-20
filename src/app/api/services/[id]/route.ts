import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const updateData: Record<string, unknown> = {};
  if (body.name !== undefined) updateData.name = body.name;
  if (body.description !== undefined) updateData.description = body.description;
  if (body.priceMin !== undefined) updateData.priceMin = parseFloat(body.priceMin);
  if (body.priceMax !== undefined) updateData.priceMax = parseFloat(body.priceMax);
  if (body.category !== undefined) updateData.category = body.category;
  if (body.partnerType !== undefined) updateData.partnerType = body.partnerType;
  if (body.rules !== undefined) updateData.rules = JSON.stringify(body.rules);

  const service = await prisma.service.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(service);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.packageItem.deleteMany({ where: { serviceId: id } });
  await prisma.service.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
