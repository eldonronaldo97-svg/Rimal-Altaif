import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "عطور للجنسين | عطور Unisex | رمال الطائف",

  description:
    "اكتشف مجموعة عطور للجنسين Unisex لدى رمال الطائف. عطور أصلية مناسبة للرجال والنساء في مصر.",

  keywords: [
    "عطور للجنسين",
    "عطور يونيسكس",
    "Unisex perfumes",
    "عطور للجنسين مصر",
    "أفضل عطور للجنسين",
    "شراء عطور للجنسين",
    "رمال الطائف",
    "Rimal Altaif",
  ],

  alternates: {
    canonical: "https://rimalaltaif.com/unisex",
  },

  openGraph: {
    title: "عطور للجنسين | رمال الطائف",
    description:
      "اكتشف مجموعة عطور للجنسين Unisex لدى رمال الطائف.",
    url: "https://rimalaltaif.com/unisex",
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

export default function UnisexPage() {
  const unisexProducts = products
    .filter(
      (p: any) =>
        p.category?.toLowerCase() === "unisex"
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
            عطور للجنسين
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
          {unisexProducts.map((p: any) => (
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