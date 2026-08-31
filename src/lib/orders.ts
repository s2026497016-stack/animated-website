import { Order } from "@/types";

const STORAGE_KEY = "thriftee-orders";

export const saveOrder = (order: Order) => {
  if (typeof window === "undefined") return;
  const existing = getOrders();
  localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...existing]));
};

export const getOrders = (): Order[] => {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as Order[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const getOrderById = (id: string): Order | undefined =>
  getOrders().find((order) => order.id === id);
