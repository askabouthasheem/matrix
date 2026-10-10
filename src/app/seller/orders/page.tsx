"use client";

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, ShieldCheck, MapPin, CheckCircle2, Lock } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SafeImage } from '@/components/common/SafeImage';

export default function SellerOrdersPage() {
  const { orders } = useApp();

  const sellerOrders = orders.filter(o => o.brandName === "Tobi Tech Hub" || o.sellerName === "Tobi Adebayo");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-600" />
            <span>Received Orders ({sellerOrders.length})</span>
          </h1>
          <p className="text-xs text-stone-500">Orders placed by campus buyers via Paystack Escrow</p>
        </div>
        <Link href="/seller/dashboard" className="text-xs font-bold text-brand-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="space-y-4">
        {sellerOrders.map(ord => (
          <div key={ord.id} className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-3">
            <div className="flex items-center justify-between border-b pb-2 text-xs">
              <span className="font-mono font-bold text-brand-600">#{ord.orderNumber}</span>
              <span className="inline-flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full text-[11px]">
                <Lock className="w-3 h-3" /> {ord.escrowStatus}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                <SafeImage src={ord.listingImage} alt={ord.listingTitle} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{ord.listingTitle}</h4>
                <div className="text-xs text-stone-500 mt-0.5">
                  Buyer: <strong>{ord.buyerName}</strong> ({ord.buyerSchool}) • Location: <strong>{ord.deliveryLocation}</strong>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-black text-stone-900 dark:text-stone-50">₦{ord.amount.toLocaleString()}</div>
                <Link href="/chat" className="text-[11px] font-bold text-brand-600 underline">Chat Buyer</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
