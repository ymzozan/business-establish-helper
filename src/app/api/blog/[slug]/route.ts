import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireStaff } from "@/lib/api-access";
import { prisma } from "@/lib/db";
const schema = z
  .object({
    title: z.string().trim().min(3).max(180),
    description: z.string().trim().min(5).max(400),
    category: z.string().trim().min(2).max(80),
    service: z.enum(["kurulum", "toptan", "tamirat"]),
    body: z.string().trim().min(10).max(30000),
    published: z.boolean(),
  })
  .strict();
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const denied = await requireStaff(true);
  if (denied) return denied;
  const { slug } = await params;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 100)
    return NextResponse.json(
      { error: "Bağlantı adı yalnızca küçük harf, rakam ve tire içermeli." },
      { status: 400 },
    );
  const data = schema.safeParse(await req.json().catch(() => null));
  if (!data.success)
    return NextResponse.json(
      { error: "Başlık, açıklama ve yazı içeriğini kontrol edin." },
      { status: 400 },
    );
  await prisma.blogPost.upsert({
    where: { slug },
    create: { slug, ...data.data },
    update: data.data,
  });
  return NextResponse.json({ ok: true });
}
