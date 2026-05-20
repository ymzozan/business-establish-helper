"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Package } from "lucide-react";

interface ServiceItem {
  id: string;
  service: {
    id: string;
    name: string;
    description: string | null;
    priceMin: number | null;
    priceMax: number | null;
    category: string | null;
  };
}

interface PackageData {
  id: string;
  totalMin: number | null;
  totalMax: number | null;
  items: ServiceItem[];
}

export function PackageResult({ pkg }: { pkg: PackageData }) {
  function formatPrice(price: number | null) {
    if (!price) return "-";
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(price);
  }

  const grouped: Record<string, ServiceItem[]> = {};
  for (const item of pkg.items) {
    const cat = item.service.category || "Diğer";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Package className="h-7 w-7 text-primary" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          Hizmet Paketiniz Hazır
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          İhtiyaçlarınıza göre belirlenen hizmetler
        </p>
      </div>

      {Object.entries(grouped).map(([category, items]) => (
        <Card key={category} className="shadow-sm border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Badge variant="secondary" className="text-xs font-medium">
                {category}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{item.service.name}</p>
                    {item.service.description && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.service.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-xs text-muted-foreground shrink-0">
                    {formatPrice(item.service.priceMin)} -{" "}
                    {formatPrice(item.service.priceMax)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {pkg.totalMin !== null && pkg.totalMax !== null && (
        <Card className="border-primary/20 bg-primary/5 shadow-sm">
          <CardContent className="p-5 text-center">
            <p className="text-xs font-medium text-primary/70 mb-1">
              Tahmini Toplam Bütçe
            </p>
            <p className="text-2xl font-bold tracking-tight text-primary">
              {formatPrice(pkg.totalMin)} - {formatPrice(pkg.totalMax)}
            </p>
            <p className="text-xs text-primary/60 mt-2">
              * Fiyatlar tahminidir, detaylı teklif için sizinle iletişime
              geçilecektir.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
