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
    <div className="group relative flex flex-col bg-white dark:bg-stone-900 rounded-[18px] border border-stone-200/60 dark:border-stone-800/80 shadow-subtle hover:shadow-card-hover hover:-translate-y-[3px] transition-all duration-350 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-hidden">
      {/* Product Image Frame */}
      <Link 
        href={`/listing/${listing.id}`} 
        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800/60 block"
      >
        <SafeImage
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-600 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Subtle inner vignette for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.04] to-transparent pointer-events-none" />

        {/* Elegant "Pickup Today" Badge */}
        {listing.isAvailableToday && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-[5px] rounded-lg bg-stone-950/80 dark:bg-stone-900/90 text-white text-[10px] font-semibold tracking-wider uppercase backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              Pickup today
            </span>
          </div>
        )}

        {/* Discount badge */}
        {discount && discount > 0 && (
          <div className="absolute bottom-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent-500/90 text-white text-[10px] font-bold tracking-tight backdrop-blur-sm">
              -{discount}%
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
          className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-white/85 dark:bg-stone-900/85 text-stone-500 dark:text-stone-400 hover:text-rose-500 active:scale-90 transition-all duration-200 shadow-sm backdrop-blur-md border border-white/30 dark:border-stone-700/30"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-3.5 h-3.5 transition-colors duration-200 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>
      </Link>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
        {/* Seller & Campus */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-700 dark:text-stone-300 truncate max-w-[140px] tracking-tight">
              {listing.brandName}
            </span>
            <span className="text-stone-300 dark:text-stone-600">·</span>
            <span className="flex items-center gap-0.5 text-stone-400 font-medium">
              <MapPin className="w-2.5 h-2.5" />
              {listing.schoolShortName}
            </span>
          </div>

          {/* Title */}
          <Link href={`/listing/${listing.id}`} className="block">
            <h3 className="font-semibold text-stone-950 dark:text-stone-50 text-[14px] leading-[1.35] line-clamp-2 tracking-[-0.01em] group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors duration-200">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Price & Rating: Strong hierarchy */}
        <div className="pt-3 flex items-end justify-between border-t border-stone-100/80 dark:border-stone-800/60">
          <div className="flex items-baseline gap-2">
            <span className="text-[18px] font-extrabold text-stone-950 dark:text-stone-50 tracking-[-0.02em] leading-none">
              ₦{listing.price.toLocaleString()}
            </span>
            {listing.originalPrice && (
              <span className="text-[11px] text-stone-400 line-through font-medium">
                ₦{listing.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-600 dark:text-stone-400 font-medium">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-stone-700 dark:text-stone-300">{listing.rating.toFixed(1)}</span>
            <span className="text-stone-400 dark:text-stone-500">({listing.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
