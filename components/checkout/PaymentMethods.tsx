"use client";

import { PaymentMethod } from "@/lib/checkout/types";
import { CreditCard, Smartphone, Wallet } from "lucide-react";

interface Props {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const methods = [
  {
    id: "cod",
    title: "Cash on Delivery",
    subtitle: "Pay when you receive your order",
    icon: Wallet,
  },
  {
    id: "instapay",
    title: "Instapay",
    subtitle: "Transfer using Instapay",
    icon: Smartphone,
  },
  {
    id: "vodafone",
    title: "Vodafone Cash",
    subtitle: "Transfer using Vodafone Cash",
    icon: CreditCard,
  },
] as const;

export default function PaymentMethods({
  value,
  onChange,
}: Props) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-semibold">
        Payment Method
      </h2>

      <div className="space-y-4">

        {methods.map((method) => {
          const Icon = method.icon;
          const active = value === method.id;

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onChange(method.id)}
              className={`flex w-full items-center justify-between rounded-2xl border p-4 transition-all ${
                active
                  ? "border-black bg-black text-white"
                  : "border-neutral-200 hover:border-black"
              }`}
            >
              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                    active
                      ? "bg-white text-black"
                      : "bg-neutral-100"
                  }`}
                >
                  <Icon size={22} />
                </div>

                <div className="text-left">

                  <p className="font-semibold">
                    {method.title}
                  </p>

                  <p
                    className={`text-sm ${
                      active
                        ? "text-neutral-200"
                        : "text-neutral-500"
                    }`}
                  >
                    {method.subtitle}
                  </p>

                </div>

              </div>

              <div
                className={`h-5 w-5 rounded-full border-2 ${
                  active
                    ? "border-white bg-white"
                    : "border-neutral-400"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}