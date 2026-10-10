"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Star, 
  Clock, 
  MapPin, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  ExternalLink,
  Lock,
  ArrowLeft,
  Share2,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { REVIEWS } from '@/lib/mockData';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { SafeImage, DEFAULT_FALLBACK } from '@/components/common/SafeImage';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { listings, wishlist, toggleWishlist, addToCart, startConversation } = useApp();

  const listingId = params.id as string;
  const listing = listings.find(l => l.id === listingId) || listings[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const isWishlisted = wishlist.includes(listing.id);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const currentImage = listing.images[selectedImageIndex] || listing.images[0] || DEFAULT_FALLBACK;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Link */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to campus marketplace
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Media & Specifications */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/70 dark:border-stone-800">
            <SafeImage
              src={currentImage}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />

            {/* Quiet Overlay Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              {listing.isAvailableToday && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-stone-900/95 text-stone-800 dark:text-stone-200 text-xs font-medium shadow-sm backdrop-blur-sm border border-stone-200/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Pickup today
                </span>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(listing.id)}
              className="absolute top-3 right-3 z-10 p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-rose-500 transition-colors shadow-sm backdrop-blur-sm"
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnails if multiple */}
          {listing.images.length > 1 && (
            <div className="flex items-center gap-3">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx 
                      ? 'border-stone-900 dark:border-stone-100 shadow-sm' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <SafeImage src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Section */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 space-y-3">
            <h2 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              About this item
            </h2>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line font-normal">
              {listing.description}
            </p>
          </div>
        </div>

        {/* Right Column: Clean Purchase Card & Seller Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 space-y-6">
            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5" /> {listing.schoolShortName} Campus
              </span>
              <span>{listing.categoryName}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50 leading-tight">
              {listing.title}
            </h1>

            {/* Price Area */}
            <div className="pt-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-stone-900 dark:text-stone-50">
                  ₦{listing.price.toLocaleString()}
                </span>
                {listing.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">
                    ₦{listing.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 mt-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Held in Paystack escrow until pickup confirmation</span>
              </p>
            </div>

            {/* Primary Action Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 font-semibold text-sm transition-colors shadow-sm"
              >
                Pay via Escrow (₦{listing.price.toLocaleString()})
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(listing)}
                  className="py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to cart</span>
                </button>

                <Link
                  href={`/chat?listingId=${listing.id}`}
                  onClick={() => startConversation(listing)}
                  className="py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat seller</span>
                </Link>
              </div>
            </div>

            {/* Quiet Fallback Link */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <a
                href={`https://wa.me/2348123456789?text=${encodeURIComponent(`Hi ${listing.brandName}, I'm interested in "${listing.title}" on CampusHustle.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>WhatsApp catalog fallback</span>
              </a>
              <button onClick={handleShare} className="text-stone-400 hover:text-stone-600 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Seller Profile Card: Calm & High-Trust */}
          <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                <SafeImage src={listing.brandLogo} alt={listing.brandName} fill className="object-cover" />
              </div>
              <div className="min-w-0">
                <Link href={`/brand/${listing.brandId}`} className="font-semibold text-sm text-stone-900 dark:text-stone-100 hover:underline block truncate">
                  {listing.brandName}
                </Link>
                <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                  <span className="flex items-center gap-1 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {listing.rating}
                  </span>
                  <span>•</span>
                  <span>{listing.brandTrustScore}% trust score</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-stone-500 flex items-center gap-1.5 pt-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Replies {listing.brandResponseTime}</span>
            </div>

            <Link
              href={`/brand/${listing.brandId}`}
              className="block w-full text-center py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border-t border-stone-100 dark:border-stone-800 pt-3"
            >
              View seller storefront →
            </Link>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Student Reviews ({REVIEWS.length})
          </h2>
          <div className="flex items-center gap-1 text-sm font-semibold text-stone-800 dark:text-stone-200">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {listing.rating} / 5.0
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {REVIEWS.map(rev => (
            <div key={rev.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {rev.buyerName} ({rev.buyerSchool})
                </span>
                <span className="text-stone-400">{rev.createdAt}</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-normal">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        singleListing={listing}
      />
    </div>
  );
}
