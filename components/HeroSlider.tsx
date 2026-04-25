"use client";

import { useEffect, useState } from "react";

export default function HeroSlider() {
  const images = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
    "/banner4.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // مدة العرض

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: "relative", height: "600px", overflow: "hidden" }}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            top: 0,
            left: 0,
            opacity: i === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}