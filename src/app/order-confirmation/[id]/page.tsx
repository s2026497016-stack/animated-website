"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { products } from "@/data/products";
import { formatPrice, whatsappOwnerLink } from "@/lib/format";
import { getOrderById } from "@/lib/orders";

export default function OrderConfirmationPage() {
  const params = useParams<{ id: string }>();

  const order = useMemo(() => getOrderById(params.id), [params.id]);

  if (!order) {
    return (
      <div className="space-y-4 rounded-xl border border-white/10 bg-[#171717] p-8">
        <h1 className="text-2xl font-bold">Order not found</h1>
        <Link href="/shop" className="text-[#e8d9b8] hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-xl border border-white/10 bg-[#171717] p-8">
      <div className="flex items-center gap-3 text-emerald-300">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-emerald-300 motion-safe:animate-page-fade">
          ✓
        </span>
        <h1 className="text-2xl font-bold text-white">Thank you for your order!</h1>
      </div>
      <p className="text-zinc-300">Order Number: {order.id}</p>
      <p className="text-zinc-300">Estimated delivery: 3-7 working days</p>

      <div className="space-y-2 border-t border-white/10 pt-4 text-sm text-zinc-300">
        {order.items.map((item) => {
          const product = products.find((entry) => entry.id === item.productId);
          return (
            <div key={item.productId} className="flex justify-between">
              <span>
                {product?.name ?? item.productId} × {item.quantity}
              </span>
              <span>{formatPrice(item.quantity * item.price)}</span>
            </div>
          );
        })}
        <div className="flex justify-between pt-2 text-base font-semibold text-white">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </div>
      </div>

      <a
        href={whatsappOwnerLink(`Hi Zayad, regarding order ${order.id} for ${order.customerName}.`)}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-md bg-[#e8d9b8] px-5 py-3 font-semibold text-black"
      >
        Contact on WhatsApp
      </a>
    </div>
  );
}
