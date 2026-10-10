"use client";

import React from 'react';
import Link from 'next/link';
import { User as UserIcon, ShieldCheck, Mail, Building2, Store, SlidersHorizontal, LogOut } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { VerifiedBadge } from '@/components/common/VerifiedBadge';

export default function ProfilePage() {
  const { user, loginAs, logout } = useApp();

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">Please sign in to view your profile</h2>
        <Link href="/login" className="px-4 py-2 rounded-button bg-brand-900 text-white font-bold text-xs inline-block">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-card space-y-6">
        {/* User Top Card */}
        <div className="flex items-center gap-4 border-b border-stone-100 dark:border-stone-800 pb-6">
          <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-600" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50">{user.name}</h1>
              <VerifiedBadge schoolShortName={user.schoolShortName} size="sm" />
            </div>
            <p className="text-xs text-stone-500">{user.email}</p>
            <div className="text-[11px] font-bold text-emerald-600">
              Verified Student Account • Trust Score: 98%
            </div>
          </div>
        </div>

        {/* Quick Role Switcher for Testing */}
        <div className="p-4 rounded-card bg-stone-50 dark:bg-stone-800/60 space-y-3">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            Role Switcher (Active Account Mode)
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => loginAs('BUYER')}
              className={`py-2 px-3 rounded-button text-xs font-bold transition-all ${user.role === 'BUYER' ? 'bg-brand-900 text-white' : 'bg-white border text-stone-700'}`}
            >
              Buyer Mode
            </button>
            <button
              onClick={() => loginAs('SELLER')}
              className={`py-2 px-3 rounded-button text-xs font-bold transition-all ${user.role === 'SELLER' ? 'bg-brand-900 text-white' : 'bg-white border text-stone-700'}`}
            >
              Seller Mode
            </button>
            <button
              onClick={() => loginAs('ADMIN')}
              className={`py-2 px-3 rounded-button text-xs font-bold transition-all ${user.role === 'ADMIN' ? 'bg-rose-600 text-white' : 'bg-white border text-stone-700'}`}
            >
              Admin Mode
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="space-y-2">
          <Link
            href="/orders"
            className="p-3.5 rounded-button bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700 flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200 transition-colors"
          >
            <span>My Orders & Bookings</span>
            <span>→</span>
          </Link>

          <Link
            href="/seller/onboarding"
            className="p-3.5 rounded-button bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700 flex items-center justify-between text-xs font-bold text-accent-600 transition-colors"
          >
            <span>Become a Verified Campus Seller</span>
            <span>→</span>
          </Link>

          {user.role === 'SELLER' && (
            <Link
              href="/seller/dashboard"
              className="p-3.5 rounded-button bg-brand-50 hover:bg-brand-100 dark:bg-brand-950 dark:hover:bg-brand-900 flex items-center justify-between text-xs font-bold text-brand-700 dark:text-brand-300 transition-colors"
            >
              <span>Seller Dashboard & Store Management</span>
              <span>→</span>
            </Link>
          )}

          {user.role === 'ADMIN' && (
            <Link
              href="/admin/dashboard"
              className="p-3.5 rounded-button bg-rose-50 hover:bg-rose-100 dark:bg-rose-950 dark:hover:bg-rose-900 flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-300 transition-colors"
            >
              <span>Admin Verification & Moderation Panel</span>
              <span>→</span>
            </Link>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="w-full py-3 rounded-button bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </div>
  );
}
