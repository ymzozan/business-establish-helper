import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/panel/Sidebar";

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/giris");
  }

  const initials =
    session.user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

  return (
    <div className="flex h-screen bg-[#07080D]">
      <Sidebar userRole={session.user.role} />
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-40 bg-[#0B0C10]/90 backdrop-blur-xl border-b border-white/6 h-16 flex items-center px-6">
          <div className="flex items-center justify-end w-full gap-3">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] font-medium">
              {session.user.role}
            </span>
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center justify-center">
                <span className="text-xs font-semibold text-[#D4AF37]">{initials}</span>
              </div>
              <span className="text-sm text-[#F0EDD8]">{session.user.name}</span>
            </div>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
