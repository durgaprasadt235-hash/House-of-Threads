import Image from "next/image";

type BrandLogoProps = {
  brand: "elphino" | "walker";
  compact?: boolean;
};

const logos = {
  elphino: {
    label: "Elphino",
    src: "/images/brands/elphino-logo-transparent-v2.png",
  },
  walker: {
    label: "The Walker Company",
    src: "/images/brands/walker-company-logo-transparent-v2.png",
  },
};

export function BrandLogo({ brand, compact = false }: BrandLogoProps) {
  const logo = logos[brand];

  return (
    <h2
      aria-label={logo.label}
      className={`brand-logo brand-logo-${brand} ${compact ? "brand-logo-compact" : ""}`}
    >
      <Image alt="" fill sizes={compact ? "240px" : "280px"} src={logo.src} />
    </h2>
  );
}
