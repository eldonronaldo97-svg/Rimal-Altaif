"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#fff",
      }}
    >
      {/* Logo */}
      <h2 style={{ letterSpacing: 2 }}>
        RIMAL ALTAIF
      </h2>

      {/* Cart */}
      <Link href="/cart">
        <button>🛒</button>
      </Link>
    </div>
  );
}