"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/cart-context";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const Header = () => {
  const pathname = usePathname();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#111111]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-lg font-bold tracking-[0.35em] text-white">
          THRIFTEE
        </Link>

        <button
          className="rounded border border-white/20 px-3 py-2 text-sm text-white md:hidden"
          onClick={() => setOpen((state) => !state)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-white ${pathname === link.href ? "text-white" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/cart" className="relative text-white transition active:scale-95 motion-safe:duration-200">
            Cart
            <span className="absolute -right-4 -top-2 rounded-full bg-[#e8d9b8] px-1.5 text-[10px] font-bold text-black motion-safe:animate-count-bump">
              {count}
            </span>
          </Link>
        </nav>
      </div>

      {open && (
        <nav className="space-y-3 border-t border-white/10 px-4 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-zinc-300"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/cart" className="block text-white" onClick={() => setOpen(false)}>
            Cart ({count})
          </Link>
        </nav>
      )}
    </header>
  );
};
