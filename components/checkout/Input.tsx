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
    <div className="w-full">

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
          block
          w-full
          h-[56px]
          px-4
          rounded-xl
          border
          border-[#d9d9d9]
          bg-white
          text-[15px]
          text-right
          text-neutral-900
          placeholder:text-[#7c7c7c]
          placeholder:text-[15px]
          outline-none
          transition-all
          focus:border-black
          focus:ring-1
          focus:ring-black
          disabled:bg-neutral-100
          ${error ? "border-red-500" : ""}
          ${className}
        `}
      />

      {error && (
        <p className="mt-2 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
});

Input.displayName = "Input";

export default Input;