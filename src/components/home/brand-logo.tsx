"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isElphino = brand === "elphino";

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const play = () => {
    if (!isElphino) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    setPlaying(false);
    requestAnimationFrame(() => {
      setPlaying(true);
      timerRef.current = setTimeout(() => setPlaying(false), 1500);
    });
  };

  return (
    <h2
      aria-label={logo.label}
      className={`brand-logo brand-logo-${brand} ${compact ? "brand-logo-compact" : ""} ${playing ? "brand-logo-playing" : ""}`}
    >
      {isElphino ? (
        <button aria-label="Animate the Elphino elephant" className="elphino-logo-trigger" onPointerDown={play} type="button">
          <span className="elphino-logo-body"><Image alt="" fill sizes={compact ? "240px" : "280px"} src={logo.src} /></span>
          <span aria-hidden="true" className="elphino-trunk-layer"><Image alt="" fill sizes={compact ? "240px" : "280px"} src={logo.src} /></span>
          <span aria-hidden="true" className="elphino-water">
            <i className="elphino-drop elphino-drop-1" />
            <i className="elphino-drop elphino-drop-2" />
            <i className="elphino-drop elphino-drop-3" />
            <i className="elphino-drop elphino-drop-4" />
            <i className="elphino-drop elphino-drop-5" />
          </span>
        </button>
      ) : <Image alt="" fill sizes={compact ? "240px" : "280px"} src={logo.src} />}
    </h2>
  );
}
