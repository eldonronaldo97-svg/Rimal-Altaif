import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "الأكثر مبيعًا | أفضل العطور | رمال الطائف",

  description:
    "اكتشف أكثر العطور مبيعًا لدى رمال الطائف. مجموعة مختارة من العطور الرجالية والنسائية وعطور للجنسين في مصر.",

  keywords: [
    "الأكثر مبيعًا",
    "أفضل العطور",
    "عطور الأكثر مبيعًا",
    "عطور أصلية",
    "عطور فاخرة",
    "رمال الطائف",
    "Rimal Altaif",
    "شراء عطور في مصر",
  ],

  alternates: {
    canonical: "https://rimalaltaif.com/best-sellers",
  },

  openGraph: {
    title: "الأكثر مبيعًا | رمال الطائف",
    description:
      "اكتشف أكثر العطور مبيعًا لدى رمال الطائف.",
    url: "https://rimalaltaif.com/best-sellers",
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

export default function BestSellersPage() {
  const bestSellers = products
    .filter((p: any) => p.bestSeller)
    .sort((a: any, b: any) => {
      if (a.stock === b.stock) return 0;
      return a.stock ? -1 : 1;
    });

  return (
    <>
      <Navbar />

      <section className="container">
        <div style={{ padding: "30px 0" }}>
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            الأكثر مبيعًا
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(160px,1fr))",
            gap: 12,
            paddingBottom: 30,
          }}
        >
          {bestSellers.map((p: any) => (
            <ProductCard
              key={p.id}
              p={p}
            />
          ))}
        </div>
      </section>

      <Footer />
      <MobileBottomBar />
    </>
  );
}