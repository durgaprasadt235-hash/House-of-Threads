import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/home/header";

export default function WalkerCollectionsPage(){return <><Header active="The Walker Company"/><main className="grid min-h-screen place-items-center bg-[#eee9df] px-6 pt-[78px] text-center lg:pt-[92px]"><div><p className="text-xs uppercase tracking-[.24em] text-[#9a6623]">The Walker Company</p><h1 className="mt-4 font-serif text-5xl sm:text-7xl">Collection preview</h1><p className="mx-auto mt-5 max-w-xl leading-7 text-stone-600">The Walker collection is being prepared. Category links are active for development, with final inventory and product details to follow.</p><Link className="mt-8 inline-flex items-center gap-3 border border-black px-6 py-4 text-xs uppercase tracking-[.16em]" href="/walker"><ArrowLeft className="size-4"/>Back to Walker</Link></div></main></>}
