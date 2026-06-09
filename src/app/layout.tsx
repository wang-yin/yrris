import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Luoyan from "next/font/local";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/article/utils/ScrollToTop";
import { SanityLive } from "@/sanity/lib/live";

const luoYan = Luoyan({
  src: "../../public/assets/fonts/ChenYuluoyan-Thin.ttf",
  variable: "--font-luoyan",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yrris Digital Garden - 一個紀錄學習、思考的敘事空間",
    template: "%s - Yrris Digital Garden",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-TW"
      className={`${luoYan.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <Header />
        <Navbar />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
        <ScrollToTop />
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
