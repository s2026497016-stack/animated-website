"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { categories, products } from "@/data/products";

export default function ShopPage() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const searchMatch = `${product.name} ${product.description}`.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Shop THRIFTEE</h1>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search products"
          className="w-full rounded-md border border-white/20 bg-[#191919] px-4 py-3 text-sm outline-none ring-[#e8d9b8] focus:ring"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                category === item
                  ? "border-[#e8d9b8] bg-[#e8d9b8] text-black"
                  : "border-white/20 text-zinc-300 hover:border-white/40"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div
        key={`${category}-${search}`}
        className="grid gap-5 opacity-100 transition-opacity duration-300 motion-safe:animate-page-fade sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && <p className="text-zinc-300">No products found for this filter.</p>}
    </div>
  );
}
