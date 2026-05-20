import { prisma } from "@/lib/db";
import { UsersManager } from "./UsersManager";

export default async function UsersPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      _count: { select: { applications: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kullanıcı Yönetimi</h1>
      <UsersManager initialUsers={users} />
    </div>
  );
}
