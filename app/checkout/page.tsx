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
          // تجاهل أي بيانات غير صالحة
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
      setCouponSuccess(false);
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
    let message = "*طلب جديد من رمال الطائف*";

    message += "\n━━━━━━━━━━━━━━━━";
    message += "\n\n";

    message += "*بيانات العميل*";
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
    message += "*عنوان الشحن*";
    message += "\n";

    message += `المحافظة: ${form.governorate}`;
    message += "\n";

    message += `المدينة / المنطقة: ${form.city}`;
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
    message += "*المنتجات*";
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

    message += "*ملخص الحساب*";
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
        const firstError =
          document.querySelector(".field-error");

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

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );

    setShowSuccess(false);
  }

  return (
    <>
      <main className="checkout-page">

        {/* HEADER */}

        <header className="checkout-header">
          <div className="header-inner">

            <a className="brand" href="/">
              <div className="brand-symbol">
                ر
              </div>

              <div className="brand-copy">
                <strong>رمال الطائف</strong>
                <span>RIMAL ALTAIF</span>
              </div>
            </a>

            <div className="secure-badge">
              <span className="secure-dot">
                🔒
              </span>

              <span>
                تجربة شراء آمنة
              </span>
            </div>

          </div>
        </header>


        {/* MAIN */}

        <div className="container">

          <section className="intro">

            <span className="eyebrow">
              RIMAL ALTAIF
            </span>

            <h1>
              إتمام الطلب
            </h1>

            <p>
              أكمل بياناتك وسنجهز طلبك بعناية حتى باب منزلك
            </p>

          </section>


          <div className="checkout-grid">

            {/* CUSTOMER / SHIPPING */}

            <section className="details-card">

              {/* CUSTOMER */}

              <div className="form-section">

                <div className="section-title">

                  <div className="section-number">
                    01
                  </div>

                  <div>
                    <h2>
                      بيانات العميل
                    </h2>

                    <p>
                      أدخل بيانات التواصل الخاصة بك
                    </p>
                  </div>

                </div>


                <div className="form-grid">

                  <Field error={errors.name} full>
                    <input
                      value={form.name}
                      onChange={(event) =>
                        updateField(
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="الاسم بالكامل *"
                      autoComplete="name"
                    />
                  </Field>


                  <Field error={errors.phone}>
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
                      placeholder="رقم الموبايل *"
                      maxLength={11}
                      inputMode="numeric"
                      autoComplete="tel"
                    />
                  </Field>


                  <Field>
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
                      placeholder="رقم إضافي (اختياري)"
                      maxLength={11}
                      inputMode="numeric"
                    />
                  </Field>

                </div>

              </div>


              <div className="divider" />


              {/* SHIPPING */}

              <div className="form-section">

                <div className="section-title">

                  <div className="section-number">
                    02
                  </div>

                  <div>
                    <h2>
                      عنوان الشحن
                    </h2>

                    <p>
                      سنقوم بالتوصيل حتى باب منزلك
                    </p>
                  </div>

                </div>


                <div className="shipping-grid">

                  <Field error={errors.governorate}>

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
                        المحافظة *
                      </option>

                      {GOVERNORATES.map(
                        (governorate) => (
                          <option
                            key={governorate}
                            value={governorate}
                          >
                            {governorate}
                          </option>
                        )
                      )}

                    </select>

                  </Field>


                  <Field error={errors.city}>

                    <input
                      value={form.city}
                      onChange={(event) =>
                        updateField(
                          "city",
                          event.target.value
                        )
                      }
                      placeholder="المدينة / المنطقة *"
                    />

                  </Field>


                  <Field error={errors.address}>

                    <textarea
                      value={form.address}
                      onChange={(event) =>
                        updateField(
                          "address",
                          event.target.value
                        )
                      }
                      placeholder="العنوان بالتفصيل *"
                      rows={3}
                    />

                  </Field>


                  <Field>

                    <input
                      value={form.building}
                      onChange={(event) =>
                        updateField(
                          "building",
                          event.target.value
                        )
                      }
                      placeholder="رقم العقار (اختياري)"
                    />

                  </Field>


                  <Field>

                    <input
                      value={form.floor}
                      onChange={(event) =>
                        updateField(
                          "floor",
                          event.target.value
                        )
                      }
                      placeholder="الدور (اختياري)"
                    />

                  </Field>


                  <Field>

                    <input
                      value={form.apartment}
                      onChange={(event) =>
                        updateField(
                          "apartment",
                          event.target.value
                        )
                      }
                      placeholder="الشقة (اختياري)"
                    />

                  </Field>


                  <Field>

                    <textarea
                      value={form.notes}
                      onChange={(event) =>
                        updateField(
                          "notes",
                          event.target.value
                        )
                      }
                      placeholder="ملاحظات الطلب (اختياري)"
                      rows={3}
                    />

                  </Field>

                </div>

              </div>


              <div className="divider" />


              {/* PAYMENT */}

              <div className="form-section">

                <div className="section-title">

                  <div className="section-number">
                    03
                  </div>

                  <div>
                    <h2>
                      طريقة الدفع
                    </h2>

                    <p>
                      اختر الطريقة المناسبة لك
                    </p>
                  </div>

                </div>


                <div className="payment-option active">

                  <div className="radio checked">
                    <span />
                  </div>

                  <div className="payment-symbol">
                    $
                  </div>

                  <div className="payment-content">

                    <strong>
                      الدفع عند الاستلام
                    </strong>

                    <span>
                      ادفع قيمة طلبك عند استلام الشحنة
                    </span>

                  </div>

                  <div className="payment-selected">
                    مختارة
                  </div>

                </div>

              </div>


              {/* TRUST */}

              <div className="trust-bottom">

                <div>
                  <span>✓</span>

                  <strong>
                    منتجات أصلية
                  </strong>

                  <small>
                    أصلية 100%
                  </small>
                </div>


                <div>
                  <span>◆</span>

                  <strong>
                    شحن سريع
                  </strong>

                  <small>
                    لجميع المحافظات
                  </small>
                </div>


                <div>
                  <span>◈</span>

                  <strong>
                    دفع آمن
                  </strong>

                  <small>
                    بياناتك محمية
                  </small>
                </div>

              </div>

            </section>


            {/* ORDER SUMMARY */}

            <aside className="summary-card">

              <div className="summary-heading">

                <div>

                  <span>
                    YOUR ORDER
                  </span>

                  <h2>
                    ملخص الطلب
                  </h2>

                </div>

                <div className="bag-icon">
                  🛍
                </div>

              </div>


              {isLoading ? (

                <div className="loading-box">

                  <div className="spinner" />

                  <span>
                    جاري تحميل الطلب...
                  </span>

                </div>

              ) : cart.length ? (

                <>

                  {/* PRODUCTS */}

                  <div className="products-list">

                    {cart.map((item, index) => {

                      const price =
                        getPrice(item);

                      const quantity =
                        getQuantity(item);

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

                            <small>
                              ج.م
                            </small>

                          </strong>

                        </div>
                      );
                    })}

                  </div>


                  {/* COUPON */}

                  <div className="coupon-box">

                    <input
                      value={coupon}
                      onChange={(event) =>
                        setCoupon(
                          event.target.value
                        )
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


                  {/* TOTALS */}

                  <div className="totals">

                    <div className="total-line">

                      <span>
                        الإجمالي الفرعي
                      </span>

                      <strong>
                        {money(subtotal)}{" "}
                        <small>
                          ج.م
                        </small>
                      </strong>

                    </div>


                    <div className="total-line">

                      <span>
                        الشحن
                      </span>

                      <strong>
                        {money(SHIPPING_COST)}{" "}
                        <small>
                          ج.م
                        </small>
                      </strong>

                    </div>


                    {discount > 0 && (
                      <div className="total-line discount-line">

                        <span>
                          الخصم
                        </span>

                        <strong>
                          -{money(discount)}{" "}
                          <small>
                            ج.م
                          </small>
                        </strong>

                      </div>
                    )}

                  </div>


                  {/* TOTAL */}

                  <div className="grand-total">

                    <span>
                      الإجمالي النهائي
                    </span>

                    <div>

                      <strong>
                        {money(total)}
                      </strong>

                      <small>
                        ج.م
                      </small>

                    </div>

                  </div>


                  {/* WHATSAPP */}

                  <button
                    type="button"
                    className="submit-button"
                    onClick={submitOrder}
                  >

                    <span>
                      تأكيد الطلب عبر واتساب
                    </span>

                    <span className="whatsapp-text">
                      WhatsApp
                    </span>

                  </button>


                  <div className="privacy-note">

                    <span>
                      🔒
                    </span>

                    <span>
                      لن يتم مشاركة بياناتك مع أي جهة أخرى
                    </span>

                  </div>


                  {/* PREMIUM BANNER */}

                  <div className="premium-banner">

                    <div>

                      <span>
                        لمسة فخامة لحياتك
                      </span>

                      <strong>
                        اخترنا لك الأفضل من أجود العطور
                      </strong>

                    </div>

                    <div className="diamond">
                      ◇
                    </div>

                  </div>

                </>

              ) : (

                <div className="empty-cart">

                  <div className="empty-bag">
                    🛍
                  </div>

                  <h3>
                    السلة فارغة
                  </h3>

                  <p>
                    أضف المنتجات إلى السلة أولًا
                    لإتمام طلبك.
                  </p>

                  <a
                    href="/"
                    className="back-store"
                  >
                    العودة للمتجر
                  </a>

                </div>

              )}

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


      {/* SUCCESS MODAL */}

      {showSuccess && (

        <div
          className="modal-backdrop"
          onClick={() =>
            setShowSuccess(false)
          }
        >

          <div
            className="success-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="success-mark">
              ✓
            </div>

            <span className="modal-eyebrow">
              ORDER READY
            </span>

            <h2>
              طلبك جاهز للتأكيد
            </h2>

            <p>
              اضغط على الزر التالي للانتقال إلى
              واتساب وإرسال تفاصيل طلبك.
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
              onClick={() =>
                setShowSuccess(false)
              }
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
          background: #f8f8f8;
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
          background: #f8f8f8;
        }

        /* HEADER */

        .checkout-header {
          height: 82px;
          background: #ffffff;
          border-bottom: 1px solid #e8e8e8;
          display: flex;
          align-items: center;
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
          gap: 8px;
          color: #777;
          font-size: 12px;
        }

        .secure-dot {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #f3f3f3;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
        }

        /* MAIN */

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
        }

        .intro p {
          margin: 9px 0 0;
          color: #818181;
          font-size: 13px;
        }

        /* GRID */

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
          background: #ffffff;
          border: 1px solid #e6e6e6;
          border-radius: 20px;
          box-shadow:
            0 16px 50px rgba(0, 0, 0, 0.045);
        }

        .details-card {
          padding: 31px;
        }

        .summary-card {
          padding: 27px;
          position: sticky;
          top: 20px;
        }

        /* SECTIONS */

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
          background: #f2f2f2;
          color: #8f6b37;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .section-title h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 700;
        }

        .section-title p {
          margin: 3px 0 0;
          color: #999;
          font-size: 10px;
        }

        /* INPUTS */

        .form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
}

        .shipping-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .field {
          min-width: 0;
        }

        .field.full {
          grid-column: 1 / -1;
        }

        .field input,
        .field select,
        .field textarea {
          width: 100%;
          border: 1px solid #dddddd;
          border-radius: 11px;
          outline: none;
          background: #ffffff;
          color: #222;
          padding: 13px 15px;
          font-size: 12px;
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .field input,
        .field select {
          height: 50px;
        }

        .field textarea {
          min-height: 88px;
          resize: vertical;
          line-height: 1.8;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: #999;
        }

        .field select {
          color: #777;
          cursor: pointer;
          appearance: auto;
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #b18a50;
          box-shadow:
            0 0 0 3px rgba(177, 138, 80, 0.08);
        }

        .field-error {
          margin-top: 5px;
          color: #b14a43;
          font-size: 9px;
          padding-right: 5px;
        }

        .divider {
          height: 1px;
          background: #eeeeee;
          margin: 30px 0;
        }

        /* PAYMENT */

        .payment-option {
          border: 1px solid #dedede;
          border-radius: 14px;
          padding: 15px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .payment-option.active {
          border-color: #c4a16c;
          background: #fffdfa;
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

        .payment-symbol {
          width: 39px;
          height: 39px;
          border-radius: 10px;
          background: #f5f5f5;
          color: #9d7844;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
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

        /* TRUST */

        .trust-bottom {
          border-top: 1px solid #eeeeee;
          padding-top: 22px;
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 10px;
        }

        .trust-bottom > div {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 3px;
        }

        .trust-bottom span {
          color: #a98045;
          font-size: 16px;
        }

        .trust-bottom strong {
          font-size: 9px;
        }

        .trust-bottom small {
          color: #999;
          font-size: 8px;
        }

        /* SUMMARY */

        .summary-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 21px;
          border-bottom: 1px solid #ececec;
        }

        .summary-heading > div:first-child span {
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
          border: 1px solid #e5e5e5;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
        }

        .products-list {
          padding: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
          border-bottom: 1px solid #ececec;
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
          background: #f5f5f5;
          border: 1px solid #e6e6e6;
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
          color: #999;
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
          color: #888;
          font-size: 8px;
          font-weight: 500;
        }

        /* COUPON */

        .coupon-box {
          display: flex;
          gap: 7px;
          padding: 18px 0 8px;
        }

        .coupon-box input {
          flex: 1;
          height: 43px;
          min-width: 0;
          border: 1px solid #dedede;
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
          background: #171717;
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

        /* TOTALS */

        .totals {
          padding: 15px 0;
          border-bottom: 1px solid #ececec;
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

        /* BUTTON */

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
          gap: 12px;
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

        .whatsapp-text {
          color: #d5d5d5;
          font-size: 9px;
          font-weight: 400;
          direction: ltr;
        }

        .privacy-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #999;
          font-size: 8px;
          padding: 12px 0 17px;
        }

        .premium-banner {
          min-height: 88px;
          border-radius: 12px;
          background: #181818;
          color: #fff;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .premium-banner div:first-child {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .premium-banner span {
          color: #c39a59;
          font-size: 9px;
          font-weight: 700;
        }

        .premium-banner strong {
          color: #ddd;
          font-size: 8px;
          font-weight: 400;
        }

        .diamond {
          color: #c49a56;
          font-size: 35px;
          line-height: 1;
        }

        /* EMPTY */

        .loading-box,
        .empty-cart {
          padding: 55px 10px;
          text-align: center;
          color: #919191;
        }

        .spinner {
          width: 25px;
          height: 25px;
          border: 2px solid #e4e4e4;
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
          background: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
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

        /* FOOTER */

        .checkout-footer {
          padding-top: 35px;
          text-align: center;
          color: #999;
          font-size: 9px;
        }

        .footer-brand {
          margin-bottom: 4px;
          color: #393630;
          font-family: Georgia, serif;
          font-size: 16px;
        }

        /* MODAL */

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
          font-size: 28px;
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

        /* TABLET */

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

        /* MOBILE */

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

          .secure-dot {
            width: 27px;
            height: 27px;
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

          .shipping-grid {
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

          .trust-bottom {
            gap: 5px;
          }

        }

      `}</style>
    </>
  );
}


function Field({
  error,
  full,
  children,
}: {
  error?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={full ? "field full" : "field"}>
      {children}

      {error && (
        <div className="field-error">
          {error}
        </div>
      )}
    </div>
  );
}