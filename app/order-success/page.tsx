"use client";

import { useEffect, useState } from "react";

type OrderItem = {
  id?: string | number;
  name?: string;
  quantity?: number;
  price?: number;
  total?: number;
  image?: string;
};

type OrderData = {
  orderId: string;
  createdAt: string;
  customer: {
    name: string;
    phone: string;
    phone2?: string;
    governorate: string;
    city: string;
    address: string;
    building?: string;
    floor?: string;
    apartment?: string;
    notes?: string;
  };
  paymentMethod: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  coupon?: string;
  total: number;
};

function money(value: number) {
  return new Intl.NumberFormat("ar-EG").format(value);
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("rimal-last-order");
      if (saved) setOrder(JSON.parse(saved));
    } catch {
      setOrder(null);
    }
  }, []);

  if (!order) {
    return (
      <main className="success-page">
        <div className="message-card">
          <div className="error-icon">!</div>
          <h1>لم يتم العثور على الطلب</h1>
          <p>عذرًا، لم نتمكن من العثور على تفاصيل الطلب.</p>
          <a href="/" className="btn">العودة للمتجر</a>
        </div>
        <style jsx>{`
          *{box-sizing:border-box}
          .success-page{min-height:100vh;display:grid;place-items:center;padding:20px;direction:rtl;background:#f5faff;font-family:Arial,"Segoe UI",Tahoma,sans-serif;color:#183247}
          .message-card{width:min(480px,100%);background:#fff;border:1px solid #dbeaf4;border-radius:20px;padding:35px 25px;text-align:center;box-shadow:0 14px 45px rgba(43,113,151,.07)}
          .error-icon{width:64px;height:64px;margin:0 auto 18px;border-radius:50%;display:grid;place-items:center;background:#fff4f4;color:#c95b63;font-size:28px;font-weight:700}
          h1{margin:0 0 10px;color:#17364b;font:28px Georgia,serif}
          p{margin:0 0 22px;color:#8197a6;font-size:13px}
          .btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:52px;border-radius:11px;background:#2d91c5;color:#fff;text-decoration:none;font-size:13px;font-weight:700}
        `}</style>
      </main>
    );
  }

  return (
    <main className="success-page">
      <div className="container">
        <header className="success-header">
          <div className="success-icon">✓</div>
          <span className="eyebrow">RIMAL ALTAIF</span>
          <h1>تم تأكيد طلبك بنجاح</h1>
          <p>شكرًا لثقتك في رمال الطائف</p>
          <div className="order-number">
            <span>رقم الطلب</span>
            <strong>{order.orderId}</strong>
          </div>
        </header>

        <section className="card">
          <div className="card-title">
            <div className="number">01</div>
            <div><h2>تفاصيل الطلب</h2><p>المنتجات التي اخترتها</p></div>
          </div>
          <div className="products">
            {order.items.map((item,index)=>(
              <div className="product" key={`${item.id ?? item.name}-${index}`}>
                <div className="product-image">
                  {item.image ? <img src={item.image} alt={item.name || "منتج"} /> : <span>عطر</span>}
                </div>
                <div className="product-info">
                  <strong>{item.name || "منتج"}</strong>
                  <span>الكمية: {item.quantity ?? 1}</span>
                </div>
                <strong className="product-price">{money(item.total ?? 0)} ج.م</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="card-title">
            <div className="number">02</div>
            <div><h2>بيانات التوصيل</h2><p>سيتم توصيل طلبك إلى العنوان التالي</p></div>
          </div>
          <div className="customer-grid">
            <div><span>الاسم</span><strong>{order.customer.name}</strong></div>
            <div><span>رقم الموبايل</span><strong>{order.customer.phone}</strong></div>
            {order.customer.phone2 && <div><span>رقم إضافي</span><strong>{order.customer.phone2}</strong></div>}
            <div><span>المحافظة</span><strong>{order.customer.governorate}</strong></div>
            <div><span>المدينة / المنطقة</span><strong>{order.customer.city}</strong></div>
            <div className="full"><span>العنوان</span><strong>{order.customer.address}</strong></div>
            {order.customer.building && <div><span>رقم العقار</span><strong>{order.customer.building}</strong></div>}
            {order.customer.floor && <div><span>الدور</span><strong>{order.customer.floor}</strong></div>}
            {order.customer.apartment && <div><span>الشقة</span><strong>{order.customer.apartment}</strong></div>}
          </div>
        </section>

        <section className="card">
          <div className="card-title">
            <div className="number">03</div>
            <div><h2>ملخص الحساب</h2><p>تفاصيل تكلفة الطلب</p></div>
          </div>
          <div className="totals">
            <div><span>الإجمالي الفرعي</span><strong>{money(order.subtotal)} ج.م</strong></div>
            <div><span>الشحن</span><strong>{money(order.shipping)} ج.م</strong></div>
            {order.discount > 0 && <div className="discount"><span>الخصم</span><strong>-{money(order.discount)} ج.م</strong></div>}
            <div className="grand-total"><span>الإجمالي النهائي</span><strong>{money(order.total)} <small>ج.م</small></strong></div>
          </div>
          <div className="payment"><span>طريقة الدفع</span><strong>{order.paymentMethod}</strong></div>
        </section>

        <div className="status">
          <div className="status-icon">✓</div>
          <div><strong>تم استلام طلبك</strong><span>طلبك الآن لدى فريق رمال الطائف وسيتم التواصل معك لتأكيده.</span></div>
        </div>

        <a href="/" className="btn">العودة للتسوق</a>
        <p className="footer-note">شكرًا لاختياركم رمال الطائف</p>
      </div>

      <style jsx>{`
        *{box-sizing:border-box}
        .success-page{min-height:100vh;direction:rtl;background:radial-gradient(circle at 15% 0%,#e9f7ff 0,transparent 30%),#f5faff;color:#183247;font-family:Arial,"Segoe UI",Tahoma,sans-serif;padding:30px 16px 60px}
        .container{width:min(850px,100%);margin:auto}
        .success-header{text-align:center;padding:20px 0 30px}
        .success-icon{width:74px;height:74px;margin:0 auto 20px;border-radius:50%;display:grid;place-items:center;background:#e9f7ff;color:#278fc5;font-size:38px;font-weight:700;box-shadow:0 10px 35px rgba(39,143,197,.13)}
        .eyebrow{display:block;color:#318fc4;font-size:9px;letter-spacing:4px;direction:ltr}
        h1{margin:8px 0;color:#17364b;font-family:Georgia,serif;font-size:clamp(28px,5vw,42px)}
        .success-header>p{margin:0;color:#8197a6;font-size:14px}
        .order-number{display:inline-flex;flex-direction:column;gap:5px;margin-top:20px;padding:12px 25px;border-radius:12px;background:#fff;border:1px solid #dcecf5;box-shadow:0 8px 25px rgba(43,113,151,.06)}
        .order-number span{color:#8ba0ae;font-size:11px}.order-number strong{direction:ltr;color:#2187ba;font-size:15px}
        .card{background:#fff;border:1px solid #dbeaf4;border-radius:20px;padding:24px;margin-bottom:18px;box-shadow:0 14px 45px rgba(43,113,151,.07)}
        .card-title{display:flex;align-items:center;gap:12px;margin-bottom:22px}
        .number{width:40px;height:40px;flex:0 0 40px;border-radius:50%;display:grid;place-items:center;background:#e9f6fd;color:#2585b8;font-size:11px;font-weight:700}
        .card-title h2{margin:0;color:#17364b;font-size:20px}.card-title p{margin:3px 0 0;color:#8ba0ae;font-size:11px}
        .products{display:flex;flex-direction:column;gap:12px}
        .product{display:flex;align-items:center;gap:14px;padding:12px;border-radius:14px;background:#f8fcff;border:1px solid #e6f1f7}
        .product-image{width:65px;height:65px;flex:0 0 65px;border-radius:12px;background:#fff;display:grid;place-items:center;overflow:hidden}
        .product-image img{width:100%;height:100%;object-fit:contain}.product-image span{color:#8da5b4;font-size:11px}
        .product-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:5px}.product-info strong{color:#264458;font-size:14px}.product-info span{color:#8ca0ad;font-size:11px}
        .product-price{white-space:nowrap;color:#2187ba;font-size:13px}
        .customer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.customer-grid>div{display:flex;flex-direction:column;gap:6px;padding:14px;border-radius:12px;background:#f8fcff;border:1px solid #e6f1f7}.customer-grid .full{grid-column:1/-1}.customer-grid span{color:#8ba0ae;font-size:10px}.customer-grid strong{color:#29465a;font-size:13px;line-height:1.7}
        .totals{display:flex;flex-direction:column;gap:13px}.totals>div{display:flex;justify-content:space-between;align-items:center}.totals span{color:#718a9a;font-size:13px}.totals strong{color:#29475b;font-size:13px}.totals .discount strong{color:#299566}
        .grand-total{margin-top:10px;padding-top:18px;border-top:1px solid #e2edf3}.grand-total span{color:#17364b;font-weight:700}.grand-total strong{color:#2187ba;font-size:22px}.grand-total small{font-size:12px}
        .payment{display:flex;justify-content:space-between;margin-top:20px;padding:15px;border-radius:12px;background:#eef9ff}.payment span{color:#718a9a;font-size:12px}.payment strong{color:#2187ba;font-size:13px}
        .status{display:flex;align-items:center;gap:14px;padding:18px;margin-bottom:18px;border-radius:16px;background:#eaf8f2;border:1px solid #d6eee3}.status-icon{width:42px;height:42px;flex:0 0 42px;border-radius:50%;display:grid;place-items:center;background:#d9f1e5;color:#299566;font-weight:700}.status div:last-child{display:flex;flex-direction:column;gap:4px}.status strong{color:#247a54;font-size:13px}.status span{color:#6c9380;font-size:11px;line-height:1.7}
        .btn{display:flex;align-items:center;justify-content:center;width:100%;min-height:54px;border-radius:12px;background:#2995ca;color:#fff;text-decoration:none;font-size:14px;font-weight:700;box-shadow:0 10px 25px rgba(41,149,202,.18)}
        .footer-note{text-align:center;margin:18px 0 0;color:#9aadb9;font-size:11px}
        @media(max-width:600px){.success-page{padding:15px 12px 40px}.card{padding:18px;border-radius:16px}.customer-grid{grid-template-columns:1fr}.customer-grid .full{grid-column:auto}.product{align-items:flex-start}.product-price{font-size:12px}.success-header{padding-top:15px}}
      `}</style>
    </main>
  );
}