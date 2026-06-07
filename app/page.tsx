"use client";

import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/products";

export default function Home() {
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 8);

  const latestProducts = [...products].reverse().slice(0, 8);

  const allProducts = products.slice(0, 12);

  return (
    <main
      style={{
        background: "#f8f8f8",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <HeroSlider />

      {/* BRANDS */}
      <section
        style={{
          maxWidth: 1400,
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <h2
            style={{
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            All Brands
          </h2>

          <a
            href="#"
            style={{
              color: "#000",
              fontWeight: 600,
            }}
          >
            View All
          </a>
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            overflowX: "auto",
            paddingBottom: 10,
          }}
        >
          {[
            "Rimal Altaif",
            "Assaf",
            "Afnan",
            "Lattafa",
            "Dkhoon",
            "Ibraq",
            "French Avenue",
            "Arabiyat",
          ].map((brand) => (
            <div
              key={brand}
              style={{
                minWidth: 140,
                height: 140,
                borderRadius: "50%",
                background: "#fff",
                border: "1px solid #eee",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 600,
                textAlign: "center",
                padding: 10,
              }}
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section
        style={{
          maxWidth: 1400,
          margin: "60px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <h2
            style={{
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            Best Selling
          </h2>

          <a
            href="#"
            style={{
              color: "#000",
              fontWeight: 600,
            }}
          >
            View All
          </a>
        </div>

        <div className="product-grid">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* LATEST RELEASE */}
      <section
        style={{
          maxWidth: 1400,
          margin: "60px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <h2
            style={{
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            Latest Release
          </h2>

          <a
            href="#"
            style={{
              color: "#000",
              fontWeight: 600,
            }}
          >
            View All
          </a>
        </div>

        <div className="product-grid">
          {latestProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* SHOP BY GENDER */}
      <section
        style={{
          maxWidth: 1400,
          margin: "70px auto",
          padding: "0 20px",
        }}
      >
        <h2
          style={{
            fontSize: 34,
            fontWeight: 700,
            marginBottom: 25,
          }}
        >
          Shop By Gender
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 25,
          }}
        >
          <div className="gender-card">
            <img
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f"
              alt=""
            />
            <h3>MEN</h3>
          </div>

          <div className="gender-card">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
              alt=""
            />
            <h3>WOMEN</h3>
          </div>

          <div className="gender-card">
            <img
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
              alt=""
            />
            <h3>UNISEX</h3>
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section
        style={{
          maxWidth: 1400,
          margin: "70px auto",
          padding: "0 20px 100px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 25,
          }}
        >
          <h2
            style={{
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            All Products
          </h2>

          <a
            href="#"
            style={{
              color: "#000",
              fontWeight: 600,
            }}
          >
            View All
          </a>
        </div>

        <div className="product-grid">
          {allProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}