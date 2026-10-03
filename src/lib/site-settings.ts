import { prisma } from "@/lib/db";
export const privacyDraft = `TASLAK — Firma bilgileri ve gerçek işleyiş doğrulanmadan yayımlamayın.

Hangi bilgiler alınır?
Talep formundaki ad, soyad, telefon, isteğe bağlı e-posta, şehir, bütçe, not, ürün/mağaza tercihleri ve eklediğiniz tamirat fotoğrafı alınır. Fotoğrafa kimlik, yüz veya gereksiz kişisel bilgi eklemeyin.

Nasıl kullanılır?
Bilgiler talebi değerlendirmek, size ulaşmak, teklif hazırlamak ve görüşmeleri takip etmek için kullanılır. Talep formu reklam aboneliği oluşturmaz.

Erişim ve altyapı
Kayıtlara yetkili yönetim personeli erişir. Site Vercel, veritabanı Neon altyapısını kullanır. E-posta bildirimi etkinleştirilirse Resend üzerinden yalnızca talep numarası ve panel bağlantısı gönderilir. Altyapının yurt dışındaki işleme ve aktarım koşulları, uygun hukuki mekanizma ile birlikte işletme tarafından değerlendirilip açıklanmalıdır.

Saklama ve başvuru
Saklama süreleri, silme usulü, veri sorumlusu ve başvuru adresi işletmenin gerçek süreçlerine göre tamamlanmalıdır.

Çerezler
Yönetim girişi için oturum ve güvenlik çerezleri kullanılır. Bu uygulamaya pazarlama veya analiz çerezi eklenmemiştir. Barındırma sağlayıcısının güvenlik işleyişi ayrıca değerlendirilmelidir.`;
export const disclosureDraft = `TASLAK — İşletmenin incelemesi ve tamamlaması içindir.

1. Veri sorumlusu
[Gerçek şirket unvanı, adresi ve iletişim bilgileri]

2. Veri kategorileri ve amaçlar
Ad, soyad ve iletişim bilgileri talebinize dönüş yapmak; ürün/mağaza seçimleri, bütçe, not ve isteğe bağlı fotoğraf ise ihtiyacı değerlendirmek ve teklif hazırlamak için işlenir.

3. Toplama yöntemi ve hukuki sebep
Bilgiler çevrimiçi talep formuyla elektronik ortamda toplanır. Sözleşme kurulması/ifasıyla doğrudan ilgili ve gerekli işlemler için 6698 sayılı Kanun m.5/2(c) değerlendirilmelidir. Başka amaçlar varsa bunların hukuki sebebi ayrıca belirlenmelidir; bu taslak otomatik bir uygunluk tespiti değildir.

4. Aktarım
Yetkili personel, barındırma ve veritabanı hizmet sağlayıcıları ile etkinleştirilirse e-posta sağlayıcısının rolleri; alıcı grupları, amaçları ve yurt dışı aktarım mekanizmaları işletmece somutlaştırılmalıdır.

5. Haklar ve başvuru
Kanunun 11. maddesi kapsamında işlenip işlenmediğini öğrenme, bilgi talep etme, amaca uygun kullanımı öğrenme, aktarılan kişileri öğrenme, düzeltme, koşulları varsa silme/yok etme ve bu işlemlerin alıcılara bildirilmesini isteme; münhasıran otomatik analiz sonucu aleyhinize bir sonuca itiraz etme ve hukuka aykırı işlemden doğan zararın giderilmesini isteme haklarınız bulunur.
[Başvuru adresi, yöntemi ve ilgili iletişim kanalı tamamlanmalıdır.]`;
export async function getSettings() {
  const saved = await prisma.siteSettings.findUnique({ where: { id: "main" } });
  return (
    saved || {
      id: "main",
      companyName: "Kuyumcu Merkezi",
      legalName: "Örnek Kuyumculuk Ltd. Şti. (örnek bilgi)",
      phone: "",
      address: "İstanbul, Türkiye (örnek adres)",
      email: "iletisim@example.com",
      demo: true,
      notificationEmail: "",
      notificationEnabled: false,
      privacyText: privacyDraft,
      disclosureText: disclosureDraft,
      legalPublished: false,
      updatedAt: new Date(0),
    }
  );
}
export function emailReady() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      !process.env.RESEND_API_KEY.startsWith("re_your") &&
      process.env.NOTIFICATION_FROM,
  );
}
