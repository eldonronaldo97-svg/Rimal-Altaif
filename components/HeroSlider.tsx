"use client";

export default function HeroSlider() {
  return (
    <div
      style={{
        height: "70vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* الصورة */}
      <img
        src="/banner.jpg"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay خفيف */}
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