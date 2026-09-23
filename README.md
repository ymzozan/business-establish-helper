# Kuyumcu Merkezi

Next.js 16 ile hazırlanmış kuyumcu mağazası kurulum, toptan altın ve tamirat talep sitesi.

## Yerel geliştirme

```sh
npm ci
vercel env pull .env.local --environment=development
npm run db:generate
npm run dev
```

Veritabanı Neon PostgreSQL üzerinde çalışır. Prisma şu ortam değişkenlerini kullanır:

- `KUYUMCU_DATABASE_URL`: havuzlu uygulama bağlantısı.
- `KUYUMCU_DATABASE_URL_UNPOOLED`: migration için doğrudan bağlantı.
- `KUYUMCU_AUTH_SECRET`: Vercel panel oturumu anahtarı. Yerelde `AUTH_SECRET` kullanılabilir.

`.env.example` yalnızca şablondur. Gerçek bağlantıları ve parolaları Git'e eklemeyin. `.vercelignore` yerel gizli dosyaların dağıtım paketine alınmasını engeller.

## Veritabanı

Önce proje bağlantısı ve ortam değişkenleri doğrulanmalıdır. Mevcut migration dosyalarıyla kurulum:

```sh
node scripts/database-command.mjs migrate
node scripts/database-command.mjs status
```

Bu komutlar `.env.local` ve geliştirme ayarlarını yükler; veritabanını sıfırlamaz. Eski `db:seed` komutu örnek parola ve veri temizliği içerdiğinden canlı veritabanında kullanılmamalıdır.

## Doğrulama

Yerel sunucu açıkken `node scripts/verify-requests.cjs` üç talep türünün API ve veritabanı kaydını, yönetici oturumunu ve durum güncellemeyi kontrol eder. Yalnızca kendi benzersiz işaretli test kayıtlarını temizler. Yönetici testi için Git tarafından yok sayılan `.env.admin.local` içinde `ADMIN_EMAIL` ve `ADMIN_PASSWORD` gerekir.

Panel `/giris` adresinden açılır. Başvurular ve yönetim API'leri yetki kontrolü yapar. Kullanıcı, hizmet ve soru yönetimi ADMIN rolüne açıktır.

## Yayın

```sh
vercel deploy --yes
```

Önizleme varsayılan hedeftir. Üretim yayını ayrıca `--prod` gerektirir. Derleme Prisma istemcisini üretir; migration otomatik çalıştırılmaz. Neon bağlantısı önizlemeler için ayrı veritabanı dalları oluşturacak şekilde yapılandırılmıştır.

Marka adı, mağaza modelleri ve görsel temsili başlangıç içeriğidir. Formlar ödeme veya kesin sipariş oluşturmaz; satış ekibine değerlendirme için talep kaydeder.
