import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";

export default function HomePage() {
  const featured = products.slice(0, 4);

  return (
    <div className="space-y-14">
      <section className="animate-hero-reveal rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#101010] px-6 py-16 text-center md:px-12 md:py-20">
        <p className="text-sm tracking-[0.25em] text-[#e8d9b8]">THRIFTEE</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-6xl">Curated Vintage & Boxy Streetwear</h1>
        <p className="mx-auto mt-5 max-w-2xl text-zinc-300">
          Premium daily pieces selected for strong silhouettes, clean styling, and effortless expression.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            href="/shop"
            className="rounded-md border border-[#e8d9b8]/70 bg-[#e8d9b8] px-6 py-3 font-semibold text-black transition hover:brightness-110"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Pieces</h2>
          <Link href="/shop" className="text-sm text-zinc-300 hover:text-white">
            View all
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#151515] p-8">
        <h3 className="text-xl font-semibold">Brand Story</h3>
        <p className="mt-4 text-zinc-300">
          Founded by Zayad, THRIFTEE brings curated vintage finds and boxy streetwear fits together for a minimal,
          premium wardrobe rooted in culture.
        </p>
      </section>
    </div>
  );
}
