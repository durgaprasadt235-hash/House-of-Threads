"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

import { BrandPanel } from "@/components/home/brand-panel";
import { BrandLogo } from "@/components/home/brand-logo";
import { Monogram } from "@/components/home/monogram";

type Focus = "elphino" | "walker" | "none";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [focus, setFocus] = useState<Focus>("none");
  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--pointer-x", x.toFixed(3));
    event.currentTarget.style.setProperty("--pointer-y", y.toFixed(3));
  };

  return (
    <section aria-labelledby="hero-heading" className="hero relative overflow-hidden bg-[#070808] pt-[78px] lg:min-h-[780px] lg:pt-[92px]" data-focus={focus} onPointerLeave={() => { setFocus("none"); heroRef.current?.style.setProperty("--pointer-x", "0"); heroRef.current?.style.setProperty("--pointer-y", "0"); }} onPointerMove={onPointerMove} ref={heroRef}>
      <div className="hidden lg:absolute lg:inset-x-0 lg:bottom-0 lg:top-[92px] lg:block">
        <button aria-label="Focus Elphino" className="hero-image hero-image-left absolute inset-y-0 left-0 w-[42%] cursor-default" onFocus={() => setFocus("elphino")} onMouseEnter={() => setFocus("elphino")} type="button">
          <Image alt="Man wearing expressive black graphic menswear in an urban setting" className="object-cover object-[42%_42%]" fill loading="eager" priority sizes="42vw" src="/images/home/elphino-hero.png" />
          <span className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-[#070808]" />
        </button>
        <button aria-label="Focus The Walker Company" className="hero-image hero-image-right absolute inset-y-0 right-0 w-[42%] cursor-default" onFocus={() => setFocus("walker")} onMouseEnter={() => setFocus("walker")} type="button">
          <Image alt="Man wearing refined taupe smart-casual menswear beside modern architecture" className="object-cover object-[58%_42%]" fill loading="eager" priority sizes="42vw" src="/images/home/walker-hero.png" />
          <span className="absolute inset-0 bg-gradient-to-l from-black/5 via-transparent to-[#070808]" />
        </button>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,7,.1)_0%,rgba(6,7,7,0)_25%,rgba(6,7,7,.94)_43%,rgba(6,7,7,.97)_50%,rgba(6,7,7,.94)_57%,rgba(6,7,7,0)_75%,rgba(6,7,7,.1)_100%)]" />
        <div className="pointer-events-none absolute inset-x-[30%] inset-y-0 bg-[radial-gradient(ellipse_at_center,rgba(23,25,24,.42),rgba(5,6,6,.86)_72%)]" />
      </div>

      <div className="hero-center relative z-10 mx-auto flex max-w-[720px] flex-col items-center px-5 pb-11 pt-10 text-center sm:px-8 sm:pt-14 lg:min-h-[688px] lg:max-w-[650px] lg:justify-center lg:px-8 lg:pb-10 lg:pt-8 xl:max-w-[720px]">
        <div className="hero-identity flex flex-col items-center">
          <Monogram compact />
          <p className="mt-2 font-serif text-[15px] uppercase tracking-[0.35em] text-white/90 sm:text-lg lg:text-xl xl:text-[1.35rem]">House of Threads</p>
          <span className="gold-stitch mt-5 h-px w-16 bg-[#d5a25d]" />
        </div>
        <h1 className="hero-title mt-7 text-balance font-serif text-[clamp(2.7rem,11vw,4.6rem)] leading-[0.98] tracking-[-0.025em] text-[#fffdfa] sm:max-w-[680px] lg:mt-6 lg:text-[clamp(3.5rem,4.6vw,5rem)] xl:leading-[0.95]" id="hero-heading">Every Thread,<br />Stitched for You to<br />Feel Like You.</h1>
        <div aria-hidden="true" className="hero-ornament mt-7 flex items-center gap-5 text-[#d5a25d]"><span className="h-px w-16 bg-[#d5a25d]/80" /><span className="stitch-knot" /><span className="h-px w-16 bg-[#d5a25d]/80" /></div>
        <div className="brand-selectors mt-7 hidden w-full items-stretch lg:flex" id="brands">
          <BrandPanel brand="elphino" cta="Explore Elphino" statement="Creative. Expressive. Fearless." />
          <span aria-hidden="true" className="w-px self-stretch bg-white/25" />
          <BrandPanel brand="walker" cta="Explore Walker" statement="Clean. Classic. Confident." />
        </div>
      </div>

      <div className="relative z-10 lg:hidden">
        <MobileBrand alt="Man wearing expressive black graphic menswear in an urban setting" brand="elphino" image="/images/home/elphino-hero.png" />
        <MobileBrand alt="Man wearing refined taupe smart-casual menswear beside modern architecture" brand="walker" image="/images/home/walker-hero.png" />
      </div>
    </section>
  );
}

function MobileBrand({ alt, brand, image }: { alt: string; brand: "elphino" | "walker"; image: string }) {
  const isElphino = brand === "elphino";
  return (
    <article className="relative min-h-[610px] overflow-hidden border-t border-white/10" id={brand}>
      <Image alt={alt} className={`object-cover ${isElphino ? "object-[42%_center]" : "object-[56%_center]"}`} fill sizes="100vw" src={image} />
      <div className={`absolute inset-0 ${isElphino ? "bg-gradient-to-t from-black via-black/15 to-transparent" : "bg-gradient-to-t from-black via-black/5 to-transparent"}`} />
      <div className="absolute inset-x-0 bottom-0 p-7 pb-9 text-center">
        <BrandLogo brand={brand} />
        <p className="mt-2 text-sm tracking-wide text-white/80">{isElphino ? "Creative. Expressive. Fearless." : "Clean. Classic. Confident."}</p>
        <a className="group mt-5 inline-flex min-h-12 items-center gap-3 border border-[#d5a25d] px-7 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e5b979]" href={`#${brand}`}>Explore {isElphino ? "Elphino" : "Walker"}<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" /></a>
      </div>
    </article>
  );
}
