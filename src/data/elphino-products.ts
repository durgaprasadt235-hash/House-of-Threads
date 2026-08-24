export const categoryOrder = ["Polos", "Round Necks", "Shirts", "Hoodies", "Jeans", "Trousers"] as const;
export type ProductCategory = (typeof categoryOrder)[number];

export const categoryStyles: Record<ProductCategory, string[]> = {
  Polos: ["Classic", "Colorblock", "Textured", "Printed", "Minimal"],
  "Round Necks": ["Plain", "Printed", "Graphic", "Oversized", "Minimal"],
  Shirts: ["Casual", "Plain", "Printed", "Pattern", "Designer"],
  Hoodies: ["Pullover", "Zip", "Printed", "Minimal"],
  Jeans: ["Slim", "Straight", "Relaxed", "Stretch"],
  Trousers: ["Casual", "Chino", "Straight", "Stretch"],
};

export const categoryImages: Record<ProductCategory, string> = {
  Polos: "/images/elphino/collections/product-polo-sage-v3.png",
  "Round Necks": "/images/elphino/collections/product-tee-cream-v3.png",
  Shirts: "/images/elphino/collections/product-shirt-yellow-v3.png",
  Hoodies: "/images/elphino/collections/product-hoodie-rust-v3.png",
  Jeans: "/images/elphino/collections/product-jeans-ecru-v3.png",
  Trousers: "/images/elphino/collections/product-trousers-olive-v3.png",
};

const productImages = {
  sagePolo: "/images/elphino/collections/product-polo-sage-v3.png",
  lavenderPolo: "/images/elphino/collections/product-polo-lavender-v3.png",
  creamTee: "/images/elphino/collections/product-tee-cream-v3.png",
  cobaltTee: "/images/elphino/collections/product-tee-cobalt-v3.png",
  yellowShirt: "/images/elphino/collections/product-shirt-yellow-v3.png",
  tealShirt: "/images/elphino/collections/product-shirt-teal-v3.png",
  rustHoodie: "/images/elphino/collections/product-hoodie-rust-v3.png",
  ecruJeans: "/images/elphino/collections/product-jeans-ecru-v3.png",
  oliveTrousers: "/images/elphino/collections/product-trousers-olive-v3.png",
} as const;

export type ElphinoProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  style: string;
  price: number;
  colors: string[];
  sizes: string[];
  fit: "Slim" | "Regular" | "Relaxed" | "Oversized";
  image: string;
  status?: "NEW" | "LIMITED";
  inStock: boolean;
  createdRank: number;
};

// Development-only fixtures. Replace with active Neon inventory before launch.
export const elphinoProducts: ElphinoProduct[] = [
  { id: "dev-polo-01", name: "Elphino Sage Line Polo", category: "Polos", style: "Minimal", price: 20, colors: ["Sage"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "Regular", image: productImages.sagePolo, status: "NEW", inStock: true, createdRank: 9 },
  { id: "dev-polo-02", name: "Elphino Lavender Block Polo", category: "Polos", style: "Colorblock", price: 22, colors: ["Lavender", "Teal"], sizes: ["M", "L", "XL"], fit: "Slim", image: productImages.lavenderPolo, inStock: true, createdRank: 5 },
  { id: "dev-tee-01", name: "Elphino Offset Form Tee", category: "Round Necks", style: "Graphic", price: 18, colors: ["Cream", "Cobalt"], sizes: ["S", "M", "L", "XL"], fit: "Oversized", image: productImages.creamTee, status: "NEW", inStock: true, createdRank: 8 },
  { id: "dev-tee-02", name: "Elphino Shoulder Sketch Tee", category: "Round Necks", style: "Minimal", price: 19, colors: ["Cobalt"], sizes: ["S", "M", "L"], fit: "Relaxed", image: productImages.cobaltTee, inStock: false, createdRank: 3 },
  { id: "dev-shirt-01", name: "Elphino Micro Mark Cotton Shirt", category: "Shirts", style: "Printed", price: 22, colors: ["Butter Yellow"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "Regular", image: productImages.yellowShirt, status: "NEW", inStock: true, createdRank: 7 },
  { id: "dev-shirt-02", name: "Elphino Sunset Panel Shirt", category: "Shirts", style: "Designer", price: 24, colors: ["Teal", "Coral"], sizes: ["M", "L", "XL"], fit: "Relaxed", image: productImages.tealShirt, inStock: true, createdRank: 2 },
  { id: "dev-hoodie-01", name: "Elphino Contour Cotton Hoodie", category: "Hoodies", style: "Minimal", price: 25, colors: ["Rust"], sizes: ["S", "M", "L", "XL"], fit: "Relaxed", image: productImages.rustHoodie, status: "LIMITED", inStock: true, createdRank: 6 },
  { id: "dev-jean-01", name: "Elphino Cobalt-Seam Jean", category: "Jeans", style: "Straight", price: 25, colors: ["Ecru"], sizes: ["W28/L30", "W30/L30", "W32/L32", "W34/L32", "W36/L34"], fit: "Regular", image: productImages.ecruJeans, status: "NEW", inStock: true, createdRank: 4 },
  { id: "dev-trouser-01", name: "Elphino Artisan Stitch Trouser", category: "Trousers", style: "Straight", price: 24, colors: ["Olive"], sizes: ["W28/L30", "W30/L30", "W32/L32", "W34/L32", "W36/L34"], fit: "Regular", image: productImages.oliveTrousers, inStock: true, createdRank: 1 },
];

export const colorHex: Record<string, string> = {
  Sage: "#9aa58a", Lavender: "#a991b7", Teal: "#08737a", Cream: "#eee5d3", Cobalt: "#1557c0", "Butter Yellow": "#f4d878", Coral: "#e77866", Rust: "#a8492f", Ecru: "#e8dfcc", Olive: "#68704b",
};
