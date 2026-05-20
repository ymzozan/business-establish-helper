import { prisma } from "@/lib/db";
import { QuestionsManager } from "./QuestionsManager";

export default async function QuestionsPage() {
  const questions = await prisma.question.findMany({
    orderBy: [{ appType: "asc" }, { order: "asc" }],
    include: { sector: { select: { name: true, slug: true } } },
  });

  const parsed = questions.map((q) => ({
    ...q,
    options: q.options ? JSON.parse(q.options) : null,
    dependsOn: q.dependsOn ? JSON.parse(q.dependsOn) : null,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Soru Yönetimi</h1>
      <QuestionsManager initialQuestions={parsed} />
    </div>
  );
}
