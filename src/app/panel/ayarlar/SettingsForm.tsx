"use client";
import { useState } from "react";
import type { getSettings } from "@/lib/site-settings";
export function SettingsForm({
  initial,
  ready,
}: {
  initial: Omit<Awaited<ReturnType<typeof getSettings>>, "updatedAt">;
  ready: boolean;
}) {
  const [data, setData] = useState(initial),
    [busy, setBusy] = useState(false),
    [message, setMessage] = useState("");
  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const { id, ...body } = data;
      void id;
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const r = await res.json();
      setMessage(res.ok ? "Değişiklikler kaydedildi." : r.error);
    } catch {
      setMessage("Kaydedilemedi. Bağlantınızı kontrol edin.");
    } finally {
      setBusy(false);
    }
  }
  const field = (key: keyof typeof data, label: string, type = "text") => (
    <label key={key}>
      {label}
      <input
        type={type}
        value={String(data[key])}
        onChange={(e) => setData({ ...data, [key]: e.target.value })}
      />
    </label>
  );
  return (
    <form className="management-form" onSubmit={save}>
      <fieldset disabled={busy}>
        <section>
          <h2>Firma bilgileri</h2>
          <p>Örnek bilgileri gerçek bilgilerinizle değiştirebilirsiniz.</p>
          {field("companyName", "Görünen firma adı")}
          {field("legalName", "Ticari unvan")}
          {field("phone", "Telefon", "tel")}
          {field("address", "Adres")}
          {field("email", "İletişim e-postası", "email")}
          <label className="check-label">
            <input
              type="checkbox"
              checked={data.demo}
              onChange={(e) => setData({ ...data, demo: e.target.checked })}
            />
            Örnek firma bilgileri kullanılıyor
          </label>
        </section>
        <section>
          <h2>Yeni talep bildirimleri</h2>
          <p>
            {ready
              ? "E-posta bağlantısı hazır."
              : "Gönderim henüz bağlı değil. RESEND_API_KEY ve doğrulanmış NOTIFICATION_FROM sunucuda tanımlanmalı."}
          </p>
          {field("notificationEmail", "Bildirim alıcısı", "email")}
          <label className="check-label">
            <input
              type="checkbox"
              checked={data.notificationEnabled}
              onChange={(e) =>
                setData({ ...data, notificationEnabled: e.target.checked })
              }
            />
            Yeni talepleri e-postayla bildir
          </label>
          <p>
            Müşteri bilgileri e-postaya eklenmez. Talep numarası ve panel
            bağlantısı gönderilir.
          </p>
        </section>
        <section>
          <h2>Gizlilik ve KVKK metinleri</h2>
          <p>
            Taslakları gerçek süreçlere göre tamamlatın. Yurt dışı hizmet
            sağlayıcıları, hukuki dayanak ve başvuru adresini doğrulayın.
          </p>
          {(["privacyText", "disclosureText"] as const).map((key) => (
            <label key={key}>
              {key === "privacyText"
                ? "Gizlilik metni"
                : "KVKK aydınlatma metni"}
              <textarea
                rows={12}
                value={data[key]}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
              />
            </label>
          ))}
          <label className="check-label">
            <input
              type="checkbox"
              checked={data.legalPublished}
              onChange={(e) =>
                setData({ ...data, legalPublished: e.target.checked })
              }
            />
            Metinleri kontrol ettim, sitede yayımla
          </label>
          <p>Bu seçim bir hukuki uygunluk onayı oluşturmaz.</p>
        </section>
      </fieldset>
      <p role="status">{message}</p>
      <button className="management-button" disabled={busy}>
        {busy ? "Kaydediliyor…" : "Değişiklikleri kaydet"}
      </button>
    </form>
  );
}
