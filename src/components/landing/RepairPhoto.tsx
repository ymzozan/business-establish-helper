"use client";
/* eslint-disable @next/next/no-img-element -- Local, compressed image preview; never sent to an image optimizer. */
import { useEffect, useRef, useState } from "react";
export function RepairPhoto({
  value,
  onChange,
  onBusy,
}: {
  value: string;
  onChange: (value: string) => void;
  onBusy: (value: boolean) => void;
}) {
  const [error, setError] = useState("");
  const generation = useRef(0);
  useEffect(
    () => () => {
      generation.current++;
    },
    [],
  );
  async function load(file: File | undefined) {
    if (!file) return;
    const ticket = ++generation.current;
    setError("");
    onBusy(true);
    try {
      if (
        !["image/jpeg", "image/png", "image/webp"].includes(file.type) ||
        file.size > 8 * 1024 * 1024
      )
        throw Error("En fazla 8 MB, JPG, PNG veya WebP fotoğraf seçin.");
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, 1200 / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        bitmap.close();
        throw Error("Fotoğraf hazırlanamadı.");
      }
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      let data = canvas.toDataURL("image/jpeg", 0.75);
      if (data.length > 530000) data = canvas.toDataURL("image/jpeg", 0.5);
      if (data.length > 530000) throw Error("Daha küçük bir fotoğraf seçin.");
      if (ticket === generation.current) onChange(data);
    } catch (cause) {
      if (ticket === generation.current)
        setError(
          cause instanceof Error
            ? cause.message
            : "Fotoğraf okunamadı. Başka bir fotoğraf deneyin.",
        );
    } finally {
      if (ticket === generation.current) onBusy(false);
    }
  }
  return (
    <div className="repair-upload">
      <label className="simple-field">
        Ürünün fotoğrafı <span className="optional">(isteğe bağlı)</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => {
            void load(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
        <small>
          JPG, PNG veya WebP · En fazla 8 MB · Yalnızca talebinizi inceleyen
          ekip görür.
        </small>
      </label>
      {value && (
        <div className="repair-preview">
          <img src={value} alt="Talebe eklenecek takı fotoğrafı" />
          <button
            type="button"
            onClick={() => {
              generation.current++;
              onBusy(false);
              onChange("");
              setError("");
            }}
          >
            Fotoğrafı kaldır
          </button>
        </div>
      )}
      {error && (
        <p className="simple-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
