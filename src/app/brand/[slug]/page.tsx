"use client";

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Star, Clock, MapPin, ExternalLink, MessageCircle, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BRANDS } from '@/lib/mockData';
import { ListingCard } from '@/components/common/ListingCard';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';

export default function BrandProfilePage() {
  const params = useParams();
  const brandSlugOrId = params.slug as string;
  const { listings } = useApp();

  const brand = BRANDS.find(b => b.slug === brandSlugOrId || b.id === brandSlugOrId) || BRANDS[0];
  const brandListings = listings.filter(l => l.brandName === brand.name || l.brandId === brand.id);

  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'REVIEWS' | 'INFO'>('PRODUCTS');

  return (
    <div className="space-y-8 pb-12">
      {/* Store Banner & Header */}
      <div className="relative bg-white dark:bg-surface-darkCard border-b border-stone-200 dark:border-stone-800">
        {/* Banner */}
        <div className="relative h-48 sm:h-64 w-full bg-brand-900 overflow-hidden">
          <Image
            src={brand.banner}
            alt={brand.name}
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent"></div>
        </div>

        {/* Store Profile Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
          <div className="relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 z-10">
            {/* Left Logo + Titles */}
            <div className="flex items-end gap-4">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-card overflow-hidden border-4 border-white dark:border-stone-900 bg-white shadow-modal shrink-0">
                <Image src={brand.logo} alt={brand.name} fill className="object-cover" />
              </div>
              <div className="space-y-1 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-50">
                    {brand.name}
                  </h1>
                  {brand.isVerified && (
                    <VerifiedBadge schoolShortName={brand.schoolShortName} size="sm" />
                  )}
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  Managed by {brand.ownerName} • Joined {brand.joinedDate}
                </p>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={brand.whatsappCatalogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-button bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>WhatsApp Catalogue</span>
              </a>
            </div>
          </div>

          {/* Metrics Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-stone-100 dark:border-stone-800 mt-6">
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-center">
              <div className="text-xs text-stone-400 font-medium">Customer Rating</div>
              <div className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span>{brand.rating}</span>
                <span className="text-xs text-stone-400 font-normal">({brand.reviewCount})</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-center">
              <div className="text-xs text-stone-400 font-medium">Campus Sales</div>
              <div className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5">
                {brand.totalSales}+ Orders
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-center">
              <div className="text-xs text-stone-400 font-medium">Trust Score</div>
              <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                {brand.trustScore}% Verified
              </div>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-center">
              <div className="text-xs text-stone-400 font-medium">Avg Response Time</div>
              <div className="text-lg font-bold text-stone-900 dark:text-stone-100 mt-0.5 flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-brand-600" />
                <span>{brand.responseTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* About Bio */}
        <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <h3 className="font-bold text-xs uppercase text-stone-400 tracking-wider">About Store</h3>
          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
            {brand.description}
          </p>
        </div>

        {/* Listings Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <h2 className="font-bold text-base text-stone-900 dark:text-stone-100">
              Active Store Listings ({brandListings.length})
            </h2>
            <span className="text-xs text-stone-500 font-medium">Paystack Escrow Protected</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brandListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
