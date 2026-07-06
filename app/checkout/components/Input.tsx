import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
  return (
    <input
      {...props}
      className="
        h-14
        w-full
        rounded-xl
        border
        border-[#D1D5DB]
        bg-white
        px-4
        text-[15px]
        placeholder:text-[#9CA3AF]
        outline-none
        transition-all
        focus:border-[#1773EA]
        focus:ring-4
        focus:ring-[#1773EA]/10
      "
    />
  );
}