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
<Link
  href="/"
  style={{
  textDecoration: "none",
  color: "#000",
  fontSize: 18,
  fontWeight: 500,
  letterSpacing: "4px",
  textTransform: "uppercase",
}}
>
  RIMAL ALTAIF
</Link>

      {/* Cart */}
      <Link href="/cart">
        <button>🛒</button>
      </Link>
    </div>
  );
}