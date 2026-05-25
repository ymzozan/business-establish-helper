"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, Gem } from "lucide-react";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/altin-hesaplama", label: "Altın Hesaplama" },
  { href: "/yazilimlar", label: "Kuyumcu Yazılımları" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0C10]/90 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#D4AF37]/25 transition-colors">
              <Gem className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <span className="font-heading font-semibold text-xl text-[#F0EDD8] tracking-wide">
              SORS
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#8B8B9B] hover:text-[#F0EDD8] transition-colors tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              href="/giris"
              className="text-sm px-5 py-2.5 rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-200 tracking-wide font-medium"
            >
              Müşteri / Bayi Paneli
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-[#8B8B9B] hover:text-[#F0EDD8] transition-colors"
            aria-label="Menü"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0B0C10]/95 backdrop-blur-xl border-t border-white/8">
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 px-4 text-[#8B8B9B] hover:text-[#F0EDD8] hover:bg-white/4 rounded-lg transition-all text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-white/8">
              <Link
                href="/giris"
                onClick={() => setOpen(false)}
                className="block py-3 px-4 text-center text-sm font-medium rounded-lg border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
              >
                Müşteri / Bayi Paneli
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
