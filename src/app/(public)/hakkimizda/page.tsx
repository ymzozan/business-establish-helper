import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Hakkımızda | Kuyumcu Merkezi" };
export default function AboutPage() {
  return (
    <article className="editorial-page">
      <span className="simple-kicker">KUYUMCU MERKEZİ</span>
      <h1>
        İyi bir başlangıç,
        <br />
        doğru bir buluşmayla olur.
      </h1>
      <p className="editorial-lead">
        Mağaza kurulumu, toptan altın ve tamirat ihtiyaçlarını tek bir yerde
        buluşturuyoruz.
      </p>
      <div className="editorial-cover">
        <Image
          src="/images/kuyumcu-konsept.png"
          alt="Temsili kuyumcu mağazası konsepti"
          fill
          sizes="(max-width: 700px) 90vw, 900px"
        />
      </div>
      <div className="editorial-columns">
        <section>
          <h2>Önce sizi dinliyoruz.</h2>
          <p>
            Her mağazanın alanı, her işletmenin hedefi, her takının ihtiyacı
            farklı. Bu yüzden önce ne istediğinizi soruyor, bildiğiniz
            detaylarla başlıyoruz.
          </p>
        </section>
        <section>
          <h2>Sonra birlikte planlıyoruz.</h2>
          <p>
            Seçimleriniz ve ayırdığınız bütçe tek bir talepte toplanıyor.
            Ekibimiz bu bilgiler üzerinden sizinle iletişime geçerek kapsamı ve
            sonraki adımları netleştiriyor.
          </p>
        </section>
      </div>
      <Link className="editorial-cta" href="/">
        Birlikte başlayalım →
      </Link>
    </article>
  );
}
