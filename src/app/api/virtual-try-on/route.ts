import { readFile } from "node:fs/promises";
import path from "node:path";

import { elphinoProducts } from "@/data/elphino-products";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_IMAGE_BYTES = 12 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const apiKey = process.env.RAPIDAPI_VIRTUAL_TRYON_KEY;
  if (!apiKey) return Response.json({ error: "Free try-on credits are not connected yet." }, { status: 503 });

  const form = await request.formData();
  const avatar = form.get("avatar");
  const productId = form.get("productId");
  const color = form.get("color");
  if (!(avatar instanceof File) || typeof productId !== "string") return Response.json({ error: "Photo and product are required." }, { status: 400 });
  if (!ALLOWED_TYPES.has(avatar.type)) return Response.json({ error: "Upload a JPG, PNG or WebP photo." }, { status: 400 });
  if (avatar.size > MAX_IMAGE_BYTES) return Response.json({ error: "Photo must be smaller than 12 MB." }, { status: 400 });

  const product = elphinoProducts.find((item) => item.id === productId);
  if (!product) return Response.json({ error: "Product not found." }, { status: 404 });

  const selectedImage = typeof color === "string" ? product.colorImages?.[color] || product.image : product.image;
  const garmentPath = path.join(process.cwd(), "public", selectedImage.replace(/^\//, ""));
  const garmentBytes = await readFile(garmentPath);
  const providerForm = new FormData();
  providerForm.set("avatar_image", avatar, avatar.name || "customer-photo.jpg");
  providerForm.set("clothing_image", new Blob([garmentBytes], { type: "image/png" }), `${product.id}.png`);

  const providerResponse = await fetch("https://try-on-diffusion.p.rapidapi.com/try-on-file", {
    method: "POST",
    headers: {
      "x-rapidapi-host": "try-on-diffusion.p.rapidapi.com",
      "x-rapidapi-key": apiKey,
    },
    body: providerForm,
    cache: "no-store",
  });

  if (!providerResponse.ok) {
    const detail = await providerResponse.text();
    const message = providerResponse.status === 429 ? "The free monthly try-on limit has been reached." : providerResponse.status === 403 ? "The free try-on connection needs attention." : "The try-on could not be generated. Please try another front-facing photo.";
    console.error("Virtual try-on provider error", providerResponse.status, detail.slice(0, 500));
    return Response.json({ error: message }, { status: providerResponse.status });
  }

  return new Response(await providerResponse.arrayBuffer(), {
    headers: {
      "Content-Type": "image/jpeg",
      "Cache-Control": "private, no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
