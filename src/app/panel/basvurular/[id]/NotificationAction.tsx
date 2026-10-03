"use client";
import { useState } from "react";
export function NotificationAction({ id }: { id: string }) {
  const [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  return (
    <div>
      <button
        disabled={busy}
        className="management-button"
        onClick={async () => {
          setBusy(true);
          try {
            const res = await fetch("/api/notifications", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ applicationId: id }),
            });
            const data = await res.json();
            setMessage(
              res.ok
                ? "Bildirim gönderildi."
                : data.error ||
                    "Gönderim tamamlanamadı. Ayarları kontrol edip tekrar deneyin.",
            );
          } catch {
            setMessage("Bağlantı hatası.");
          } finally {
            setBusy(false);
          }
        }}
      >
        {busy ? "Gönderiliyor…" : "Bildirimi gönder / tekrar dene"}
      </button>
      <p className="text-sm mt-2" role="status">
        {message}
      </p>
    </div>
  );
}
