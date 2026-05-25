import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SORS | Kuyumculuk Dünyasına Giriş Biletiniz",
  description:
    "Toptan tedarik, sıfırdan kurulum ve dijital dönüşüm. Kuyumcu sektörünün lider B2B çözüm ortağı.",
  keywords: "kuyumcu, toptan altın, kuyumcu kurulum, kuyumcu yazılım, PusulaNet, altın hesaplama",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
