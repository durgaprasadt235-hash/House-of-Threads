"use client";

import { ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Monogram } from "@/components/home/monogram";

const navigation = [
  { label: "Men", href: "/#brands" },
  { label: "The Walker Company", href: "/#walker" },
  { label: "Stories", href: "/#stories" },
];

const elphinoNavigation = [
  { label: "Regular Collections", description: "Shop everyday Elphino pieces", href: "/elphino/collections" },
  { label: "Theme Concepts", description: "Explore designs through stories", href: "/elphino/themes" },
];

export function Header({ active }: { active?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [elphinoOpen, setElphinoOpen] = useState(false);

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
        <Monogram compact />
        <nav aria-label="Primary navigation" className="ml-10 hidden h-full items-center gap-8 lg:flex xl:ml-14 xl:gap-11">
          <Link aria-current={active === navigation[0].label ? "page" : undefined} className={`nav-link ${active === navigation[0].label ? "nav-link-active" : ""}`} href={navigation[0].href}>{navigation[0].label}</Link>
          <div className="group relative flex h-full items-center" onMouseLeave={() => setElphinoOpen(false)}>
            <button aria-expanded={elphinoOpen} aria-haspopup="menu" className={`nav-link inline-flex items-center gap-2 ${active === "Elphino" ? "nav-link-active" : ""}`} onClick={() => setElphinoOpen((open) => !open)} type="button">
              Elphino <ChevronDown aria-hidden="true" className={`size-3.5 transition-transform ${elphinoOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute left-1/2 top-[calc(100%-10px)] w-72 -translate-x-1/2 pt-4 transition-[opacity,transform,visibility] duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${elphinoOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}>
              <div aria-label="Elphino pages" className="border border-white/12 bg-[#080909]/98 p-2 shadow-2xl backdrop-blur-xl" role="menu">
                {elphinoNavigation.map((item) => (
                  <Link className="block border-b border-white/8 px-4 py-4 last:border-0 hover:bg-white/5 focus-visible:bg-white/5 focus-visible:outline-none" href={item.href} key={item.label} onClick={() => setElphinoOpen(false)} role="menuitem">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e9b85f]">{item.label}</span>
                    <span className="mt-1 block text-xs tracking-wide text-white/55">{item.description}</span>
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
      <div className={`overflow-hidden transition-[max-height,opacity] duration-500 lg:hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <nav aria-label="Mobile navigation" className="border-t border-white/10 px-6 py-5">
          <Link className="block border-b border-white/8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white/85" href="/#brands" onClick={() => setMenuOpen(false)}>Men</Link>
          <div className="border-b border-white/8 py-3">
            <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${active === "Elphino" ? "text-[#e9b85f]" : "text-white/85"}`}>Elphino</p>
            <div className="mt-2 border-l border-[#e9b85f]/35 pl-4">
              {elphinoNavigation.map((item) => <Link className="block py-2 text-[11px] uppercase tracking-[0.16em] text-white/65 hover:text-[#e9b85f]" href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
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
