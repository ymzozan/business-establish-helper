import { prisma } from "@/lib/db";
import { getSettings, emailReady } from "@/lib/site-settings";
export async function notifyRequest(applicationId: string) {
  const settings = await getSettings();
  if (
    !settings.notificationEnabled ||
    !settings.notificationEmail ||
    !emailReady()
  )
    return;
  // A short lease and a provider idempotency key prevent concurrent duplicate sends.
  const lease = await prisma.requestNotification.updateMany({
    where: {
      applicationId,
      OR: [
        { status: { in: ["PENDING", "FAILED"] } },
        {
          status: "SENDING",
          attemptedAt: { lt: new Date(Date.now() - 10 * 60 * 1000) },
        },
      ],
    },
    data: { status: "SENDING", attemptedAt: new Date() },
  });
  if (!lease.count) return;
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const origin = process.env.KUYUMCU_PUBLIC_URL?.startsWith("https://")
      ? process.env.KUYUMCU_PUBLIC_URL
      : "https://kuyumcu-otomasyon.vercel.app";
    const { error } = await resend.emails.send(
      {
        from: process.env.NOTIFICATION_FROM!,
        to: settings.notificationEmail,
        subject: "Yeni bir talep geldi",
        text: `Yeni bir talep alındı.\nTalep numarası: ${applicationId}\nPanelden inceleyin: ${origin}/panel/basvurular/${applicationId}`,
      },
      { idempotencyKey: `new-request/${applicationId}` },
    );
    if (error) throw Error("Email provider rejected request");
    await prisma.requestNotification.update({
      where: { applicationId },
      data: { status: "SENT", sentAt: new Date() },
    });
  } catch {
    await prisma.requestNotification.update({
      where: { applicationId },
      data: { status: "FAILED" },
    });
  }
}
