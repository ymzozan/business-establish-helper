const testimonials = [
  {
    name: "Ahmet Yılmaz",
    business: "Yılmaz Kuyumculuk",
    location: "İstanbul",
    quote:
      "Stok takibimiz artık çok daha kolay. Altın borsası entegrasyonu sayesinde fiyatlarımızı anlık güncelliyoruz. Müşteri memnuniyetimiz gözle görülür şekilde arttı.",
  },
  {
    name: "Fatma Demir",
    business: "Demir Gold",
    location: "Ankara",
    quote:
      "Çoklu şube yönetimi hayatımızı kurtardı. İki mağazamız arasındaki stok transferini tek tıkla yapıyoruz. Raporlama modülü de çok detaylı.",
  },
  {
    name: "Mehmet Kaya",
    business: "Kaya Mücevherat",
    location: "İzmir",
    quote:
      "e-Fatura entegrasyonu ile muhasebe süreçlerimiz tamamen otomatik hale geldi. Destek ekibi her zaman ulaşılabilir ve çözüm odaklı.",
  },
  {
    name: "Ayşe Çelik",
    business: "Çelik Altın",
    location: "Bursa",
    quote:
      "Müşteri takip modülü ile taksitli satışlarımızı kolayca yönetiyoruz. Ödeme hatırlatmaları müşteri ilişkilerimizi güçlendirdi.",
  },
  {
    name: "Hüseyin Arslan",
    business: "Arslan Sarrafiye",
    location: "Antalya",
    quote:
      "Raporlama modülü sayesinde hangi ürünlerin daha çok satıldığını, kâr marjlarımızı ve stok devir hızımızı detaylı şekilde görebiliyorum.",
  },
  {
    name: "Zeynep Öztürk",
    business: "Öztürk Pırlanta",
    location: "Konya",
    quote:
      "Barkod sistemi ile sayım süremiz yarıya indi. Stok uyarıları sayesinde hiçbir ürünümüz eksik kalmıyor. Çok memnunuz.",
  },
];

const stats = [
  { value: "300+", label: "Aktif Kullanıcı" },
  { value: "42", label: "Şehir" },
  { value: "%98", label: "Memnuniyet Oranı" },
  { value: "5 Yıl+", label: "Sektör Deneyimi" },
];

export default function ReferanslarPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <section className="bg-surface-soft py-20 sm:py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-[-1.5px] leading-[1.05] text-foreground mb-4">
            Referanslar
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-[1.55]">
            Müşterilerimizin deneyimleri ve başarı hikayeleri.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-surface-dark py-14">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-3xl sm:text-4xl font-normal tracking-[-0.5px] leading-none text-on-dark mb-2">
                  {stat.value}
                </div>
                <p className="text-on-dark-soft text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-24">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <p className="text-sm font-medium text-foreground">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.business} &middot; {t.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
