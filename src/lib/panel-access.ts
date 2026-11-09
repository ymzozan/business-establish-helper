import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const panelRoles = ["ADMIN", "SALES", "PARTNER"] as const;
export const staffRoles = ["ADMIN", "SALES"] as const;

export async function requirePanelPage(roles: readonly string[] = panelRoles) {
  const session = await auth();
  if (!session?.user) redirect("/giris");
  if (!roles.includes(session.user.role)) notFound();
  return session.user;
}

export async function checkPanelApi(roles: readonly string[] = panelRoles) {
  const session = await auth();
  if (!session?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  if (!roles.includes(session.user.role)) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }
  return { user: session.user };
}

export function applicationScope(user: { id: string; role: string }) {
  return user.role === "PARTNER" ? { assignedToId: user.id } : {};
}
