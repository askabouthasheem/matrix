"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PlusCircle, Image as ImageIcon, CheckCircle2, ArrowLeft, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CATEGORIES } from '@/lib/mockData';

export default function NewListingPage() {
  const router = useRouter();
  const { addListing, selectedSchool } = useApp();

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('cat_tech');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [type, setType] = useState<'PRODUCT' | 'SERVICE' | 'TRAINING'>('PRODUCT');
  const [stock, setStock] = useState('10');
  const [isAvailableToday, setIsAvailableToday] = useState(true);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1609592424074-12ee49ef7ee2?w=800');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !description) return;

    const selectedCatObj = CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[0];

    addListing({
      id: `list_${Date.now()}`,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description,
      price: parseFloat(price),
      originalPrice: originalPrice ? parseFloat(originalPrice) : undefined,
      type,
      categoryId,
      categoryName: selectedCatObj.name,
      schoolId: "sch_unilag",
      schoolShortName: selectedSchool !== 'ALL' ? selectedSchool : 'UNILAG',
      brandId: "brand_tobi_tech",
      brandName: "Tobi Tech Hub",
      brandLogo: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150",
      brandTrustScore: 98,
      brandResponseTime: "< 10 mins",
      images: [imageUrl],
      stock: parseInt(stock),
      isAvailableToday,
      isFeatured: true,
      status: "ACTIVE",
      views: 1,
      rating: 5.0,
      reviewCount: 0,
      createdAt: new Date().toISOString()
    });

    router.push('/seller/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-card space-y-6">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50">
            Create Campus Listing
          </h1>
          <p className="text-xs text-stone-500">
            Publish a product, braid service, or skill training for students in {selectedSchool}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Listing Title */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Listing Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. UK Used MacBook Pro M1 2020 8GB/256GB"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
            />
          </div>

          {/* Type Selector */}
          <div className="grid grid-cols-3 gap-3">
            {(['PRODUCT', 'SERVICE', 'TRAINING'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`py-2.5 px-3 rounded-button text-xs font-bold border transition-all ${
                  type === t
                    ? 'bg-brand-900 text-white border-brand-900'
                    : 'border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:bg-stone-50'
                }`}
              >
                {t === 'PRODUCT' && '📦 Product'}
                {t === 'SERVICE' && '💅 Service / Braids'}
                {t === 'TRAINING' && '🎓 Bootcamp / Skill'}
              </button>
            ))}
          </div>

          {/* Category & Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                min="1"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Selling Price (₦) *
              </label>
              <input
                type="number"
                required
                placeholder="24500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Original Price (Optional)
              </label>
              <input
                type="number"
                placeholder="29000"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>
          </div>

          {/* Available for Pickup Today Checkbox */}
          <div className="p-3.5 rounded-card bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  Available for Pickup Today
                </div>
                <div className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Check if item is ready at your hostel/faculty right now.
                </div>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isAvailableToday}
              onChange={(e) => setIsAvailableToday(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
            />
          </div>

          {/* Image URL Input */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Image Photo URL
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Description & Pickup Instructions *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Describe condition, specifications, warranty, and exact campus pickup locations (e.g. Faculty of Science Quadrangle)."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-button bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-sm shadow-md transition-colors"
          >
            Publish Listing to {selectedSchool} Market
          </button>
        </form>
      </div>
    </div>
  );
}
