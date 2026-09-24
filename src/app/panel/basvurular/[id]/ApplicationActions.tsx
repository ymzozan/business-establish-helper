"use client";
import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
const statuses = [
  ["NEW", "Yeni"],
  ["IN_PROGRESS", "İşlemde"],
  ["CONTACTED", "Görüşüldü"],
  ["COMPLETED", "Tamamlandı"],
  ["CANCELLED", "İptal"],
];
interface Props {
  applicationId: string;
  currentStatus: string;
  currentNotes: string;
  currentAssignedToId: string;
  users: { id: string; name: string; role: string }[];
}
export function ApplicationActions({
  applicationId,
  currentStatus,
  currentNotes,
  currentAssignedToId,
  users,
}: Props) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [assignedToId, setAssignedToId] = useState(currentAssignedToId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const locked = useRef(false);
  async function save(event: FormEvent) {
    event.preventDefault();
    if (locked.current) return;
    locked.current = true;
    setSaving(true);
    setError("");
    try {
      const response = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          notes,
          assignedToId: assignedToId || null,
        }),
      });
      if (!response.ok) throw Error();
      toast.success("Talep güncellendi");
      router.refresh();
    } catch {
      setError(
        "Kaydedilemedi. Değişiklikleriniz burada duruyor; tekrar deneyin.",
      );
    } finally {
      locked.current = false;
      setSaving(false);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Talebi takip et</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={save} className="request-actions">
          <fieldset disabled={saving}>
            <label>
              Durum
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Ekip notu
              <textarea
                rows={3}
                maxLength={5000}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Görüşme notunuzu yazın…"
              />
            </label>
            <details>
              <summary>Sorumlu kişi</summary>
              <label>
                Talebi takip eden
                <select
                  value={assignedToId}
                  onChange={(e) => setAssignedToId(e.target.value)}
                >
                  <option value="">Atanmadı</option>
                  {users
                    .filter((u) => ["ADMIN", "SALES"].includes(u.role))
                    .map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                </select>
              </label>
            </details>
            {error && (
              <p className="simple-error" role="alert">
                {error}
              </p>
            )}
            <Button className="w-full" disabled={saving} type="submit">
              {saving ? "Kaydediliyor…" : "Değişiklikleri kaydet"}
            </Button>
          </fieldset>
        </form>
      </CardContent>
    </Card>
  );
}
