"use client";

import { useState } from "react";
import {
  Wallet,
  CreditCard,
  Banknote,
} from "lucide-react";
import RadioCard from "./RadioCard";

export default function PaymentMethods() {

  const [method, setMethod] = useState("cod");

  return (

    <section className="mb-10">

      <h2 className="mb-6 text-2xl font-semibold">
        طريقة الدفع
      </h2>

      <div className="space-y-4">

        <RadioCard
          selected={method === "cod"}
          title="الدفع عند الاستلام"
          description="يمكنك الدفع نقدًا عند استلام الطلب."
          icon={<Banknote size={22} />}
          onClick={() => setMethod("cod")}
        />

        <RadioCard
          selected={method === "instapay"}
          title="Instapay"
          description="سيتم عرض بيانات التحويل بعد تأكيد الطلب."
          icon={<CreditCard size={22} />}
          onClick={() => setMethod("instapay")}
        />

        <RadioCard
          selected={method === "vodafone"}
          title="Vodafone Cash"
          description="سيتم عرض رقم فودافون كاش بعد تأكيد الطلب."
          icon={<Wallet size={22} />}
          onClick={() => setMethod("vodafone")}
        />

      </div>

    </section>

  );
}