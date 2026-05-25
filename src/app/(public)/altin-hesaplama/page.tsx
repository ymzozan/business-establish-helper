"use client";

import { useState } from "react";
import { Calculator, Info, TrendingUp } from "lucide-react";

const AYARLAR = [
  { label: "8 Ayar (333‰)", value: "8", milli: 0.333 },
  { label: "14 Ayar (585‰)", value: "14", milli: 0.585 },
  { label: "18 Ayar (750‰)", value: "18", milli: 0.750 },
  { label: "22 Ayar (916‰)", value: "22", milli: 0.916 },
  { label: "24 Ayar Has (999‰)", value: "24", milli: 0.999 },
];

export default function AltinHesaplamaPage() {
  const [gram, setGram] = useState("");
  const [ayar, setAyar] = useState("14");

  const selectedAyar = AYARLAR.find((a) => a.value === ayar)!;
  const hasGram = parseFloat(gram || "0") * selectedAyar.milli;
  const karat = parseFloat(ayar) * (24 / 24);

  return (
    <main className="flex-1 pt-28 pb-20">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/8 border border-[#D4AF37]/20 mb-6">
            <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-xs font-medium text-[#D4AF37] tracking-wider uppercase">
              Ücretsiz Araç
            </span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl text-[#F0EDD8] mb-4">
            Altın Hesaplama Motoru
          </h1>
          <p className="text-[#8B8B9B] max-w-xl mx-auto leading-relaxed">
            Gram ve ayar bilgisini girin, has altın karşılığını milyem üzerinden anında hesaplayın.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Card */}
            <div className="glass-card rounded-2xl p-8">
              <h2 className="text-sm font-semibold text-[#F0EDD8] uppercase tracking-wider mb-6">
                Hesaplama Girdileri
              </h2>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2.5">
                    Ağırlık (Gram)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.001"
                    placeholder="Örn: 10.5"
                    value={gram}
                    onChange={(e) => setGram(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/6 border border-white/10 text-[#F0EDD8] text-lg font-medium placeholder:text-[#8B8B9B]/50 focus:outline-none focus:border-[#D4AF37]/50 focus:bg-white/8 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2.5">
                    Ayar Seçimi
                  </label>
                  <div className="flex flex-col gap-2">
                    {AYARLAR.map((a) => (
                      <button
                        key={a.value}
                        onClick={() => setAyar(a.value)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all ${
                          ayar === a.value
                            ? "bg-[#D4AF37]/12 border-[#D4AF37]/40 text-[#D4AF37]"
                            : "border-white/8 text-[#8B8B9B] hover:border-white/15 hover:text-[#F0EDD8]"
                        }`}
                      >
                        <span>{a.label}</span>
                        <span className="text-xs opacity-60">{(a.milli * 1000).toFixed(0)}‰</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Result Card */}
            <div className="flex flex-col gap-4">
              {/* Main Result */}
              <div className="glass-card rounded-2xl p-8 border-[#D4AF37]/20 bg-gradient-to-b from-[#D4AF37]/6 to-transparent">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
                  <span className="text-xs text-[#8B8B9B] uppercase tracking-wider">Has Altın Karşılığı</span>
                </div>

                <div className="mb-2">
                  <div className="font-heading text-5xl lg:text-6xl font-bold text-[#D4AF37] leading-none">
                    {hasGram > 0 ? hasGram.toFixed(3) : "—"}
                  </div>
                  <div className="text-lg text-[#8B8B9B] mt-1">gram has altın</div>
                </div>

                {gram && (
                  <div className="mt-6 pt-6 border-t border-white/8">
                    <div className="text-sm text-[#8B8B9B]">
                      {gram} gr × {selectedAyar.milli} milyem = {" "}
                      <span className="text-[#D4AF37] font-medium">{hasGram.toFixed(3)} gr</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-xs text-[#8B8B9B] uppercase tracking-wider mb-4">Detaylar</h3>
                <div className="flex flex-col gap-3">
                  {[
                    { label: "Seçilen Ayar", value: `${ayar} Ayar` },
                    { label: "Milyem Değeri", value: `${(selectedAyar.milli * 1000).toFixed(0)}‰` },
                    { label: "Saflık Oranı", value: `%${(selectedAyar.milli * 100).toFixed(1)}` },
                    { label: "Karat Karşılığı", value: `${parseFloat(ayar) === 24 ? "24" : parseFloat(ayar)} K` },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-[#8B8B9B]">{item.label}</span>
                      <span className="text-sm text-[#F0EDD8] font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/6">
                <Info className="w-4 h-4 text-[#8B8B9B] mt-0.5 shrink-0" />
                <p className="text-xs text-[#8B8B9B] leading-relaxed">
                  Hesaplama formülü: <strong className="text-[#F0EDD8]">Gram × Milyem</strong>. 14 Ayar altın için milyem 585, yani her gram altının %58.5'i saf altındır.
                </p>
              </div>
            </div>
          </div>

          {/* Reference Table */}
          <div className="mt-8 glass-card rounded-2xl p-8">
            <h2 className="text-sm font-semibold text-[#F0EDD8] uppercase tracking-wider mb-6">
              Ayar Referans Tablosu
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="text-left py-3 pr-4 text-xs text-[#8B8B9B] uppercase tracking-wider font-medium">Ayar</th>
                    <th className="text-left py-3 pr-4 text-xs text-[#8B8B9B] uppercase tracking-wider font-medium">Milyem</th>
                    <th className="text-left py-3 pr-4 text-xs text-[#8B8B9B] uppercase tracking-wider font-medium">Saflık</th>
                    <th className="text-left py-3 text-xs text-[#8B8B9B] uppercase tracking-wider font-medium">Karat</th>
                  </tr>
                </thead>
                <tbody>
                  {AYARLAR.map((a) => (
                    <tr
                      key={a.value}
                      className={`border-b border-white/4 last:border-0 transition-colors ${
                        ayar === a.value ? "bg-[#D4AF37]/5" : "hover:bg-white/2"
                      }`}
                    >
                      <td className={`py-3.5 pr-4 font-medium ${ayar === a.value ? "text-[#D4AF37]" : "text-[#F0EDD8]"}`}>
                        {a.value} Ayar
                      </td>
                      <td className="py-3.5 pr-4 text-[#8B8B9B]">{(a.milli * 1000).toFixed(0)}‰</td>
                      <td className="py-3.5 pr-4 text-[#8B8B9B]">%{(a.milli * 100).toFixed(1)}</td>
                      <td className="py-3.5 text-[#8B8B9B]">{a.value}K</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
