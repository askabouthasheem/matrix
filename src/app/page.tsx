"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  Star, 
  Clock, 
  CheckCircle2, 
  Store,
  ChevronRight,
  Smartphone,
  Shirt,
  Sparkles,
  Utensils,
  Briefcase,
  GraduationCap,
  Home as HomeIcon,
  SlidersHorizontal,
  Lock
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES, SCHOOLS, BRANDS, Category } from '@/lib/mockData';
import { ListingCard } from '@/components/common/ListingCard';
import { VerifiedBadge, EscrowBadge, TrustScoreRing } from '@/components/common/VerifiedBadge';
import { SafeImage } from '@/components/common/SafeImage';

export default function HomePage() {
  const { listings, selectedSchool, setSelectedSchool, user } = useApp();
  
  const [activeTab, setActiveTab] = useState<'ALL' | 'PRODUCT' | 'SERVICE' | 'TRAINING'>('ALL');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [under10kOnly, setUnder10kOnly] = useState(false);

  // Filter listings based on campus and tabs
  const filteredListings = listings.filter(l => {
    if (selectedSchool !== 'ALL' && l.schoolShortName !== selectedSchool) return false;
    if (activeTab !== 'ALL' && l.type !== activeTab) return false;
    if (availableTodayOnly && !l.isAvailableToday) return false;
    if (under10kOnly && l.price > 10000) return false;
    return true;
  });

  const availableTodayCount = listings.filter(l => l.isAvailableToday && (selectedSchool === 'ALL' || l.schoolShortName === selectedSchool)).length;
  const currentSchoolObj = SCHOOLS.find(s => s.shortName === selectedSchool) || SCHOOLS[0];
  const campusBrands = BRANDS.filter(b => selectedSchool === 'ALL' || b.schoolShortName === selectedSchool);

  // Distinct category icon helper
  const getCategoryIcon = (iconName: Category['iconName']) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-brand-600 dark:text-brand-300" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5 text-indigo-600 dark:text-indigo-300" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-300" />;
      case 'Utensils':
        return <Utensils className="w-5 h-5 text-amber-600 dark:text-amber-300" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-teal-600 dark:text-teal-300" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-sky-600 dark:text-sky-300" />;
      case 'Home':
        return <HomeIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-600" />;
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section: Intentional, Asymmetrical & Restrained */}
      <section className="relative bg-gradient-to-b from-brand-950 via-brand-900 to-surface-light dark:to-surface-dark text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Ambient Lighting */}
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left 7-Cols: Confident Asymmetric Typography */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-accent-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Nigerian Campus Marketplace</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12]">
                Trade Safely on Campus. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-amber-300 to-emerald-400">
                  Zero WhatsApp Chaos.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 max-w-xl font-normal leading-relaxed">
                Connect directly with verified student entrepreneurs at <strong className="text-white underline decoration-accent-500 underline-offset-4">{currentSchoolObj.name}</strong>. Buy laptops, book braids, or order parfait with 100% Paystack Escrow protection.
              </p>

              {/* Campus Selector Pills */}
              <div className="pt-1">
                <div className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider mb-2">
                  Select Campus Discovery Feed:
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {SCHOOLS.map(sch => (
                    <button
                      key={sch.id}
                      onClick={() => setSelectedSchool(sch.shortName)}
                      className={`px-3 py-1.5 rounded-button text-xs font-bold transition-all flex items-center gap-1.5 ${
                        selectedSchool === sch.shortName
                          ? 'bg-accent-500 text-white shadow-subtle ring-2 ring-accent-400/40'
                          : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/10'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      {sch.shortName}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/search"
                  className="px-6 py-3.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-xs sm:text-sm shadow-subtle transition-all flex items-center gap-2"
                >
                  <span>Explore {selectedSchool} Deals</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={user?.role === 'SELLER' ? '/seller/dashboard' : '/seller/onboarding'}
                  className="px-5 py-3.5 rounded-button bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <Store className="w-4 h-4 text-accent-400" />
                  <span>{user?.role === 'SELLER' ? 'Go to Seller Dashboard' : 'Become a Verified Seller'}</span>
                </Link>
              </div>

              {/* Escrow Trust Micro-Bar */}
              <div className="pt-2 flex items-center gap-5 text-xs text-stone-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Escrow Protected Funds
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-accent-400" /> .edu.ng Verified Students
                </span>
              </div>
            </div>

            {/* Right 5-Cols: Soft Native Campus Snapshot Card */}
            <div className="lg:col-span-5">
              <div className="rounded-card p-6 bg-stone-900/70 border border-white/15 backdrop-blur-md shadow-modal text-white space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-xs uppercase tracking-wider text-stone-300">
                      {selectedSchool} Campus Pulse
                    </span>
                  </div>
                  <span className="text-[11px] text-accent-400 font-extrabold">Live Today</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-lg bg-black/30 border border-white/10">
                    <div className="text-2xl font-black text-accent-400">
                      {currentSchoolObj.activeSellersCount}
                    </div>
                    <div className="text-[11px] text-stone-300 font-medium">Active Vendors</div>
                  </div>
                  <div className="p-3.5 rounded-lg bg-black/30 border border-white/10">
                    <div className="text-2xl font-black text-emerald-400">
                      ₦4.8M+
                    </div>
                    <div className="text-[11px] text-stone-300 font-medium">Locked in Escrow</div>
                  </div>
                </div>

                {/* Hot Campus Item Featured Preview */}
                {listings[0] && (
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3.5">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-white/10">
                      <SafeImage
                        src={listings[0].images[0]}
                        alt={listings[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-[10px] text-accent-400 font-bold block uppercase tracking-wider">
                        Trending in {selectedSchool}
                      </span>
                      <h4 className="text-xs font-bold truncate text-white mt-0.5">{listings[0].title}</h4>
                      <div className="text-xs font-black text-stone-200 mt-1">
                        ₦{listings[0].price.toLocaleString()}
                      </div>
                    </div>
                    <Link
                      href={`/listing/${listings[0].id}`}
                      className="p-2.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white shrink-0 shadow-sm transition-colors"
                      aria-label="View listing"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Categories Grid with Dedicated Meaningful Icons */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                Browse Campus Categories
              </h2>
              <p className="text-xs text-stone-500">Curated products, salon services, and skills in {selectedSchool}</p>
            </div>
            <Link href="/search" className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.slug}`}
                className="p-4 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-surface-darkBorder hover:border-brand-500 hover:shadow-subtle transition-all text-center group flex flex-col items-center justify-center gap-2.5"
              >
                <div className="w-11 h-11 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-brand-600 transition-colors">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Clean "Pickup Available Today" Shelf */}
        <section className="p-6 rounded-card bg-stone-900 text-white relative overflow-hidden shadow-subtle border border-stone-800">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Ready Near You Today</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-tight">
                Available for Pickup Today in {selectedSchool}
              </h3>
              <p className="text-xs text-stone-300">
                {availableTodayCount} items in stock right now near faculties and hostels. Meet up in 20 minutes!
              </p>
            </div>
            <button
              onClick={() => setAvailableTodayOnly(!availableTodayOnly)}
              className={`px-5 py-2.5 rounded-button text-xs font-extrabold transition-all flex items-center gap-2 ${
                availableTodayOnly 
                  ? 'bg-emerald-500 text-white ring-2 ring-white shadow-md' 
                  : 'bg-white text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>{availableTodayOnly ? 'Showing "Pickup Today" Only ✓' : 'Filter Available Today'}</span>
            </button>
          </div>
        </section>

        {/* Feed Filtering & Listing Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3.5 py-1.5 rounded-button text-xs font-bold transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-brand-900 text-white dark:bg-brand-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                All Items ({filteredListings.length})
              </button>
              <button
                onClick={() => setActiveTab('PRODUCT')}
                className={`px-3.5 py-1.5 rounded-button text-xs font-bold transition-all ${
                  activeTab === 'PRODUCT'
                    ? 'bg-brand-900 text-white dark:bg-brand-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('SERVICE')}
                className={`px-3.5 py-1.5 rounded-button text-xs font-bold transition-all ${
                  activeTab === 'SERVICE'
                    ? 'bg-brand-900 text-white dark:bg-brand-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Services & Braids
              </button>
              <button
                onClick={() => setActiveTab('TRAINING')}
                className={`px-3.5 py-1.5 rounded-button text-xs font-bold transition-all ${
                  activeTab === 'TRAINING'
                    ? 'bg-brand-900 text-white dark:bg-brand-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Skills & Bootcamps
              </button>
            </div>

            {/* Price Filter Pill */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUnder10kOnly(!under10kOnly)}
                className={`px-3 py-1.5 rounded-button text-xs font-bold border transition-all ${
                  under10kOnly
                    ? 'bg-accent-50 border-accent-500 text-accent-700 dark:bg-accent-950 dark:text-accent-300'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                }`}
              >
                Under ₦10,000
              </button>
            </div>
          </div>

          {/* Listings Grid */}
          {filteredListings.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-surface-darkCard rounded-card border border-stone-200 dark:border-stone-800 p-8">
              <SlidersHorizontal className="w-10 h-10 text-stone-300 mx-auto mb-2" />
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm mb-1">
                No items match filters in {selectedSchool}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                Try toggling off "Available Today" or price filters.
              </p>
              <button
                onClick={() => {
                  setActiveTab('ALL');
                  setAvailableTodayOnly(false);
                  setUnder10kOnly(false);
                }}
                className="px-4 py-2 rounded-button bg-brand-900 text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        {/* Top Verified Brands Showcase */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                Top Verified Student Brands ({selectedSchool})
              </h2>
              <p className="text-xs text-stone-500">Student vendors backed by high trust scores and fast responses</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campusBrands.map(brand => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="group p-4 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-surface-darkBorder hover:border-brand-500 hover:shadow-subtle transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                    <SafeImage src={brand.logo} alt={brand.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 group-hover:text-brand-600 transition-colors truncate">
                        {brand.name}
                      </h3>
                      {brand.isVerified && (
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="text-amber-500 font-extrabold flex items-center gap-0.5">
                        <Star className="w-3.5 h-3.5 fill-current" /> {brand.rating}
                      </span>
                      <span>• {brand.totalSales} sales</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {brand.description}
                </p>
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                    Trust Score: {brand.trustScore}%
                  </span>
                  <span className="text-brand-600 font-bold group-hover:underline">Visit Store →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Escrow Explainer Section */}
        <section className="p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 space-y-6 shadow-subtle">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <EscrowBadge />
            <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100">
              How Paystack Escrow Protects Campus Deals
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Never worry about fake sellers or unfulfilled orders on WhatsApp.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-900 text-white font-black flex items-center justify-center text-xs">
                1
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Pay via Paystack Escrow</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Your payment is safely authorized and locked in Escrow. The seller is notified to prepare pickup.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-900 text-white font-black flex items-center justify-center text-xs">
                2
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Meetup & Inspect Item</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Meet the verified student vendor at your faculty quadrangle or hostel car park to check the item in person.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-black flex items-center justify-center text-xs">
                3
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Confirm & Release Funds</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Satisfied with your purchase? Tap "Confirm Receipt" in your Orders tab to release payment directly to the seller.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
