import { Diamond } from "lucide-react";

const partners = [
  "AltınPazar",
  "GoldTech",
  "Mücevher Pro",
  "Sarraf Online",
  "KaratSoft",
  "BorsaLink",
];

export function TrustedBySection() {
  return (
    <section className="bg-surface-soft py-14">
      <div className="container">
        <p className="text-center text-xs font-medium tracking-[1.5px] uppercase text-muted-foreground mb-8">
          Güvenilir İş Ortaklarımız
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {partners.map((name) => (
            <div
              key={name}
              className="flex items-center gap-2 text-muted-foreground/60"
            >
              <Diamond className="h-5 w-5" />
              <span className="font-medium text-sm tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
