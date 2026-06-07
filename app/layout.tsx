import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Rimal Altaif",
  description:
    "Luxury Perfumes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
    >
      <body
        className={
          montserrat.className
        }
      >
        {children}
      </body>
    </html>
  );
}