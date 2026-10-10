"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Store, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function OnboardingPage() {
  const router = useRouter();
  const { loginAs } = useApp();

  const handleSelectBuyer = () => {
    loginAs('BUYER');
    router.push('/');
  };

  const handleSelectSeller = () => {
    loginAs('SELLER');
    router.push('/seller/onboarding');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-modal text-center space-y-8">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-50 text-brand-700">
            Welcome to CampusHustle! 👋
          </span>
          <h1 className="text-2xl font-black text-stone-900 dark:text-stone-50">
            How would you like to use CampusHustle?
          </h1>
          <p className="text-xs text-stone-500">
            Select your primary account role (you can switch anytime later in your profile).
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={handleSelectBuyer}
            className="p-6 rounded-card border-2 border-stone-200 dark:border-stone-700 hover:border-brand-600 bg-stone-50 dark:bg-stone-800/60 text-left space-y-3 group transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-900 text-white font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 dark:text-stone-100 text-base">I want to Buy</h3>
              <p className="text-xs text-stone-500 mt-1">
                Discover campus tech, book braid sessions, order food, and pay with Paystack Escrow.
              </p>
            </div>
          </button>

          <button
            onClick={handleSelectSeller}
            className="p-6 rounded-card border-2 border-accent-500/50 hover:border-accent-500 bg-accent-50/50 dark:bg-accent-950/40 text-left space-y-3 group transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-accent-500 text-white font-bold flex items-center justify-center group-hover:scale-110 transition-transform">
              <Store className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-stone-900 dark:text-stone-100 text-base">I am a Seller / Vendor</h3>
              <p className="text-xs text-stone-500 mt-1">
                List products, offer braid services, manage orders, and get verified student badges.
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
