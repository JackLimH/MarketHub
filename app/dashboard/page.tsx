const mockListings = [
  { id: 1, title: 'Luxury condo', price: '$420,000', location: 'Kuala Lumpur' },
  { id: 2, title: 'Beachfront villa', price: '$980,000', location: 'Langkawi' },
  { id: 3, title: 'City apartment', price: '$270,000', location: 'Penang' },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-slate-600">Manage your listings and account activity.</p>
        </div>
        <button className="btn-primary">Create listing</button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {mockListings.map((listing) => (
          <div key={listing.id} className="card p-5">
            <div className="h-40 rounded-lg bg-gradient-to-br from-slate-200 to-slate-100" />
            <h3 className="mt-4 text-lg font-semibold">{listing.title}</h3>
            <p className="text-sm text-slate-600">{listing.location}</p>
            <div className="mt-3 text-xl font-bold">{listing.price}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
