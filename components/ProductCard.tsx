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
        style={{
          background: "#fff",
          borderRadius: 8,
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* ❤️ */}
        <div
          onClick={() => setFav(!fav)}
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            fontSize: 16,
            zIndex: 2,
          }}
        >
          {fav ? "❤️" : "🤍"}
        </div>

        {/* NEW */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 6,
            background: "#000",
            color: "#fff",
            padding: "2px 6px",
            fontSize: 10,
            borderRadius: 3,
            zIndex: 2,
          }}
        >
          NEW
        </div>

        <Link href={`/product/${p.id}`}>
  <motion.img
    src={p.image}
    whileHover={{ scale: 1.05 }}
    style={{
      width: "100%",
      height: 200,
      objectFit: "contain",
      padding: 8,
    }}
  />
</Link>

        <div style={{ padding: 8 }}>
          <h3
            style={{
              fontSize: 13,
              marginBottom: 4,
              lineHeight: "16px",
              height: 32,
              overflow: "hidden",
            }}
          >
            {p.name}
          </h3>

          

          <p style={{ fontSize: 12, color: "#ff0000", marginTop: 4 }}>
            {p.price} جنيه
          </p>
          {p.stock === false && (
  <div
    style={{
      color: "red",
      fontSize: 12,
      fontWeight: "bold",
      marginTop: 4,
    }}
  >
    نفذت الكمية
  </div>
)}

          <button
  disabled={p.stock === false}
            onClick={() => {
              if (!p.stock) return;
add(p);
              setShow(true);
              setTimeout(() => setShow(false), 2000);
            }}
            style={{
  width: "100%",
  padding: "10px",
  fontSize: 12,
  background: "#000",
  color: "#fff",
  border: "none",
  borderRadius: 0,
  marginTop: 6,
  fontWeight: "bold",
  opacity: p.stock === false ? 0.5 : 1,
cursor: p.stock === false ? "not-allowed" : "pointer",
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