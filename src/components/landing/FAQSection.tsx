const faqs = [
  {
    question: "Sistemi kullanmak için teknik bilgi gerekiyor mu?",
    answer:
      "Hayır, platformumuz kullanıcı dostu bir arayüze sahiptir. Ayrıca kurulum sonrası ekibimiz kapsamlı bir eğitim sağlar.",
  },
  {
    question: "Mevcut verilerimi sisteme aktarabilir miyim?",
    answer:
      "Evet, Excel ve diğer formatlardaki mevcut stok, müşteri ve satış verilerinizi sisteme kolayca aktarabilirsiniz. Ekibimiz bu süreçte size destek olur.",
  },
  {
    question: "Altın borsası fiyatları ne sıklıkla güncellenir?",
    answer:
      "Altın, gümüş ve döviz kurları borsadan anlık olarak çekilir ve otomatik olarak ürün fiyatlarınıza yansıtılır.",
  },
  {
    question: "Birden fazla şubem var, tek panelden yönetebilir miyim?",
    answer:
      "Evet, çoklu şube modülü ile tüm mağazalarınızı tek bir panelden yönetebilir, şubeler arası stok transferi yapabilir ve konsolide raporlar alabilirsiniz.",
  },
  {
    question: "Verilerim güvende mi?",
    answer:
      "Tüm verileriniz SSL şifreleme ile korunur, düzenli yedeklemeler yapılır ve Türkiye merkezli sunucularda barındırılır. KVKK uyumlu altyapımız ile verileriniz güvendedir.",
  },
  {
    question: "Destek hizmeti nasıl çalışır?",
    answer:
      "7/24 telefon, e-posta ve canlı destek kanallarımız üzerinden teknik destek sunuyoruz. Ayrıca kapsamlı bir bilgi bankası ve video eğitim içerikleri mevcuttur.",
  },
];

export function FAQSection() {
  return (
    <section id="sss" className="py-24 bg-surface-soft">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[48px] font-normal tracking-[-1px] leading-[1.1] mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-muted-foreground text-base leading-[1.55]">
            Merak ettiklerinize hızlı yanıtlar.
          </p>
        </div>
        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-background rounded-xl border border-hairline"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-sm font-medium text-foreground list-none [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-45 text-lg leading-none">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-sm text-muted-foreground leading-[1.55]">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
