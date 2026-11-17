import Image from "next/image";
import Link from "next/link";

export function Monogram({ compact = false }: { compact?: boolean }) {
  return (
    <Link aria-label="The Outfit Co. home" className={`monogram group relative inline-grid place-items-center ${compact ? "h-11 w-16" : "h-14 w-20"}`} href="/">
      <Image alt="" className="object-contain" fill priority={compact} sizes={compact ? "64px" : "80px"} src="/images/brands/the-outfit-co-logo.png" />
    </Link>
  );
}
