"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Store, CheckCircle2, Save } from 'lucide-react';

export default function SellerSettingsPage() {
  const [storeName, setStoreName] = useState('Tobi Tech Hub');
  const [description, setDescription] = useState('Verified campus laptop & powerbank plug. Guaranteed warranty on all UK-used MacBooks and original Anker powerbanks.');
  const [whatsapp, setWhatsapp] = useState('https://wa.me/2348123456789');
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
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <Store className="w-5 h-5 text-brand-600" />
            <span>Storefront Settings</span>
          </h1>
          <p className="text-xs text-stone-500">Edit your public store brand profile, bio, and WhatsApp catalog link</p>
        </div>
        <Link href="/seller/dashboard" className="text-xs font-bold text-brand-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-card space-y-6">
        {saved && (
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Store Settings Updated Successfully!
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Store Name</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border text-xs text-stone-900 dark:text-stone-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">Store Description & Pickup Locations</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3.5 rounded-input bg-stone-50 dark:bg-stone-800 border text-xs text-stone-900 dark:text-stone-100"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">WhatsApp Catalogue Deep-Link</label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border text-xs text-stone-900 dark:text-stone-100"
            />
          </div>

          <button type="submit" className="w-full py-3 rounded-button bg-brand-900 text-white text-xs font-bold flex items-center justify-center gap-2">
            <Save className="w-4 h-4" /> Save Store Changes
          </button>
        </form>
      </div>
    </div>
  );
}
