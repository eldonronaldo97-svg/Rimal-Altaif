import "./globals.css";
import { Montserrat } from "next/font/google";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingCart from "@/components/FloatingCart";
import LayoutContent from "@/components/LayoutContent";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-arabic",
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

import type { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata = {
  title: "Rimal Altaif",
  description: "Luxury Perfumes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${montserrat.className} ${ibmArabic.variable}`}>
        {children}
        <FloatingCart />

<LayoutContent />
      </body>
    </html>
  );
}