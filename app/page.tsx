"use client";

import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { products } from "../lib/products";

export default function Home() {
  const bestSellers = products
    .filter((p) => p.bestSeller)
    .slice(0, 8);

  const latestProducts = [...products]
    .reverse()
    .slice(0, 8);

  const allProducts = products.slice(0, 12);

  return (
    <main
      style={{
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <HeroSlider />

      {/* BRANDS */}
      <section className="section">
        <div className="section-header">
          <h2>All Brands</h2>

          <a href="#">View All</a>
        </div>

        <div className="brand-slider">
          {[
            "Rimal Altaif",
            "Assaf",
            "Afnan",
            "Lattafa",
            "Dkhoon",
            "Ibraq",
          ].map((brand) => (
            <div
              key={brand}
              className="brand-card"
            >
              {brand}
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="section">
        <div className="section-header">
          <h2>Best Selling</h2>

          <a href="#">View All</a>
        </div>

        <div className="product-grid">
          {bestSellers.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
            />
          ))}
        </div>
      </section>

      {/* LATEST RELEASE */}
      <section className="section">
        <div className="section-header">
          <h2>Latest Release</h2>

          <a href="#">View All</a>
        </div>

        <div className="product-grid">
          {latestProducts.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
            />
          ))}
        </div>
      </section>

      {/* SHOP BY GENDER */}
      <section className="section">
        <div className="section-header">
          <h2>Shop By Gender</h2>
        </div>

        <div className="gender-grid">
          <div className="gender-card">
            <img
              src="https://images.unsplash.com/photo-1523293182086-7651a899d37f"
              alt="Men"
            />

            <h3>MEN</h3>
          </div>

          <div className="gender-card">
            <img
              src="https://images.unsplash.com/photo-1496747611176-843222e1e57c"
              alt="Women"
            />

            <h3>WOMEN</h3>
          </div>

          <div className="gender-card">
            <img
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15"
              alt="Unisex"
            />

            <h3>UNISEX</h3>
          </div>
        </div>
      </section>

      {/* ALL PRODUCTS */}
      <section className="section">
        <div className="section-header">
          <h2>All Products</h2>

          <a href="#">View All</a>
        </div>

        <div className="product-grid">
          {allProducts.map((p) => (
            <ProductCard
              key={p.id}
              p={p}
            />
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}