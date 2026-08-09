"use client";

import { useEffect, useMemo, useState } from "react";

type CartItem = {
  id?: string | number;
  name?: string;
  title?: string;
  price?: number | string;
  salePrice?: number | string;
  image?: string;
  quantity?: number;
  qty?: number;
};

type CustomerForm = {
  name: string;
  phone: string;
  phone2: string;
  governorate: string;
  city: string;
  address: string;
  building: string;
  floor: string;
  apartment: string;
  notes: string;
};

const WHATSAPP_NUMBER = "201000000000";
const SHIPPING_COST = 60;

const GOVERNORATES = [
  "القاهرة",
  "الجيزة",
  "القليوبية",
  "الإسكندرية",
  "البحيرة",
  "مطروح",
  "الدقهلية",
  "الغربية",
  "المنوفية",
  "كفر الشيخ",
  "دمياط",
  "بورسعيد",
  "الإسماعيلية",
  "السويس",
  "الشرقية",
  "بني سويف",
  "الفيوم",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "البحر الأحمر",
  "الوادي الجديد",
  "شمال سيناء",
  "جنوب سيناء",
];

const emptyForm: CustomerForm = {
  name: "",
  phone: "",
  phone2: "",
  governorate: "",
  city: "",
  address: "",
  building: "",
  floor: "",
  apartment: "",
  notes: "",
};

function getPrice(item: CartItem) {
  const value = item.salePrice ?? item.price ?? 0;
  return Number(value) || 0;
}

function getQuantity(item: CartItem) {
  return Number(item.quantity ?? item.qty ?? 1) || 1;
}

function getName(item: CartItem) {
  return item.name ?? item.title ?? "منتج";
}

