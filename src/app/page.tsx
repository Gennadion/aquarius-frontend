export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl">
          Aquarius
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
          Your Next.js + TypeScript + Tailwind CSS project is ready.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://nextjs.org/docs"
            className="rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 transition-colors"
          >
            Get started
          </a>
          <a
            href="https://github.com"
            className="text-sm font-semibold leading-6 text-slate-900 dark:text-white hover:text-primary-600 transition-colors"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  )
}


