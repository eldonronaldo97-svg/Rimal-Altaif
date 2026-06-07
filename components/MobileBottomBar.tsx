"use client";

import Link from "next/link";
import { useCart } from "../lib/store";

export default function MobileBottomBar() {
  const cart = useCart((s) => s.cart);

  return (
    <div className="mobile-bar">
      <Link href="/" className="mobile-item">
        <div className="mobile-icon">🏠</div>
        <span>Home</span>
      </Link>

      <Link href="/brands" className="mobile-item">
        <div className="mobile-icon">🛍️</div>
        <span>Brands</span>
      </Link>

      <Link
        href="/cart"
        className="mobile-item"
        style={{ position: "relative" }}
      >
        {cart.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: -8,
              right: -8,
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "#000",
              color: "#fff",
              fontSize: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {cart.length}
          </div>
        )}

        <div className="mobile-icon">🛒</div>
        <span>Cart</span>
      </Link>

      <a
        href="https://wa.me/201060230817"
        target="_blank"
        rel="noopener noreferrer"
        className="mobile-item"
      >
        <div className="mobile-icon">💬</div>
        <span>WhatsApp</span>
      </a>

      <a
        href="tel:01060230817"
        className="mobile-item"
      >
        <div className="mobile-icon">📞</div>
        <span>Call</span>
      </a>
    </div>
  );
}