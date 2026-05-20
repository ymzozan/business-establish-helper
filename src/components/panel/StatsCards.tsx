import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, CheckCircle2, XCircle } from "lucide-react";

interface Stats {
  total: number;
  newCount: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}

export function StatsCards({ stats }: { stats: Stats }) {
  const cards = [
    {
      title: "Toplam Başvuru",
      value: stats.total,
      icon: FileText,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      title: "Yeni",
      value: stats.newCount,
      icon: Clock,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
    },
    {
      title: "Tamamlanan",
      value: stats.completed,
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
    {
      title: "İptal",
      value: stats.cancelled,
      icon: XCircle,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="shadow-sm border-border/50">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2 rounded-lg ${card.iconBg}`}>
                <card.icon className={`h-4 w-4 ${card.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl font-bold tracking-tight">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
