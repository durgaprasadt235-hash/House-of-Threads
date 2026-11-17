import type { Metadata } from "next";
import { Header } from "@/components/home/header";
import { WalkerLanding } from "@/components/walker/walker-landing";

export const metadata: Metadata = { title: "The Walker Company | The Outfit Co.", description: "Clean, classic and confident menswear for every move." };
export default function WalkerPage(){ return <><Header active="The Walker Company"/><WalkerLanding/></>; }
