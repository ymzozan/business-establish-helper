import { requireStaffPage } from "@/lib/api-access";
import { redirect } from "next/navigation";
export default function DashboardPage() {
  redirect("/panel/basvurular");
}
