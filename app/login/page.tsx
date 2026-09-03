import Link from 'next/link';

const providers = [
  { name: 'Google', label: 'Continue with Google' },
  { name: 'Facebook', label: 'Continue with Facebook' },
  { name: 'Microsoft', label: 'Continue with Microsoft' },
];

export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center justify-center px-6 py-12">
      <div className="card w-full p-8">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-slate-600">Sign in to manage your listings and premium features.</p>

        <div className="mt-6 space-y-3">
          {providers.map((provider) => (
            <button key={provider.name} className="btn-secondary w-full justify-center">
              {provider.label}
            </button>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          Need an account?{' '}
          <Link href="/register" className="font-medium text-brand-600">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
