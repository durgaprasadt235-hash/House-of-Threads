import Link from "next/link";

export function Monogram({ compact = false }: { compact?: boolean }) {
  return (
    <Link aria-label="House of Threads home" className={`monogram group relative inline-grid place-items-center font-serif text-[#d5a25d] ${compact ? "h-11 w-10 text-[2.3rem]" : "h-14 w-12 text-[3rem]"}`} href="/">
      <span aria-hidden="true" className="leading-none">H</span>
      <span aria-hidden="true" className="absolute inset-y-[18%] left-1/2 w-px -translate-x-1/2 bg-[#d5a25d]/65" />
    </Link>
  );
}
