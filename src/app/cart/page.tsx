"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Cart</h1>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#171717] p-8">
          <p className="text-zinc-300">Your cart is empty.</p>
          <Link href="/shop" className="mt-4 inline-block text-[#e8d9b8] hover:underline">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={`${item.productId}-${item.size ?? "default"}`}
                className="grid grid-cols-[84px_1fr] gap-4 rounded-xl border border-white/10 bg-[#171717] p-4 transition motion-safe:animate-page-fade"
              >
                <div className="relative h-[110px] overflow-hidden rounded">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      {item.size && <p className="text-sm text-zinc-300">Size: {item.size}</p>}
                    </div>
                    <button
                      onClick={() => removeItem(item.productId, item.size)}
                      className="text-sm text-red-300 hover:text-red-200"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded border border-white/20 px-2 py-1">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size)}>+</button>
                    </div>
                    <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-white/10 bg-[#171717] p-5">
            <h3 className="text-lg font-semibold">Summary</h3>
            <div className="mt-4 space-y-2 text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(0)}</span>
              </div>
              <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-base font-semibold text-white">
                <span>Total</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-5 block rounded-md bg-[#e8d9b8] px-4 py-3 text-center font-semibold text-black transition hover:brightness-110"
            >
              Proceed to Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
