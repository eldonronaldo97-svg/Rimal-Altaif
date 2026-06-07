"use client";

import Link from "next/link";

export default function MobileBottomBar() {
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

      <Link href="/cart" className="mobile-item">
        <div className="mobile-icon">🛒</div>
        <span>Cart</span>
      </Link>

      <a
        href="https://wa.me/201060230817"
        target="_blank"
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