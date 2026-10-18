"use client";

import Link from "next/link";
import { useCart } from "../lib/store";

export default function ProductCard({ p }: any) {
  const add = useCart((s) => s.add);
  const available = Number(p.quantity ?? 0);
  const inStock = available > 0;

  const handleAdd = () => {
    if (!inStock) return;

    const added = add({
      id: p.id,
      name: p.name,
      image: p.image,
      price: p.price,
    });
    if (!added) window.alert(useCart.getState().message);
  };

  return (
    <article className="product-card">
      {/* صورة المنتج */}
      <Link
        href={`/product/${p.id}`}
        className="product-image-link"
      >
        <div className="product-image">
          {!inStock && (
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
      
        <div className="product-size">
          {p.size}
        </div>

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
          disabled={!inStock}
          onClick={handleAdd}
        >
          {inStock ? "أضف للسلة" : "نفذت الكمية"}
        </button>
      </div>
    </article>
  );
}