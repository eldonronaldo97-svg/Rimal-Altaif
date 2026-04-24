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
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          position: "relative",
        }}
      >
        {/* ❤️ Wishlist */}
        <div
          onClick={() => setFav(!fav)}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            fontSize: 20,
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
            top: 10,
            left: 10,
            background: "#000",
            color: "#fff",
            padding: "4px 10px",
            fontSize: 12,
            borderRadius: 5,
            zIndex: 2,
          }}
        >
          NEW
        </div>

        <Link href={`/product/${p.id}`}>
          <div style={{ overflow: "hidden", position: "relative" }}>
            <motion.img
              src={p.image}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
              }}
            />

            {/* 🎯 Overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.2)",
                opacity: 0,
                transition: "0.3s",
              }}
              className="overlay"
            />
          </div>
        </Link>

        <div style={{ padding: 20 }}>
          <h3 style={{ marginBottom: 8 }}>{p.name}</h3>

          {/* ⭐ Rating */}
          <div style={{ color: "#f5a623", marginBottom: 5 }}>
            ★★★★☆
          </div>

          <p style={{ color: "#aaa", fontSize: 14 }}>
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
              padding: "12px",
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              marginTop: 10,
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