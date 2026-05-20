import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const statusColors: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  NEW: "Yeni",
  IN_PROGRESS: "İşlemde",
  CONTACTED: "İletişime Geçildi",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
};

export default async function ApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      assignedTo: { select: { name: true } },
      _count: { select: { answers: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Başvurular</h1>
        <Badge variant="secondary">{applications.length} başvuru</Badge>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad Soyad</TableHead>
              <TableHead>Tip</TableHead>
              <TableHead>E-posta</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Durum</TableHead>
              <TableHead>Tarih</TableHead>
              <TableHead>Atanan</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                  Henüz başvuru bulunmuyor.
                </TableCell>
              </TableRow>
            ) : (
              applications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell className="font-medium">
                    {app.firstName} {app.lastName}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {app.type === "NEW_BUSINESS" ? "Yeni" : "Yenileme"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">{app.email}</TableCell>
                  <TableCell className="text-sm">{app.phone}</TableCell>
                  <TableCell>
                    <Badge
                      className={statusColors[app.status] || ""}
                      variant="secondary"
                    >
                      {statusLabels[app.status] || app.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(app.createdAt).toLocaleDateString("tr-TR")}
                  </TableCell>
                  <TableCell className="text-sm">
                    {app.assignedTo?.name || "-"}
                  </TableCell>
                  <TableCell>
                    <Link href={`/panel/basvurular/${app.id}`}>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
