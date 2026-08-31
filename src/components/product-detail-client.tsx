"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/context/cart-context";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Product } from "@/types";

export const ProductDetailClient = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [size, setSize] = useState(product.variants[0]?.size ?? "");

  const related = useMemo(
    () => products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3),
    [product.category, product.id],
  );

  return (
    <div className="space-y-12">
      <Link href="/shop" className="text-sm text-zinc-300 hover:text-white">
        ← Back to shop
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex snap-x gap-4 overflow-x-auto rounded-xl">
          {product.images.map((image) => (
            <div key={image} className="relative aspect-[4/5] min-w-full snap-center overflow-hidden rounded-xl border border-white/10">
              <Image src={image} alt={product.name} fill className="object-cover" />
            </div>
          ))}
        </div>

        <div className="space-y-5">
          <p className="text-sm uppercase tracking-widest text-[#e8d9b8]">{product.category}</p>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-zinc-300">{product.description}</p>
          <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
          <p className={product.stock > 0 ? "text-emerald-300" : "text-red-300"}>
            {product.stock > 0 ? `In stock (${product.stock})` : "Out of stock"}
          </p>

          {product.variants.length > 0 && (
            <div>
              <p className="mb-2 text-sm text-zinc-300">Select size</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => {
                  const value = variant.size ?? "";
                  return (
                    <button
                      key={value}
                      onClick={() => setSize(value)}
                      className={`rounded border px-4 py-2 text-sm ${
                        size === value ? "border-[#e8d9b8] bg-[#e8d9b8] text-black" : "border-white/30 text-zinc-200"
                      }`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <AddToCartButton onAdd={() => addToCart(product.id, size)} disabled={product.stock < 1} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Related products</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
