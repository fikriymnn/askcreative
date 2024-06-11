import "./globals.css";

import CustomFooter from "@/components/CustomFooter";

import { Open_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "ASK CREATIVE",
  description: "ASK Creative's Website",
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
