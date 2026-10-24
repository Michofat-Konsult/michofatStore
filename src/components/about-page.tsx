import Link from "next/link";
import { Home } from "lucide-react";
export function AboutPage() {
  return (
    <div className="container retail-about-page">
      <nav className="brand-breadcrumb" aria-label="Breadcrumb">
        <Link href="/" aria-label="Home">
          <Home size={20} fill="currentColor" />
        </Link>
        <span>/</span>
        <span aria-current="page">About Us</span>
      </nav>
      <article>
        <h1>About Us</h1>
        <p>
          Michofat brings computers, phones, accessories, networking equipment
          and software together in one ICT store, helping you explore the tools
          for your next upgrade.
        </p>
        <section>
          <h2>Technology for work and everyday life</h2>
          <p>
            Choosing technology starts with understanding what you need it to
            do. A laptop for study, a phone for staying connected, or a network
            for a growing team each comes with different requirements.
            Michofat’s catalogue brings these choices into one place, with
            categories for laptops and computers, phones and tablets,
            accessories, Cisco networking, operating systems, antivirus
            software, monitors and printers.
          </p>
          <p>
            Browse by category, search for a particular product, and use price
            and brand filters to narrow your options. Product pages bring
            together descriptions, specifications and availability so you can
            compare the details that matter. Save a shortlist to your wishlist,
            add products to comparison, or keep your selected items in the
            shopping cart while you explore. The aim is a clear shopping
            experience that works comfortably on phones, tablets and larger
            screens.
          </p>
        </section>
        <section>
          <h2>A little guidance for your next upgrade</h2>
          <p>
            The right product should fit the way you work. Think about the
            applications you use, the devices you connect, and the room you need
            to grow. Before choosing a computer, look at memory, storage, screen
            size and ports together. For networking equipment, consider the
            number of connections, your security requirements and how your
            office is organised. Software choices should match your operating
            system, device count and licence requirements.
          </p>
          <p>
            Our journal offers practical starting points for planning a
            workspace and comparing everyday technology. If you are putting
            together a business setup, exploring bulk purchases or checking
            compatibility, the contact page provides a place to describe your
            requirements. Clear product information and useful questions make it
            easier to build a shortlist before making a decision.
          </p>
        </section>
        <section>
          <h2>About this demonstration store</h2>
          <p>
            This standalone Michofat storefront uses mock product data, prices,
            stock levels, ratings and promotional offers. Product photographs
            are representative. The cart and wishlist are saved in your browser,
            while account, contact and returns forms demonstrate the intended
            experience without sending information or creating a live customer
            account. Checkout does not collect payment, reserve stock or arrange
            delivery.
          </p>
          <p>
            Business contact details and policies are placeholders for this
            demonstration. Real inventory, customer support, authentication,
            payment processing and delivery services need to be connected before
            the store accepts live orders. You can explore the catalogue, test
            the shopping journey, and use the{" "}
            <Link href="/contact">contact page</Link> to preview how customers
            will ask for assistance.
          </p>
        </section>
      </article>
    </div>
  );
}
