"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductPage() {
  const { id } = useParams();

  const product = products.find(
    (p) => p.id === id
  );

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
        }}
      >
        Product not found
      </div>
    );
  }

  return (
    <main
      style={{
        background: "#fff",
        minHeight: "100vh",
      }}
    >
      {/* PRODUCT */}
      <div
        style={{
          padding: "20px 14px 70px",
          maxWidth: 1600,
          margin: "0 auto",
        }}
      >
        {/* IMAGE */}
        <div
          style={{
            background: "#f7f7f7",
            position: "relative",
            marginBottom: 24,
          }}
        >
          {!product.stock && (
            <div
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                background: "#111",
                color: "#fff",
                padding: "7px 12px",
                fontSize: 10,
                letterSpacing: "2px",
                textTransform: "uppercase",
                zIndex: 5,
              }}
            >
              Sold Out
            </div>
          )}

          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "100%",
              height: "420px",
              objectFit: "contain",
              padding: 24,
            }}
          />
        </div>

        {/* INFO */}
        <div>
          {/* BRAND */}
          <p
            style={{
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#777",
              marginBottom: 14,
            }}
          >
            {product.brand}
          </p>

          {/* NAME */}
          <h1
            style={{
              fontSize: 38,
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: 18,
            }}
          >
            {product.name}
          </h1>

          {/* PRICE */}
          <p
            style={{
              fontSize: 22,
              marginBottom: 24,
              letterSpacing: "2px",
            }}
          >
            EGP {product.price}
          </p>

          {/* DESCRIPTION */}
          <p
            style={{
              color: "#666",
              lineHeight: 1.9,
              marginBottom: 34,
              fontSize: 14,
            }}
          >
            Premium luxury fragrance with elegant
            performance, long-lasting scent and a
            sophisticated signature experience.
          </p>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <button
              style={{
                height: 56,
                background: "#000",
                color: "#fff",
                border: "none",
                fontSize: 12,
                letterSpacing: "2px",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Add To Cart
            </button>

            <a
              href="https://wa.me/201000000000"
              target="_blank"
              style={{
                height: 56,
                border: "1px solid #000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: "#000",
                fontSize: 12,
                letterSpacing: "2px",
                textTransform: "uppercase",
              }}
            >
              Order via WhatsApp
            </a>
          </div>

          {/* EXTRA */}
          <div
            style={{
              marginTop: 40,
              borderTop: "1px solid #eee",
              paddingTop: 24,
            }}
          >
            <p
              style={{
                marginBottom: 10,
                fontSize: 14,
              }}
            >
              Category: {product.category}
            </p>

            <p
              style={{
                fontSize: 14,
              }}
            >
              Availability:{" "}
              {product.stock
                ? "In Stock"
                : "Sold Out"}
            </p>
          </div>
        </div>

        {/* RELATED */}
        <div
          style={{
            marginTop: 80,
          }}
        >
          <h2
            style={{
              fontSize: 32,
              fontWeight: 300,
              marginBottom: 24,
            }}
          >
            You May Also Like
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 10,
            }}
          >
            {products
              .slice(0, 4)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  style={{
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  <div
                    style={{
                      background: "#f7f7f7",
                      padding: 14,
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "contain",
                      }}
                    />

                    <h3
                      style={{
                        marginTop: 14,
                        fontSize: 14,
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {p.name}
                    </h3>

                    <p
                      style={{
                        marginTop: 6,
                        color: "#666",
                        fontSize: 13,
                      }}
                    >
                      EGP {p.price}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}