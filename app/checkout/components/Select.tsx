import { SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: Props) {
  return (
    <div className="relative">

      <select
        {...props}
        className="
          h-14
          w-full
          appearance-none
          rounded-xl
          border
          border-[#D1D5DB]
          bg-white
          px-4
          text-[15px]
          outline-none
          transition-all
          focus:border-[#1773EA]
          focus:ring-4
          focus:ring-[#1773EA]/10
        "
      >
        {props.children}
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
      />

    </div>
  );
}