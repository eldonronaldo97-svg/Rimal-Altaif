export function calculateDiscount(
  subtotal: number,
  coupon?: string
) {
  if (!coupon) return 0;

  switch (coupon.toUpperCase()) {
    case "WELCOME10":
      return subtotal * 0.1;

    default:
      return 0;
  }
}