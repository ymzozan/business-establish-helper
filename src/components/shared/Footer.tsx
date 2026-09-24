import Link from "next/link";
import { Diamond, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="corporate-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href="/" className="simple-logo">
            <Diamond size={23} strokeWidth={1.4} />
            <span>
              kuyumcu<span className="simple-logo-light">merkezi</span>
            </span>
          </Link>
          <p>
            Mağazanızın ilk adımından
            <br />
            ustalık gerektiren son dokunuşa.
          </p>
          <span className="footer-tagline">
            Üç ihtiyaç. Tek buluşma noktası.
          </span>
        </div>
        <nav aria-label="Hizmetler">
          <h2>Size nasıl yardımcı olalım?</h2>
          <Link href="/?hizmet=kurulum">Mağaza kurulumu</Link>
          <Link href="/?hizmet=toptan">Toptan altın</Link>
          <Link href="/?hizmet=tamirat">Tamirat & tadilat</Link>
        </nav>
        <nav aria-label="Kurumsal">
          <h2>Kuyumcu Merkezi</h2>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/blog">Blog & rehberler</Link>
          <Link href="/iletisim">
            İletişim <ArrowUpRight size={12} />
          </Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Kuyumcu Merkezi</span>
        <span>Birlikte, kolayca.</span>
        <Link href="/giris">Yönetim girişi</Link>
      </div>
    </footer>
  );
}
