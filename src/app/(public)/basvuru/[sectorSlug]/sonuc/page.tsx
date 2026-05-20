import { prisma } from "@/lib/db";
import { PackageResult } from "@/components/wizard/PackageResult";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home } from "lucide-react";
import Link from "next/link";

export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Başvuru bulunamadı.</p>
        <Link href="/">
          <Button className="mt-4">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    );
  }

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      package: {
        include: {
          items: {
            include: { service: true },
          },
        },
      },
    },
  });

  if (!application) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Başvuru bulunamadı.</p>
        <Link href="/">
          <Button className="mt-4">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 max-w-xl">
      <Card className="mb-6 border-emerald-200/60 bg-emerald-50/50 shadow-sm">
        <CardContent className="p-5 text-center">
          <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
          <h1 className="text-lg font-semibold tracking-tight text-emerald-900">
            Başvurunuz Alındı!
          </h1>
          <p className="text-emerald-600/80 text-sm mt-1">
            {application.firstName} {application.lastName}, en kısa sürede
            sizinle iletişime geçeceğiz.
          </p>
        </CardContent>
      </Card>

      {application.package ? (
        <PackageResult pkg={application.package} />
      ) : (
        <Card className="shadow-sm border-border/50">
          <CardContent className="p-5 text-center text-sm text-muted-foreground">
            Hizmet paketi oluşturulamadı. Ekibimiz sizinle iletişime geçecektir.
          </CardContent>
        </Card>
      )}

      <div className="text-center mt-8">
        <Link href="/">
          <Button variant="outline" size="lg">
            <Home className="h-4 w-4 mr-1.5" />
            Ana Sayfaya Dön
          </Button>
        </Link>
      </div>
    </div>
  );
}
