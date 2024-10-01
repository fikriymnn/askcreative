import "./globals.css";

import CustomFooter from "@/components/CustomFooter";
import GoogleTranslate from "@/components/GoogleTranslate"
import { Open_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "AskScentLab - Digitalisasi Formulasi Parfum",
  description: "AskScentLab adalah platform terdepan untuk penjualan parfum dan aromaterapi premium. Kami juga menyediakan workshop eksklusif dengan pendekatan digitalisasi formulasi parfum dan aromaterapi. Temukan parfum unik dan pelajari cara menciptakan aroma personal dengan teknologi terkini. Pesan sekarang dan gabung workshop kami!",
  keywords: "parfum, aromaterapi, workshop parfum, workshop aromaterapi, digitalisasi formulasi parfum, beli parfum online, beli aromaterapi, workshop parfum online, personalisasi parfum, AskScentLab, parfum handmade, formulasi parfum digital",
};

export default function RootLayout({ children }) {
  return (
    <LanguageProvider>
      <html lang="en">

        <body>{children}</body>
      </html>
    </LanguageProvider>
  );
}
export const revalidate = 3;
