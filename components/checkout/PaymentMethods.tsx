"use client";

interface Props {
  value: "cod" | "instapay" | "vodafone";
  onChange: (
    value: "cod" | "instapay" | "vodafone"
  ) => void;
}

const methods = [
  {
    id: "cod",
    title: "الدفع عند الاستلام",
    description: "ادفع نقدًا عند استلام الطلب",
  },
  {
    id: "instapay",
    title: "Instapay",
    description: "تحويل بنكي عبر Instapay",
  },
  {
    id: "vodafone",
    title: "Vodafone Cash",
    description: "تحويل عبر فودافون كاش",
  },
] as const;

export default function PaymentMethods({
  value,
  onChange,
}: Props) {
  return (
    <div className="space-y-3">

      {methods.map((item) => {
        const active = value === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`
              w-full
              rounded-2xl
              border
              p-5
              text-right
              transition-all
              ${
                active
                  ? "border-black bg-neutral-50"
                  : "border-neutral-300 bg-white hover:border-neutral-500"
              }
            `}
          >
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div
                  className={`
                    flex
                    h-5
                    w-5
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    ${
                      active
                        ? "border-black"
                        : "border-neutral-400"
                    }
                  `}
                >
                  {active && (
                    <div className="h-2.5 w-2.5 rounded-full bg-black" />
                  )}
                </div>

                <div>

                  <h3 className="font-semibold text-[17px]">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    {item.description}
                  </p>

                </div>

              </div>

            </div>
          </button>
        );
      })}
    </div>
  );
}