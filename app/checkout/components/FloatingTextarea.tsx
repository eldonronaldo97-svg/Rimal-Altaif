"use client";

import { TextareaHTMLAttributes } from "react";

interface Props
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export default function FloatingTextarea({
  label,
  ...props
}: Props) {
  return (
    <div className="relative">

      <textarea
        {...props}
        placeholder=" "
        className="
          peer
          min-h-[120px]
          w-full
          resize-none
          rounded-xl
          border
          border-[#D1D5DB]
          bg-white
          px-4
          pt-6
          pb-3
          text-[15px]
          outline-none
          transition-all
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
          bg-white
          px-1
          text-[#6B7280]
          transition-all
          peer-placeholder-shown:top-5
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