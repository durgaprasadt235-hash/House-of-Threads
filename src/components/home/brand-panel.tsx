import { ArrowRight } from "lucide-react";
import Link from "next/link";

type BrandPanelProps = { brand: "elphino" | "walker"; eyebrow?: string; name: string; statement: string; cta: string };

export function BrandPanel({ brand, eyebrow, name, statement, cta }: BrandPanelProps) {
  return (
    <article className="brand-copy flex min-w-0 flex-1 flex-col items-center px-4 text-center" data-brand-copy={brand}>
      <div className={brand === "elphino" ? "brand-elphino" : "brand-walker"}>
        {eyebrow ? <span className="mb-0.5 block text-[10px] font-medium uppercase tracking-[0.26em] text-white/65 sm:text-xs">{eyebrow}</span> : null}
        <h2 className={brand === "elphino" ? "text-[2.05rem] font-black italic tracking-[-0.05em] sm:text-[2.5rem]" : "max-w-[15rem] text-xl font-medium uppercase leading-[1.12] tracking-[0.08em] sm:text-2xl"}>{name}</h2>
      </div>
      <p className="mt-3 text-[13px] tracking-wide text-white/78 sm:text-sm">{statement}</p>
      <Link className="brand-cta group mt-5 inline-flex min-h-12 items-center justify-center gap-4 border border-[#d5a25d]/85 px-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e5b979] transition-colors duration-300 hover:bg-[#d5a25d] hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d5a25d] sm:min-w-56" href={`#${brand}`}>
        {cta}<ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </Link>
    </article>
  );
}
