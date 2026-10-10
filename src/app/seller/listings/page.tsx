"use client";

import React from 'react';
import Link from 'next/link';
import { Store, PlusCircle, Trash2, Edit3, Eye, ShieldCheck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SafeImage } from '@/components/common/SafeImage';

export default function SellerListingsPage() {
  const { listings, deleteListing, updateListing } = useApp();

  const sellerListings = listings.filter(l => l.brandName === "Tobi Tech Hub" || l.brandId === "brand_tobi_tech");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <Store className="w-6 h-6 text-brand-600" />
            <span>My Store Listings ({sellerListings.length})</span>
          </h1>
          <p className="text-xs text-stone-500">
            Manage your campus products, braid services, and skill bootcamps
          </p>
        </div>

        <Link
          href="/seller/listings/new"
          className="px-4 py-2.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Campus Item</span>
        </Link>
      </div>

      {sellerListings.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-surface-darkCard rounded-card border text-xs text-stone-500 space-y-3">
          <div>No active listings found for your brand yet.</div>
          <Link href="/seller/listings/new" className="px-4 py-2 rounded-button bg-brand-900 text-white font-bold inline-block">
            Create First Listing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sellerListings.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                  <SafeImage src={item.images[0]} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-brand-600 uppercase block">{item.categoryName}</span>
                  <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{item.title}</h3>
                  <div className="text-xs font-black text-stone-900 dark:text-stone-100 mt-1">
                    ₦{item.price.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100 dark:border-stone-800">
                <span className="text-stone-400 text-[11px]">{item.views} Views • Stock: {item.stock}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateListing(item.id, { isAvailableToday: !item.isAvailableToday })}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.isAvailableToday ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-100 text-stone-600'}`}
                  >
                    {item.isAvailableToday ? 'Pickup Today: YES' : 'Pickup Today: NO'}
                  </button>
                  <button
                    onClick={() => deleteListing(item.id)}
                    className="p-1 text-stone-400 hover:text-rose-500 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
