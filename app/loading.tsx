export default function Loading() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Sidebar skeleton */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 hidden lg:flex flex-col bg-zinc-900/80 border-r border-zinc-800/50">
        {/* Logo */}
        <div className="flex h-16 items-center px-5 border-b border-zinc-800/50">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-zinc-800 animate-pulse" />
            <div className="h-4 w-24 rounded bg-zinc-800 animate-pulse" />
          </div>
        </div>

        {/* Nav items */}
        <div className="flex-1 p-4 space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-3 py-2.5">
              <div className="h-[18px] w-[18px] rounded bg-zinc-800 animate-pulse" />
              <div className="h-3.5 w-20 rounded bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
            </div>
          ))}
        </div>

        {/* User profile */}
        <div className="p-4 border-t border-zinc-800/50">
          <div className="flex items-center gap-3 px-2 py-2.5">
            <div className="h-9 w-9 rounded-full bg-zinc-800 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-20 rounded bg-zinc-800 animate-pulse" />
              <div className="h-2.5 w-14 rounded bg-zinc-800 animate-pulse" />
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header skeleton */}
        <header className="sticky top-0 z-30 h-16 border-b border-zinc-800/50 bg-zinc-950/80">
          <div className="flex h-full items-center justify-between px-4 lg:px-8">
            <div className="h-9 w-72 rounded-lg bg-zinc-900/50 border border-zinc-800/50 animate-pulse" />
            <div className="h-9 w-9 rounded-lg bg-zinc-800 animate-pulse" />
          </div>
        </header>

        {/* Page content skeleton */}
        <main className="p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="mb-8">
              <div className="h-7 w-36 rounded bg-zinc-800 animate-pulse mb-2" />
              <div className="h-4 w-56 rounded bg-zinc-800/60 animate-pulse" />
            </div>

            {/* KPI strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-4 lg:p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-zinc-800 animate-pulse" />
                    <div className="h-3 w-16 rounded bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                  </div>
                  <div className="h-8 w-12 rounded bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                </div>
              ))}
            </div>

            {/* Cards grid */}
            <div className="grid gap-4 lg:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-24 rounded-md bg-zinc-800 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  </div>
                  <div className="h-5 w-3/4 rounded bg-zinc-800 animate-pulse mb-2" style={{ animationDelay: `${i * 100}ms` }} />
                  <div className="space-y-1.5 mb-4">
                    <div className="h-3.5 w-full rounded bg-zinc-800/60 animate-pulse" />
                    <div className="h-3.5 w-2/3 rounded bg-zinc-800/60 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-5 w-14 rounded bg-zinc-800/60 animate-pulse" />
                    <div className="h-5 w-14 rounded bg-zinc-800/60 animate-pulse" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-20 rounded bg-zinc-800 animate-pulse" />
                    <div className="h-7 w-20 rounded-lg bg-zinc-800 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
