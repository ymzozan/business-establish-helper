import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/api-access";
import { prisma } from "@/lib/db";
import { getSettings } from "@/lib/site-settings";
import { makeQuotePdf } from "@/lib/quote-pdf";
export const runtime = "nodejs";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireStaff();
  if (denied) return denied;
  const { id } = await params;
  const app = await prisma.application.findUnique({ where: { id } });
  if (!app)
    return NextResponse.json({ error: "Talep bulunamadı." }, { status: 404 });
  if (!app.quoteAmount || !app.quoteScope || !app.quoteValidUntil)
    return NextResponse.json(
      { error: "Önce teklif tutarı, kapsamı ve geçerlilik tarihini kaydedin." },
      { status: 409 },
    );
  const s = await getSettings();
  const bytes = await makeQuotePdf({
    id: app.id,
    name: app.firstName + " " + app.lastName,
    phone: app.phone,
    amount: Number(app.quoteAmount),
    scope: app.quoteScope,
    validUntil: app.quoteValidUntil,
    company: s.companyName,
    legalName: s.legalName,
    address: s.address,
    email: s.email,
    companyPhone: s.phone,
    demo: s.demo,
  });
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="teklif-${app.id}.pdf"`,
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
