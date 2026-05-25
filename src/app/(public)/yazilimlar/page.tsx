import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";

const softwares = [
  {
    name: "PusulaNet",
    tagline: "Kuyumculuk ERP'nin Öncüsü",
    desc: "20 yılı aşkın sektör deneyimiyle geliştirilen PusulaNet, kuyumcu işletmelerinin tüm süreçlerini tek platformda yönetir. Stoktan satışa, muhasebeye kadar entegre çözüm.",
    features: [
      "Gerçek zamanlı stok ve envanter takibi",
      "Terazi entegrasyonu ve barkod yönetimi",
      "Muhasebe ve cari hesap otomasyonu",
      "Çok şubeli mağaza yönetimi",
      "Günlük/aylık satış raporları",
      "Müşteri borç ve vade takibi",
    ],
    accent: "from-[#D4AF37]/10 to-[#D4AF37]/3",
    border: "border-[#D4AF37]/20",
  },
  {
    name: "ML Yazılım",
    tagline: "Altın Sektörüne Özel Çözüm",
    desc: "ML Yazılım, küçük ve orta ölçekli kuyumcuların ihtiyaçlarına özel tasarlanmış, kullanımı kolay ve güçlü bir kuyumcu yönetim sistemidir.",
    features: [
      "Hızlı ve kolay kasa yönetimi",
      "Müşteri portföyü ve CRM modülü",
      "Anlık kâr/zarar raporlaması",
      "Altın ve gümüş stok ayrımı",
      "SMS ile müşteri bildirimi",
      "Bulut tabanlı yedekleme sistemi",
    ],
    accent: "from-white/4 to-white/1",
    border: "border-white/10",
  },
];

export default function YazilimlarPage() {
  return (
    <main className="flex-1 pt-28 pb-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/20 mb-6">
            <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
              İş Ortaklıkları
            </span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl text-[#F0EDD8] mb-4">
            Kuyumcu Yazılım Çözümleri
          </h1>
          <p className="text-[#8B8B9B] max-w-2xl mx-auto leading-relaxed">
            SORS anahtar teslim kurulumlarında sektörün en güvenilir yazılım altyapılarını kullanmaktadır.
            Her iki yazılımın kurulum ve eğitimini biz yönetiyoruz.
          </p>
        </div>

        {/* Software Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {softwares.map((sw) => (
            <div
              key={sw.name}
              className={`flex flex-col rounded-2xl border bg-gradient-to-b ${sw.accent} ${sw.border} p-8 hover:-translate-y-1 transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center">
                  <span className="font-heading font-bold text-[#D4AF37] text-2xl">{sw.name[0]}</span>
                </div>
                <div>
                  <h2 className="font-heading text-2xl text-[#F0EDD8]">{sw.name}</h2>
                  <p className="text-sm text-[#D4AF37]/70">{sw.tagline}</p>
                </div>
              </div>

              <p className="text-sm text-[#8B8B9B] leading-relaxed mb-7">{sw.desc}</p>

              <div className="flex flex-col gap-3 flex-1">
                {sw.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]/70 shrink-0" />
                    <span className="text-sm text-[#8B8B9B]">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Banner */}
        <div className="glass-card rounded-2xl p-8 lg:p-12 text-center border-[#D4AF37]/15">
          <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/25 flex items-center justify-center mx-auto mb-6">
            <Phone className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <h2 className="font-heading text-2xl lg:text-3xl text-[#F0EDD8] mb-4">
            Yazılım Kurulumu Dahil Paketler
          </h2>
          <p className="text-[#8B8B9B] max-w-xl mx-auto mb-8 leading-relaxed">
            SORS anahtar teslim paketlerinde PusulaNet veya ML Yazılım kurulumu, konfigürasyonu ve personel eğitimi ücretsiz dahildir.
          </p>
          <Link
            href="/#contact-form"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-semibold text-sm hover:bg-[#E5C84E] transition-all"
          >
            Paket Seçeneklerini İncele
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
