# Michofat Store

A standalone, responsive ICT ecommerce demo inspired by Sorex’s blue palette, clear typography and rounded panels. No Sorex runtime, APIs, assets or environment files are required.

## Run locally

Use Node.js 22.19+ and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For production: `npm run build` then `npm start`.

## Stack

Next.js 16.4.2 stable, React 19.3.1, TypeScript, App Router, Tailwind CSS 4, Lucide icons and a shadcn-compatible component setup. `components/ui/button.tsx` follows shadcn's Radix Slot / CVA pattern. Add more components with `npx shadcn@latest add <component>`.

## Included

- Responsive storefront, category shortcuts, featured products, promotions and business enquiry entry points.
- Twelve typed mock products across computers, phones, accessories, Cisco routers/switches, operating systems, antivirus and displays.
- Search by name, brand, category and description; category/brand/price/deal filters; price/rating sorting; useful empty states.
- Individual product routes, specifications, delivery details and related products.
- Browser-persisted cart and wishlist, quantity controls, stock caps and cart recovery from malformed local storage.
- Checkout with required contact/address fields, Nigeria state selection, shipping calculation, digital-only checkout and demo order confirmation.
- Contact page, call/email links, about, delivery/returns/FAQs, privacy and terms pages.
- Keyboard focus, skip link, reduced motion, accessible labels, route metadata, loading/error/404 pages.

## Checks

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

## Code map

- `src/lib/products.ts`: mock catalog, specifications and prices in NGN.
- `src/lib/cart.ts`: cart validation and delivery pricing.
- `src/components/store-provider.tsx`: cart/wishlist state and local storage.
- `src/components/catalog.tsx`: search/filter/sort interface.
- `src/app/globals.css`: brand tokens, layout and responsive breakpoints.
- `public/products/`: self-contained SVG product illustrations. Other representative images load from Unsplash; actual products may differ.

## Demo boundaries / launch checklist

This is a complete storefront demonstration, not a connected commerce backend. Orders are simulated in memory and discarded on navigation; cart and wishlist remain in browser storage. Checkout does not collect card details, charge money, send messages, reserve stock or arrange delivery. Contact and newsletter forms provide local demo feedback only. No user accounts or tracking backend are configured.

Before launch, replace mock products, stock, representative images, ratings and placeholder phone/email/address; configure real shipping and reviewed policies; connect a database/order service, transactional email and a payment provider with server-side price validation and signed webhook verification. Never trust client prices or local stock for real purchases. Add real authentication/order history only when backed by an identity and order service.

Illustrative shipping: physical orders below ₦500,000 cost ₦5,000; physical orders from ₦500,000 are free; digital-only orders are free. Mixed carts follow the physical rule. Displayed prices are treated as tax-inclusive in this demo.

The project can be moved out of its parent folder and initialized as its own Git repository. No parent workspace dependencies or configuration are used.

Dependency audit: production dependencies have no known advisories as checked on 22 October 2026. The development-only Next.js ESLint chain currently reports GHSA-vfj7-8cjw-p6xm through braces; npm has no patched braces release available. Avoid running lint on untrusted glob patterns and recheck upstream updates before launch.
