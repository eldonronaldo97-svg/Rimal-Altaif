import Link from "next/link";
import ProductCard from "./ProductCard";

export default function ProductSlider({
  title,
  products,
}: any) {
  const getLink = () => {
    switch (title) {
      case "Best Selling":
        return "/best-sellers";

      case "Latest Release":
        return "/latest-release";

      case "All Products":
        return "/shop";

      default:
        return "/";
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2
            className="section-title"
            style={{
              marginBottom: 0,
            }}
          >
            {title}
          </h2>

          <Link
            href={getLink()}
            style={{
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            View All
          </Link>
        </div>

        <div className="products-slider">
          {products.map((p: any) => (
            <ProductCard
              key={p.id}
              p={p}
            />
          ))}
        </div>
      </div>
    </section>
  );
}