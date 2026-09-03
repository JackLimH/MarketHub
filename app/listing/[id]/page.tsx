export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  await params;
  const isPremium = true;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="card overflow-hidden">
        <div className="h-72 bg-gradient-to-br from-slate-200 to-slate-100" />
        <div className="p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Luxury Apartment</h1>
              <p className="mt-2 text-slate-600">Kuala Lumpur, Malaysia</p>
            </div>
            <div className="text-2xl font-bold">$420,000</div>
          </div>

          <p className="mt-5 text-slate-700">
            High-rise apartment with city views, natural lighting, and walkable access to public transport.
          </p>

          {isPremium && (
            <button className="btn-primary mt-6">AI Enhance Image</button>
          )}
        </div>
      </div>
    </main>
  );
}
