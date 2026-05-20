"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Diamond, LogIn, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetlerimiz", label: "Hizmetlerimiz" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/iletisim", label: "İletişim" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-background/80 backdrop-blur-md">
      <div className="container h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/15 transition-colors">
            <Diamond className="h-4 w-4 text-primary" />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-foreground">
            Kuyumcu Otomasyon
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "text-foreground bg-surface-card"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/giris">
            <Button variant="outline" size="sm" className="border-hairline text-sm">
              <LogIn className="h-3.5 w-3.5 mr-1.5" />
              Panel Girişi
            </Button>
          </Link>
          <Link href="/basvuru/kuyumcu">
            <Button size="sm" className="text-sm">
              Başvuru Yap
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="h-9 w-9" />
              }
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menü</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetHeader className="border-b border-hairline p-4">
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
                      <Diamond className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="font-semibold text-sm tracking-tight">
                      Kuyumcu Otomasyon
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col p-4 gap-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <SheetClose key={link.href} render={<span />}>
                      <Link
                        href={link.href}
                        className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? "text-foreground bg-surface-card"
                            : "text-muted-foreground hover:text-foreground hover:bg-surface-soft"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
              <div className="border-t border-hairline p-4 flex flex-col gap-3 mt-auto">
                <Link href="/giris">
                  <Button variant="outline" className="w-full border-hairline text-sm">
                    <LogIn className="h-3.5 w-3.5 mr-1.5" />
                    Panel Girişi
                  </Button>
                </Link>
                <Link href="/basvuru/kuyumcu">
                  <Button className="w-full text-sm">
                    Başvuru Yap
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
