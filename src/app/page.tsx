import { FeatureStrip } from "@/components/home/feature-strip";
import { Header } from "@/components/home/header";
import { Hero } from "@/components/home/hero";
import { SectionIntro } from "@/components/home/section-intro";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080909] text-[#f7f2e9]">
      <Header />
      <Hero />
      <FeatureStrip />
      <SectionIntro />
    </main>
  );
}
