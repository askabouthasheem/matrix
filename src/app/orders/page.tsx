"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Lock
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SafeImage } from '@/components/common/SafeImage';

export default function OrdersPage() {
  const { orders, updateOrderStatus, user } = useApp();
  const [activeTab, setActiveTab] = useState<'ALL' | 'ESCROW' | 'COMPLETED'>('ALL');

  const filteredOrders = orders.filter(ord => {
    if (activeTab === 'ESCROW') return ord.escrowStatus === 'HELD_IN_ESCROW';
    if (activeTab === 'COMPLETED') return ord.status === 'COMPLETED' || ord.escrowStatus === 'RELEASED_TO_SELLER';
    return true;
  });

  const handleConfirmDelivery = (orderId: string) => {
    updateOrderStatus(orderId, 'COMPLETED', 'RELEASED_TO_SELLER');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-brand-600" />
            <span>My Orders & Bookings</span>
          </h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Manage your campus purchases and Paystack Escrow release confirmations
          </p>
        </div>

        {/* Escrow Guarantee Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 text-xs font-bold shadow-subtle">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Paystack Escrow Protected</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('ALL')}
          className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
            activeTab === 'ALL'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          All Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('ESCROW')}
          className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
            activeTab === 'ESCROW'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          🔒 Held in Escrow ({orders.filter(o => o.escrowStatus === 'HELD_IN_ESCROW').length})
        </button>
        <button
          onClick={() => setActiveTab('COMPLETED')}
          className={`px-4 py-2 rounded-button text-xs font-bold transition-all ${
            activeTab === 'COMPLETED'
              ? 'bg-brand-900 text-white shadow-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          Completed ({orders.filter(o => o.status === 'COMPLETED' || o.escrowStatus === 'RELEASED_TO_SELLER').length})
        </button>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-surface-darkCard rounded-card border border-stone-200 dark:border-stone-800 p-8 space-y-3">
          <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-sm">No orders in this tab</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            You haven't placed any orders matching this filter yet.
          </p>
          <Link href="/search" className="px-4 py-2 rounded-button bg-brand-900 text-white text-xs font-bold inline-block">
            Explore Deals
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map(order => {
            const isEscrowHeld = order.escrowStatus === 'HELD_IN_ESCROW';
            const isCompleted = order.status === 'COMPLETED' || order.escrowStatus === 'RELEASED_TO_SELLER';

            return (
              <div
                key={order.id}
                className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-brand-600 dark:text-brand-400">
                      #{order.orderNumber}
                    </span>
                    <span className="text-stone-300">•</span>
                    <span className="text-xs text-stone-400">{order.createdAt}</span>
                  </div>

                  <div>
                    {isEscrowHeld && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-200 text-xs font-bold">
                        <Lock className="w-3.5 h-3.5 text-amber-600" /> Funds Held in Paystack Escrow
                      </span>
                    )}
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-200 text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Funds Released to Seller
                      </span>
                    )}
                  </div>
                </div>

                {/* Listing & Seller Details */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-stone-100 border">
                    <SafeImage src={order.listingImage} alt={order.listingTitle} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
                      Vendor: {order.brandName} ({order.buyerSchool})
                    </span>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 truncate">
                      {order.listingTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-500">
                      <span className="font-black text-stone-900 dark:text-stone-100">
                        ₦{order.amount.toLocaleString()}
                      </span>
                      <span>Qty: {order.quantity}</span>
                      <span className="flex items-center gap-1 text-stone-400">
                        <MapPin className="w-3.5 h-3.5 text-accent-500" /> {order.deliveryLocation}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-[11px] text-stone-500">
                    Payment Reference: <span className="font-mono text-stone-700 dark:text-stone-300 font-bold">{order.paymentRef}</span> ({order.paymentProvider})
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {isEscrowHeld && (
                      <button
                        onClick={() => handleConfirmDelivery(order.id)}
                        className="w-full sm:w-auto px-4 py-2.5 rounded-button bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm transition-colors flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Confirm Receipt & Release Funds</span>
                      </button>
                    )}

                    <Link
                      href="/chat"
                      className="px-3 py-2 rounded-button bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold"
                    >
                      Chat Seller
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
