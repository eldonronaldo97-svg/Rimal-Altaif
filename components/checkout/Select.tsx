"use client";

import { SelectHTMLAttributes, forwardRef } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, Props>(
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
      <div className="space-y-2">

        <label className="text-sm font-medium text-neutral-700">
          {label}
        </label>

        <select
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
          <p className="text-xs text-red-500">
            {error}
          </p>
        )}

      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;