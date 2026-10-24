"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Eye,
  MessagesSquare,
  UserRound,
  Star,
} from "lucide-react";
import { articles } from "@/lib/journal";
import { money } from "@/lib/utils";
import { latestProducts, Pager, posts, PostSection } from "./journal-listing";
import { RetailProduct } from "./retail-product";
type Article = (typeof articles)[number];
export function JournalDetail({ article }: { article: Article }) {
  const [image, setImage] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [authorExpanded, setAuthorExpanded] = useState(false);
  const [comments, setComments] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [latestPage, setLatestPage] = useState(0);
  const [relatedPage, setRelatedPage] = useState(0);
  const [productPage, setProductPage] = useState(0);
  const gallery = [
    article.image,
    ...articles.filter((a) => a.slug !== article.slug).map((a) => a.image),
  ];
  const related = posts.filter((a) => a.slug !== article.slug);
  const meta = posts.find((a) => a.slug === article.slug)!;
  function comment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const value = String(new FormData(form).get("comment") ?? "").trim();
    if (value.length < 10) {
      setStatus("Please write a comment of at least 10 characters.");
      return;
    }
    setComments([...comments, value]);
    setStatus(
      "Demo comment added to this page only. It was not published or sent.",
    );
    form.reset();
  }
  return (
    <div className="journal-template journal-detail-template">
      <div className="container">
        <nav className="brand-breadcrumb" aria-label="Breadcrumb">
          <Link href="/" aria-label="Home">
            <Home size={18} fill="currentColor" />
          </Link>
          <span>/</span>
          <Link href="/journal">Blog</Link>
          <span>/</span>
          <span aria-current="page">{article.title}</span>
        </nav>
        <div className="jd-layout">
          <article className="jd-main">
            <h1>{article.title}</h1>
            <div className="jd-meta">
              <span>
                By <a href="#article-author">Michofat editorial</a> ·{" "}
                <time dateTime="2026-10-23">23 Oct 2026</time>
              </span>
              <span>
                <Eye size={19} />
                {meta.views}
              </span>
              <a href="#article-comments">
                <MessagesSquare size={19} />
                {comments.length} comments
              </a>
            </div>
            <div className="jd-gallery">
              <Image
                unoptimized
                src={gallery[image]}
                alt={`Technology workspace — image ${image + 1} of ${gallery.length}`}
                width={1080}
                height={810}
                loading="eager"
              />
              <button
                className="jd-gallery-prev"
                aria-label="Previous article image"
                onClick={() =>
                  setImage((image + gallery.length - 1) % gallery.length)
                }
              >
                <ChevronLeft size={32} />
              </button>
              <button
                className="jd-gallery-next"
                aria-label="Next article image"
                onClick={() => setImage((image + 1) % gallery.length)}
              >
                <ChevronRight size={32} />
              </button>
            </div>
            <div
              className="jd-thumbnails"
              role="group"
              aria-label="Article image gallery"
            >
              {gallery.map((src, i) => (
                <button
                  key={src}
                  aria-label={`Show article image ${i + 1}`}
                  aria-pressed={image === i}
                  onClick={() => setImage(i)}
                >
                  <Image
                    unoptimized
                    src={src}
                    alt=""
                    width={215}
                    height={160}
                  />
                </button>
              ))}
            </div>
            <div id="article-copy" className="jd-body">
              {(expanded ? article.body : article.body.slice(0, 2)).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="jd-expand">
              <button
                className="jd-show-more"
                aria-expanded={expanded}
                aria-controls="article-copy"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "⌃ Show less" : "⌄ Show more"}
              </button>
            </div>
            <section
              className="jd-author"
              id="article-author"
              aria-label="About the author"
            >
              <div className="jd-author-avatar">
                <UserRound size={52} />
              </div>
              <div>
                <h2>Michofat editorial</h2>
                <p>
                  Practical ideas for choosing the right technology, building a
                  better workspace, and making everyday upgrades.
                </p>
                {authorExpanded && (
                  <p>
                    Our demo journal brings together buying guides and ICT
                    essentials. Compare specifications, check compatibility, and
                    find tools that fit the way you work.
                  </p>
                )}
                <button
                  className="jd-show-more"
                  aria-expanded={authorExpanded}
                  onClick={() => setAuthorExpanded(!authorExpanded)}
                >
                  {authorExpanded ? "⌃ Show less" : "⌄ Show more"}
                </button>
              </div>
            </section>
            <section
              className="jd-comments"
              id="article-comments"
              aria-label="Article comments"
            >
              <form onSubmit={comment}>
                <h2>Write a comment</h2>
                <label className="sr-only" htmlFor="article-comment">
                  Your comment
                </label>
                <textarea
                  name="comment"
                  id="article-comment"
                  placeholder="Your comment"
                  minLength={10}
                  maxLength={2000}
                  required
                />
                <button className="account-button account-red" type="submit">
                  Post comment
                </button>
                <p className="journal-demo-note">
                  Demo comments stay on this page until you leave or reload.
                  Nothing is saved or sent.
                </p>
              </form>
              {status && (
                <p role="status" className="account-status">
                  {status}
                </p>
              )}
              {comments.length ? (
                <div className="jd-comment-list">
                  {comments.map((text, i) => (
                    <article key={i}>
                      <strong>Demo reader</strong>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="jd-no-comments">
                  There are no comments for this article.
                </p>
              )}
            </section>
            <p className="journal-demo-note">
              Article dates and view counts are illustrative demo data.
            </p>
          </article>
          <aside className="jd-sidebar" aria-label="Article sidebar">
            <nav className="journal-categories" aria-label="Article categories">
              {Array.from(new Set(articles.map((a) => a.category))).map((c) => (
                <Link
                  key={c}
                  href={`/journal?category=${encodeURIComponent(c)}`}
                  aria-current={c === article.category ? "true" : undefined}
                >
                  {c} ({articles.filter((a) => a.category === c).length})
                </Link>
              ))}
            </nav>
            <section aria-label="Latest products">
              <div className="journal-section-heading">
                <h2>LATEST</h2>
                <Pager
                  label="latest sidebar products"
                  page={latestPage}
                  pages={Math.ceil(latestProducts.length / 3)}
                  onChange={setLatestPage}
                />
              </div>
              <div className="journal-product-list">
                {latestProducts
                  .slice(latestPage * 3, latestPage * 3 + 3)
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
        </div>
      </div>
      <div className="jd-related-articles">
        <div className="container">
          <PostSection
            title="RELATED ARTICLES"
            posts={related}
            page={relatedPage}
            onChange={setRelatedPage}
          />
        </div>
      </div>
      <section
        className="container jd-related-products"
        aria-label="Related products"
      >
        <div className="journal-section-heading">
          <h2>RELATED PRODUCTS</h2>
          <Pager
            label="related products"
            page={productPage}
            pages={Math.ceil(latestProducts.length / 5)}
            onChange={setProductPage}
          />
        </div>
        <div className="jd-products">
          {latestProducts
            .slice(productPage * 5, productPage * 5 + 5)
            .map((p) => (
              <RetailProduct product={p} key={p.id} />
            ))}
        </div>
      </section>
    </div>
  );
}
