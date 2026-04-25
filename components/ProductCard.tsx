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
              height: 140, // 👈 السر هنا
              objectFit: "contain",
              padding: 8,
            }}
          />
        </Link>

        <div style={{ padding: 10 }}>
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

          <div style={{ fontSize: 12, color: "#f5a623" }}>
            ★★★★☆
          </div>

          <p style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
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
              padding: "8px",
              fontSize: 12,
              background: "#000",
              color: "#fff",
              border: "none",
              borderRadius: 5,
              marginTop: 6,
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