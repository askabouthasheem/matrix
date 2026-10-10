"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Star, 
  Clock, 
  MapPin, 
  Zap, 
  MessageCircle, 
  ShoppingBag, 
  Heart, 
  ExternalLink,
  Lock,
  ArrowLeft,
  CheckCircle2,
  Share2,
  Package
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { REVIEWS } from '@/lib/mockData';
import { VerifiedBadge, EscrowBadge, TrustScoreRing } from '@/components/common/VerifiedBadge';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Campus Feed
        </button>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Product Gallery & Specifications */}
        <div className="lg:col-span-7 space-y-5">
          {/* Main Large Product Image */}
          <div className="relative aspect-[4/3] w-full rounded-card overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200/90 dark:border-stone-800 shadow-card">
            <SafeImage
              src={currentImage}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />

            {/* In-Image Overlay Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-20">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-stone-900/80 text-white backdrop-blur-md shadow-sm border border-white/10">
                {listing.type}
              </span>
              {listing.isAvailableToday && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> Pickup Available Today
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(listing.id)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-rose-500 transition-colors shadow-subtle backdrop-blur-md"
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnails Carousel */}
          {listing.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx 
                      ? 'border-brand-600 shadow-sm scale-95' 
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <SafeImage src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Item Description Card */}
          <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-3">
            <h2 className="font-extrabold text-stone-900 dark:text-stone-100 text-xs uppercase tracking-wider">
              Product Details & Pickup Terms
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* Right 5 Columns: Intentional Purchase Panel & Seller Profile */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Purchase Card */}
          <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-card space-y-5">
            {/* Campus Tag & Category */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold">
                <MapPin className="w-3.5 h-3.5 text-accent-500" /> {listing.schoolShortName} Campus
              </span>
              <span className="text-xs font-extrabold text-brand-600 dark:text-brand-400">
                {listing.categoryName}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 leading-snug">
              {listing.title}
            </h1>

            {/* Rating Bar */}
            <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-1 text-amber-500 font-black">
                <Star className="w-4 h-4 fill-current" />
                <span>{listing.rating}</span>
              </div>
              <span>•</span>
              <span className="font-medium">{listing.reviewCount} reviews</span>
              <span>•</span>
              <span className="text-emerald-600 font-bold">In Stock ({listing.stock} units)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-stone-400 font-bold block uppercase tracking-wider">Campus Price</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50">
                    ₦{listing.price.toLocaleString()}
                  </span>
                  {listing.originalPrice && (
                    <span className="text-xs text-stone-400 line-through">
                      ₦{listing.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
              <EscrowBadge size="sm" />
            </div>

            {/* Actions: Clear Escrow Priority */}
            <div className="space-y-3 pt-1">
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-4 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-black text-sm shadow-subtle transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Buy via Paystack Escrow (₦{listing.price.toLocaleString()})</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => addToCart(listing)}
                  className="py-3 rounded-button bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <Link
                  href={`/chat?listingId=${listing.id}`}
                  onClick={() => startConversation(listing)}
                  className="py-3 rounded-button bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>In-App Chat</span>
                </Link>
              </div>
            </div>

            {/* WhatsApp Fallback & Share */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <a
                href={`https://wa.me/2348123456789?text=${encodeURIComponent(`Hello ${listing.brandName}, I saw your listing for "${listing.title}" on CampusHustle.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 font-extrabold hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>WhatsApp Catalogue Fallback</span>
              </a>
              <button onClick={handleShare} className="text-stone-400 hover:text-stone-600 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Premium Verified Seller Profile Card */}
          <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">Vendor Trust Profile</span>
              <VerifiedBadge schoolShortName={listing.schoolShortName} size="sm" />
            </div>

            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                <SafeImage
                  src={listing.brandLogo}
                  alt={listing.brandName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/brand/${listing.brandId}`} className="font-extrabold text-sm text-stone-900 dark:text-stone-100 hover:underline block truncate">
                  {listing.brandName}
                </Link>
                <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                  <span className="text-emerald-600 font-bold">Trust Score: {listing.brandTrustScore}%</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <Clock className="w-3 h-3" /> Replies {listing.brandResponseTime}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/brand/${listing.brandId}`}
              className="w-full py-2.5 rounded-button bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-700 block text-center transition-colors border border-stone-200 dark:border-stone-700"
            >
              Visit Verified Storefront →
            </Link>
          </div>
        </div>
      </div>

      {/* Verified Student Customer Reviews */}
      <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Verified Student Reviews
            </h2>
            <p className="text-xs text-stone-500">Reviews left by buyers after Escrow fulfillment in {listing.schoolShortName}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500 font-black text-lg">
            <Star className="w-5 h-5 fill-current" /> {listing.rating} / 5.0
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REVIEWS.map(rev => (
            <div key={rev.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={rev.buyerAvatar} alt={rev.buyerName} className="w-7 h-7 rounded-full object-cover" />
                  <span className="font-bold text-xs text-stone-800 dark:text-stone-200">
                    {rev.buyerName} ({rev.buyerSchool})
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed italic">
                "{rev.comment}"
              </p>
              <span className="text-[10px] text-stone-400 block">{rev.createdAt}</span>
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
