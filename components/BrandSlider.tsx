export default function BrandSlider() {
  const brands = [
    "Rimal Altaif",
    "Assaf",
    "Afnan",
    "Lattafa",
    "Dkhoon",
    "Ibraq",
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          All Brands
        </h2>

        <div className="brand-slider">
          {brands.map((brand) => (
            <div
              key={brand}
              className="brand-card"
            >
              <div className="brand-circle">
                {brand
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>

              <div className="brand-name">
                {brand}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}