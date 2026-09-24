"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Diamond, Inbox, ArrowUpRight, LogOut, Settings } from "lucide-react";
export function Sidebar({ userRole }: { userRole: string }) {
  const pathname = usePathname();
  return (
    <aside className="request-sidebar">
      <Link href="/panel" className="simple-logo">
        <Diamond size={22} />
        <span>Talep merkezi</span>
      </Link>
      <nav aria-label="Panel menüsü">
        <Link
          className={pathname.startsWith("/panel/basvurular") ? "active" : ""}
          href="/panel/basvurular"
        >
          <Inbox size={18} />
          Gelen talepler
        </Link>
        <Link href="/">
          <ArrowUpRight size={18} />
          Siteyi görüntüle
        </Link>
        {userRole === "ADMIN" && (
          <details>
            <summary>
              <Settings size={17} />
              Yönetim
            </summary>
            <Link href="/panel/kullanicilar">Kullanıcılar</Link>
            <Link href="/panel/ayarlar">Ayarlar</Link>
            <Link href="/panel/hizmetler">Hizmetler</Link>
            <Link href="/panel/sorular">Sorular</Link>
          </details>
        )}
      </nav>
      <button
        className="panel-signout"
        onClick={() => signOut({ callbackUrl: "/giris" })}
      >
        <LogOut size={17} />
        Çıkış yap
      </button>
    </aside>
  );
}
