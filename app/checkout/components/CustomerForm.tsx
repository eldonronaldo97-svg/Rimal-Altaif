"use client";

import { useState } from "react";
import FloatingInput from "./FloatingInput";
export default function CustomerForm() {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <section className="mb-10">

      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-2xl font-bold">
          معلومات التواصل
        </h2>

        <button
          type="button"
          className="text-sm text-blue-600 hover:underline"
        >
          تسجيل الدخول
        </button>

      </div>

      <div className="space-y-4">

        <FloatingInput
  label="البريد الإلكتروني (اختياري)"
  name="email"
  type="email"
  value={data.email}
  onChange={handleChange}
/>

<FloatingInput
  label="الاسم بالكامل"
  name="name"
  value={data.name}
  onChange={handleChange}
/>

<FloatingInput
  label="رقم الهاتف"
  name="phone"
  inputMode="numeric"
  value={data.phone}
  onChange={handleChange}
/>

      </div>

    </section>
  );
}