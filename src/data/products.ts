import { Product } from "@/types";

export const categories = [
  "All",
  "Graphic Tees",
  "Drop Shoulder Fits",
  "Wide-Leg Pants",
  "Polos",
  "Button-Down Shirts",
  "Vintage Rock/Cinema",
] as const;

export const products: Product[] = [
  {
    id: "tee-midnight-glyph",
    name: "Midnight Glyph Tee",
    description: "Heavyweight graphic tee with boxy shoulder drop and vintage wash.",
    price: 5490,
    category: "Graphic Tees",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80",
    ],
    stock: 8,
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }, { size: "XL" }],
  },
  {
    id: "drop-shadow-ash",
    name: "Ash Drop Shoulder",
    description: "Relaxed silhouette built for effortless street layering.",
    price: 6290,
    category: "Drop Shoulder Fits",
    images: [
      "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    ],
    stock: 6,
    variants: [{ size: "M" }, { size: "L" }, { size: "XL" }],
  },
  {
    id: "retro-cinema-knit",
    name: "Retro Cinema Knit Polo",
    description: "Soft structured polo inspired by classic cinema wardrobe tones.",
    price: 6990,
    category: "Polos",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1000&q=80",
    ],
    stock: 5,
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }],
  },
  {
    id: "wide-leg-noir",
    name: "Noir Wide-Leg Trousers",
    description: "High-rise wide-leg pants with fluid drape and strong street edge.",
    price: 7890,
    category: "Wide-Leg Pants",
    images: [
      "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=80",
    ],
    stock: 7,
    variants: [{ size: "30" }, { size: "32" }, { size: "34" }, { size: "36" }],
  },
  {
    id: "button-down-ivory",
    name: "Ivory Oversized Button-Down",
    description: "Crisp vintage-inspired shirt with oversized fit and clean lines.",
    price: 6590,
    category: "Button-Down Shirts",
    images: [
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1562158070-57eede7a5a03?auto=format&fit=crop&w=1000&q=80",
    ],
    stock: 9,
    variants: [{ size: "M" }, { size: "L" }, { size: "XL" }],
  },
  {
    id: "vintage-rock-ink",
    name: "Vintage Rock Poster Tee",
    description: "Faded black tee with archival rock print and raw hem finish.",
    price: 5790,
    category: "Vintage Rock/Cinema",
    images: [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1622445275576-721325763afe?auto=format&fit=crop&w=1000&q=80",
    ],
    stock: 4,
    variants: [{ size: "S" }, { size: "M" }, { size: "L" }],
  },
];

export const productMap = Object.fromEntries(products.map((product) => [product.id, product]));
