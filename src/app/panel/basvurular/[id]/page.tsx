import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ApplicationActions } from "./ApplicationActions";

const statusLabels: Record<string, string> = {
  NEW: "Yeni",
  IN_PROGRESS: "İşlemde",
  CONTACTED: "İletişime Geçildi",
  COMPLETED: "Tamamlandı",
  CANCELLED: "İptal",
};

const statusColors: Record<string, string> = {
  NEW: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-purple-100 text-purple-700",
  COMPLETED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      answers: { include: { question: true } },
      package: { include: { items: { include: { service: true } } } },
      assignedTo: { select: { id: true, name: true } },
    },
  });

  if (!application) notFound();

  const users = await prisma.user.findMany({
    select: { id: true, name: true, role: true },
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            {application.firstName} {application.lastName}
          </h1>
          <p className="text-gray-500 text-sm">
            {application.type === "NEW_BUSINESS"
              ? "Yeni İşletme"
              : "Yenileme"}{" "}
            &middot;{" "}
            {new Date(application.createdAt).toLocaleDateString("tr-TR", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Badge
          className={statusColors[application.status] || ""}
          variant="secondary"
        >
          {statusLabels[application.status] || application.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">İletişim Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Ad Soyad</span>
              <span className="font-medium">
                {application.firstName} {application.lastName}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-500">E-posta</span>
              <span>{application.email}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-500">Telefon</span>
              <span>{application.phone}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="text-gray-500">Şehir</span>
              <span>{application.city || "-"}</span>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <ApplicationActions
          applicationId={application.id}
          currentStatus={application.status}
          currentNotes={application.notes || ""}
          currentAssignedToId={application.assignedToId || ""}
          users={users}
        />
      </div>

      {/* Answers */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cevaplar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {application.answers.map((answer) => (
              <div key={answer.id} className="flex justify-between text-sm">
                <span className="text-gray-500">{answer.question.text}</span>
                <span className="font-medium text-right max-w-[50%]">
                  {(() => {
                    const val = JSON.parse(answer.value);
                    if (Array.isArray(val)) return val.join(", ");
                    return String(val);
                  })()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Package */}
      {application.package && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Oluşturulan Paket</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {application.package.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm p-2 bg-gray-50 rounded"
                >
                  <div>
                    <span className="font-medium">{item.service.name}</span>
                    {item.service.category && (
                      <Badge variant="outline" className="ml-2 text-xs">
                        {item.service.category}
                      </Badge>
                    )}
                  </div>
                  <span className="text-gray-500">
                    {item.service.priceMin?.toLocaleString("tr-TR")} -{" "}
                    {item.service.priceMax?.toLocaleString("tr-TR")} TL
                  </span>
                </div>
              ))}
              <Separator className="my-3" />
              <div className="flex justify-between font-bold">
                <span>Toplam Tahmini</span>
                <span>
                  {application.package.totalMin?.toLocaleString("tr-TR")} -{" "}
                  {application.package.totalMax?.toLocaleString("tr-TR")} TL
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
