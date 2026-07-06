"use client";

import { useState } from "react";

export default function CouponBox() {

  const [coupon, setCoupon] = useState("");

  return (

    <div className="my-8 flex gap-3">

      <input
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        placeholder="كود الخصم"
        className="h-12 flex-1 rounded-xl border border-[#D1D5DB] px-4 outline-none focus:border-[#1773EA]"
      />

      <button
        className="rounded-xl bg-[#F3F4F6] px-6 font-medium transition hover:bg-[#E5E7EB]"
      >
        تطبيق
      </button>

    </div>

  );
}