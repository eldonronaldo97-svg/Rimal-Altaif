import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "عطور نسائي | عطور نسائية أصلية | رمال الطائف",

  description:
    "تسوق أفضل العطور النسائية الأصلية لدى رمال الطائف. تشكيلة مميزة من العطور النسائية في مصر.",

  keywords: [
    "عطور نسائي",
    "عطور نسائية",
    "عطور نسائية أصلية",
    "أفضل عطور نسائي",
    "شراء عطور نسائي",
    "عطور نسائي مصر",
    "رمال الطائف",
    "Rimal Altaif",
  ],

  alternates: {
    canonical: "https://rimalaltaif.com/women",
  },

  openGraph: {
    title: "عطور نسائي | رمال الطائف",
    description:
      "تسوق أفضل العطور النسائية الأصلية لدى رمال الطائف.",
    url: "https://rimalaltaif.com/women",
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

export default function WomenPage() {
  const womenProducts = products
    .filter(
      (p: any) =>
        p.category?.toLowerCase() === "women"
    )
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
            عطور نسائي
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
          {womenProducts.map((p: any) => (
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