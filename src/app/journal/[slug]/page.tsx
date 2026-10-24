import { JournalDetail } from "@/components/journal-detail";
import { notFound } from "next/navigation";
import { articles } from "@/lib/journal";
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: articles.find((a) => a.slug === slug)?.title };
}
export default async function Article({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return <JournalDetail key={article.slug} article={article} />;
}
