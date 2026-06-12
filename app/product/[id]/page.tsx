"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/lib/store";

export default function ProductPage() {
  const { id } = useParams();
  const add = useCart((s) => s.add);

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
        المنتج غير متاح
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
      <div
        style={{
          padding: "14px 14px 70px",
          maxWidth: 1600,
          margin: "0 auto",
        }}
      >
        {/* IMAGE */}
<div
  style={{
    background: "#f7f7f7",
    borderRadius: 12,
    marginTop: 16,
    width: "100%",
    minHeight: 420,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  }}
>
  {!product.stock && (
    <div
      style={{
        position: "absolute",
        top: 12,
        left: 12,
        zIndex: 10,
        background: "#000",
        color: "#fff",
        fontSize: 10,
        letterSpacing: 2,
        padding: "8px 12px",
      }}
    >
      نفذت الكمية
    </div>
  )}

  <img
    src={product.image}
    alt={product.name}
    style={{
      width: "100%",
      maxWidth: 420,
      height: "auto",
      objectFit: "contain",
      display: "block",
      margin: "0 auto",
    }}
  />
</div>

        {/* INFO */}
        <div
          style={{
            textAlign: "left",
          }}
        >
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

          <p
            style={{
              fontSize: 22,
              marginBottom: 22,
              letterSpacing: "2px",
            }}
          >
            EGP {product.price}
          </p>

          <p
            style={{
              color: "#666",
              lineHeight: 1.7,
              marginBottom: 34,
              fontSize: 14,
            }}
          >
            عطر فاخر بتركيبة مميزة وثبات ممتاز
            وفوحان جذاب يمنحك تجربة عطرية
            استثنائية تناسب مختلف المناسبات.
          </p>

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
              الفئة: {product.category}
            </p>

            <p
              style={{
                fontSize: 14,
              }}
            >
              التوفر:{" "}
              {product.stock
                ? "متوفر"
                : "نفذت الكمية"}
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
              textAlign: "left",
            }}
          >
            قد يعجبك ايضًا
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 8,
              textAlign: "left",
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
  onClick={() =>
    add({
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    })
  }
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
  اضف للسلة
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
          واتساب
        </a>
      </div>
    </main>
  );
}