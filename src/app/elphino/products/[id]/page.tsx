import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductExperience } from "@/components/elphino/products/product-experience";
import { Header } from "@/components/home/header";
import { SiteFooter } from "@/components/site/site-footer";
import { elphinoProducts } from "@/data/elphino-products";

export function generateStaticParams() {
  return elphinoProducts.map((product) => ({ id: product.id }));
}

type ProductPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = elphinoProducts.find((item) => item.id === id);
  return product ? { title: product.name, description: `${product.name} by Elphino. Choose your size and optional personalized fit profile.` } : { title: "Elphino Product" };
}

export default async function ElphinoProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = elphinoProducts.find((item) => item.id === id);
  if (!product) notFound();

  return <main className="min-h-screen bg-[#f1eadf] text-[#151515]"><Header active="Elphino" /><ProductExperience product={product} /><SiteFooter /></main>;
}
