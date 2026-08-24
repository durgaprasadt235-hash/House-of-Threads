"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-red-700">Something went wrong</p>
        <h1 className="mt-5 font-serif text-5xl">We dropped a stitch.</h1>
        <button className="mt-8 border-b border-stone-950 pb-1 text-sm" onClick={reset} type="button">Try again</button>
      </div>
    </main>
  );
}
