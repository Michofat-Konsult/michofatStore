"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Eye,
  Headphones,
  MessageCircle,
  ShieldCheck,
  Tag,
  Truck,
  UserRound,
  X,
} from "lucide-react";
import { categories, products, type Product } from "@/lib/products";
import { articles } from "@/lib/journal";
import { RetailProduct } from "./retail-product";
const asset = (name: string) => `/reference/${name}`;
const slides = [
  {
    image: "banner-main-banner3-1600x500.jpg",
    alt: "Re-imagine optical excellence with Canon DSLR cameras. Shop now.",
    href: "/shop?category=Cameras%20%26%20smart%20devices",
  },
  {
    image: "banner-main-banner-1600x500.jpg",
    alt: "Explore iPhone and premium smartphones. Shop now.",
    href: "/shop?category=Phones%20%26%20tablets",
  },
  {
    image: "banner-main-banner2-1600x500.jpg",
    alt: "Discover the latest electronics. Shop now.",
    href: "/shop",
  },
];
const picks = [
  "fitness-tracker",
  "oco-wifi-camera",
  "logitech-usb-mouse",
  "ebode-security-camera",
];
function selected(ids: string[]) {
  return ids.flatMap((id) => {
    const p = products.find((p) => p.id === id);
    return p ? [p] : [];
  });
}
function Pager({
  previous,
  next,
  label,
}: {
  previous: () => void;
  next: () => void;
  label: string;
}) {
  return (
    <div className="retail-pager">
      <button onClick={previous} aria-label={`Previous ${label}`}>
        <ArrowLeft size={16} />
      </button>
      <button onClick={next} aria-label={`Next ${label}`}>
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
function ProductRow({ items, title }: { items: Product[]; title: string }) {
  const [offset, setOffset] = useState(0);
  const count = Math.min(4, items.length);
  const visible = Array.from(
    { length: count },
    (_, i) => items[(offset + i) % items.length],
  );
  return (
    <section className="container retail-section">
      <div className="retail-section-title">
        <h2>{title}</h2>
        <Pager
          label={title.toLowerCase()}
          previous={() => setOffset((offset - 1 + items.length) % items.length)}
          next={() => setOffset((offset + 1) % items.length)}
        />
      </div>
      <div className="retail-product-grid">
        {visible.map((p) => (
          <RetailProduct key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
const testimonials = [
  {
    name: "ADEOLA M.",
    role: "Business owner",
    image: "testimonial-1194307936-74x74.jpg",
    quote:
      "Finding the right tools for my business feels so much simpler. Clear product information, a useful shortlist and everything I need in one place.",
    more: "I particularly like being able to compare equipment before deciding what will work for my team. A thoughtful shopping experience from start to finish.",
  },
  {
    name: "TUNDE A.",
    role: "Software developer",
    image: "testimonial-1342856854-74x74.jpg",
    quote:
      "A good workspace starts with the right tech. I can browse laptops, accessories and software without jumping between different stores.",
    more: "The specifications and category filters make narrowing down a setup straightforward. Saving products for later is especially useful when planning an upgrade.",
  },
  {
    name: "CHIAMAKA O.",
    role: "Creative professional",
    image: "testimonial-1437807647-74x74.jpg",
    quote:
      "From my next laptop to the little accessories that make every day easier, there is plenty here to get excited about.",
    more: "A clear catalog and simple shopping bag make it easy to put together a wishlist and see what an upgrade will cost before checking out.",
  },
];
export function RetailLanding() {
  const [slide, setSlide] = useState(0);
  const [dealCategory, setDealCategory] = useState("All deals");
  const [dealOffset, setDealOffset] = useState(0);
  const [tab, setTab] = useState("Popular");
  const [collectionOffset, setCollectionOffset] = useState(0);
  const [expanded, setExpanded] = useState<number[]>([]);
  const [testimonialDone, setTestimonialDone] = useState(false);
  const testimonialDialog = useRef<HTMLDialogElement>(null);
  const allDeals = products.filter((p) => p.oldPrice);
  const dealItems =
    dealCategory === "All deals"
      ? selected([
          "fitness-tracker",
          "oco-wifi-camera",
          "smart-watch",
          "wireless-sport-earphones",
        ])
      : allDeals.filter((p) => p.category === dealCategory);
  const displayedDeals = Array.from(
    { length: Math.min(2, dealItems.length) },
    (_, i) => dealItems[(i + dealOffset) % dealItems.length],
  );
  const collections =
    tab === "Latest"
      ? [...products].reverse()
      : tab === "Best seller"
        ? [...products].sort((a, b) => b.reviews - a.reviews)
        : selected([
            "logitech-usb-mouse",
            "oco-wifi-camera",
            "fitness-tracker",
            "smart-watch",
            "wireless-sport-earphones",
            "dell-desktop-tower",
          ]);
  const collection = Array.from(
    { length: 4 },
    (_, i) => collections[(collectionOffset + i) % collections.length],
  );
  return (
    <div className="retail-landing">
      <h1 className="sr-only">
        Michofat ICT mega store — computers, phones, accessories and more
      </h1>
      <section
        className="retail-hero"
        aria-label="Featured promotions"
        aria-roledescription="carousel"
      >
        <Link href={slides[slide].href} className="retail-hero-slide">
          <Image
            src={asset(slides[slide].image)}
            alt={slides[slide].alt}
            width={1600}
            height={500}
            unoptimized
            loading="eager"
          />
          <span className="mobile-hero-caption">
            <strong>
              {slide === 0
                ? "Capture every possibility."
                : slide === 1
                  ? "Your next connection."
                  : "Big ideas. Better technology."}
            </strong>
            <span>Shop now →</span>
          </span>
        </Link>
        <button
          className="hero-prev"
          aria-label="Previous promotion"
          onClick={() => setSlide((slide + 2) % 3)}
        >
          <ArrowLeft />
        </button>
        <button
          className="hero-next"
          aria-label="Next promotion"
          onClick={() => setSlide((slide + 1) % 3)}
        >
          <ArrowRight />
        </button>
        <div className="retail-hero-dots">
          {slides.map((s, i) => (
            <button
              aria-label={`Show promotion ${i + 1}`}
              aria-pressed={slide === i}
              key={s.image}
              onClick={() => setSlide(i)}
            />
          ))}
        </div>
      </section>
      <section className="container retail-offer-row">
        <Headphones className="offer-row-icon" />
        <div>
          <h2>More sound. More possibilities. Better prices.</h2>
          <p>
            Discover everyday essentials for your work, your music and
            everything in between.
          </p>
        </div>
        <Link
          className="retail-button outline-yellow"
          href="/shop?category=Accessories"
        >
          SHOP NOW
        </Link>
      </section>
      <section
        className="container retail-promo-pair"
        aria-label="Featured departments"
      >
        <Link href="/shop?category=Cameras%20%26%20smart%20devices">
          <Image
            unoptimized
            src={asset("banner-middle-banner-1-580x234.jpg")}
            alt="Lumix S Series from Panasonic. Shop cameras."
            width={580}
            height={234}
          />
        </Link>
        <Link href="/shop?category=Accessories">
          <Image
            unoptimized
            src={asset("banner-middle-banner-2-580x234.jpg")}
            alt="MPOW H12 headphones. Shop audio accessories."
            width={580}
            height={234}
          />
        </Link>
      </section>
      <section className="container retail-trending">
        <h2 className="retail-centered-title">TOP TRENDING CATEGORIES</h2>
        <div className="retail-category-circles">
          {[
            {
              title: "Computers",
              image: "/reference/product-15-270x338.jpg",
              category: categories[0],
            },
            {
              title: "Headphones",
              image: "/reference/category-5-150x150.jpg",
              category: categories[2],
            },
            {
              title: "Networking",
              image: "/products/switch.svg",
              category: categories[3],
            },
            {
              title: "Cameras",
              image: "/reference/product-3-270x338.jpg",
              category: categories[6],
            },
            {
              title: "Software",
              image: "/products/windows.svg",
              category: categories[4],
            },
            {
              title: "Phones & tablets",
              image: products[1].image,
              category: categories[1],
            },
          ].map((c) => (
            <Link
              key={c.title}
              href={`/shop?category=${encodeURIComponent(c.category)}`}
            >
              <span>
                <Image
                  unoptimized
                  src={c.image}
                  alt=""
                  width={180}
                  height={180}
                />
              </span>
              <h3>{c.title}</h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="container retail-deal-box">
        <div className="retail-deal-sidebar">
          <h2>
            DEALS OF <br />
            THE DAY
          </h2>
          <div role="group" aria-label="Deal categories">
            {[
              "All deals",
              categories[2],
              categories[6],
              categories[0],
              categories[4],
            ].map((c) => (
              <button
                key={c}
                aria-pressed={dealCategory === c}
                onClick={() => {
                  setDealCategory(c);
                  setDealOffset(0);
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <Link href="/shop?deals=true">
            View all deals <ArrowRight size={16} />
          </Link>
        </div>
        <div className="retail-deal-products">
          <div className="retail-deal-controls">
            <span>SELECTED OFFERS · DEMO PRICES</span>
            <Pager
              label="deals"
              previous={() =>
                setDealOffset(
                  (n) => (n - 1 + dealItems.length) % dealItems.length,
                )
              }
              next={() => setDealOffset((n) => (n + 1) % dealItems.length)}
            />
          </div>
          <div>
            {displayedDeals.map((p) => (
              <RetailProduct key={p.id} product={p} />
            ))}
          </div>
        </div>
        <Link href="/shop?category=Accessories" className="retail-deal-ad">
          <Image
            unoptimized
            src={asset("banner-offer-side-banner-356x591.jpg")}
            alt="HP25 headphones. Discover our audio range."
            width={356}
            height={591}
          />
        </Link>
      </section>
      <ProductRow
        title="TOP PRODUCTS"
        items={selected(picks).concat(products.slice(0, 4))}
      />
      <section className="retail-earphones">
        <div className="container">
          <span aria-hidden="true" />
          <div>
            <p>Latest Range of Earphones</p>
            <h2>Big sound. Small price.</h2>
            <Link
              className="retail-button outline-yellow"
              href="/shop?category=Accessories"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>
      <section className="container retail-offer-row phone-offer">
        <Tag className="offer-row-icon" />
        <h2>Smart offers on popular smartphones + everyday accessories</h2>
        <Link
          className="retail-button outline-yellow"
          href="/shop?category=Phones%20%26%20tablets"
        >
          SHOP NOW
        </Link>
      </section>
      <section className="container retail-section">
        <div className="retail-section-title">
          <h2>TOP COLLECTION</h2>
          <div
            className="retail-collection-tabs"
            role="tablist"
            aria-label="Product collections"
          >
            {["Popular", "Latest", "Best seller"].map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                aria-controls="retail-collection-panel"
                onClick={() => {
                  setTab(t);
                  setCollectionOffset(0);
                }}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <Pager
            label="collection"
            previous={() =>
              setCollectionOffset(
                (n) => (n - 1 + collections.length) % collections.length,
              )
            }
            next={() =>
              setCollectionOffset((n) => (n + 1) % collections.length)
            }
          />
        </div>
        <div
          className="retail-product-grid"
          role="tabpanel"
          id="retail-collection-panel"
        >
          {collection.map((p) => (
            <RetailProduct key={p.id} product={p} />
          ))}
        </div>
      </section>
      <Link
        href="/shop?category=Phones%20%26%20tablets"
        className="container retail-ipad-banner"
      >
        <Image
          unoptimized
          src={asset("banner-apple-ipad-1200x121.jpg")}
          alt="Discover smartphones and tablets"
          width={1200}
          height={121}
        />
      </Link>
      <section className="container retail-two-collections">
        {[
          {
            title: "ON SALE",
            items: selected([
              "wireless-sport-earphones",
              "smart-watch",
              "fitness-tracker",
              "oco-wifi-camera",
            ]),
          },
          {
            title: "UNDER ₦100,000",
            items: products.filter((p) => p.price < 100000),
          },
        ].map((group) => (
          <MiniCollection
            key={group.title}
            title={group.title}
            items={group.items}
          />
        ))}
      </section>
      <section className="container retail-blog-section">
        <h2 className="retail-centered-title">FROM THE BLOG</h2>
        <div className="retail-blog-grid">
          {articles.map((a) => (
            <article key={a.slug}>
              <Link href={`/journal/${a.slug}`} className="retail-blog-image">
                <Image
                  unoptimized
                  src={a.image}
                  alt="A collection of everyday technology"
                  width={430}
                  height={323}
                />
                <span>22 Oct 2026</span>
              </Link>
              <div className="retail-blog-meta">
                <span>
                  <UserRound size={16} /> Michofat team
                </span>
                <span>
                  <MessageCircle size={16} /> Tech guides
                </span>
                <span>
                  <Eye size={16} /> Read
                </span>
              </div>
              <Link href={`/journal/${a.slug}`}>
                <h3>{a.title}</h3>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section id="testimonials" className="container retail-testimonials">
        <h2 className="retail-centered-title">WE LOVE OUR CUSTOMERS</h2>
        <p className="testimonial-demo-note">
          Illustrative testimonials for this demo storefront
        </p>
        <div className="retail-testimonial-grid">
          {testimonials.map((t, i) => (
            <article key={t.name}>
              <Image
                unoptimized
                src={asset(t.image)}
                alt=""
                width={74}
                height={74}
              />
              <blockquote>
                {t.quote}
                {expanded.includes(i) && <span> {t.more}</span>}
              </blockquote>
              <button
                className="retail-show-more"
                aria-expanded={expanded.includes(i)}
                onClick={() =>
                  setExpanded((list) =>
                    list.includes(i)
                      ? list.filter((n) => n !== i)
                      : [...list, i],
                  )
                }
              >
                <ChevronDown size={16} />
                {expanded.includes(i) ? "Show less" : "Show more"}
              </button>
              <h3>
                {t.name} <span>({t.role})</span>
              </h3>
            </article>
          ))}
        </div>
        <div className="retail-testimonial-actions">
          <button
            className="retail-button"
            onClick={() => testimonialDialog.current?.showModal()}
          >
            Add testimonial
          </button>
          <button
            className="retail-button pale-yellow"
            onClick={() => setExpanded(expanded.length === 3 ? [] : [0, 1, 2])}
          >
            {expanded.length === 3
              ? "Collapse testimonials"
              : "View testimonials"}
          </button>
        </div>
        <dialog
          className="testimonial-dialog"
          ref={testimonialDialog}
          aria-labelledby="testimonial-title"
        >
          <button
            className="dialog-close"
            aria-label="Close testimonial form"
            onClick={() => testimonialDialog.current?.close()}
          >
            <X />
          </button>
          <h2 id="testimonial-title">Share your experience</h2>
          {testimonialDone ? (
            <p role="status">
              Your demo testimonial is complete. Nothing was published or sent.
            </p>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setTestimonialDone(true);
              }}
            >
              <label>
                Your name
                <input required maxLength={100} />
              </label>
              <label>
                Your experience
                <textarea required minLength={10} maxLength={1500} rows={5} />
              </label>
              <p>This demo form does not publish or transmit your details.</p>
              <button className="retail-button" type="submit">
                Submit demo testimonial
              </button>
            </form>
          )}
        </dialog>
      </section>
      <section className="container retail-trust-strip">
        <span>
          <Truck /> Nationwide delivery
        </span>
        <span>
          <ShieldCheck /> Genuine tech
        </span>
        <span>
          <Headphones /> Helpful support
        </span>
      </section>
    </div>
  );
}
function MiniCollection({ title, items }: { title: string; items: Product[] }) {
  const [offset, setOffset] = useState(0);
  return (
    <div className="retail-mini-collection">
      <div className="retail-section-title">
        <h2>{title}</h2>
        <Pager
          label={title.toLowerCase()}
          previous={() =>
            setOffset((n) => (n - 1 + items.length) % items.length)
          }
          next={() => setOffset((n) => (n + 1) % items.length)}
        />
      </div>
      <div>
        {Array.from(
          { length: Math.min(2, items.length) },
          (_, i) => items[(offset + i) % items.length],
        ).map((p) => (
          <RetailProduct key={p.id} product={p} compact />
        ))}
      </div>
    </div>
  );
}
