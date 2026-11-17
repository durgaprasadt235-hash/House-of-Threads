"use client";

import { ArrowRight, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { DesignerThemeRegion, DesignerThemeState } from "@/data/designer-themes";

const regions: Array<"All" | DesignerThemeRegion> = ["All", "Northeast", "South", "Midwest", "West"];

export function ThemeStateCatalog({ states }: { states: DesignerThemeState[] }) {
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [sort, setSort] = useState("featured");
  const visible = useMemo(() => {
    const filtered = region === "All" ? states : states.filter((state) => state.region === region);
    return sort === "alphabetical" ? [...filtered].sort((a, b) => a.name.localeCompare(b.name)) : filtered;
  }, [region, sort, states]);

  return (
    <section className="bg-[#f6f0e6] px-5 pb-20 pt-14 text-[#171713] sm:px-8 lg:px-12" id="states">
      <div className="mx-auto max-w-[1540px]">
        <div className="mb-8 border-b border-black/15 pb-7"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a36c25]">Theme concepts</p><h2 className="mt-2 font-serif text-[clamp(2.8rem,5vw,5rem)] leading-none">Explore the states.</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-black/55">Choose a state to open its ten individual, place-inspired cotton designs.</p></div>
        <div className="flex flex-col justify-between gap-5 border-b border-black/15 pb-7 lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]"><SlidersHorizontal className="size-4" /> Filter</span>
            {regions.map((item) => <button className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${region === item ? "border-black bg-black text-white" : "border-black/20 bg-transparent hover:border-black"}`} key={item} onClick={() => setRegion(item)} type="button">{item}</button>)}
          </div>
          <label className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.16em]">Sort by
            <select className="border border-black/20 bg-transparent px-4 py-2 outline-none" onChange={(event) => setSort(event.target.value)} value={sort}><option value="featured">Featured</option><option value="alphabetical">Alphabetical</option></select>
          </label>
        </div>

        <p className="mb-7 mt-8 text-xs uppercase tracking-[0.18em] text-black/55">{visible.length} state theme spaces · collections coming soon</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
          {visible.map((state) => (
            <article className="state-card group" key={state.slug}>
              <Link aria-label={`Explore ${state.name}`} className="state-card-link block" href={`/elphino/designer-themes/${state.slug}`}>
                <div className="state-card-media relative aspect-[1795/768] overflow-hidden bg-[#0b151b]">
                  <Image alt={`${state.name} collection landscape`} className="state-card-image object-contain" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1535px) 33vw, 17vw" src={state.cardImage} />
                  <span aria-hidden="true" className="state-card-glint" />
                </div>
                <div className="min-h-52 border border-t-0 border-black/10 bg-[#fbf8f1] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9a6823]">{state.tagline}</p>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div><h2 className="font-serif text-2xl leading-none">{state.name}</h2><p className="mt-2 text-xs leading-5 text-black/60">{state.description}</p><p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em]">Theme space · Coming soon</p></div>
                    <span className="state-card-arrow grid size-9 shrink-0 place-items-center rounded-full bg-black text-white"><ArrowRight className="size-3.5" /></span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
