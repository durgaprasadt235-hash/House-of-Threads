"use client";

import { ArrowRight, ChevronDown, Filter, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { elphinoThemeCollections, totalThemeDesigns, type ThemeRegion } from "@/data/elphino-theme-collections";

const regions: ThemeRegion[] = ["All", "Northeast", "South", "Midwest", "West", "Concepts"];
const categories = ["All", "Places", "Nature", "City", "Coast", "Art"] as const;

export function ThemeCatalog() {
  const [region, setRegion] = useState<ThemeRegion>("All");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    const result = elphinoThemeCollections.filter((item) => (region === "All" || item.region === region) && (category === "All" || item.category === category));
    return [...result].sort((a, b) => sort === "a-z" ? a.title.localeCompare(b.title) : sort === "designs" ? b.designCount - a.designCount : Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  }, [category, region, sort]);

  return (
    <>
      <section className="border-y border-black/10 bg-white px-5 py-5 text-black sm:px-8 lg:px-12" id="theme-catalog">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 lg:flex-row lg:items-center">
          <div className="inline-flex min-h-12 items-center gap-3 border border-black/15 px-5 text-[11px] font-semibold uppercase tracking-[0.12em]"><Filter className="size-4" /> Filters</div>
          <Select label="Region" value={region} values={regions} onChange={(value) => setRegion(value as ThemeRegion)} />
          <Select label="Category" value={category} values={categories} onChange={(value) => setCategory(value as (typeof categories)[number])} />
          <button className="inline-flex min-h-12 items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.12em] text-black/55" onClick={() => { setRegion("All"); setCategory("All"); }} type="button"><RotateCcw className="size-3.5" /> Reset</button>
          <div className="lg:ml-auto"><Select label="Sort by" value={sort} values={["featured", "a-z", "designs"]} onChange={setSort} /></div>
        </div>
      </section>

      <section className="bg-[#f7f2e9] px-5 py-14 text-[#101820] sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-black/10 pb-6"><div><p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b17a2d]">{totalThemeDesigns} supplied designs</p><h2 className="mt-2 font-serif text-4xl">Explore every collection</h2></div><p className="text-xs uppercase tracking-[0.14em] text-black/55">Showing {filtered.length} of {elphinoThemeCollections.length} collections</p></div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((collection) => <article className="group overflow-hidden border border-black/10 bg-white shadow-[0_10px_35px_rgba(23,31,35,.06)]" key={collection.slug}><Link className="relative block aspect-[4/3] overflow-hidden bg-[#ded8ce]" href={`/elphino/themes/${collection.slug}`}><Image alt={`${collection.title} collection board showing ${collection.designCount} cotton T-shirt designs`} className="object-cover transition-transform duration-700 group-hover:scale-[1.018]" fill sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" src={collection.image} /><span className="absolute left-3 top-3 bg-[#071018] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">{collection.region}</span></Link><div className="p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#b17a2d]">{collection.subtitle}</p><h3 className="mt-2 text-xl font-semibold">{collection.title}</h3><p className="mt-2 min-h-10 text-xs leading-5 text-black/60">{collection.description}</p><div className="mt-5 flex items-center justify-between border-t border-black/10 pt-4"><span className="text-[10px] font-semibold uppercase tracking-[0.14em]">{collection.designCount} designs</span><Link aria-label={`Open ${collection.title}`} className="grid size-9 place-items-center rounded-full bg-black text-white transition-transform group-hover:translate-x-1" href={`/elphino/themes/${collection.slug}`}><ArrowRight className="size-4" /></Link></div></div></article>)}
          </div>
        </div>
      </section>
    </>
  );
}

function Select({ label, value, values, onChange }: { label: string; value: string; values: readonly string[]; onChange: (value: string) => void }) {
  return <label className="relative inline-flex min-h-12 min-w-40 items-center border border-black/15 px-4"><span className="mr-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-black/45">{label}</span><select className="w-full appearance-none bg-transparent pr-6 text-[10px] font-semibold uppercase tracking-[0.12em] outline-none" onChange={(event) => onChange(event.target.value)} value={value}>{values.map((item) => <option key={item} value={item}>{item}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 size-3.5" /></label>;
}
