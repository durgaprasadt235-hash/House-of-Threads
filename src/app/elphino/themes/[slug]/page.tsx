import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/home/header";
import { SiteFooter } from "@/components/site/site-footer";
import { elphinoThemeCollections, getThemeCollection } from "@/data/elphino-theme-collections";

type PageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return elphinoThemeCollections.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: PageProps): Promise<Metadata> { const collection = getThemeCollection((await params).slug); return collection ? { title: `${collection.title} Theme Collection`, description: collection.description } : {}; }

export default async function ThemeCollectionPage({ params }: PageProps) {
  const collection = getThemeCollection((await params).slug);
  if (!collection) notFound();
  return <main className="min-h-screen bg-[#f3ede3] text-[#101820]"><Header active="Elphino" /><section className="px-5 pb-16 pt-[110px] sm:px-8 lg:px-12 lg:pb-24 lg:pt-[130px]"><div className="mx-auto max-w-[1500px]"><Link className="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em]" href="/elphino/themes"><ArrowLeft className="size-4" /> All theme concepts</Link><div className="mt-6 flex flex-col justify-between gap-5 border-b border-black/15 pb-7 md:flex-row md:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b17a2d]">{collection.region} · {collection.category}</p><h1 className="mt-2 font-serif text-[clamp(3.5rem,8vw,7rem)] leading-none">{collection.title}</h1><p className="mt-3 text-sm uppercase tracking-[0.18em] text-black/50">{collection.subtitle}</p></div><div className="max-w-md"><p className="text-sm leading-6 text-black/65">{collection.description}</p><p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em]">{collection.designCount} supplied designs</p></div></div><div className="relative mt-8 aspect-[3/2] overflow-hidden bg-white shadow-xl"><Image alt={`${collection.title} board containing all ${collection.designCount} supplied garment designs`} className="object-contain" fill priority sizes="100vw" src={collection.image} /></div></div></section><SiteFooter /></main>;
}
