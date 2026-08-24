import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "@/components/home/brand-logo";
import { Header } from "@/components/home/header";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = {
  title: "Elphino Theme Concepts",
  description: "Explore Elphino clothing through places, ideas, artwork, and original stories.",
};

export default function ElphinoThemesPage() {
  return (
    <main className="min-h-screen bg-[#070808] text-white">
      <Header active="Elphino" />
      <section className="relative grid min-h-[760px] place-items-center overflow-hidden px-6 pt-[78px] lg:pt-[92px]">
        <Image alt="Elphino original artwork theme concept" className="object-cover object-center opacity-45" fill priority sizes="100vw" src="/images/elphino/collections/product-tee-cream-v3.png" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(7,8,8,.55),rgba(7,8,8,.96)_72%)]" />
        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <BrandLogo brand="elphino" compact />
          <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e9b85f]">Elphino Theme Concepts</p>
          <h1 className="mt-5 font-serif text-[clamp(3rem,8vw,6.5rem)] leading-[0.92]">Wear the Story.</h1>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-white/65 sm:text-base">A separate Elphino experience for original collections inspired by places, ideas, artwork, and stories.</p>
          <p className="mt-5 text-[11px] uppercase tracking-[0.22em] text-[#58dce1]">Theme collection development continues here</p>
          <Link className="mt-9 inline-flex min-h-12 items-center border border-[#e9b85f]/80 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#e9b85f]" href="/elphino/collections">View regular collections</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
