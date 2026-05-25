import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

// One-time setup: creates the admin account if none exists.
// After logging in, change your password from the panel.
export async function GET() {
  const existing = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (existing) {
    return NextResponse.json({ status: "already_configured", message: "Admin hesabı zaten mevcut. /giris adresinden giriş yapabilirsiniz." });
  }

  const hashed = await bcrypt.hash("Sors2026!", 12);
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "ozan@codeimo.com",
      password: hashed,
      role: "ADMIN",
    },
  });

  return NextResponse.json({
    status: "ok",
    message: "Admin hesabı oluşturuldu.",
    email: "ozan@codeimo.com",
    password: "Sors2026!",
    loginUrl: "/giris",
  });
}
