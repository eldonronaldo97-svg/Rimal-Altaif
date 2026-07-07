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
    outline-none
    transition-all
    focus:border-black
    focus:ring-1
    focus:ring-black
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