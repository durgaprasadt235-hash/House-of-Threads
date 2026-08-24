const phases = [
  "Storefront and product discovery",
  "Customer authentication and accounts",
  "Cart, checkout, payments, and orders",
  "Admin operations and inventory",
  "Puzzle, QR, rewards, media, and email",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-950">
      <section className="mx-auto flex min-h-[72vh] max-w-6xl flex-col justify-between px-6 py-10 sm:px-10 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.32em]">House of Threads</p>
        <div className="max-w-4xl py-24">
          <p className="mb-6 text-sm uppercase tracking-[0.24em] text-stone-500">
            Elphino · The Walker Company
          </p>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Two brands. One carefully built house.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-600">
            The shared commerce and data foundation is ready. Storefront experiences will be built in
            the next project phase.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-stone-300 pt-5 text-sm text-stone-600">
          <span>Next.js</span><span>PostgreSQL</span><span>Prisma</span><span>Vercel-ready</span>
        </div>
      </section>
      <section className="bg-stone-950 px-6 py-20 text-stone-100 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Planned next</p>
          <ol className="mt-10 grid gap-px bg-stone-800 md:grid-cols-5">
            {phases.map((phase, index) => (
              <li key={phase} className="min-h-44 bg-stone-950 p-6">
                <span className="text-xs text-stone-500">{String(index + 3).padStart(2, "0")}</span>
                <p className="mt-12 leading-6">{phase}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
