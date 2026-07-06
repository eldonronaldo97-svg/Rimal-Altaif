import OrderSummary from "./components/OrderSummary";
import CustomerForm from "./components/CustomerForm";
import AddressForm from "./components/AddressForm";
import ShippingMethod from "./components/ShippingMethod";
import PaymentMethods from "./components/PaymentMethods";
import CheckoutButton from "./components/CheckoutButton";
import PageTitle from "./components/PageTitle";

export default function CheckoutPage() {
  return (
    <main dir="rtl" className="min-h-screen bg-[#F5F5F5]">

      <div className="mx-auto max-w-[1440px]">

        <div className="grid lg:grid-cols-[1fr_420px]">

          {/* الفورم */}

          <section className="order-2 bg-white lg:order-1">

            <div className="mx-auto max-w-[760px] px-6 py-10 lg:px-12">

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

          {/* ملخص الطلب */}

          <aside className="order-1 border-b bg-[#FAFAFA] lg:order-2 lg:min-h-screen lg:border-b-0 lg:border-r">

            <div className="sticky top-0">

              <OrderSummary />

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}