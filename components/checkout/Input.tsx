"use client";

import {
  forwardRef,
  InputHTMLAttributes,
} from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<
  HTMLInputElement,
  Props
>(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="space-y-2">

      <label className="block pr-1 text-sm font-medium text-neutral-700">
        {label}
      </label>

      <input
  ref={ref}
  {...props}
  dir={
    props.type === "tel" ||
    props.type === "email" ||
    props.type === "number"
      ? "ltr"
      : "rtl"
  }
  className={`
    h-[58px]
    w-full
    rounded-[14px]
    border
    border-[#d9d9d9]
    border-neutral-300
    bg-white
    px-5
    text-[15px]
    outline-none
    transition
    focus:border-[#111]
focus:ring-4
focus:ring-neutral-200
    ${error ? "border-red-500" : ""}
    ${className}
  `}
/>

      {error && (
        <p className="text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
});

Input.displayName = "Input";

export default Input;