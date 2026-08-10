/* app/checkout/page.tsx */
"use client";

import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

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
  "القاهرة", "الجيزة", "القليوبية", "الإسكندرية", "البحيرة",
  "مطروح", "الدقهلية", "الغربية", "المنوفية", "كفر الشيخ",
  "دمياط", "بورسعيد", "الإسماعيلية", "السويس", "الشرقية",
  "بني سويف", "الفيوم", "المنيا", "أسيوط", "سوهاج",
  "قنا", "الأقصر", "أسوان", "البحر الأحمر", "الوادي الجديد",
  "شمال سيناء", "جنوب سيناء",
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
  return Number(item.salePrice ?? item.price ?? 0) || 0;
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

function Field({
  label,
  error,
  children,
}: {
  label?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      {label ? <label>{label}</label> : null}
      {children}
      {error ? <small className="error">{error}</small> : null}
    </div>
  );
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [form, setForm] = useState<CustomerForm>(emptyForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CustomerForm, string>>
  >({});
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"vodafone" | "instapay">(
    "vodafone"
  );
  const [couponMessage, setCouponMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    try {
      const keys = ["cart", "cartItems", "shoppingCart", "rimalCart"];
      for (const key of keys) {
        const saved = localStorage.getItem(key);
        if (!saved) continue;

        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCart(parsed);
          break;
        }
      }
    } catch {
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + getPrice(item) * getQuantity(item),
        0
      ),
    [cart]
  );

  const total = Math.max(
    0,
    subtotal + (cart.length ? SHIPPING_COST : 0) - discount
  );

  function updateField(field: keyof CustomerForm, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  function validate() {
    const next: Partial<Record<keyof CustomerForm, string>> = {};

    if (form.name.trim().length < 3) next.name = "اكتب الاسم بالكامل";
    if (!/^01\d{9}$/.test(form.phone.trim()))
      next.phone = "اكتب رقم موبايل مصري صحيح";
    if (!form.governorate) next.governorate = "اختر المحافظة";
    if (form.city.trim().length < 2) next.city = "اكتب المدينة أو المنطقة";
    if (form.address.trim().length < 5)
      next.address = "اكتب العنوان بالتفصيل";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();

    if (code === "RIMAL10") {
      const value = Math.round(subtotal * 0.1);
      setDiscount(value);
      setCouponMessage("تم تطبيق خصم 10% بنجاح");
      return;
    }

    setDiscount(0);
    setCouponMessage(code ? "كود الخصم غير صحيح" : "");
  }

  function buildWhatsAppMessage() {
    let message = "*طلب جديد من رمال الطائف*\n\n";

    message += "*بيانات العميل*\n";
    message += `الاسم: ${form.name}\n`;
    message += `الموبايل: ${form.phone}\n`;

    if (form.phone2.trim()) message += `رقم إضافي: ${form.phone2}\n`;

    message += "\n*عنوان الشحن*\n";
    message += `المحافظة: ${form.governorate}\n`;
    message += `المدينة / المنطقة: ${form.city}\n`;
    message += `العنوان: ${form.address}\n`;

    if (form.building.trim()) message += `رقم العقار: ${form.building}\n`;
    if (form.floor.trim()) message += `الدور: ${form.floor}\n`;
    if (form.apartment.trim()) message += `الشقة: ${form.apartment}\n`;
    if (form.notes.trim()) message += `ملاحظات: ${form.notes}\n`;

    message += "\n*المنتجات*\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${getName(item)}\n`;
      message += `الكمية: ${getQuantity(item)}\n`;
      message += `السعر: ${money(
        getPrice(item) * getQuantity(item)
      )} ج.م\n\n`;
    });

    message += "*ملخص الحساب*\n";
    message += `الإجمالي الفرعي: ${money(subtotal)} ج.م\n`;
    message += `الشحن: ${money(SHIPPING_COST)} ج.م\n`;
    if (discount > 0) message += `الخصم: -${money(discount)} ج.م\n`;
    message += `*الإجمالي النهائي: ${money(total)} ج.م*\n`;
    message += `طريقة الدفع: ${
      paymentMethod === "vodafone" ? "Vodafone Cash" : "InstaPay"
    }`;

    return message;
  }

  function submitOrder() {
    if (!cart.length) {
      alert("السلة فارغة، أضف منتجًا أولًا.");
      return;
    }

    if (!validate()) {
      window.setTimeout(() => {
        document.querySelector(".error")?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 50);
      return;
    }

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(buildWhatsAppMessage());

    setWhatsappUrl(url);
    setShowSuccess(true);
  }

  return (
    <>
      <main className="checkout">
        <header className="topbar">
          <div className="topbar-inner">
            <a href="/" className="logo">
              <span className="logo-mark">R</span>
              <span>
                <strong>رمال الطائف</strong>
                <small>RIMAL ALTAIF</small>
              </span>
            </a>

            <div className="safe">
              <span className="safe-dot">✓</span>
              تجربة شراء آمنة
            </div>
          </div>
        </header>

        <div className="page">
          <div className="heading">
            <span>RIMAL ALTAIF</span>
            <h1>إتمام الطلب</h1>
            <p>أكمل بياناتك وسنجهز طلبك بعناية حتى باب منزلك</p>
          </div>

          <div className="layout">
            <section className="main-card">
              <div className="section">
                <SectionTitle number="01" title="بيانات العميل" text="أدخل بيانات التواصل الخاصة بك" />

                <div className="fields">
                  <Field error={errors.name}>
                    <input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="الاسم بالكامل *"
                      autoComplete="name"
                    />
                  </Field>

                  <Field error={errors.phone}>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        updateField(
                          "phone",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="رقم الموبايل *"
                      maxLength={11}
                      inputMode="numeric"
                      autoComplete="tel"
                    />
                  </Field>

                  <Field>
                    <input
                      value={form.phone2}
                      onChange={(e) =>
                        updateField(
                          "phone2",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="رقم إضافي (اختياري)"
                      maxLength={11}
                      inputMode="numeric"
                    />
                  </Field>
                </div>
              </div>

              <div className="separator" />

              <div className="section">
                <SectionTitle number="02" title="عنوان الشحن" text="سنقوم بالتوصيل حتى باب منزلك" />

                <div className="fields">
                  <Field error={errors.governorate}>
                    <select
                      value={form.governorate}
                      onChange={(e) =>
                        updateField("governorate", e.target.value)
                      }
                    >
                      <option value="">المحافظة *</option>
                      {GOVERNORATES.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field error={errors.city}>
                    <input
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      placeholder="المدينة / المنطقة *"
                    />
                  </Field>

                  <Field error={errors.address}>
                    <textarea
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="العنوان بالتفصيل *"
                      rows={3}
                    />
                  </Field>

                  <Field>
                    <input
                      value={form.building}
                      onChange={(e) => updateField("building", e.target.value)}
                      placeholder="رقم العقار (اختياري)"
                    />
                  </Field>

                  <Field>
                    <input
                      value={form.floor}
                      onChange={(e) => updateField("floor", e.target.value)}
                      placeholder="الدور (اختياري)"
                    />
                  </Field>

                  <Field>
                    <input
                      value={form.apartment}
                      onChange={(e) =>
                        updateField("apartment", e.target.value)
                      }
                      placeholder="الشقة (اختياري)"
                    />
                  </Field>

                  <Field>
                    <textarea
                      value={form.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      placeholder="ملاحظات الطلب (اختياري)"
                      rows={3}
                    />
                  </Field>
                </div>
              </div>

              <div className="separator" />

              <div className="section">
                <SectionTitle number="03" title="طريقة الدفع" text="اختر الطريقة المناسبة لك" />

                <div className="payment-options">
                  <button
                    type="button"
                    className={`payment-option ${
                      paymentMethod === "vodafone" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("vodafone")}
                    aria-pressed={paymentMethod === "vodafone"}
                  >
                    <span className="payment-radio">
                      {paymentMethod === "vodafone" ? <span /> : null}
                    </span>
                    <span className="payment-logo vodafone-logo">
                      <img
                        src="https://www.onmeeting.co/_next/image?q=75&url=%2Fimages%2FVCash.png&w=750"
                        alt="Vodafone Cash"
                      />
                    </span>
                    <span className="payment-copy">
                      <strong>Vodafone Cash</strong>
                      <span>الدفع عن طريق محفظة فودافون كاش</span>
                    </span>
                    {paymentMethod === "vodafone" ? (
                      <b>مُختارة</b>
                    ) : null}
                  </button>

                  <button
                    type="button"
                    className={`payment-option ${
                      paymentMethod === "instapay" ? "active" : ""
                    }`}
                    onClick={() => setPaymentMethod("instapay")}
                    aria-pressed={paymentMethod === "instapay"}
                  >
                    <span className="payment-radio">
                      {paymentMethod === "instapay" ? <span /> : null}
                    </span>
                    <span className="payment-logo instapay-logo">
                      <img
                        src="https://www.thaqfny.com/wp-content/uploads/2022/03/InstaPay-1.jpg"
                        alt="InstaPay"
                      />
                    </span>
                    <span className="payment-copy">
                      <strong>InstaPay</strong>
                      <span>الدفع عن طريق إنستا باي</span>
                    </span>
                    {paymentMethod === "instapay" ? (
                      <b>مُختارة</b>
                    ) : null}
                  </button>
                </div>
              </div>
            </section>

            <aside className="summary">
              <div className="summary-head">
                <div>
                  <span>YOUR ORDER</span>
                  <h2>ملخص الطلب</h2>
                </div>
                <div className="summary-count">
                  {cart.reduce((n, item) => n + getQuantity(item), 0)}
                </div>
              </div>

              {loading ? (
                <div className="loading">جاري تحميل الطلب...</div>
              ) : cart.length ? (
                <>
                  <div className="products">
                    {cart.map((item, index) => (
                      <div
                        className="product"
                        key={item.id ?? `${getName(item)}-${index}`}
                      >
                        <div className="product-img">
                          {item.image ? (
                            <img src={item.image} alt={getName(item)} />
                          ) : (
                            <span>عطر</span>
                          )}
                        </div>

                        <div className="product-info">
                          <strong>{getName(item)}</strong>
                          <span>الكمية: {getQuantity(item)}</span>
                        </div>

                        <b>{money(getPrice(item) * getQuantity(item))} ج.م</b>
                      </div>
                    ))}
                  </div>

                  <div className="coupon">
                    <input
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="هل لديك كود خصم؟"
                    />
                    <button type="button" onClick={applyCoupon}>
                      تطبيق
                    </button>
                  </div>

                  {couponMessage ? (
                    <div className="coupon-message">{couponMessage}</div>
                  ) : null}

                  <div className="totals">
                    <div>
                      <span>الإجمالي الفرعي</span>
                      <b>{money(subtotal)} ج.م</b>
                    </div>
                    <div>
                      <span>الشحن</span>
                      <b>{money(SHIPPING_COST)} ج.م</b>
                    </div>
                    {discount > 0 ? (
                      <div className="discount">
                        <span>الخصم</span>
                        <b>-{money(discount)} ج.م</b>
                      </div>
                    ) : null}
                  </div>

                  <div className="final-total">
                    <span>الإجمالي النهائي</span>
                    <strong>
                      {money(total)} <small>ج.م</small>
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="confirm"
                    onClick={submitOrder}
                  >
                    تأكيد الطلب عبر واتساب
                  </button>

                  <div className="summary-security">
                    <span className="security-lock">🔒</span>
                    <span>لن يتم مشاركة بياناتك مع أي جهة أخرى</span>
                  </div>

                  <div className="service-box">
                    <div className="service-mark">◇</div>
                    <div>
                      <strong>لمسة فخامة لحياتك</strong>
                      <span>اخترنا لك الأفضل من أجود العطور</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="empty">
                  <strong>السلة فارغة</strong>
                  <span>أضف المنتجات إلى السلة أولًا</span>
                  <a href="/">العودة للمتجر</a>
                </div>
              )}
            </aside>
          </div>
        </div>
      </main>

      {showSuccess ? (
        <div className="modal" onClick={() => setShowSuccess(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="success">✓</div>
            <h2>طلبك جاهز للتأكيد</h2>
            <p>اضغط على الزر التالي لإرسال تفاصيل طلبك عبر واتساب.</p>
            <button
              type="button"
              className="confirm"
              onClick={() => {
                window.open(whatsappUrl, "_blank", "noopener,noreferrer");
                setShowSuccess(false);
              }}
            >
              الانتقال إلى واتساب
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => setShowSuccess(false)}
            >
              إلغاء
            </button>
          </div>
        </div>
      ) : null}

      <style jsx global>{`
        :global(*) {
          box-sizing: border-box;
        }

        :global(html) {
          scroll-behavior: smooth;
        }

        :global(body) {
          margin: 0;
          background: #f3f9fd;
          color: #183247;
          font-family: Arial, "Segoe UI", Tahoma, sans-serif;
        }

        :global(button),
        :global(input),
        :global(select),
        :global(textarea) {
          font: inherit;
        }

        .checkout {
          min-height: 100vh;
          direction: rtl;
          background:
            radial-gradient(circle at 15% 5%, #e8f6ff 0, transparent 28%),
            #f5faff;
        }

        .topbar {
          height: 82px;
          background: #fff;
          border-bottom: 1px solid #dcecf7;
        }

        .topbar-inner {
          width: min(1180px, calc(100% - 40px));
          height: 100%;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 11px;
          color: #17354a;
          text-decoration: none;
        }

        .logo-mark {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1px solid #76bce4;
          color: #2685bb;
          display: grid;
          place-items: center;
          font: 22px Georgia, serif;
        }

        .logo strong,
        .logo small {
          display: block;
        }

        .logo strong {
          font: 22px Georgia, serif;
        }

        .logo small {
          margin-top: 5px;
          color: #6faed0;
          font-size: 8px;
          letter-spacing: 3px;
          direction: ltr;
        }

        .safe {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6e899b;
          font-size: 12px;
        }

        .safe-dot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #eaf6fd;
          color: #2b8bc2;
          display: grid;
          place-items: center;
          font-weight: 700;
        }

        .page {
          width: min(1180px, calc(100% - 40px));
          margin: auto;
          padding: 42px 0 65px;
        }

        .heading {
          text-align: center;
          margin-bottom: 32px;
        }

        .heading > span {
          color: #318fc4;
          font-size: 9px;
          letter-spacing: 4px;
          direction: ltr;
        }

        .heading h1 {
          margin: 7px 0 0;
          color: #17364b;
          font: 38px Georgia, serif;
        }

        .heading p {
          margin: 8px 0 0;
          color: #7991a1;
          font-size: 13px;
        }

        .layout {
          display: grid;
          grid-template-columns: minmax(0, 1.38fr) minmax(340px, 0.72fr);
          gap: 24px;
          align-items: start;
        }

        .main-card,
        .summary {
          background: #fff;
          border: 1px solid #dbeaf4;
          border-radius: 20px;
          box-shadow: 0 14px 45px rgba(43, 113, 151, 0.07);
        }

        .main-card {
          padding: 31px;
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 21px;
        }

        .number {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          flex: 0 0 40px;
          background: #e9f6fd;
          color: #2585b8;
          display: grid;
          place-items: center;
          font-size: 11px;
          font-weight: 700;
        }

        .checkout .section-title h2 {
          margin: 0;
          font-size: 22px !important;
          line-height: 1.25 !important;
          font-weight: 700;
          color: #17364b;
        }

        .section-title p {
          margin: 3px 0 0;
          color: #8ba0ae;
          font-size: 10px;
        }

        .checkout .fields {
          display: flex !important;
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 14px !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
        }

        .checkout .field {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          flex: 0 0 100% !important;
        }

        .field label {
          display: block;
          margin-bottom: 7px;
          color: #587184;
          font-size: 11px;
        }

        .checkout .field input,
        .checkout .field select,
        .checkout .field textarea {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          height: 52px;
          border: 1px solid #cfe0ea !important;
          border-radius: 10px !important;
          background: #fff !important;
          color: #234052 !important;
          outline: none !important;
          padding: 0 15px !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
          direction: rtl !important;
          box-sizing: border-box !important;
          appearance: none;
          transition: 0.2s ease;
        }

        .checkout .field textarea {
          height: 94px !important;
          min-height: 94px !important;
          padding-top: 14px !important;
          resize: vertical;
          line-height: 1.8 !important;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: #9aabb7;
          opacity: 1;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #65b5e2;
          box-shadow: 0 0 0 3px rgba(80, 174, 224, 0.12);
        }

        .error {
          display: block;
          margin-top: 5px;
          color: #d15c62;
          font-size: 9px;
        }

        .separator {
          height: 1px;
          margin: 30px 0;
          background: #e6f0f5;
        }

        .payment-options {
          display: flex;
          flex-direction: column;
          gap: 11px;
          width: 100%;
        }

        .payment-option {
          width: 100%;
          min-height: 78px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 15px;
          border: 1px solid #cfe0ea;
          border-radius: 12px;
          background: #fff;
          color: #234052;
          text-align: right;
          cursor: pointer;
          transition: 0.2s ease;
        }

        .payment-option:hover {
          border-color: #8fc9e6;
          background: #f8fcff;
        }

        .payment-option.active {
          border-color: #68b7df;
          background: #f2faff;
          box-shadow: 0 0 0 2px rgba(75, 169, 215, 0.08);
        }

        .payment-radio {
          width: 20px;
          height: 20px;
          border: 2px solid #a9c5d5;
          border-radius: 50%;
          display: grid;
          place-items: center;
          flex: 0 0 20px;
        }

        .payment-option.active .payment-radio {
          border-color: #3698c8;
        }

        .payment-radio > span {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #3698c8;
        }

        .payment-logo {
          width: 52px;
          height: 52px;
          border-radius: 11px;
          display: grid;
          place-items: center;
          flex: 0 0 52px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #e2edf3;
        }

        .payment-logo img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
        }

        .vodafone-logo {
          background: #fff5f6;
        }

        .instapay-logo {
          background: #fff;
        }

        .payment-copy {
          flex: 1;
          min-width: 0;
        }

        .payment-copy strong,
        .payment-copy span {
          display: block;
        }

        .payment-copy strong {
          font-size: 13px;
        }

        .payment-copy span {
          margin-top: 4px;
          color: #8097a6;
          font-size: 10px;
        }

        .payment-option > b {
          color: #2588bb;
          background: #e4f5fd;
          border-radius: 20px;
          padding: 6px 9px;
          font-size: 9px;
          white-space: nowrap;
        }

        .summary {
          padding: 26px;
          position: sticky;
          top: 18px;
          border-color: #cfe6f3;
          background: #ffffff;
        }

        .summary-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 19px;
          border-bottom: 1px solid #e3eef4;
        }

        .summary-head > div:first-child > span {
          color: #4b9bc6;
          font-size: 7px;
          letter-spacing: 3px;
          direction: ltr;
        }

        .summary-head h2 {
          margin: 4px 0 0;
          font: 23px Georgia, serif;
        }

        .summary-count {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #eaf6fd;
          color: #2485b8;
          display: grid;
          place-items: center;
          font-weight: 700;
          font-size: 11px;
        }

        .products {
          padding: 18px 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          border-bottom: 1px solid #e3eef4;
        }

        .product {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .product-img {
          width: 58px;
          height: 66px;
          border-radius: 9px;
          border: 1px solid #dbeaf3;
          background: #f2f9fd;
          display: grid;
          place-items: center;
          overflow: hidden;
          flex-shrink: 0;
          position: relative;
        }

        .product-img img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .product-img span {
          color: #76a9c3;
          font-size: 9px;
        }

        .product-info {
          flex: 1;
          min-width: 0;
        }

        .product-info strong,
        .product-info span {
          display: block;
        }

        .product-info strong {
          font-size: 11px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-info span {
          margin-top: 3px;
          color: #91a2ad;
          font-size: 9px;
        }

        .product > b {
          white-space: nowrap;
          font-size: 10px;
        }

        .coupon {
          display: flex;
          gap: 7px;
          padding: 17px 0 7px;
        }

        .coupon input {
          flex: 1;
          min-width: 0;
          height: 43px;
          border: 1px solid #cfe0ea;
          border-radius: 9px;
          outline: none;
          padding: 0 12px;
          font-size: 10px;
        }

        .coupon button {
          border: 0;
          border-radius: 9px;
          padding: 0 15px;
          background: #e4f4fc;
          color: #237eaf;
          font-size: 10px;
          cursor: pointer;
        }

        .coupon-message {
          color: #31855f;
          font-size: 9px;
          padding-bottom: 8px;
        }

        .totals {
          padding: 14px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
          border-bottom: 1px solid #e3eef4;
        }

        .totals > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #7c929f;
          font-size: 10px;
        }

        .totals b {
          color: #314a5a;
        }

        .totals .discount,
        .totals .discount b {
          color: #31855f;
        }

        .final-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
        }

        .final-total > span {
          font-size: 12px;
          font-weight: 700;
        }

        .final-total strong {
          color: #1976a8;
          font-size: 23px;
        }

        .final-total small {
          color: #7893a2;
          font-size: 8px;
        }

        .confirm {
          width: 100%;
          min-height: 53px;
          border: 0;
          border-radius: 11px;
          background: #2d91c5;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(45, 145, 197, 0.18);
          transition: 0.2s ease;
        }

        .confirm:hover {
          background: #237fac;
          transform: translateY(-1px);
        }

        .summary-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 13px 0 8px;
          color: #8aa0ae;
          font-size: 9px;
          text-align: center;
        }

        .security-lock {
          font-size: 11px;
        }

        .service-box {
          margin-top: 10px;
          min-height: 82px;
          padding: 15px 17px;
          display: flex;
          align-items: center;
          gap: 13px;
          border: 1px solid #cfe9f6;
          border-radius: 13px;
          background: linear-gradient(135deg, #f3fbff, #e8f6fd);
        }

        .service-mark {
          width: 42px;
          height: 42px;
          flex: 0 0 42px;
          display: grid;
          place-items: center;
          border: 1px solid #72b8dc;
          border-radius: 10px;
          color: #2788b9;
          font: 27px Georgia, serif;
        }

        .service-box strong,
        .service-box span {
          display: block;
        }

        .service-box strong {
          color: #1e6f99;
          font-size: 11px;
        }

        .service-box span {
          margin-top: 5px;
          color: #7895a5;
          font-size: 9px;
        }

        .loading,
        .empty {
          padding: 45px 10px;
          text-align: center;
          color: #8298a6;
          font-size: 11px;
        }

        .empty strong,
        .empty span {
          display: block;
        }

        .empty strong {
          color: #28495d;
          font-size: 14px;
        }

        .empty span {
          margin: 7px 0 15px;
        }

        .empty a {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          padding: 0 18px;
          border-radius: 9px;
          background: #e4f4fc;
          color: #237eaf;
          text-decoration: none;
        }

        .modal {
          position: fixed;
          inset: 0;
          z-index: 100;
          padding: 20px;
          display: grid;
          place-items: center;
          background: rgba(24, 58, 78, 0.38);
          backdrop-filter: blur(5px);
        }

        .modal-card {
          width: min(420px, 100%);
          padding: 32px 27px 26px;
          border-radius: 20px;
          background: #fff;
          text-align: center;
          box-shadow: 0 25px 80px rgba(26, 76, 105, 0.2);
        }

        .success {
          width: 62px;
          height: 62px;
          margin: 0 auto 15px;
          border-radius: 50%;
          background: #eaf7fd;
          color: #278ac0;
          display: grid;
          place-items: center;
          font-size: 28px;
          font-weight: 700;
        }

        .modal-card h2 {
          margin: 0 0 8px;
          font: 25px Georgia, serif;
        }

        .modal-card p {
          margin: 0 0 22px;
          color: #7d929f;
          font-size: 11px;
          line-height: 1.8;
        }

        .cancel {
          margin-top: 10px;
          border: 0;
          background: transparent;
          color: #7c929f;
          font-size: 10px;
          cursor: pointer;
        }

        /* FINAL FORM WIDTH OVERRIDE */
        .checkout .main-card .section,
        .checkout .main-card .fields,
        .checkout .main-card .field {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
        }

        .checkout .main-card .field input,
        .checkout .main-card .field select,
        .checkout .main-card .field textarea {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        @media (max-width: 900px) {
          .layout {
            grid-template-columns: 1fr;
          }

          .summary {
            position: static;
            grid-row: 1;
          }

          .main-card {
            grid-row: 2;
          }
        }

        @media (max-width: 600px) {
          .topbar {
            height: 68px;
          }

          .topbar-inner,
          .page {
            width: calc(100% - 22px);
          }

          .logo strong {
            font-size: 17px;
          }

          .logo small {
            font-size: 6px;
          }

          .safe {
            font-size: 9px;
          }

          .safe-dot {
            width: 27px;
            height: 27px;
          }

          .page {
            padding: 28px 0 45px;
          }

          .heading {
            margin-bottom: 22px;
          }

          .heading h1 {
            font-size: 30px;
          }

          .heading p {
            font-size: 10px;
          }

          .main-card,
          .summary {
            border-radius: 15px;
          }

          .main-card {
            padding: 20px 15px;
          }

          .summary {
            padding: 19px 15px;
          }

          .checkout .field input,
          .checkout .field select,
          .checkout .field textarea,
          .checkout .coupon input {
            font-size: 16px !important;
          }

          .checkout .field input,
          .checkout .field select {
            height: 50px;
          }

          .checkout .field textarea {
            min-height: 88px;
          }

          .section-title h2 {
            font-size: 14px;
          }

          .section-title p {
            font-size: 9px;
          }

          .number {
            width: 34px;
            height: 34px;
            flex-basis: 34px;
          }
        }
      `}</style>
    </>
  );
}

function SectionTitle({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="section-title">
      <div className="number">{number}</div>
      <div>
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}