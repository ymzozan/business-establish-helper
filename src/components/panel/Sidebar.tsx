"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  HelpCircle,
  Wrench,
  Users,
  Settings,
  LogOut,
  Gem,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/panel", label: "Dashboard", icon: LayoutDashboard },
  { href: "/panel/basvurular", label: "Başvurular", icon: FileText },
  { href: "/panel/sorular", label: "Sorular", icon: HelpCircle },
  { href: "/panel/hizmetler", label: "Hizmetler", icon: Wrench },
  { href: "/panel/kullanicilar", label: "Kullanıcılar", icon: Users },
  { href: "/panel/blog", label: "Blog Yönetimi", icon: BookOpen },
  { href: "/panel/ayarlar", label: "Ayarlar", icon: Settings },
];

export function Sidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();

  const filteredItems = navItems.filter((item) => {
    if (userRole === "ADMIN") return true;
    if (userRole === "SALES") {
      return !["/panel/kullanicilar", "/panel/ayarlar"].includes(item.href);
    }
    if (userRole === "PARTNER") {
      return ["/panel", "/panel/basvurular"].includes(item.href);
    }
    return false;
  });

  return (
    <aside className="w-60 border-r border-white/6 bg-[#0F1018] flex flex-col h-full">
      <div className="px-5 h-16 flex items-center border-b border-white/6">
        <Link href="/panel" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center">
            <Gem className="h-3.5 w-3.5 text-[#D4AF37]" />
          </div>
          <span className="font-heading font-semibold text-sm tracking-wide text-[#F0EDD8]">
            SORS Panel
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-0.5">
        {filteredItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/panel" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all",
                isActive
                  ? "bg-[#D4AF37]/12 text-[#D4AF37] border border-[#D4AF37]/20"
                  : "text-[#8B8B9B] hover:bg-white/4 hover:text-[#F0EDD8]"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/6">
        <button
          onClick={() => signOut({ callbackUrl: "/giris" })}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium text-[#8B8B9B] hover:bg-white/4 hover:text-[#F0EDD8] transition-all w-full"
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
