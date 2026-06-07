"use client";

import Link from "next/link";
import { useCart } from "../lib/store";

export default function ProductCard({ p }: any) {
  const add = useCart((s) => s.add);

  return (
    <div className="product-card">
      <Link href={`/product/${p.id}`}>
        <div className="product-image">
          <img
            src={p.image}
            alt={p.name}
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

        <div className="product-price">
          EGP {p.price}
        </div>
      </div>

      <button
        className="product-btn"
        onClick={() =>
          add({
            id: p.id,
            name: p.name,
            image: p.image,
            price: p.price,
          })
        }
      >
        Add To Cart
      </button>
    </div>
  );
}