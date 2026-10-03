import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { readFile } from "node:fs/promises";
import path from "node:path";
type Quote = {
  id: string;
  name: string;
  phone: string;
  amount: number;
  scope: string;
  validUntil: string;
  company: string;
  legalName: string;
  address: string;
  email: string;
  companyPhone: string;
  demo: boolean;
};
export async function makeQuotePdf(q: Quote) {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const font = await doc.embedFont(
    await readFile(
      path.join(process.cwd(), "public/fonts/NotoSans-Regular.ttf"),
    ),
    { subset: true },
  );
  doc.setTitle("Teklif - " + q.id);
  doc.setAuthor(q.company);
  const chars = new Set(font.getCharacterSet());
  const clean = (s: string) =>
    Array.from(s.replace(/\r/g, ""))
      .map((c) => (c === "\n" || chars.has(c.codePointAt(0)!) ? c : "?"))
      .join("");
  let page = doc.addPage([595.28, 841.89]),
    y = 784;
  const ink = rgb(0.15, 0.22, 0.19),
    muted = rgb(0.38, 0.44, 0.4);
  const line = (s: string, size = 11) => {
    if (y < 65) {
      page = doc.addPage([595.28, 841.89]);
      y = 785;
    }
    page.drawText(clean(s), { x: 48, y, size, font, color: ink });
    y -= size * 1.55;
  };
  const paragraph = (s: string, size = 11) => {
    for (const para of clean(s).split("\n")) {
      let current = "";
      for (const word of para.split(/\s+/)) {
        if (
          font.widthOfTextAtSize((current ? current + " " : "") + word, size) >
          499
        ) {
          if (current) line(current, size);
          current = "";
          let part = "";
          for (const c of word) {
            if (font.widthOfTextAtSize(part + c, size) > 499) {
              line(part, size);
              part = "";
            }
            part += c;
          }
          current = part;
        } else current += (current ? " " : "") + word;
      }
      line(current, size);
    }
    y -= 8;
  };
  paragraph(q.company, 23);
  paragraph(q.legalName, 10);
  paragraph(
    [q.address, q.companyPhone, q.email].filter(Boolean).join(" · "),
    10,
  );
  y -= 12;
  line(q.demo ? "ÖRNEK TEKLİF" : "FİYAT TEKLİFİ", 18);
  if (q.demo)
    paragraph(
      "Örnek firma bilgileri içerir. Ticari kullanım öncesinde firma ayarlarını tamamlayın.",
      10,
    );
  paragraph("Teklif no: " + q.id, 10);
  paragraph(
    "Düzenlenme: " +
      new Date().toLocaleDateString("tr-TR", { timeZone: "Europe/Istanbul" }) +
      "  |  Geçerlilik: " +
      q.validUntil.split("-").reverse().join("."),
    10,
  );
  y -= 8;
  line("Müşteri", 13);
  paragraph(q.name + "\n" + q.phone);
  line("Teklif tutarı", 13);
  y -= 10;
  paragraph(
    q.amount.toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " TL",
    24,
  );
  line("Kapsam ve koşullar", 13);
  paragraph(q.scope);
  y -= 12;
  paragraph(
    "Vergi, teslimat, ödeme ve uygulama koşulları yukarıdaki kapsamda açıkça belirtilmelidir. Bu belge fatura değildir; tarafların ayrıca teyidi gerekir.",
    9,
  );
  const pages = doc.getPages();
  for (let i = 0; i < pages.length; i++)
    pages[i].drawText(`${i + 1} / ${pages.length}`, {
      x: 510,
      y: 30,
      size: 9,
      font,
      color: muted,
    });
  return doc.save();
}
