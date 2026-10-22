import type { Metadata } from "next";
import "./globals.css";
import "./storefront.css";
import { StoreProvider } from "@/components/store-provider";
import { Header, Footer } from "@/components/shell";
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
      <body>
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
