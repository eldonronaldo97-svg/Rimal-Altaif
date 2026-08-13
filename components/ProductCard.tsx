"use client";

import Link from "next/link";
import { useCart } from "../lib/store";

export default function ProductCard({ p }: any) {
  const add = useCart((s) => s.add);

  const handleAdd = () => {
    if (!p.stock) return;

    add({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
    });
  };

  return (
    <article className="product-card">
      {/* صورة المنتج */}
      <Link
        href={`/product/${p.id}`}
        className="product-image-link"
      >
        <div className="product-image">
          {!p.stock && (
            <span className="sold-out-badge">
              SOLD OUT
            </span>
          )}

          <img
            src={p.image}
            alt={p.name}
            className="product-image-img"
          />
        </div>
      </Link>

      {/* بيانات المنتج */}
      <div className="product-content">
        <div className="product-brand">
          {p.brand || "Rimal Altaif"}
        </div>

        <Link
          href={`/product/${p.id}`}
          className="product-name"
        >
          {p.name}
        </Link>

        {/* الأسعار */}
        <div className="product-prices">
          <span className="product-price">
            EGP {Number(p.price).toLocaleString("en-US")}
          </span>

          {p.oldPrice &&
            Number(p.oldPrice) > Number(p.price) && (
              <span className="product-old-price">
                EGP {Number(p.oldPrice).toLocaleString("en-US")}
              </span>
            )}
        </div>

        {/* إضافة للسلة */}
        <button
          type="button"
          className="product-btn"
          disabled={!p.stock}
          onClick={handleAdd}
        >
          {p.stock ? "أضف للسلة" : "نفذت الكمية"}
        </button>
      </div>
    </article>
  );
}