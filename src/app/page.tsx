"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Zap, 
  ShieldCheck, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  Filter, 
  Star, 
  Clock, 
  CheckCircle2, 
  Store,
  ChevronRight,
  Smartphone,
  Shirt,
  Utensils,
  Briefcase,
  GraduationCap,
  Home as HomeIcon,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES, SCHOOLS, BRANDS } from '@/lib/mockData';
import { ListingCard } from '@/components/common/ListingCard';
import { VerifiedBadge, EscrowBadge } from '@/components/common/VerifiedBadge';

export default function HomePage() {
  const { listings, selectedSchool, setSelectedSchool } = useApp();
  
  const [activeTab, setActiveTab] = useState<'ALL' | 'PRODUCT' | 'SERVICE' | 'TRAINING'>('ALL');
  const [availableTodayOnly, setAvailableTodayOnly] = useState(false);
  const [under10kOnly, setUnder10kOnly] = useState(false);

  // Filter listings based on campus and tabs
  const filteredListings = listings.filter(l => {
    // School filter
    if (selectedSchool !== 'ALL' && l.schoolShortName !== selectedSchool) {
      return false;
    }
    // Type filter
    if (activeTab !== 'ALL' && l.type !== activeTab) {
      return false;
    }
    // Pickup today filter
    if (availableTodayOnly && !l.isAvailableToday) {
      return false;
    }
    // Price filter
    if (under10kOnly && l.price > 10000) {
      return false;
    }
    return true;
  });

  const availableTodayCount = listings.filter(l => l.isAvailableToday && (selectedSchool === 'ALL' || l.schoolShortName === selectedSchool)).length;
  const currentSchoolObj = SCHOOLS.find(s => s.shortName === selectedSchool) || SCHOOLS[0];
  const campusBrands = BRANDS.filter(b => selectedSchool === 'ALL' || b.schoolShortName === selectedSchool);

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-brand-900 via-brand-950 to-surface-light dark:to-surface-dark text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-accent-300 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-accent-400" />
                <span>Nigeria’s Premier Student Marketplace</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15]">
                Trade Safely on Campus. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 via-amber-300 to-emerald-400">
                  Zero WhatsApp Chaos.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Connect with verified student entrepreneurs at <strong className="text-white underline decoration-accent-500">{currentSchoolObj.name}</strong>. Buy tech, book braid sessions, and order parfait with Paystack Escrow protection.
              </p>

              {/* Campus Selector Pills */}
              <div className="pt-2">
                <div className="text-xs font-bold text-stone-300 uppercase tracking-wider mb-2">
                  Select Your Campus Feed:
                </div>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {SCHOOLS.map(sch => (
                    <button
                      key={sch.id}
                      onClick={() => setSelectedSchool(sch.shortName)}
                      className={`px-3 py-1.5 rounded-button text-xs font-bold transition-all flex items-center gap-1.5 ${
                        selectedSchool === sch.shortName
                          ? 'bg-accent-500 text-white shadow-md scale-105'
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
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <Link
                  href="/search"
                  className="px-6 py-3.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Explore {selectedSchool} Deals</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/seller/onboarding"
                  className="px-6 py-3.5 rounded-button bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center gap-2"
                >
                  <Store className="w-4 h-4 text-accent-400" />
                  <span>Start Selling on Campus</span>
                </Link>
              </div>

              {/* Escrow Guarantee Pill */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-4 text-xs text-stone-300">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Escrow Protection
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-accent-400" /> Verified Student ID
                </span>
              </div>
            </div>

            {/* Right Featured Banner / Quick Stats */}
            <div className="lg:col-span-5">
              <div className="relative rounded-card p-5 bg-white/10 backdrop-blur-xl border border-white/15 shadow-modal text-white space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="font-bold text-xs uppercase tracking-wider text-stone-200">
                      Live Campus Stats ({selectedSchool})
                    </span>
                  </div>
                  <span className="text-[11px] text-accent-300 font-semibold">Active Now</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-black/20 border border-white/10 text-center">
                    <div className="text-xl sm:text-2xl font-black text-accent-400">
                      {currentSchoolObj.activeSellersCount}
                    </div>
                    <div className="text-[11px] text-stone-300 font-medium">Verified Sellers</div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/20 border border-white/10 text-center">
                    <div className="text-xl sm:text-2xl font-black text-emerald-400">
                      ₦4.8M+
                    </div>
                    <div className="text-[11px] text-stone-300 font-medium">Protected Escrow</div>
                  </div>
                </div>

                {/* Hot Listing Highlight Preview */}
                {listings[0] && (
                  <div className="p-3 rounded-lg bg-stone-900/80 border border-white/10 flex items-center gap-3">
                    <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0">
                      <Image
                        src={listings[0].images[0]}
                        alt={listings[0].title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <span className="text-[10px] text-accent-400 font-bold block">🔥 HOT IN {selectedSchool}</span>
                      <h4 className="text-xs font-bold truncate text-white">{listings[0].title}</h4>
                      <div className="text-xs text-stone-300 font-semibold mt-0.5">
                        ₦{listings[0].price.toLocaleString()}
                      </div>
                    </div>
                    <Link
                      href={`/listing/${listings[0].id}`}
                      className="p-2 rounded-button bg-accent-500 hover:bg-accent-600 text-white shrink-0"
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

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Categories Horizontal Slider */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                Browse Campus Categories
              </h2>
              <p className="text-xs text-stone-500">Everything you need for student life in {selectedSchool}</p>
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
                className="p-3.5 rounded-card bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:border-brand-500 hover:shadow-card transition-all text-center group flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-accent-500" />
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

        {/* "Available for Pickup Today" Highlight Banner */}
        <section className="p-6 rounded-card bg-gradient-to-r from-emerald-900 via-teal-900 to-stone-900 text-white relative overflow-hidden shadow-card">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500 text-white text-xs font-bold shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span>Same-Day Campus Pickup</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                Available for Pickup Today in {selectedSchool}
              </h3>
              <p className="text-xs text-emerald-200">
                {availableTodayCount} items ready right now near your hostel or faculty. No waiting!
              </p>
            </div>
            <button
              onClick={() => setAvailableTodayOnly(!availableTodayOnly)}
              className={`px-5 py-2.5 rounded-button text-xs font-extrabold transition-all flex items-center gap-2 ${
                availableTodayOnly 
                  ? 'bg-emerald-500 text-white shadow-lg ring-2 ring-white' 
                  : 'bg-white text-stone-900 hover:bg-stone-100'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>{availableTodayOnly ? 'Showing "Available Today" Only ✓' : 'Filter Available Today'}</span>
            </button>
          </div>
        </section>

        {/* Main Feed Filters & Tabs */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-brand-900 text-white dark:bg-brand-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                All Listings ({filteredListings.length})
              </button>
              <button
                onClick={() => setActiveTab('PRODUCT')}
                className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
                  activeTab === 'PRODUCT'
                    ? 'bg-brand-900 text-white dark:bg-brand-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Products 📦
              </button>
              <button
                onClick={() => setActiveTab('SERVICE')}
                className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
                  activeTab === 'SERVICE'
                    ? 'bg-brand-900 text-white dark:bg-brand-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Services & Braids 💅
              </button>
              <button
                onClick={() => setActiveTab('TRAINING')}
                className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
                  activeTab === 'TRAINING'
                    ? 'bg-brand-900 text-white dark:bg-brand-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                }`}
              >
                Trainings & Bootcamps 🎓
              </button>
            </div>

            {/* Quick Price Toggle Filter */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setUnder10kOnly(!under10kOnly)}
                className={`px-3 py-1.5 rounded-button text-xs font-semibold border transition-all ${
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
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto mb-4">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base mb-1">
                No listings found matching filters in {selectedSchool}
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
                Try clearing your "Available Today" or price filters, or switch to view all university campuses.
              </p>
              <button
                onClick={() => {
                  setActiveTab('ALL');
                  setAvailableTodayOnly(false);
                  setUnder10kOnly(false);
                }}
                className="px-4 py-2 rounded-button bg-brand-900 text-white text-xs font-bold"
              >
                Reset All Filters
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

        {/* Top Verified Campus Brands */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                Top Verified Campus Brands ({selectedSchool})
              </h2>
              <p className="text-xs text-stone-500">Student entrepreneurs with verified badges & high trust scores</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campusBrands.map(brand => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="group p-4 rounded-card bg-white dark:bg-surface-darkCard border border-surface-border dark:border-surface-darkBorder hover:border-brand-500 hover:shadow-card-hover transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-12 h-12 rounded-xl object-cover border border-stone-200 dark:border-stone-700"
                  />
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
                      <span className="text-amber-500 font-bold flex items-center gap-0.5">
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
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    Trust Score: {brand.trustScore}%
                  </span>
                  <span className="text-brand-600 font-semibold group-hover:underline">View Storefront →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How Escrow Works Banner */}
        <section className="p-8 rounded-card bg-surface-card dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <EscrowBadge />
            <h2 className="text-2xl font-extrabold text-stone-900 dark:text-stone-100">
              How Paystack Escrow Keeps Campus Trades Safe
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              No more losing money to scam accounts or fake delivery promises on WhatsApp groups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-900 text-white font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Pay via Paystack Escrow</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                When you place an order, your money is securely locked in Paystack Escrow — not given to the seller yet.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-brand-900 text-white font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Meetup & Inspect Item</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Meet the verified student vendor at your faculty quadrangle or hostel car park to check your item or service.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/50 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">Confirm & Release Funds</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Once satisfied, tap "Confirm Delivery" on the app to instantly release payment to the seller's account.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
