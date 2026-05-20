import Link from "next/link";
import { ArrowRight, Plus, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function SectorPage({
  params,
}: {
  params: Promise<{ sectorSlug: string }>;
}) {
  const { sectorSlug } = await params;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Ne yapmak istiyorsunuz?
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Size en uygun hizmet paketini oluşturabilmemiz için seçim yapın.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
        <Link href={`/basvuru/${sectorSlug}/yeni`} className="group block">
          <Card className="h-full border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-emerald-500/30 hover:-translate-y-0.5">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                <Plus className="h-7 w-7 text-emerald-600" />
              </div>
              <CardTitle className="text-base font-semibold tracking-tight">
                Yeni Kuyumcu Açmak İstiyorum
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Sıfırdan kuyumcu dükkanı açma sürecinde ihtiyacınız olan tüm
                hizmetleri belirleyelim.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 group-hover:gap-2.5 transition-all">
                Başla <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>

        <Link href={`/basvuru/${sectorSlug}/yenileme`} className="group block">
          <Card className="h-full border-border/50 shadow-sm transition-all duration-300 hover:shadow-md hover:border-blue-500/30 hover:-translate-y-0.5">
            <CardHeader className="text-center pb-3">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                <RefreshCw className="h-7 w-7 text-blue-600" />
              </div>
              <CardTitle className="text-base font-semibold tracking-tight">
                Mevcut Kuyumcumu Yenilemek İstiyorum
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                Var olan dükkanınızı modernize etmek için ihtiyaçlarınızı
                belirleyelim.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 group-hover:gap-2.5 transition-all">
                Başla <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
