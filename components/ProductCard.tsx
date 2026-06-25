"use client";

import Link from "next/link";
import { useCart } from "../lib/store";

export default function ProductCard({ p }: any) {
  const add = useCart((s) => s.add);

  return (
    <div className="product-card">
      <Link href={`/product/${p.id}`}>
        <div
          className="product-image"
          style={{
            position: "relative",
          }}
        >
          {!p.stock && (
            <div
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 10,
                background: "#000",
                color: "#fff",
                padding: "6px 10px",
                fontSize: 10,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              SOLD OUT
            </div>
          )}

          <img
            src={p.image}
            alt={p.name}
            style={{
              opacity: p.stock ? 1 : 0.5,
            }}
          />
        </div>
      </Link>

      <div className="product-content">
        <div className="product-brand">
          {p.brand || "Rimal Altaif"}
        </div>

        <div className="product-name">
  {p.name}
</div>

<div
  style={{
    display: "inline-block",
    marginTop: 8,
    padding: "4px 10px",
    border: "1px solid #ddd",
    borderRadius: 999,
    fontSize: 11,
    color: "#666",
    background: "#fafafa",
    fontWeight: 600,
  }}
>
  {p.size}
</div>

<div className="product-price">
  {p.price} جنيه
</div>

      <button
        className="product-btn"
        disabled={!p.stock}
        onClick={() =>
          p.stock &&
          add({
            id: p.id,
            name: p.name,
            image: p.image,
            price: p.price,
          })
        }
        style={{
          opacity: p.stock ? 1 : 0.5,
          cursor: p.stock
            ? "pointer"
            : "not-allowed",
        }}
      >
        {p.stock
          ? "اضف للسلة"
          : "نفذت الكمية"}
      </button>
    </div>
  );
}