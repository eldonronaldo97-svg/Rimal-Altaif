"use client";

import {
  SelectHTMLAttributes,
  forwardRef,
} from "react";

interface Option {
  label: string;
  value: string;
}

interface Props
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
}

const Select = forwardRef<
  HTMLSelectElement,
  Props
>(
  (
    {
      label,
      options,
      error,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">

        <select
          ref={ref}
          {...props}
          dir="rtl"
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
            focus:border-black
            focus:ring-2
            focus:ring-black/10
            ${error ? "border-red-500" : ""}
            ${className}
          `}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="pr-1 text-xs text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;