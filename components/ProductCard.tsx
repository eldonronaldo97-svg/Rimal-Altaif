"use client";

import Link from "next/link";

export default function ProductCard({ p }: any) {
  return (
    <Link
      href={`/product/${p.id}`}
      style={{
        textDecoration: "none",
        color: "#000",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#fff",
          transition: "0.4s",
          cursor: "pointer",
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            overflow: "hidden",
            background: "#f7f7f7",
          }}
        >
          <img
            src={p.image}
            alt={p.name}
            style={{
              width: "100%",
              height: "420px",
              objectFit: "cover",
              transition: "0.6s",
            }}
            className="product-image"
          />
        </div>

        {/* INFO */}
        <div
          style={{
            padding: "20px 10px 30px",
            textAlign: "center",
          }}
        >
          {/* NAME */}
          <h3
            style={{
              fontSize: 18,
              fontWeight: 500,
              marginBottom: 12,
              letterSpacing: "1px",
            }}
          >
            {p.name}
          </h3>

          {/* BRAND */}
          <p
            style={{
              fontSize: 12,
              color: "#777",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            {p.brand}
          </p>

          {/* PRICE */}
          <p
            style={{
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            EGP {p.price}
          </p>
        </div>
      </div>

      {/* HOVER */}
      <style jsx>{`
        div:hover .product-image {
          transform: scale(1.06);
        }
      `}</style>
    </Link>
  );
}