"use client";

import { useEffect, useState } from "react";

const images = [
  "/banner1.jpg",
  "/banner2.jpg",
  "/banner3.jpg",
  "/banner4.jpg",
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000); // ⏱ كل 2 ثانية

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
  width: "100%",
  height: "40vh",
  minHeight: "260px",
  maxHeight: "420px",
  overflow: "hidden",
  position: "relative",
}}
    >
      <img
        src={images[index]}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "0.5s",
        }}
      />
    </div>
  );
}