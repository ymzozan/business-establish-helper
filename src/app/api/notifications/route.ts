import { requireStaff } from "@/lib/api-access";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { notifyRequest } from "@/lib/request-notification";
import { getSettings, emailReady } from "@/lib/site-settings";
export async function POST(req: NextRequest) {
  const denied = await requireStaff(true);
  if (denied) return denied;
  const body = await req.json().catch(() => null);
  if (typeof body?.applicationId !== "string")
    return NextResponse.json({ error: "Talep seçilmedi." }, { status: 400 });
  const app = await prisma.application.findUnique({
    where: { id: body.applicationId },
    select: { id: true },
  });
  if (!app)
    return NextResponse.json({ error: "Talep bulunamadı." }, { status: 404 });
  const s = await getSettings();
  if (!s.notificationEnabled || !emailReady())
    return NextResponse.json(
      { error: "Bildirim ayarlarını tamamlayın." },
      { status: 409 },
    );
  await prisma.requestNotification.upsert({
    where: { applicationId: app.id },
    create: { applicationId: app.id },
    update: {},
  });
  await notifyRequest(app.id);
  const result = await prisma.requestNotification.findUnique({
    where: { applicationId: app.id },
  });
  return NextResponse.json(
    { status: result?.status },
    { status: result?.status === "SENT" ? 200 : 503 },
  );
}
