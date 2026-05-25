import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowRight, FileText, CheckCircle2, Clock, XCircle, TrendingUp } from "lucide-react";

const statusColors: Record<string, string> = {
  NEW: "bg-amber-400/10 border-amber-400/20 text-amber-400",
  IN_PROGRESS: "bg-blue-400/10 border-blue-400/20 text-blue-400",
  CONTACTED: "bg-purple-400/10 border-purple-400/20 text-purple-400",
  COMPLETED: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
  CANCELLED: "bg-red-400/10 border-red-400/20 text-red-400",
};

const statusLabels: Record<string, string> = {
  NEW: "Yeni",
  IN_PROGRESS: "İşlemde",
  CONTACTED: "İletişime Geçildi",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
};

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

  const statCards = [
    { label: "Toplam Başvuru", value: total, icon: FileText, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10 border-[#D4AF37]/20" },
    { label: "Yeni Başvuru", value: newCount, icon: TrendingUp, color: "text-amber-400", bg: "bg-amber-400/10 border-amber-400/20" },
    { label: "İşlemdeki", value: inProgress, icon: Clock, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
    { label: "Tamamlanan", value: completed, icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-[#F0EDD8]">Dashboard</h1>
        <p className="text-sm text-[#8B8B9B] mt-1">
          Başvuru ve hizmet istatistiklerine genel bakış
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`flex flex-col p-5 rounded-2xl border glass-card`}>
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center mb-3 ${s.bg}`}>
                <Icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div className={`font-heading text-3xl font-bold ${s.color}`}>{s.value}</div>
              <div className="text-xs text-[#8B8B9B] mt-1">{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Recent Applications */}
      <div className="glass-card rounded-2xl border border-white/8">
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
          <h2 className="text-sm font-semibold text-[#F0EDD8]">Son Başvurular</h2>
          {recentApps.length > 0 && (
            <Link
              href="/panel/basvurular"
              className="flex items-center gap-1 text-xs text-[#D4AF37] hover:text-[#E5C84E] transition-colors"
            >
              Tümünü gör
              <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
        <div className="p-3">
          {recentApps.length === 0 ? (
            <p className="text-sm text-[#8B8B9B] py-8 text-center">
              Henüz başvuru yok.
            </p>
          ) : (
            recentApps.map((app) => (
              <Link
                key={app.id}
                href={`/panel/basvurular/${app.id}`}
                className="flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/4 transition-all group"
              >
                <div>
                  <p className="text-sm font-medium text-[#F0EDD8] group-hover:text-[#D4AF37] transition-colors">
                    {app.firstName} {app.lastName}
                  </p>
                  <p className="text-xs text-[#8B8B9B] mt-0.5">
                    {app.type === "NEW_BUSINESS" ? "Yeni İşletme" : "Yenileme"} ·{" "}
                    {new Date(app.createdAt).toLocaleDateString("tr-TR")}
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusColors[app.status] || "text-[#8B8B9B] border-white/10"}`}>
                  {statusLabels[app.status] || app.status}
                </span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
