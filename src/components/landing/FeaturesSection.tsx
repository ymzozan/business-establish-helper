import { Package, Users, FileText, TrendingUp, BarChart3, Building2 } from "lucide-react";

const features = [
  {
    icon: Package,
    title: "Stok Yönetimi",
    description:
      "Altın, gümüş ve mücevher stoklarınızı gram bazında anlık takip edin. Barkod ve RFID desteği ile hatasız envanter.",
  },
  {
    icon: Users,
    title: "Müşteri Takibi",
    description:
      "Müşteri portföyünüzü yönetin, satın alma geçmişini izleyin ve kişiselleştirilmiş hizmet sunun.",
  },
  {
    icon: FileText,
    title: "Fatura & Fiş",
    description:
      "e-Fatura ve e-Arşiv entegrasyonu ile yasal uyumlu fatura ve fiş kesimi. Otomatik muhasebe aktarımı.",
  },
  {
    icon: TrendingUp,
    title: "Altın Borsası Entegrasyonu",
    description:
      "Anlık altın, gümüş ve döviz kurlarını takip edin. Otomatik fiyat güncellemesi ile kâr marjınızı koruyun.",
  },
  {
    icon: BarChart3,
    title: "Raporlama",
    description:
      "Satış, kâr, stok devir hızı ve müşteri analizlerini detaylı raporlarla görüntüleyin.",
  },
  {
    icon: Building2,
    title: "Çoklu Şube Yönetimi",
    description:
      "Birden fazla mağazanızı tek panelden yönetin. Şubeler arası stok transferi ve konsolide raporlama.",
  },
];

export function FeaturesSection() {
  return (
    <section id="ozellikler" className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-normal tracking-[-1px] leading-[1.1] mb-4">
            İşletmenizi Büyüten Özellikler
          </h2>
          <p className="text-muted-foreground text-base leading-[1.55]">
            Kuyumcu sektörüne özel geliştirilen kapsamlı araçlarla işinizi
            kolaylaştırın.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-surface-card rounded-xl p-8 border-0"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-[1.55]">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
