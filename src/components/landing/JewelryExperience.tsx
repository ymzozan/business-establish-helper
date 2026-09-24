"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ServiceScene } from "./ServiceScene";
import {
  ArrowLeft,
  ArrowRight,
  Pause,
  Play,
  Diamond,
  Check,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  goldProducts,
  goldPurities,
  repairItems,
  repairOperations,
  requestDetailRows,
  requestDetailsSchema,
  storeModels,
  storeModules,
  storeStates,
  type RequestDetails,
  type RequestKind,
} from "@/lib/request-details";

const services = [
  {
    kind: "NEW_BUSINESS" as const,
    image: "/images/kuyumcu-konsept.png",
    alt: "Aydınlık vitrinleriyle temsili kuyumcu mağazası",
    hint: "Fikirden açılışa",
    title: "Kuyumcu açmak istiyorum",
  },
  {
    kind: "WHOLESALE" as const,
    image: "/images/toptan-altin.png",
    alt: "Altın bilezik, yüzük ve kolye koleksiyonu",
    hint: "Vitrininiz için",
    title: "Toptan altın almak istiyorum",
  },
  {
    kind: "REPAIR" as const,
    image: "/images/altin-tamirat.png",
    alt: "Bir altın yüzük üzerinde çalışan kuyumcu ustası",
    hint: "Usta ellerde",
    title: "Altın tamirat / tadilat yaptırmak istiyorum",
  },
];

type Contact = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  budget: string;
  note: string;
};
const emptyContact: Contact = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  city: "",
  budget: "",
  note: "",
};

