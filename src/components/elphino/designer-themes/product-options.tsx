"use client";

import { useState } from "react";

export function ProductOptions({ colors }: { colors: string[] }) {
  const [color, setColor] = useState(colors[0]); const [size, setSize] = useState<string>();
  const swatches: Record<string,string> = { Cream: "#ede5d2", Navy: "#142536", Sage: "#7c8c72", Charcoal: "#343535" };
  return <div className="mt-9 space-y-8">
    <fieldset><legend className="text-[10px] font-semibold uppercase tracking-[0.2em]">Color <span className="ml-2 text-black/45">{color}</span></legend><div className="mt-4 flex flex-wrap gap-2">{colors.map((item) => <button aria-pressed={color === item} className={`flex items-center gap-2 border px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] ${color === item ? "border-black bg-black text-white" : "border-black/20"}`} key={item} onClick={() => setColor(item)} type="button"><span className="size-4 rounded-full border border-black/20" style={{ backgroundColor: swatches[item] }} />{item}</button>)}</div><p className="mt-3 text-xs leading-5 text-black/50">Artwork tones are adjusted for contrast on every cotton colorway.</p></fieldset>
    <fieldset><legend className="text-[10px] font-semibold uppercase tracking-[0.2em]">Select standard size</legend><div className="mt-4 flex flex-wrap gap-2">{["S","M","L","XL","XXL"].map((item) => <button aria-pressed={size === item} className={`grid h-12 min-w-14 place-items-center border text-xs font-semibold ${size === item ? "border-black bg-black text-white" : "border-black/25"}`} key={item} onClick={() => setSize(item)} type="button">{item}</button>)}</div></fieldset>
    <button className={`w-full py-5 text-xs font-semibold uppercase tracking-[0.22em] ${size ? "bg-black text-white" : "bg-black/35 text-white"}`} type="button">{size ? "Add to bag" : "Select a size"}</button>
  </div>;
}
