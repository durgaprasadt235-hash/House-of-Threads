import { Leaf, PackageCheck, ScrollText, UserRound } from "lucide-react";

const features = [
  { title: "Quality Craftsmanship", copy: "Made to last. Details that matter.", icon: ScrollText },
  { title: "Responsible Fashion", copy: "Thoughtful choices. Better tomorrow.", icon: Leaf },
  { title: "Made for You", copy: "Your style. Your way.", icon: UserRound },
  { title: "Easy Returns", copy: "Hassle-free, always.", icon: PackageCheck },
];

export function FeatureStrip() {
  return (
    <section aria-label="Our promises" className="relative z-20 border-y border-white/10 bg-[#090a0b] px-5 py-6 sm:px-8 lg:px-12 lg:py-7">
      <div className="mx-auto grid max-w-[1320px] gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ copy, icon: Icon, title }, index) => (
          <article className={`feature-item group flex items-center gap-4 px-1 sm:px-5 lg:px-7 ${index > 0 ? "lg:border-l lg:border-white/20" : ""}`} key={title}>
            <Icon aria-hidden="true" className="size-9 shrink-0 stroke-[1.35] text-[#d5a25d] transition-transform duration-300 group-hover:-translate-y-0.5" />
            <div><h2 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white sm:text-[11px]">{title}</h2><p className="mt-1 text-xs leading-5 text-white/68">{copy}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}
