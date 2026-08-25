import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export default function LatestReleasePage() {
  const latestProducts = [...products]
    .map((product: any, index) => ({
      product,
      index,
    }))
    .sort((a, b) => {
      // المتاح يظهر أولًا
      if (a.product.stock !== b.product.stock) {
        return a.product.stock ? -1 : 1;
      }

      // الأحدث يظهر أولًا
      const dateA = a.product.createdAt
        ? new Date(a.product.createdAt).getTime()
        : 0;

      const dateB = b.product.createdAt
        ? new Date(b.product.createdAt).getTime()
        : 0;

      if (dateA !== dateB) {
        return dateB - dateA;
      }

      // لو مفيش تاريخ، نحافظ على ترتيب المنتج الحالي
      return b.index - a.index;
    })
    .map(({ product }) => product)
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