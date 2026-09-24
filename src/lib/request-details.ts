import { z } from "zod";

export const storeStates = ["Dükkanım var", "Dükkan arıyorum"] as const;
export const storeModels = ["Butik", "Modern", "Prestij", "Birlikte seçelim"] as const;
export const storeModules = ["Anahtar teslim", "Vitrin ve tezgah", "Dekorasyon", "Güvenlik", "Altın stoğu", "Montaj"] as const;
export const goldProducts = ["Bilezik", "Kolye / zincir", "Yüzük", "Küpe", "Karma koleksiyon"] as const;
export const goldPurities = ["8 ayar", "14 ayar", "18 ayar", "22 ayar", "Birlikte seçelim"] as const;
export const repairItems = ["Yüzük", "Bilezik", "Kolye / zincir", "Küpe", "Diğer"] as const;
export const repairOperations = ["Ölçü değişimi", "Kaynak / onarım", "Taş montajı", "Cila / bakım", "Diğer"] as const;

export const requestDetailsSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("NEW_BUSINESS"),
    storeState: z.enum(storeStates),
    area: z.number().min(10).max(1000).nullable(),
    model: z.enum(storeModels),
    modules: z.array(z.enum(storeModules)).min(1).max(6),
  }),
  z.object({
    kind: z.literal("WHOLESALE"),
    products: z.array(z.enum(goldProducts)).min(1).max(5),
    purity: z.enum(goldPurities),
    grams: z.number().positive().max(1000000).nullable(),
  }),
  z.object({
    kind: z.literal("REPAIR"),
    item: z.enum(repairItems),
    operation: z.enum(repairOperations),
  }),
]);

export type RequestDetails = z.infer<typeof requestDetailsSchema>;
export type RequestKind = RequestDetails["kind"];
export const requestLabels: Record<RequestKind, string> = {
  NEW_BUSINESS: "Kuyumcu açmak istiyorum",
  WHOLESALE: "Toptan altın almak istiyorum",
  REPAIR: "Altın tamirat / tadilat yaptırmak istiyorum",
};

export function requestDetailRows(value: unknown): { label: string; value: string }[] {
  const parsed = requestDetailsSchema.safeParse(value);
  if (!parsed.success) return [];
  const details = parsed.data;
  if (details.kind === "NEW_BUSINESS") return [
    { label: "Dükkan durumu", value: details.storeState },
    { label: "Alan", value: details.area === null ? "Henüz belli değil" : `${details.area} m²` },
    { label: "Mağaza modeli", value: details.model },
    { label: "İstenen hizmetler", value: details.modules.join(", ") },
  ];
  if (details.kind === "WHOLESALE") return [
    { label: "Ürünler", value: details.products.join(", ") },
    { label: "Ayar", value: details.purity },
    { label: "Miktar", value: details.grams === null ? "Henüz belli değil" : `${details.grams} gram` },
  ];
  return [
    { label: "Ürün", value: details.item },
    { label: "İstenen işlem", value: details.operation },
  ];
}
