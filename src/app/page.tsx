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
    const iconClass = "w-4 h-4 text-stone-700 dark:text-stone-300";
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
    <div className="space-y-28 pb-32">
      {/* 1. Hero: Confident, Distinctive Editorial Atmosphere */}
      <section className="relative pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200/70 dark:border-stone-800/70 bg-gradient-to-b from-[#F9F9F7] via-surface-light to-surface-light dark:from-stone-900/40 dark:via-surface-dark dark:to-surface-dark overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-7">
          {/* Refined Minimalist Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium shadow-tactile">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="tracking-tight">Paystack Escrow Protection • Verified Student Sellers</span>
          </div>

          {/* Distinctive Hero Headline with Editorial Contrast */}
          <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-extrabold tracking-[-0.035em] text-stone-950 dark:text-stone-50 leading-[1.08]">
            Trade safely on campus. <br className="hidden sm:inline" />
            <span className="text-stone-400 dark:text-stone-500 font-semibold tracking-[-0.025em]">
              Without the WhatsApp chaos.
            </span>
          </h1>

          {/* Generous Readable Subtitle */}
          <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal">
            A trusted marketplace built for <strong className="text-stone-900 dark:text-stone-100 font-semibold">{currentSchoolObj.name}</strong> students. Buy electronics, book hair stylists, or order meals directly from verified peers.
          </p>

          {/* Sculpted Search Experience with Obsidian Action */}
          <div className="max-w-2xl mx-auto pt-2 space-y-4">
            <div className="flex items-center bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/90 dark:border-stone-800 shadow-search p-2 focus-within:border-stone-400 dark:focus-within:border-stone-600 transition-all">
              <div className="pl-3 text-stone-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder={`Search products or services at ${selectedSchool}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
              />
              <Link
                href={`/search?q=${encodeURIComponent(searchQuery)}`}
                className="px-6 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-850 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-950 text-xs font-semibold tracking-tight shadow-button-primary active:scale-[0.98] transition-all shrink-0"
              >
                Search
              </Link>
            </div>

            {/* Tactile Campus Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              <span className="text-xs font-semibold text-stone-400 mr-1.5 uppercase font-mono text-[10px] tracking-wider">Campus:</span>
              {SCHOOLS.map(sch => (
                <button
                  key={sch.id}
                  onClick={() => setSelectedSchool(sch.shortName)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedSchool === sch.shortName
                      ? 'bg-stone-950 text-white dark:bg-stone-100 dark:text-stone-950 shadow-sm font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-950 hover:bg-stone-200/60 dark:hover:bg-stone-800'
                  }`}
                >
                  {sch.shortName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        {/* 2. Categories: Tactile Minimalist Strip */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase block mb-1 font-mono">Explore</span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Categories
              </h2>
            </div>
            <Link href="/search" className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.id}
                href={`/search?category=${cat.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 shadow-subtle hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 text-center group flex flex-col items-center justify-center gap-2.5"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-100/90 dark:bg-stone-800/90 border border-stone-200/50 dark:border-stone-700/50 flex items-center justify-center group-hover:scale-105 group-hover:bg-stone-200/60 transition-all duration-200">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 tracking-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Feed Section: Spacious Grid with Clean Segmented Control */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-3 border-b border-stone-200/60 dark:border-stone-800">
            <div>
              <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase block mb-1 font-mono">
                {currentSchoolObj.city}
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Marketplace at {selectedSchool}
              </h2>
            </div>

            {/* Native Segmented Control Filter */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-stone-100 dark:bg-stone-800/90 border border-stone-200/60 dark:border-stone-700/60 shadow-xs">
              <button
                onClick={() => setActiveTab('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'ALL'
                    ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-100 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                All ({listings.filter(l => selectedSchool === 'ALL' || l.schoolShortName === selectedSchool).length})
              </button>
              <button
                onClick={() => setActiveTab('PRODUCT')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'PRODUCT'
                    ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-100 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('SERVICE')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'SERVICE'
                    ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-100 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-950'
                }`}
              >
                Services
              </button>
              <button
                onClick={() => setActiveTab('TODAY')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === 'TODAY'
                    ? 'bg-white dark:bg-stone-900 text-stone-950 dark:text-stone-100 shadow-sm font-semibold'
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
                className="text-xs font-semibold text-stone-900 dark:text-stone-100 underline underline-offset-4"
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

        {/* 4. Verified Campus Founders / Sellers: Editorial Craft */}
        <section className="space-y-6">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold text-stone-400 tracking-wider uppercase block mb-1 font-mono">
                Student Founders
              </span>
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                Verified campus sellers
              </h2>
            </div>
            <Link href="/seller/onboarding" className="text-xs font-semibold text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
              Become a verified seller →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {campusBrands.map(brand => (
              <Link
                key={brand.id}
                href={`/brand/${brand.slug}`}
                className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 shadow-card hover:shadow-card-hover transition-all duration-300 space-y-4 group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-stone-200/70 shadow-xs">
                      <SafeImage src={brand.logo} alt={brand.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-semibold text-sm text-stone-950 dark:text-stone-50 truncate group-hover:text-stone-700 transition-colors">
                          {brand.name}
                        </h3>
                        {brand.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 stroke-[2.2]" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                        <span className="flex items-center gap-1 font-semibold text-stone-700 dark:text-stone-300">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {brand.rating}
                        </span>
                        <span className="text-stone-300">·</span>
                        <span>{brand.totalSales} orders</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed font-normal">
                    {brand.description}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100 dark:border-stone-800/80">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    {brand.trustScore}% Trust Score
                  </span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Storefront <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. How Escrow Works: Institutional Banking Security Restraint */}
        <section className="p-8 sm:p-12 rounded-3xl bg-stone-100/70 dark:bg-stone-900/50 border border-stone-200/80 dark:border-stone-800 space-y-10 shadow-subtle">
          <div className="max-w-xl mx-auto text-center space-y-2.5">
            <div className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 flex items-center justify-center mx-auto text-emerald-700 dark:text-emerald-300 mb-2">
              <Lock className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block font-mono">
              ESCROW PROTECTION
            </span>
            <h2 className="text-2xl font-bold text-stone-950 dark:text-stone-50 tracking-tight">
              How Paystack Escrow protects your campus trades
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
              No prepayment risk. Your money is held in verified escrow and only transferred when you physically inspect and confirm your order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-2">
            <div className="space-y-2.5 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 shadow-tactile">
              <span className="text-xs font-mono font-bold text-stone-400 tracking-wider">01</span>
              <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50">Authorized in Escrow</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                Payment is safely authorized via Paystack Escrow. The verified student seller prepares your order for campus pickup.
              </p>
            </div>

            <div className="space-y-2.5 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 shadow-tactile">
              <span className="text-xs font-mono font-bold text-stone-400 tracking-wider">02</span>
              <h3 className="text-sm font-bold text-stone-950 dark:text-stone-50">Campus Meetup</h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                Meet the seller at your faculty quadrangle, library, or hostel to physically test and inspect the item in person.
              </p>
            </div>

            <div className="space-y-2.5 p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/70 dark:border-stone-800 shadow-tactile">
              <span className="text-xs font-mono font-bold text-stone-400 tracking-wider">03</span>
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
