import { JewelryExperience } from "@/components/landing/JewelryExperience";
import type { RequestKind } from "@/lib/request-details";
export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ hizmet?: string }>;
}) {
  const { hizmet } = await searchParams;
  const initialKind =
    (
      {
        kurulum: "NEW_BUSINESS",
        toptan: "WHOLESALE",
        tamirat: "REPAIR",
      } as Record<string, RequestKind>
    )[hizmet || ""] || null;
  return (
    <JewelryExperience key={initialKind || "home"} initialKind={initialKind} />
  );
}
