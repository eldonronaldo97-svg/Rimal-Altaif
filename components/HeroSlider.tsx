"use client";

import { useEffect, useState } from "react";

export default function HeroSlider() {
  const images = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "3 / 2", // 💎 أهم سطر
        position: "relative",
        overflow: "hidden",
      }}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover", // كدة مش هيقص أصلاً
            opacity: i === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}