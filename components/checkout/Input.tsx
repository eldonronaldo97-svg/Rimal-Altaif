"use client";

import {
  forwardRef,
  InputHTMLAttributes,
} from "react";

interface Props
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<
  HTMLInputElement,
  Props
>(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="space-y-1">

      <input
        ref={ref}
        {...props}
        placeholder={label || props.placeholder}
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
          bg-white
          px-5
          text-[15px]
          text-right
          outline-none
          transition-all
          placeholder:text-[#8a8a8a]
          placeholder:text-[15px]
          focus:border-black
          focus:ring-2
          focus:ring-black/10
          ${error ? "border-red-500" : ""}
          ${className}
        `}
      />

      {error && (
        <p className="pr-1 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
});

Input.displayName = "Input";

export default Input;