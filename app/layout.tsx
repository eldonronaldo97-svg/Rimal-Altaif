import "./globals.css";
import { Montserrat } from "next/font/google";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingCart from "@/components/FloatingCart";
import LayoutContent from "@/components/LayoutContent";
import { IBM_Plex_Sans_Arabic } from "next/font/google";

import type { Metadata, Viewport } from "next";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-arabic",
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: "رمال الطائف | Rimal Altaif",
    template: "%s | رمال الطائف",
  },

  description:
    "رمال الطائف | Rimal Altaif - متجر عطور فاخرة وأصلية في مصر. اكتشف أفضل العطور الرجالية والنسائية وعطور للجنسين.",

  keywords: [
    "رمال الطائف",
    "Rimal Altaif",
    "عطور رمال الطائف",
    "عطور اصلية",
    "عطور فاخرة",
    "عطور رجالي",
    "عطور نسائي",
    "عطور للجنسين",
    "شراء عطور في مصر",
    "متجر عطور",
  ],

  metadataBase: new URL("https://rimalaltaif.com"),

  alternates: {
    canonical: "https://rimalaltaif.com",
  },

  openGraph: {
    title: "رمال الطائف | Rimal Altaif",
    description:
      "متجر رمال الطائف للعطور الفاخرة والأصلية في مصر. عطور رجالية ونسائية وعطور للجنسين.",
    url: "https://rimalaltaif.com",
    siteName: "رمال الطائف | Rimal Altaif",
    locale: "ar_EG",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
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