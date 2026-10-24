"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Home,
  UserRound,
  MessagesSquare,
  Eye,
  Star,
} from "lucide-react";
import { articles } from "@/lib/journal";
import { products } from "@/lib/products";
import { money } from "@/lib/utils";
export const posts = articles.map((a, index) => ({
  ...a,
  date: "23 Oct 2026",
  author: "Michofat editorial",
  views: [1851, 1920, 1684][index],
  comments: 0,
}));
export const latestProducts = [
  "fitness-tracker",
  "dell-desktop-tower",
  "samsung-indoor-camera",
  ...products.map((p) => p.id),
]
  .filter((id, index, all) => all.indexOf(id) === index)
  .map((id) => products.find((p) => p.id === id)!)
  .filter(Boolean);
export function JournalListing({
  initialCategory = "",
}: {
  initialCategory?: string;
}) {
  const [category, setCategory] = useState(initialCategory);
  const [productPage, setProductPage] = useState(0);
  const [latestPage, setLatestPage] = useState(0);
  const [popularPage, setPopularPage] = useState(0);
  const filtered = posts.filter((a) => !category || a.category === category);
  const popular = filtered.toSorted((a, b) => b.views - a.views);
  function chooseCategory(value: string) {
    setCategory(value);
    setLatestPage(0);
    setPopularPage(0);
  }
  return (
    <div className="journal-template">
      <Link
        className="brand-wide-banner"
        href="/shop?category=Accessories"
        aria-label="Explore wireless headphones"
      >
        <Image
          unoptimized
          src="/reference/banner-brand-inner.webp"
          alt="Wireless portable headphones. Explore our audio offers."
          width={1920}
          height={200}
          loading="eager"
        />
      </Link>
      <div className="container">
        <nav className="brand-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" aria-label="Home">
            <Home size={18} fill="currentColor" />
          </Link>
          <span>/</span>
          <span aria-current="page">Blog</span>
        </nav>
        <h1 className="sr-only">The Michofat journal</h1>
        <div className="journal-layout">
          <aside className="journal-sidebar" aria-label="Journal sidebar">
            <nav className="journal-categories" aria-label="Article categories">
              <button
                onClick={() => chooseCategory("")}
                aria-pressed={!category}
              >
                All articles ({posts.length})
              </button>
              {Array.from(new Set(posts.map((a) => a.category))).map((c) => (
                <button
                  key={c}
                  onClick={() => chooseCategory(c)}
                  aria-pressed={category === c}
                >
                  {c} ({posts.filter((a) => a.category === c).length})
                </button>
              ))}
            </nav>
            <section
              className="journal-latest-products"
              aria-label="Latest products"
            >
              <div className="journal-section-heading">
                <h2>LATEST</h2>
                <Pager
                  label="latest products"
                  page={productPage}
                  pages={Math.ceil(latestProducts.length / 3)}
                  onChange={setProductPage}
                />
              </div>
              <div className="journal-product-list">
                {latestProducts
                  .slice(productPage * 3, productPage * 3 + 3)
                  .map((p) => (
                    <article key={p.id}>
                      <Link
                        href={`/product/${p.id}`}
                        className="journal-product-image"
                        aria-label={p.name}
                      >
                        <Image
                          unoptimized
                          src={p.image}
                          alt={p.name}
                          width={140}
                          height={180}
                        />
                      </Link>
                      <div>
                        <div
                          className="journal-product-rating"
                          aria-label={`${p.rating} out of 5 stars`}
                        >
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                              key={i}
                              size={17}
                              fill={
                                i <= Math.round(p.rating)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                        <Link href={`/product/${p.id}`}>{p.name}</Link>
                        <strong>{money(p.price)}</strong>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          </aside>
          <div className="journal-main">
            <PostSection
              title="LATEST ARTICLES"
              posts={filtered}
              page={latestPage}
              onChange={setLatestPage}
            />
            <PostSection
              title="MOST VIEWED"
              posts={popular}
              page={popularPage}
              onChange={setPopularPage}
            />
            <p className="journal-demo-note">
              Article dates, view counts and comments are illustrative demo
              data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export function Pager({
  label,
  page,
  pages,
  onChange,
}: {
  label: string;
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  return (
    <div className="journal-pager" role="group" aria-label={`${label} pages`}>
      <button
        aria-label={`Previous ${label}`}
        disabled={page === 0}
        onClick={() => onChange(page - 1)}
      >
        <ArrowLeft size={18} />
      </button>
      <button
        aria-label={`Next ${label}`}
        disabled={page >= pages - 1}
        onClick={() => onChange(page + 1)}
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
export function PostSection({
  title,
  posts: items,
  page,
  onChange,
}: {
  title: string;
  posts: typeof posts;
  page: number;
  onChange: (page: number) => void;
}) {
  const pages = Math.max(1, Math.ceil(items.length / 2));
  const current = Math.min(page, pages - 1);
  return (
    <section className="journal-post-section" aria-label={title}>
      <div className="journal-section-heading">
        <h2>{title}</h2>
        <Pager
          label={title.toLowerCase()}
          page={current}
          pages={pages}
          onChange={onChange}
        />
      </div>
      <div className="journal-article-grid">
        {items.slice(current * 2, current * 2 + 2).map((a) => (
          <article className="journal-article" key={a.slug}>
            <Link
              href={`/journal/${a.slug}`}
              className="journal-article-image"
              aria-label={`Read ${a.title}`}
            >
              <Image
                unoptimized
                src={a.image}
                alt="Technology and everyday workspace essentials"
                width={520}
                height={390}
              />
              <time dateTime="2026-10-23">{a.date}</time>
            </Link>
            <div className="journal-article-meta">
              <span>
                <UserRound size={17} fill="currentColor" />
                {a.author}
              </span>
              <span>
                <MessagesSquare size={17} />
                {a.comments} comments
              </span>
              <span>
                <Eye size={17} />
                {a.views}
              </span>
            </div>
            <h3>
              <Link href={`/journal/${a.slug}`}>{a.title}</Link>
            </h3>
          </article>
        ))}
      </div>
      <span className="sr-only" role="status">
        {title}: page {current + 1} of {pages}, {items.length} articles
      </span>
    </section>
  );
}
