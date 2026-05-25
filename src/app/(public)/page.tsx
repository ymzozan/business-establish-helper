"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Package, Building2, Sparkles, Calculator, ChevronDown, Gem } from "lucide-react";
import B2BContactForm from "@/components/landing/B2BContactForm";

const pillars = [
  {
    icon: Package,
    tag: "Toptan Tedarik",
    title: "Atölyeden Doğrudan Ürün",
    desc: "8K, 14K, 22K model çekmek isteyen aktif kuyumcular için fabrikadan direkt toptan tedarik. Minimum sipariş, rekabetçi fiyat.",
    cta: "Toptan Kataloğu Talep Et",
    area: "Toptan Ürün Tedariği",
  },
  {
    icon: Building2,
    tag: "Sıfırdan Kurulum",
    title: "Anahtar Teslim Kuyumcu",
    desc: "3 Milyon TL'den başlayan paketler. Vitrin tasarımı, mimari, ilk stok, güvenlik altyapısı ve dijital sistemler dahil.",
    cta: "Yatırımcı Başvurusu Yap",
    area: "Sıfırdan Kuyumcu Açmak",
    highlight: true,
  },
  {
    icon: Sparkles,
    tag: "Dijitalleşme",
    title: "Mağazanı Güçlendir",
    desc: "Mevcut kuyumcunuzu dijital çağa taşıyoruz. Yazılım entegrasyonu, terazi barkod sistemleri, stok ve muhasebe otomasyonu.",
    cta: "Danışmanlık Al",
    area: "Mağazamı Yenilemek / Dijitalleştirmek",
  },
];

