"use client";

import { ArrowLeft, Camera, Check, ChevronLeft, ChevronRight, Heart, ImagePlus, LockKeyhole, Maximize2, RotateCcw, Shirt, Sparkles, Upload, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent, type MouseEvent, type PointerEvent } from "react";

import { colorHex } from "@/data/elphino-constants";
import type { StorefrontProductDto } from "@/services/types";

export function ProductExperience({ product }: { product: StorefrontProductDto }) {
  const [size, setSize] = useState("");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const [added, setAdded] = useState(false);

  return (
    <section className="px-5 pb-20 pt-[106px] sm:px-8 lg:px-12 lg:pb-28 lg:pt-[132px]">
      <div className="mx-auto max-w-[1450px]">
        <Link className="inline-flex min-h-11 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.17em]" href="/elphino/collections"><ArrowLeft className="size-4" /> Back to collections</Link>
        <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(380px,.85fr)] lg:gap-14">
          <ZoomProductImage color={color} product={product} />
          <div className="lg:pt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f3047]">{product.category} · {product.style}</p>
            <h1 className="mt-3 font-serif text-[clamp(2.4rem,5vw,4.8rem)] leading-[.96]">{product.name}</h1>
            <p className="mt-5 text-xl font-semibold">${product.price.toFixed(2)}</p>
            <p className="mt-5 max-w-xl text-sm leading-7 text-black/65">{product.designConcept ? `${product.designConcept} expressed through ${product.designTechnique?.toLowerCase()},` : "Original Elphino artwork on"} rich, breathable cotton. Designed for everyday movement with a clean, youthful silhouette.</p>

            {product.brandPlacement ? <section aria-labelledby="brand-placement-title" className="mt-7 border-y border-black/15 py-5">
              <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-black text-white"><Shirt className="size-4" /></span><div><h2 className="text-[11px] font-semibold uppercase tracking-[0.16em]" id="brand-placement-title">Elphino signature placement</h2><p className="mt-1 text-xs text-black/50">Applied consistently to every garment.</p></div></div>
              <dl className="mt-4 grid gap-3 text-xs sm:grid-cols-2"><div className="border border-black/15 p-3"><dt className="font-semibold uppercase tracking-[0.14em]">Front</dt><dd className="mt-2 leading-5 text-black/60">{product.brandPlacement.front}</dd></div><div className="border border-black/15 p-3"><dt className="font-semibold uppercase tracking-[0.14em]">Back</dt><dd className="mt-2 leading-5 text-black/60">{product.brandPlacement.back}</dd></div></dl>
            </section> : null}

            <fieldset className="mt-8 border-t border-black/15 pt-6">
              <legend className="text-[11px] font-semibold uppercase tracking-[0.16em]">Color <span className="ml-2 font-normal normal-case tracking-normal text-black/55">{color}</span></legend>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">{product.colors.map((value, index) => <button aria-label={`Select ${value}`} aria-pressed={color === value} className={`flex min-h-14 items-center gap-3 border px-3 text-left transition-colors ${color === value ? "border-black bg-black text-white" : "border-black/20"}`} key={value} onClick={() => setColor(value)} type="button"><span className="size-7 shrink-0 rounded-full border border-current/20" style={{ background: colorHex[value] }} /><span><span className="block text-[10px] font-semibold uppercase tracking-[0.1em]">{value}</span>{index === 0 ? <span className="mt-0.5 block text-[8px] uppercase tracking-[0.1em] opacity-65">Recommended</span> : null}</span></button>)}</div>
              {product.poloDesign ? <p className="mt-3 max-w-lg text-xs leading-5 text-black/55">Each colorway uses adjusted artwork threads and print tones so the design remains clear on the selected cotton base.</p> : null}
            </fieldset>

            <fieldset className="mt-7 border-t border-black/15 pt-6">
              <legend className="text-[11px] font-semibold uppercase tracking-[0.16em]">Select standard size</legend>
              <div className="mt-4 flex flex-wrap gap-2">{product.sizes.map((value) => <button aria-pressed={size === value} className={`min-h-11 min-w-12 border px-3 text-[11px] font-semibold ${size === value ? "border-black bg-black text-white" : "border-black/25"}`} key={value} onClick={() => setSize(value)} type="button">{value}</button>)}</div>
            </fieldset>

            <button className="mt-7 flex min-h-20 w-full items-center gap-4 border-y border-black/15 py-3 text-left" onClick={() => setTryOnOpen(true)} type="button"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-black text-white"><Sparkles className="size-4" /></span><span><span className="block text-[11px] font-semibold uppercase tracking-[0.16em]">Virtual try-on <span className="text-[#8f3047]">Free beta</span></span><span className="mt-1 block text-xs leading-5 text-black/55">Upload your photo and preview this piece. Limited generation access.</span></span><span className="ml-auto text-lg">→</span></button>

            <button className="mt-7 min-h-14 w-full bg-black px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white disabled:cursor-not-allowed disabled:bg-black/35" disabled={!size || !product.inStock} onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2200); }} type="button">{added ? "Added to bag" : product.inStock ? size ? "Add to bag" : "Select a size" : "Out of stock"}</button>
            <button className="mt-3 flex min-h-12 w-full items-center justify-center gap-3 border border-black/25 text-[11px] font-semibold uppercase tracking-[0.15em]" type="button"><Heart className="size-4" /> Save to wishlist</button>
          </div>
        </div>
      </div>
      {tryOnOpen ? <TryOnBeta color={color} onClose={() => setTryOnOpen(false)} product={product} size={size} /> : null}
    </section>
  );
}

