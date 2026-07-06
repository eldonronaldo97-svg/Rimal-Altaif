"use client";

import { ChevronDown } from "lucide-react";

interface Props {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  children: React.ReactNode;
}

export default function FloatingSelect({
  label,
  name,
  value,
  onChange,
  children,
}: Props) {
  return (
    <div className="relative">

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="
          peer
          h-14
          w-full
          appearance-none
          rounded-xl
          border
          border-[#D1D5DB]
          bg-white
          px-4
          pt-5
          text-[15px]
          outline-none
          transition-all
          focus:border-[#1773EA]
          focus:ring-4
          focus:ring-[#1773EA]/10
        "
      >
        <option value=""></option>

        {children}

      </select>

      <label
        className="
          pointer-events-none
          absolute
          right-4
          top-2
          bg-white
          px-1
          text-xs
          text-[#6B7280]
        "
      >
        {label}
      </label>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
      />

    </div>
  );
}