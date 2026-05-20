import {
  Package,
  Users,
  FileText,
  TrendingUp,
  BarChart3,
  Building2,
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Stok Yönetimi",
    description:
      "Altın, gümüş ve mücevher stoklarınızı gram bazında anlık olarak takip edin.",
    features: [
      "Gram bazlı stok takibi",
      "Barkod ve RFID desteği",
      "Otomatik stok uyarıları",
      "Sayım ve envanter raporları",
      "Kategori ve alt kategori yönetimi",
    ],
  },
  {
    icon: Users,
    title: "Müşteri Takibi",
    description:
      "Müşteri portföyünüzü yönetin ve kişiselleştirilmiş hizmet sunun.",
    features: [
      "Müşteri kartı ve portföy yönetimi",
      "Satın alma geçmişi takibi",
      "Taksit ve borç takibi",
      "SMS ve bildirim gönderimi",
      "Müşteri segmentasyonu",
    ],
  },
  {
    icon: FileText,
    title: "Fatura & Fiş Kesimi",
    description:
      "e-Fatura ve e-Arşiv entegrasyonu ile yasal uyumlu belge düzenleme.",
    features: [
      "e-Fatura ve e-Arşiv Fatura",
      "Otomatik muhasebe aktarımı",
      "Toplu fatura kesimi",
      "İade ve iptal yönetimi",
      "GİB entegrasyonu",
    ],
  },
  {
    icon: TrendingUp,
    title: "Altın Borsası Entegrasyonu",
    description:
      "Anlık piyasa verilerini takip edin, fiyatlarınızı otomatik güncelleyin.",
    features: [
      "Anlık altın, gümüş, döviz kurları",
      "Otomatik fiyat güncelleme",
      "Kâr marjı ayarlama",
      "Piyasa geçmişi grafikleri",
      "Çoklu borsa kaynağı desteği",
    ],
  },
  {
    icon: BarChart3,
    title: "Raporlama & Analiz",
    description:
      "İşletmenizin performansını detaylı raporlarla izleyin.",
    features: [
      "Satış ve gelir raporları",
      "Stok devir hızı analizi",
      "Müşteri analitikleri",
      "Kâr-zarar raporları",
      "Özelleştirilebilir dashboard",
    ],
  },
  {
    icon: Building2,
    title: "Çoklu Şube Yönetimi",
    description:
      "Tüm mağazalarınızı tek bir panelden yönetin.",
    features: [
      "Merkezi yönetim paneli",
      "Şubeler arası stok transferi",
      "Konsolide raporlama",
      "Şube bazlı yetkilendirme",
      "Şube performans karşılaştırması",
    ],
  },
];

export default function HizmetlerimizPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <section className="bg-surface-soft py-20 sm:py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-[-1.5px] leading-[1.05] text-foreground mb-4">
            Hizmetlerimiz
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-[1.55]">
            İşletmenizin her ihtiyacına özel kapsamlı çözümler.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-surface-card rounded-xl p-8"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <s.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-foreground mb-1">
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-[1.55]">
                      {s.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 ml-1">
                  {s.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2.5 text-sm text-[#3d3d3a]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
