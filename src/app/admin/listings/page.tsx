"use client";

import React from 'react';
import Link from 'next/link';
import { Package, Trash2, Eye } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SafeImage } from '@/components/common/SafeImage';

export default function AdminListingsPage() {
  const { listings, deleteListing } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <Package className="w-5 h-5 text-rose-600" />
            <span>Listings Moderation Panel ({listings.length})</span>
          </h1>
          <p className="text-xs text-stone-500">Audit and moderate active campus listings across all 5 universities</p>
        </div>
        <Link href="/admin/dashboard" className="text-xs font-bold text-rose-600 hover:underline">
          ← Back to Admin Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-surface-darkCard rounded-card border divide-y overflow-hidden">
        {listings.map(item => (
          <div key={item.id} className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
                <SafeImage src={item.images[0]} alt={item.title} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{item.title}</h4>
                <div className="text-[11px] text-stone-400 mt-0.5">
                  Vendor: {item.brandName} • Campus: {item.schoolShortName} • Price: ₦{item.price.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={`/listing/${item.id}`} className="px-2.5 py-1 rounded bg-stone-100 hover:bg-stone-200 text-xs font-bold text-stone-700">
                View
              </Link>
              <button
                onClick={() => deleteListing(item.id)}
                className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-600 hover:text-white text-xs font-bold text-rose-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