function money(value: number) {
  return new Intl.NumberFormat("ar-EG").format(value);
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState<CustomerForm>(emptyForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomerForm, string>>
  >({});
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    try {
      const keys = [
        "cart",
        "cartItems",
        "shoppingCart",
        "rimalCart",
      ];

      let found: CartItem[] = [];

      for (const key of keys) {
        const saved = localStorage.getItem(key);

        if (!saved) continue;

        try {
          const parsed = JSON.parse(saved);

          if (Array.isArray(parsed)) {
            found = parsed;
            break;
          }
        } catch {
          // Ignore malformed localStorage values.
        }
      }

      setCart(found);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + getPrice(item) * getQuantity(item);
    }, 0);
  }, [cart]);

  const total = Math.max(
    0,
    subtotal + (cart.length ? SHIPPING_COST : 0) - discount
  );

  function updateField(
    field: keyof CustomerForm,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((previous) => ({
        ...previous,
        [field]: "",
      }));
    }
  }

  function validate() {
    const nextErrors: Partial<
      Record<keyof CustomerForm, string>
    > = {};

    if (form.name.trim().length < 3) {
      nextErrors.name = "اكتب الاسم بالكامل";
    }

    if (!/^01\d{9}$/.test(form.phone.trim())) {
      nextErrors.phone = "اكتب رقم موبايل مصري صحيح";
    }

    if (!form.governorate) {
      nextErrors.governorate = "اختر المحافظة";
    }

    if (form.city.trim().length < 2) {
      nextErrors.city = "اكتب المدينة أو المنطقة";
    }

    if (form.address.trim().length < 5) {
      nextErrors.address = "اكتب العنوان بالتفصيل";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();

    if (!code) {
      setDiscount(0);
      setCouponMessage("");
      return;
    }

    if (code === "RIMAL10") {
      const value = Math.round(subtotal * 0.1);

      setDiscount(value);
      setCouponSuccess(true);
      setCouponMessage("تم تطبيق خصم 10% بنجاح");
      return;
    }

    setDiscount(0);
    setCouponSuccess(false);
    setCouponMessage("كود الخصم غير صحيح");
  }

  function buildWhatsAppMessage() {
    let message = `*طلب جديد من رمال الطائف*`;
    message += "\n━━━━━━━━━━━━━━━━";
    message += "\n\n";

    message += `*بيانات العميل*`;
    message += "\n";
    message += `الاسم: ${form.name}`;
    message += "\n";
    message += `الموبايل: ${form.phone}`;
    message += "\n";

    if (form.phone2.trim()) {
      message += `رقم إضافي: ${form.phone2}`;
      message += "\n";
    }

    message += "\n";
    message += `*عنوان الشحن*`;
    message += "\n";
    message += `المحافظة: ${form.governorate}`;
    message += "\n";
    message += `المدينة: ${form.city}`;
    message += "\n";
    message += `العنوان: ${form.address}`;
    message += "\n";

    if (form.building.trim()) {
      message += `رقم العقار: ${form.building}`;
      message += "\n";
    }

    if (form.floor.trim()) {
      message += `الدور: ${form.floor}`;
      message += "\n";
    }

    if (form.apartment.trim()) {
      message += `الشقة: ${form.apartment}`;
      message += "\n";
    }

    if (form.notes.trim()) {
      message += `ملاحظات: ${form.notes}`;
      message += "\n";
    }

    message += "\n";
    message += `*المنتجات*`;
    message += "\n";
    message += "━━━━━━━━━━━━━━━━";
    message += "\n";

    cart.forEach((item, index) => {
      const name = getName(item);
      const quantity = getQuantity(item);
      const price = getPrice(item);

      message += `${index + 1}. ${name}`;
      message += "\n";
      message += `الكمية: ${quantity}`;
      message += "\n";
      message += `السعر: ${money(price * quantity)} ج.م`;
      message += "\n\n";
    });

    message += `*ملخص الحساب*`;
    message += "\n";
    message += "━━━━━━━━━━━━━━━━";
    message += "\n";
    message += `الإجمالي الفرعي: ${money(subtotal)} ج.م`;
    message += "\n";
    message += `الشحن: ${money(SHIPPING_COST)} ج.م`;

    if (discount > 0) {
      message += "\n";
      message += `الخصم: -${money(discount)} ج.م`;
    }

    message += "\n";
    message += `*الإجمالي النهائي: ${money(total)} ج.م*`;
    message += "\n";
    message += "طريقة الدفع: الدفع عند الاستلام";
    message += "\n\n";
    message += "شكرًا لاختياركم رمال الطائف";

    return message;
  }

  function submitOrder() {
    if (!cart.length) {
      alert("السلة فارغة، أضف منتجًا أولًا.");
      return;
    }

    if (!validate()) {
      window.setTimeout(() => {
        const firstError = document.querySelector(
          ".field-error"
        );

        firstError?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);

      return;
    }

    const message = buildWhatsAppMessage();

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message);

    setWhatsappUrl(url);
    setShowSuccess(true);
  }

  function continueToWhatsapp() {
    if (!whatsappUrl) return;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setShowSuccess(false);
  }

  return (
    <>
      <main className="checkout-page">
        <header className="checkout-header">
          <div className="header-inner">
            <a className="brand" href="/">
              <div className="brand-symbol">ر</div>

              <div className="brand-copy">
                <strong>رمال الطائف</strong>
                <span>RIMAL ALTAIF</span>
              </div>
            </a>

            <div className="secure-badge">
              <span className="secure-icon">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    d="M7 10V7a5 5 0 0 1 10 0v3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                  <rect
                    x="5"
                    y="10"
                    width="14"
                    height="10"
                    rx="2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                </svg>
              </span>

              <span>تجربة شراء آمنة</span>
            </div>
          </div>
        </header>

        <div className="container">
          <section className="intro">
            <span className="eyebrow">
              RIMAL ALTAIF
            </span>

            <h1>إتمام الطلب</h1>

            <p>
              أكمل بياناتك وسنجهز طلبك بعناية حتى باب منزلك
            </p>
          </section>

          <div className="checkout-grid">
            <section className="details-card">
              <div className="form-section">
                <div className="section-title">
                  <div className="section-number">01</div>

                  <div>
                    <h2>بيانات العميل</h2>
                    <p>أدخل بيانات التواصل الخاصة بك</p>
                  </div>
                </div>

                <div className="form-grid">
                  <Field
                    label="الاسم بالكامل"
                    required
                    error={errors.name}
                    full
                  >
                    <input
                      value={form.name}
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="اكتب اسمك بالكامل"
                      autoComplete="name"
                    />
                  </Field>

                  <Field
                    label="رقم الموبايل"
                    required
                    error={errors.phone}
                  >
                    <input
                      value={form.phone}
                      onChange={(event) =>
                        updateField(
                          "phone",
                          event.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      placeholder="01xxxxxxxxx"
                      maxLength={11}
                      inputMode="numeric"
                      autoComplete="tel"
                    />
                  </Field>

                  <Field label="رقم إضافي">
                    <input
                      value={form.phone2}
                      onChange={(event) =>
                        updateField(
                          "phone2",
                          event.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      placeholder="اختياري"
                      maxLength={11}
                      inputMode="numeric"
                    />
                  </Field>
                </div>
              </div>

              <div className="divider" />

              <div className="form-section">
                <div className="section-title">
                  <div className="section-number">02</div>

                  <div>
                    <h2>عنوان الشحن</h2>
                    <p>سنقوم بالتوصيل حتى باب منزلك</p>
                  </div>
                </div>

                <div className="form-grid">
                  <Field
                    label="المحافظة"
                    required
                    error={errors.governorate}
                  >
                    <select
                      value={form.governorate}
                      onChange={(event) =>
                        updateField(
                          "governorate",
                          event.target.value
                        )
                      }
                    >
                      <option value="">
                        اختر المحافظة
                      </option>

                      {GOVERNORATES.map((governorate) => (
                        <option
                          key={governorate}
                          value={governorate}
                        >
                          {governorate}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="المدينة / المنطقة"
                    required
                    error={errors.city}
                  >
                    <input
                      value={form.city}
                      onChange={(event) =>
                        updateField(
                          "city",
                          event.target.value
                        )
                      }
                      placeholder="مثال: مدينة نصر"
                    />
                  </Field>

                  <Field
                    label="العنوان بالتفصيل"
                    required
                    error={errors.address}
                    full
                  >
                    <textarea
                      value={form.address}
                      onChange={(event) =>
                        updateField(
                          "address",
                          event.target.value
                        )
                      }
                      placeholder="اسم الشارع، رقم العقار، علامة مميزة..."
                      rows={3}
                    />
                  </Field>

                  <Field label="رقم العقار">
                    <input
                      value={form.building}
                      onChange={(event) =>
                        updateField(
                          "building",
                          event.target.value
                        )
                      }
                      placeholder="اختياري"
                    />
                  </Field>

                  <Field label="الدور">
                    <input
                      value={form.floor}
                      onChange={(event) =>
                        updateField(
                          "floor",
                          event.target.value
                        )
                      }
                      placeholder="مثال: الثالث"
                    />
                  </Field>

                  <Field label="الشقة">
                    <input
                      value={form.apartment}
                      onChange={(event) =>
                        updateField(
                          "apartment",
                          event.target.value
                        )
                      }
                      placeholder="مثال: 12"
                    />
                  </Field>

                  <Field label="ملاحظات الطلب" full>
                    <textarea
                      value={form.notes}
                      onChange={(event) =>
                        updateField(
                          "notes",
                          event.target.value
                        )
                      }
                      placeholder="أي ملاحظات خاصة بالتوصيل..."
                      rows={3}
                    />
                  </Field>
                </div>
              </div>

              <div className="divider" />

              <div className="form-section">
                <div className="section-title">
                  <div className="section-number">03</div>

                  <div>
                    <h2>طريقة الدفع</h2>
                    <p>اختر الطريقة المناسبة لك</p>
                  </div>
                </div>

                <div className="payment-option active">
                  <div className="radio checked">
                    <span />
                  </div>

                  <div className="payment-icon">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <rect
                        x="3"
                        y="6"
                        width="18"
                        height="12"
                        rx="2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />

                      <path
                        d="M3 10h18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />

                      <path
                        d="M7 14h4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="payment-content">
                    <strong>الدفع عند الاستلام</strong>

                    <span>
                      ادفع قيمة طلبك عند استلام الشحنة
                    </span>
                  </div>

                  <div className="payment-selected">
                    مختارة
                  </div>
                </div>
              </div>
            </section>

            <aside className="summary-card">
              <div className="summary-heading">
                <div>
                  <span>YOUR ORDER</span>
                  <h2>ملخص الطلب</h2>
                </div>

                <div className="bag-icon">
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 8h12l1 12H5L6 8Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />

                    <path
                      d="M9 9V6a3 3 0 0 1 6 0v3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {isLoading ? (
                <div className="loading-box">
                  <div className="spinner" />
                  <span>جاري تحميل الطلب...</span>
                </div>
              ) : cart.length ? (
                <>
                  <div className="products-list">
                    {cart.map((item, index) => {
                      const price = getPrice(item);
                      const quantity = getQuantity(item);

                      return (
                        <div
                          className="product-row"
                          key={
                            item.id ??
                            `${getName(item)}-${index}`
                          }
                        >
                          <div className="product-image">
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={getName(item)}
                              />
                            ) : (
                              <div className="image-placeholder">
                                عطر
                              </div>
                            )}

                            <span className="quantity">
                              {quantity}
                            </span>
                          </div>

                          <div className="product-details">
                            <strong>
                              {getName(item)}
                            </strong>

                            <span>
                              الكمية: {quantity}
                            </span>
                          </div>

                          <strong className="product-price">
                            {money(
                              price * quantity
                            )}{" "}
                            <small>ج.م</small>
                          </strong>
                        </div>
                      );
                    })}
                  </div>

                  <div className="coupon-box">
                    <input
                      value={coupon}
                      onChange={(event) =>
                        setCoupon(event.target.value)
                      }
                      placeholder="هل لديك كود خصم؟"
                    />

                    <button
                      type="button"
                      onClick={applyCoupon}
                    >
                      تطبيق
                    </button>
                  </div>

                  {couponMessage && (
                    <div
                      className={
                        couponSuccess
                          ? "coupon-message success"
                          : "coupon-message error"
                      }
                    >
                      {couponMessage}
                    </div>
                  )}

                  <div className="totals">
                    <div className="total-line">
                      <span>الإجمالي الفرعي</span>

                      <strong>
                        {money(subtotal)}{" "}
                        <small>ج.م</small>
                      </strong>
                    </div>

                    <div className="total-line">
                      <span>الشحن</span>

                      <strong>
                        {money(SHIPPING_COST)}{" "}
                        <small>ج.م</small>
                      </strong>
                    </div>

                    {discount > 0 && (
                      <div className="total-line discount-line">
                        <span>الخصم</span>

                        <strong>
                          -{money(discount)}{" "}
                          <small>ج.م</small>
                        </strong>
                      </div>
                    )}
                  </div>

                  <div className="grand-total">
                    <span>الإجمالي النهائي</span>

                    <div>
                      <strong>{money(total)}</strong>
                      <small>ج.م</small>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="submit-button"
                    onClick={submitOrder}
                  >
                    <span>تأكيد الطلب عبر واتساب</span>

                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 4.5A9.5 9.5 0 0 0 4.8 16.2L4 20l3.9-1a9.5 9.5 0 0 0 12.1-14.5Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />

                      <path
                        d="M8.5 8.5c.3-.7.5-.7 1-.7h.4c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c.7 1.2 1.6 2.1 2.8 2.7l.7-.7c.2-.2.4-.2.6-.1l1.7.8c.3.1.4.3.4.6v.4c0 .5-.1.7-.7 1-1 .4-2.2.1-3.6-.6-1.4-.7-3-2.2-3.8-3.5-.9-1.4-1.1-2.6-.7-3.4Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </button>

                  <div className="trust-row">
                    <div>
                      <span className="trust-icon">✓</span>
                      <span>منتجات أصلية</span>
                    </div>

                    <div>
                      <span className="trust-icon">◆</span>
                      <span>شحن سريع</span>
                    </div>

                    <div>
                      <span className="trust-icon">◈</span>
                      <span>طلب آمن</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty-cart">
                  <div className="empty-bag">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 8h12l1 12H5L6 8Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />

                      <path
                        d="M9 9V6a3 3 0 0 1 6 0v3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </div>

                  <h3>السلة فارغة</h3>

                  <p>
                    أضف المنتجات إلى السلة أولًا
                    لإتمام طلبك.
                  </p>

                  <a href="/" className="back-store">
                    العودة للمتجر
                  </a>
                </div>
              )}

              <div className="summary-note">
                <span>♡</span>

                <p>
                  يتم تجهيز كل طلب بعناية لضمان وصول
                  تجربتك بأفضل صورة.
                </p>
              </div>
            </aside>
          </div>

          <footer className="checkout-footer">
            <div className="footer-brand">
              رمال الطائف
            </div>

            <span>
              تجربة عطور فاخرة تبدأ من هنا
            </span>
          </footer>
        </div>
      </main>

      {showSuccess && (
        <div
          className="modal-backdrop"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="success-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="success-mark">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="m6 12 4 4 8-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="modal-eyebrow">
              ORDER READY
            </span>

            <h2>طلبك جاهز للتأكيد</h2>

            <p>
              اضغط على الزر التالي للانتقال إلى واتساب
              وإرسال تفاصيل طلبك.
            </p>

            <button
              type="button"
              className="modal-button"
              onClick={continueToWhatsapp}
            >
              الانتقال إلى واتساب
            </button>

            <button
              type="button"
              className="modal-cancel"
              onClick={() => setShowSuccess(false)}
            >
              إلغاء
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        :global(*) {
          box-sizing: border-box;
        }

        :global(html) {
          scroll-behavior: smooth;
        }

        :global(body) {
          margin: 0;
          background: #f6f4f0;
          color: #171717;
          font-family:
            Arial,
            "Segoe UI",
            Tahoma,
            sans-serif;
        }

        :global(button),
        :global(input),
        :global(select),
        :global(textarea) {
          font: inherit;
        }

        .checkout-page {
          min-height: 100vh;
          direction: rtl;
          background:
            radial-gradient(
              circle at 85% 5%,
              rgba(190, 156, 99, 0.08),
              transparent 28%
            ),
            #f6f4f0;
        }

        .checkout-header {
          height: 82px;
          background: rgba(255, 255, 255, 0.94);
          border-bottom: 1px solid #e9e4dc;
          display: flex;
          align-items: center;
          backdrop-filter: blur(12px);
        }

        .header-inner {
          width: min(1180px, calc(100% - 40px));
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          color: #181818;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-symbol {
          width: 43px;
          height: 43px;
          border: 1px solid #ad8950;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a47d40;
          font-family: Georgia, serif;
          font-size: 21px;
        }

        .brand-copy {
          display: flex;
          flex-direction: column;
          line-height: 1;
        }

        .brand-copy strong {
          font-family: Georgia, serif;
          font-size: 21px;
          font-weight: 500;
        }

        .brand-copy span {
          margin-top: 6px;
          color: #a58d69;
          font-size: 8px;
          letter-spacing: 3px;
          direction: ltr;
        }

        .secure-badge {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #78736b;
          font-size: 12px;
        }

        .secure-icon {
          width: 31px;
          height: 31px;
          border-radius: 50%;
          background: #f5f0e8;
          color: #9b763e;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .secure-icon svg {
          width: 16px;
          height: 16px;
        }

        .container {
          width: min(1180px, calc(100% - 40px));
          margin: auto;
          padding: 48px 0 70px;
        }

        .intro {
          text-align: center;
          margin-bottom: 38px;
        }

        .eyebrow {
          color: #a17c44;
          font-size: 9px;
          letter-spacing: 4px;
          direction: ltr;
          display: block;
          margin-bottom: 8px;
        }

        .intro h1 {
          margin: 0;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 39px;
          font-weight: 500;
          letter-spacing: -0.5px;
        }

        .intro p {
          margin: 9px 0 0;
          color: #817c73;
          font-size: 13px;
        }

        .checkout-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1.38fr)
            minmax(340px, 0.72fr);
          gap: 25px;
          align-items: start;
        }

        .details-card,
        .summary-card {
          background: #fff;
          border: 1px solid #e7e1d8;
          border-radius: 20px;
          box-shadow:
            0 16px 50px rgba(33, 28, 20, 0.045);
        }

        .details-card {
          padding: 31px;
        }

        .summary-card {
          padding: 27px;
          position: sticky;
          top: 20px;
        }

        .form-section {
          margin-bottom: 30px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 21px;
        }

        .section-number {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #f5efe5;
          color: #9b743b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .section-title h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }

        .section-title p {
          margin: 3px 0 0;
          color: #9a958c;
          font-size: 10px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 15px;
        }

        .field {
          min-width: 0;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        .field label {
          display: block;
          margin-bottom: 7px;
          color: #3d3a35;
          font-size: 11px;
          font-weight: 700;
        }

        .required {
          color: #ad8144;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          border: 1px solid #e2ddd5;
          border-radius: 11px;
          outline: none;
          background: #fff;
          color: #222;
          padding: 13px 14px;
          font-size: 12px;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .field input,
        .field select {
          height: 46px;
        }

        .field textarea {
          min-height: 88px;
          resize: vertical;
          line-height: 1.7;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: #b0aba3;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #b28b50;
          box-shadow:
            0 0 0 3px rgba(178, 139, 80, 0.08);
        }

        .field-error {
          margin-top: 5px;
          color: #b14a43;
          font-size: 9px;
        }

        .divider {
          height: 1px;
          background: #eeeae4;
          margin: 30px 0;
        }

        .payment-option {
          border: 1px solid #e4dfd7;
          border-radius: 14px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: 0.2s ease;
        }

        .payment-option.active {
          border-color: #c5a16d;
          background: #fcfaf6;
        }

        .radio {
          width: 19px;
          height: 19px;
          border: 1px solid #b9b2a8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .radio.checked {
          border-color: #a98148;
        }

        .radio.checked span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #a98148;
        }

        .payment-icon {
          width: 39px;
          height: 39px;
          border-radius: 10px;
          background: #f4eee5;
          color: #9d7844;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .payment-icon svg {
          width: 20px;
          height: 20px;
        }

        .payment-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .payment-content strong {
          font-size: 12px;
        }

        .payment-content span {
          color: #8e8981;
          font-size: 10px;
        }

        .payment-selected {
          color: #9c753e;
          font-size: 9px;
          background: #f5eee4;
          padding: 5px 8px;
          border-radius: 20px;
        }

        .summary-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 21px;
          border-bottom: 1px solid #ece7df;
        }

        .summary-heading span {
          color: #b08b52;
          font-size: 7px;
          letter-spacing: 3px;
          direction: ltr;
        }

        .summary-heading h2 {
          margin: 3px 0 0;
          font-family: Georgia, serif;
          font-size: 23px;
          font-weight: 500;
        }

        .bag-icon {
          width: 39px;
          height: 39px;
          border: 1px solid #e8e0d5;
          border-radius: 50%;
          color: #9d7844;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .bag-icon svg {
          width: 19px;
          height: 19px;
        }

        .products-list {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-bottom: 1px solid #ece7df;
        }

        .product-row {
          display: flex;
          align-items: center;
          gap: 11px;
          min-width: 0;
        }

        .product-image {
          width: 63px;
          height: 72px;
          flex-shrink: 0;
          position: relative;
          border-radius: 10px;
          overflow: visible;
          background: #f5f2ed;
          border: 1px solid #e8e2d9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 10px;
        }

        .image-placeholder {
          color: #ad9b82;
          font-size: 9px;
        }

        .quantity {
          position: absolute;
          top: -7px;
          left: -7px;
          min-width: 20px;
          height: 20px;
          padding: 0 5px;
          border-radius: 20px;
          background: #181818;
          color: #fff;
          border: 2px solid #fff;
          font-size: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-details {
          flex: 1;
          min-width: 0;
        }

        .product-details strong {
          display: block;
          font-size: 11px;
          line-height: 1.5;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-details span {
          display: block;
          margin-top: 3px;
          color: #969087;
          font-size: 9px;
        }

        .product-price {
          white-space: nowrap;
          font-size: 10px;
        }

        .product-price small,
        .total-line small,
        .grand-total small {
          color: #888178;
          font-size: 8px;
          font-weight: 500;
        }

        .coupon-box {
          display: flex;
          gap: 7px;
          padding: 18px 0 8px;
        }

        .coupon-box input {
          flex: 1;
          height: 43px;
          min-width: 0;
          border: 1px solid #e3ddd4;
          border-radius: 10px;
          outline: none;
          padding: 0 12px;
          font-size: 10px;
        }

        .coupon-box input:focus {
          border-color: #b18a50;
        }

        .coupon-box button {
          border: 0;
          background: #1a1a1a;
          color: #fff;
          border-radius: 10px;
          padding: 0 17px;
          font-size: 10px;
          cursor: pointer;
        }

        .coupon-message {
          font-size: 9px;
          padding: 3px 0 10px;
        }

        .coupon-message.success {
          color: #398054;
        }

        .coupon-message.error {
          color: #b24c45;
        }

        .totals {
          padding: 15px 0;
          border-bottom: 1px solid #ece7df;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .total-line {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #858077;
          font-size: 10px;
        }

        .total-line strong {
          color: #333;
          font-size: 10px;
        }

        .discount-line,
        .discount-line strong {
          color: #3c8054;
        }

        .grand-total {
          padding: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .grand-total > span {
          font-size: 12px;
          font-weight: 700;
        }

        .grand-total > div {
          display: flex;
          align-items: baseline;
          gap: 4px;
        }

        .grand-total strong {
          font-size: 24px;
          font-weight: 700;
        }

        .submit-button {
          width: 100%;
          min-height: 54px;
          border: 0;
          border-radius: 12px;
          background: #171717;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 11px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .submit-button:hover {
          background: #292929;
          transform: translateY(-1px);
        }

        .submit-button svg {
          width: 20px;
          height: 20px;
        }

        .trust-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-top: 15px;
        }

        .trust-row > div {
          min-width: 0;
          padding: 10px 3px;
          background: #faf8f4;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: #8c867d;
          font-size: 7px;
          text-align: center;
        }

        .trust-icon {
          color: #ad8346;
          font-size: 11px;
        }

        .summary-note {
          margin-top: 18px;
          padding: 12px;
          background: #faf8f4;
          border-radius: 10px;
          display: flex;
          align-items: flex-start;
          gap: 9px;
        }

        .summary-note > span {
          color: #ad8346;
          font-size: 15px;
        }

        .summary-note p {
          margin: 0;
          color: #8d877e;
          font-size: 8px;
          line-height: 1.8;
        }

        .loading-box,
        .empty-cart {
          padding: 55px 10px;
          text-align: center;
          color: #918b82;
        }

        .spinner {
          width: 25px;
          height: 25px;
          border: 2px solid #e6dfd5;
          border-top-color: #a77f45;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin: 0 auto 12px;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .empty-bag {
          width: 55px;
          height: 55px;
          margin: 0 auto 14px;
          border-radius: 50%;
          background: #f5efe6;
          color: #a37c43;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .empty-bag svg {
          width: 25px;
        }

        .empty-cart h3 {
          margin: 0 0 5px;
          color: #252525;
          font-size: 14px;
        }

        .empty-cart p {
          margin: 0 0 16px;
          font-size: 10px;
        }

        .back-store {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          padding: 0 18px;
          border-radius: 9px;
          background: #181818;
          color: #fff;
          text-decoration: none;
          font-size: 10px;
        }

        .checkout-footer {
          padding-top: 35px;
          text-align: center;
          color: #99938a;
          font-size: 9px;
        }

        .footer-brand {
          margin-bottom: 4px;
          color: #393630;
          font-family: Georgia, serif;
          font-size: 16px;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(15, 14, 12, 0.58);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          backdrop-filter: blur(6px);
        }

        .success-modal {
          width: min(420px, 100%);
          background: #fff;
          border-radius: 22px;
          padding: 35px 28px 28px;
          text-align: center;
          box-shadow:
            0 30px 100px rgba(0, 0, 0, 0.2);
          animation: modalIn 0.22s ease;
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .success-mark {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          margin: 0 auto 17px;
          background: #f2f7f2;
          color: #48815b;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-mark svg {
          width: 29px;
          height: 29px;
        }

        .modal-eyebrow {
          color: #a47c43;
          font-size: 8px;
          letter-spacing: 3px;
          direction: ltr;
        }

        .success-modal h2 {
          margin: 7px 0;
          font-family: Georgia, serif;
          font-size: 25px;
          font-weight: 500;
        }

        .success-modal p {
          margin: 0 auto 23px;
          max-width: 310px;
          color: #858077;
          font-size: 11px;
          line-height: 1.9;
        }

        .modal-button {
          width: 100%;
          height: 50px;
          border: 0;
          border-radius: 10px;
          background: #171717;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          cursor: pointer;
        }

        .modal-cancel {
          margin-top: 12px;
          border: 0;
          background: transparent;
          color: #8e887f;
          font-size: 10px;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr;
          }

          .summary-card {
            position: static;
            grid-row: 1;
          }

          .details-card {
            grid-row: 2;
          }
        }

        @media (max-width: 600px) {
          .checkout-header {
            height: 68px;
          }

          .header-inner,
          .container {
            width: calc(100% - 22px);
          }

          .brand-symbol {
            width: 37px;
            height: 37px;
            font-size: 18px;
          }

          .brand-copy strong {
            font-size: 17px;
          }

          .brand-copy span {
            font-size: 6px;
            letter-spacing: 2px;
          }

          .secure-badge {
            font-size: 9px;
          }

          .secure-icon {
            width: 27px;
            height: 27px;
          }

          .secure-icon svg {
            width: 14px;
          }

          .container {
            padding: 30px 0 45px;
          }

          .intro {
            margin-bottom: 24px;
          }

          .intro h1 {
            font-size: 30px;
          }

          .intro p {
            font-size: 10px;
          }

          .checkout-grid {
            gap: 14px;
          }

          .details-card,
          .summary-card {
            border-radius: 15px;
          }

          .details-card {
            padding: 20px 15px;
          }

          .summary-card {
            padding: 19px 15px;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .field.full {
            grid-column: auto;
          }

          .section-title {
            margin-bottom: 17px;
          }

          .section-title h2 {
            font-size: 14px;
          }

          .section-title p {
            font-size: 9px;
          }

          .section-number {
            width: 34px;
            height: 34px;
            font-size: 9px;
          }

          .divider {
            margin: 25px 0;
          }

          .summary-heading h2 {
            font-size: 21px;
          }

          .product-image {
            width: 59px;
            height: 68px;
          }

          .product-details strong {
            font-size: 10px;
          }

          .product-price {
            font-size: 9px;
          }

          .grand-total strong {
            font-size: 22px;
          }

          .submit-button {
            min-height: 52px;
          }
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  required,
  error,
  full,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "field full" : "field"}>
      <label>
        {label}{" "}
        {required && (
          <span className="required">*</span>
        )}
      </label>

      {children}

      {error && (
        <div className="field-error">{error}</div>
      )}
    </div>
  );
}