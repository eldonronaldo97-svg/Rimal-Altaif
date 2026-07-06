"use client";

import { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function FloatingInput({
  label,
  ...props
}: Props) {
  return (
    <div className="relative">

      <input
        placeholder=" "
        {...props}
        className="
          peer
          h-14
          w-full
          rounded-xl
          border
          border-[#D1D5DB]
          bg-white
          px-4
          pt-5
          text-[15px]
          outline-none
          transition
          focus:border-[#1773EA]
          focus:ring-4
          focus:ring-[#1773EA]/10
        "
      />

      <label
        className="
          pointer-events-none
          absolute
          right-4
          top-4
          origin-right
          bg-white
          px-1
          text-[#6B7280]
          transition-all
          peer-placeholder-shown:top-4
          peer-placeholder-shown:text-[15px]
          peer-focus:-top-2
          peer-focus:text-xs
          peer-focus:text-[#1773EA]
          peer-[:not(:placeholder-shown)]:-top-2
          peer-[:not(:placeholder-shown)]:text-xs
        "
      >
        {label}
      </label>

    </div>
  );
}