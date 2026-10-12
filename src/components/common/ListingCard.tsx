"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Star, MapPin } from 'lucide-react';
import { Listing } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { SafeImage } from './SafeImage';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(listing.id);

  const discount = listing.originalPrice
    ? Math.round(((listing.originalPrice - listing.price) / listing.originalPrice) * 100)
    : null;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-[#15161D] rounded-[14px] border border-stone-200/60 dark:border-stone-800/60 shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.03)] hover:border-stone-300/80 dark:hover:border-stone-700 hover:-translate-y-0.5 transition-all duration-200 ease-out overflow-hidden">
      {/* Product Image Frame */}
      <Link 
        href={`/listing/${listing.id}`} 
        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-850 border-b border-stone-100/80 dark:border-stone-800/60 block"
      >
        <SafeImage
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-200 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Refined "Pickup Today" Badge - Soft Green, Refined Weight */}
        {listing.isAvailableToday && (
          <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-600 dark:text-stone-300 text-[10px] font-medium tracking-tight border border-stone-200/50 dark:border-stone-700/50 shadow-xs backdrop-blur-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shrink-0" />
              Pickup today
            </span>
          </div>
        )}

        {/* Small, Clean Discount Badge */}
        {discount && discount > 0 && (
          <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-white dark:text-stone-900 bg-stone-900/80 dark:bg-stone-100/90 text-[10px] font-semibold font-mono tracking-tight backdrop-blur-xs">
              -{discount}%
            </span>
          </div>
        )}

        {/* Subtle Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-400 hover:text-rose-500 active:scale-95 transition-all duration-150 shadow-xs backdrop-blur-xs border border-stone-200/50 dark:border-stone-700/50"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors duration-150 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Card Body with Tightened Vertical Rhythm & 18px Padding */}
      <div className="p-4 sm:p-[18px] flex-1 flex flex-col justify-between gap-3.5">
        <div>
          {/* Seller Name & Campus */}
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="font-medium text-stone-400 dark:text-stone-400 truncate max-w-[145px]">
              {listing.brandName}
            </span>
            <span className="font-mono text-[10px] font-medium text-stone-400 dark:text-stone-400">
              {listing.schoolShortName}
            </span>
          </div>

          {/* Card Title: Readable, Clearly Secondary to Price (14-15px, Medium Weight) */}
          <Link href={`/listing/${listing.id}`} className="block">
            <h3 className="font-medium text-stone-900 dark:text-stone-100 text-[14.5px] leading-snug line-clamp-2 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors duration-150">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Price Row: Dominant & Confident (18-20px, font-bold 600-700) */}
        <div className="pt-3 border-t border-stone-100/90 dark:border-stone-800/60 flex items-baseline justify-between">
          <div className="flex items-baseline">
            <span className="text-[19px] font-bold text-stone-950 dark:text-stone-50 tracking-tight leading-none tabular-nums">
              ₦{listing.price.toLocaleString()}
            </span>
            {listing.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-normal tabular-nums ml-2">
                ₦{listing.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="text-stone-700 dark:text-stone-300 font-semibold">{listing.rating.toFixed(1)}</span>
            <span className="text-stone-400 text-[11px]">({listing.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
