import Link from "next/link";

export default function BrandSlider() {
  const brands = [
    {
      name: "Assaf",
      image: "/brands/o.4860.jpg",
    },
    {
      name: "Ibraq",
      image: "/brands/unnamed.jpg",
    },
    {
      name: "Dkhoon",
      image: "/brands/1767285070033466556.webp",
    },
    {
      name: "Lattafa",
      image: "/brands/Lattafa-1728143584303.webp",
    },
    {
      name: "Arabiyat prestige",
      image: "/brands/9fd1c311-d6fe-4b83-b4c1-1b29fea6c111.jpg",
    },
    {
      name: "Laverne",
      image: "/brands/cmgj5zi3p1niv01hn5o0j7nl7_5.jpg",
    },
    {
      name: "Afnan",
      image: "/brands/afnan_logo.webp",
    },
    {
      name: "rasasi",
      image: "/brands/NTcxUrKbnUPbWDChASFFN8pYcqgnLS4XySm2BsRR.webp",
    },  
  ];

  return (
    <section className="section">
      <div className="container">
        <h2 className="section-title">
          البرندات
        </h2>

        <div className="brand-slider">
          {brands.map((brand) => (
            <Link
              key={brand.name}
              href={`/brand/${brand.name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="brand-card"
            >
              <div className="brand-circle">
                <img
                  src={brand.image}
                  alt={brand.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="brand-name">
                {brand.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}