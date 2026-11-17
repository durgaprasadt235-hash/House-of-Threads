import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Header } from "@/components/home/header";
import { designerThemeStates, getDesignerThemeState } from "@/data/designer-themes";

export function generateStaticParams() { return designerThemeStates.map((state) => ({ state: state.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> { const state = getDesignerThemeState((await params).state); return state ? { title: `${state.name} Theme Collection | Elphino`, description: state.description } : {}; }

export default async function StateThemePage({ params }: { params: Promise<{ state: string }> }) {
  const state = getDesignerThemeState((await params).state); if (!state) notFound();
  return <main className="min-h-screen bg-[#f6f0e6] text-[#171713]">
    <Header active="Elphino" />
    <section className="bg-[#f6f0e6] px-5 pb-6 pt-[105px] text-[#171713] sm:px-8 lg:px-12 lg:pt-[120px]">
      <div className="mx-auto max-w-[1540px]"><Link className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] hover:text-[#9a6823]" href="/elphino/designer-themes"><ArrowLeft className="size-4" /> All theme concepts</Link><div className="state-header-reveal relative overflow-hidden bg-[#0b151b]"><Image alt={`${state.name} collection header`} className="state-header-image h-auto w-full object-contain" height={768} priority sizes="100vw" src={state.headerImage} width={1795} />{state.slug !== "new-jersey" && <><div className="state-header-shade absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" /><div className="state-header-copy absolute inset-y-0 left-0 flex w-[72%] flex-col justify-center px-[4%] text-white"><p className="state-header-kicker text-[clamp(8px,0.75vw,12px)] font-semibold uppercase tracking-[0.22em] text-[#d9a44b]">{state.region} · {state.tagline}</p><h1 className="state-header-title mt-[2%] font-serif text-[clamp(38px,6vw,92px)] leading-none">{state.name}</h1><p className="state-header-description mt-[2%] max-w-2xl text-[clamp(10px,1vw,16px)] text-white/85">{state.description}</p><p className="state-header-count mt-[4%] text-[clamp(8px,0.85vw,13px)] font-semibold uppercase tracking-[0.24em]">Theme collection in development</p></div></>}<span aria-hidden="true" className="state-header-wipe" /></div></div>
    </section>
    <section className="mx-auto max-w-[1540px] px-5 py-16 sm:px-8 lg:px-12">
      <div className="border-y border-black/15 px-5 py-20 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a6823]">Theme concepts</p>
        <h2 className="mt-3 font-serif text-4xl sm:text-5xl">This theme space is ready for what comes next.</h2>
        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black/60">All state-inspired garments have moved to Regular Collections under Round Necks. This page is intentionally empty while the next theme concept is developed.</p>
        <Link className="mt-8 inline-flex items-center gap-3 bg-black px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#9a6823]" href="/elphino/collections?category=Round%20Necks">Shop round necks <ArrowRight className="size-4" /></Link>
      </div>
    </section>
  </main>;
}
