"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const statuses = [
  { value: "NEW", label: "Yeni" },
  { value: "IN_PROGRESS", label: "İşlemde" },
  { value: "CONTACTED", label: "İletişime Geçildi" },
  { value: "COMPLETED", label: "Tamamlandı" },
  { value: "CANCELLED", label: "İptal" },
];

interface ApplicationActionsProps {
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
}: ApplicationActionsProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [notes, setNotes] = useState(currentNotes);
  const [assignedToId, setAssignedToId] = useState(currentAssignedToId);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch(`/api/applications/${applicationId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          notes,
          assignedToId: assignedToId || null,
        }),
      });

      if (!res.ok) throw new Error();
      toast.success("Başvuru güncellendi");
      router.refresh();
    } catch {
      toast.error("Güncelleme başarısız");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">İşlemler</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Durum</label>
          <Select value={status} onValueChange={(v) => v && setStatus(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Atanan Kişi</label>
          <Select value={assignedToId} onValueChange={(v) => v && setAssignedToId(v)}>
            <SelectTrigger>
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              {users.map((u) => (
                <SelectItem key={u.id} value={u.id}>
                  {u.name} ({u.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notlar</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Not ekleyin..."
          />
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full">
          {saving ? "Kaydediliyor..." : "Kaydet"}
        </Button>
      </CardContent>
    </Card>
  );
}
