import { Shield, Lightbulb, Heart, Award } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Güvenilirlik",
    description: "Verilerinizi en yüksek güvenlik standartlarıyla koruyoruz. KVKK uyumlu altyapımız ile gönül rahatlığıyla çalışın.",
  },
  {
    icon: Lightbulb,
    title: "Yenilikçilik",
    description: "Sektörün ihtiyaçlarını yakından takip ederek sürekli gelişen ve yenilenen çözümler sunuyoruz.",
  },
  {
    icon: Heart,
    title: "Müşteri Odaklılık",
    description: "Her işletmenin kendine özgü olduğunu biliyoruz. Çözümlerimizi ihtiyaçlarınıza göre özelleştiriyoruz.",
  },
  {
    icon: Award,
    title: "Sektörel Uzmanlık",
    description: "Kuyumculuk sektöründeki derin deneyimimizle, sektöre özel gerçek çözümler üretiyoruz.",
  },
];

export default function HakkimizdaPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <section className="bg-surface-soft py-20 sm:py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-[-1.5px] leading-[1.05] text-foreground mb-4">
            Hakkımızda
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-[1.55]">
            Kuyumcu sektörünün dijital dönüşüm ortağı.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="container max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-[36px] font-normal tracking-[-0.5px] leading-[1.15] mb-6">
            Hikayemiz
          </h2>
          <div className="space-y-4 text-[#3d3d3a] text-base leading-[1.55]">
            <p>
              Kuyumcu Otomasyon, kuyumculuk sektöründeki yıllara dayanan
              deneyimimizi teknoloji ile buluşturarak doğdu. Sektörün
              geleneksel yöntemlerle yürütülen iş süreçlerini dijitalleştirmek
              ve verimliliği artırmak amacıyla yola çıktık.
            </p>
            <p>
              Bugün, Türkiye genelinde 300&apos;den fazla kuyumcu işletmesine
              hizmet veren platformumuz ile sektörün en güvenilir teknoloji
              ortağı olmaya devam ediyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-surface-soft">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-background rounded-xl p-8 border border-hairline">
              <h3 className="font-heading text-[28px] font-normal tracking-[-0.3px] leading-[1.2] mb-4">
                Misyonumuz
              </h3>
              <p className="text-muted-foreground text-sm leading-[1.55]">
                Kuyumculuk sektörüne özel, kullanımı kolay ve güvenilir dijital
                çözümler sunarak işletmelerin büyümesine ve modernleşmesine
                katkıda bulunmak.
              </p>
            </div>
            <div className="bg-background rounded-xl p-8 border border-hairline">
              <h3 className="font-heading text-[28px] font-normal tracking-[-0.3px] leading-[1.2] mb-4">
                Vizyonumuz
              </h3>
              <p className="text-muted-foreground text-sm leading-[1.55]">
                Türkiye&apos;nin lider kuyumcu otomasyon platformu olarak
                sektörün dijital dönüşümüne öncülük etmek ve global pazarda
                söz sahibi olmak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-normal tracking-[-1px] leading-[1.1] mb-4">
              Değerlerimiz
            </h2>
            <p className="text-muted-foreground text-base leading-[1.55]">
              Çalışmalarımıza yön veren temel ilkeler.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-surface-card rounded-xl p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-base font-medium text-foreground mb-2">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-[1.55]">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
