import { WizardContainer } from "@/components/wizard/WizardContainer";

export default async function NewBusinessPage({
  params,
}: {
  params: Promise<{ sectorSlug: string }>;
}) {
  const { sectorSlug } = await params;

  return (
    <div>
      <div className="bg-emerald-50/80 border-b border-emerald-100">
        <div className="container mx-auto px-4 sm:px-6 py-5 text-center">
          <h1 className="text-lg font-semibold tracking-tight text-emerald-900">
            Yeni Kuyumcu Dükkanı Açma
          </h1>
          <p className="text-emerald-600/80 text-sm mt-0.5">
            İhtiyaçlarınızı belirlemek için soruları yanıtlayın
          </p>
        </div>
      </div>
      <WizardContainer sectorSlug={sectorSlug} appType="NEW_BUSINESS" />
    </div>
  );
}
