"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/products";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [page, setPage] = useState(1);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  }, []);

  // 🔎 Filter
  let filtered = products.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      category.toLowerCase() === "all" ||
      p.category?.toLowerCase() === category.toLowerCase();

    return matchSearch && matchCategory;
  });

  // ↕️ Sort
  if (sort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  }
  if (sort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  // 📄 Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const currentItems = filtered.slice(start, start + itemsPerPage);

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <Navbar />
      <HeroSlider />

      <div
  ref={sliderRef}
  style={{
    display: "flex",
    gap: 12,
    overflowX: "auto",
    scrollBehavior: "smooth",
    paddingBottom: 10,
    direction: "ltr",
  }}
>
  {products
    .filter((p) => p.bestSeller)
    .map((p) => (
      <div
        key={p.id}
        style={{
          width: 180,
          height: 400,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "1px solid #eee",
          borderRadius: 8,
          overflow: "hidden",
        }}
      >
        {/* الصورة والاسم رابط للصفحة */}
        <a href={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
          <img
            src={p.image}
            alt={p.name}
            style={{
              width: "100%",
              height: 250,
              objectFit: "contain",
            }}
          />
          <div style={{ padding: 6 }}>
            <h3
              style={{
                fontSize: 14,
                height: 40,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {p.name}
            </h3>
          </div>
        </a>

        {/* السعر + Add to Cart */}
        <div style={{ padding: "0 6px 6px" }}>
          <p style={{ fontSize: 13, color: "#000", marginBottom: 6 }}>{p.price} جنيه</p>
          <button
            style={{
              width: "100%",
              height: 32,
              background: "#000",
              color: "#fff",
              border: "none",
              fontSize: 12,
              textTransform: "uppercase",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log(`Add ${p.name} to cart`); // هنا ممكن تربط الكود بسلة الشراء
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
</div>

      {/* FILTER BAR */}
      <div
        style={{
          padding: "70px 20px 30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 25,
        }}
      >
        {/* TOP */}
        <div
          style={{
            display: "flex",
            gap: 15,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            placeholder="Search perfumes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: 320,
              height: 52,
              border: "1px solid #d4d4d8",
              padding: "0 20px",
              fontSize: 14,
              outline: "none",
              letterSpacing: "1px",
            }}
          />

          <select
            onChange={(e) => setSort(e.target.value)}
            style={{
              width: 180,
              height: 52,
              border: "1px solid #d4d4d8",
              padding: "0 16px",
              fontSize: 14,
              outline: "none",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            <option value="none">Featured</option>
            <option value="low">Price: Low → High</option>
            <option value="high">Price: High → Low</option>
          </select>
        </div>

        {/* CATEGORY BUTTONS */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {["all", "men", "women", "unisex"].map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
              style={{
                height: 42,
                padding: "0 24px",
                border:
                  category === item ? "1px solid black" : "1px solid #d4d4d8",
                background: category === item ? "#000" : "#fff",
                color: category === item ? "#fff" : "#000",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: 12,
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS */}
      <div
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: "0 0px 80px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 40,
            fontSize: 42,
            fontWeight: 300,
            textTransform: "capitalize",
            letterSpacing: "2px",
          }}
        >
          {category}
        </h2>

        {/* GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: 0,
          }}
        >
          {currentItems.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>

        {/* PAGINATION */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 10,
            marginTop: 60,
            flexWrap: "wrap",
          }}
        >
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                width: 45,
                height: 45,
                border:
                  page === i + 1 ? "1px solid black" : "1px solid #d4d4d8",
                background: page === i + 1 ? "#000" : "#fff",
                color: page === i + 1 ? "#fff" : "#000",
                cursor: "pointer",
                transition: "0.3s",
                fontSize: 14,
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}