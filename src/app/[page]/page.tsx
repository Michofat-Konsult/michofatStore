import Link from "next/link";
import { AboutPage } from "@/components/about-page";
import { notFound } from "next/navigation";
const content: Record<
  string,
  {
    title: string;
    kicker: string;
    intro: string;
    sections: { title: string; text: string }[];
  }
> = {
  about: {
    title: "Good tech. Human possibilities.",
    kicker: "HELLO, WE’RE MICHOFAT",
    intro:
      "We believe the right technology opens doors. To better work, closer connections and ideas you haven’t thought of yet.",
    sections: [
      {
        title: "Your ICT store, all in one place.",
        text: "Discover computers, phones, accessories, networking equipment, operating systems and antivirus software. Our mock catalog brings personal and business technology together in one easy-to-explore store.",
      },
      {
        title: "A little help goes a long way.",
        text: "Choosing technology can be complicated. Michofat is designed around clear specifications, useful product details and an easy route to expert advice.",
      },
      {
        title: "Built for what comes next.",
        text: "This standalone store is a demonstration. Product data, pricing, ratings and business contact details are illustrative. Payment processing, stock management and fulfillment must be connected before launch.",
      },
    ],
  },
  help: {
    title: "A little help, right here.",
    kicker: "DELIVERY, RETURNS & ANSWERS",
    intro:
      "Clear information for a smoother shopping experience. The policies below are illustrative demo policies.",
    sections: [
      {
        title: "Delivery across Nigeria",
        text: "Physical orders use a flat demo delivery fee of ₦5,000, with free delivery from ₦500,000. Estimated delivery is 2–5 business days. Digital-only orders have no delivery charge. Actual delivery service is not connected.",
      },
      {
        title: "Returns & warranty",
        text: "Illustrative policy: request a return within 7 days of receiving an unused physical product with its original packaging. Activated digital licenses are excluded. Warranty terms vary by product; see each specification table. Contact support before returning an item.",
      },
      {
        title: "FAQs: Is this a real store?",
        text: "This is a fully navigable demo with mock inventory. Checkout does not charge you, create a server-side order, send email or arrange delivery.",
      },
      {
        title: "FAQs: Where is my cart saved?",
        text: "Your cart and wishlist are saved in local storage on this browser. Clearing browser data removes them. No account or login is needed.",
      },
      {
        title: "FAQs: Can I buy for a business?",
        text: "The contact form includes a business and bulk purchase option. This demonstration does not transmit messages; connect a support backend before using it for real enquiries.",
      },
    ],
  },
  privacy: {
    title: "Your privacy matters.",
    kicker: "PRIVACY · DEMO POLICY",
    intro:
      "This demonstration keeps things simple. Replace this page with a reviewed privacy policy before operating a live store.",
    sections: [
      {
        title: "What this demo stores",
        text: "Only your cart product IDs, quantities and wishlist product IDs are saved in your browser’s local storage. Checkout and contact fields are kept in the current page only and are not submitted to a server.",
      },
      {
        title: "External product images",
        text: "Some product photographs load from Unsplash. Your browser sends standard request information to that service when loading those images. Local illustrations are served by this application.",
      },
      {
        title: "Your choices",
        text: "Remove products from your cart and wishlist or clear this site’s browser storage to delete saved shopping preferences. No advertising trackers or analytics are configured.",
      },
    ],
  },
  terms: {
    title: "A few things to know.",
    kicker: "TERMS · DEMO POLICY",
    intro:
      "Michofat Store is currently a demonstration using mock data. These illustrative terms must be reviewed before a public commerce launch.",
    sections: [
      {
        title: "Demo purchases",
        text: "Placing a demo order simulates confirmation and clears the local cart. It does not form a sales contract, collect money or reserve products. Confirmation references are generated locally and cannot be used to track a shipment.",
      },
      {
        title: "Products and pricing",
        text: "All prices, stock counts, ratings, promotions, descriptions and specifications are illustrative. Images are representative and may differ from the named product. Brand names belong to their respective owners.",
      },
      {
        title: "Before going live",
        text: "The operator must provide real business information, accurate inventory, delivery and return policies, reviewed legal terms and secure order and payment integrations.",
      },
    ],
  },
};
export function generateStaticParams() {
  return Object.keys(content).map((page) => ({ page }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const {page}=await params;
  return { title: page === "about" ? "About Us" : content[page]?.title || "Not found" };
}
export default async function InfoPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const data = content[page];
  if (!data) notFound();
  if (page === "about") return <AboutPage />;
  return (
    <div className="container page-space info-page">
      <div className="page-title">
        <span className="eyebrow">{data.kicker}</span>
        <h1>{data.title}</h1>
        <p>{data.intro}</p>
      </div>
      <div id="faq" className="info-sections">
        {data.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.text}</p>
          </section>
        ))}
      </div>
      <div className="info-cta">
        <h2>Still have something on your mind?</h2>
        <Link className="primary-link" href="/contact">
          Talk to our team →
        </Link>
      </div>
    </div>
  );
}
