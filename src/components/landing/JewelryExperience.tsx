"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowRight, Check, Diamond, Hammer, Store, Ruler, ShieldCheck, Truck, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Service = "NEW_BUSINESS" | "WHOLESALE" | "REPAIR";
const services = [
  { id: "NEW_BUSINESS" as const, icon: Store, title: "Kuyumcu açmak istiyorum", text: "Boş bir dükkândan açılış gününe. Mağazanızı birlikte kuralım.", tag: "ANAHTAR TESLİM" },
  { id: "WHOLESALE" as const, icon: Diamond, title: "Toptan altın almak istiyorum", text: "Vitrininize uygun ürün grubunu, ayarını ve miktarını seçin.", tag: "TOPTAN TEDARİK" },
  { id: "REPAIR" as const, icon: Hammer, title: "Tamirat yaptırmak istiyorum", text: "Ölçü değişimi, kaynak, taş montajı ve bakım talepleriniz.", tag: "ATÖLYE HİZMETLERİ" },
];
const models = [
  { name: "Butik", range: "20–40 m²", min: 20, max: 40, detail: "Küçük alanda güçlü bir vitrin", material: "Açık meşe · krem · pirinç", layout: "Duvar vitrini + düz tezgah" },
  { name: "Modern", range: "40–80 m²", min: 40, max: 80, detail: "Ferah, sıcak ve zamansız", material: "Ceviz · doğal taş · şampanya", layout: "Çift vitrin + karşılama tezgahı" },
  { name: "Prestij", range: "80–200 m²", min: 80, max: 200, detail: "Geniş koleksiyonlara özel alan", material: "Koyu ahşap · mermer · bronz", layout: "Ada teşhir + özel görüşme alanı" },
];
const modules = ["Vitrin ve satış tezgahı", "Aydınlatma ve dekorasyon", "Kasa, kamera ve alarm", "Terazi ve kuyumcu yazılımı", "Başlangıç altın stoğu", "Nakliye ve yerinde montaj"];

