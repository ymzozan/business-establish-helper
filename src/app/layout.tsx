import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kuyumcu Merkezi | Toptan Altın, Tamirat ve Mağaza Kurulumu",
  description:
    "Metrekarenize göre kuyumcu mağazanızı planlayın. Tezgah, vitrin, altın tedariği, tamirat ve montaj ihtiyaçlarınız için teklif alın.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} ${cormorant.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
