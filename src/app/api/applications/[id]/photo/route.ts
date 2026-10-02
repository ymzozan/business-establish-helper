import { requireStaff } from "@/lib/api-access";
import { prisma } from "@/lib/db";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const denied = await requireStaff();
  if (denied) return denied;
  const { id } = await params;
  const photo = await prisma.applicationPhoto.findUnique({
    where: { applicationId: id },
  });
  if (!photo) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(photo.data), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
