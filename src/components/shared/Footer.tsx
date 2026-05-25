import Link from "next/link";
import { Gem, Phone, Mail, MapPin, ArrowRight } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/altin-hesaplama", label: "Altın Hesaplama" },
  { href: "/yazilimlar", label: "Kuyumcu Yazılımları" },
  { href: "/blog", label: "Blog" },
];

const legalLinks = [
  { href: "/gizlilik", label: "Gizlilik Politikası" },
  { href: "/kvkk", label: "KVKK Aydınlatma Metni" },
  { href: "/kullanim-sartlari", label: "Kullanım Şartları" },
];

export default function Footer() {
  return (
    <footer className="bg-[#07080D] border-t border-white/6">
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center">
                <Gem className="w-4 h-4 text-[#D4AF37]" />
              </div>
              <span className="font-heading font-semibold text-xl text-[#F0EDD8] tracking-wide">
                SORS
              </span>
            </Link>
            <p className="text-sm text-[#8B8B9B] leading-relaxed mb-6">
              Kuyumculuk sektörünün lider B2B çözüm ortağı. Tedarik, kurulum ve dijital dönüşümde güvenilir adresiniz.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+905001234567"
                className="flex items-center gap-2.5 text-sm text-[#8B8B9B] hover:text-[#D4AF37] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]/60" />
                +90 500 123 45 67
              </a>
              <a
                href="mailto:info@sors.com.tr"
                className="flex items-center gap-2.5 text-sm text-[#8B8B9B] hover:text-[#D4AF37] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#D4AF37]/60" />
                info@sors.com.tr
              </a>
              <div className="flex items-start gap-2.5 text-sm text-[#8B8B9B]">
                <MapPin className="w-4 h-4 text-[#D4AF37]/60 mt-0.5 shrink-0" />
                İstanbul, Türkiye
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#F0EDD8] uppercase tracking-widest mb-5">
              Hızlı Erişim
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8B8B9B] hover:text-[#F0EDD8] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D4AF37]/0 group-hover:text-[#D4AF37]/70 transition-all -translate-x-2 group-hover:translate-x-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-[#F0EDD8] uppercase tracking-widest mb-5">
              Yasal
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#8B8B9B] hover:text-[#F0EDD8] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-[#F0EDD8] uppercase tracking-widest mb-5">
              Bülten
            </h4>
            <p className="text-sm text-[#8B8B9B] mb-4 leading-relaxed">
              Sektör haberlerini ve özel teklifleri kaçırmayın.
            </p>
            <form className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="w-full px-4 py-2.5 rounded-lg bg-white/6 border border-white/8 text-sm text-[#F0EDD8] placeholder:text-[#8B8B9B] focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2.5 rounded-lg bg-[#D4AF37] text-[#0B0C10] text-sm font-semibold hover:bg-[#E5C84E] transition-colors tracking-wide"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8B8B9B]">
            © 2025 SORS. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-[#8B8B9B]">
            Kuyumculuk sektörünün dijital dönüşüm ortağı
          </p>
        </div>
      </div>
    </footer>
  );
}
