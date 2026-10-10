"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SellerPayoutsPage() {
  const [bank, setBank] = useState('GTBank');
  const [accountNumber, setAccountNumber] = useState('0123456789');
  const [accountName, setAccountName] = useState('TOBI ADEBAYO (UNILAG)');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50">
            Escrow Payout & Bank Account
          </h1>
          <p className="text-xs text-stone-500">
            Where your Escrow funds are automatically transferred upon delivery confirmation
          </p>
        </div>
        <Link href="/seller/dashboard" className="text-xs font-bold text-brand-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-card space-y-6">
        {saved && (
          <div className="p-3.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Payout Bank Account Details Saved Successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Select Nigerian Bank
            </label>
            <select
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-900 dark:text-stone-100"
            >
              <option value="GTBank">Guaranty Trust Bank (GTBank)</option>
              <option value="Kuda">Kuda Microfinance Bank</option>
              <option value="Moniepoint">Moniepoint MFB</option>
              <option value="OPay">OPay Digital Services</option>
              <option value="Zenith">Zenith Bank</option>
              <option value="Access">Access Bank</option>
              <option value="FirstBank">First Bank of Nigeria</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              10-Digit NUBAN Account Number
            </label>
            <input
              type="text"
              maxLength={10}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-mono font-bold text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
            <span>Verified Paystack Account Name:</span>
            <span>{accountName}</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-button bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs"
          >
            Save Payout Settings
          </button>
        </form>
      </div>
    </div>
  );
}
