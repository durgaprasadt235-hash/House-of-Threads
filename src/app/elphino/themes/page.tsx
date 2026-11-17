import type { Metadata } from "next";
import { Headphones, Palette, RotateCcw, ShieldCheck, Sparkles, Truck } from "lucide-react";
import Image from "next/image";

import { ThemeCatalog } from "@/components/elphino/themes/theme-catalog";
import { Header } from "@/components/home/header";
import { SiteFooter } from "@/components/site/site-footer";
import { totalThemeDesigns } from "@/data/elphino-theme-collections";

export const metadata: Metadata = {
  title: "Elphino Theme Concepts",
  description: `${totalThemeDesigns} Elphino cotton designs inspired by places, states, nature, city energy, coastlines, and original stories.`,
};

const categories = [["Abstract", "Motion, color and form"], ["Typography", "Bold words and local energy"], ["Illustration", "Original art-led stories"], ["Line Art", "Clean thread-ready detail"], ["Nature", "Forest, coast and waterfalls"], ["Dark Theme", "Night color and contrast"]];

export default function ElphinoThemesPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f2e9]">
      <Header active="Elphino" />
      <section className="relative min-h-[650px] overflow-hidden bg-[#efe6d9] pt-[78px] text-[#071018] lg:min-h-[690px] lg:pt-[92px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(213,162,93,.2),transparent_36%),linear-gradient(110deg,#f8f2e9_0%,#eee2d2_55%,#dfd0bd_100%)]" />
        <div className="relative mx-auto grid min-h-[572px] max-w-[1600px] items-center gap-10 px-6 py-14 sm:px-9 lg:min-h-[598px] lg:grid-cols-[.78fr_1.22fr] lg:px-14">
          <div className="relative z-20 max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b17a2d]">Theme concepts</p>
            <h1 className="mt-4 font-serif text-[clamp(3.8rem,7vw,7rem)] leading-[0.84] tracking-[-0.04em]">Wear Places.<br />Tell Stories.</h1>
            <p className="mt-7 max-w-md text-base leading-7 text-black/65">{totalThemeDesigns} original cotton designs across nature, cities, states, coasts and creative worlds.</p>
            <div className="mt-9 grid max-w-xl grid-cols-2 gap-y-5 text-[9px] font-semibold uppercase tracking-[0.13em] sm:grid-cols-4">
              <HeroFeature icon={<Sparkles />} text="Exclusive designs" /><HeroFeature icon={<Palette />} text="Vibrant prints" /><HeroFeature icon={<ShieldCheck />} text="Premium cotton" /><HeroFeature icon={<RotateCcw />} text="Made to last" />
            </div>
          </div>
          <div className="relative z-10 hidden min-h-[500px] lg:block">
            <div aria-hidden="true" className="absolute left-[2%] right-[2%] top-8 h-3 rounded-full bg-[#986326] shadow-[0_5px_12px_rgba(0,0,0,.25)]" />
            <Garment image="/images/elphino/polos/youth-v1/polo-09-after-dark.png" left="5%" rotate="-4deg" top="50px" width="29%" />
            <Garment image="/images/elphino/collections/product-tee-cream-v3.png" left="27%" rotate="2deg" top="76px" width="29%" />
            <Garment image="/images/elphino/polos/youth-v1/polo-10-wave.png" left="49%" rotate="-2deg" top="58px" width="29%" />
            <Garment image="/images/elphino/polos/youth-v1/polo-08-canopy.png" left="71%" rotate="3deg" top="82px" width="29%" />
          </div>
        </div>
      </section>
      <ThemeCatalog />
      <section className="bg-[#f7f2e9] px-5 pb-16 text-[#101820] sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1500px] border-t border-black/10 pt-8"><div className="mb-5 flex items-center justify-between"><h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#b17a2d]">Popular categories</h2><span className="text-[10px] font-semibold uppercase tracking-[0.14em]">Every design tells a different story</span></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{categories.map(([name, copy]) => <div className="border border-black/10 bg-white p-5" key={name}><h3 className="font-serif text-2xl">{name}</h3><p className="mt-1 text-[10px] leading-4 text-black/55">{copy}</p></div>)}</div></div>
      </section>
      <section className="border-y border-white/10 bg-[#071018] px-5 py-7 text-white sm:px-8 lg:px-12"><div className="mx-auto grid max-w-[1500px] gap-6 sm:grid-cols-2 lg:grid-cols-4"><Service icon={<Truck />} title="Free shipping" copy="On qualifying orders" /><Service icon={<RotateCcw />} title="Easy returns" copy="Simple return process" /><Service icon={<ShieldCheck />} title="Secure payments" copy="Protected checkout" /><Service icon={<Headphones />} title="Support" copy="We’re here to help" /></div></section>
      <SiteFooter />
    </main>
  );
}

function Garment({ image, left, rotate, top, width }: { image: string; left: string; rotate: string; top: string; width: string }) {
  return <div className="absolute bottom-0 overflow-hidden drop-shadow-2xl" style={{ left, rotate, top, width }}><div className="relative aspect-[3/4]"><Image alt="Elphino themed cotton garment" className="object-cover object-top" fill sizes="25vw" src={image} /></div></div>;
}
function HeroFeature({ icon, text }: { icon: React.ReactNode; text: string }) { return <div className="flex items-center gap-3 border-l border-black/15 pl-3 first:border-0 first:pl-0 [&_svg]:size-5 [&_svg]:stroke-[1.5] [&_svg]:text-[#b17a2d]">{icon}<span>{text}</span></div>; }
function Service({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) { return <div className="flex items-center gap-4 lg:justify-center [&_svg]:size-6 [&_svg]:stroke-[1.4] [&_svg]:text-[#d5a25d]">{icon}<div><h2 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#e7b866]">{title}</h2><p className="mt-1 text-xs text-white/60">{copy}</p></div></div>; }
