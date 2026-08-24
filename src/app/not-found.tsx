import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-stone-50 px-6 text-center">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-stone-500">404</p>
        <h1 className="mt-5 font-serif text-5xl">This thread ends here.</h1>
        <Link className="mt-8 inline-block border-b border-stone-950 pb-1 text-sm" href="/">Return home</Link>
      </div>
    </main>
  );
}
