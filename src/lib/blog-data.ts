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
    slug: "kuyumcu-acmak-icin-gereken-yatirim",
    title: "2025'te Kuyumcu Açmak İçin Gereken Yatırım Rehberi",
    excerpt: "Sıfırdan kuyumcu açmak isteyenler için detaylı maliyet analizi. Vitrin, stok, güvenlik ve dijital altyapı maliyetlerini gerçekçi rakamlarla inceledik.",
    content: `
Kuyumculuk sektörü, doğru lokasyon ve sermaye yönetimiyle oldukça karlı bir yatırım alanı olmaya devam etmektedir. Ancak başlangıç maliyetlerini doğru hesaplamak kritik önem taşır.

## Başlangıç Maliyetleri

**Dükkan ve Vitrin**
Lokasyona göre değişen kira bedelleri dışında, kuyumcuya özel vitrin tasarımı ve cam vitrinin kurulumu 150.000 - 400.000 TL arasında değişmektedir.

**İlk Stok**
Minimum bir kuyumcu açılışı için:
- 8K ve 14K takı malzemeleri: 500.000 TL başı
- 22K bilezik ve ziynet eşyası: 300.000 TL başı
- Has altın rezervi: En az 500.000 TL önerilir

**Güvenlik Altyapısı**
- Kasa ve kasalık: 50.000 - 150.000 TL
- Alarm sistemi: 20.000 - 50.000 TL
- Kamera sistemi: 15.000 - 30.000 TL

**Dijital Altyapı**
- Yazılım lisansı (yıllık): 15.000 - 30.000 TL
- Terazi ve barkod sistemi: 20.000 - 40.000 TL
- POS cihazı ve kurulum: 5.000 - 15.000 TL

## SORS Anahtar Teslim Paketleri

SORS olarak 3 Milyon TL'den başlayan paketlerimizde tüm bu kalemleri kapsıyoruz. Uzman ekibimiz lokasyon seçiminden yazılım eğitimine kadar tüm süreci yönetiyor.
    `,
    category: "Yatırım",
    readingTime: 6,
    date: "2025-05-10",
    author: "SORS Editörü",
  },
  {
    id: "2",
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
    date: "2025-05-05",
    author: "SORS Editörü",
  },
  {
    id: "3",
    slug: "kuyumcu-yazilim-secimi",
    title: "Kuyumcu Yazılımı Seçerken Dikkat Edilmesi Gerekenler",
    excerpt: "PusulaNet ve ML Yazılım gibi sektör liderlerini karşılaştırıyoruz. Doğru yazılım seçimi işletmenizin verimliliğini nasıl artırır?",
    content: `
Kuyumcu yazılımı seçimi, işletmenizin günlük operasyonlarını doğrudan etkiler. Yanlış bir seçim veri kayıplarına, stok hatalarına ve muhasebe problemlerine yol açabilir.

## Kritik Özellikler

**Stok Yönetimi**
Her parça için gram, ayar ve maliyet bilgisi ayrı ayrı takip edilebilmeli. Ürün hareketi anlık görüntülenebilmeli.

**Terazi Entegrasyonu**
Dijital terazilerle doğrudan bağlantı, manuel hataları sıfıra indirir. Her tartım otomatik kaydedilir.

**Barkod Sistemi**
Her ürüne özel barkod oluşturma ve okuma özelliği, stok sayımını hızlandırır.

**Muhasebe Modülü**
Kasa, banka ve cari hesap entegrasyonu zorunludur. Günlük kapanış ve aylık bilanço otomatik oluşturulabilmeli.

## PusulaNet vs ML Yazılım

Her iki yazılım da sektörde kanıtlanmış çözümlerdir. Tercih genellikle işletme büyüklüğüne ve bütçeye göre yapılır.

SORS kurulumlarında her iki yazılımı da uygulama ve eğitim desteğiyle sunmaktayız.
    `,
    category: "Teknoloji",
    readingTime: 7,
    date: "2025-04-28",
    author: "SORS Editörü",
  },
];
