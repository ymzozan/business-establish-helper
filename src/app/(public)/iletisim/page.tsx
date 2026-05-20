"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: MapPin,
    title: "Adres",
    content: "Kuyumcular Çarşısı, Fatih, İstanbul, Türkiye",
  },
  {
    icon: Phone,
    title: "Telefon",
    content: "+90 (212) 555 0100",
  },
  {
    icon: Mail,
    title: "E-posta",
    content: "info@kuyumcuotomasyon.com",
  },
  {
    icon: Clock,
    title: "Çalışma Saatleri",
    content: "Pazartesi - Cumartesi: 09:00 - 18:00",
  },
];

const subjects = [
  "Genel Bilgi",
  "Teknik Destek",
  "Fiyat Teklifi",
  "İş Ortaklığı",
  "Diğer",
];

export default function IletisimPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Form submission logic
  }

  return (
    <div className="flex flex-col">
      {/* Hero Banner */}
      <section className="bg-surface-soft py-20 sm:py-24">
        <div className="container text-center max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-normal tracking-[-1.5px] leading-[1.05] text-foreground mb-4">
            İletişim
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-[1.55]">
            Sorularınız için bize ulaşın, size yardımcı olalım.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="font-heading text-[28px] font-normal tracking-[-0.3px] leading-[1.2] mb-6">
                Bize Yazın
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full h-10 px-3.5 rounded-lg border border-hairline bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-colors"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full h-10 px-3.5 rounded-lg border border-hairline bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-colors"
                      placeholder="ornek@mail.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-foreground mb-1.5"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full h-10 px-3.5 rounded-lg border border-hairline bg-background text-foreground text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-colors"
                      placeholder="+90 (5XX) XXX XXXX"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Konu
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full h-10 px-3.5 rounded-lg border border-hairline bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-colors"
                  >
                    <option value="" disabled>
                      Konu seçin
                    </option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-1.5"
                  >
                    Mesaj
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-hairline bg-background text-foreground text-base placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/15 focus:border-primary transition-colors"
                    placeholder="Mesajınızı yazın..."
                  />
                </div>
                <Button type="submit" className="text-sm font-medium px-6 h-10 rounded-lg">
                  Gönder
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-heading text-[28px] font-normal tracking-[-0.3px] leading-[1.2] mb-6">
                İletişim Bilgileri
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <info.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-0.5">
                        {info.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {info.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
