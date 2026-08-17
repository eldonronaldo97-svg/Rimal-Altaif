import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "كل العطور | متجر رمال الطائف",

  description:
    "تصفح جميع العطور المتوفرة في متجر رمال الطائف. عطور رجالية ونسائية وعطور للجنسين من أشهر العلامات التجارية.",

  keywords: [
    "عطور",
    "متجر عطور",
    "شراء عطور",
    "عطور أصلية",
    "عطور فاخرة",
    "عطور رجالي",
    "عطور نسائي",
    "عطور للجنسين",
    "رمال الطائف",
    "Rimal Altaif",
  ],

  alternates: {
    canonical: "https://rimalaltaif.com/shop",
  },

  openGraph: {
    title: "كل العطور | رمال الطائف",
    description:
      "تصفح جميع العطور المتوفرة في متجر رمال الطائف.",
    url: "https://rimalaltaif.com/shop",
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

export default function ShopPage() {
  const sortedProducts = [...products].sort(
    (a: any, b: any) => {
      if (a.stock === b.stock) return 0;
      return a.stock ? -1 : 1;
    }
  );

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
            جميع المنتجات
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
          {sortedProducts.map((p: any) => (
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