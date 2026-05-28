import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

// 🔥 اسم الموقع (Title اللي بيظهر فوق في التاب)
export const metadata = {
  title: "رمال الطائف | Rimal Altaif",
  description: "عطور عربية فاخرة بثبات عالي وجودة أصلية",
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
      </body>
    </html>
  );
}