export const categoryOrder = ["Polos", "Round Necks", "Shirts", "Hoodies", "Jeans", "Trousers"] as const;
export type ProductCategory = (typeof categoryOrder)[number];

export const categoryStyles: Record<ProductCategory, string[]> = {
  Polos: ["Classic", "Printed", "Textured", "Performance", "Minimal"],
  "Round Necks": ["Plain", "Printed", "Graphic", "Oversized", "Minimal"],
  Shirts: ["Casual", "Plain", "Printed", "Pattern", "Designer"],
  Hoodies: ["Pullover", "Zip", "Printed", "Minimal"],
  Jeans: ["Slim", "Straight", "Relaxed", "Stretch"],
  Trousers: ["Casual", "Chino", "Straight", "Stretch"],
};

export const categoryImages: Record<ProductCategory, string> = {
  Polos: "/images/elphino/collections/polo.png",
  "Round Necks": "/images/elphino/collections/round-neck.png",
  Shirts: "/images/elphino/collections/shirt.png",
  Hoodies: "/images/elphino/collections/hoodie.png",
  Jeans: "/images/elphino/collections/jeans.png",
  Trousers: "/images/elphino/collections/trousers.png",
};

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
  { id: "dev-polo-01", name: "Elphino Essential Polo", category: "Polos", style: "Classic", price: 20, colors: ["Black", "Navy"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "Regular", image: categoryImages.Polos, status: "NEW", inStock: true, createdRank: 9 },
  { id: "dev-polo-02", name: "Elphino Printed Motion Polo", category: "Polos", style: "Printed", price: 22, colors: ["Black", "Olive"], sizes: ["M", "L", "XL"], fit: "Slim", image: categoryImages.Polos, inStock: true, createdRank: 5 },
  { id: "dev-tee-01", name: "Elphino Abstract Round Neck", category: "Round Necks", style: "Graphic", price: 18, colors: ["Black", "White"], sizes: ["S", "M", "L", "XL"], fit: "Oversized", image: categoryImages["Round Necks"], status: "NEW", inStock: true, createdRank: 8 },
  { id: "dev-tee-02", name: "Elphino Canvas Graphic Tee", category: "Round Necks", style: "Printed", price: 19, colors: ["Black", "Gray"], sizes: ["S", "M", "L"], fit: "Relaxed", image: categoryImages["Round Necks"], inStock: false, createdRank: 3 },
  { id: "dev-shirt-01", name: "Elphino Everyday Shirt", category: "Shirts", style: "Casual", price: 22, colors: ["White", "Beige"], sizes: ["S", "M", "L", "XL", "XXL"], fit: "Regular", image: categoryImages.Shirts, status: "NEW", inStock: true, createdRank: 7 },
  { id: "dev-shirt-02", name: "Elphino Pattern Shirt", category: "Shirts", style: "Pattern", price: 24, colors: ["White", "Navy"], sizes: ["M", "L", "XL"], fit: "Relaxed", image: categoryImages.Shirts, inStock: true, createdRank: 2 },
  { id: "dev-hoodie-01", name: "Elphino Core Hoodie", category: "Hoodies", style: "Minimal", price: 25, colors: ["Black", "Gray"], sizes: ["S", "M", "L", "XL"], fit: "Relaxed", image: categoryImages.Hoodies, status: "LIMITED", inStock: true, createdRank: 6 },
  { id: "dev-jean-01", name: "Elphino Straight Stretch Jean", category: "Jeans", style: "Stretch", price: 25, colors: ["Navy", "Black"], sizes: ["W28/L30", "W30/L30", "W32/L32", "W34/L32", "W36/L34"], fit: "Regular", image: categoryImages.Jeans, status: "NEW", inStock: true, createdRank: 4 },
  { id: "dev-trouser-01", name: "Elphino Everyday Trouser", category: "Trousers", style: "Straight", price: 24, colors: ["Beige", "Brown", "Black"], sizes: ["W28/L30", "W30/L30", "W32/L32", "W34/L32", "W36/L34"], fit: "Regular", image: categoryImages.Trousers, inStock: true, createdRank: 1 },
];

export const colorHex: Record<string, string> = {
  Black: "#111111", White: "#f4f1e8", Navy: "#16283f", Beige: "#c8aa7b", Olive: "#5f6243", Gray: "#777777", Brown: "#604434",
};
