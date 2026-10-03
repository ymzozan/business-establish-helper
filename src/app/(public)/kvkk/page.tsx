import { getSettings } from "@/lib/site-settings";
export const dynamic = "force-dynamic";
export const metadata = { title: "KVKK Aydınlatma | Kuyumcu Merkezi" };
export default async function Page() {
  const s = await getSettings();
  return (
    <article className="editorial-page narrow-page">
      <span className="simple-kicker">KVKK AYDINLATMA</span>
      <h1>Şeffaf bir başlangıç.</h1>
      {s.legalPublished ? (
        <div className="article-body legal-copy">{s.disclosureText}</div>
      ) : (
        <div className="article-body">
          <p>
            Site örnek firma bilgileriyle hazırlanmıştır. Veri sorumlusunun
            gerçek unvanı, iletişim bilgileri ve işleme koşulları tamamlandıktan
            sonra aydınlatma metni burada yayımlanacaktır.
          </p>
          <p>
            Bu açıklama, tamamlanmış bir KVKK aydınlatma metni değildir. Deneme
            yaparken örnek bilgiler kullanın.
          </p>
        </div>
      )}
    </article>
  );
}
