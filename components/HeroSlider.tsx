"use client";

import { useEffect, useState } from "react";

export default function HeroSlider() {
  const banners = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <img
        src={banners[active]}
        alt=""
        style={{
          width: "100%",
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 10,
        }}
      >
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setActive(index)}
            style={{
              width: active === index ? 30 : 10,
              height: 10,
              borderRadius: 20,
              border: "none",
              background:
                active === index
                  ? "#fff"
                  : "rgba(255,255,255,.5)",
              transition: ".3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}