import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dnevnik.app | Teren in pisarna. Kot ena ekipa.",
  description: "Povežite terenske delavce in pisarniško vodstvo z Dnevnik.app. Enostavno sledenje opravilom, pretvarjanje glasovnih posnetkov v besedilo in pregled v živo brez odvečnih klicev.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageSwitcher />
        {children}
      </body>
    </html>
  );
}
