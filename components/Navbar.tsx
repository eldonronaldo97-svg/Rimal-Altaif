"use client";

import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/products";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const results = products.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
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
  onClick={() => setMenuOpen(true)}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  }}
>
  <FiMenu size={24} color="#000" />
</button>

        <Link
  href="/"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
  }}
>
  <img
    src="/logo.png"
    alt="Rimal Altaif"
    style={{
      height: 200,
      width: "auto",
      display: "block",
    }}
  />
</Link>

        <button
  onClick={() => setSearchOpen(true)}
  style={{
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  }}
>
  <FiSearch size={22} color="#000" />
</button>
      </header>

      {/* MENU */}
      {menuOpen && (
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
              background: "#000",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 20px",
            }}
          >
            <span style={{ fontSize: 20 }}>
              القائمة
            </span>

            <button
              onClick={() =>
                setMenuOpen(false)
              }
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 30,
                cursor: "pointer",
              }}
            >
              <FiX size={28} />
            </button>
          </div>

          <div style={{ padding: 20 }}>
            <MenuLink
              href="/"
              text="الرئيسية"
              onClick={() =>
                setMenuOpen(false)
              }
            />


            <MenuLink
              href="/best-sellers"
              text="الأكثر مبيعاً"
              onClick={() =>
                setMenuOpen(false)
              }
            />

            <MenuLink
              href="/latest-release"
              text="أحدث الإصدارات"
              onClick={() =>
                setMenuOpen(false)
              }
            />

            <MenuLink
              href="/men"
              text="عطور رجالي"
              onClick={() =>
                setMenuOpen(false)
              }
            />

            <MenuLink
              href="/women"
              text="عطور نسائي"
              onClick={() =>
                setMenuOpen(false)
              }
            />

            <MenuLink
              href="/unisex"
              text="عطور للجنسين"
              onClick={() =>
                setMenuOpen(false)
              }
            />

            <MenuLink
              href="/shop"
              text="جميع المنتجات"
              onClick={() =>
                setMenuOpen(false)
              }
            />

            <a
              href="https://wa.me/201060230817"
              style={{
                display: "block",
                padding: "18px 0",
                textDecoration: "none",
                color: "#000",
                fontSize: 18,
                borderBottom:
                  "1px solid #eee",
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* SEARCH */}
      {searchOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "#fff",
            zIndex: 99999,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: 20,
              borderBottom:
                "1px solid #eee",
              display: "flex",
              gap: 10,
            }}
          >
            <input
              placeholder="ابحث عن عطر أو براند..."
              value={query}
              onChange={(e) =>
                setQuery(
                  e.target.value
                )
              }
              style={{
                flex: 1,
                padding: 12,
                border:
                  "1px solid #ddd",
                borderRadius: 8,
                fontSize: 16,
              }}
            />

            <button
              onClick={() => {
                setSearchOpen(false);
                setQuery("");
              }}
            >
              ✕
            </button>
          </div>

          <div style={{ padding: 20 }}>
            {query &&
              results
                .slice(0, 20)
                .map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => {
                      setSearchOpen(
                        false
                      );
                      setQuery("");
                    }}
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems:
                        "center",
                      textDecoration:
                        "none",
                      color: "#000",
                      padding:
                        "12px 0",
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >
                    <img
                      src={
                        product.image
                      }
                      alt={
                        product.name
                      }
                      style={{
                        width: 60,
                        height: 60,
                        objectFit:
                          "contain",
                      }}
                    />

                    <div>
                      <div>
                        {
                          product.name
                        }
                      </div>

                      <div
                        style={{
                          fontSize: 12,
                          color:
                            "#777",
                        }}
                      >
                        {
                          product.brand
                        }
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      )}
    </>
  );
}

function MenuLink({
  href,
  text,
  onClick,
}: {
  href: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        display: "block",
        padding: "18px 0",
        textDecoration: "none",
        color: "#000",
        fontSize: 18,
        borderBottom: "1px solid #eee",
      }}
    >
      {text}
    </Link>
  );
}