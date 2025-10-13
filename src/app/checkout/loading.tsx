export default function CheckoutLoading() {
  return (
    <main className="w-full">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-8">
        {/* Title skeleton */}
        <div className="mx-auto h-10 w-56 rounded-full bg-slate-200 animate-pulse" />
        <div className="mx-auto mt-3 h-8 w-80 rounded-full bg-slate-200 animate-pulse" />
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
              <div className="grid gap-8">
                <div className="rounded-2xl border border-slate-200 p-8">
                  <div className="h-6 w-40 bg-slate-200 rounded animate-pulse" />
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="h-10 bg-slate-200 rounded animate-pulse" />
                    <div className="h-10 bg-slate-200 rounded animate-pulse" />
                    <div className="col-span-2 h-10 bg-slate-200 rounded animate-pulse" />
                    <div className="col-span-2 h-10 bg-slate-200 rounded animate-pulse" />
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-8">
                  <div className="h-6 w-44 bg-slate-200 rounded animate-pulse" />
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="h-14 bg-slate-200 rounded animate-pulse" />
                    <div className="h-14 bg-slate-200 rounded animate-pulse" />
                    <div className="h-14 bg-slate-200 rounded animate-pulse" />
                  </div>
                  <div className="mt-6 h-10 w-full bg-slate-200 rounded animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
