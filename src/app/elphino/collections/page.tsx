import type { Metadata } from "next";
import Image from "next/image";

import { CollectionsCatalog } from "@/components/elphino/collections/catalog";
import { BrandLogo } from "@/components/home/brand-logo";
import { Header } from "@/components/home/header";
import { SiteFooter } from "@/components/site/site-footer";

export const metadata: Metadata = { title: "Elphino Collections", description: "Find expressive Elphino polos, round necks, shirts, hoodies, jeans, and trousers." };

type PageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ElphinoCollectionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialFilters = Object.fromEntries(["category", "style", "size", "color", "fit", "price", "availability"].flatMap((key) => typeof params[key] === "string" ? [[key, params[key]]] : []));

  return (
    <main className="min-h-screen overflow-hidden bg-[#070808] text-white">
      <Header active="Collections" />
      <section aria-labelledby="collections-heading" className="elphino-collections-hero relative min-h-[760px] overflow-hidden pt-[78px] lg:min-h-[820px] lg:pt-[92px]">
        <div className="absolute inset-y-0 left-0 w-full sm:w-1/2"><Image alt="Young model in an Elphino sage rich-cotton polo" className="elphino-catalog-drift object-cover object-center sm:object-[54%_center]" fill loading="eager" priority sizes="(max-width: 639px) 100vw, 50vw" src="/images/elphino/collections/product-polo-sage-v3.png" /><div className="absolute inset-0 bg-black/55 sm:bg-gradient-to-r sm:from-black/5 sm:via-black/15 sm:to-[#070808]" /></div>
        <div className="absolute inset-y-0 right-0 hidden w-1/2 sm:block"><Image alt="Young model in an Elphino cream artwork cotton tee" className="elphino-catalog-drift-alt object-cover object-[48%_center]" fill loading="eager" priority sizes="50vw" src="/images/elphino/collections/product-tee-cream-v3.png" /><div className="absolute inset-0 bg-gradient-to-l from-black/5 via-black/25 to-[#070808]" /></div>
        <div className="absolute inset-0 bg-black/20 sm:bg-[radial-gradient(ellipse_at_center,rgba(6,7,7,.94)_0%,rgba(6,7,7,.86)_30%,rgba(6,7,7,.18)_75%)]" />
        <div aria-hidden="true" className="elphino-thread absolute left-[12%] right-[10%] top-[64%] h-px bg-gradient-to-r from-[#23c4cb] via-[#e23a82] to-[#e9b85f]" />
        <div className="relative z-10 mx-auto flex min-h-[682px] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center lg:min-h-[728px]">
          <p className="elphino-reveal text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e9b85f]">House of Threads presents</p>
          <div className="elphino-reveal mt-5 [animation-delay:120ms]"><BrandLogo brand="elphino" compact /></div>
          <p className="elphino-reveal mt-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#23c4cb] [animation-delay:220ms]">Elphino Collections</p>
          <h1 className="elphino-reveal mt-6 max-w-3xl font-serif text-[clamp(3.2rem,8vw,6.8rem)] leading-[0.86] tracking-[-0.045em] [animation-delay:300ms]" id="collections-heading">Find What<br />Feels Like You.</h1>
          <p className="elphino-reveal mt-7 text-sm tracking-[0.08em] text-white/70 sm:text-base [animation-delay:420ms]">New expressions. Everyday pieces. Your way.</p>
          <a className="elphino-reveal mt-9 inline-flex min-h-12 items-center border border-[#23c4cb]/80 px-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#58dce1] [animation-delay:520ms]" href="#categories">Explore collections <span aria-hidden="true" className="ml-3">↓</span></a>
        </div>
      </section>
      <CollectionsCatalog initialFilters={initialFilters} />
      <SiteFooter />
    </main>
  );
}
