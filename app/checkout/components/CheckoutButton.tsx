"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    if (loading) return;

    setLoading(true);

    try {
      // TODO:
      // إرسال الأوردر إلى API أو Google Sheet

      await new Promise((resolve) =>
        setTimeout(resolve, 1500)
      );

      alert("تم إرسال الطلب بنجاح");
    } catch {
      alert("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-10 space-y-4">

      <button
        type="button"
        onClick={handleCheckout}
        disabled={loading}
        className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-black text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={20} />
            جاري إرسال الطلب...
          </>
        ) : (
          <>
            <Lock size={18} />
            تأكيد الطلب
          </>
        )}
      </button>

      <p className="text-center text-sm text-neutral-500">
        بالضغط على زر تأكيد الطلب فإنك توافق على إتمام عملية الشراء.
      </p>

    </div>
  );
}