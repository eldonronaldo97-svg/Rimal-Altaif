interface Props {
  subtotal: number;
  shipping: number;
  discount?: number;
}

export default function OrderTotals({
  subtotal,
  shipping,
  discount = 0,
}: Props) {

  const total = subtotal + shipping - discount;

  return (

    <div className="space-y-4 border-t pt-6">

      <div className="flex justify-between text-[15px]">

        <span>الإجمالي الفرعي</span>

        <span>{subtotal} ج</span>

      </div>

      {discount > 0 && (

        <div className="flex justify-between text-green-600">

          <span>الخصم</span>

          <span>-{discount} ج</span>

        </div>

      )}

      <div className="flex justify-between text-[15px]">

        <span>الشحن</span>

        <span>{shipping} ج</span>

      </div>

      <div className="flex justify-between border-t pt-5 text-2xl font-bold">

        <span>الإجمالي</span>

        <span>{total} ج</span>

      </div>

    </div>

  );
}