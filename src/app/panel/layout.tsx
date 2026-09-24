import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/panel/Sidebar";
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) redirect("/giris");
  if (!["ADMIN", "SALES"].includes(session.user.role)) redirect("/");
  return (
    <div className="request-panel">
      <Sidebar userRole={session.user.role} />
      <div className="request-workspace">
        <header className="panel-topbar">
          <span>Kuyumcu Merkezi</span>
          <span>{session.user.name}</span>
        </header>
        <main className="panel-main">{children}</main>
      </div>
    </div>
  );
}
