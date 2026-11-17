"use client";

import { Brush, ChevronDown, Heart, MapPin, Menu, Search, Shirt, ShoppingBag, UserRound, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Monogram } from "@/components/home/monogram";

const navigation = [
  { label: "Men", href: "/#brands" },
  { label: "The Walker Company", href: "/walker" },
  { label: "Stories", href: "/#stories" },
];

const elphinoNavigation = [
  { label: "Regular Collections", description: "Shop everyday Elphino pieces", href: "/elphino/collections", icon: Shirt },
  { label: "Designer Collections", description: "Art-led statement designs", href: "/elphino/designer", icon: Brush },
  { label: "Theme Concepts", description: "Explore places, states & stories", href: "/elphino/designer-themes", icon: MapPin },
];

export function Header({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [elphinoOpen, setElphinoOpen] = useState(false);
  const isElphino = active === "Elphino";
  const isWalker = active === "The Walker Company";
  const isBrandPage = isElphino || isWalker;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setElphinoOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-500 ${scrolled || menuOpen ? "border-white/10 bg-[#060707]/92 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-black/80 to-transparent"}`}>
      <div className="mx-auto flex h-[78px] max-w-[1600px] items-center px-5 sm:px-8 lg:h-[92px] lg:px-12">
        {isBrandPage ? (
          <Link aria-label={isElphino ? "Elphino collections" : "The Walker Company"} className="relative h-14 w-[108px] shrink-0 sm:w-[122px] lg:h-[70px] lg:w-[142px]" href={isElphino ? "/elphino/collections" : "/walker"}>
            <Image alt={isElphino ? "Elphino" : "The Walker Company"} className="object-contain" fill priority sizes="(min-width: 1024px) 142px, 122px" src={isElphino ? "/images/brands/elphino-logo-transparent-v2.png" : "/images/brands/walker-company-logo-transparent-v2.png"} />
          </Link>
        ) : <Monogram compact />}
        <nav aria-label="Primary navigation" className="ml-10 hidden h-full items-center gap-8 lg:flex xl:ml-14 xl:gap-11">
          {isBrandPage ? <Link className="nav-link" href="/">Home</Link> : <Link className="nav-link" href={navigation[0].href}>{navigation[0].label}</Link>}
          <div className="group relative flex h-full items-center" onMouseLeave={() => setElphinoOpen(false)}>
            <Link aria-current={isElphino ? "page" : undefined} className={`nav-link ${isElphino ? "nav-link-active" : ""}`} href="/elphino/collections">
              Elphino
            </Link>
            <button aria-expanded={elphinoOpen} aria-haspopup="menu" aria-label="Open Elphino menu" className="ml-1 grid size-8 place-items-center text-white/75 transition-colors hover:text-[#d5a25d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#d5a25d]" onClick={() => setElphinoOpen((open) => !open)} type="button">
              <ChevronDown aria-hidden="true" className={`size-3.5 transition-transform ${elphinoOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute left-1/2 top-[calc(100%-10px)] w-72 -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${elphinoOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
              <div aria-label="Elphino pages" className="border border-white/12 bg-[#080909]/98 p-2 shadow-2xl backdrop-blur-xl" role="menu">
                {elphinoNavigation.map((item) => (
                  <Link className="flex items-center gap-4 border-b border-white/8 px-4 py-4 last:border-0 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none" href={item.href} key={item.label} onClick={() => setElphinoOpen(false)} role="menuitem">
                    <item.icon aria-hidden="true" className="size-7 shrink-0 stroke-[1.35] text-white/75" />
                    <span><span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#e9b85f]">{item.label}</span><span className="mt-1 block text-xs tracking-wide text-white/55">{item.description}</span></span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {navigation.slice(1).map((item) => <Link aria-current={active === item.label ? "page" : undefined} className={`nav-link ${active === item.label ? "nav-link-active" : ""}`} href={item.href} key={item.label}>{item.label}</Link>)}
        </nav>
        <div className="ml-auto flex items-center gap-1 sm:gap-2 lg:gap-3">
          <IconButton label="Search"><Search /></IconButton>
          <IconButton label="Account"><UserRound /></IconButton>
          <span className="hidden sm:inline-flex"><IconButton label="Wishlist"><Heart /></IconButton></span>
          <IconButton label="Shopping bag">
            <ShoppingBag />
            <span className="absolute right-0 top-1 grid size-5 place-items-center rounded-full bg-[#d5a25d] text-[10px] font-semibold text-black">0</span>
          </IconButton>
          <button aria-expanded={menuOpen} aria-label={menuOpen ? "Close menu" : "Open menu"} className="ml-1 grid size-11 place-items-center text-white transition-colors hover:text-[#d5a25d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5a25d] lg:hidden" onClick={() => setMenuOpen((open) => !open)} type="button">
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      <div className={`overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden ${menuOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav aria-label="Mobile navigation" className="border-t border-white/10 px-6 py-5">
          {isBrandPage ? <Link className="block border-b border-white/8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white/85" href="/" onClick={() => setMenuOpen(false)}>Home</Link> : <Link className="block border-b border-white/8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white/85" href="/#brands" onClick={() => setMenuOpen(false)}>Men</Link>}
          <div className="border-b border-white/8 py-3">
            <Link aria-current={isElphino ? "page" : undefined} className={`block text-xs font-semibold uppercase tracking-[0.2em] ${isElphino ? "text-[#e9b85f]" : "text-white/85"}`} href="/elphino/collections" onClick={() => setMenuOpen(false)}>Elphino</Link>
            <div className="mt-2 border-l border-[#e9b85f]/35 pl-4">
              {elphinoNavigation.map((item) => <Link className="flex items-center gap-3 py-2 text-[11px] uppercase tracking-[0.16em] text-white/65 hover:text-[#e9b85f]" href={item.href} key={item.label} onClick={() => setMenuOpen(false)}><item.icon className="size-4" />{item.label}</Link>)}
            </div>
          </div>
          {navigation.slice(1).map((item) => <Link aria-current={active === item.label ? "page" : undefined} className={`block border-b border-white/8 py-3 text-xs font-medium uppercase tracking-[0.2em] ${active === item.label ? "text-[#e9b85f]" : "text-white/85"}`} href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return <button aria-label={label} className="relative grid size-10 place-items-center text-white/90 transition-colors duration-300 hover:text-[#d5a25d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5a25d] [&_svg]:size-[19px] [&_svg]:stroke-[1.5]" type="button">{children}</button>;
}