function ZoomProductImage({ color, product }: { color: string; product: StorefrontProductDto }) {
  const [zoomed, setZoomed] = useState(false);
  const [view, setView] = useState<"front" | "back">("front");
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const swipeStartX = useRef<number | null>(null);
  const move = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setOrigin({ x: ((event.clientX - rect.left) / rect.width) * 100, y: ((event.clientY - rect.top) / rect.height) * 100 });
  };
  const startTouch = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") swipeStartX.current = event.clientX;
  };
  const finishTouch = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" || swipeStartX.current === null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (product.backImage && Math.abs(distance) >= 42) {
      setZoomed(false);
      setView(distance < 0 ? "back" : "front");
      return;
    }
    setZoomed((value) => !value);
  };
  const zoomStyle = { transform: zoomed ? "scale(2.05)" : "scale(1)", transformOrigin: `${origin.x}% ${origin.y}%` };
  const frontImage = product.colorImages?.[color] || product.image;
  const image = view === "back" && product.backImage ? product.backImage : frontImage;
  const selectView = (nextView: "front" | "back") => {
    setView(nextView);
    setZoomed(false);
  };

  return <div className="mx-auto w-full max-w-[720px]">
    <div aria-label={`${view} view of ${product.name} in ${color}. Hover or tap to zoom.`} className={`group relative h-[clamp(440px,68vh,700px)] touch-pan-y overflow-hidden bg-[#252525] ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"}`} onMouseEnter={() => setZoomed(true)} onMouseLeave={() => setZoomed(false)} onMouseMove={move} onPointerCancel={() => { swipeStartX.current = null; }} onPointerDown={startTouch} onPointerUp={finishTouch} role="img">
      <div className="relative h-full w-full transition-transform duration-300" style={zoomStyle}><Image alt={`${view} view of ${product.name} in ${color}`} className="object-contain" fill priority sizes="(max-width: 1023px) 100vw, 720px" src={image} /></div>
      {product.backImage ? <><button aria-label="Show front view" className="absolute left-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/75 text-white" onClick={(event) => { event.stopPropagation(); selectView("front"); }} type="button"><ChevronLeft className="size-5" /></button><button aria-label="Show back view" className="absolute right-3 top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-black/75 text-white" onClick={(event) => { event.stopPropagation(); selectView("back"); }} type="button"><ChevronRight className="size-5" /></button><span className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 bg-black/75 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">{view === "front" ? "1" : "2"} of 2 · {view}</span></> : null}
      <span className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 bg-black/70 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white"><Maximize2 className="size-3.5" /> Hover or tap to zoom</span>
    </div>
    {product.backImage ? <div aria-label="Choose garment view" className="mt-3 grid grid-cols-2 gap-3" role="group"><button aria-pressed={view === "front"} className={`flex min-h-14 items-center gap-3 border px-3 text-left ${view === "front" ? "border-black bg-black text-white" : "border-black/20"}`} onClick={() => selectView("front")} type="button"><span className="relative block h-12 w-10 shrink-0 overflow-hidden bg-[#252525]"><Image alt="Front thumbnail" className="object-contain" fill sizes="40px" src={frontImage} /></span><span className="text-[10px] font-semibold uppercase tracking-[0.16em]">Front</span></button><button aria-pressed={view === "back"} className={`flex min-h-14 items-center gap-3 border px-3 text-left ${view === "back" ? "border-black bg-black text-white" : "border-black/20"}`} onClick={() => selectView("back")} type="button"><span className="relative block h-12 w-10 shrink-0 overflow-hidden bg-[#252525]"><Image alt="Back thumbnail" className="object-contain" fill sizes="40px" src={product.backImage} /></span><span className="text-[10px] font-semibold uppercase tracking-[0.16em]">Back</span></button></div> : null}
    <p className="mt-3 text-center text-[10px] uppercase tracking-[0.14em] text-black/50">{product.backImage ? `${view} view · swipe left or right · ` : ""}Move across the image to inspect cotton texture and artwork</p>
  </div>;
}

