"use client";
import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { requestStatuses } from "@/lib/request-status";
const statuses = Object.entries(requestStatuses);
interface Props {
  applicationId: string;
  currentStatus: string;
  currentNotes: string;
  currentAssignedToId: string;
  quote: {
    amount: number | null;
    scope: string;
    validUntil: string;
    nextContact: string;
  };
  users: { id: string; name: string; role: string }[];
}
export function ApplicationActions({
  applicationId,
  currentStatus,
  currentNotes,
  currentAssignedToId,
  users,
  quote,
}: Props) {
  const [amount, setAmount] = useState(quote.amount?.toString() || "");
  const [scope, setScope] = useState(quote.scope);
  const [validUntil, setValidUntil] = useState(quote.validUntil);
  const [nextContact, setNextContact] = useState(quote.nextContact);
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
          quoteAmount: amount ? Number(amount) : null,
          quoteScope: scope || null,
          quoteValidUntil: validUntil || null,
          nextContactDate: nextContact || null,
        }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw Error(body.error || "Kaydedilemedi. Tekrar deneyin.");
      }
      toast.success("Talep güncellendi");
      router.refresh();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Kaydedilemedi. Tekrar deneyin.",
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
              Sonraki görüşme tarihi
              <input
                type="date"
                value={nextContact}
                onChange={(e) => setNextContact(e.target.value)}
              />
            </label>
            <details open={Boolean(quote.amount)} className="quote-editor">
              <summary>Teklif bilgileri</summary>
              <label>
                Teklif tutarı (TL)
                <input
                  type="number"
                  min="0.01"
                  max="999999999999"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Müşteri bütçesinden ayrı teklif tutarınız"
                />
              </label>
              <label>
                Teklif kapsamı
                <textarea
                  rows={3}
                  maxLength={5000}
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  placeholder="Dahil olan işler, ürünler ve koşullar"
                />
              </label>
              <label>
                Geçerlilik tarihi
                <input
                  type="date"
                  value={validUntil}
                  onChange={(e) => setValidUntil(e.target.value)}
                />
              </label>
              <p className="simple-privacy">
                Teklifi müşteriye ilettikten sonra “Teklif gönderildi” durumunu
                seçin.
              </p>
            </details>
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
