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
  Lock,
  Building2
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
    const iconClass = "w-4 h-4 text-stone-750 dark:text-stone-300 stroke-[2.2]";
    switch (iconName) {
      case 'Smartphone':
        return <Smartphone className={iconClass} />;
      case 'Shirt':
        return <Shirt className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'Utensils':
        return <Utensils className={iconClass} />;
      case 'Briefcase':
        return <Briefcase className={iconClass} />;
      case 'GraduationCap':
        return <GraduationCap className={iconClass} />;
      case 'Home':
        return <HomeIcon className={iconClass} />;
      default:
        return <Sparkles className={iconClass} />;
    }
  };

  return (
    <div className="space-y-32 pb-32">
      {/* 1. Hero: Decisive Presence, High-Contrast Typography & Command Search Bar */}
      <section className="relative pt-24 sm:pt-28 pb-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200/70 dark:border-stone-800/70 bg-gradient-to-b from-[#F9F9F7] via-surface-light to-surface-light dark:from-stone-900/40 dark:via-surface-dark dark:to-surface-dark overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Refined Minimalist Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="tracking-tight">Verified Campus Network • Paystack Escrow Protection</span>
          </div>

          {/* Decisive Hero Headline: 76px Bold Contrast */}
          <h1 className="text-5xl sm:text-7xl lg:text-[76px] font-black tracking-[-0.045em] text-stone-950 dark:text-stone-50 leading-[1.02]">
            Trade safely on campus.
            <span className="block text-stone-400 dark:text-stone-500 font-semibold tracking-[-0.035em] mt-2 sm:mt-3">
              Zero WhatsApp chaos.
            </span>
          </h1>

          {/* Readable Subtitle */}
          <p className="text-lg sm:text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            A trusted marketplace built for <strong className="text-stone-950 dark:text-stone-100 font-bold">{currentSchoolObj.name}</strong> students. Buy tech, order food, or book stylists directly from verified peers.
          </p>

          {/* Standout Search Command Bar with Solid Black Button */}
          <div className="max-w-2xl mx-auto pt-3 space-y-5">
            <div className="flex items-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.03)] p-2 focus-within:border-stone-400 focus-within:ring-4 focus-within:ring-stone-100 dark:focus-within:ring-stone-800 transition-all">
              <div className="pl-3.5 text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder={`Search products or services at ${selectedSchool}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3.5 py-2.5 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none font-medium"
              />
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="px-8 py-3.5 rounded-xl bg-stone-950 hover:bg-stone-850 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-950 text-sm font-bold tracking-tight shadow-[0_4px_14px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-all shrink-0"
              >
                Search
              </Link>
            </div>

            {/* Tactile Campus Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="text-xs font-bold text-stone-400 mr-1.5 uppercase font-mono text-[10px] tracking-wider">Campus:</span>
              <div className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-stone-100/90 dark:bg-stone-800/90 border border-stone-200/60 dark:border-stone-700/60">
                {SCHOOLS.map(sch => (
                  <button
                    key={sch.id}
                    onClick={() => setSelectedSchool(sch.shortName)}
                    className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all duration-150 ${
                      selectedSchool === sch.shortName
                        ? 'bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-950 shadow-xs'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                    }`}
                  >
                    {sch.shortName}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
        {/* 2. Categories with Tactile Depth */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 tracking-[0.14em] uppercase block mb-1 font-mono">
                Curated
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-stone-50 tracking-[-0.03em]">
                Categories
              </h2>
            </div>
            <Link href="/search" className="text-xs font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_6px_18px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.03),0_14px_30px_rgba(0,0,0,0.07)] hover:-translate-y-1 transition-all duration-300 text-center group flex flex-col items-center justify-center gap-3"
              >
                <div className="w-11 h-11 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 flex items-center justify-center group-hover:scale-105 group-hover:bg-stone-100 group-hover:border-stone-300 transition-all duration-200">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 tracking-tight group-hover:text-stone-950 dark:group-hover:text-white transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Feed Section: Commanding Title & Dominant Product Cards */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-3 border-b border-stone-200/60 dark:border-stone-800">
            <div>
              <span className="text-[10px] font-bold text-stone-400 tracking-[0.14em] uppercase block mb-1 font-mono">
                {currentSchoolObj.city} • CATALOG
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-stone-50 tracking-[-0.03em]">
                Marketplace at {selectedSchool}
              </h2>
            </div>

            {/* Native Segmented Control Filter */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100/90 dark:bg-stone-800/90 border border-stone-200/70 dark:border-stone-700/70 shadow-inner">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-50 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)]'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                All ({listings.filter(l => selectedSchool === 'ALL' || l.schoolShortName === selectedSchool).length})
              </button>
              <button
                onClick={() => setActiveTab('PRODUCT')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'PRODUCT'
                    ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-50 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('SERVICE')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'SERVICE'
                    ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-50 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab('TODAY')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'TODAY'
                    ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-50 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.03)] font-bold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                Pickup Today
              </button>
            </div>
          </div>

          {/* Cards Grid: Generous 28px Spacing */}
          {filteredListings.length === 0 ? (
            <div className="py-24 text-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/70 dark:border-stone-800 space-y-3">
              <p className="text-sm text-stone-500 font-medium">No listings match this filter at {selectedSchool}.</p>
              <button
                onClick={() => { setActiveTab('ALL'); setSearchQuery(''); }}
                className="text-xs font-bold text-stone-950 dark:text-stone-100 underline underline-offset-4"
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

        {/* 4. Verified Campus Founders / Sellers: Multi-Layer Shadow & High-End Craft */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 tracking-[0.14em] uppercase block mb-1 font-mono">
                Student Founders
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-stone-50 tracking-[-0.03em]">
                Verified campus sellers
              </h2>
            </div>
            <Link href="/seller/onboarding" className="text-xs font-bold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
              Become a verified seller →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campusBrands.map(brand => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.03),0_16px_36px_rgba(0,0,0,0.09)] hover:-translate-y-1 transition-all duration-300 space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200/70 shadow-xs">
                      <SafeImage src={brand.logo} alt={brand.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-stone-950 dark:text-stone-50 truncate group-hover:text-stone-700 transition-colors">
                          {brand.name}
                        </h3>
                        {brand.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.2]" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <span className="flex items-center gap-1 font-bold text-stone-700 dark:text-stone-300">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {brand.rating}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span className="font-medium">{brand.totalSales} orders</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed font-normal">
                    {brand.description}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800/80">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50/70 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {brand.trustScore}% Trust Score
                  </span>
                  <span className="font-bold text-stone-900 dark:text-stone-100 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Storefront <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. How Escrow Works: Institutional Banking Security */}
        <section className="p-8 sm:p-14 rounded-3xl bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 space-y-10 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
          <div className="max-w-xl mx-auto text-center space-y-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 flex items-center justify-center mx-auto text-emerald-700 dark:text-emerald-300 mb-2">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
              ESCROW PROTECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-950 dark:text-stone-50 tracking-tight">
              How Paystack Escrow protects your campus trades
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              Zero prepayment risk. Your money is held in bank-grade escrow and released only after you physically inspect your item on campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-2">
            <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_6px_18px_rgba(0,0,0,0.04)]">
              <span className="text-xs font-mono font-bold text-stone-400 tracking-widest bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">01</span>
              <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50">Authorized in Escrow</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                Payment is safely authorized via Paystack Escrow. The verified student seller prepares your order for campus pickup.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_6px_18px_rgba(0,0,0,0.04)]">
              <span className="text-xs font-mono font-bold text-stone-400 tracking-widest bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">02</span>
              <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50">Campus Meetup</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                Meet the seller at your faculty quadrangle, library, or hostel to physically test and inspect the item in person.
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-[0_2px_4px_rgba(0,0,0,0.02),0_6px_18px_rgba(0,0,0,0.04)]">
              <span className="text-xs font-mono font-bold text-stone-400 tracking-widest bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded">03</span>
              <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50">Release Funds</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                Confirm pickup on the app to release funds directly to the seller's verified Nigerian student bank account.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
