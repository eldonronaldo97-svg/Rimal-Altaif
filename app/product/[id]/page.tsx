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
        paddingBottom: 140,
      }}
    >
      {/* PRODUCT */}
      <div
        style={{
          padding: "14px 14px 70px",
          maxWidth: 1600,
          margin: "0 auto",
        }}
      >
        {/* IMAGE */}
<div
  className="
    bg-[#f7f7f7]
    relative
    rounded-[12px]
    overflow-hidden
    mx-4
    mt-4
    flex
    items-center
    justify-center
  "
>

  {!product.stock && (
    <div
      className="
        absolute
        top-3
        left-3
        z-10
        bg-black
        text-white
        text-[10px]
        tracking-[2px]
        uppercase
        px-3
        py-2
      "
    >
      Sold Out
    </div>
  )}

  <img
  src={product.image}
  alt={product.name}
  className="
    w-full
    h-[280px]
    object-contain
    p-8
    block
  "
  style={{
    objectPosition: "center",
    transform: "translateX(40px)",
  }}
/>
</div>

        {/* INFO */}
        <div
  style={{
    textAlign: "left",
  }}
>
          {/* BRAND */}
          <p
            style={{
              fontSize: 10,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#777",
              marginBottom: 12,
            }}
          >
            {product.brand}
          </p>

          {/* NAME */}
          <h1
            style={{
              fontSize: 32,
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {product.name}
          </h1>

          {/* PRICE */}
          <p
            style={{
              fontSize: 22,
              marginBottom: 22,
              letterSpacing: "2px",
            }}
          >
            EGP {product.price}
          </p>

          {/* DESCRIPTION */}
          <p
            style={{
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 34,
              fontSize: 14,
            }}
          >
            Premium luxury fragrance with elegant
            performance, long-lasting scent and a
            sophisticated signature experience.
          </p>

          {/* EXTRA */}
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: 22,
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
              fontSize: 28,
              fontWeight: 300,
              marginBottom: 22,
            }}
          >
            You May Also Like
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 8,
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
                      padding: 12,
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: 170,
                        objectFit: "contain",
                      }}
                    />

                    <h3
                      style={{
                        marginTop: 12,
                        fontSize: 13,
                        fontWeight: 500,
                        lineHeight: 1.4,
                      }}
                    >
                      {p.name}
                    </h3>

                    <p
                      style={{
                        marginTop: 5,
                        color: "#666",
                        fontSize: 12,
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

      {/* FIXED BUTTONS */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          background: "#fff",
          padding: 12,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          borderTop: "1px solid #eee",
          zIndex: 100,
        }}
      >
        <button
          style={{
            height: 52,
            background: "#000",
            color: "#fff",
            border: "none",
            fontSize: 11,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Add To Cart
        </button>

        <a
          href="https://wa.me/201000000000"
          target="_blank"
          style={{
            height: 52,
            border: "1px solid #000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            color: "#000",
            fontSize: 11,
            letterSpacing: "2px",
            textTransform: "uppercase",
            background: "#fff",
          }}
        >
          WhatsApp
        </a>
      </div>
    </main>
  );
}