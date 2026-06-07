import ProductCard from "./ProductCard";

export default function ProductSlider({
  title,
  products,
}: any) {
  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          {title}
        </h2>

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