"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState } from "react";

const nav = [
  ["Home", "/"], ["Men", "#shop-by-category"], ["Collections", "#shop-by-category"],
  ["Elphino", "/elphino/collections"], ["The Walker Company", "/walker"], ["Stories", "/#stories"],
] as const;

export function WalkerHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 h-20 border-b border-white/10 bg-[#080909]/95 text-white backdrop-blur md:h-[88px]">
    <div className="mx-auto flex h-full max-w-[1540px] items-center px-4 sm:px-7 lg:px-10">
      <Link aria-label="The Walker Company home" className="relative h-16 w-32 shrink-0" href="/walker">
        <Image alt="The Walker Company" className="object-contain" fill priority sizes="128px" src="/images/brands/walker-company-logo-transparent-v2.png" />
      </Link>
      <nav aria-label="Primary navigation" className="ml-8 hidden h-full items-center gap-7 lg:flex xl:gap-10">
        {nav.map(([label, href]) => <Link className={`walker-nav ${label === "The Walker Company" ? "walker-nav-active" : ""}`} href={href} key={label}>{label}</Link>)}
      </nav>
      <div className="ml-auto hidden items-center gap-5 sm:flex">
        {[[Search,"Search"],[User,"Account"],[Heart,"Wishlist"],[ShoppingBag,"Cart"]].map(([Icon,label]) => {
          const C = Icon as typeof Search; return <button aria-label={label as string} className="group flex flex-col items-center gap-1 text-white/85 hover:text-[#dfb46e]" key={label as string} type="button"><C className="size-5"/><span className="hidden text-[8px] uppercase tracking-[.14em] xl:block">{label as string}</span></button>;
        })}
      </div>
      <button aria-expanded={open} aria-label="Toggle navigation" className="ml-auto p-2 lg:hidden" onClick={() => setOpen(v => !v)} type="button">{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav aria-label="Mobile navigation" className="absolute inset-x-0 top-full border-t border-white/10 bg-[#0b0c0c] p-5 lg:hidden">{nav.map(([label,href]) => <Link className="block border-b border-white/10 py-3 text-sm uppercase tracking-[.16em] text-white/85" href={href} key={label} onClick={() => setOpen(false)}>{label}</Link>)}</nav>}
  </header>;
}
