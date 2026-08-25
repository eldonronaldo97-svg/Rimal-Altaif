import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export default function LatestReleasePage() {
  const latestProducts = [...products]
    .sort((a: any, b: any) => {
      // المتاح يظهر أولًا
      if (a.stock !== b.stock) {
        return a.stock ? -1 : 1;
      }

      // الأحدث يظهر أولًا حسب:
      // السنة + الشهر + اليوم + الساعة + الدقيقة + الثانية
      const dateA = a.createdAt
        ? new Date(a.createdAt).getTime()
        : 0;

      const dateB = b.createdAt
        ? new Date(b.createdAt).getTime()
        : 0;

      return dateB - dateA;
    })
    .slice(0, 50);

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
            أحدث الإصدارات
          </h1>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill,minmax(160px,1fr))",
            gap: 12,
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