"use client";

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
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
  Share2
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { REVIEWS } from '@/lib/mockData';
import { VerifiedBadge, EscrowBadge } from '@/components/common/VerifiedBadge';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';

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
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Back Link */}
      <div>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Listings
        </button>
      </div>

      {/* Main Listing Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Featured Large Image */}
          <div className="relative aspect-[4/3] w-full rounded-card overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-800 shadow-card">
            <Image
              src={listing.images[selectedImageIndex] || listing.images[0]}
              alt={listing.title}
              fill
              className="object-cover"
              priority
            />
            {listing.isAvailableToday && (
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-md">
                  <Zap className="w-3.5 h-3.5 fill-current" /> Pickup Available Today
                </span>
              </div>
            )}
            <button
              onClick={() => toggleWishlist(listing.id)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-200 hover:text-rose-500 transition-colors shadow-md backdrop-blur-sm"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {listing.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImageIndex === idx ? 'border-brand-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Description Card */}
          <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-3">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm uppercase tracking-wider">
              Item Details & Specifications
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* Right Column: Pricing, CTAs, Seller Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-card space-y-6">
            {/* School & Category */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-accent-500" /> {listing.schoolShortName} Campus
              </span>
              <span className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                {listing.categoryName}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-50 leading-snug">
              {listing.title}
            </h1>

            {/* Rating Summary */}
            <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-current" />
                <span>{listing.rating}</span>
              </div>
              <span>•</span>
              <span>{listing.reviewCount} customer reviews</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">In Stock ({listing.stock} units)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-stone-400 block font-medium">Campus Price</span>
                <div className="flex items-baseline gap-2">
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

            {/* Primary Actions */}
            <div className="space-y-3">
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Buy via Paystack Escrow</span>
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
                  <span>Chat Seller</span>
                </Link>
              </div>
            </div>

            {/* WhatsApp Deep-Link Fallback Option */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs">
              <a
                href={`https://wa.me/2348123456789?text=${encodeURIComponent(`Hi ${listing.brandName}, I'm interested in "${listing.title}" on CampusHustle.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>WhatsApp Catalogue Link Fallback</span>
              </a>
              <button onClick={handleShare} className="text-stone-400 hover:text-stone-600 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Verified Seller Profile Card */}
          <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Seller Profile</span>
              <VerifiedBadge schoolShortName={listing.schoolShortName} size="sm" />
            </div>

            <div className="flex items-center gap-3">
              <img
                src={listing.brandLogo}
                alt={listing.brandName}
                className="w-12 h-12 rounded-xl object-cover border border-stone-200 dark:border-stone-700"
              />
              <div className="flex-1 min-w-0">
                <Link href={`/brand/${listing.brandId}`} className="font-bold text-sm text-stone-900 dark:text-stone-100 hover:underline block truncate">
                  {listing.brandName}
                </Link>
                <div className="text-xs text-stone-500 flex items-center gap-2 mt-0.5">
                  <span className="text-emerald-600 font-semibold">Trust Score: {listing.brandTrustScore}%</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-stone-400">
                    <Clock className="w-3 h-3" /> Replies {listing.brandResponseTime}
                  </span>
                </div>
              </div>
            </div>

            <Link
              href={`/brand/${listing.brandId}`}
              className="w-full py-2 rounded-button bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-700 block text-center transition-colors border border-stone-200 dark:border-stone-700"
            >
              Visit Seller Storefront →
            </Link>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-6">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
              Verified Student Reviews
            </h3>
            <p className="text-xs text-stone-500">Reviews left by buyers after Escrow fulfillment</p>
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

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        singleListing={listing}
      />
    </div>
  );
}
