"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Feather, PackageCheck, ShieldCheck, Sparkles, Wind } from "lucide-react";

import { WalkerSeasonalHero } from "@/components/walker/walker-seasonal-hero";

const categories = [
  { slug:"trousers", name:"Trousers", copy:"Tailored comfort for every day.", image:"/images/walker/categories/trousers.webp" },
  { slug:"shirts", name:"Shirts", copy:"Refined styles for every moment.", image:"/images/walker/categories/shirts.webp" },
  { slug:"polos", name:"Polos", copy:"Smart essentials. Effortless style.", image:"/images/walker/categories/polos.webp" },
  { slug:"jackets", name:"Jackets", copy:"Layer up. Look sharp.", image:"/images/walker/categories/jackets.webp" },
  { slug:"accessories", name:"Accessories", copy:"The finishing touches.", image:"/images/walker/categories/accessories.webp" },
] as const;

const promises = [
  [Feather,"No itching","Soft, skin-friendly fabrics designed for comfortable wear."],
  [Sparkles,"No sharp threads","Clean finishing with no harsh or exposed thread edges."],
  [Wind,"Feel comfort","Light, breathable and designed for all-day comfort."],
  [ShieldCheck,"No static","Designed to reduce unwanted static during wear."],
  [Check,"Color & fade protection","Eligible shade or fade concerns within three months of the original purchase may qualify."],
  [PackageCheck,"Shrinkage protection","Eligible shrinkage within the same three-month original purchase window may qualify."],
] as const;

export function WalkerLanding() {
  return <main className="bg-[#f2eee6] text-[#171612]">
    <WalkerSeasonalHero />

    <section className="mx-auto max-w-[1540px] px-5 py-16 sm:px-8 lg:px-10" id="shop-by-category">
      <div className="mb-8 flex items-end justify-between"><div><p className="text-[11px] uppercase tracking-[.24em] text-[#9a6623]">The essentials</p><h2 className="mt-2 font-serif text-4xl sm:text-5xl">Shop by category</h2></div><p className="hidden max-w-sm text-sm text-stone-600 md:block">A focused wardrobe for work, travel and everything between.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{categories.map((c,i)=><Link className={`group overflow-hidden bg-white ${i===4?"sm:col-span-2 lg:col-span-1":""}`} href={`/walker/collections?category=${c.slug}`} key={c.slug}><div className="relative aspect-[4/3] overflow-hidden"><Image alt={`${c.name} collection`} className="object-cover transition duration-700 group-hover:scale-[1.035]" fill sizes="(min-width:1024px) 20vw, 50vw" src={c.image}/></div><div className="p-5"><p className="font-serif text-2xl">{c.name}</p><p className="mt-2 min-h-10 text-sm text-stone-600">{c.copy}</p><span className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.18em]">Explore <ArrowRight className="size-3"/></span></div></Link>)}</div>
    </section>

    <section className="bg-[#0a0b0b] px-5 py-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1540px]"><h2 className="text-center font-serif text-3xl uppercase sm:text-4xl">Our promise. Your confidence.</h2><div className="mx-auto mt-4 h-px w-16 bg-[#d5a25d]"/><div className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">{promises.map(([Icon,title,copy])=><article className="bg-[#0a0b0b] p-7" key={title}><Icon className="size-7 text-[#d6a550]"/><h3 className="mt-5 text-xs uppercase tracking-[.16em]">{title}</h3><p className="mt-3 text-sm leading-6 text-white/65">{copy}</p></article>)}</div><div className="mt-10 border border-[#d5a25d]/55 p-6 text-center"><p className="font-serif text-2xl">Peace-of-mind replacement</p><p className="mx-auto mt-3 max-w-4xl text-sm leading-6 text-white/68">Up to two eligible replacements may be requested after the original purchase. All requests must fall within three months of that original purchase date; the clock does not restart after a replacement. A request made on the final eligible day may still qualify.</p></div></div>
    </section>

    <section className="mx-auto max-w-[1540px] px-5 py-16 sm:px-8 lg:px-10"><p className="text-[11px] uppercase tracking-[.24em] text-[#9a6623]">Collection preview</p><h2 className="mt-2 font-serif text-4xl">New arrivals</h2><div className="mt-8 grid gap-4 sm:grid-cols-3">{categories.slice(0,3).map(c=><article className="border border-stone-300 bg-[#ece6db] p-7" key={c.slug}><div className="relative aspect-[4/3]"><Image alt="Development preview" className="object-cover grayscale-[.15]" fill sizes="33vw" src={c.image}/></div><p className="mt-5 text-[10px] uppercase tracking-[.18em] text-[#9a6623]">Development preview</p><h3 className="mt-2 font-serif text-2xl">{c.name} / Edition 01</h3><p className="mt-2 text-sm text-stone-600">Final product details and availability are being prepared.</p></article>)}</div></section>
    <div className="grid border-y border-stone-300 bg-white text-center text-[10px] uppercase tracking-[.14em] sm:grid-cols-5">{["Shipping information","Return support","Secure checkout","Quality reviewed","Customer support"].map(x=><span className="border-stone-300 px-4 py-5 sm:border-r" key={x}>{x}</span>)}</div>
    <footer className="bg-[#080909] px-6 py-10 text-white/65"><div className="mx-auto flex max-w-[1540px] flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"><div><p className="font-serif text-2xl text-white">The Walker Company</p><p className="mt-1 text-xs">An Outfit Co. brand.</p></div><div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[.16em]"><Link href="/">The Outfit Co.</Link><Link href="/elphino/collections">Elphino</Link><Link href="#shop-by-category">Collections</Link><span>Customer support</span></div></div></footer>
  </main>;
}
