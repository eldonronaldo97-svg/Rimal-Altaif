"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* TOP BAR */}
      <div
        style={{
          background: "#111",
          color: "#fff",
          textAlign: "center",
          padding: "10px",
          fontSize: 12,
          letterSpacing: 1,
        }}
      >
        FREE SHIPPING ON ORDERS OVER 3000 EGP
      </div>

      {/* HEADER */}
      <header
        style={{
          background: "#fff",
          borderBottom: "1px solid #eee",
        }}
      >
        {/* TOP ROW */}
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            height: 90,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
          }}
        >
          {/* SEARCH */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span style={{ fontSize: 18 }}>🔍</span>

            <input
              placeholder="Search..."
              style={{
                border: "none",
                outline: "none",
                fontSize: 14,
                width: 180,
              }}
            />
          </div>

          {/* LOGO */}
          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#111",
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            RIMAL ALTAIF
          </Link>

          {/* ICONS */}
          <div
            style={{
              display: "flex",
              gap: 20,
              fontSize: 20,
            }}
          >
            <Link
              href="/account"
              style={{
                textDecoration: "none",
                color: "#111",
              }}
            >
              👤
            </Link>

            <Link
              href="/cart"
              style={{
                textDecoration: "none",
                color: "#111",
              }}
            >
              🛒
            </Link>
          </div>
        </div>

        {/* MENU */}
        <nav
          style={{
            borderTop: "1px solid #eee",
            borderBottom: "1px solid #eee",
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              height: 55,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 40,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            <Link href="/" style={link}>
              Home
            </Link>

            <Link href="/" style={link}>
              Men
            </Link>

            <Link href="/" style={link}>
              Women
            </Link>

            <Link href="/" style={link}>
              Unisex
            </Link>

            <Link href="/" style={link}>
              Latest Release
            </Link>

            <Link href="/" style={link}>
              Best Sellers
            </Link>

            <Link href="/" style={link}>
              Brands
            </Link>

            <Link href="/" style={link}>
              About Us
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

const link = {
  textDecoration: "none",
  color: "#111",
};