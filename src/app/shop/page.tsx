import { Suspense } from "react";
import { Catalog } from "@/components/catalog";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  if (params.deals === "true") return { title: "Special Offers" };
  if (typeof params.title === "string")
    return { title: `${params.title} — Shop` };
  const context =
    typeof params.brand === "string"
      ? params.brand
      : typeof params.category === "string"
        ? params.category
        : "";
  return { title: context ? `${context} — Shop` : "Shop ICT products" };
}
export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  return (
    <Suspense
      fallback={<div className="container page-space">Loading the store…</div>}
    >
      <Catalog key={JSON.stringify(params)} />
    </Suspense>
  );
}
