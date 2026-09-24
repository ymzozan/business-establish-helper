import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "İletişim | Kuyumcu Merkezi" };
export default function ContactPage() {
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
