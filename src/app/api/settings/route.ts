import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { requireStaff } from "@/lib/api-access";
import { emailReady } from "@/lib/site-settings";
const email = z.union([z.literal(""), z.string().email().max(254)]);
const schema = z
  .object({
    companyName: z.string().trim().min(2).max(120),
    legalName: z.string().trim().max(200),
    phone: z.string().trim().max(30),
    address: z.string().trim().max(500),
    email,
    demo: z.boolean(),
    notificationEmail: email,
    notificationEnabled: z.boolean(),
    privacyText: z.string().max(20000),
    disclosureText: z.string().max(20000),
    legalPublished: z.boolean(),
  })
  .strict();
export async function PUT(req: NextRequest) {
  const denied = await requireStaff(true);
  if (denied) return denied;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json(
      { error: "Bilgileri kontrol edin." },
      { status: 400 },
    );
  const data = parsed.data;
  if (
    data.notificationEnabled &&
    (!emailReady() ||
      !data.notificationEmail ||
      /@example\.(com|org|net)$/i.test(data.notificationEmail))
  )
    return NextResponse.json(
      {
        error:
          "Bildirim için gerçek alıcı adresi, gönderici adresi ve e-posta bağlantısı gereklidir.",
      },
      { status: 400 },
    );
  if (
    data.legalPublished &&
    (data.demo ||
      !data.legalName ||
      !data.address ||
      !data.email ||
      data.privacyText.length < 100 ||
      data.disclosureText.length < 100 ||
      /TASLAK|\[[^\]]+\]|example\.com|örnek bilgi/i.test(
        data.privacyText + data.disclosureText + data.legalName + data.email,
      ))
  )
    return NextResponse.json(
      {
        error:
          "Yayımlamadan önce örnek bilgileri ve taslak yer tutucularını tamamlayın.",
      },
      { status: 400 },
    );
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    create: { id: "main", ...data },
    update: data,
  });
  return NextResponse.json({ ok: true });
}
