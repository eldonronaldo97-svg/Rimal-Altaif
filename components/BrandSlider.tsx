import Link from "next/link";

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
            <Link
              key={brand}
              href={`/brand/${brand
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}