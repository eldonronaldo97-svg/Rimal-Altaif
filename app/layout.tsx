import "./globals.css";
import { Cairo } from "next/font/google";

const font = Cairo({ subsets: ["arabic"] });

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
      <body className={font.className}>
        {children}
      </body>
    </html>
  );
}