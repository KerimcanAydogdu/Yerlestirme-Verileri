import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "2024 Yükseköğretim Programları ve Yerleştirme Verileri",
  description: "Üsküdar Üniversitesi Üniversite Programı Arama",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5F5F7]`}
      >
        {children}
      </body>
    </html>
  );
}
