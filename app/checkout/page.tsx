import OrderSummary from "./components/OrderSummary";
import CustomerForm from "./components/CustomerForm";
import AddressForm from "./components/AddressForm";
import ShippingMethod from "./components/ShippingMethod";
import PaymentMethods from "./components/PaymentMethods";
import CheckoutButton from "./components/CheckoutButton";
import PageTitle from "./components/PageTitle";

export default function CheckoutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#f8f8f8]">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[58%_42%]">

        {/* ملخص الطلب */}
        <OrderSummary />

        {/* بيانات العميل */}
        <section className="order-2 bg-white px-5 py-8 lg:order-1 lg:px-16 lg:py-12">

          <div className="mx-auto max-w-[700px]">

            <PageTitle
              title="رمال الطائف"
              subtitle="إتمام الطلب"
            />

            <CustomerForm />

            <AddressForm />

            <ShippingMethod />

            <PaymentMethods />

            <CheckoutButton />

          </div>

        </section>

      </div>
    </main>
  );
}