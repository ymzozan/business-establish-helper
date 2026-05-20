import { prisma } from "@/lib/db";
import { StatsCards } from "@/components/panel/StatsCards";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function DashboardPage() {
  const [total, newCount, inProgress, completed, cancelled, recentApps] =
    await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { status: "NEW" } }),
      prisma.application.count({ where: { status: "IN_PROGRESS" } }),
      prisma.application.count({ where: { status: "COMPLETED" } }),
      prisma.application.count({ where: { status: "CANCELLED" } }),
      prisma.application.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          type: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  const statusColors: Record<string, string> = {
    NEW: "bg-amber-100 text-amber-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    CONTACTED: "bg-purple-100 text-purple-700",
    COMPLETED: "bg-emerald-100 text-emerald-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  const statusLabels: Record<string, string> = {
    NEW: "Yeni",
    IN_PROGRESS: "İşlemde",
    CONTACTED: "İletişime Geçildi",
    COMPLETED: "Tamamlandı",
    CANCELLED: "İptal",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Başvuru ve hizmet istatistiklerine genel bakış
        </p>
      </div>

      <StatsCards
        stats={{ total, newCount, inProgress, completed, cancelled }}
      />

      <Card className="shadow-sm border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-sm font-semibold">Son Başvurular</CardTitle>
          {recentApps.length > 0 && (
            <Link
              href="/panel/basvurular"
              className="text-xs font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
            >
              Tümünü gör
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </CardHeader>
        <CardContent>
          {recentApps.length === 0 ? (
            <p className="text-muted-foreground text-sm py-4 text-center">
              Henüz başvuru yok.
            </p>
          ) : (
            <div className="space-y-1">
              {recentApps.map((app) => (
                <Link
                  key={app.id}
                  href={`/panel/basvurular/${app.id}`}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div>
                    <p className="text-sm font-medium group-hover:text-primary transition-colors">
                      {app.firstName} {app.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {app.type === "NEW_BUSINESS"
                        ? "Yeni İşletme"
                        : "Yenileme"}{" "}
                      &middot;{" "}
                      {new Date(app.createdAt).toLocaleDateString("tr-TR")}
                    </p>
                  </div>
                  <Badge
                    className={statusColors[app.status] || ""}
                    variant="secondary"
                  >
                    {statusLabels[app.status] || app.status}
                  </Badge>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
