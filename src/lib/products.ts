export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  stock: number;
  image: string;
  badge?: string;
  description: string;
  specs: Record<string, string>;
};
export const categories = [
  "Laptops & computers",
  "Phones & tablets",
  "Accessories",
  "Networking",
  "Software & security",
  "Monitors & printers",
];
const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
export const products: Product[] = [
  {
    id: "macbook-air-m3",
    name: "MacBook Air 13″ M3",
    brand: "Apple",
    category: categories[0],
    price: 1650000,
    oldPrice: 1820000,
    rating: 4.9,
    reviews: 128,
    stock: 12,
    image: photo("photo-1517336714731-489689fd1ca8"),
    badge: "Bestseller",
    description:
      "Remarkably light. Exceptionally capable. Meet the everyday laptop that makes work, creativity and everything in between feel effortless.",
    specs: {
      Processor: "Apple M3, 8-core CPU",
      Memory: "16 GB unified memory",
      Storage: "512 GB SSD",
      Display: "13.6-inch Liquid Retina",
      Warranty: "1 year manufacturer warranty",
    },
  },
  {
    id: "iphone-16",
    name: "iPhone 16 · 128GB",
    brand: "Apple",
    category: categories[1],
    price: 1280000,
    oldPrice: 1400000,
    rating: 4.8,
    reviews: 86,
    stock: 18,
    image: photo("photo-1592750475338-74b7b21085ab"),
    badge: "New arrival",
    description:
      "A powerful camera, brilliant display and all-day battery in a beautifully crafted phone. Factory unlocked and ready for your network.",
    specs: {
      Storage: "128 GB",
      Display: "6.1-inch Super Retina XDR",
      Camera: "48 MP Fusion camera",
      Connectivity: "5G, Wi-Fi, Bluetooth",
      Warranty: "1 year manufacturer warranty",
    },
  },
  {
    id: "sony-wh1000xm5",
    name: "Sony WH-1000XM5",
    brand: "Sony",
    category: categories[2],
    price: 385000,
    oldPrice: 450000,
    rating: 4.9,
    reviews: 214,
    stock: 24,
    image: photo("photo-1546435770-a3e426bf472b"),
    badge: "Save 14%",
    description:
      "Find your focus with immersive sound and premium noise cancellation. Comfortable enough for your longest playlists and busiest workdays.",
    specs: {
      Type: "Wireless over-ear headphones",
      Battery: "Up to 30 hours",
      Connectivity: "Bluetooth 5.2, USB-C",
      Features: "Active noise cancellation",
      Warranty: "1 year manufacturer warranty",
    },
  },
  {
    id: "cisco-catalyst-9200",
    name: "Cisco Catalyst 9200L",
    brand: "Cisco",
    category: categories[3],
    price: 2150000,
    rating: 4.8,
    reviews: 32,
    stock: 6,
    image: "/products/switch.svg",
    badge: "Business pick",
    description:
      "Build a reliable office network with enterprise-class switching, advanced security and straightforward management. License requirements vary by deployment.",
    specs: {
      Ports: "24 × Gigabit Ethernet",
      Uplinks: "4 × 1G SFP",
      Management: "Cisco IOS XE",
      Form: "1U rack mount",
      Warranty: "1 year store warranty",
    },
  },
  {
    id: "hp-elitebook-840",
    name: "HP EliteBook 840 G11",
    brand: "HP",
    category: categories[0],
    price: 1425000,
    oldPrice: 1550000,
    rating: 4.7,
    reviews: 67,
    stock: 9,
    image: photo("photo-1496181133206-80ce9b88a853"),
    description:
      "Your office, wherever you go. A premium business notebook with the performance and security to keep your team moving.",
    specs: {
      Processor: "Intel Core Ultra 5",
      Memory: "16 GB DDR5",
      Storage: "512 GB SSD",
      Display: "14-inch WUXGA",
      Warranty: "1 year manufacturer warranty",
    },
  },
  {
    id: "samsung-galaxy-s24",
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: categories[1],
    price: 1050000,
    oldPrice: 1180000,
    rating: 4.8,
    reviews: 94,
    stock: 15,
    image: photo("photo-1610945265064-0e34e5519bbf"),
    description:
      "A bright, smooth display, versatile cameras and powerful everyday performance in a pocket-friendly design.",
    specs: {
      Storage: "256 GB",
      Memory: "8 GB RAM",
      Display: "6.2-inch AMOLED",
      Connectivity: "5G, dual SIM",
      Warranty: "1 year manufacturer warranty",
    },
  },
  {
    id: "logitech-mx-master",
    name: "Logitech MX Master 3S",
    brand: "Logitech",
    category: categories[2],
    price: 145000,
    oldPrice: 170000,
    rating: 4.9,
    reviews: 156,
    stock: 30,
    image: photo("photo-1527814050087-3793815479db"),
    description:
      "Work comfortably with precise tracking, quiet clicks and a scroll wheel that moves at your speed.",
    specs: {
      Sensor: "8,000 DPI optical",
      Connectivity: "Bluetooth / Logi Bolt",
      Charging: "USB-C rechargeable",
      Compatibility: "Windows, macOS, Linux",
      Warranty: "1 year manufacturer warranty",
    },
  },
  {
    id: "windows-11-pro",
    name: "Windows 11 Pro",
    brand: "Microsoft",
    category: categories[4],
    price: 185000,
    rating: 4.7,
    reviews: 78,
    stock: 100,
    image: "/products/windows.svg",
    badge: "Digital delivery",
    description:
      "A familiar workspace with business-ready security and productivity tools. Demo listing for a single-device digital license.",
    specs: {
      License: "1 PC",
      Delivery: "Digital license",
      Edition: "Professional",
      Architecture: "64-bit",
      Requirements: "Compatible PC with TPM 2.0",
    },
  },
  {
    id: "bitdefender-total",
    name: "Bitdefender Total Security",
    brand: "Bitdefender",
    category: categories[4],
    price: 38000,
    oldPrice: 45000,
    rating: 4.8,
    reviews: 109,
    stock: 100,
    image: "/products/security.svg",
    badge: "Digital delivery",
    description:
      "Multi-device protection for your work and personal life. Help protect against malware, ransomware and online threats.",
    specs: {
      Devices: "5 devices",
      Term: "1 year",
      Platforms: "Windows, macOS, Android, iOS",
      Delivery: "Digital license",
      Edition: "Total Security",
    },
  },
  {
    id: "cisco-isr-router",
    name: "Cisco ISR 1100 Router",
    brand: "Cisco",
    category: categories[3],
    price: 890000,
    rating: 4.8,
    reviews: 21,
    stock: 8,
    image: "/products/router.svg",
    description:
      "Secure, dependable connectivity for growing teams and branch offices. Contact our team for deployment and license advice.",
    specs: {
      Type: "Integrated services router",
      Ports: "Gigabit Ethernet",
      Security: "VPN capable",
      Use: "Branch office",
      Warranty: "1 year store warranty",
    },
  },
  {
    id: "dell-ultrasharp",
    name: "Dell UltraSharp 27″",
    brand: "Dell",
    category: categories[5],
    price: 620000,
    oldPrice: 680000,
    rating: 4.8,
    reviews: 54,
    stock: 10,
    image: photo("photo-1527443224154-c4a3942d3acf"),
    description:
      "Make room for your best work with crisp detail, accurate color and a spacious 27-inch display.",
    specs: {
      Display: "27-inch QHD IPS",
      Resolution: "2560 × 1440",
      Connectivity: "HDMI, DisplayPort, USB-C",
      Stand: "Height adjustable",
      Warranty: "1 year manufacturer warranty",
    },
  },
  {
    id: "anker-usbc-hub",
    name: "Anker 7-in-1 USB-C Hub",
    brand: "Anker",
    category: categories[2],
    price: 65000,
    rating: 4.6,
    reviews: 88,
    stock: 35,
    image: "/products/hub.svg",
    description:
      "One compact hub, more possibilities. Connect your display, cards and everyday accessories from a single USB-C port.",
    specs: {
      Ports: "7-in-1",
      Video: "HDMI up to 4K",
      Power: "USB-C pass-through",
      Compatibility: "USB-C laptops",
      Warranty: "1 year manufacturer warranty",
    },
  },
];
export const getProduct = (id: string) =>
  products.find((product) => product.id === id);
