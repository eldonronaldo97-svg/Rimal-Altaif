import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "عطور رجالي | عطور رجالية أصلية | رمال الطائف",

  description:
    "تسوق أفضل العطور الرجالية الأصلية لدى رمال الطائف. تشكيلة من أشهر العطور الرجالية في مصر.",

  keywords: [
    "عطور رجالي",
    "عطور رجالية",
    "عطور رجالية أصلية",
    "أفضل عطور رجالي",
    "شراء عطور رجالي",
    "عطور رجالي مصر",
    "رمال الطائف",
    "Rimal Altaif",
  ],

  alternates: {
    canonical: "https://rimalaltaif.com/men",
  },

  openGraph: {
    title: "عطور رجالي | رمال الطائف",
    description:
      "تسوق أفضل العطور الرجالية الأصلية لدى رمال الطائف.",
    url: "https://rimalaltaif.com/men",
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

export default function MenPage() {
  const menProducts = products
    .filter(
      (p: any) =>
        p.category?.toLowerCase() === "men"
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
            عطور رجالى
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
          {menProducts.map((p: any) => (
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