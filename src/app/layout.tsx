import type { Metadata } from "next";
import "./globals.css";
import "./retail.css";
import "./brand.css";
import "./product-template.css";
import "./account.css";
import "./special.css";
import "./journal.css";
import "./journal-detail.css";
import "./cart-toast.css";
import "./cart-template.css";
import "./contact-template.css";
import "./return.css";
import "./footer-about.css";
import "./header-template.css";
import { StoreProvider } from "@/components/store-provider";
import { Header, Footer } from "@/components/retail-shell";
export const metadata: Metadata = {
  title: {
    default: "Michofat Store — Your world, upgraded.",
    template: "%s | Michofat Store",
  },
  description:
    "Discover laptops, phones, accessories, Cisco networking and software at Michofat. A complete ICT store demo.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body id="top">
        <StoreProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
