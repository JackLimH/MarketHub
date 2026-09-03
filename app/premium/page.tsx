export default function PremiumPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="card p-8">
        <h1 className="text-3xl font-bold">Premium</h1>
        <p className="mt-2 text-slate-600">Upgrade to unlock AI-enhanced listing images and advanced tools.</p>

        <div className="mt-6 rounded-xl bg-gradient-to-r from-brand-500 to-brand-700 p-6 text-white">
          <div className="text-sm uppercase tracking-[0.2em] text-brand-100">Plan</div>
          <div className="mt-3 text-3xl font-bold">$19 / month</div>
          <ul className="mt-4 space-y-2 text-sm text-brand-50">
            <li>• AI image enhancement</li>
            <li>• Premium placement</li>
            <li>• Smart recommendations</li>
          </ul>
        </div>

        <button className="btn-primary mt-8">Subscribe to Premium</button>
      </div>
    </main>
  );
}