function TryOnBeta({ color, onClose, product, size }: { color: string; onClose: () => void; product: StorefrontProductDto; size: string }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => () => { if (photo) URL.revokeObjectURL(photo); }, [photo]);
  useEffect(() => () => { if (result) URL.revokeObjectURL(result); }, [result]);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [onClose]);

  const choosePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(URL.createObjectURL(file));
    setPhotoFile(file);
    setFileName(file.name);
    if (result) URL.revokeObjectURL(result);
    setResult(null);
    setError("");
  };

  const reset = () => {
    if (photo) URL.revokeObjectURL(photo);
    setPhoto(null);
    setPhotoFile(null);
    setFileName("");
    if (result) URL.revokeObjectURL(result);
    setResult(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const generate = async () => {
    if (!photoFile || !size || !consent || generating) return;
    setGenerating(true);
    setError("");
    try {
      const requestBody = new FormData();
      requestBody.set("avatar", photoFile);
      requestBody.set("productId", product.id);
      requestBody.set("color", color);
      const response = await fetch("/api/virtual-try-on", { method: "POST", body: requestBody });
      if (!response.ok) {
        const body = await response.json().catch(() => ({ error: "Try-on is temporarily unavailable." })) as { error?: string };
        throw new Error(body.error || "Try-on is temporarily unavailable.");
      }
      if (result) URL.revokeObjectURL(result);
      setResult(URL.createObjectURL(await response.blob()));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Try-on is temporarily unavailable.");
    } finally {
      setGenerating(false);
    }
  };

  return <div aria-labelledby="try-on-title" aria-modal="true" className="fixed inset-0 z-[100] overflow-y-auto bg-black/75 p-0 backdrop-blur-sm sm:p-5" role="dialog"><div className="mx-auto min-h-full max-w-6xl bg-[#f1eadf] sm:min-h-0"><header className="flex items-start justify-between border-b border-black/15 px-5 py-5 sm:px-8"><div><p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#8f3047]">Elphino experimental fitting room</p><h2 className="mt-1 font-serif text-3xl sm:text-4xl" id="try-on-title">See it with your style</h2></div><button aria-label="Close virtual try-on" className="grid size-11 shrink-0 place-items-center rounded-full border border-black/20" onClick={onClose} type="button"><X className="size-5" /></button></header>
    <div className="grid lg:grid-cols-[1.2fr_.8fr]">
      <div className="border-b border-black/15 p-5 sm:p-8 lg:border-b-0 lg:border-r">
        {!photo ? <button className="flex min-h-[420px] w-full flex-col items-center justify-center border border-dashed border-black/35 bg-white/25 px-6 text-center transition-colors hover:bg-white/50" onClick={() => inputRef.current?.click()} type="button"><span className="grid size-16 place-items-center rounded-full bg-black text-white"><ImagePlus className="size-6" /></span><span className="mt-5 text-sm font-semibold uppercase tracking-[0.16em]">Upload a full-body photo</span><span className="mt-3 max-w-sm text-xs leading-6 text-black/55">Face the camera, keep your arms slightly away from your body, and use even lighting. JPG, PNG or WebP.</span><span className="mt-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em]"><Upload className="size-4" /> Choose photo</span></button> : <div><div className="relative min-h-[420px] overflow-hidden bg-[#171717] sm:aspect-[4/5]"><Image alt={result ? `AI preview of ${product.name}` : "Your uploaded virtual try-on photo"} className="object-contain" fill sizes="(max-width: 1023px) 100vw, 60vw" src={result || photo} unoptimized /><span className="absolute left-3 top-3 bg-black/75 px-3 py-2 text-[9px] uppercase tracking-[0.13em] text-white">{result ? "AI garment preview" : "Private local preview"}</span>{generating ? <span className="absolute inset-0 grid place-items-center bg-black/65 px-8 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white">Creating your limited free preview…</span> : null}</div><div className="mt-3 flex items-center justify-between gap-3 text-xs text-black/55"><span className="min-w-0 truncate">{result ? `${product.name} preview` : fileName}</span><button className="inline-flex min-h-11 shrink-0 items-center gap-2 font-semibold text-black" onClick={reset} type="button"><RotateCcw className="size-4" /> Change photo</button></div></div>}
        <input accept="image/jpeg,image/png,image/webp,image/heic" className="sr-only" onChange={choosePhoto} ref={inputRef} type="file" />
      </div>
      <aside className="p-5 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">Your selected piece</p><div className="mt-4 grid grid-cols-[88px_1fr] gap-4"><div className="relative aspect-[4/5] overflow-hidden bg-[#dcd5ca]"><Image alt={`${product.name} in ${color}`} className="object-cover" fill sizes="88px" src={product.colorImages?.[color] || product.image} /></div><div><h3 className="font-serif text-xl leading-tight">{product.name}</h3><p className="mt-2 text-xs text-black/55">{color} · {size || "Choose a size on the product page"}</p></div></div>
        <div className="mt-8 border border-[#c8954d]/45 bg-[#fff8ea] p-4"><div className="flex items-start gap-3"><Sparkles className="mt-0.5 size-4 shrink-0 text-[#8f3047]" /><div><p className="text-[10px] font-semibold uppercase tracking-[0.15em]">Limited free beta</p><p className="mt-2 text-xs leading-5 text-black/60">We send only your original photo and the selected garment, without prompts that intentionally modify your appearance. The free experimental model can still introduce small body or crop differences.</p></div></div></div>
        <ul className="mt-6 space-y-3 text-xs leading-5 text-black/60"><li className="flex gap-3"><Camera className="mt-0.5 size-4 shrink-0" /> One front-facing photo gives the cleanest result.</li><li className="flex gap-3"><LockKeyhole className="mt-0.5 size-4 shrink-0" /> Your photo stays local until you generate, then it is securely sent to our AI try-on provider. House of Threads does not save it.</li><li className="flex gap-3"><Check className="mt-0.5 size-4 shrink-0" /> Product, color and size stay attached to this preview.</li></ul>
        <label className="mt-7 flex cursor-pointer items-start gap-3 border-t border-black/15 pt-5 text-xs leading-5"><input checked={consent} className="mt-1 size-4 accent-black" onChange={(event) => setConsent(event.target.checked)} type="checkbox" /><span>I confirm this is my photo, I am 18 or older, and I agree to send it to the AI provider for this try-on.</span></label>
        <button className="mt-6 min-h-14 w-full bg-black px-5 text-[11px] font-semibold uppercase tracking-[0.17em] text-white disabled:cursor-not-allowed disabled:bg-black/30" disabled={!photo || !consent || !size || generating || Boolean(result)} onClick={generate} type="button">{generating ? "Creating preview…" : result ? "Preview created" : !size ? "Select a size first" : "Use one free try-on"}</button>
        {error ? <p aria-live="polite" className="mt-4 border-l-2 border-[#8f3047] pl-3 text-xs leading-5 text-black/65">{error}</p> : null}
        {result ? <p aria-live="polite" className="mt-4 border-l-2 border-emerald-700 pl-3 text-xs leading-5 text-black/65">Your AI garment preview is ready. Use it as a visual guide only; sizing and fit must still be confirmed from the size chart.</p> : null}
      </aside>
    </div>
  </div></div>;
}
