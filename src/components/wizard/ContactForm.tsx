"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
}

interface ContactFormProps {
  data: ContactData;
  onChange: (data: ContactData) => void;
}

export function ContactForm({ data, onChange }: ContactFormProps) {
  function update(field: keyof ContactData, value: string) {
    onChange({ ...data, [field]: value });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          İletişim Bilgileriniz
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Size uygun hizmet paketini hazırlayabilmemiz için iletişim
          bilgilerinizi girin.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            Ad <span className="text-destructive">*</span>
          </Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="Adınız"
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Soyad <span className="text-destructive">*</span>
          </Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Soyadınız"
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">
            Telefon <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="05XX XXX XX XX"
            className="h-10"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            E-posta <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="ornek@email.com"
            className="h-10"
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="city" className="text-sm font-medium">
            Şehir
          </Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="İstanbul"
            className="h-10"
          />
        </div>
      </div>
    </div>
  );
}
