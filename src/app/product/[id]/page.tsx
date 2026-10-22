import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { ProductDetail } from "@/components/product-detail";
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = getProduct((await params).id);
  return { title: p?.name || "Product not found", description: p?.description };
}
export default async function Product({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const p = getProduct((await params).id);
  if (!p) notFound();
  return <ProductDetail product={p} />;
}
