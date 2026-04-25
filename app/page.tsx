"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSlider from "../components/HeroSlider";
import ProductCard from "../components/ProductCard";
import { products } from "../lib/products";

export default function Home() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("none");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  // 🔎 Filter
  let filtered = products.filter((p) => {
  const matchSearch = p.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory =
    category.toLowerCase() === "all" ||
    p.category.toLowerCase() === category.toLowerCase();

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
    <main>
      <Navbar />
      <HeroSlider />

      {/* 🔎 Search + Sort */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 10,
        marginTop: 30
      }}>
        <input
          placeholder="Search perfumes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: 10,
            width: 250,
            border: "1px solid #ddd",
            borderRadius: 8
          }}
        />

        <select
          onChange={(e) => setSort(e.target.value)}
          style={{ padding: 10, borderRadius: 8 }}
        >
          <option value="none">Sort</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
        </select>
      </div>

      {/* 🔥 Categories */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: 15,
        marginTop: 20
      }}>
        <button onClick={() => { setCategory("all"); setPage(1); }}>
          All
        </button>

        <button onClick={() => { setCategory("men"); setPage(1); }}>
          Men
        </button>

        <button onClick={() => { setCategory("women"); setPage(1); }}>
          Women
        </button>

        <button onClick={() => { setCategory("unisex"); setPage(1); }}>
          Unisex
        </button>
      </div>

      {/* 🔥 Products */}
      <div style={{ padding: "10px 4px" }}>
  <h2 style={{
    textAlign: "center",
    marginBottom: 30,
    fontSize: 28
  }}>
    {category}
  </h2>

  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: 2
  }}>
    {currentItems.map((p) => (
      <ProductCard key={p.id} p={p} />
    ))}
  </div>


        {/* 📄 Pagination */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 10,
          marginTop: 30
        }}>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              style={{
                padding: "8px 12px",
                borderRadius: 6,
                border: "1px solid #ddd",
                background: page === i + 1 ? "#000" : "#fff",
                color: page === i + 1 ? "#fff" : "#000"
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