export function JewelryExperience() {
  const [service, setService] = useState<Service>("NEW_BUSINESS");
  const [area, setArea] = useState("55");
  const [model, setModel] = useState("Modern");
  const [selected, setSelected] = useState(modules);
  const [product, setProduct] = useState("Bilezik");
  const [purity, setPurity] = useState("22 ayar");
  const [quantity, setQuantity] = useState("100");
  const [repair, setRepair] = useState("Ölçü değişimi");
  const [detail, setDetail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const active = services.find((item) => item.id === service)!;
  const validArea = Number(area) >= 10 && Number(area) <= 1000;
  const summary = service === "NEW_BUSINESS"
    ? `${area} m² · ${model} model\n${selected.join("\n")}`
    : service === "WHOLESALE" ? `${product} · ${purity} · ${quantity} gram` : `${repair}\n${detail}`;

  function chooseService(value: Service) {
    setService(value); setError(""); setReceipt("");
    document.getElementById("planla")?.scrollIntoView({ behavior: "smooth" });
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (service === "NEW_BUSINESS" && (!validArea || selected.length === 0)) { setError("10–1.000 m² arasında bir alan ve en az bir paket içeriği seçin."); return; }
    if (service === "WHOLESALE" && (!Number.isFinite(Number(quantity)) || Number(quantity) <= 0)) { setError("Geçerli bir gram miktarı girin."); return; }
    if (service === "REPAIR" && detail.trim().length < 10) { setError("Tamirat ihtiyacınızı en az 10 karakterle açıklayın."); return; }
    const form = new FormData(event.currentTarget);
    setPending(true); setError("");
    try {
      const response = await fetch("/api/applications", { method: "POST", signal: AbortSignal.timeout(15000), headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: service, sectorSlug: "kuyumcu", firstName: form.get("firstName"), lastName: form.get("lastName"), phone: form.get("phone"), email: form.get("email"), city: form.get("city"), answers: [], notes: `${active.title}\n${summary}\nEk not: ${form.get("note") || "—"}` }) });
      if (!response.ok) throw new Error("Talebiniz kaydedilemedi. Bilgilerinizi kontrol edip tekrar deneyin.");
      const data = await response.json(); setReceipt(data.id);
    } catch (e) { setError(e instanceof Error && e.name === "TimeoutError" ? "Bağlantı zaman aşımına uğradı. Lütfen tekrar deneyin." : e instanceof Error ? e.message : "Bağlantı kurulamadı. Lütfen tekrar deneyin."); }
    finally { setPending(false); }
  }

  return <div className="jewelry-site">
    <section className="j-hero">
      <div className="j-hero-copy"><p className="j-eyebrow"><span /> KUYUMCULUĞUN HER ADIMINDA</p>
        <h1>Hayalinizdeki kuyumcu.<br /><em>Her şeyiyle hazır.</em></h1>
        <p className="j-lead">Tezgahından ilk altınına, tasarımından montajına.<br className="hidden sm:block" /> Kuyumcu açmanın tüm adımları tek bir yerde.</p>
        <a href="#planla" className="j-button">Mağazamı oluştur <ArrowRight size={18} /></a>
        <a href="#hizmetler" className="j-text-link">Tüm hizmetleri keşfet <ArrowRight size={16} /></a>
        <div className="j-hero-note"><ShieldCheck size={19} /><span>İhtiyacınıza özel planlama. Tek noktadan koordinasyon.</span></div>
      </div>
      <div className="j-hero-image"><Image src="/images/kuyumcu-konsept.png" alt="Ceviz tezgahlar ve aydınlatmalı vitrinlerden oluşan temsili kuyumcu mağazası" fill priority sizes="(max-width: 800px) 100vw, 55vw" /><div className="j-image-caption"><span>MODERN KOLEKSİYON</span><strong>Bir dükkândan çok daha fazlası.</strong><small>Temsili konsept görseli</small></div><a className="j-image-arrow" href="#planla" aria-label="Modern mağaza modelini incele"><ArrowRight /></a></div>
    </section>
    <div className="j-promise"><span><Ruler /> Alanınıza özel tasarım</span><span><Diamond /> Toptan altın tedariği</span><span><Hammer /> Tamirat ve bakım</span><span><Truck /> Kurulum ve montaj</span></div>
    <section id="hizmetler" className="j-section"><div className="j-section-heading"><div><p className="j-eyebrow">TEK ADRES, TÜM İHTİYAÇLARINIZ</p><h2>Nereden başlamak istersiniz?</h2></div><p>Yeni bir başlangıç ya da mevcut işinize destek.<br />Size uygun çözümü birlikte oluşturalım.</p></div>
      <div className="j-services">{services.map(({ id, icon: Icon, title, text, tag }, i) => <button key={id} onClick={() => chooseService(id)} className={`j-service ${i === 0 ? "j-service-featured" : ""}`}><div className="j-service-top"><Icon size={29} strokeWidth={1.3}/><span>0{i + 1}</span></div><p className="j-eyebrow">{tag}</p><h3>{title}</h3><p>{text}</p><span className="j-service-link">{id === "NEW_BUSINESS" ? "Mağazanı planla" : "Talebini oluştur"}<ArrowRight size={19}/></span></button>)}</div>
    </section>
    <section id="planla" className="j-planner"><div className="j-section-heading"><div><p className="j-eyebrow">FİKRİNİZİ BİRLİKTE GERÇEĞE DÖNÜŞTÜRELİM</p><h2>Sizin alanınız. Sizin seçiminiz.</h2></div><span className="j-planner-label">SEÇİN · PLANLAYIN · TEKLİF ALIN</span></div>
      <div className="j-tabs" aria-label="Hizmet seçimi">{services.map((s) => <button key={s.id} aria-pressed={service === s.id} onClick={() => {setService(s.id); setError(""); setReceipt("");}}>{s.id === "NEW_BUSINESS" ? "Mağaza kurulumu" : s.id === "WHOLESALE" ? "Toptan altın" : "Tamirat"}</button>)}</div>
      <div className="j-planner-grid"><div>
        {service === "NEW_BUSINESS" ? <><div className="j-step-heading"><span>01</span><h3>Alanınızı tanıyalım</h3></div><label className="j-label" htmlFor="area">Mağazanız kaç metrekare?</label><div className="j-area"><Input id="area" type="number" min={10} max={1000} value={area} onChange={(e) => setArea(e.target.value)} /><span>m²</span></div><p className="j-help">10–1.000 m² için ön talep oluşturabilirsiniz. Yerleşim keşif sonrası netleşir.</p>
        <div className="j-step-heading"><span>02</span><h3>Mağaza modelinizi seçin</h3></div><div className="j-models">{models.map((m) => <button key={m.name} className={`j-model ${model === m.name ? "selected" : ""}`} aria-pressed={model === m.name} onClick={() => setModel(m.name)}><div className="j-model-top"><strong>{m.name}</strong>{model === m.name ? <Check size={18}/> : <Plus size={18}/>}</div><span className="j-model-range">{m.range}</span><p>{m.detail}</p><small>{m.material}</small><small>{m.layout}</small>{Number(area) >= m.min && Number(area) <= m.max ? <span className="j-fit">Alanınıza uygun</span> : <span className="j-fit j-fit-muted">Özel ölçüyle uyarlanır</span>}</button>)}</div>
        <div className="j-step-heading"><span>03</span><h3>Paketinize neler dahil olsun?</h3></div><div className="j-modules">{modules.map((item) => <label key={item}><input type="checkbox" checked={selected.includes(item)} onChange={() => setSelected((current) => current.includes(item) ? current.filter((s) => s !== item) : [...current, item])}/>{item}</label>)}</div></>
        : service === "WHOLESALE" ? <><div className="j-step-heading"><span>01</span><h3>Vitrininiz için altın seçin</h3></div><p className="j-form-intro">Ürün grubu ve toplam gram talebinizi belirtin. Model, işçilik ve güncel fiyat teklif aşamasında netleştirilir.</p><div className="j-fields"><label>Ürün grubu<select value={product} onChange={(e) => setProduct(e.target.value)}>{["Bilezik", "Kolye ve zincir", "Yüzük", "Küpe", "Karma koleksiyon"].map((s) => <option key={s}>{s}</option>)}</select></label><label>Ayar<select value={purity} onChange={(e) => setPurity(e.target.value)}>{["8 ayar", "14 ayar", "18 ayar", "22 ayar"].map((s) => <option key={s}>{s}</option>)}</select></label><label>Toplam miktar (gram)<Input type="number" min="0.1" step="0.1" value={quantity} onChange={(e) => setQuantity(e.target.value)} /></label></div></>
        : <><div className="j-step-heading"><span>01</span><h3>Takınıza yeniden hayat verelim</h3></div><p className="j-form-intro">İşlem ve ürün bilgilerini paylaşın. Uygunluk, ücret ve teslim süresi atölye incelemesinden sonra belirlenir.</p><label className="j-label">İşlem türü<select value={repair} onChange={(e) => setRepair(e.target.value)}>{["Ölçü değişimi", "Kaynak ve zincir onarımı", "Taş montajı", "Cila ve bakım", "Diğer"].map((s) => <option key={s}>{s}</option>)}</select></label><label className="j-label">Ürün ve tamirat açıklaması<textarea value={detail} onChange={(e) => setDetail(e.target.value)} maxLength={2000} placeholder="Örn. 14 ayar yüzüğün ölçüsünü büyütmek istiyorum…" rows={5}/></label></>}
      </div><aside className="j-summary"><p className="j-eyebrow">TALEBİNİZİN ÖZETİ</p><h3>{service === "NEW_BUSINESS" ? "Mağazanız şekilleniyor." : service === "WHOLESALE" ? "Yeni koleksiyonunuz." : "Atölye talebiniz."}</h3><div className="j-summary-body" aria-live="polite">{service === "NEW_BUSINESS" ? <><div className="j-summary-spec"><span>{area || "—"}<small>metrekare</small></span><span>{model}<small>mağaza modeli</small></span></div><ul>{selected.map((item) => <li key={item}><Check size={16}/>{item}</li>)}</ul>{selected.length === 0 && <p>En az bir paket içeriği seçin.</p>}</> : <p className="whitespace-pre-line">{summary}</p>}</div><p className="j-summary-note">Size özel fiyatlandırma<br /><span>Seçimleriniz ön talep niteliğindedir. Fiyat ve teslim planı görüşme sonrası belirlenir.</span></p><a href="#teklif" className="j-button">Bu seçimlerle teklif al <ArrowRight size={17}/></a></aside></div>
    </section>
    <section className="j-section j-process" id="surec"><div><p className="j-eyebrow">İLK FİKİRDEN İLK MÜŞTERİYE</p><h2>Siz hayal edin.<br /><em>Biz bir araya getirelim.</em></h2></div><div className="j-process-list">{[["İhtiyacınızı belirleyin", "Alanınızı, mağaza modelinizi ve ihtiyaçlarınızı seçin."], ["Projenizi netleştirelim", "Ölçü, tasarım, ürünler ve bütçeyi birlikte planlayalım."], ["Kurulumdan açılışa", "Onaylanan teklife göre tedarik, montaj ve teslimi koordine edelim."]].map(([title, text], i) => <div key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></section>
    <section className="j-contact" id="teklif"><div><p className="j-eyebrow">BİRLİKTE BAŞLAYALIM</p><h2>Bir sonraki adım,<br /><em>sizinle tanışmak.</em></h2><p>Seçimlerinizi bize iletin. İhtiyacınıza uygun<br />tedarik, tamirat veya kurulum planını konuşalım.</p><div className="j-contact-selection"><active.icon size={22}/><span>{active.title}</span></div></div>
      {receipt ? <div className="j-success" role="status"><Check size={36}/><h3>Talebiniz alındı.</h3><p>Seçimleriniz ve iletişim bilgileriniz kaydedildi.</p><p className="break-all">Talep numarası: {receipt}</p><Button className="j-button" onClick={() => setReceipt("")}>Yeni talep oluştur</Button></div> : <form onSubmit={submit} className="j-contact-form"><fieldset disabled={pending}><div className="j-fields">{[{name:"firstName",label:"Ad",type:"text",min:2},{name:"lastName",label:"Soyad",type:"text",min:2},{name:"phone",label:"Telefon",type:"tel",min:10},{name:"email",label:"E-posta",type:"email",min:5},{name:"city",label:"Şehir",type:"text",min:2}].map((f) => <label key={f.name}>{f.label}<Input name={f.name} type={f.type} required minLength={f.min} maxLength={150} autoComplete={f.name === "firstName" ? "given-name" : f.name === "lastName" ? "family-name" : f.name === "phone" ? "tel" : f.name === "city" ? "address-level2" : "email"}/></label>)}<label>Ek not (isteğe bağlı)<Input name="note" maxLength={1000}/></label></div><p className="j-help">İletişim bilgileriniz, talebinize dönüş yapılması için alınır. Bu form sipariş veya ödeme oluşturmaz.</p>{error && <p role="alert" className="j-error">{error}</p>}<Button type="submit" disabled={pending} className="j-button">{pending ? "Talebiniz gönderiliyor…" : "Teklif talebini gönder"}<ArrowRight size={18}/></Button></fieldset></form>}
    </section>
    <section className="j-section j-faq"><p className="j-eyebrow">MERAK ETTİKLERİNİZ</p><h2>Başlamadan önce.</h2>{[["Sadece tezgah veya altın alabilir miyim?", "Evet. İhtiyacınız olan paket içeriklerini seçebilir veya yalnızca toptan altın talebi oluşturabilirsiniz."],["Metrekareye göre kesin fiyat görebilir miyim?", "Metrekare planlama için başlangıçtır. Cephe, malzeme, güvenlik, altın miktarı ve montaj kapsamı fiyatı etkiler. Nihai teklif bu bilgiler netleşince hazırlanır."],["Montaj ve teslimat nasıl ilerler?", "Yerinde montajı paketinize ekleyebilirsiniz. Teslimat bölgesi, keşif ihtiyacı ve iş takvimi teklif görüşmesinde belirlenir."],["Tamirat fiyatı ne zaman belli olur?", "Ürünün durumu ve yapılacak işlem değerlendirildikten sonra fiyat ve süre bilgisi paylaşılır."]].map(([q,a]) => <details key={q}><summary>{q}<Plus size={18}/></summary><p>{a}</p></details>)}</section>
  </div>;
}
