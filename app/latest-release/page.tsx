import type { Metadata } from "next";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "أحدث الإصدارات | عطور جديدة | رمال الطائف",

  description:
    "اكتشف أحدث إصدارات العطور لدى رمال الطائف. عطور جديدة رجالية ونسائية وعطور للجنسين في مصر.",

  keywords: [
    "أحدث العطور",
    "عطور جديدة",
    "أحدث إصدارات العطور",
    "عطور رجالي جديدة",
    "عطور نسائي جديدة",
    "رمال الطائف",
    "Rimal Altaif",
    "عطور أصلية",
  ],

  alternates: {
    canonical: "https://rimalaltaif.com/latest-release",
  },

  openGraph: {
    title: "أحدث الإصدارات | رمال الطائف",
    description:
      "اكتشف أحدث إصدارات العطور لدى رمال الطائف.",
    url: "https://rimalaltaif.com/latest-release",
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

export default function LatestReleasePage() {
  const latestProducts = [...products]
    .reverse()
    .slice(0, 50)
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
            أحدث الأصدارات
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
          {latestProducts.map((p: any) => (
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