"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2, Gem, Loader2 } from "lucide-react";
import AILab from "@/components/landing/AILab";
import { blogPosts } from "@/lib/blog-data";

// ─── Stats ─────────────────────────────────────────────────────────────────
const stats = [
  { value: "500+", label: "Aktif Kuyumcu Partner" },
  { value: "12+", label: "Yıllık Sektör Deneyimi" },
  { value: "3M TL", label: "Başlangıç Paketi" },
  { value: "%98", label: "Müşteri Memnuniyeti" },
];

// ─── Quick Hero Form ────────────────────────────────────────────────────────
function HeroForm() {
  const [form, setForm] = useState({ isim: "", telefon: "", sehir: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.isim || !form.telefon || !form.sehir) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="flex flex-col items-center gap-3 py-6">
        <CheckCircle2 className="w-10 h-10 text-[#D4AF37]" />
        <p className="text-[#F0EDD8] font-medium">Talebiniz alındı!</p>
        <p className="text-sm text-[#8B8B9B]">Uzmanımız en kısa sürede sizi arayacak.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        required
        placeholder="Ad Soyad"
        value={form.isim}
        onChange={(e) => setForm({ ...form, isim: e.target.value })}
        className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-white/8 border border-white/12 text-[#F0EDD8] text-sm placeholder-[#8B8B9B]/70 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
      />
      <input
        type="tel"
        required
        placeholder="Telefon"
        value={form.telefon}
        onChange={(e) => setForm({ ...form, telefon: e.target.value })}
        className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-white/8 border border-white/12 text-[#F0EDD8] text-sm placeholder-[#8B8B9B]/70 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
      />
      <input
        type="text"
        required
        placeholder="Şehir"
        value={form.sehir}
        onChange={(e) => setForm({ ...form, sehir: e.target.value })}
        className="w-full sm:w-32 px-4 py-3.5 rounded-xl bg-white/8 border border-white/12 text-[#F0EDD8] text-sm placeholder-[#8B8B9B]/70 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-semibold text-sm hover:bg-[#E5C84E] transition-all disabled:opacity-70 whitespace-nowrap flex items-center gap-2"
      >
        {status === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
        Toptan Fiyat Listesini Al
      </button>
    </form>
  );
}

// ─── Accordion ─────────────────────────────────────────────────────────────
const modules = [
  {
    id: "yeni",
    title: "Sıfırdan Kuyumcu Açmak İstiyorum",
    badge: "Anahtar Teslim",
    items: [
      "3 Milyon TL'den başlayan paketler — vitrin, stok, güvenlik, yazılım dahil",
      "Profesyonel kuyumcu vitrini tasarımı ve üretimi (30.000 – 150.000 TL)",
      "İlk altın stoğu önerisi ve üretici tedarik bağlantısı",
      "PusulaNet veya ML Yazılım kurulumu ve eğitimi",
      "Kasa, kamera, alarm sistemi kurulumu",
      "Lokasyon seçimi ve pazar analizi",
    ],
    cta: "Anahtar Teslim Paket Talep Et",
  },
  {
    id: "yenile",
    title: "Mağazamı Yenilemek / Dijitalleştirmek İstiyorum",
    badge: "Modernizasyon",
    items: [
      "Mevcut vitrinin modernizasyonu ve yenilenmesi",
      "E-ticaret entegrasyonu ve dijital satış kanalı kurulumu",
      "Stok, muhasebe ve terazi sistemleri entegrasyonu",
      "Barkod ve POS sistemi yükseltmesi",
      "Müşteri CRM ve sadakat programı kurulumu",
      "Mağaza içi dijital vitrin ve görsel sistemler",
    ],
    cta: "Modernizasyon Danışmanlığı Al",
  },
];

function Accordion() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {modules.map((mod) => {
        const isOpen = open === mod.id;
        return (
          <div
            key={mod.id}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen ? "border-[#D4AF37]/30 bg-[#D4AF37]/4" : "border-white/8 bg-white/2 hover:border-white/14"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? null : mod.id)}
              className="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#D4AF37]/12 text-[#D4AF37] border border-[#D4AF37]/20">
                  {mod.badge}
                </span>
                <span className={`font-medium text-base ${isOpen ? "text-[#F0EDD8]" : "text-[#8B8B9B]"}`}>
                  {mod.title}
                </span>
              </div>
              <ChevronDown className={`w-5 h-5 text-[#D4AF37] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96" : "max-h-0"}`}>
              <div className="px-6 pb-6">
                <ul className="space-y-2.5 mb-5">
                  {mod.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#8B8B9B]">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#D4AF37]/60 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setOpen(null);
                    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] text-sm font-semibold hover:bg-[#E5C84E] transition-all"
                >
                  {mod.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Blog Preview ───────────────────────────────────────────────────────────
function BlogPreview() {
  const posts = blogPosts.slice(0, 3);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
          <div className="glass-card rounded-2xl p-6 h-full hover:border-white/15 transition-all duration-300 hover:-translate-y-1 flex flex-col">
            <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/15 mb-4 self-start">
              {post.category}
            </span>
            <h3 className="text-sm font-semibold text-[#F0EDD8] leading-snug mb-3 flex-1 group-hover:text-[#D4AF37] transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-[#8B8B9B] leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-[#8B8B9B]/60">
              <span>{post.readingTime} dk okuma</span>
              <span>{post.date}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <main className="flex-1">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#0B0C10] to-[#07080D]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#D4AF37]/4 rounded-full blur-[140px] pointer-events-none" />

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/20 mb-7">
              <Gem className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
                Türkiye'nin Lider B2B Kuyumculuk Platformu
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#F0EDD8] leading-tight mb-5">
              Doğrudan Üreticiden:{" "}
              <span className="gold-gradient">8K, 14K ve 22K</span>{" "}
              Toptan Altın Takı Tedariği.
            </h1>

            <p className="text-base lg:text-lg text-[#8B8B9B] leading-relaxed max-w-2xl mb-10">
              Aracıları ortadan kaldırın. SORS üretim gücüyle mağazanızın kâr marjını katlayın.
              Güncel B2B kataloğumuza erişmek için bilgilerinizi bırakın.
            </p>

            <div className="p-5 lg:p-6 rounded-2xl bg-white/4 border border-white/10 backdrop-blur-sm mb-10">
              <HeroForm />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-[#8B8B9B]">
              {["Ücretsiz katalog erişimi", "24 saat içinde geri dönüş", "Minimum sipariş yok"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-10 border-y border-white/6 bg-white/2">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-heading text-3xl lg:text-4xl font-bold text-[#D4AF37] mb-1.5">{s.value}</div>
                <div className="text-xs text-[#8B8B9B] tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCORDION SERVICES ───────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-4">
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">Hizmetlerimiz</span>
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl text-[#F0EDD8] mb-4">
              Kuyumcu Açmak mı, Yenilemek mi İstiyorsunuz?
            </h2>
            <p className="text-[#8B8B9B] max-w-xl mx-auto">
              İhtiyacınıza göre özelleştirilmiş çözümler. Detayları görmek için tıklayın.
            </p>
          </div>
          <Accordion />
        </div>
      </section>

      {/* ── AI LAB ───────────────────────────────────────────────────────── */}
      <section id="ai-lab" className="py-20 lg:py-28 section-divider">
        <div className="container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-4">
              <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">Ücretsiz Araçlar</span>
            </div>
            <h2 className="font-heading text-3xl lg:text-4xl text-[#F0EDD8] mb-4">
              SORS AI Lab
            </h2>
            <p className="text-[#8B8B9B] max-w-xl mx-auto">
              Altın hesaplayıcı, tasarım analizi, karlılık simülasyonu ve stok değer hesabı — hepsi ücretsiz.
            </p>
          </div>
          <AILab />
        </div>
      </section>

      {/* ── CONTACT FORM ─────────────────────────────────────────────────── */}
      <section id="contact-form" className="py-20 lg:py-28 section-divider">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-4">
                <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">B2B Başvuru</span>
              </div>
              <h2 className="font-heading text-3xl text-[#F0EDD8] mb-3">Hemen Başlayalım</h2>
              <p className="text-[#8B8B9B]">Bilgilerinizi bırakın, uzmanımız sizi arasın.</p>
            </div>
            <div className="glass-card rounded-2xl p-6 lg:p-8">
              <ContactFormFull />
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ─────────────────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 section-divider">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/15 mb-3">
                <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">Blog</span>
              </div>
              <h2 className="font-heading text-3xl text-[#F0EDD8]">Sektör Rehberleri</h2>
            </div>
            <Link href="/blog" className="text-sm text-[#D4AF37] hover:text-[#E5C84E] transition-colors flex items-center gap-1">
              Tümünü Gör <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <BlogPreview />
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-r from-[#D4AF37]/8 via-[#D4AF37]/4 to-[#D4AF37]/8 border-t border-b border-[#D4AF37]/15">
        <div className="container text-center">
          <h2 className="font-heading text-2xl lg:text-3xl text-[#F0EDD8] mb-4">
            Toptan Fiyat Listesi İçin Başvurun
          </h2>
          <p className="text-[#8B8B9B] mb-7 max-w-md mx-auto">
            8K, 14K ve 22K toptan altın takı kataloğuna ücretsiz erişin. 24 saat içinde uzmanımız sizi arar.
          </p>
          <button
            onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-semibold hover:bg-[#E5C84E] transition-all"
          >
            Hemen Başvur
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </main>
  );
}

// ─── Full Contact Form (secondary, richer) ──────────────────────────────────
function ContactFormFull() {
  const [form, setForm] = useState({ isim: "", telefon: "", sehir: "", alan: "", butce: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("done");
  };

  if (status === "done") {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
        <p className="text-[#F0EDD8] font-semibold text-lg mb-2">Başvurunuz Alındı</p>
        <p className="text-sm text-[#8B8B9B]">Uzmanımız en geç 24 saat içinde sizi arayacak.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Ad Soyad</label>
          <input required type="text" value={form.isim} onChange={(e) => setForm({ ...form, isim: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm placeholder-[#8B8B9B]/60 focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
        </div>
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Telefon</label>
          <input required type="tel" value={form.telefon} onChange={(e) => setForm({ ...form, telefon: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm placeholder-[#8B8B9B]/60 focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Şehir</label>
        <input type="text" value={form.sehir} onChange={(e) => setForm({ ...form, sehir: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm placeholder-[#8B8B9B]/60 focus:outline-none focus:border-[#D4AF37]/50 transition-all" />
      </div>
      <div>
        <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">İlgilendiğiniz Alan</label>
        <select value={form.alan} onChange={(e) => setForm({ ...form, alan: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer">
          <option value="" className="bg-[#0F1018]">Seçiniz</option>
          <option value="Toptan Ürün Tedariği" className="bg-[#0F1018]">Toptan Ürün Tedariği</option>
          <option value="Sıfırdan Kuyumcu Açmak" className="bg-[#0F1018]">Sıfırdan Kuyumcu Açmak</option>
          <option value="Mağaza Yenileme / Dijitalleşme" className="bg-[#0F1018]">Mağaza Yenileme / Dijitalleşme</option>
          <option value="Diğer" className="bg-[#0F1018]">Diğer</option>
        </select>
      </div>
      <div>
        <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Bütçe Aralığı (TL)</label>
        <select value={form.butce} onChange={(e) => setForm({ ...form, butce: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer">
          <option value="" className="bg-[#0F1018]">Seçiniz</option>
          <option value="500K altı" className="bg-[#0F1018]">500.000 TL altı</option>
          <option value="500K-1M" className="bg-[#0F1018]">500K – 1 Milyon TL</option>
          <option value="1M-3M" className="bg-[#0F1018]">1 – 3 Milyon TL</option>
          <option value="3M üzeri" className="bg-[#0F1018]">3 Milyon TL üzeri</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-semibold hover:bg-[#E5C84E] transition-all disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
        Ücretsiz Danışmanlık Al
      </button>
    </form>
  );
}
