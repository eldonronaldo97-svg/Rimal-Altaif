import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea(props: Props) {
  return (
    <textarea
      {...props}
      className="
        w-full
        rounded-xl
        border
        border-[#D1D5DB]
        bg-white
        p-4
        text-[15px]
        outline-none
        transition-all
        focus:border-[#1773EA]
        focus:ring-4
        focus:ring-[#1773EA]/10
      "
    />
  );
}