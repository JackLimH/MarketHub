export default function CreateListingLoading() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="card p-8 animate-pulse space-y-4">
        <div className="h-8 w-52 rounded bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-12 rounded bg-slate-200" />
          <div className="h-12 rounded bg-slate-200" />
          <div className="h-12 rounded bg-slate-200 md:col-span-2" />
          <div className="h-32 rounded bg-slate-200 md:col-span-2" />
        </div>
      </div>
    </main>
  );
}
