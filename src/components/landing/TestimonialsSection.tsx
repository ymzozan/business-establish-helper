const testimonials = [
  {
    name: "Ahmet Yılmaz",
    business: "Yılmaz Kuyumculuk",
    quote:
      "Stok takibimiz artık çok daha kolay. Altın borsası entegrasyonu sayesinde fiyatlarımızı anlık güncelliyoruz. Müşteri memnuniyetimiz gözle görülür şekilde arttı.",
  },
  {
    name: "Fatma Demir",
    business: "Demir Gold",
    quote:
      "Çoklu şube yönetimi hayatımızı kurtardı. İki mağazamız arasındaki stok transferini tek tıkla yapıyoruz. Raporlama modülü de çok detaylı.",
  },
  {
    name: "Mehmet Kaya",
    business: "Kaya Mücevherat",
    quote:
      "e-Fatura entegrasyonu ile muhasebe süreçlerimiz tamamen otomatik hale geldi. Destek ekibi her zaman ulaşılabilir ve çözüm odaklı.",
  },
];

export function TestimonialsSection() {
  return (
    <section id="referanslar" className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-normal tracking-[-1px] leading-[1.1] mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-muted-foreground text-base leading-[1.55]">
            Sektörün güvendiği platform hakkında kullanıcı görüşleri.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-surface-card rounded-xl p-8"
            >
              <blockquote className="text-[#3d3d3a] text-sm leading-[1.55] mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.business}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
