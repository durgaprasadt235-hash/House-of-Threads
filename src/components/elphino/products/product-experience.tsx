"use client";

import { ArrowLeft, Check, ChevronDown, Heart, Maximize2, Ruler, ScanLine, Shirt, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, type MouseEvent, type PointerEvent } from "react";

import { colorHex, type ElphinoProduct } from "@/data/elphino-products";

type FitSelections = Record<string, string>;

const fitGroups = [
  { key: "neckLength", label: "Neck length", icon: UserRound, options: ["Shorter", "Balanced", "Longer"] },
  { key: "neckBuild", label: "Neck build", icon: ScanLine, options: ["Slim", "Balanced", "Fuller"] },
  { key: "shoulders", label: "Shoulder width", icon: Shirt, options: ["Narrow", "Balanced", "Broad"] },
  { key: "torso", label: "Torso length", icon: Ruler, options: ["Short", "Regular", "Long"] },
  { key: "midsection", label: "Midsection shape", icon: UserRound, options: ["Straight", "Rounded", "Fuller lower"] },
  { key: "arms", label: "Arm length", icon: Ruler, options: ["Short", "Regular", "Long"] },
  { key: "chest", label: "Chest build", icon: ScanLine, options: ["Slim", "Balanced", "Broad"] },
  { key: "preference", label: "Preferred fit", icon: Shirt, options: ["Close", "Regular", "Relaxed"] },
] as const;

export function ProductExperience({ product }: { product: ElphinoProduct }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [fitSelections, setFitSelections] = useState<FitSelections>({});
  const [fitOpen, setFitOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const completedFitFields = Object.keys(fitSelections).length;

  const fitSummary = !completedFitFields ? "No fit profile selected" : completedFitFields < fitGroups.length ? `${completedFitFields} of ${fitGroups.length} fit details selected` : "Fit profile complete";

  const selectFit = (key: string, value: string) => setFitSelections((current) => ({ ...current, [key]: value }));

  return (
    <section className="px-5 pb-20 pt-[106px] sm:px-8 lg:px-12 lg:pb-28 lg:pt-[132px]">
      <div className="mx-auto max-w-[1450px]">
        <Link className="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em]" href="/elphino/collections"><ArrowLeft className="size-4" /> Back to collections</Link>
        <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,.85fr)] lg:gap-14">
          <ZoomProductImage product={product} />
          <div className="lg:pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f3047]">{product.category} · {product.style}</p>
            <h1 className="mt-3 font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[.96]">{product.name}</h1>
            <p className="mt-5 text-xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/65">Original Elphino artwork on rich, breathable cotton. Designed for everyday movement with a clean, youthful silhouette.</p>

            <fieldset className="mt-8 border-t border-black/15 pt-6">
              <legend className="text-[11px] font-semibold uppercase tracking-[0.16em]">Color <span className="ml-2 font-normal normal-case tracking-normal text-black/55">{color}</span></legend>
              <div className="mt-3 flex flex-wrap gap-3">{product.colors.map((value) => <button aria-label={`Select ${value}`} aria-pressed={color === value} className={`grid size-11 place-items-center rounded-full border ${color === value ? "border-black" : "border-black/20"}`} key={value} onClick={() => setColor(value)} type="button"><span className="size-7 rounded-full border border-black/15" style={{ background: colorHex[value] }} /></button>)}</div>
            </fieldset>

            <fieldset className="mt-7 border-t border-black/15 pt-6">
              <legend className="flex w-full items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em]"><span>Select standard size</span><button className="text-[10px] font-medium normal-case tracking-normal underline underline-offset-4" onClick={() => setFitOpen(true)} type="button">Need help choosing?</button></legend>
              <div className="mt-4 flex flex-wrap gap-2">{product.sizes.map((value) => <button aria-pressed={size === value} className={`min-h-11 min-w-12 border px-3 text-[11px] font-semibold ${size === value ? "border-black bg-black text-white" : "border-black/25"}`} key={value} onClick={() => setSize(value)} type="button">{value}</button>)}</div>
            </fieldset>

            <div className="mt-7 border-y border-black/15 py-2">
              <button aria-expanded={fitOpen} className="flex min-h-16 w-full items-center gap-4 text-left" onClick={() => setFitOpen((open) => !open)} type="button"><span className="grid size-10 place-items-center rounded-full bg-black text-white"><Ruler className="size-4" /></span><span><span className="block text-[11px] font-semibold uppercase tracking-[0.16em]">My visual fit profile <span className="text-[#8f3047]">Optional</span></span><span className="mt-1 block text-xs text-black/55">{fitSummary}</span></span><ChevronDown className={`ml-auto size-4 transition-transform ${fitOpen ? "rotate-180" : ""}`} /></button>
              {fitOpen ? <FitProfile selections={fitSelections} select={selectFit} /> : null}
            </div>

            <button className="mt-7 min-h-14 w-full bg-black px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:bg-black/35" disabled={!size || !product.inStock} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2200); }} type="button">{added ? "Added to bag" : product.inStock ? size ? "Add to bag" : "Select a size" : "Out of stock"}</button>
            <button className="mt-3 flex min-h-12 w-full items-center justify-center gap-3 border border-black/25 text-[11px] font-semibold uppercase tracking-[0.15em]" type="button"><Heart className="size-4" /> Save to wishlist</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function ZoomProductImage({ product }: { product: ElphinoProduct }) {
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const move = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
  };
  const toggleTouchZoom = (event: PointerEvent<HTMLDivElement>) => { if (event.pointerType !== "mouse") setZoomed((value) => !value); };
  return <div><div aria-label={`${product.name} image. Hover or tap to zoom.`} className={`group relative aspect-[4/5] overflow-hidden bg-[#dcd5ca] ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`} onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)} onMouseMove={move} onPointerDown={toggleTouchZoom} role="img"><Image alt={`${product.name} cotton garment`} className="object-contain p-3 transition-transform duration-300 sm:p-6" fill priority sizes="(max-width: 1023px) 100vw, 58vw" src={product.image} style={{ transform: zoomed ? "scale(2.05)" : "scale(1)", transformOrigin: `${origin.x}% ${origin.y}%` }} /><span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 bg-black/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white"><Maximize2 className="size-3.5" /> Hover or tap to zoom</span></div><p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-black/50">Move across the image to inspect cotton texture and artwork</p></div>;
}

