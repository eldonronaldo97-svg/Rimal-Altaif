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
          padding: 80,
          textAlign: "center",
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
      {/* CONTAINER */}
      <div
        style={{
          maxWidth: 1600,
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(400px,1fr))",
            gap: 60,
            alignItems: "start",
          }}
        >
          {/* IMAGE */}
          <div
            style={{
              background: "#f7f7f7",
              position: "relative",
            }}
          >
            {!product.stock && (
              <div
                style={{
                  position: "absolute",
                  top: 20,
                  left: 20,
                  background: "#111",
                  color: "#fff",
                  padding: "8px 14px",
                  fontSize: 11,
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
                height: "800px",
                objectFit: "contain",
                padding: 40,
              }}
            />
          </div>

          {/* INFO */}
          <div
            style={{
              position: "sticky",
              top: 100,
            }}
          >
            {/* BRAND */}
            <p
              style={{
                fontSize: 12,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "#777",
                marginBottom: 16,
              }}
            >
              {product.brand}
            </p>

            {/* NAME */}
            <h1
              style={{
                fontSize: 52,
                fontWeight: 300,
                lineHeight: 1.1,
                marginBottom: 24,
              }}
            >
              {product.name}
            </h1>

            {/* PRICE */}
            <p
              style={{
                fontSize: 24,
                marginBottom: 30,
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
                marginBottom: 40,
                fontSize: 15,
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
                gap: 14,
              }}
            >
              <button
                style={{
                  height: 58,
                  background: "#000",
                  color: "#fff",
                  border: "none",
                  fontSize: 13,
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
                  height: 58,
                  border: "1px solid #000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: "#000",
                  fontSize: 13,
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
                marginTop: 50,
                borderTop: "1px solid #eee",
                paddingTop: 30,
              }}
            >
              <p
                style={{
                  marginBottom: 12,
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
        </div>

        {/* RELATED */}
        <div
          style={{
            marginTop: 120,
          }}
        >
          <h2
            style={{
              fontSize: 40,
              fontWeight: 300,
              marginBottom: 40,
            }}
          >
            You May Also Like
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4,1fr)",
              gap: 20,
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
                      padding: 20,
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: 300,
                        objectFit: "contain",
                      }}
                    />

                    <h3
                      style={{
                        marginTop: 20,
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {p.name}
                    </h3>

                    <p
                      style={{
                        marginTop: 8,
                        color: "#666",
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