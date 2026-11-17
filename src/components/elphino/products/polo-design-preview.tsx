import { useId, type CSSProperties } from "react";

import { colorHex, type ElphinoProduct, type PoloDesignId } from "@/data/elphino-products";

const designNames: Record<PoloDesignId, string> = {
  beach: "Shoreline Print",
  city: "City Line Embroidery",
  forest: "Forest Tonal Print",
  waterfall: "Waterfall Thread Work",
  ocean: "Ocean Wave Artwork",
  "night-city": "Night City Thread Work",
  mountain: "Mountain Trail Embroidery",
  tropical: "Tropical Micro Print",
  rain: "Monsoon Thread Work",
  desert: "Desert Woven Patch",
};

export function PoloDesignPreview({ color, product, className = "", style }: { color?: string; product: ElphinoProduct; className?: string; style?: CSSProperties }) {
  const instanceId = useId().replaceAll(":", "");
  const selectedColor = color || product.colors[0] || "Sage";
  const garment = colorHex[selectedColor] || "#9aa58a";
  const dark = isDark(garment);
  const ink = dark ? "#f6edda" : "#19272a";
  const accent = dark ? "#e9b85f" : "#8f3047";
  const design = product.poloDesign || "beach";

  const fabricId = `fabric-${product.id}-${instanceId}`;
  const piqueId = `pique-${product.id}-${instanceId}`;
  const shirtId = `shirt-${product.id}-${instanceId}`;

  return <svg aria-label={`${product.name} in ${selectedColor}; ${designNames[design]} artwork`} className={className} role="img" style={style} viewBox="0 0 600 760">
    <defs>
      <linearGradient id={fabricId} x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor={lighten(garment, 16)} /><stop offset=".5" stopColor={garment} /><stop offset="1" stopColor={darken(garment, 12)} /></linearGradient>
      <pattern height="7" id={piqueId} patternUnits="userSpaceOnUse" width="7"><circle cx="2" cy="2" fill={dark ? "#fff" : "#000"} opacity=".055" r=".85" /><circle cx="5.5" cy="5.5" fill={dark ? "#fff" : "#000"} opacity=".04" r=".65" /></pattern>
      <clipPath id={shirtId}><path d="M187 142 70 207 113 356 154 334 169 664Q300 704 431 664L446 334 487 356 530 207 413 142 354 116Q300 148 246 116Z" /></clipPath>
    </defs>
    <rect fill="#ded7cc" height="760" width="600" />
    <ellipse cx="300" cy="696" fill="#000" opacity=".12" rx="185" ry="22" />
    <path d="M187 142 70 207 113 356 154 334 169 664Q300 704 431 664L446 334 487 356 530 207 413 142 354 116Q300 148 246 116Z" fill={`url(#${fabricId})`} stroke={darken(garment, 20)} strokeWidth="3" />
    <rect clipPath={`url(#${shirtId})`} fill={`url(#${piqueId})`} height="600" width="500" x="50" y="110" />
    <path d="M246 116 209 156 273 224 300 188 327 224 391 156 354 116Q300 148 246 116Z" fill={darken(garment, 7)} stroke={darken(garment, 21)} strokeWidth="3" />
    <path d="M273 224V356H327V224L300 188Z" fill={darken(garment, 4)} stroke={darken(garment, 18)} strokeWidth="2" />
    <circle cx="300" cy="250" fill={ink} r="5" /><circle cx="300" cy="288" fill={ink} r="5" /><circle cx="300" cy="326" fill={ink} r="5" />
    <path d="M82 210 154 248M518 210 446 248M169 664Q300 688 431 664" fill="none" opacity=".42" stroke={ink} strokeWidth="2" />
    <DesignMark accent={accent} design={design} ink={ink} />
  </svg>;
}

