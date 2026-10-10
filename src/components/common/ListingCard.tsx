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
    <div className="group relative flex flex-col bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/70 dark:border-stone-800 shadow-subtle hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
      {/* Product Image Frame */}
      <Link 
        href={`/listing/${listing.id}`} 
        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800/60 block"
      >
        <SafeImage
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Refined "Pickup Today" Badge */}
        {listing.isAvailableToday && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 text-[10px] font-semibold tracking-wider uppercase shadow-[0_2px_8px_rgba(0,0,0,0.06)] backdrop-blur-md border border-stone-200/60 dark:border-stone-700/60">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Pickup today
            </span>
          </div>
        )}

        {/* Tactile Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-500 dark:text-stone-300 hover:text-rose-500 active:scale-95 transition-all shadow-sm backdrop-blur-md"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Card Body with Generous Spacing */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Seller & Campus Line */}
          <div className="flex items-center justify-between text-[11px] font-medium text-stone-500 dark:text-stone-400">
            <span className="truncate max-w-[150px] tracking-tight">
              {listing.brandName}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              {listing.schoolShortName}
            </span>
          </div>

          {/* Title */}
          <Link href={`/listing/${listing.id}`} className="block">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-[14px] leading-snug line-clamp-2 tracking-tight group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Dominant Price & Star Rating Line */}
        <div className="pt-2.5 flex items-baseline justify-between border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-baseline gap-2">
            <span className="text-[17px] font-bold text-stone-950 dark:text-stone-50 tracking-tight">
              ₦{listing.price.toLocaleString()}
            </span>
            {listing.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-normal">
                ₦{listing.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-600 dark:text-stone-300 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{listing.rating.toFixed(1)}</span>
            <span className="text-stone-400 font-normal text-[11px]">({listing.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
