export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readingTime: number;
  date: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "iscilik-tuzagi-toptan-altin",
    title: "Toptan Altın Alırken İşçilik Tuzağından Nasıl Korunulur?",
    excerpt: "Kuyumcuların en sık düştüğü tuzakların başında 'işçilik' adı altında gizlenen maliyet artışları gelir. Bu rehberde neye dikkat etmeniz gerektiğini anlattık.",
    content: `
Toptan altın alımında gram fiyatı her zaman tek belirleyici değildir. Pek çok kuyumcu, işçilik bedelleri yüzünden maliyet hesaplamalarını yanlış yapıyor.

## İşçilik Nedir ve Neden Kritiktir?

İşçilik, ham altının takıya dönüştürülmesi sürecinde katılan üretim maliyetidir. Gram başı hesaplanır ve has altın değerinin %10 ila %40'ı arasında değişebilir. Bazı tedarikçiler, düşük gram fiyatı gösterirken yüksek işçilik ekleyerek gerçek maliyeti gizler.

## Sık Karşılaşılan Tuzaklar

**1. Gram fiyatı düşük, işçilik yüksek**
Has altın fiyatı piyasaya yakın görünür ancak işçilik bedeli gramı 150 TL'ye çekebilir. Toplamı karşılaştırmadan alım yapmayın.

**2. Gramaj hilesi**
Takının ağırlığı yüksek tutulur, görünürdeki has altın oranı düşürülür. Her ürünü terazi ile kontrol edin, sertifika isteyin.

**3. "Serbest piyasa" yerine sabit fiyat dayatması**
Bazı tedarikçiler günlük altın fiyatına sabitlemek yerine sabit fiyat önerir. Bu esnekliği kaybetmek demektir.

## Korunma Yöntemleri

- Her teklifte **has altın gram maliyetini** ayrıştırın: toplam fiyat ÷ has altın gramı
- Birden fazla tedarikçi karşılaştırması yapın
- Mümkünse atölyeyi ziyaret edin, üretim sürecini görün
- Sertifikalı has altın analizi talep edin

## SORS Yaklaşımı

SORS tedarik ağında tüm ürünler has altın değeri üzerinden fiyatlandırılır. İşçilik bedelleri ayrı ve şeffaf olarak gösterilir. Fiyat karşılaştırma tablosunu kataloğumuzdan talep edin.
    `,
    category: "Tedarik",
    readingTime: 5,
    date: "2026-04-18",
    author: "SORS Editörü",
  },
  {
    id: "2",
    slug: "2026-kuyumcu-acmanin-maliyeti",
    title: "2026 Yılında Sıfırdan Kuyumcu Açmanın Maliyeti Nedir?",
    excerpt: "Vitrin, stok, güvenlik, yazılım ve kira — 2026 rakamlarıyla sıfırdan kuyumcu açmanın gerçek maliyetini tüm kalemleriyle hesapladık.",
    content: `
2026 yılında kuyumcu açmak hem cazip hem de ciddi sermaye gerektiren bir yatırım. Doğru planlama yapılmadan girişimler ilk yılda ciddi zararla karşılaşıyor.

## Temel Maliyet Kalemleri (2026)

**Dükkan ve Vitrin**
Kuyumcuya özel vitrin sistemleri, AVM ve cadde konumuna göre değişmekle birlikte:
- Vitrin tasarım ve üretimi: 150.000 – 400.000 TL
- İç dekorasyon: 80.000 – 200.000 TL

**İlk Altın Stoğu**
- 8K ve 14K takı: 500.000 TL minimum
- 22K bilezik ve ziynet: 300.000 TL minimum
- Has altın rezervi: 500.000 TL önerilir

**Güvenlik Altyapısı**
- Güvenli kasa: 50.000 – 180.000 TL
- Kamera + alarm sistemi: 35.000 – 80.000 TL

**Dijital Altyapı**
- Kuyumcu yazılımı (yıllık lisans): 18.000 – 35.000 TL
- Terazi + barkod sistemi: 25.000 – 50.000 TL
- POS cihazı: 8.000 – 20.000 TL

## Toplam Tablo

| Kalem | Minimum | Ortalama |
|-------|---------|----------|
| Vitrin & Dekorasyon | 230.000 TL | 450.000 TL |
| İlk Stok | 1.300.000 TL | 2.500.000 TL |
| Güvenlik | 85.000 TL | 180.000 TL |
| Dijital Altyapı | 51.000 TL | 105.000 TL |
| **Toplam** | **~1.7 Milyon TL** | **~3.2 Milyon TL** |

## SORS Anahtar Teslim Paket

3 Milyon TL'den başlayan SORS paketlerinde tüm bu kalemler dahildir. Ayrıca lokasyon analizi ve ilk 6 ay operasyonel destek sunuyoruz.
    `,
    category: "Yatırım",
    readingTime: 7,
    date: "2026-03-22",
    author: "SORS Editörü",
  },
  {
    id: "3",
    slug: "kuyumcu-dijital-vitrin-donusumu",
    title: "Kuyumcu Mağazalarında Dijital Vitrin Dönüşümü",
    excerpt: "Geleneksel kuyumcu vitrininden dijital ekranlı, stok entegreli akıllı vitrinine geçiş. Müşteri deneyimini ve satışları nasıl artırıyor?",
    content: `
Dijital dönüşüm kuyumculuk sektörüne de girdi. Akıllı vitrin sistemleri müşteri deneyimini ve satışları ciddi ölçüde artırıyor.

## Dijital Vitrinin Avantajları

**Anlık Fiyat Güncellemesi**
Altın fiyatları gün içinde değişir. Dijital vitrinlerde fiyatlar otomatik güncellenir; yanlış etiket riski ortadan kalkar.

**Stok Entegrasyonu**
Vitrin ekranları yazılımla bağlıdır. Tükenen ürünler otomatik "tükendi" göstergesiyle işaretlenir, stok sayımı kolaylaşır.

**Müşteri Deneyimi**
İnteraktif ekranlar müşteriye ürün detayını, ayarını ve gram ağırlığını doğrudan vitirinde gösterir. Personel yükü azalır.

**Güvenlik Entegrasyonu**
Akıllı kamera sistemleriyle vitrin izlemesi entegre çalışır. Harekete duyarlı vitrin aydınlatması hırsızlık caydırıcısıdır.

## Kurulum Süreci

1. Mevcut vitrin analizi ve ölçü alımı
2. Dijital panel seçimi (55" – 85" endüstriyel ekranlar)
3. Yazılım entegrasyonu (PusulaNet veya ML Yazılım)
4. Personel eğitimi
5. Canlıya geçiş ve ilk ay takibi

## Maliyet

Tam dijital dönüşüm paketi 120.000 – 280.000 TL arasında değişmektedir. ROI genellikle 18 – 24 ayda elde edilir.

SORS modernizasyon programı çerçevesinde dijital vitrin kurulumu için randevu talep edebilirsiniz.
    `,
    category: "Dijitalleşme",
    readingTime: 6,
    date: "2026-02-14",
    author: "SORS Editörü",
  },
  {
    id: "4",
    slug: "altin-ayar-hesaplama-rehberi",
    title: "Altın Ayar ve Milyem Hesaplama: Eksiksiz Rehber",
    excerpt: "8 ayardan 24 ayara kadar tüm ayarların milyem değerleri, has altın hesaplama yöntemi ve piyasada bilmeniz gereken tüm formüller.",
    content: `
Altın ticaretinde milyem hesabı en temel bilgilerden biridir. Bu rehberde tüm ayarları ve hesaplama yöntemini detaylıca açıklıyoruz.

## Milyem Nedir?

Milyem, altının içindeki saf altın oranını binde olarak ifade eder. 1000 milyem = %100 saf altın anlamına gelir.

## Ayar Tablosu

| Ayar | Milyem | Saflık |
|------|--------|--------|
| 8 Ayar | 333‰ | %33.3 |
| 14 Ayar | 585‰ | %58.5 |
| 18 Ayar | 750‰ | %75.0 |
| 22 Ayar | 916‰ | %91.6 |
| 24 Ayar | 999‰ | %99.9 |

## Hesaplama Formülü

Has Altın = Ağırlık (gram) × Milyem Değeri

**Örnek:** 10 gram 14 ayar altın için:
10 × 0.585 = 5.85 gram has altın

## Pratik İpuçları

Kuyumculuk ticaretinde her zaman has altın değeri üzerinden alım satım yapılır. Günlük altın fiyatları da has altın gram fiyatı olarak açıklanır.
    `,
    category: "Eğitim",
    readingTime: 5,
    date: "2026-01-20",
    author: "SORS Editörü",
  },
];
