import { JournalListing } from "@/components/journal-listing";
export const metadata = { title: "The Michofat journal" };
export default async function Journal({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "" } = await searchParams;
  return <JournalListing key={category} initialCategory={category} />;
}
