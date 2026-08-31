import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/product-detail-client";
import { products } from "@/data/products";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
