export default function DashboardLoading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-48 rounded bg-slate-200" />
        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card p-5">
              <div className="h-40 rounded-lg bg-slate-200" />
              <div className="mt-4 h-6 w-2/3 rounded bg-slate-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
