"use client";

import Link from "next/link";

export default function MobileBottomBar() {
  return (
    <div className="mobile-bar">
      <Link href="/" className="mobile-item">
        <div className="mobile-icon">🏠</div>
        <span>Home</span>
      </Link>

      <Link href="/" className="mobile-item">
        <div className="mobile-icon">🛍️</div>
        <span>Shop</span>
      </Link>

      <Link href="/" className="mobile-item">
        <div className="mobile-icon">❤️</div>
        <span>Wishlist</span>
      </Link>

      <Link href="/cart" className="mobile-item">
        <div className="mobile-icon">🛒</div>
        <span>Cart</span>
      </Link>

      <Link href="/" className="mobile-item">
        <div className="mobile-icon">📞</div>
        <span>Contact</span>
      </Link>
    </div>
  );
}