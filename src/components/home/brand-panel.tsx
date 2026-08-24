import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { BrandLogo } from "@/components/home/brand-logo";

type BrandPanelProps = { brand: "elphino" | "walker"; statement: string; cta: string };

export function BrandPanel({ brand, statement, cta }: BrandPanelProps) {
  return (
    <article className="brand-copy flex min-w-0 flex-1 flex-col items-center px-4 text-center" data-brand-copy={brand}>
      <BrandLogo brand={brand} compact />
      <p className="mt-3 text-[13px] tracking-wide text-white/78 sm:text-sm">{statement}</p>
      <Link className="brand-cta group mt-5 inline-flex min-h-12 items-center justify-center gap-4 border border-[#d5a25d]/85 px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e5b979] transition-colors duration-300 hover:bg-[#d5a25d] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5a25d] sm:min-w-56" href={`#${brand}`}>
        {cta}<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
