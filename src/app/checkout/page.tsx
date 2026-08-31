"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { formatPrice, whatsappOwnerLink } from "@/lib/format";
import { saveOrder } from "@/lib/orders";
import { Order } from "@/types";

const paymentMethods = ["Cash on Delivery (COD)", "Bank Transfer", "JazzCash", "Easypaisa"] as const;

type FormValues = {
  customerName: string;
  customerEmail: string;
  phone: string;
  address: string;
  paymentMethod: (typeof paymentMethods)[number];
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [form, setForm] = useState<FormValues>({
    customerName: "",
    customerEmail: "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery (COD)",
  });

  const orderItems = useMemo(
    () => items.map((item) => ({ productId: item.productId, quantity: item.quantity, price: item.price })),
    [items],
  );

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!form.customerName.trim()) nextErrors.customerName = "Name is required";
    if (!form.customerEmail.includes("@")) nextErrors.customerEmail = "Valid email is required";
    if (!form.phone.trim()) nextErrors.phone = "Phone is required";
    if (!form.address.trim()) nextErrors.address = "Address is required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (items.length === 0 || !validate()) return;

    setSubmitting(true);
    const order: Order = {
      id: `THR-${Date.now()}`,
      customerName: form.customerName,
      customerEmail: form.customerEmail,
      phone: form.phone,
      address: form.address,
      items: orderItems,
      total: subtotal,
      paymentMethod: form.paymentMethod,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error("Unable to place order");

      saveOrder(order);
      clearCart();
      router.push(`/order-confirmation/${order.id}`);
    } catch {
      setErrors((prev) => ({ ...prev, customerEmail: "Could not place order, please try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <form onSubmit={onSubmit} className="space-y-5 rounded-xl border border-white/10 bg-[#171717] p-6">
        <h1 className="text-2xl font-bold">Checkout</h1>

        {(["customerName", "customerEmail", "phone", "address"] as const).map((field) => (
          <label key={field} className="block text-sm">
            <span className="mb-1 block capitalize text-zinc-300">{field.replace("customer", "")}</span>
            {field === "address" ? (
              <textarea
                value={form[field]}
                onChange={(event) => setForm((state) => ({ ...state, [field]: event.target.value }))}
                className="w-full rounded-md border border-white/20 bg-[#111111] px-3 py-2 outline-none focus:border-[#e8d9b8]"
                rows={3}
              />
            ) : (
              <input
                value={form[field]}
                onChange={(event) => setForm((state) => ({ ...state, [field]: event.target.value }))}
                className="w-full rounded-md border border-white/20 bg-[#111111] px-3 py-2 outline-none focus:border-[#e8d9b8]"
              />
            )}
            {errors[field] && <span className="mt-1 block text-xs text-red-300">{errors[field]}</span>}
          </label>
        ))}

        <div>
          <p className="mb-2 text-sm text-zinc-300">Payment Method</p>
          <div className="grid gap-2">
            {paymentMethods.map((method) => (
              <label key={method} className="flex items-center gap-2 rounded border border-white/20 px-3 py-2 text-sm">
                <input
                  type="radio"
                  checked={form.paymentMethod === method}
                  onChange={() => setForm((state) => ({ ...state, paymentMethod: method }))}
                />
                {method}
              </label>
            ))}
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Bank Transfer/JazzCash/Easypaisa require advance payment confirmation. Contact +92 337 643 0990.
          </p>
        </div>

        <button
          disabled={submitting || items.length === 0}
          className="w-full rounded-md bg-[#e8d9b8] px-4 py-3 font-semibold text-black transition hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      <aside className="h-fit space-y-4 rounded-xl border border-white/10 bg-[#171717] p-5">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {items.map((item) => (
          <div key={`${item.productId}-${item.size ?? "default"}`} className="flex justify-between text-sm text-zinc-300">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </div>
        ))}
        <div className="border-t border-white/10 pt-4 text-sm">
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
        </div>
        <a
          href={whatsappOwnerLink("Hi Zayad, I need help with my THRIFTEE order.")}
          target="_blank"
          rel="noreferrer"
          className="block rounded border border-[#e8d9b8]/60 px-3 py-2 text-center text-sm text-[#e8d9b8]"
        >
          WhatsApp Zayad
        </a>
      </aside>
    </div>
  );
}
