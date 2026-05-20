import { ClipboardList, Settings, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Başvuru Yapın",
    description:
      "Online formumuz aracılığıyla işletme bilgilerinizi ve ihtiyaçlarınızı belirtin. Uzman ekibimiz başvurunuzu değerlendirecektir.",
  },
  {
    number: "02",
    icon: Settings,
    title: "Kurulum",
    description:
      "Onay sonrası ekibimiz sistemi işletmenize özel konfigüre eder. Mevcut verilerinizin aktarımını gerçekleştirir.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Kullanmaya Başlayın",
    description:
      "Eğitim desteği ile sistemi hızlıca öğrenin. 7/24 teknik destek ile sorunsuz bir deneyim yaşayın.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="nasil-calisir" className="py-24 bg-surface-soft">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-normal tracking-[-1px] leading-[1.1] mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-muted-foreground text-base leading-[1.55]">
            Üç basit adımda dijital dönüşümünüzü başlatın.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-background rounded-xl p-8 border border-hairline">
              <div className="flex items-center gap-4 mb-6">
                <span className="font-heading text-[36px] font-normal tracking-[-0.5px] leading-none text-primary">
                  {step.number}
                </span>
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <step.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-[1.55]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
