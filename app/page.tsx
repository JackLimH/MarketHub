import Link from 'next/link';
import ChatPanel from './chat-panel';

const featured = [
  { title: 'Modern Apartment', price: '$320,000', location: 'Kuala Lumpur' },
  { title: 'Family Villa', price: '$780,000', location: 'Johor Bahru' },
  { title: 'City Loft', price: '$240,000', location: 'Penang' },
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <section className="rounded-2xl bg-slate-900 px-8 py-12 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <span className="mb-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
              New listing platform
            </span>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Find your next perfect property.
            </h1>
            <p className="mt-4 text-slate-300">
              Browse curated listings, premium homes, and AI-assisted recommendations for your next move.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="btn-primary">Get Started</Link>
            <Link href="/dashboard" className="btn-secondary border-white/20 bg-white/5 text-white hover:bg-white/10">
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {featured.map((item) => (
          <div key={item.title} className="card overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-slate-200 to-slate-100" />
            <div className="p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <span className="rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">Featured</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{item.location}</p>
              <div className="mt-4 text-xl font-bold text-slate-900">{item.price}</div>
            </div>
          </div>
        ))}
      </section>

      <ChatPanel />
    </main>
  );
}
