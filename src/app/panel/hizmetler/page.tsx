import { prisma } from "@/lib/db";
import { ServicesManager } from "./ServicesManager";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    include: { sector: { select: { name: true, slug: true } } },
  });

  const parsed = services.map((s) => ({
    ...s,
    rules: JSON.parse(s.rules),
  }));

  const questions = await prisma.question.findMany({
    orderBy: [{ appType: "asc" }, { order: "asc" }],
  });

  const parsedQuestions = questions.map((q) => ({
    id: q.id,
    text: q.text,
    appType: q.appType,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Hizmet Yönetimi</h1>
      <ServicesManager initialServices={parsed} questions={parsedQuestions} />
    </div>
  );
}
