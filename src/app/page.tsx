import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Cable,
  Check,
  CreditCard,
  Headphones,
  Laptop,
  Monitor,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Truck,
  Wifi,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { products, categories } from "@/lib/products";
import { Newsletter } from "@/components/newsletter";
const icons = [Laptop, Smartphone, Cable, Wifi, ShieldCheck, Monitor];
const categoryImages = [
  products[0].image,
  products[1].image,
  products[2].image,
  "/products/switch.svg",
  "/products/security.svg",
  products[10].image,
];
const categoryNames = [
  "Laptops & computers",
  "Phones & tablets",
  "Everyday accessories",
  "Routers & switches",
  "Software & security",
  "Monitors & printers",
];
export default function Home() {
  return (
    <>
      <div className="container store-intro">
        <span>
          <span className="live-dot" /> YOUR TRUSTED ICT DESTINATION
        </span>
        <p>Big ideas. Better technology.</p>
      </div>
      <section className="container home-hero">
        <div className="hero-main">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <span /> YOUR NEXT CHAPTER STARTS WITH AN UPGRADE
            </span>
            <h1>
              Your next
              <br />
              big thing
              <br />
              <em>starts here.</em>
            </h1>
            <p>
              The tools to do more. The tech to go further.
              <br />
              Find your perfect upgrade, all in one place.
            </p>
            <Link className="primary-link" href="/shop">
              Find your next upgrade <ArrowUpRight size={19} />
            </Link>
            <div className="hero-proof">
              <span className="hero-proof-icon">
                <BadgeCheck size={23} />
              </span>
              <span>
                <strong>For the way you work. And everything after.</strong>
                <small>Laptops · Phones · Accessories · Networking</small>
              </span>
            </div>
          </div>
          <div className="hero-art">
            <Image
              unoptimized
              width={1000}
              height={900}
              loading="eager"
              src={products[0].image}
              alt="An illuminated MacBook on a desk"
            />
            <span className="floating-tag">
              <BadgeCheck size={17} /> Genuine tech. Guaranteed.
            </span>
            <div className="hero-product-label">
              <span>THIN. LIGHT. ANYTHING BUT ORDINARY.</span>
              <strong>MacBook Air. Big on possibility.</strong>
              <Link href="/product/macbook-air-m3">
                Discover the MacBook Air <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
          <div className="hero-bottom-note">
            <ShieldCheck size={14} /> Genuine products. Exceptional
            possibilities.
          </div>
        </div>
        <div className="hero-side">
          <Link
            className="side-card accessories"
            href="/shop?category=Accessories"
          >
            <span>THE EVERYDAY ESSENTIALS</span>
            <h2>
              Small upgrades.
              <br />
              Big difference.
            </h2>
            <p>Find your focus. Feel the music.</p>
            <strong>
              Shop accessories <ArrowUpRight size={17} />
            </strong>
            <Image
              unoptimized
              width={450}
              height={450}
              src={products[2].image}
              alt="Wireless headphones"
              className="side-photo"
            />
          </Link>
          <Link className="side-card business" href="/shop?category=Networking">
            <span>BUSINESS, BETTER CONNECTED</span>
            <h2>
              Built for your
              <br />
              next big move.
            </h2>
            <p>Power a more connected workplace.</p>
            <strong>
              Explore networking <ArrowUpRight size={17} />
            </strong>
            <Image
              unoptimized
              width={450}
              height={300}
              src="/products/switch.svg"
              alt="A network switch"
              className="side-photo network-photo"
            />
          </Link>
        </div>
      </section>
      <section className="container benefits-strip">
        {[
          [Truck, "Nationwide delivery", "Your next upgrade, delivered"],
          [ShieldCheck, "Genuine products", "No compromises on quality"],
          [CreditCard, "Transparent pricing", "Great tech. Clear prices."],
          [Headphones, "Expert advice", "Real people who know tech"],
        ].map(([Icon, title, text]) => {
          const I = Icon as typeof Truck;
          return (
            <div key={String(title)}>
              <span className="benefit-icon">
                <I size={24} />
              </span>
              <span>
                <strong>{String(title)}</strong>
                <small>{String(text)}</small>
              </span>
            </div>
          );
        })}
      </section>
      <section className="category-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">EXPLORE YOUR POSSIBILITIES</span>
              <h2>
                Shop by <em>category.</em>
              </h2>
              <p>Everything you need. Exactly where you’d expect it.</p>
            </div>
            <Link href="/shop">
              View all products <ArrowUpRight size={19} />
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((category, i) => {
              const Icon = icons[i];
              const count = products.filter(
                (p) => p.category === category,
              ).length;
              return (
                <Link
                  href={`/shop?category=${encodeURIComponent(category)}`}
                  key={category}
                  className="category-card"
                >
                  <div
                    className={`category-photo ${categoryImages[i].endsWith(".svg") ? "illustration" : ""}`}
                  >
                    <Image
                      unoptimized
                      width={600}
                      height={500}
                      src={categoryImages[i]}
                      alt=""
                    />
                    <span className="category-symbol">
                      <Icon size={22} strokeWidth={1.5} />
                    </span>
                  </div>
                  <div className="category-caption">
                    <div>
                      <h3>{categoryNames[i]}</h3>
                      <span>
                        {count} {count === 1 ? "product" : "products"}
                      </span>
                    </div>
                    <span className="category-arrow">
                      <ArrowUpRight size={19} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section
        className="container brand-strip"
        aria-label="Featured technology brands"
      >
        <span>
          GREAT BRANDS.
          <br />
          <strong>GREATER POSSIBILITIES.</strong>
        </span>
        <b>Apple</b>
        <b className="brand-hp">hp</b>
        <b className="brand-dell">DELL</b>
        <b>SAMSUNG</b>
        <b className="brand-cisco">cisco</b>
        <b className="brand-microsoft">▦ Microsoft</b>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE SHORTLIST, SORTED</span>
            <h2>
              Your next <em>favourites.</em>
            </h2>
            <p>Standout tech. Everyday possibilities.</p>
          </div>
          <Link href="/shop">
            Shop all products <ArrowUpRight size={19} />
          </Link>
        </div>
        <div className="product-grid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
      <section className="container business-banner">
        <div>
          <span className="eyebrow">BIG IDEAS DESERVE GREAT TECH</span>
          <h2>
            Your business.
            <br />
            <em>Ready for what’s next.</em>
          </h2>
          <p>
            From one workstation to an entire office.
            <br />
            Build something bigger with the right technology.
          </p>
          <Link href="/contact" className="primary-link">
            Let’s talk business <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="business-visual">
          <div className="network-core">
            <Wifi size={38} />
            <strong>Connected possibilities</strong>
            <span>Secure. Reliable. Ready to grow.</span>
          </div>
          <span className="network-node node-a">
            <Laptop />
            Your team
          </span>
          <span className="network-node node-b">
            <ShieldCheck />
            Your security
          </span>
          <span className="network-node node-c">
            <PackageCheck />
            Your next step
          </span>
        </div>
      </section>
      <section className="container section deals-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">MORE TECH FOR YOUR MONEY</span>
            <h2>
              Smart finds. <em>Better prices.</em>
            </h2>
            <p>Your next great upgrade, for a little less.</p>
          </div>
          <Link href="/shop?deals=true">
            Explore the deals <ArrowRight size={18} />
          </Link>
        </div>
        <div className="product-grid">
          {products
            .filter((p) => p.oldPrice)
            .slice(3, 7)
            .map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
        </div>
      </section>
      <section className="container reassurance">
        <span>
          <Check size={16} /> Carefully selected products
        </span>
        <span>
          <Check size={16} /> Helpful, human support
        </span>
        <span>
          <Check size={16} /> For work, life and everything between
        </span>
      </section>
      <Newsletter />
    </>
  );
}