const stats = [
  { value: "500+", label: "Aktif Kuyumcu Partner" },
  { value: "12+", label: "Yıllık Sektör Deneyimi" },
  { value: "3M TL", label: "Başlangıç Paketi" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
];

function MiniCalculator() {
  const [gram, setGram] = useState("10");
  const [ayar, setAyar] = useState("14");

  const milliems: Record<string, number> = {
    "8": 0.333, "14": 0.585, "18": 0.750, "22": 0.916, "24": 0.999,
  };

  const hasGram = parseFloat(gram || "0") * (milliems[ayar] || 0);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-4 h-4 text-[#D4AF37]" />
        <span className="text-sm font-medium text-[#F0EDD8]">Hızlı Hesaplama</span>
      </div>

      <div className="flex flex-col gap-4 mb-6">
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Gram</label>
          <input
            type="number"
            min="0"
            value={gram}
            onChange={(e) => setGram(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Ayar</label>
          <select
            value={ayar}
            onChange={(e) => setAyar(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            {Object.keys(milliems).map((k) => (
              <option key={k} value={k} className="bg-[#0F1018]">{k} Ayar</option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-[#D4AF37]/8 border border-[#D4AF37]/20">
        <div className="text-xs text-[#D4AF37]/70 uppercase tracking-wider mb-1">Has Altın Karşılığı</div>
        <div className="font-heading text-3xl font-bold text-[#D4AF37]">
          {hasGram.toFixed(3)} gr
        </div>
        <div className="text-xs text-[#8B8B9B] mt-1">Milyem: {((milliems[ayar] || 0) * 1000).toFixed(0)}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [activeArea, setActiveArea] = useState<string | null>(null);

  const handlePillarCTA = (area: string) => {
    setActiveArea(area);
    setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10] to-[#07080D]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/20 mb-8">
              <Gem className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
                Türkiye'nin Lider B2B Kuyumculuk Platformu
              </span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#F0EDD8] leading-tight mb-6">
              Kuyumculuk Dünyasına{" "}
              <span className="gold-gradient">Giriş Biletiniz</span>
            </h1>

            <p className="text-lg text-[#8B8B9B] leading-relaxed max-w-2xl mx-auto mb-10">
              Tedarik, kurulum ve dijital dönüşüm. Kuyumcu sektörünün her adımında yanınızda.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handlePillarCTA("")}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-semibold text-sm tracking-wide hover:bg-[#E5C84E] transition-all duration-200"
              >
                Ücretsiz Danışmanlık Al
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="/altin-hesaplama"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/12 text-sm text-[#8B8B9B] hover:text-[#F0EDD8] hover:border-white/20 transition-all"
              >
                <Calculator className="w-4 h-4" />
                Altın Hesapla
              </Link>
            </div>

            <div className="mt-16 flex items-center justify-center text-[#8B8B9B]/40 animate-bounce">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-white/6 bg-white/2">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-heading text-3xl lg:text-4xl font-bold text-[#D4AF37] mb-1.5">
                  {s.value}
                </div>
                <div className="text-xs text-[#8B8B9B] tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 Pillars */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-4">
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">Hizmetlerimiz</span>
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl text-[#F0EDD8] mb-4">
              Hangi Aşamadasınız?
            </h2>
            <p className="text-[#8B8B9B] max-w-xl mx-auto">
              İhtiyacınıza göre özelleştirilmiş çözümler sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.tag}
                  className={`relative group flex flex-col p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                    pillar.highlight
                      ? "bg-gradient-to-b from-[#D4AF37]/8 to-[#D4AF37]/3 border-[#D4AF37]/25 hover:border-[#D4AF37]/40"
                      : "glass-card hover:border-white/15"
                  }`}
                >
                  {pillar.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#D4AF37] text-[#0B0C10] text-xs font-bold tracking-wider uppercase">
                      En Çok Tercih
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                    pillar.highlight
                      ? "bg-[#D4AF37]/20 border border-[#D4AF37]/30"
                      : "bg-white/6 border border-white/8"
                  }`}>
                    <Icon className={`w-6 h-6 ${pillar.highlight ? "text-[#D4AF37]" : "text-[#8B8B9B]"}`} />
                  </div>

                  <div className="text-xs font-medium text-[#D4AF37]/70 uppercase tracking-wider mb-2">
                    {pillar.tag}
                  </div>
                  <h3 className="font-heading text-xl text-[#F0EDD8] mb-3 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#8B8B9B] leading-relaxed flex-1">
                    {pillar.desc}
                  </p>

                  <button
                    onClick={() => handlePillarCTA(pillar.area)}
                    className={`mt-7 w-full py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group/btn ${
                      pillar.highlight
                        ? "bg-[#D4AF37] text-[#0B0C10] hover:bg-[#E5C84E]"
                        : "border border-white/12 text-[#8B8B9B] hover:text-[#F0EDD8] hover:border-white/20"
                    }`}
                  >
                    {pillar.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* B2B Contact Form */}
      <section id="contact-form" className="py-20 lg:py-28 section-divider">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-4">
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">B2B Başvuru</span>
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl text-[#F0EDD8] mb-4">
              Hemen Başlayalım
            </h2>
            <p className="text-[#8B8B9B]">
              Bilgilerinizi bırakın, uzmanımız sizi arasın.
            </p>
          </div>
          <div className="max-w-xl mx-auto glass-card rounded-2xl p-8 lg:p-10">
            <B2BContactForm
              key={activeArea}
              defaultArea={activeArea || undefined}
              inline
            />
          </div>
        </div>
      </section>

      {/* Gold Calc Preview */}
      <section className="py-20 lg:py-28 section-divider">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-5">
                <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">Ücretsiz Araç</span>
              </div>
              <h2 className="font-heading text-3xl lg:text-4xl text-[#F0EDD8] mb-4 leading-snug">
                Anlık Altın<br />
                <span className="gold-gradient">Hesaplama Motoru</span>
              </h2>
              <p className="text-[#8B8B9B] leading-relaxed mb-8">
                Gram ve ayar seçin, has altın karşılığını saniyeler içinde hesaplayın. Milyem hesabı dahil.
              </p>
              <Link
                href="/altin-hesaplama"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-semibold text-sm hover:bg-[#E5C84E] transition-all"
              >
                <Calculator className="w-4 h-4" />
                Tam Hesaplama Aracı
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="glass-card rounded-2xl p-8">
              <MiniCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Software Partners Preview */}
      <section className="py-20 lg:py-28 section-divider">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-4">
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">Yazılım Ortakları</span>
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl text-[#F0EDD8] mb-4">
              Sektör Lideri Yazılımlar
            </h2>
            <p className="text-[#8B8B9B] max-w-xl mx-auto">
              Anahtar teslim kurulumlarımızda kullandığımız güvenilir yazılım altyapısı.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              {
                name: "PusulaNet",
                desc: "Kuyumcu sektörünün en kapsamlı ERP çözümü",
                features: ["Stok Takibi", "Muhasebe Entegrasyonu", "Terazi & Barkod"],
              },
              {
                name: "ML Yazılım",
                desc: "Altın ve kuyumcu işletmeleri için özel yazılım",
                features: ["Kasa Yönetimi", "Müşteri CRM", "Anlık Raporlama"],
              },
            ].map((sw) => (
              <div key={sw.name} className="glass-card rounded-2xl p-7 hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center mb-5">
                  <span className="font-heading font-bold text-[#D4AF37] text-lg">{sw.name[0]}</span>
                </div>
                <h3 className="font-heading text-xl text-[#F0EDD8] mb-2">{sw.name}</h3>
                <p className="text-sm text-[#8B8B9B] mb-4">{sw.desc}</p>
                <ul className="flex flex-col gap-2">
                  {sw.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#8B8B9B]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/yazilimlar"
              className="inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#E5C84E] transition-colors"
            >
              Tüm yazılım çözümlerini gör
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
