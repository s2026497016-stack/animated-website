export type ProductVariant = {
  size?: string;
  color?: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  variants: ProductVariant[];
};

export type CartItem = {
  productId: string;
  quantity: number;
  size?: string;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  items: OrderItem[];
  total: number;
  paymentMethod: string;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  createdAt: string;
};
