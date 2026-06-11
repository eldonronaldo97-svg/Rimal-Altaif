import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import MobileBottomBar from "../../components/MobileBottomBar";
import ProductCard from "../../components/ProductCard";

import { products } from "../../lib/products";

export default function WomenPage() {
  const womenProducts = products.filter(
    (p: any) =>
      p.category?.toLowerCase() === "women"
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
            Women Perfumes
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