function Choices({
  label,
  values,
  selected,
  onChange,
  multiple = false,
}: {
  label: string;
  values: readonly string[];
  selected: string | string[];
  onChange: (value: string) => void;
  multiple?: boolean;
}) {
  return (
    <fieldset className="choice-group">
      <legend>{label}</legend>
      <div className="choice-options">
        {values.map((value) => {
          const checked = Array.isArray(selected)
            ? selected.includes(value)
            : selected === value;
          return (
            <label
              key={value}
              className={`choice-option ${checked ? "is-selected" : ""}`}
            >
              <input
                type={multiple ? "checkbox" : "radio"}
                name={label}
                value={value}
                checked={checked}
                onChange={() => onChange(value)}
              />
              <span>{value}</span>
              {checked && <Check size={15} aria-hidden="true" />}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function JewelryExperience({
  initialKind = null,
}: {
  initialKind?: RequestKind | null;
}) {
  const [paused, setPaused] = useState(false);
  const [kind, setKind] = useState<RequestKind | null>(initialKind);
  const [step, setStep] = useState<0 | 1 | 2>(initialKind ? 1 : 0);
  const [storeState, setStoreState] = useState("");
  const [area, setArea] = useState("");
  const [model, setModel] = useState("Birlikte seçelim");
  const [modules, setModules] = useState<string[]>(["Anahtar teslim"]);
  const [products, setProducts] = useState<string[]>([]);
  const [purity, setPurity] = useState("Birlikte seçelim");
  const [grams, setGrams] = useState("");
  const [item, setItem] = useState("");
  const [operation, setOperation] = useState("");
  const [contact, setContact] = useState<Contact>(emptyContact);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(step);
  const submitting = useRef(false);
  const active = services.find((service) => service.kind === kind);

  useEffect(() => {
    if (previousStep.current !== step || receipt) {
      heading.current?.focus({ preventScroll: true });
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    previousStep.current = step;
  }, [step, receipt]);

  function details(): RequestDetails | null {
    const candidate =
      kind === "NEW_BUSINESS"
        ? {
            kind,
            storeState,
            area: area.trim() ? Number(area) : null,
            model,
            modules,
          }
        : kind === "WHOLESALE"
          ? {
              kind,
              products,
              purity,
              grams: grams.trim() ? Number(grams) : null,
            }
          : { kind, item, operation };
    const result = requestDetailsSchema.safeParse(candidate);
    return result.success ? result.data : null;
  }

  function go(next: 0 | 1 | 2) {
    if (pending) return;
    setError("");
    setStep(next);
  }

  function toggle(values: string[], value: string) {
    return values.includes(value)
      ? values.filter((entry) => entry !== value)
      : [...values, value];
  }

  function continueToContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!details()) {
      setError(
        kind === "NEW_BUSINESS"
          ? "Dükkan durumunu ve en az bir hizmeti seçin. Alanı biliyorsanız 10–1.000 m² arasında girin."
          : kind === "WHOLESALE"
            ? "En az bir ürün seçin. Miktarı biliyorsanız geçerli bir gram değeri girin."
            : "Ürünü ve istediğiniz işlemi seçin.",
      );
      return;
    }
    go(2);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const selectedDetails = details();
    if (!selectedDetails) {
      go(1);
      return;
    }
    if (
      contact.firstName.trim().length < 2 ||
      contact.lastName.trim().length < 2 ||
      contact.phone.replace(/\D/g, "").length < 10
    ) {
      setError("Ad, soyad ve telefon bilgilerinizi kontrol edin.");
      return;
    }
    submitting.current = true;
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        signal: AbortSignal.timeout(20000),
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: kind,
          sectorSlug: "kuyumcu",
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          email: contact.email,
          city: contact.city,
          budget: contact.budget,
          customerNote: contact.note,
          details: selectedDetails,
          answers: [],
        }),
      });
      if (!response.ok)
        throw new Error(
          "Talebiniz gönderilemedi. Bilgileriniz burada duruyor; tekrar deneyebilirsiniz.",
        );
      const saved = await response.json();
      setReceipt(saved.id);
    } catch (cause) {
      setError(
        cause instanceof Error && cause.name === "TimeoutError"
          ? "Yanıt gecikti. Lütfen tekrar deneyin."
          : cause instanceof Error
            ? cause.message
            : "Bağlantı kurulamadı. Tekrar deneyin.",
      );
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  function reset() {
    setReceipt("");
    setKind(null);
    setStep(0);
    setContact(emptyContact);
    setStoreState("");
    setArea("");
    setModel("Birlikte seçelim");
    setModules(["Anahtar teslim"]);
    setProducts([]);
    setPurity("Birlikte seçelim");
    setGrams("");
    setItem("");
    setOperation("");
    setError("");
  }

  if (receipt)
    return (
      <section className="simple-success">
        <span className="success-icon">
          <CheckCircle2 size={34} strokeWidth={1.5} />
        </span>
        <h1 ref={heading} tabIndex={-1}>
          Talebiniz bize ulaştı.
        </h1>
        <p>Seçimlerinizi aldık. Sizinle iletişime geçeceğiz.</p>
        <div className="success-request">
          <span>{active?.title}</span>
          <small>Talep no: {receipt}</small>
        </div>
        <Button onClick={reset} className="simple-primary">
          Ana sayfaya dön <ArrowRight size={18} />
        </Button>
      </section>
    );

  if (step === 0)
    return (
      <section className="simple-home">
        <div className="simple-intro">
          <span className="intro-emblem">
            <Diamond size={27} strokeWidth={1.25} />
          </span>
          <span className="simple-kicker">Sizin için buradayız.</span>
          <h1 ref={heading} tabIndex={-1}>
            Ne yapmak istiyorsunuz?
          </h1>
          <p>Birini seçin. Gerisini birlikte planlayalım.</p>
        </div>
        <div className="service-choices">
          {services.map((service) => (
            <button
              key={service.kind}
              aria-label={service.title}
              className="service-choice"
              onClick={() => {
                setKind(service.kind);
                go(1);
              }}
            >
              <div className="service-photo">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 700px) 36vw, 350px"
                  priority
                />
                <ServiceScene kind={service.kind} paused={paused} />
              </div>
              <div className="service-copy">
                <span className="service-hint">{service.hint}</span>
                <h2>{service.title}</h2>
                <span className="service-next" aria-hidden="true">
                  <ArrowRight size={20} />
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="home-bottom">
          <p className="simple-reassurance">
            Size özel teklif · Üyelik gerekmez
          </p>
          <button
            className="motion-toggle"
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
            {paused ? "Hareketi başlat" : "Hareketi durdur"}
          </button>
        </div>
      </section>
    );

  return (
    <section className="simple-flow">
      <div className="flow-topline">
        <button
          type="button"
          onClick={() => go(step === 2 ? 1 : 0)}
          disabled={pending}
          className="simple-back"
        >
          <ArrowLeft size={17} /> Geri
        </button>
        <ol className="flow-progress" aria-label="Başvuru adımları">
          {["İhtiyaç", "Detaylar", "İletişim"].map((label, index) => (
            <li
              key={label}
              aria-current={step === index ? "step" : undefined}
              className={index <= step ? "is-active" : ""}
            >
              <span>{index < step ? <Check size={12} /> : index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      </div>
      <div className="flow-layout">
        <aside className="flow-visual">
          <div className="flow-photo">
            <Image
              src={active!.image}
              alt={active!.alt}
              fill
              sizes="(max-width: 700px) 80px, 340px"
            />
          </div>
          <div>
            <span className="simple-kicker">Seçtiğiniz hizmet</span>
            <h2>{active!.title}</h2>
          </div>
        </aside>
        <div className="flow-content">
          <h1 ref={heading} tabIndex={-1}>
            {step === 1 ? "Biraz detay alalım." : "Sizi nasıl arayalım?"}
          </h1>
          <p className="flow-subtitle">
            {step === 1
              ? "Bildiğiniz kadarı yeterli."
              : "Bilgilerinizi bırakın, size ulaşalım."}
          </p>
          {step === 1 ? (
            <form onSubmit={continueToContact}>
              {kind === "NEW_BUSINESS" && (
                <>
                  <Choices
                    label="Dükkanınız hazır mı?"
                    values={storeStates}
                    selected={storeState}
                    onChange={setStoreState}
                  />
                  <label className="simple-field compact-field">
                    Kaç metrekare?{" "}
                    <span className="optional">(biliyorsanız)</span>
                    <div className="number-with-unit">
                      <Input
                        type="number"
                        min="10"
                        max="1000"
                        value={area}
                        onChange={(event) => setArea(event.target.value)}
                        placeholder="Örn. 50"
                      />
                      <span>m²</span>
                    </div>
                  </label>
                  <Choices
                    label="Hangi mağaza modeli?"
                    values={storeModels}
                    selected={model}
                    onChange={setModel}
                  />
                  <Choices
                    label="Neye ihtiyacınız var?"
                    values={storeModules}
                    selected={modules}
                    multiple
                    onChange={(value) =>
                      setModules((current) =>
                        value === "Anahtar teslim"
                          ? current.includes(value)
                            ? []
                            : [value]
                          : toggle(
                              current.filter(
                                (entry) => entry !== "Anahtar teslim",
                              ),
                              value,
                            ),
                      )
                    }
                  />
                </>
              )}
              {kind === "WHOLESALE" && (
                <>
                  <Choices
                    label="Hangi ürünler?"
                    values={goldProducts}
                    selected={products}
                    multiple
                    onChange={(value) =>
                      setProducts((current) => toggle(current, value))
                    }
                  />
                  <Choices
                    label="Kaç ayar olsun?"
                    values={goldPurities}
                    selected={purity}
                    onChange={setPurity}
                  />
                  <label className="simple-field compact-field">
                    Yaklaşık miktar{" "}
                    <span className="optional">(biliyorsanız)</span>
                    <div className="number-with-unit">
                      <Input
                        type="number"
                        min="0.1"
                        max="1000000"
                        step="0.1"
                        value={grams}
                        onChange={(event) => setGrams(event.target.value)}
                        placeholder="Örn. 100"
                      />
                      <span>gram</span>
                    </div>
                  </label>
                </>
              )}
              {kind === "REPAIR" && (
                <>
                  <Choices
                    label="Hangi ürün için?"
                    values={repairItems}
                    selected={item}
                    onChange={setItem}
                  />
                  <Choices
                    label="Ne yapılmasını istersiniz?"
                    values={repairOperations}
                    selected={operation}
                    onChange={setOperation}
                  />
                </>
              )}
              {error && (
                <p className="simple-error" role="alert">
                  {error}
                </p>
              )}
              <div className="flow-actions">
                <Button type="submit" className="simple-primary">
                  Devam et <ArrowRight size={18} />
                </Button>
                <span>Sonraki adım: iletişim</span>
              </div>
            </form>
          ) : (
            <form onSubmit={submit}>
              <fieldset disabled={pending}>
                <div className="contact-grid">
                  {(
                    [
                      ["firstName", "Ad", "text", "given-name"],
                      ["lastName", "Soyad", "text", "family-name"],
                      ["phone", "Telefon", "tel", "tel"],
                      ["city", "Şehir", "text", "address-level2"],
                    ] as const
                  ).map(([name, label, type, autoComplete]) => (
                    <label key={name} className="simple-field">
                      {label}
                      {name === "city" && (
                        <span className="optional">(isteğe bağlı)</span>
                      )}
                      <Input
                        name={name}
                        type={type}
                        autoComplete={autoComplete}
                        required={name !== "city"}
                        minLength={
                          name === "phone"
                            ? 10
                            : name === "city"
                              ? undefined
                              : 2
                        }
                        maxLength={name === "phone" ? 30 : 100}
                        value={contact[name]}
                        onChange={(event) =>
                          setContact((current) => ({
                            ...current,
                            [name]: event.target.value,
                          }))
                        }
                      />
                    </label>
                  ))}
                </div>
                <label className="simple-field">
                  Tahmini ayırdığınız bütçe{" "}
                  <span className="optional">(isteğe bağlı)</span>
                  <Input
                    name="budget"
                    maxLength={100}
                    value={contact.budget}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        budget: event.target.value,
                      }))
                    }
                    placeholder="Örn. 500.000 TL veya henüz belli değil"
                  />
                </label>
                <label className="simple-field">
                  Notunuz <span className="optional">(isteğe bağlı)</span>
                  <textarea
                    name="note"
                    rows={3}
                    maxLength={2000}
                    value={contact.note}
                    onChange={(event) =>
                      setContact((current) => ({
                        ...current,
                        note: event.target.value,
                      }))
                    }
                    placeholder="Eklemek istediğiniz bir şey var mı?"
                  />
                </label>
                <details className="optional-contact">
                  <summary>E-posta da eklemek istiyorum</summary>
                  <label className="simple-field">
                    E-posta
                    <Input
                      type="email"
                      onInvalid={(event) => {
                        const parent = event.currentTarget.closest("details");
                        if (parent) parent.open = true;
                      }}
                      name="email"
                      autoComplete="email"
                      maxLength={254}
                      value={contact.email}
                      onChange={(event) =>
                        setContact((current) => ({
                          ...current,
                          email: event.target.value,
                        }))
                      }
                    />
                  </label>
                </details>
                <details className="selection-review">
                  <summary>Seçimlerimi kontrol et</summary>
                  <dl>
                    {requestDetailRows(details()).map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <button type="button" onClick={() => go(1)}>
                    Seçimleri düzenle
                  </button>
                </details>
                {error && (
                  <p className="simple-error" role="alert">
                    {error}
                  </p>
                )}
                <Button
                  type="submit"
                  disabled={pending}
                  className="simple-primary submit-request"
                >
                  {pending ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />{" "}
                      Gönderiliyor…
                    </>
                  ) : (
                    <>
                      Talebimi gönder <ArrowRight size={18} />
                    </>
                  )}
                </Button>
                <p className="simple-privacy">
                  Bilgileriniz yalnızca talebinize dönüş yapmak için kullanılır.
                </p>
              </fieldset>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
