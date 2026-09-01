"use client";

import { Check, ChevronDown, Heart, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { categoryImages, categoryOrder, categoryStyles, colorHex, type ProductCategory } from "@/data/elphino-constants";
import type { StorefrontProductDto } from "@/services/types";

type Filters = { category: string; style: string; size: string; color: string; fit: string; price: string; availability: string };
type FilterKey = keyof Filters;
const emptyFilters: Filters = { category: "", style: "", size: "", color: "", fit: "", price: "", availability: "" };
const topSizes = ["S", "M", "L", "XL", "XXL"];
const waistSizes = ["28", "30", "32", "34", "36", "38", "40"];
const lengths = ["28", "30", "32", "34"];
const fits = ["Slim", "Regular", "Relaxed", "Oversized"];

export function CollectionsCatalog({ initialFilters, products }: { initialFilters: Partial<Filters>; products: StorefrontProductDto[] }) {
  const [filters, setFilters] = useState<Filters>({ ...emptyFilters, ...initialFilters });
  const [sort, setSort] = useState("featured");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const colors = useMemo(() => Array.from(new Set(products.flatMap((product) => product.colors))), [products]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => { if (value) params.set(key, value); });
    if (sort !== "featured") params.set("sort", sort);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }, [filters, sort]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setDrawerOpen(false); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKeyDown); };
  }, [drawerOpen]);

  const setFilter = (key: FilterKey, value: string) => {
    setFilters((current) => {
      const next = { ...current, [key]: current[key] === value ? "" : value };
      if (key === "category") { next.style = ""; next.size = ""; }
      return next;
    });
  };

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      if (filters.category && product.category !== filters.category) return false;
      if (filters.style && product.style !== filters.style) return false;
      if (filters.fit && product.fit !== filters.fit) return false;
      if (filters.availability === "in-stock" && !product.inStock) return false;
      if (filters.availability === "out-of-stock" && product.inStock) return false;
      if (filters.size || filters.color) {
        const hasMatchingVariant = product.variants.some((v) => {
          if (!v.isAvailable) return false;
          const sizeMatches = !filters.size || v.size === filters.size || v.size.includes(`W${filters.size}/`) || v.size.endsWith(`/L${filters.size}`);
          const colorMatches = !filters.color || v.color === filters.color;
          return sizeMatches && colorMatches;
        });
        if (!hasMatchingVariant) return false;
      }
      if (filters.price === "under-20" && product.price >= 20) return false;
      if (filters.price === "20-22" && (product.price < 20 || product.price > 22)) return false;
      if (filters.price === "23-25" && product.price < 23) return false;
      return true;
    });
    return [...result].sort((a, b) =>
      sort === "newest"
        ? b.createdRank - a.createdRank
        : sort === "price-low"
          ? a.price - b.price
          : sort === "price-high"
            ? b.price - a.price
            : Number(Boolean(b.status || b.badge)) - Number(Boolean(a.status || a.badge))
    );
  }, [filters, products, sort]);

  const activeFilters = Object.entries(filters).filter((entry): entry is [FilterKey, string] => Boolean(entry[1]));
  const newDrops = useMemo(() => [...products].sort((a, b) => b.createdRank - a.createdRank).slice(0, 4), [products]);

  return (
    <>
      <CategorySection selected={filters.category} onSelect={(category) => setFilter("category", category)} />

      <section className="border-y border-white/10 bg-[#090a0a] px-5 py-20 sm:px-8 lg:px-12" id="new-drops">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#23c4cb]">Fresh expression</p><h2 className="mt-2 text-3xl font-medium uppercase tracking-[0.16em] sm:text-4xl">New Drops</h2></div>
            <div className="max-w-md sm:text-right"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#e9b85f]">Style without the markup.</p><p className="mt-2 text-sm text-white/75">Designed to stand out. Priced to stay within reach.</p></div>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">{newDrops.map((product) => <ProductCard key={product.id} product={product} />)}</div>
          <a className="mt-10 inline-flex min-h-12 items-center border-b border-[#23c4cb] text-xs font-semibold uppercase tracking-[0.18em] text-[#58dce1]" href="#catalog">View all new drops <span aria-hidden="true" className="ml-3">→</span></a>
        </div>
      </section>

      <section className="bg-[#f1eadf] px-5 py-16 text-[#151515] sm:px-8 lg:px-12 lg:py-20" id="catalog">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-5 border-b border-black/15 pb-7 sm:flex-row sm:items-end">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#8f3047]">Development catalog</p><h2 className="mt-2 text-3xl font-medium uppercase tracking-[0.12em] sm:text-4xl">Shop Elphino — {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"}</h2></div>
            <div className="flex gap-3 lg:hidden"><button className="inline-flex min-h-11 items-center gap-2 border border-black/40 px-4 text-[11px] font-semibold uppercase tracking-[0.15em]" onClick={() => setDrawerOpen(true)} type="button"><SlidersHorizontal className="size-4" /> Filter</button><SortSelect sort={sort} setSort={setSort} /></div>
            <div className="hidden lg:block"><SortSelect sort={sort} setSort={setSort} /></div>
          </div>

          {activeFilters.length ? <div aria-label="Active filters" className="flex flex-wrap items-center gap-2 border-b border-black/10 py-4">{activeFilters.map(([key, value]) => <button className="inline-flex min-h-9 items-center gap-2 border border-black/25 px-3 text-[10px] font-semibold uppercase tracking-[0.12em]" key={key} onClick={() => setFilter(key, value)} type="button">{key === "availability" ? value.replace("-", " ") : value}<X className="size-3" /></button>)}<button className="min-h-9 px-2 text-[10px] font-semibold uppercase tracking-[0.12em] underline underline-offset-4" onClick={() => setFilters(emptyFilters)} type="button">Clear all</button></div> : null}

          <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
            <aside className="hidden lg:block"><FilterPanel clear={() => setFilters(emptyFilters)} colors={colors} filters={filters} products={products} setFilter={setFilter} /></aside>
            <div>
              {filteredProducts.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-9 md:grid-cols-3 md:gap-x-5 xl:grid-cols-4">{filteredProducts.map((product) => <ProductCard light key={product.id} product={product} />)}</div> : <div className="grid min-h-96 place-items-center border border-black/15 text-center"><div><h3 className="font-serif text-3xl">Nothing matches those filters yet.</h3><button className="mt-6 border-b border-black pb-1 text-xs font-semibold uppercase tracking-[0.18em]" onClick={() => setFilters(emptyFilters)} type="button">Clear filters</button></div></div>}
            </div>
          </div>
        </div>
      </section>

      {drawerOpen ? <div aria-modal="true" className="fixed inset-0 z-[70] bg-black/65 lg:hidden" role="dialog"><div className="absolute inset-y-0 right-0 w-[min(92vw,420px)] overflow-y-auto bg-[#f1eadf] p-6 text-black"><div className="flex items-center justify-between border-b border-black/15 pb-5"><h2 className="text-lg font-semibold uppercase tracking-[0.16em]">Filter pieces</h2><button aria-label="Close filters" className="grid size-11 place-items-center" onClick={() => setDrawerOpen(false)} type="button"><X /></button></div><div className="mt-6"><FilterPanel clear={() => setFilters(emptyFilters)} colors={colors} filters={filters} products={products} setFilter={setFilter} /></div><button className="sticky bottom-4 mt-8 min-h-12 w-full bg-black px-5 text-xs font-semibold uppercase tracking-[0.18em] text-white" onClick={() => setDrawerOpen(false)} type="button">View {filteredProducts.length} pieces</button></div></div> : null}
    </>
  );
}

function CategorySection({ selected, onSelect }: { selected: string; onSelect: (category: string) => void }) {
  return <section className="bg-[#070808] px-5 py-20 sm:px-8 lg:px-12" id="categories"><div className="mx-auto max-w-[1500px]"><div className="mb-9 flex items-end justify-between"><div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e9b85f]">Start with a silhouette</p><h2 className="mt-2 text-3xl font-medium uppercase tracking-[0.15em] sm:text-4xl">Shop by category</h2></div><span className="hidden text-xs uppercase tracking-[0.18em] text-white/70 sm:block">Six ways in</span></div><div className="category-mosaic grid auto-rows-[210px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-12 lg:auto-rows-[290px]">{categoryOrder.map((category, index) => <button aria-pressed={selected === category} className={`category-tile category-tile-${index + 1} group relative overflow-hidden border text-left ${selected === category ? "border-[#23c4cb]" : "border-white/10"}`} key={category} onClick={() => { onSelect(category); document.querySelector("#catalog")?.scrollIntoView({ behavior: "smooth" }); }} type="button"><Image alt={`${category} collection editorial`} className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" fill sizes="(max-width: 767px) 50vw, 33vw" src={categoryImages[category]} /><span className="absolute inset-0 bg-gradient-to-t from-black via-black/5 to-transparent" /><span className="absolute inset-x-0 bottom-0 p-5"><span className="block h-px w-7 bg-[#23c4cb] transition-all duration-500 group-hover:w-14" /><span className="mt-3 block text-lg font-semibold uppercase tracking-[0.16em] transition-transform duration-500 group-hover:translate-x-1 sm:text-2xl">{category}</span><span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-white/75">{categoryStyles[category].slice(0, 3).join(" · ")}</span></span></button>)}</div></div></section>;
}

function ProductCard({ product, light = false }: { product: StorefrontProductDto; light?: boolean }) {
  const href = `/elphino/products/${product.id}`;
  const badge = product.badge || product.status;
  return <article className={`group min-w-0 ${light ? "text-black" : "text-white"}`}><div className={`relative aspect-[3/4] overflow-hidden ${product.backImage ? "bg-[#252525]" : "bg-[#ddd6ca]"}`}><Link aria-label={`View ${product.name}`} className="absolute inset-0" href={href}><Image alt={`${product.name} front view`} className={`${product.backImage ? "garment-card-front object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.015]`} fill sizes="(max-width: 479px) 50vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, (max-width: 1919px) 23vw, 360px" src={product.image} />{product.backImage ? <Image alt={`${product.name} back view`} className="garment-card-back object-contain transition-transform duration-700 group-hover:scale-[1.015]" fill sizes="(max-width: 479px) 50vw, (max-width: 767px) 46vw, (max-width: 1279px) 31vw, (max-width: 1919px) 23vw, 360px" src={product.backImage} /> : null}</Link>{badge ? <span className="pointer-events-none absolute left-3 top-3 bg-black px-2.5 py-1 text-[9px] font-semibold tracking-[0.16em] text-white">{badge}</span> : null}<button aria-label={`Save ${product.name} to wishlist`} className="absolute right-2 top-2 z-10 grid size-11 place-items-center rounded-full bg-black/60 text-white backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#23c4cb]" type="button"><Heart className="size-4" /></button></div><div className="pt-4"><p className={`text-[9px] font-semibold uppercase tracking-[0.18em] ${light ? "text-black/70" : "text-white/70"}`}>{product.designConcept || product.category} · {product.designTechnique || product.style}</p><h3 className="mt-1 truncate text-sm font-medium sm:text-base"><Link className="underline-offset-4 hover:underline" href={href}>{product.name}</Link></h3><div className="mt-2 flex items-center justify-between gap-2"><span className="text-sm font-semibold">${product.price.toFixed(2)}</span><span aria-label={`Available colors: ${product.colors.join(", ")}`} className="flex items-center gap-1.5">{product.colors.map((color) => <span className={`size-3.5 rounded-full border ${light ? "border-black/25" : "border-white/30"}`} key={color} style={{ backgroundColor: colorHex[color] }} title={color} />)}</span></div><p className={`mt-2 truncate text-[10px] uppercase tracking-[0.08em] ${light ? "text-black/70" : "text-white/70"}`}>{product.sizes.slice(0, 4).join("  ")}{product.sizes.length > 4 ? "  +" : ""}</p>{product.backImage ? <p className={`mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] ${light ? "text-black/55" : "text-white/55"}`}>Hover for front + back · tap to open</p> : null}{!product.inStock ? <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f3047]">Out of stock</p> : null}</div></article>;
}

function FilterPanel({ filters, setFilter, clear, products, colors }: { filters: Filters; setFilter: (key: FilterKey, value: string) => void; clear: () => void; products: StorefrontProductDto[]; colors: string[] }) {
  const category = categoryOrder.includes(filters.category as ProductCategory) ? filters.category as ProductCategory : null;
  const isBottoms = category === "Jeans" || category === "Trousers";
  return <div className="space-y-1"><div className="mb-4 flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.16em]">Filters</span><button className="text-[10px] uppercase tracking-[0.12em] underline underline-offset-4" onClick={clear} type="button">Clear</button></div><FilterGroup label="Category">{categoryOrder.map((value) => <FilterOption checked={filters.category === value} key={value} label={value} onClick={() => setFilter("category", value)} />)}</FilterGroup><FilterGroup label="Style">{(category ? categoryStyles[category] : Array.from(new Set(products.map((product) => product.style)))).map((value) => <FilterOption checked={filters.style === value} key={value} label={value} onClick={() => setFilter("style", value)} />)}</FilterGroup><FilterGroup label="Size">{isBottoms ? <><p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-black/65">Waist</p><div className="mb-4 flex flex-wrap gap-2">{waistSizes.map((value) => <SizeButton active={filters.size === value} key={value} label={value} onClick={() => setFilter("size", value)} />)}</div><p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-black/65">Length</p><div className="flex flex-wrap gap-2">{lengths.map((value) => <SizeButton active={filters.size === value} key={value} label={`L${value}`} onClick={() => setFilter("size", value)} />)}</div></> : <div className="flex flex-wrap gap-2">{topSizes.map((value) => <SizeButton active={filters.size === value} key={value} label={value} onClick={() => setFilter("size", value)} />)}</div>}</FilterGroup><FilterGroup label="Color">{colors.map((value) => <button aria-pressed={filters.color === value} className="flex min-h-10 w-full items-center gap-3 text-xs" key={value} onClick={() => setFilter("color", value)} type="button"><span aria-hidden="true" className="size-4 border border-black/30" style={{ background: colorHex[value] }} /><span>{value}</span>{filters.color === value ? <Check className="ml-auto size-3" /> : null}</button>)}</FilterGroup><FilterGroup label="Fit">{fits.map((value) => <FilterOption checked={filters.fit === value} key={value} label={value} onClick={() => setFilter("fit", value)} />)}</FilterGroup><FilterGroup label="Price">{[["under-20", "Under $20"], ["20-22", "$20–$22"], ["23-25", "$23–$25"]].map(([value, label]) => <FilterOption checked={filters.price === value} key={value} label={label} onClick={() => setFilter("price", value)} />)}</FilterGroup><FilterGroup label="Availability"><FilterOption checked={filters.availability === "in-stock"} label="In Stock" onClick={() => setFilter("availability", "in-stock")} /><FilterOption checked={filters.availability === "out-of-stock"} label="Out of Stock" onClick={() => setFilter("availability", "out-of-stock")} /></FilterGroup></div>;
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) { return <details className="border-t border-black/15 py-1" open><summary className="flex min-h-12 cursor-pointer list-none items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]">{label}<ChevronDown className="size-4" /></summary><div className="pb-4">{children}</div></details>; }
function FilterOption({ checked, label, onClick }: { checked: boolean; label: string; onClick: () => void }) { return <button aria-pressed={checked} className="flex min-h-9 w-full items-center gap-3 text-left text-xs" onClick={onClick} type="button"><span className={`grid size-4 place-items-center border ${checked ? "border-black bg-black text-white" : "border-black/35"}`}>{checked ? <Check className="size-3" /> : null}</span>{label}</button>; }
function SizeButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) { return <button aria-pressed={active} className={`grid min-h-10 min-w-10 place-items-center border px-2 text-[10px] font-semibold ${active ? "border-black bg-black text-white" : "border-black/25"}`} onClick={onClick} type="button">{label}</button>; }
function SortSelect({ sort, setSort }: { sort: string; setSort: (sort: string) => void }) { return <label className="relative inline-flex min-h-11 items-center border border-current/30 px-3"><span className="sr-only">Sort products</span><select className="appearance-none bg-transparent pr-7 text-[10px] font-semibold uppercase tracking-[0.12em] outline-none" onChange={(event) => setSort(event.target.value)} value={sort}><option value="featured">Featured</option><option value="newest">Newest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select><ChevronDown aria-hidden="true" className="pointer-events-none absolute right-2 size-3" /></label>; }
