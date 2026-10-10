"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Clock, MapPin, Zap, MessageCircle } from 'lucide-react';
import { Listing } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { wishlist, toggleWishlist, startConversation } = useApp();
  const isWishlisted = wishlist.includes(listing.id);

  const typeBadges = {
    PRODUCT: { label: 'Product', color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/80 dark:text-blue-300' },
    SERVICE: { label: 'Service', color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300' },
    TRAINING: { label: 'Training', color: 'bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300' },
  };

  return (
    <div className="group relative bg-white dark:bg-surface-darkCard rounded-card border border-surface-border dark:border-surface-darkBorder overflow-hidden shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <Image
          src={listing.images[0]}
          alt={listing.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeBadges[listing.type].color}`}>
            {typeBadges[listing.type].label}
          </span>
          {listing.isAvailableToday && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500 text-white shadow-sm">
              <Zap className="w-3 h-3 fill-current" /> Pickup Today
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(listing.id);
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-rose-500 dark:hover:text-rose-400 transition-colors shadow-sm backdrop-blur-sm"
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Campus Location Tag */}
        <div className="absolute bottom-2 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-900/80 text-white text-[11px] font-medium backdrop-blur-sm">
            <MapPin className="w-3 h-3 text-accent-400" /> {listing.schoolShortName}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand Info */}
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400 line-clamp-1">
              {listing.brandName}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{listing.rating}</span>
              <span className="text-stone-400 font-normal">({listing.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/listing/${listing.id}`} className="group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 text-sm sm:text-base line-clamp-2 leading-snug mb-2">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Bottom Price & Chat Action */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between mt-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
                ₦{listing.price.toLocaleString()}
              </span>
              {listing.originalPrice && (
                <span className="text-xs text-stone-400 line-through">
                  ₦{listing.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
              <Clock className="w-3 h-3" /> Replies {listing.brandResponseTime}
            </div>
          </div>

          <Link
            href={`/chat?listingId=${listing.id}`}
            onClick={() => startConversation(listing)}
            className="p-2.5 rounded-button bg-brand-50 text-brand-700 hover:bg-brand-900 hover:text-white dark:bg-brand-950 dark:text-brand-300 dark:hover:bg-brand-600 transition-colors"
            title="Chat with Seller"
          >
            <MessageCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
