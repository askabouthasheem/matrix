"use client";

import React from 'react';
import Link from 'next/link';
import { Heart, Star, Clock, MapPin, Zap, MessageCircle } from 'lucide-react';
import { Listing } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';
import { SafeImage } from './SafeImage';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { wishlist, toggleWishlist, startConversation } = useApp();
  const isWishlisted = wishlist.includes(listing.id);

  const typeBadges = {
    PRODUCT: { label: 'Product', color: 'bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-200' },
    SERVICE: { label: 'Service', color: 'bg-purple-50 text-purple-800 dark:bg-purple-950/80 dark:text-purple-300' },
    TRAINING: { label: 'Training', color: 'bg-amber-50 text-amber-900 dark:bg-amber-950/80 dark:text-amber-300' },
  };

  return (
    <div className="group relative bg-white dark:bg-surface-darkCard rounded-card border border-stone-200/90 dark:border-surface-darkBorder overflow-hidden shadow-subtle hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <SafeImage
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover object-center group-hover:scale-102 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${typeBadges[listing.type].color} backdrop-blur-sm shadow-sm`}>
            {typeBadges[listing.type].label}
          </span>
          {listing.isAvailableToday && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-600 text-white shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Pickup Today
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(listing.id);
          }}
          className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shadow-subtle backdrop-blur-sm"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Campus Location Tag */}
        <div className="absolute bottom-2 left-2.5 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-stone-900/80 text-white text-[10px] font-bold backdrop-blur-md border border-white/10">
            <MapPin className="w-3 h-3 text-accent-400" /> {listing.schoolShortName}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Brand Info & Rating */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 truncate max-w-[170px]">
              {listing.brandName}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-extrabold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{listing.rating}</span>
              <span className="text-stone-400 font-normal">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/listing/${listing.id}`} className="group-hover:text-brand-700 dark:group-hover:text-brand-400 transition-colors">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm leading-snug line-clamp-2">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Bottom Price & Quick Chat Action */}
        <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-50">
                ₦{listing.price.toLocaleString()}
              </span>
              {listing.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-normal">
                  ₦{listing.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              <Clock className="w-3 h-3 shrink-0" /> Replies {listing.brandResponseTime}
            </div>
          </div>

          <Link
            href={`/chat?listingId=${listing.id}`}
            onClick={() => startConversation(listing)}
            className="p-2.5 rounded-button bg-stone-100 hover:bg-brand-900 hover:text-white dark:bg-stone-800 dark:hover:bg-brand-600 text-stone-700 dark:text-stone-200 transition-colors"
            title="Chat with Seller"
          >
            <MessageCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
