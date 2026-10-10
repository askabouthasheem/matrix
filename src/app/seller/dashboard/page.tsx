"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Store, 
  TrendingUp, 
  ShoppingBag, 
  Eye, 
  ShieldCheck, 
  PlusCircle, 
  SlidersHorizontal,
  Clock,
  ArrowUpRight,
  DollarSign,
  Package,
  Trash2,
  Lock,
  CheckCircle2,
  Edit3
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SafeImage } from '@/components/common/SafeImage';

export default function SellerDashboardPage() {
  const { listings, orders, user, deleteListing, updateListing } = useApp();
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'LISTINGS' | 'ORDERS' | 'SETTINGS'>('OVERVIEW');

  const sellerListings = listings.filter(l => l.brandName === "Tobi Tech Hub" || l.brandId === "brand_tobi_tech");
  const sellerOrders = orders.filter(o => o.brandName === "Tobi Tech Hub" || o.sellerName === "Tobi Adebayo");

  const totalEarnings = sellerOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalViews = sellerListings.reduce((sum, l) => sum + l.views, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-card bg-stone-900 text-white shadow-subtle border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black">Tobi Tech Hub Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white">
              Verified Vendor
            </span>
          </div>
          <p className="text-xs text-stone-300">
            University of Lagos (UNILAG) • Trust Score: <strong className="text-emerald-400">98%</strong> • Response Rate: <strong className="text-accent-400">99.4%</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/seller/listings/new"
            className="px-4 py-2.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Listing</span>
          </Link>
          <Link
            href="/brand/tobi-tech-hub"
            className="px-4 py-2.5 rounded-button bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-colors"
          >
            View Public Storefront →
          </Link>
        </div>
      </div>

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Escrow Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-50">
            ₦{totalEarnings > 0 ? totalEarnings.toLocaleString() : '145,500'}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% this month
          </div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Total Orders</span>
            <ShoppingBag className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-50">
            {sellerOrders.length + 12} Orders
          </div>
          <div className="text-[11px] text-stone-400 font-medium">
            UNILAG Campus Fulfillments
          </div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Listing Impressions</span>
            <Eye className="w-4 h-4 text-accent-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-50">
            {totalViews > 0 ? totalViews : '1,870'} Views
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">
            High campus search visibility
          </div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Response Speed</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-50">
            &lt; 10 Mins
          </div>
          <div className="text-[11px] text-purple-600 font-semibold">
            Top 5% on UNILAG campus
          </div>
        </div>
      </div>

      {/* Dashboard Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
            activeTab === 'OVERVIEW'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('LISTINGS')}
          className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
            activeTab === 'LISTINGS'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          My Listings ({sellerListings.length})
        </button>
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
            activeTab === 'ORDERS'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          Orders Management ({sellerOrders.length})
        </button>
        <Link
          href="/seller/payouts"
          className="px-4 py-2 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-stone-200"
        >
          Bank & Payouts
        </Link>
        <Link
          href="/seller/settings"
          className="px-4 py-2 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-stone-200"
        >
          Store Settings
        </Link>
      </div>

      {/* Tab 1: Overview */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
              Active Store Items
            </h2>
            <Link href="/seller/listings/new" className="text-xs font-bold text-brand-600 hover:underline">
              + Add New Listing
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {sellerListings.map(item => (
              <div key={item.id} className="p-4 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-200">
                  <SafeImage src={item.images[0]} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-brand-600 uppercase block">{item.categoryName}</span>
                  <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{item.title}</h4>
                  <div className="text-xs font-black text-stone-900 dark:text-stone-200 mt-0.5">
                    ₦{item.price.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                    Stock: {item.stock} • {item.views} Views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: My Listings (with edit/delete) */}
      {activeTab === 'LISTINGS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
              Manage Your Listings
            </h2>
            <Link
              href="/seller/listings/new"
              className="px-3 py-1.5 rounded-button bg-accent-500 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Add Item
            </Link>
          </div>

          <div className="bg-white dark:bg-surface-darkCard rounded-card border divide-y overflow-hidden shadow-subtle">
            {sellerListings.map(item => (
              <div key={item.id} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border">
                    <SafeImage src={item.images[0]} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{item.title}</h4>
                    <div className="text-xs font-black text-stone-900 dark:text-stone-200">
                      ₦{item.price.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      {item.isAvailableToday ? 'Pickup Today: YES' : 'Pickup Today: NO'} • Stock: {item.stock}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateListing(item.id, { isAvailableToday: !item.isAvailableToday })}
                    className={`px-2.5 py-1 rounded text-xs font-bold ${
                      item.isAvailableToday ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    Toggle Pickup
                  </button>
                  <button
                    onClick={() => deleteListing(item.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                    title="Delete Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Orders Management */}
      {activeTab === 'ORDERS' && (
        <div className="space-y-4">
          <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
            Received Campus Orders
          </h2>
          <div className="space-y-3">
            {sellerOrders.map(order => (
              <div key={order.id} className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 shadow-subtle space-y-3">
                <div className="flex items-center justify-between border-b pb-2 text-xs">
                  <span className="font-mono font-bold text-brand-600">#{order.orderNumber}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-[11px]">
                    <Lock className="w-3 h-3" /> {order.escrowStatus}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 border">
                    <SafeImage src={order.listingImage} alt={order.listingTitle} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs truncate">{order.listingTitle}</h4>
                    <span className="text-xs text-stone-500">Buyer: {order.buyerName} ({order.buyerSchool}) • Meetup: {order.deliveryLocation}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black">₦{order.amount.toLocaleString()}</div>
                    <Link href="/chat" className="text-xs text-brand-600 font-bold underline">Chat Buyer</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
