"use client";

import { useState } from "react";
import Link from "next/link";

export default function MenuDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          background: "none",
          border: "none",
          fontSize: 28,
          cursor: "pointer",
        }}
      >
        ☰
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            zIndex: 99999,
          }}
        >
          <div
            style={{
              height: 70,
              background: "#02263a",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
              fontWeight: 600,
            }}
          >
            <span>Menu</span>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 28,
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>

          <div style={{ padding: 20 }}>
            <MenuLink href="/" text="Home" />
            <MenuLink href="/brands" text="Brands" />
            <MenuLink href="/latest-release" text="Latest Release" />
            <MenuLink href="/best-sellers" text="Best Sellers" />
            <MenuLink href="/shop" text="All Products" />
            <MenuLink href="/contact" text="Contact Us" />
          </div>
        </div>
      )}
    </>
  );
}

function MenuLink({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        padding: "18px 0",
        borderBottom: "1px solid #eee",
        textDecoration: "none",
        color: "#111",
        fontSize: 22,
        fontWeight: 500,
      }}
    >
      {text}
    </Link>
  );
}