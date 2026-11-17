import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductOptions } from "@/components/elphino/designer-themes/product-options";
import { Header } from "@/components/home/header";
import { designerThemeStates, getDesignerThemeDesign } from "@/data/designer-themes";

export function generateStaticParams() { return designerThemeStates.flatMap((state) => state.designs.map((design) => ({ state: state.slug, product: design.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ state: string; product: string }> }): Promise<Metadata> { const { state, product } = await params; const found = getDesignerThemeDesign(state, product); return found?.design ? { title: `${found.design.name} | Elphino`, description: `${found.design.theme} artwork on premium cotton.` } : {}; }

export default async function ThemeProductPage({ params }: { params: Promise<{ state: string; product: string }> }) {
  const { state: stateSlug, product } = await params; const found = getDesignerThemeDesign(stateSlug, product); if (!found?.design) notFound(); const { state, design } = found;
  return <main className="min-h-screen bg-[#f6f0e6] text-[#171713]"><Header active="Elphino" /><div className="mx-auto max-w-[1500px] px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pt-36"><Link className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em]" href={`/elphino/designer-themes/${state.slug}`}><ArrowLeft className="size-4" /> Back to {state.name}</Link><div className="mt-9 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20"><div className="relative aspect-[4/5] overflow-hidden bg-[#e3dcd0]"><Image alt={`${design.name} premium cotton T-shirt`} className="object-cover" fill priority sizes="(max-width: 1023px) 100vw, 58vw" src={design.image} /></div><section className="self-center"><p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9b2f4c]">{state.name} · {design.theme}</p><h1 className="mt-4 font-serif text-[clamp(3rem,5vw,5.5rem)] leading-[0.92]">{design.name}</h1><p className="mt-5 text-xl font-semibold">${design.price.toFixed(2)}</p><p className="mt-6 max-w-xl text-base leading-7 text-black/60">Original place-led artwork on soft, breathable premium cotton. Each design is sold as its own garment—not as a poster or multi-shirt board.</p><ProductOptions colors={design.colors} /></section></div></div></main>;
}
