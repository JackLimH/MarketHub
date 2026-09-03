'use client';

import { FormEvent, useState } from 'react';

type ChatResponse = {
  message: string;
  data: {
    summary: string;
    recommendations: string[];
    upsell?: string;
  };
};

export default function ChatPanel() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<ChatResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();

    if (!message || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const result = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!result.ok) throw new Error('Chat request failed');

      setResponse((await result.json()) as ChatResponse);
      setInput('');
    } catch {
      setError('The assistant is unavailable right now. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="card mt-10 p-6" aria-labelledby="assistant-title">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-600">Property assistant</p>
          <h2 id="assistant-title" className="mt-1 text-2xl font-bold text-slate-900">Tell us what you are looking for.</h2>
        </div>
        <span className="text-sm text-slate-500">Stubbed now, AI-ready later</span>
      </div>

      <form className="mt-5 flex flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="property-question">Ask about properties</label>
        <input
          id="property-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="e.g. Find a family home near Kuala Lumpur"
          className="min-w-0 flex-1 rounded-md border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          disabled={isLoading}
        />
        <button type="submit" className="btn-primary" disabled={isLoading || !input.trim()}>
          {isLoading ? 'Thinking...' : 'Ask assistant'}
        </button>
      </form>

      {error && <p className="mt-4 text-sm text-red-600" role="alert">{error}</p>}
      {response && (
        <div className="mt-6 border-t border-slate-200 pt-5">
          <p className="text-sm text-slate-700">{response.message}</p>
          <p className="mt-3 font-medium text-slate-900">{response.data.summary}</p>
          <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
            {response.data.recommendations.map((recommendation) => <li key={recommendation}>• {recommendation}</li>)}
          </ul>
          {response.data.upsell && <p className="mt-4 text-sm font-medium text-brand-700">{response.data.upsell}</p>}
        </div>
      )}
    </section>
  );
}