function FitProfile({ selections, select }: { selections: FitSelections; select: (key: string, value: string) => void }) {
  return <div className="border-t border-black/10 pb-5 pt-6"><p className="max-w-xl text-xs leading-5 text-black/55">Choose only what you are comfortable sharing. This prototype uses the profile to prepare a future fit recommendation and does not save it.</p><div className="mt-6 space-y-7">{fitGroups.map((group) => { const Icon = group.icon; return <fieldset key={group.key}><legend className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em]"><Icon className="size-4" /> {group.label}</legend><div className="mt-3 grid grid-cols-3 gap-2">{group.options.map((option, index) => <button aria-pressed={selections[group.key] === option} className={`relative min-h-20 border px-2 py-3 text-center transition-colors ${selections[group.key] === option ? "border-black bg-black text-white" : "border-black/20 bg-white/25"}`} key={option} onClick={() => select(group.key, option)} type="button"><span aria-hidden="true" className={`mx-auto mb-2 block rounded-full border-2 ${index === 0 ? "h-5 w-3" : index === 1 ? "size-5" : "h-5 w-7"} ${selections[group.key] === option ? "border-[#58dce1]" : "border-[#8f3047]"}`} /><span className="text-[10px] font-semibold uppercase tracking-[0.08em]">{option}</span>{selections[group.key] === option ? <Check className="absolute right-1.5 top-1.5 size-3" /> : null}</button>)}</div></fieldset>; })}</div></div>;
}
