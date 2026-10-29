import type { Metadata } from "next";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";
import { products } from "../../lib/products";

export const metadata: Metadata = {
  title: "باقات العطور | رمال الطائف",
  description: "اكتشف باقات العطور المختارة من رمال الطائف.",
  alternates: {
    canonical: "https://rimalaltaif.com/bundles",
  },
};

export default function BundlesPage() {
  const bundles = products
    .filter((p: any) => /^o/i.test(p.id))
    .sort((a: any, b: any) => {
      if (a.stock === b.stock) return 0;
      return a.stock ? -1 : 1;
    });

  return (
    <>
      <Navbar />
      <section className="container">
        <div style={{ padding: "30px 0" }}>
          <h1 style={{ fontSize: 32, fontWeight: 700 }}>
            باقات العطور
          </h1>
          <p>اختار باقتك المفضلة من رمال الطائف</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
            gap: 12,
            paddingBottom: 30,
          }}
        >
          {bundles.map((p: any) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
      <Footer />
      <MobileBottomBar />
    </>
  );
}
