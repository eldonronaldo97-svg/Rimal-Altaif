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
        width: "100%",
        marginTop: 0,
      }}
    >
      <div
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
            objectFit: "cover",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
          }}
        >
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? 24 : 8,
                height: 8,
                borderRadius: 999,
                background:
                  active === i
                    ? "#fff"
                    : "rgba(255,255,255,.5)",
                transition: ".3s",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}