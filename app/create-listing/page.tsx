'use client';

import { useState } from 'react';

const initialImages: string[] = [];

export default function CreateListingPage() {
  const [images, setImages] = useState<string[]>(initialImages);

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ?? [];
    const nextImages = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((current) => [...current, ...nextImages]);
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <div className="card p-8">
        <h1 className="text-3xl font-bold">Create a listing</h1>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Property title" />
          <input className="rounded-md border border-slate-300 px-3 py-2" placeholder="Price" />
          <input className="rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Location" />
          <textarea className="min-h-32 rounded-md border border-slate-300 px-3 py-2 md:col-span-2" placeholder="Description" />
        </div>

        <div className="mt-8">
          <label className="block text-sm font-medium">Upload photos</label>
          <input type="file" accept="image/*" multiple onChange={handleFiles} className="mt-2 block w-full text-sm text-slate-600" />
          <div className="mt-4 flex flex-wrap gap-3">
            {images.length === 0 ? (
              <div className="rounded-md border border-dashed border-slate-300 p-6 text-sm text-slate-500">
                No preview yet.
              </div>
            ) : (
              images.map((image, index) => (
                <img key={`${image}-${index}`} src={image} alt="Upload preview" className="h-24 w-24 rounded-lg object-cover" />
              ))
            )}
          </div>
        </div>

        <div className="mt-8">
          <button className="btn-primary">Publish listing</button>
        </div>
      </div>
    </main>
  );
}
