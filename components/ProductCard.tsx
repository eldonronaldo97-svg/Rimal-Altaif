"use client";

import { useCart } from "../lib/store";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import Toast from "./Toast";

export default function ProductCard({ p }: any) {
  const add = useCart((s) => s.add);
  const [show, setShow] = useState(false);
  const [fav, setFav] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.25 }}
        style={{
          background: "#fff",
          borderRadius: 10,
          overflow: "hidden",
          boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
          position: "relative",
        }}
      >
        {/* ❤️ Wishlist */}
        <div
          onClick={() => setFav(!fav)}
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            fontSize: 18,
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          {fav ? "❤️" : "🤍"}
        </div>

        {/* 🏷️ Badge */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: 8,
            background: "#000",
            color: "#fff",
            padding: "3px 8px",
            fontSize: 11,
            borderRadius: 4,
            zIndex: 2,
          }}
        >
          NEW
        </div>

        <Link href={`/product/${p.id}`}>
          <div style={{ overflow: "hidden" }}>
            <motion.img
              src={p.image}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                width: "100%",
                height: 180, // 👈 كان 300 (ده سبب الطول)
                objectFit: "contain", // 👈 يخلي الشكل مظبوط
                padding: 10,
              }}
            />
          </div>
        </Link>

        <div style={{ padding: 12 }}>
          <h3
            style={{
              marginBottom: 6,
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "18px",
              minHeight: 36, // 👈 يخلي الكروت متساوية
            }}
          >
            {p.name}
          </h3>

          {/* ⭐ Rating */}
          <div style={{ color: "#f5a623", fontSize: 13, marginBottom: 4 }}>
            ★★★★☆
          </div>

          <p style={{ color: "#888", fontSize: 13 }}>
            {p.price} جنيه
          </p>

          <button
            onClick={() => {
              add(p);
              setShow(true);
              setTimeout(() => setShow(false), 2000);
            }}
            style={{
              width: "100%",
              padding: "10px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              marginTop: 8,
              fontSize: 13,
            }}
          >
            أضف للسلة
          </button>
        </div>
      </motion.div>

      <Toast show={show} />
    </>
  );
}