import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  getSettings,
  emailReady,
  privacyDraft,
  disclosureDraft,
} from "@/lib/site-settings";
import { SettingsForm } from "./SettingsForm";
export default async function SettingsPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/panel");
  const settings = await getSettings();
  const { updatedAt, ...initial } = settings;
  void updatedAt;
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl mb-6">Firma ve site ayarları</h1>
      <SettingsForm
        initial={{
          ...initial,
          privacyText: initial.privacyText || privacyDraft,
          disclosureText: initial.disclosureText || disclosureDraft,
        }}
        ready={emailReady()}
      />
    </div>
  );
}
