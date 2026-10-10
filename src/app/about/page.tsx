import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Building2, Zap, Heart, CheckCircle2, Store } from 'lucide-react';
import { SCHOOLS } from '@/lib/mockData';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-300 text-xs font-bold border border-brand-200">
          <ShieldCheck className="w-4 h-4 text-brand-600" /> About CampusHustle
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-50">
          Empowering Nigerian Student Entrepreneurs
        </h1>
        <p className="text-sm text-stone-500 max-w-xl mx-auto leading-relaxed">
          Inspired by UniHustle.ng but redesigned from the ground up for trust, speed, and real campus-first experience.
        </p>
      </div>

      {/* Main Vision */}
      <div className="p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-card space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100">Our Core Vision</h2>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          Campus commerce in Nigeria has traditionally been scattered across hundreds of noisy WhatsApp groups, Telegram channels, and unverified Instagram DMs. Students face frequent payment scams, unfulfilled delivery promises, and zero buyer protection.
        </p>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          <strong>CampusHustle</strong> changes that completely by introducing:
        </p>
        <ul className="list-disc list-inside text-xs sm:text-sm text-stone-600 dark:text-stone-300 space-y-1.5 pl-2">
          <li><strong>Verified Student Badges:</strong> Authenticated via university school emails (.edu.ng) and optional student ID cards.</li>
          <li><strong>Paystack Escrow Protection:</strong> Buyer funds are locked safely until item delivery or service completion is physically inspected and confirmed.</li>
          <li><strong>Same-Campus Discovery:</strong> Filter listings by "Available for Pickup Today" right outside your hostel or faculty quadrangle.</li>
          <li><strong>Direct In-App Chat:</strong> Communicate seamlessly with sellers with full listing context and quick escrow checkout buttons.</li>
        </ul>
      </div>

      {/* Launch Campuses Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 text-center">Launch Universities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {SCHOOLS.map(sch => (
            <div key={sch.id} className="p-4 rounded-card bg-stone-50 dark:bg-stone-800/60 border text-center space-y-1">
              <Building2 className="w-6 h-6 text-brand-600 mx-auto" />
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">{sch.name}</h3>
              <p className="text-xs text-stone-500">{sch.shortName} • {sch.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
