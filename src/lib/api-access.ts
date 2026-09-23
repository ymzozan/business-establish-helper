import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/** Guard API handlers before reading private records or changing configuration. */
export async function requireStaff(adminOnly = false) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Oturum açmanız gerekiyor." }, { status: 401 });
  }
  const allowed = adminOnly ? ["ADMIN"] : ["ADMIN", "SALES"];
  if (!allowed.includes(session.user.role)) {
    return NextResponse.json({ error: "Bu işlem için yetkiniz yok." }, { status: 403 });
  }
  return null;
}
