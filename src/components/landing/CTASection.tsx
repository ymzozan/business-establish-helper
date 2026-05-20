import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-24">
      <div className="container">
        <div className="bg-primary rounded-xl px-8 py-16 sm:px-12 sm:py-20 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-normal tracking-[-0.5px] leading-[1.15] text-primary-foreground mb-4">
            İşletmenizi Dönüştürmeye Hazır Mısınız?
          </h2>
          <p className="text-primary-foreground/80 text-base leading-[1.55] max-w-lg mx-auto mb-8">
            Hemen başvurun, uzman ekibimiz sizinle iletişime geçsin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/basvuru/kuyumcu">
              <Button
                size="lg"
                variant="secondary"
                className="text-sm font-medium px-6 h-10 rounded-lg bg-background text-foreground hover:bg-surface-soft"
              >
                Başvuruya Başlayın
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/iletisim">
              <Button
                size="lg"
                variant="outline"
                className="text-sm font-medium px-6 h-10 rounded-lg bg-white/15 border-white/40 text-white hover:bg-white/25"
              >
                <Phone className="mr-2 h-4 w-4" />
                Bizi Arayın
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
