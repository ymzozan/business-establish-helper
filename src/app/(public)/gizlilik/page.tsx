import { getSettings } from "@/lib/site-settings";
export const dynamic = "force-dynamic";
export const metadata = { title: "Gizlilik | Kuyumcu Merkezi" };
export default async function Page() {
  const s = await getSettings();
  return (
    <article className="editorial-page narrow-page">
      <span className="simple-kicker">GİZLİLİK</span>
      <h1>Bilgileriniz hakkında.</h1>
      {s.legalPublished ? (
        <div className="article-body legal-copy">{s.privacyText}</div>
      ) : (
        <div className="article-body">
          <p>
            Bu site şu anda örnek firma bilgileriyle hazırlanmıştır. Firmaya
            özel gizlilik metni henüz yayımlanmamıştır.
          </p>
          <p>
            Talep formuna yazdığınız iletişim bilgileri, seçimler, bütçe, not ve
            varsa fotoğraf talebi değerlendirmek için kaydedilir. Kayıtlara
            yetkili yönetim personeli erişebilir. Yönetim girişi için oturum ve
            güvenlik çerezleri kullanılır.
          </p>
          <p>Lütfen kimlik belgesi veya gereksiz kişisel bilgi göndermeyin.</p>
        </div>
      )}
    </article>
  );
}
