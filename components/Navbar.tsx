"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 999,
        height: 70,
        background: "#fff",
        borderBottom: "1px solid #eee",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <button
        style={{
          background: "none",
          border: "none",
          fontSize: 24,
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      <Link
        href="/"
        style={{
          textDecoration: "none",
          color: "#000",
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 1,
        }}
      >
        Rimal Altaif
      </Link>

      <button
        style={{
          background: "none",
          border: "none",
          fontSize: 22,
          cursor: "pointer",
        }}
      >
        🔍
      </button>
    </header>
  );
}