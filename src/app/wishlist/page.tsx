"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ListingCard } from '@/components/common/ListingCard';

export default function WishlistPage() {
  const { wishlist, listings } = useApp();

  const wishlistedListings = listings.filter(l => wishlist.includes(l.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <span>Saved Wishlist ({wishlistedListings.length})</span>
          </h1>
          <p className="text-xs text-stone-500">Items and services you saved for later</p>
        </div>
      </div>

      {wishlistedListings.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-surface-darkCard rounded-card border border-stone-200 dark:border-stone-800 p-8">
          <Heart className="w-12 h-12 text-stone-300 mx-auto mb-2" />
          <h3 className="font-bold text-sm text-stone-800 dark:text-stone-200">Your wishlist is empty</h3>
          <p className="text-xs text-stone-500 max-w-xs mx-auto mb-4">
            Tap the heart icon on any product or braid service card to save it here!
          </p>
          <Link href="/search" className="px-4 py-2 rounded-button bg-brand-900 text-white text-xs font-bold inline-block">
            Browse Campus Deals
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistedListings.map(listing => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
