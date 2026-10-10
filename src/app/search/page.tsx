"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search as SearchIcon, Filter, SlidersHorizontal, MapPin, Zap, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ListingCard } from '@/components/common/ListingCard';
import { CATEGORIES, SCHOOLS } from '@/lib/mockData';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCat = searchParams.get('category') || 'ALL';

  const { listings, selectedSchool, setSelectedSchool } = useApp();

  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedType, setSelectedType] = useState('ALL');
  const [onlyAvailableToday, setOnlyAvailableToday] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(600000);
  const [sortBy, setSortBy] = useState<'NEWEST' | 'PRICE_LOW' | 'PRICE_HIGH' | 'RATING'>('NEWEST');

  useEffect(() => {
    if (initialQuery) setQuery(initialQuery);
    if (initialCat) setSelectedCategory(initialCat);
  }, [initialQuery, initialCat]);

  // Filtering Logic
  let filtered = listings.filter(item => {
    // School Filter
    if (selectedSchool !== 'ALL' && item.schoolShortName !== selectedSchool) return false;
    // Category Filter
    if (selectedCategory !== 'ALL') {
      const catObj = CATEGORIES.find(c => c.slug === selectedCategory);
      if (catObj && item.categoryId !== catObj.id) return false;
    }
    // Type Filter
    if (selectedType !== 'ALL' && item.type !== selectedType) return false;
    // Pickup Today Filter
    if (onlyAvailableToday && !item.isAvailableToday) return false;
    // Max Price
    if (item.price > maxPrice) return false;
    // Search Query Text
    if (query.trim()) {
      const q = query.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchBrand = item.brandName.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchBrand) return false;
    }
    return true;
  });

  // Sorting Logic
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'PRICE_LOW') return a.price - b.price;
    if (sortBy === 'PRICE_HIGH') return b.price - a.price;
    if (sortBy === 'RATING') return b.rating - a.rating;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search Header Bar */}
      <div className="bg-white dark:bg-surface-darkCard p-4 rounded-card border border-stone-200 dark:border-stone-800 shadow-subtle space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search products, braid styles, tech, tutors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-input bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs sm:text-sm border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
            />
            <SearchIcon className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-3 text-stone-400 hover:text-stone-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Campus Selector */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-input bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300">
              <MapPin className="w-3.5 h-3.5 text-accent-500" />
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="bg-transparent focus:outline-none text-xs font-bold"
              >
                <option value="ALL">All Campuses</option>
                {SCHOOLS.map(s => (
                  <option key={s.id} value={s.shortName}>{s.shortName}</option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-input bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-600" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-transparent focus:outline-none text-xs font-bold"
              >
                <option value="NEWEST">Newest First</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
                <option value="RATING">Top Rated Sellers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          <span className="text-xs font-bold text-stone-400 mr-1">Categories:</span>
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedCategory === 'ALL' ? 'bg-brand-900 text-white' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300'}`}
          >
            All Categories
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${selectedCategory === cat.slug ? 'bg-brand-900 text-white' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-stone-500">
          <div>
            Showing <strong className="text-stone-900 dark:text-stone-100">{filtered.length}</strong> results {selectedSchool !== 'ALL' && `for ${selectedSchool}`}
          </div>
          <button
            onClick={() => setOnlyAvailableToday(!onlyAvailableToday)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold transition-colors ${
              onlyAvailableToday 
                ? 'bg-emerald-500 text-white' 
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" /> Pickup Today Only
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-surface-darkCard rounded-card border border-stone-200 dark:border-stone-800 p-8">
            <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto mb-4">
              <SearchIcon className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-base text-stone-900 dark:text-stone-100 mb-1">No items found</h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-4">
              Try searching with different keywords or clearing your category filters.
            </p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('ALL');
                setSelectedType('ALL');
                setOnlyAvailableToday(false);
              }}
              className="px-4 py-2 rounded-button bg-brand-900 text-white text-xs font-bold"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
