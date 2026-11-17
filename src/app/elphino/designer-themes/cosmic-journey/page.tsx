import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Header } from "@/components/home/header";
import { SiteFooter } from "@/components/site/site-footer";
import { colorHex, elphinoProducts } from "@/data/elphino-products";

export const metadata: Metadata = {
  title: "Cosmic Journey Collection | Elphino",
  description: "Ten Cosmic Journey cotton T-shirts with paired front and back views.",
};

const cosmicProducts = elphinoProducts.filter((product) => product.id.startsWith("cosmic-journey-"));

export default function CosmicJourneyCollectionPage() {
  return (
    <main className="min-h-screen bg-[#f3ede3] text-[#171713]">
      <Header active="Elphino" />
      <section className="px-5 pb-16 pt-[110px] sm:px-8 lg:px-12 lg:pb-24 lg:pt-[130px]">
        <div className="mx-auto max-w-[1500px]">
          <Link className="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em]" href="/elphino/designer-themes">
            <ArrowLeft className="size-4" /> Designer collections
          </Link>

          <div className="mt-5 flex flex-col justify-between gap-5 border-b border-black/15 pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a66d27]">Orbit · wonder · discovery</p>
              <h1 className="mt-2 font-serif text-[clamp(3.7rem,8vw,7rem)] leading-none">Cosmic Journey</h1>
              <p className="mt-3 text-sm uppercase tracking-[0.18em] text-black/50">Ten colors · ten original artworks</p>
            </div>
            <p className="max-w-md text-sm leading-6 text-black/65">Explore the universe within. Every cosmic front artwork is paired with its matching Elphino back. Hover a card to alternate views, or open it to swipe, select, and zoom.</p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cosmicProducts.map((product, index) => (
              <article className="group min-w-0" key={product.id}>
                <div className="relative aspect-[3/4] overflow-hidden bg-[#e9e2d8]">
                  <Link aria-label={`View ${product.name}`} className="absolute inset-0" href={`/elphino/products/${product.id}`}>
                    <Image alt={`${product.name} front view`} className="garment-card-front object-contain transition-transform duration-700 group-hover:scale-[1.015]" fill priority={index < 4} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" src={product.image} />
                    {product.backImage ? <Image alt={`${product.name} back view`} className="garment-card-back object-contain transition-transform duration-700 group-hover:scale-[1.015]" fill priority={index < 4} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw" src={product.backImage} /> : null}
                  </Link>
                  <span className="pointer-events-none absolute left-3 top-3 bg-black px-3 py-2 text-[9px] font-semibold tracking-[0.16em] text-white">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="pt-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#99651f]">Cosmic Journey · Front + back</p>
                  <div className="mt-1 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-medium"><Link className="underline-offset-4 hover:underline" href={`/elphino/products/${product.id}`}>{product.name}</Link></h2>
                      <p className="mt-2 text-sm font-semibold">${product.price.toFixed(2)}</p>
                    </div>
                    <Link aria-label={`Open ${product.name}`} className="grid size-9 shrink-0 place-items-center rounded-full bg-black text-white" href={`/elphino/products/${product.id}`}><ArrowRight className="size-4" /></Link>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-black/60">
                    <span className="size-3.5 rounded-full border border-black/20" style={{ backgroundColor: colorHex[product.colors[0]] }} />
                    {product.colors[0]} · S–XXL
                  </div>
                  <p className="mt-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-black/50">Hover for front + back · tap to open</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
