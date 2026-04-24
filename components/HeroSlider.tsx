"use client";

export default function HeroSlider() {
  return (
    <div
      style={{
        width: "100%",
        height: "220px", // قللناها شوية للموبايل 👌
        overflow: "hidden",
        position: "relative", // مهم جدًا
      }}
    >
      <img
        src="/banner.jpg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.25)",
        }}
      />
    </div>
  );
}