const categories = [
  "Graphic Tees",
  "Drop Shoulder Fits",
  "Wide-Leg Pants",
  "Polos",
  "Button-Down Shirts",
  "Vintage Rock/Cinema",
];

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">About THRIFTEE</h1>
      <p className="max-w-3xl text-zinc-300">
        THRIFTEE is Curated Vintage & Boxy Streetwear. Founded by Zayad, the label blends classic influence and modern
        street silhouettes to deliver statement fits with premium minimal energy.
      </p>

      <section className="rounded-xl border border-white/10 bg-[#171717] p-6">
        <h2 className="text-xl font-semibold">Product Categories</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {categories.map((category) => (
            <li key={category} className="rounded border border-white/10 bg-[#111111] px-4 py-3 text-zinc-200">
              {category}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-xl border border-white/10 bg-[#171717] p-6 text-zinc-300">
        <h2 className="text-xl font-semibold text-white">Mission</h2>
        <p className="mt-3">Deliver confident, wearable vintage and boxy essentials that feel premium every day.</p>
      </section>
    </div>
  );
}
