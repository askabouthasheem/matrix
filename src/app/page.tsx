"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Star, 
  Smartphone, 
  Shirt, 
  Sparkles, 
  Utensils, 
  Briefcase, 
  GraduationCap, 
  Home as HomeIcon,
  CheckCircle2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES, SCHOOLS, BRANDS, Category } from '@/lib/mockData';
import { ListingCard } from '@/components/common/ListingCard';
import { SafeImage } from '@/components/common/SafeImage';

export default function HomePage() {
  const { listings, selectedSchool, setSelectedSchool } = useApp();
  
  const [activeTab, setActiveTab] = useState<'ALL' | 'PRODUCT' | 'SERVICE' | 'TODAY'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter listings based on campus and tabs
  const filteredListings = listings.filter(l => {
    if (selectedSchool !== 'ALL' && l.schoolShortName !== selectedSchool) return false;
    if (activeTab === 'PRODUCT' && l.type !== 'PRODUCT') return false;
    if (activeTab === 'SERVICE' && l.type !== 'SERVICE') return false;
    if (activeTab === 'TODAY' && !l.isAvailableToday) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.brandName.toLowerCase().includes(q);
    }
    return true;
  });

  const currentSchoolObj = SCHOOLS.find(s => s.shortName === selectedSchool) || SCHOOLS[0];
  const campusBrands = BRANDS.filter(b => selectedSchool === 'ALL' || b.schoolShortName === selectedSchool);

  const getCategoryIcon = (iconName: Category['iconName']) => {
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case 'Shirt':
        return <Shirt className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case 'GraduationCap':
        return <GraduationCap className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      case 'Home':
        return <HomeIcon className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
      default:
        return <Sparkles className="w-4 h-4 text-stone-600 dark:text-stone-300" />;
    }
  };

  return (
    <div className="space-y-24 pb-28">
      {/* 1. Hero Section: Open, Calm, Spacious & Confident */}
      <section className="pt-20 pb-14 px-4 sm:px-6 lg:px-8 border-b border-stone-200/50 dark:border-stone-800/50 bg-gradient-to-b from-stone-50/60 to-transparent dark:from-stone-900/20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Subtle Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Campus escrow protection • Verified student IDs</span>
          </div>

          {/* Calm, Strong Headline */}
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-stone-900 dark:text-stone-50 leading-[1.12]">
            Trade safely on campus. <br className="hidden sm:inline" />
            Without the WhatsApp chaos.
          </h1>

          {/* Generous Subtext */}
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            A trusted marketplace for <strong className="text-stone-900 dark:text-stone-100 font-semibold">{currentSchoolObj.name}</strong> students. Buy tech, book beauty services, and order food directly from verified peers.
          </p>

          {/* Clean Integrated Search & Campus Bar */}
          <div className="max-w-2xl mx-auto pt-2">
            <div className="flex items-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm p-1.5 focus-within:border-stone-400 dark:focus-within:border-stone-600 transition-colors">
              <div className="pl-3 text-stone-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                placeholder={`Search powerbanks, braiding, laptops at ${selectedSchool}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2.5 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
              />
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-semibold transition-colors shrink-0"
              >
                Search
              </Link>
            </div>

            {/* Campus Selector Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-4">
              <span className="text-xs text-stone-400 mr-1 font-medium">Campus:</span>
              {SCHOOLS.map(sch => (
                <button
                  key={sch.id}
                  onClick={() => setSelectedSchool(sch.shortName)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedSchool === sch.shortName
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {sch.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area: High Breathing Room */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* 2. Categories: Minimalist & Clean */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Categories
            </h2>
            <Link href="/search" className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.slug}`}
                className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-colors text-center group flex flex-col items-center justify-center gap-2"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Feed Section: Spacious Grid with Clean Tabs */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-stone-200/60 dark:border-stone-800">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Marketplace in {selectedSchool}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                {filteredListings.length} items available from verified student entrepreneurs
              </p>
            </div>

            {/* Clean, Restrained Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 dark:bg-stone-800/80">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'ALL'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab('PRODUCT')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'PRODUCT'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('SERVICE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'SERVICE'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab('TODAY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'TODAY'
                    ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                Pickup Today
              </button>
            </div>
          </div>

          {/* Cards Grid: Generous 24-32px Gaps */}
          {filteredListings.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/70 dark:border-stone-800 space-y-3">
              <p className="text-sm text-stone-500 font-medium">No listings match this filter in {selectedSchool}.</p>
              <button
                onClick={() => { setActiveTab('ALL'); setSearchQuery(''); }}
                className="text-xs font-semibold text-stone-900 dark:text-stone-100 underline"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </section>

        {/* 4. Verified Campus Stores: Restrained & Quiet */}
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Verified campus sellers
            </h2>
            <p className="text-xs text-stone-500 mt-1">Student entrepreneurs backed by ID verification and customer ratings</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campusBrands.map(brand => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-colors space-y-3 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200/70">
                    <SafeImage src={brand.logo} alt={brand.name} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm text-stone-900 dark:text-stone-100 truncate group-hover:text-stone-700">
                      {brand.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {brand.rating}
                      </span>
                      <span>•</span>
                      <span>{brand.totalSales} orders</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                  {brand.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800">
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    {brand.trustScore}% Trust Score
                  </span>
                  <span className="font-medium text-stone-800 dark:text-stone-200 group-hover:underline">
                    View store →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. How Escrow Works: Simple, Calm, High-Trust */}
        <section className="p-8 sm:p-12 rounded-2xl bg-stone-100/70 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800 space-y-10">
          <div className="max-w-xl mx-auto text-center space-y-2">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              How Escrow keeps campus deals safe
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              No prepayment risk. Money is only released when you inspect your item in person.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Step 1</span>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Pay via Paystack Escrow</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Your payment is held safely in escrow. The student vendor is notified to prepare pickup.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Step 2</span>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Meetup & Inspect</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Meet the seller at your faculty or hostel car park to check condition and confirm specifications.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Step 3</span>
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Release Funds</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                Once satisfied, tap "Confirm Delivery" in your orders to instantly transfer payment to the seller.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