function DesignMark({ accent, design, ink }: { accent: string; design: PoloDesignId; ink: string }) {
  if (design === "beach") return <g fill="none" strokeLinecap="round"><circle cx="388" cy="345" fill={accent} opacity=".85" r="24" stroke="none" /><path d="M160 410c45-30 90 30 135 0s90 30 145 0M160 432c48-27 88 27 136 0s89 27 144 0" stroke={ink} strokeWidth="7" /><path d="M165 380h265" opacity=".7" stroke={accent} strokeWidth="4" /></g>;
  if (design === "city") return <g fill="none" stroke={ink} strokeLinejoin="round" strokeWidth="4"><path d="M168 438V365h35v-48h33v83h39v-112h39v92h34v-56h38v114" /><path d="M153 438h258" stroke={accent} strokeWidth="5" />{[190,218,254,294,332,368].map((x) => <path d={`M${x} 390v12`} key={x} />)}</g>;
  if (design === "forest") return <g opacity=".72">{[[190,420,54],[255,380,68],[326,414,62],[390,370,74],[435,430,48]].map(([x,y,r], index) => <g key={index}><circle cx={x} cy={y} fill={index % 2 ? accent : ink} opacity=".32" r={r} /><path d={`M${x} ${y-r/2}v${r}`} stroke={ink} strokeWidth="5" /></g>)}</g>;
  if (design === "waterfall") return <g fill="none" strokeLinecap="round">{[355,374,393,412].map((x, index) => <path d={`M${x} 230v${245-index*25}`} key={x} stroke={index % 2 ? accent : ink} strokeDasharray={index % 2 ? "18 9" : "4 10"} strokeWidth={index % 2 ? 5 : 3} />)}<path d="M345 490q38 28 78 0" stroke={ink} strokeWidth="5" /></g>;
  if (design === "ocean") return <g fill="none" strokeLinecap="round"><path d="M190 438c34-98 85-88 101-30 27-67 89-58 126 19-59-38-96 34-148 5-28-16-48-8-79 6Z" stroke={ink} strokeWidth="7" /><path d="M220 456c42-28 72 30 117 0 27-18 49-10 70 2" stroke={accent} strokeWidth="5" /></g>;
  if (design === "night-city") return <g fill="none" strokeLinecap="round"><path d="M170 530V390l50-38v178m0 0V318l61-42v254m0 0V370l56-35v195m0 0V300l72-42v272" stroke={ink} strokeWidth="5" /><path d="M160 530h265" stroke={accent} strokeWidth="6" />{[195,246,308,366,394].map((x) => <circle cx={x} cy="420" fill={accent} key={x} r="5" />)}</g>;
  if (design === "mountain") return <g fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="m335 350 42-58 58 83" stroke={ink} strokeWidth="6" /><path d="M365 318l12 14 12-15" stroke={accent} strokeWidth="5" /><path d="M330 430c55-18 44-52 86-58" stroke={accent} strokeDasharray="7 11" strokeWidth="5" /></g>;
  if (design === "tropical") return <g>{[[185,290],[240,390],[360,285],[415,430],[205,520],[385,550]].map(([x,y], index) => <g key={index} transform={`translate(${x} ${y}) rotate(${index*24})`}><path d="M0 0c32-35 57-25 64-17-20 33-43 39-64 17Z" fill={index % 2 ? accent : ink} opacity=".55" /><path d="M3 0h50" stroke={ink} strokeWidth="3" /></g>)}</g>;
  if (design === "rain") return <g fill="none" strokeLinecap="round"><path d="M340 315c7-34 58-38 71-6 37-5 46 45 10 56h-82c-30-5-28-46 1-50Z" stroke={ink} strokeWidth="6" />{[350,370,390,410,430].map((x,index) => <path d={`M${x} 390v${95+index*14}`} key={x} stroke={index % 2 ? accent : ink} strokeDasharray="5 10" strokeWidth="4" />)}</g>;
  return <g><rect fill={ink} height="145" rx="18" width="112" x="332" y="274" /><rect fill={accent} height="127" rx="12" width="94" x="341" y="283" /><circle cx="388" cy="324" fill={ink} r="22" /><path d="m354 384 32-39 17 19 14-15 18 35Z" fill={ink} /></g>;
}

function isDark(hex: string) { const value = hex.replace("#", ""); const [r, g, b] = [0, 2, 4].map((index) => Number.parseInt(value.slice(index, index + 2), 16)); return (r * 299 + g * 587 + b * 114) / 1000 < 145; }
function lighten(hex: string, amount: number) { return shift(hex, amount); }
function darken(hex: string, amount: number) { return shift(hex, -amount); }
function shift(hex: string, amount: number) { const value = hex.replace("#", ""); return `#${[0, 2, 4].map((index) => Math.max(0, Math.min(255, Number.parseInt(value.slice(index, index + 2), 16) + amount)).toString(16).padStart(2, "0")).join("")}`; }
