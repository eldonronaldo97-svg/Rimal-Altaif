export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipping"
  | "delivered"
  | "cancelled";

export interface OrderProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

export interface CustomerInfo {
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
}

export interface Order {
  id: string;

  orderNumber: string;

  createdAt: string;

  status: OrderStatus;

  customer: CustomerInfo;

  products: OrderProduct[];

  paymentMethod: "cod" | "instapay" | "vodafone";

  receipt?: string | null;

  coupon?: string;

  subtotal: number;

  shipping: number;

  discount: number;

  total: number;
}

function generateOrderNumber() {
  const now = new Date();

  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const serial = String(Date.now()).slice(-5);

  return `RTA-${date}-${serial}`;
}

const STORAGE_KEY = "orders";

export function getOrders(): Order[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch {
    return [];
  }
}

export function saveOrder(
  order: Omit<Order, "id" | "orderNumber" | "createdAt" | "status">
): Order {
  const orders = getOrders();

  const newOrder: Order = {
    ...order,

    id: crypto.randomUUID(),

    orderNumber: generateOrderNumber(),

    createdAt: new Date().toISOString(),

    status: "pending",
  };

  orders.push(newOrder);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(orders)
  );

  return newOrder;
}

export function getOrderById(id: string) {
  return getOrders().find(
    (order) => order.id === id
  );
}

export function getOrderByNumber(
  orderNumber: string
) {
  return getOrders().find(
    (order) =>
      order.orderNumber === orderNumber
  );
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus
) {
  const orders = getOrders();

  const index = orders.findIndex(
    (order) => order.id === id
  );

  if (index === -1) return;

  orders[index].status = status;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(orders)
  );
}

export function deleteOrder(id: string) {
  const orders = getOrders().filter(
    (order) => order.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(orders)
  );
}

export function clearOrders() {
  localStorage.removeItem(STORAGE_KEY);
}