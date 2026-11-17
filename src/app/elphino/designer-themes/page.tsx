import { ArrowRight, Camera, Feather, Headphones, MoonStar, Palette, PenLine, RefreshCcw, ShieldCheck, Sparkles, Sprout, Truck, Type } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { ThemeStateCatalog } from "@/components/elphino/designer-themes/theme-state-catalog";
import { Header } from "@/components/home/header";
import { designerThemeStates } from "@/data/designer-themes";

export const metadata: Metadata = { title: "Elphino Theme Concepts | The Outfit Co.", description: "Explore state-inspired Elphino artwork as individual premium-cotton designs." };

const concepts = [
  { name: "Urban Legends", copy: "Street vibes. Bold statements.", image: "/assets/elphino/designer-landing/urban-legends.webp", href: "#states" },
  { name: "Botanica Collection", copy: "Inspired by nature. Pure comfort.", image: "/assets/elphino/designer-landing/botanica.webp", href: "/elphino/designer-themes/botanica" },
  { name: "Cosmic Journey", copy: "Explore the universe within.", image: "/assets/elphino/designer-landing/cosmic-journey.webp", href: "/elphino/designer-themes/cosmic-journey" },
  { name: "Zen Samurai", copy: "Minimal. Calm. Powerful.", image: "/assets/elphino/designer-landing/zen-samurai.webp", href: "/elphino/designer-themes/zen-samurai" },
  { name: "GeoCraft", copy: "Geometry meets creativity.", image: "/assets/elphino/designer-landing/geocraft.webp", href: "/elphino/designer-themes/geocraft" },
];

export default function DesignerThemesPage() {
  return <main className="min-h-screen bg-[#f6f0e6]">
    <Header active="Elphino" />
    <section className="relative overflow-hidden bg-[#eee5d8] pt-[78px] text-[#11110f] lg:pt-[92px]">
      <div className="mx-auto grid max-w-[1600px] lg:min-h-[360px] lg:grid-cols-[42%_58%]">
        <div className="relative z-10 flex flex-col justify-center bg-[#f5efe6]/95 px-7 py-12 sm:px-12 lg:px-14 lg:py-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a66d27]">Art meets apparel</p>
          <h1 className="mt-3 font-serif text-[clamp(3.4rem,5.5vw,5.8rem)] leading-[0.86]">Designer<br />Collections</h1>
          <div className="my-5 h-px w-10 bg-[#ba7c2d]" />
          <p className="max-w-sm text-sm leading-6 text-black/65">Premium art-led designs crafted for those who value originality and detail.</p>
          <div className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[[Sparkles,"Exclusive designs"],[Sprout,"Premium cotton"],[Palette,"Vibrant prints"],[ShieldCheck,"Made to last"]].map(([Icon,label]) => <div className="flex items-center gap-2" key={label as string}><Icon className="size-5 shrink-0 text-[#a36c25]" /><span className="text-[8px] font-semibold uppercase leading-4 tracking-[0.11em]">{label as string}</span></div>)}
          </div>
        </div>
        <div className="relative min-h-[310px] lg:min-h-0"><Image alt="Four Elphino designer cotton T-shirts on wooden hangers" className="object-cover" fill priority sizes="(max-width: 1023px) 100vw, 58vw" src="/assets/elphino/designer-landing/hero-shirts.webp" /></div>
      </div>
    </section>
    <section className="bg-[#fbfaf7] px-5 py-7 text-[#171713] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1540px]">
        <div className="flex flex-wrap items-center gap-3 border-b border-black/10 pb-6">
          <button className="border border-black/12 bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-sm" type="button">☰ &nbsp; Filters</button>
          {["Category","Size","Color","Price"].map((label) => <button className="min-w-28 border border-black/10 bg-white px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.1em] shadow-sm" key={label} type="button">{label}<span className="float-right">⌄</span></button>)}
          <button className="ml-auto border border-black/10 bg-white px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] shadow-sm" type="button">Sort by: Newest &nbsp;⌄</button>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {concepts.map((concept) => <article className="overflow-hidden border border-black/10 bg-white shadow-sm" key={concept.name}><div className="relative aspect-[1.28/1] overflow-hidden"><Image alt={`${concept.name} designer artwork`} className="object-cover transition duration-500 hover:scale-[1.02]" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 20vw" src={concept.image} /></div><div className="flex items-end justify-between gap-3 p-4"><div><h2 className="text-sm font-semibold">{concept.name}</h2><p className="mt-1 text-[11px] text-black/55">{concept.copy}</p><p className="mt-1 text-[11px] text-[#b17829]">10 Designs</p></div><Link aria-label={`Explore ${concept.name}`} className="grid size-8 shrink-0 place-items-center rounded-full bg-black text-white" href={concept.href}><ArrowRight className="size-3.5" /></Link></div></article>)}
        </div>
        <div className="mt-6 flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.14em]">Popular categories</p><Link className="text-[10px] font-semibold uppercase tracking-[0.12em]" href="#states">View all categories →</Link></div>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {[[Palette,"Abstract"],[Type,"Typography"],[PenLine,"Illustration"],[Feather,"Line Art"],[Camera,"Vintage"],[MoonStar,"Dark Theme"]].map(([Icon,label]) => <div className="flex min-h-16 items-center gap-3 border border-black/10 bg-white px-4" key={label as string}><Icon className="size-7" /><div><p className="text-xs font-semibold">{label as string}</p><p className="text-[10px] text-black/55">10 Designs</p></div></div>)}
        </div>
      </div>
    </section>
    <ThemeStateCatalog states={designerThemeStates} />
    <section className="bg-[#071018] px-6 py-6 text-white"><div className="mx-auto grid max-w-[1500px] gap-5 sm:grid-cols-2 lg:grid-cols-4">{[[Truck,"Free shipping","On orders over $75"],[RefreshCcw,"Easy returns","30 days return policy"],[ShieldCheck,"Secure payments","100% protected"],[Headphones,"Support 24/7","We're here to help"]].map(([Icon,title,copy]) => <div className="flex items-center gap-4" key={title as string}><Icon className="size-7 text-[#d59a3e]" /><div><p className="text-xs font-semibold uppercase">{title as string}</p><p className="mt-1 text-xs text-white/65">{copy as string}</p></div></div>)}</div></section>
  </main>;
}
