import Link from "next/link";

import { Monogram } from "@/components/home/monogram";

const groups = [
  { title: "Shop", links: ["Men", "Collections", "Elphino", "The Walker Company"] },
  { title: "Customer care", links: ["Help Center", "Shipping", "Returns", "Size Guide"] },
  { title: "Account", links: ["My Account", "Orders", "Wishlist", "Track Order"] },
  { title: "Legal", links: ["Terms & Conditions", "Privacy Policy", "Cookie Policy"] },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#050606] px-6 py-12 text-white/70 sm:px-10 lg:px-14">
      <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1.4fr_3fr]">
        <div><Monogram /><p className="mt-4 max-w-56 text-xs uppercase leading-5 tracking-[0.18em]">One house. Two identities.<br />Endless expression.</p></div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {groups.map((group) => <div key={group.title}><h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white">{group.title}</h2><ul className="mt-4 space-y-2 text-xs">{group.links.map((link) => <li key={link}><Link className="transition-colors hover:text-[#e9b85f]" href="#">{link}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-[1500px] items-center justify-between border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.18em]"><span>© 2026 House of Threads</span><Link className="transition-colors hover:text-[#e9b85f]" href="#">Instagram</Link></div>
    </footer>
  );
}
