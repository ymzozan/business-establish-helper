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
  title: "SORS Gold | Toptan Altın Takı Tedariği & Anahtar Teslim Kuyumcu Kurulumu",
  description:
    "Atölyeden doğrudan 8K, 14K, 22K toptan altın takı tedariği. Sıfırdan kuyumcu kurulumu ve modern mağaza dönüşüm çözümleri. SORS ile kuyumculuğun dijital çağına adım atın.",
  keywords: "toptan altın takı, kuyumcu kurulum, 14 ayar toptan, kuyumcu açmak, altın tedarik, kuyumcu yazılım, SORS, has altın hesaplama",
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
