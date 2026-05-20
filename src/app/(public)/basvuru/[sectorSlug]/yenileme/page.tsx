import { WizardContainer } from "@/components/wizard/WizardContainer";

export default async function RenovationPage({
  params,
}: {
  params: Promise<{ sectorSlug: string }>;
}) {
  const { sectorSlug } = await params;

  return (
    <div>
      <div className="bg-blue-50/80 border-b border-blue-100">
        <div className="container mx-auto px-4 sm:px-6 py-5 text-center">
          <h1 className="text-lg font-semibold tracking-tight text-blue-900">
            Mevcut Kuyumcu Dükkanını Yenileme
          </h1>
          <p className="text-blue-600/80 text-sm mt-0.5">
            İhtiyaçlarınızı belirlemek için soruları yanıtlayın
          </p>
        </div>
      </div>
      <WizardContainer sectorSlug={sectorSlug} appType="RENOVATION" />
    </div>
  );
}
