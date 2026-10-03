import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "İletişim | Kuyumcu Merkezi" };
export const dynamic = "force-dynamic";
import { getSettings } from "@/lib/site-settings";
export default async function ContactPage() {
  const settings = await getSettings();
  return (
    <article className="editorial-page narrow-page">
      <span className="simple-kicker">İLETİŞİM</span>
      <h1>
        Bir ihtiyacınız var.
        <br />
        Konuşarak başlayalım.
      </h1>
      <p className="editorial-lead">
        Konunuzu seçin, iletişim bilgilerinizi bırakın. Talebiniz doğrudan
        ekibimizin takip ekranına ulaşsın.
      </p>
      <section className="company-contact">
        <h2>{settings.companyName}</h2>
        {settings.demo && (
          <p className="editorial-note">
            Örnek firma bilgileri — henüz doğrulanmamıştır. İletişim için
            aşağıdaki talep formunu kullanın.
          </p>
        )}
        <p>{settings.legalName}</p>
        <p>{settings.address}</p>
        {settings.phone && (
          <p>
            {settings.demo ? (
              settings.phone
            ) : (
              <a href={`tel:${settings.phone.replace(/[^+0-9]/g, "")}`}>
                {settings.phone}
              </a>
            )}
          </p>
        )}
        {settings.email && (
          <p>
            {settings.demo ? (
              settings.email
            ) : (
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            )}
          </p>
        )}
      </section>
      <div className="contact-paths">
        {[
          ["kurulum", "Kuyumcu açmak istiyorum"],
          ["toptan", "Toptan altın almak istiyorum"],
          ["tamirat", "Tamirat / tadilat yaptırmak istiyorum"],
        ].map(([key, title]) => (
          <Link key={key} href={`/?hizmet=${key}`}>
            {title}
            <span>→</span>
          </Link>
        ))}
      </div>
      <p className="editorial-note">
        Sorularınızı formun not alanına yazabilirsiniz. Bilmediğiniz detayları
        birlikte netleştirebiliriz.
      </p>
    </article>
  );
}
