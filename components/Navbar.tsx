"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div
        style={{
          background: "#111",
          color: "#fff",
          textAlign: "center",
          padding: "8px 20px",
          fontSize: 12,
          letterSpacing: 1,
        }}
      >
        FREE SHIPPING OVER 3000 EGP
      </div>

      {/* NAVBAR */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #eee",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: 1600,
            margin: "0 auto",
            height: 85,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
          }}
        >
          {/* LEFT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
            }}
          >
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "#111",
                fontSize: 28,
                fontWeight: 300,
                letterSpacing: 4,
              }}
            >
              RIMAL ALTAIF
            </Link>
          </div>

          {/* CENTER MENU */}
          <nav
            style={{
              display: "flex",
              gap: 30,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            <Link href="/" style={linkStyle}>
              Home
            </Link>

            <Link href="/" style={linkStyle}>
              Shop
            </Link>

            <Link href="/" style={linkStyle}>
              Collections
            </Link>

            <Link href="/" style={linkStyle}>
              Best Sellers
            </Link>

            <Link href="/" style={linkStyle}>
              Brands
            </Link>

            <Link href="/" style={linkStyle}>
              Contact
            </Link>
          </nav>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
            }}
          >
            <button style={iconBtn}>🔍</button>

            <button style={iconBtn}>👤</button>

            <Link
              href="/cart"
              style={{
                textDecoration: "none",
                color: "#111",
                fontSize: 20,
              }}
            >
              🛒
            </Link>

            <button
              onClick={() => setOpen(!open)}
              style={{
                display: "none",
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#111",
};

const iconBtn = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 18,
};