"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Listing } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { SafeImage } from './SafeImage';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(listing.id);

  return (
    <div className="group relative flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/70 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-200 overflow-hidden">
      {/* Product Image */}
      <Link href={`/listing/${listing.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800/50 block">
        <SafeImage
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Clean, Subtle Pickup Indicator if available today */}
        {listing.isAvailableToday && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 text-[11px] font-medium shadow-sm backdrop-blur-sm border border-stone-200/50 dark:border-stone-700/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Pickup today
            </span>
          </div>
        )}

        {/* Quiet Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-600 dark:text-stone-300 hover:text-rose-500 transition-colors shadow-sm backdrop-blur-sm"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Details: Clear, Uncluttered Hierarchy */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Seller & Campus Line */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
            <span className="truncate max-w-[160px] font-medium">
              {listing.brandName}
            </span>
            <span className="text-[11px] font-medium text-stone-400">
              {listing.schoolShortName}
            </span>
          </div>

          {/* Title */}
          <Link href={`/listing/${listing.id}`}>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm leading-snug line-clamp-2 hover:text-brand-900 dark:hover:text-stone-300 transition-colors">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Price & Rating Line */}
        <div className="pt-2 flex items-baseline justify-between border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-stone-900 dark:text-stone-50">
              ₦{listing.price.toLocaleString()}
            </span>
            {listing.originalPrice && (
              <span className="text-xs text-stone-400 line-through">
                ₦{listing.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium">{listing.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
