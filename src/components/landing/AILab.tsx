"use client";

import { useState, useRef } from "react";
import { Calculator, Sparkles, TrendingUp, Package, ChevronRight, Loader2, Plus, Trash2 } from "lucide-react";

const milliems: Record<string, number> = {
  "8": 0.333, "14": 0.585, "18": 0.750, "22": 0.916, "24": 0.999,
};

// ─── Tool 1: Gold Calculator ───────────────────────────────────────────────
function GoldCalculator() {
  const [gram, setGram] = useState("10");
  const [ayar, setAyar] = useState("14");
  const [iscilik, setIscilik] = useState("15");

  const hasGram = parseFloat(gram || "0") * (milliems[ayar] || 0);
  const iscilikOran = parseFloat(iscilik || "0") / 100;
  const iscilikGram = hasGram * iscilikOran;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Ağırlık (gram)</label>
          <input
            type="number" min="0" step="0.01" value={gram}
            onChange={(e) => setGram(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Ayar</label>
          <select
            value={ayar} onChange={(e) => setAyar(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            {["8","14","18","22","24"].map((k) => (
              <option key={k} value={k} className="bg-[#0F1018]">{k} Ayar ({(milliems[k]*1000).toFixed(0)}‰)</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">İşçilik Marjı (%)</label>
          <input
            type="number" min="0" max="100" value={iscilik}
            onChange={(e) => setIscilik(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-5 rounded-xl bg-[#D4AF37]/8 border border-[#D4AF37]/20">
          <div className="text-xs text-[#D4AF37]/70 uppercase tracking-wider mb-1">Has Altın</div>
          <div className="text-3xl font-bold text-[#D4AF37]">{hasGram.toFixed(3)} gr</div>
          <div className="text-xs text-[#8B8B9B] mt-1">Milyem: {((milliems[ayar] || 0) * 1000).toFixed(0)}</div>
        </div>
        <div className="p-5 rounded-xl bg-white/4 border border-white/8">
          <div className="text-xs text-[#8B8B9B] uppercase tracking-wider mb-1">İşçilik Payı</div>
          <div className="text-2xl font-bold text-[#F0EDD8]">{iscilikGram.toFixed(3)} gr</div>
          <div className="text-xs text-[#8B8B9B] mt-1">%{iscilik} işçilik marjı</div>
        </div>
        <div className="p-5 rounded-xl bg-white/4 border border-white/8">
          <div className="text-xs text-[#8B8B9B] uppercase tracking-wider mb-1">Net Has (İşçilik Düşülmüş)</div>
          <div className="text-2xl font-bold text-[#F0EDD8]">{Math.max(0, hasGram - iscilikGram).toFixed(3)} gr</div>
        </div>
      </div>
    </div>
  );
}

// ─── Tool 2: AI Jewelry Designer (Simulation) ─────────────────────────────
const aiMessages = [
  "Tasarım parametreleri analiz ediliyor...",
  "Ayar ve gramaj optimizasyonu hesaplanıyor...",
  "Malzeme uyumluluk kontrolü yapılıyor...",
  "3D model oluşturuluyor...",
  "Tasarım tamamlandı.",
];

function AIDesigner() {
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [msgIdx, setMsgIdx] = useState(0);
  const [result, setResult] = useState<{ title: string; specs: string[]; note: string } | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleDesign = () => {
    if (!input.trim()) return;
    setPhase("loading");
    setMsgIdx(0);
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      setMsgIdx(i);
      if (i >= aiMessages.length - 1) {
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setPhase("done");
          setResult({
            title: input,
            specs: [
              "Öneri Ayar: 14K (585‰) — En iyi dayanıklılık/fiyat dengesi",
              "Tahmini Ağırlık: 3.2 – 4.8 gram",
              "Taşlı tasarım için önerilen yuva: Milgrain çerçeve",
              "Yüzey işlemi: Mat + parlak kombinasyon",
              "Üretim süresi: 7–10 iş günü",
            ],
            note: "Bu analiz SORS AI modelinin simülasyonudur. Gerçek üretim için atölye görüşmesi gereklidir.",
          });
        }, 600);
      }
    }, 900);
  };

  return (
    <div>
      <div className="flex gap-3 mb-6">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && phase === "idle" && handleDesign()}
          placeholder="Örn: Damlalı 14K baget altın yüzük, kadın modeli"
          className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm placeholder-[#8B8B9B]/60 focus:outline-none focus:border-[#D4AF37]/50 transition-all"
        />
        <button
          onClick={phase === "done" ? () => { setPhase("idle"); setResult(null); setInput(""); } : handleDesign}
          disabled={phase === "loading" || !input.trim()}
          className="px-5 py-3 rounded-xl bg-[#D4AF37] text-[#0B0C10] text-sm font-semibold hover:bg-[#E5C84E] transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {phase === "done" ? "Yeniden" : "Tasarla"}
        </button>
      </div>

      {phase === "loading" && (
        <div className="p-6 rounded-xl bg-white/4 border border-white/8">
          <div className="flex items-center gap-3 mb-4">
            <Loader2 className="w-5 h-5 text-[#D4AF37] animate-spin" />
            <span className="text-sm text-[#D4AF37] font-medium">AI Tasarım Motoru</span>
          </div>
          <div className="space-y-2">
            {aiMessages.slice(0, msgIdx + 1).map((msg, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                <span className={i === msgIdx ? "text-[#F0EDD8]" : "text-[#8B8B9B]"}>{msg}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 h-1.5 rounded-full bg-white/8 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#D4AF37] transition-all duration-700"
              style={{ width: `${Math.min(100, ((msgIdx + 1) / aiMessages.length) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {phase === "done" && result && (
        <div className="p-6 rounded-xl bg-[#D4AF37]/6 border border-[#D4AF37]/20 space-y-4">
          <div>
            <div className="text-xs text-[#D4AF37]/70 uppercase tracking-wider mb-1">Tasarım Analizi</div>
            <div className="text-lg font-semibold text-[#F0EDD8]">{result.title}</div>
          </div>
          <ul className="space-y-2">
            {result.specs.map((spec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-[#8B8B9B]">
                <ChevronRight className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                {spec}
              </li>
            ))}
          </ul>
          <p className="text-xs text-[#8B8B9B]/60 pt-2 border-t border-white/8">{result.note}</p>
        </div>
      )}

      {phase === "idle" && !result && (
        <div className="p-6 rounded-xl bg-white/3 border border-white/6 text-center">
          <Sparkles className="w-8 h-8 text-[#D4AF37]/40 mx-auto mb-3" />
          <p className="text-sm text-[#8B8B9B]">Hayalinizdeki takıyı tarif edin, AI tasarım parametrelerini analiz etsin.</p>
        </div>
      )}
    </div>
  );
}

// ─── Tool 3: Store Profitability Analyzer ─────────────────────────────────
const sehirler = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Gaziantep", "Konya", "Kayseri", "Diğer"];
const butceler = [
  { label: "1 – 2 Milyon TL", ciro: [3.2, 5.8], stok: 0.45 },
  { label: "2 – 3 Milyon TL", ciro: [5.5, 9.2], stok: 0.42 },
  { label: "3 – 5 Milyon TL", ciro: [9.0, 16.0], stok: 0.40 },
  { label: "5 Milyon TL üzeri", ciro: [15.0, 28.0], stok: 0.38 },
];

function ProfitAnalyzer() {
  const [sehir, setSehir] = useState("İstanbul");
  const [butce, setButce] = useState(0);
  const [m2, setM2] = useState("40");
  const [result, setResult] = useState<null | { min: number; max: number; stok: { bilezik: number; kolye: number; yuzuk: number; kupe: number; diger: number } }>(null);

  const analyze = () => {
    const b = butceler[butce];
    const carpan = sehir === "İstanbul" ? 1.2 : sehir === "Ankara" || sehir === "İzmir" ? 1.1 : 1.0;
    const m2Carpan = Math.min(1.4, 1 + (parseFloat(m2 || "0") - 30) / 200);
    setResult({
      min: Math.round(b.ciro[0] * carpan * m2Carpan * 10) / 10,
      max: Math.round(b.ciro[1] * carpan * m2Carpan * 10) / 10,
      stok: { bilezik: 35, kolye: 25, yuzuk: 20, kupe: 12, diger: 8 },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Şehir</label>
          <select
            value={sehir} onChange={(e) => setSehir(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            {sehirler.map((s) => <option key={s} value={s} className="bg-[#0F1018]">{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Hedef Bütçe</label>
          <select
            value={butce} onChange={(e) => setButce(parseInt(e.target.value))}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all cursor-pointer"
          >
            {butceler.map((b, i) => <option key={i} value={i} className="bg-[#0F1018]">{b.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-[#8B8B9B] uppercase tracking-wider mb-2">Dükkan m²</label>
          <input
            type="number" min="10" max="500" value={m2}
            onChange={(e) => setM2(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 transition-all"
          />
        </div>
        <button
          onClick={analyze}
          className="w-full py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0C10] text-sm font-semibold hover:bg-[#E5C84E] transition-all"
        >
          AI ile Analiz Et
        </button>
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="p-5 rounded-xl bg-[#D4AF37]/8 border border-[#D4AF37]/20">
            <div className="text-xs text-[#D4AF37]/70 uppercase tracking-wider mb-1">Tahmini İlk Yıl Cirosu</div>
            <div className="text-3xl font-bold text-[#D4AF37]">{result.min} – {result.max}M TL</div>
            <div className="text-xs text-[#8B8B9B] mt-1">Optimistik senaryo ({sehir})</div>
          </div>
          <div className="p-5 rounded-xl bg-white/4 border border-white/8">
            <div className="text-xs text-[#8B8B9B] uppercase tracking-wider mb-3">Önerilen Stok Dağılımı</div>
            {[
              { label: "Bilezik", pct: result.stok.bilezik },
              { label: "Kolye", pct: result.stok.kolye },
              { label: "Yüzük", pct: result.stok.yuzuk },
              { label: "Küpe", pct: result.stok.kupe },
              { label: "Diğer", pct: result.stok.diger },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 mb-2">
                <div className="w-16 text-xs text-[#8B8B9B]">{item.label}</div>
                <div className="flex-1 h-2 rounded-full bg-white/8">
                  <div className="h-full rounded-full bg-[#D4AF37]" style={{ width: `${item.pct}%` }} />
                </div>
                <div className="w-8 text-xs text-[#F0EDD8] text-right">%{item.pct}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#8B8B9B]/60">Bu tahminler SORS piyasa verilerine dayalıdır. Gerçek sonuçlar farklılık gösterebilir.</p>
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-white/3 border border-white/6 text-center">
          <TrendingUp className="w-8 h-8 text-[#D4AF37]/40 mx-auto mb-3" />
          <p className="text-sm text-[#8B8B9B]">Şehir, bütçe ve dükkan bilgilerini girerek tahmini karlılık analizinizi görün.</p>
        </div>
      )}
    </div>
  );
}

// ─── Tool 4 (Bonus): Inventory Gold Value Calculator ─────────────────────
interface InventoryRow { id: number; gram: string; ayar: string; adet: string; }

function InventoryCalculator() {
  const [rows, setRows] = useState<InventoryRow[]>([
    { id: 1, gram: "5", ayar: "14", adet: "10" },
    { id: 2, gram: "3", ayar: "22", adet: "5" },
  ]);
  const [nextId, setNextId] = useState(3);

  const addRow = () => {
    setRows((r) => [...r, { id: nextId, gram: "0", ayar: "14", adet: "1" }]);
    setNextId((n) => n + 1);
  };

  const removeRow = (id: number) => setRows((r) => r.filter((row) => row.id !== id));

  const update = (id: number, field: keyof InventoryRow, val: string) =>
    setRows((r) => r.map((row) => row.id === id ? { ...row, [field]: val } : row));

  const total = rows.reduce((acc, row) => {
    const gram = parseFloat(row.gram || "0");
    const adet = parseInt(row.adet || "0");
    const mill = milliems[row.ayar] || 0;
    return acc + gram * adet * mill;
  }, 0);

  const totalWeight = rows.reduce((acc, row) => acc + parseFloat(row.gram || "0") * parseInt(row.adet || "0"), 0);

  return (
    <div>
      <div className="overflow-x-auto mb-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8">
              <th className="text-left text-xs text-[#8B8B9B] uppercase tracking-wider pb-3 pr-4">Gram</th>
              <th className="text-left text-xs text-[#8B8B9B] uppercase tracking-wider pb-3 pr-4">Ayar</th>
              <th className="text-left text-xs text-[#8B8B9B] uppercase tracking-wider pb-3 pr-4">Adet</th>
              <th className="text-left text-xs text-[#8B8B9B] uppercase tracking-wider pb-3">Has Altın</th>
              <th className="pb-3 w-8" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const has = parseFloat(row.gram || "0") * parseInt(row.adet || "0") * (milliems[row.ayar] || 0);
              return (
                <tr key={row.id} className="border-b border-white/5">
                  <td className="py-2 pr-4">
                    <input type="number" min="0" step="0.01" value={row.gram} onChange={(e) => update(row.id, "gram", e.target.value)}
                      className="w-20 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50" />
                  </td>
                  <td className="py-2 pr-4">
                    <select value={row.ayar} onChange={(e) => update(row.id, "ayar", e.target.value)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50 cursor-pointer">
                      {["8","14","18","22","24"].map((k) => <option key={k} value={k} className="bg-[#0F1018]">{k}K</option>)}
                    </select>
                  </td>
                  <td className="py-2 pr-4">
                    <input type="number" min="1" value={row.adet} onChange={(e) => update(row.id, "adet", e.target.value)}
                      className="w-16 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[#F0EDD8] text-sm focus:outline-none focus:border-[#D4AF37]/50" />
                  </td>
                  <td className="py-2 text-[#D4AF37] font-medium">{has.toFixed(2)} gr</td>
                  <td className="py-2">
                    <button onClick={() => removeRow(row.id)} className="text-[#8B8B9B] hover:text-red-400 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <button onClick={addRow} className="flex items-center gap-2 text-sm text-[#D4AF37] hover:text-[#E5C84E] transition-colors mb-6">
        <Plus className="w-4 h-4" /> Satır Ekle
      </button>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-white/4 border border-white/8">
          <div className="text-xs text-[#8B8B9B] uppercase tracking-wider mb-1">Toplam Ağırlık</div>
          <div className="text-2xl font-bold text-[#F0EDD8]">{totalWeight.toFixed(1)} gr</div>
        </div>
        <div className="p-4 rounded-xl bg-[#D4AF37]/8 border border-[#D4AF37]/20">
          <div className="text-xs text-[#D4AF37]/70 uppercase tracking-wider mb-1">Toplam Has Altın</div>
          <div className="text-2xl font-bold text-[#D4AF37]">{total.toFixed(2)} gr</div>
        </div>
      </div>
    </div>
  );
}

// ─── Main AILab Component ──────────────────────────────────────────────────
const tools = [
  {
    id: "calculator",
    icon: Calculator,
    label: "Altın Hesaplayıcı",
    sublabel: "Gram × Ayar × İşçilik",
    component: GoldCalculator,
  },
  {
    id: "designer",
    icon: Sparkles,
    label: "AI Tasarımcı",
    sublabel: "Takı tasarım analizi",
    component: AIDesigner,
  },
  {
    id: "profit",
    icon: TrendingUp,
    label: "Karlılık Analizi",
    sublabel: "İlk yıl ciro tahmini",
    component: ProfitAnalyzer,
  },
  {
    id: "inventory",
    icon: Package,
    label: "Stok Değer",
    sublabel: "Envanter has altın",
    component: InventoryCalculator,
  },
];

export default function AILab() {
  const [active, setActive] = useState("calculator");

  const ActiveTool = tools.find((t) => t.id === active)?.component ?? GoldCalculator;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0 rounded-2xl overflow-hidden border border-white/8">
      {/* Sidebar */}
      <div className="bg-white/2 border-b lg:border-b-0 lg:border-r border-white/8 p-2">
        <div className="text-xs text-[#8B8B9B] uppercase tracking-wider px-3 py-2 mb-1">Araçlar</div>
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = active === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setActive(tool.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all mb-1 ${
                isActive
                  ? "bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#F0EDD8]"
                  : "hover:bg-white/4 text-[#8B8B9B] hover:text-[#F0EDD8] border border-transparent"
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isActive ? "bg-[#D4AF37]/20" : "bg-white/6"}`}>
                <Icon className={`w-4 h-4 ${isActive ? "text-[#D4AF37]" : "text-[#8B8B9B]"}`} />
              </div>
              <div>
                <div className={`text-sm font-medium ${isActive ? "text-[#F0EDD8]" : ""}`}>{tool.label}</div>
                <div className="text-xs text-[#8B8B9B] mt-0.5">{tool.sublabel}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8 bg-white/1">
        <ActiveTool />
      </div>
    </div>
  );
}
