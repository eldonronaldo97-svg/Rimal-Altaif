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

      <label className="text-sm font-medium text-neutral-700">
        {label}
      </label>

      <input
        ref={ref}
        {...props}
        className={`
          h-12
          w-full
          rounded-xl
          border
          border-neutral-300
          bg-white
          px-4
          outline-none
          transition
          focus:border-black
          focus:ring-2
          focus:ring-black/10
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