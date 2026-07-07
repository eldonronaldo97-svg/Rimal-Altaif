"use client";

import RadioCard from "./RadioCard";

interface Props {
  value: "cod" | "instapay" | "vodafone";

  onChange: (
    value: "cod" | "instapay" | "vodafone"
  ) => void;
}

export default function PaymentMethods({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-4">

      <RadioCard
        checked={value === "cod"}
        onClick={() => onChange("cod")}
        title="Cash On Delivery"
        subtitle="Pay when your order arrives."
      />

      <RadioCard
        checked={value === "instapay"}
        onClick={() => onChange("instapay")}
        title="Instapay"
        subtitle="Transfer using your Instapay account."
      />

      <RadioCard
        checked={value === "vodafone"}
        onClick={() => onChange("vodafone")}
        title="Vodafone Cash"
        subtitle="Transfer using Vodafone Cash."
      />

    </div>
  );
}