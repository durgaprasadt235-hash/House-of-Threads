"use client";

import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Monogram } from "@/components/home/monogram";

const navigation = [
  { label: "Men", href: "#brands" },
  { label: "Collections", href: "#collections" },
  { label: "Elphino", href: "#elphino" },
  { label: "The Walker Company", href: "#walker" },
  { label: "Stories", href: "#stories" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-500 ${scrolled || menuOpen ? "border-white/10 bg-[#060707]/92 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-black/80 to-transparent"}`}>
      <div className="mx-auto flex h-[78px] max-w-[1600px] items-center px-5 sm:px-8 lg:h-[92px] lg:px-12">
        <Monogram compact />
        <nav aria-label="Primary navigation" className="ml-10 hidden h-full items-center gap-8 lg:flex xl:ml-14 xl:gap-11">
          {navigation.map((item) => <Link className="nav-link" href={item.href} key={item.label}>{item.label}</Link>)}
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
          {navigation.map((item) => <Link className="block border-b border-white/8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white/85" href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </nav>
      </div>
    </header>
  );
}

function IconButton({ children, label }: { children: React.ReactNode; label: string }) {
  return <button aria-label={label} className="relative grid size-10 place-items-center text-white/90 transition-colors duration-300 hover:text-[#d5a25d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d5a25d] [&_svg]:size-[19px] [&_svg]:stroke-[1.5]" type="button">{children}</button>;
}
