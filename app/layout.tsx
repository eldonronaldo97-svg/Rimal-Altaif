import "./globals.css";
import { Montserrat } from "next/font/google";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingCart from "@/components/FloatingCart";
import LayoutContent from "@/components/LayoutContent";

const montserrat = Montserrat({
  subsets: ["latin"],
});

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
      <body className={montserrat.className}>
        {children}
        <FloatingCart />

<LayoutContent />
      </body>
    </html>
  );
}