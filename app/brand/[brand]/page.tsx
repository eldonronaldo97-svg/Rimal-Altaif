import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import MobileBottomBar from "../../../components/MobileBottomBar";
import ProductCard from "../../../components/ProductCard";

import { products } from "../../../lib/products";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ brand: string }>;
}) {
  const { brand } = await params;

  const filteredProducts = products.filter(
    (p: any) =>
      p.brand &&
      p.brand.toLowerCase().replace(/\s+/g, "-") === brand
  );

  return (
    <>
      <Navbar />

      <section className="container">
        <div
          style={{
            padding: "30px 0",
          }}
        >
          <h1
            style={{
              fontSize: 32,
              fontWeight: 700,
              textTransform: "capitalize",
            }}
          >
            {brand.replace(/-/g, " ")}
          </h1>

          <p
            style={{
              marginTop: 10,
              color: "#666",
            }}
          >
            {filteredProducts.length} Products
          </p>
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
          {filteredProducts.map((p: any) => (
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