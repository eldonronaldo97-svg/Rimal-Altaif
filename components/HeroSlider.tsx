"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const banners = [
    "/ChatGPT Image 27 أغسطس 2026، 01_09_47 م.jpg",
    "/ChatGPT Image 27 أغسطس v2026، 01_18_52 م.jpg",
    "/ChatGPT Image 27 أغسطس 2026، 03_27_29 م.jpg",
    "/ChatGPT Image 27 أغسطس 2026، 03_27_14 م.jpg",
  ];

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      loop
      dir="rtl"
      style={{
        width: "100%",
      }}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <img
            src={banner}
            alt=""
            style={{
              width: "100%",
              display: "block",
              objectFit: "cover",
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}