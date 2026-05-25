"use client";

import { useState } from "react";
import { X, CheckCircle2 } from "lucide-react";

interface B2BContactFormProps {
  defaultArea?: string;
  onClose?: () => void;
  inline?: boolean;
}

const areas = [
  "Toptan Ürün Tedariği",
  "Sıfırdan Kuyumcu Açmak",
  "Mağazamı Yenilemek / Dijitalleştirmek",
  "Kuyumcu Yazılımı",
  "Diğer",
];

const budgets = [
  "500K - 1M TL",
  "1M - 3M TL",
  "3M - 5M TL",
  "5M TL üzeri",
  "Belirtmek istemiyorum",
];

export default function B2BContactForm({ defaultArea, onClose, inline }: B2BContactFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    area: defaultArea || "",
    budget: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-sm text-[#F0EDD8] placeholder:text-[#8B8B9B] focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/8 transition-all";
  const labelClass = "block text-xs font-medium text-[#8B8B9B] uppercase tracking-wider mb-2";

  if (submitted) {
    return (
      <div className={`${inline ? "" : "p-8"} text-center`}>
        <div className="w-16 h-16 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <h3 className="font-heading text-2xl text-[#F0EDD8] mb-3">Başvurunuz Alındı</h3>
        <p className="text-sm text-[#8B8B9B] leading-relaxed">
          Ekibimiz en kısa sürede sizinle iletişime geçecek.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-6 px-6 py-2.5 rounded-lg border border-white/15 text-sm text-[#8B8B9B] hover:text-[#F0EDD8] hover:border-white/25 transition-all"
          >
            Kapat
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={inline ? "" : "relative"}>
      {!inline && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-[#8B8B9B] hover:text-[#F0EDD8] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {!inline && (
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 mb-4">
            <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">B2B Başvuru</span>
          </div>
          <h3 className="font-heading text-2xl lg:text-3xl text-[#F0EDD8] mb-2">
            Hemen Başlayalım
          </h3>
          <p className="text-sm text-[#8B8B9B]">
            Bilgilerinizi bırakın, uzmanımız sizi arasın.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Ad Soyad</label>
            <input
              type="text"
              required
              placeholder="Adınız Soyadınız"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Telefon</label>
            <input
              type="tel"
              required
              placeholder="05XX XXX XX XX"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Şehir</label>
          <input
            type="text"
            required
            placeholder="Şehriniz"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>İlgilendiğiniz Alan</label>
          <select
            required
            value={form.area}
            onChange={(e) => setForm({ ...form, area: e.target.value })}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" disabled className="bg-[#0F1018] text-[#8B8B9B]">Seçiniz...</option>
            {areas.map((a) => (
              <option key={a} value={a} className="bg-[#0F1018] text-[#F0EDD8]">{a}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Bütçe Aralığı</label>
          <select
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className={`${inputClass} cursor-pointer`}
          >
            <option value="" className="bg-[#0F1018] text-[#8B8B9B]">Seçiniz (opsiyonel)</option>
            {budgets.map((b) => (
              <option key={b} value={b} className="bg-[#0F1018] text-[#F0EDD8]">{b}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-2 w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] font-semibold text-sm tracking-wide hover:bg-[#E5C84E] active:scale-98 transition-all duration-200"
        >
          Başvuru Gönder
        </button>
      </form>
    </div>
  );
}
