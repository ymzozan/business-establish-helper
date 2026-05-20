import Link from "next/link";
import { ArrowRight, Shield, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent" />
      <div className="container relative py-24 sm:py-32 lg:py-40">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block mb-6 px-4 py-1.5 text-xs font-medium tracking-[1.5px] uppercase rounded-full bg-surface-card text-foreground">
            Kuyumcu Sektörüne Özel Çözüm
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-normal tracking-[-1.5px] leading-[1.05] text-foreground mb-6">
            Kuyumcu İşletmenizi{" "}
            <span className="text-primary">Dijitalleştirin</span>
          </h1>
          <p className="text-[#3d3d3a] text-base sm:text-lg leading-[1.55] max-w-2xl mx-auto mb-10">
            Stok yönetiminden müşteri takibine, fatura kesiminden altın borsası
            entegrasyonuna kadar tüm ihtiyaçlarınız tek platformda.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/basvuru/kuyumcu">
              <Button size="lg" className="text-sm font-medium px-5 h-10 rounded-lg">
                Başvuru Yap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#nasil-calisir">
              <Button variant="outline" size="lg" className="text-sm font-medium px-5 h-10 rounded-lg border-hairline">
                Nasıl Çalışır?
              </Button>
            </Link>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>300+ Aktif Kuyumcu</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Güvenli Altyapı</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>7/24 Destek</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
