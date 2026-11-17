"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function WalkerSeasonalHero() {
  const heroRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(motionQuery.matches);
    const observer = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), { threshold: 0.08 });

    observer.observe(hero);
    updateMotion();
    motionQuery.addEventListener("change", updateMotion);
    return () => {
      observer.disconnect();
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  const state = reducedMotion ? "is-reduced" : paused ? "is-paused" : "is-playing";

  return (
    <section aria-label="The Walker Company spring campaign" className={`walker-spring-hero ${state}`} ref={heroRef}>
      <div aria-hidden="true" className="walker-spring-scene">
        <Image alt="" className="walker-spring-image" fill priority sizes="100vw" src="/images/walker/seasonal/walker-spring-bg.png" />
      </div>
      <Link className="walker-spring-cta" href="/walker/collections">Explore the collection <ArrowRight aria-hidden="true" className="size-4" /></Link>
      <style jsx>{styles}</style>
    </section>
  );
}

const styles = `
  .walker-spring-hero {
    position: relative;
    min-height: 680px;
    overflow: hidden;
    isolation: isolate;
    background: #080909;
  }

  .walker-spring-scene {
    position: absolute;
    inset: 0;
    overflow: hidden;
  }

  .walker-spring-image {
    object-fit: cover;
    transform: scale(1.04) translate3d(-1%, 0, 0);
    transform-origin: center center;
    animation: walker-spring-pan 4s ease-in-out infinite alternate;
  }

  .walker-spring-cta {
    position: absolute;
    z-index: 2;
    bottom: 48px;
    left: 6.5%;
    display: inline-flex;
    min-height: 48px;
    align-items: center;
    gap: 18px;
    border: 1px solid rgb(213 162 93 / 0.85);
    background: rgb(8 9 9 / 0.48);
    padding: 0 20px;
    color: #efc77f;
    font-size: 10px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .walker-spring-cta:hover {
    background: #d5a25d;
    color: #080909;
  }

  .is-paused .walker-spring-image,
  .is-reduced .walker-spring-image {
    animation-play-state: paused;
  }

  @keyframes walker-spring-pan {
    from { transform: scale(1.04) translate3d(-1%, 0, 0); }
    to { transform: scale(1.04) translate3d(1%, 0, 0); }
  }

  @media (max-width: 640px) {
    .walker-spring-hero { min-height: 720px; }
    .walker-spring-cta { bottom: 38px; left: 22px; font-size: 9px; }
  }
`;
