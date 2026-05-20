import Link from "next/link";
import { Diamond, MapPin, Phone, Mail } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Anasayfa" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/iletisim", label: "İletişim" },
];

const serviceLinks = [
  { href: "/hizmetlerimiz", label: "Stok Yönetimi" },
  { href: "/hizmetlerimiz", label: "Müşteri Takibi" },
  { href: "/hizmetlerimiz", label: "Fatura & Fiş" },
  { href: "/hizmetlerimiz", label: "Raporlama" },
];

export function Footer() {
  return (
    <footer className="bg-surface-dark text-on-dark">
      <div className="container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1: Logo + description */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/15">
                <Diamond className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="font-semibold text-sm tracking-tight text-on-dark">
                Kuyumcu Otomasyon
              </span>
            </Link>
            <p className="text-on-dark-soft text-sm leading-[1.55]">
              Kuyumcu sektörüne özel geliştirilen B2B otomasyon platformu.
              İşletmenizi dijitalleştirin, verimliliğinizi artırın.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-sm font-medium text-on-dark mb-4">
              Hızlı Erişim
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-on-dark-soft text-sm hover:text-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-sm font-medium text-on-dark mb-4">
              Hizmetler
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-on-dark-soft text-sm hover:text-on-dark transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-sm font-medium text-on-dark mb-4">
              İletişim
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-on-dark-soft mt-0.5 shrink-0" />
                <span className="text-on-dark-soft text-sm">
                  Kuyumcular Çarşısı, İstanbul, Türkiye
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-on-dark-soft shrink-0" />
                <span className="text-on-dark-soft text-sm">
                  +90 (212) 555 0100
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-on-dark-soft shrink-0" />
                <span className="text-on-dark-soft text-sm">
                  info@kuyumcuotomasyon.com
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-on-dark/10">
        <div className="container py-6">
          <p className="text-center text-xs text-on-dark-soft">
            &copy; {new Date().getFullYear()} Kuyumcu Otomasyon. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
