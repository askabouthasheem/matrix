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
    <div className="group relative flex flex-col bg-white dark:bg-[#14151C] rounded-2xl border border-stone-200/80 dark:border-stone-800/80 shadow-premium hover:shadow-premium-hover hover:border-stone-300 dark:hover:border-stone-700 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden">
      {/* Product Image Frame */}
      <Link 
        href={`/listing/${listing.id}`} 
        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-850 border-b border-stone-100 dark:border-stone-800 block"
      >
        <SafeImage
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Subtle inner top-edge vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />

        {/* Elegant "Pickup Today" Badge - Architectural & Minimal */}
        {listing.isAvailableToday && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/95 dark:bg-stone-900/95 text-stone-700 dark:text-stone-300 text-[10px] font-semibold tracking-wider uppercase border border-stone-200/60 dark:border-stone-700/60 shadow-xs backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              Pickup today
            </span>
          </div>
        )}

        {/* Integrated Clean Discount Tag */}
        {discount && discount > 0 && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-stone-950 dark:bg-stone-100 text-white dark:text-stone-950 font-mono text-[10.5px] font-bold tracking-tight shadow-xs">
              -{discount}%
            </span>
          </div>
        )}

        {/* Tactile Floating Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(listing.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-400 hover:text-rose-500 active:scale-90 transition-all duration-150 shadow-xs backdrop-blur-md border border-stone-200/60 dark:border-stone-700/60"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors duration-150 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Card Body with Generous 20px Padding & Strong Price Hierarchy */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          {/* Seller Name & Campus Code */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-stone-500 dark:text-stone-400 truncate max-w-[150px] tracking-tight">
              {listing.brandName}
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded border border-stone-200/50 dark:border-stone-700/50">
              {listing.schoolShortName}
            </span>
          </div>

          {/* Card Title - Clean, Secondary to Price */}
          <Link href={`/listing/${listing.id}`} className="block">
            <h3 className="font-medium text-stone-900 dark:text-stone-100 text-[15px] leading-[1.38] line-clamp-2 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors duration-150">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Dominant Price Row: Visually commanding */}
        <div className="pt-3.5 border-t border-stone-100 dark:border-stone-800/80 flex items-end justify-between">
          <div>
            <div className="text-[22px] sm:text-[23px] font-extrabold text-stone-950 dark:text-stone-50 tracking-tight leading-none tabular-nums">
              ₦{listing.price.toLocaleString()}
            </div>
            {listing.originalPrice && (
              <div className="text-xs text-stone-400 line-through font-normal tabular-nums mt-1">
                ₦{listing.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          {/* Rating Pill */}
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-stone-50 dark:bg-stone-800/70 border border-stone-200/50 dark:border-stone-700/50 text-xs font-semibold text-stone-700 dark:text-stone-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span>{listing.rating.toFixed(1)}</span>
            <span className="text-stone-400 font-normal text-[11px]">({listing.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
