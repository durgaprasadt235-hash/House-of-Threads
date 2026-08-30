import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductExperience } from "@/components/elphino/products/product-experience";
import { Header } from "@/components/home/header";
import { SiteFooter } from "@/components/site/site-footer";
import { getActiveElphinoProductIds, getElphinoProductById } from "@/services/catalog";

export async function generateStaticParams() {
  const ids = await getActiveElphinoProductIds();
  return ids.map((id) => ({ id }));
}

type ProductPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getElphinoProductById(id);
  return product ? { title: product.name, description: `${product.name} by Elphino. Choose your size, inspect the cotton artwork, and prepare a private virtual try-on preview.` } : { title: "Elphino Product" };
}

export default async function ElphinoProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getElphinoProductById(id);
  if (!product) notFound();

  return <main className="min-h-screen bg-[#f1eadf] text-[#151515]"><Header active="Elphino" /><ProductExperience product={product} /><SiteFooter /></main>;
}
