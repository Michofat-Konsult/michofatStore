import { Suspense } from "react";
import { Catalog } from "@/components/catalog";
export const metadata = { title: "Shop ICT products" };
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
