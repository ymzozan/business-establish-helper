import { checkPanelApi } from "@/lib/panel-access";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const userInput = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.email().max(254),
  password: z.string().min(12).refine((value) => Buffer.byteLength(value) <= 72),
  role: z.enum(["ADMIN", "SALES", "PARTNER"]).default("SALES"),
});

export async function GET() {
  const access = await checkPanelApi(["ADMIN"]);
  if (access.error) return access.error;
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { applications: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const access = await checkPanelApi(["ADMIN"]);
  if (access.error) return access.error;
  try {
    const input = userInput.safeParse(await request.json().catch(() => null));
    if (!input.success) {
      return NextResponse.json({ error: "Geçersiz kullanıcı bilgileri. Parola en az 12 karakter olmalıdır." }, { status: 400 });
    }
    const body = input.data;

    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (existing) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kayıtlı" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 12);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
