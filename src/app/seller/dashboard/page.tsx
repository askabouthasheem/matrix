"use client";

import React from 'react';
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
  DollarSign
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function SellerDashboardPage() {
  const { listings, orders, user } = useApp();

  const sellerListings = listings.filter(l => l.brandName === "Tobi Tech Hub" || l.brandId === "brand_tobi_tech");
  const sellerOrders = orders.filter(o => o.brandName === "Tobi Tech Hub" || o.sellerName === "Tobi Adebayo");

  const totalRevenue = sellerOrders.reduce((sum, o) => sum + o.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-card bg-gradient-to-r from-brand-900 via-brand-800 to-stone-900 text-white shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black">Tobi Tech Hub Dashboard</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500 text-white">
              Verified Vendor
            </span>
          </div>
          <p className="text-xs text-stone-300">
            University of Lagos (UNILAG) • Trust Score: <strong className="text-emerald-400">98%</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/seller/listings/new"
            className="px-4 py-2.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Listing</span>
          </Link>
          <Link
            href="/brand/tobi-tech-hub"
            className="px-4 py-2.5 rounded-button bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20"
          >
            View Public Storefront →
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
            <span>Total Escrow Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-50">
            ₦{totalRevenue > 0 ? totalRevenue.toLocaleString() : '145,500'}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% this month
          </div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
            <span>Campus Orders</span>
            <ShoppingBag className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-50">
            {sellerOrders.length + 12} Fulfilling
          </div>
          <div className="text-[11px] text-stone-400 font-medium">
            UNILAG Faculty Pickups
          </div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
            <span>Active Listings</span>
            <Store className="w-4 h-4 text-accent-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-50">
            {sellerListings.length > 0 ? sellerListings.length : 3} Items
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">
            All 100% In Stock
          </div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-medium">
            <span>Avg Response Speed</span>
            <Clock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-50">
            &lt; 10 Mins
          </div>
          <div className="text-[11px] text-purple-600 font-medium">
            Ultra-Fast Response Badge
          </div>
        </div>
      </div>

      {/* Navigation Sub-Menu */}
      <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <Link href="/seller/dashboard" className="px-4 py-2 rounded-button bg-brand-900 text-white text-xs font-bold">
          Overview
        </Link>
        <Link href="/seller/listings" className="px-4 py-2 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-stone-200">
          My Listings ({sellerListings.length})
        </Link>
        <Link href="/seller/orders" className="px-4 py-2 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-stone-200">
          Received Orders
        </Link>
        <Link href="/seller/payouts" className="px-4 py-2 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs font-bold hover:bg-stone-200">
          Bank & Payouts
        </Link>
      </div>

      {/* Recent Seller Listings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-stone-900 dark:text-stone-100">
            Active Store Products
          </h3>
          <Link href="/seller/listings/new" className="text-xs font-bold text-brand-600 hover:underline">
            + Add New
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sellerListings.map(item => (
            <div key={item.id} className="p-4 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 flex items-center gap-3">
              <img src={item.images[0]} alt={item.title} className="w-14 h-14 rounded-lg object-cover border" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{item.title}</h4>
                <div className="text-xs font-extrabold text-stone-900 dark:text-stone-200 mt-0.5">
                  ₦{item.price.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold mt-1">
                  Active • {item.views} Views
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
