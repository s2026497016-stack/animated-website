"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/cart-context";

export const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  return (
    <article className="group overflow-hidden rounded-xl border border-white/10 bg-[#1a1a1a] transition duration-300 hover:border-white/30 hover:brightness-110 motion-safe:hover:scale-[1.015]">
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-400">{product.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{product.name}</h3>
          <p className="mt-2 text-sm text-zinc-300">{formatPrice(product.price)}</p>
        </div>

        <button
          className="w-full rounded-md border border-[#e8d9b8]/70 bg-[#e8d9b8] px-4 py-2 text-sm font-semibold text-black transition active:scale-95 motion-safe:duration-200"
          onClick={() => addToCart(product.id)}
          disabled={product.stock < 1}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </article>
  );
};
