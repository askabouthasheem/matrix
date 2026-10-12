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
    <div className="group relative flex flex-col bg-white dark:bg-[#15161D] rounded-[20px] border border-stone-200/80 dark:border-stone-800/80 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_6px_16px_rgba(0,0,0,0.025)] hover:shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] hover:border-stone-300/90 dark:hover:border-stone-700 hover:-translate-y-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden">
      {/* Product Image Frame */}
      <Link 
        href={`/listing/${listing.id}`} 
        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-850 border-b border-stone-100 dark:border-stone-800/60 block"
      >
        <SafeImage
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Subtle inner vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />

        {/* Exquisite Frosted "Pickup Today" Badge */}
        {listing.isAvailableToday && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-900 dark:text-stone-100 text-[10px] font-bold tracking-[0.03em] uppercase backdrop-blur-md border border-stone-200/70 dark:border-stone-700/70 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Pickup today
            </span>
          </div>
        )}

        {/* Minimalist Discount Badge */}
        {discount && discount > 0 && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-950/80 dark:bg-stone-100/90 text-white dark:text-stone-950 text-[10px] font-bold font-mono tracking-tight backdrop-blur-xs">
              -{discount}%
            </span>
          </div>
        )}

        {/* Tactile Circular Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-400 hover:text-rose-500 active:scale-90 transition-all duration-200 shadow-[0_2px_6px_rgba(0,0,0,0.06)] backdrop-blur-md border border-stone-200/60 dark:border-stone-700/60"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors duration-200 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Card Body with Refined Spacing */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3.5">
        <div className="space-y-2">
          {/* Seller & Campus Line */}
          <div className="flex items-center justify-between text-[11.5px]">
            <span className="font-semibold text-stone-600 dark:text-stone-400 truncate max-w-[145px] tracking-tight">
              {listing.brandName}
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800/80 px-1.5 py-0.5 rounded border border-stone-200/50 dark:border-stone-700/50">
              {listing.schoolShortName}
            </span>
          </div>

          {/* Title with Confident Typography */}
          <Link href={`/listing/${listing.id}`} className="block">
            <h3 className="font-bold text-stone-950 dark:text-stone-50 text-[14.5px] leading-[1.38] line-clamp-2 tracking-[-0.015em] group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors duration-200">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Dominant Price & Star Rating Line */}
        <div className="pt-3 flex items-end justify-between border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-baseline">
            <span className="text-[19px] sm:text-[20px] font-black text-stone-950 dark:text-stone-50 tracking-[-0.03em] leading-none tabular-nums">
              ₦{listing.price.toLocaleString()}
            </span>
            {listing.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-medium tabular-nums ml-2">
                ₦{listing.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-stone-700 dark:text-stone-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{listing.rating.toFixed(1)}</span>
            <span className="text-stone-400 font-normal text-[11px]">({listing.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
