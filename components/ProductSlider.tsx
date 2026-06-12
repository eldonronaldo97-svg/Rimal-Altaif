import Link from "next/link";
import ProductCard from "./ProductCard";

export default function ProductSlider({
  title,
  products,
}: any) {
  const getLink = () => {
    switch (title) {
      case "Best Selling":
      case "الأكثر مبيعًا":
        return "/best-sellers";

      case "Latest Release":
      case "أحدث الإصدارات":
        return "/latest-release";

      case "Men Perfumes":
      case "عطور رجالي":
        return "/men";

      case "Women Perfumes":
      case "عطور نسائي":
        return "/women";

      case "Unisex Perfumes":
      case "عطور للجنسين":
        return "/unisex";

      case "All Products":
      case "جميع المنتجات":
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
              textAlign: "right",
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
            عرض الكل
          </Link>
        </div>

        <div
          className="products-slider"
          style={{
            direction: "rtl",
          }}
        >
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