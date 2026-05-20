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
  Diamond,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { href: "/panel", label: "Dashboard", icon: LayoutDashboard },
  { href: "/panel/basvurular", label: "Başvurular", icon: FileText },
  { href: "/panel/sorular", label: "Sorular", icon: HelpCircle },
  { href: "/panel/hizmetler", label: "Hizmetler", icon: Wrench },
  { href: "/panel/kullanicilar", label: "Kullanıcılar", icon: Users },
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
    <aside className="w-60 border-r bg-card flex flex-col h-full">
      <div className="px-5 h-16 flex items-center border-b">
        <Link href="/panel" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
            <Diamond className="h-3.5 w-3.5 text-primary" />
          </div>
          <span className="font-semibold text-sm tracking-tight">
            Admin Panel
          </span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {filteredItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/panel" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-3">
        <Separator className="mb-3" />
        <button
          onClick={() => signOut({ callbackUrl: "/giris" })}
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
