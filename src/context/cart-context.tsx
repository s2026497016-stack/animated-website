"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { products, productMap } from "@/data/products";
import { CartItem } from "@/types";

type CartStateItem = CartItem & {
  name: string;
  price: number;
  image: string;
};

type CartContextValue = {
  items: CartStateItem[];
  count: number;
  subtotal: number;
  addToCart: (productId: string, size?: string) => void;
  updateQuantity: (productId: string, quantity: number, size?: string) => void;
  removeItem: (productId: string, size?: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "thriftee-cart";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const keyFor = (productId: string, size?: string) => `${productId}__${size ?? "default"}`;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback((productId: string, size?: string) => {
    setItems((prev) => {
      const id = keyFor(productId, size);
      const existing = prev.find((item) => keyFor(item.productId, item.size) === id);
      if (!existing) return [...prev, { productId, quantity: 1, size }];
      return prev.map((item) =>
        keyFor(item.productId, item.size) === id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  }, []);

  const removeItem = useCallback((productId: string, size?: string) => {
    setItems((prev) => prev.filter((item) => keyFor(item.productId, item.size) !== keyFor(productId, size)));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, size?: string) => {
      if (quantity < 1) {
        removeItem(productId, size);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          keyFor(item.productId, item.size) === keyFor(productId, size) ? { ...item, quantity } : item,
        ),
      );
    },
    [removeItem],
  );

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const enriched = items
      .map((item) => {
        const product = productMap[item.productId] ?? products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          ...item,
          name: product.name,
          price: product.price,
          image: product.images[0],
        };
      })
      .filter((item): item is CartStateItem => Boolean(item));

    const subtotal = enriched.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const count = enriched.reduce((sum, item) => sum + item.quantity, 0);

    return {
      items: enriched,
      count,
      subtotal,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [addToCart, clearCart, items, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
