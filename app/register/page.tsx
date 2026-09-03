import Link from 'next/link';

export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-6 py-12">
      <div className="card w-full p-8">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <div className="mt-6 grid gap-4">
          <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Full name" />
          <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Email" />
          <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Password" type="password" />
          <button className="btn-primary w-full">Create account</button>
        </div>
        <div className="mt-4 text-center text-sm text-slate-600">
          Already a member?{' '}
          <Link href="/login" className="font-medium text-brand-600">
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
