"use client";

import React from 'react';
import Link from 'next/link';
import { Building2, PlusCircle, CheckCircle2 } from 'lucide-react';
import { SCHOOLS, CATEGORIES } from '@/lib/mockData';

export default function AdminCampusesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-rose-600" />
            <span>Campuses & Categories Management</span>
          </h1>
          <p className="text-xs text-stone-500">Manage supported universities, campuses, and marketplace categories</p>
        </div>
        <Link href="/admin/dashboard" className="text-xs font-bold text-rose-600 hover:underline">
          ← Back to Admin Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Campuses */}
        <div className="space-y-4">
          <h2 className="font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Active University Campuses ({SCHOOLS.length})
          </h2>
          <div className="bg-white dark:bg-surface-darkCard rounded-card border divide-y overflow-hidden shadow-subtle">
            {SCHOOLS.map(s => (
              <div key={s.id} className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">{s.name} ({s.shortName})</div>
                  <div className="text-[11px] text-stone-400">{s.city}, {s.state} • @{s.emailDomain}</div>
                </div>
                <span className="text-xs font-extrabold text-emerald-600">{s.activeSellersCount} sellers</span>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h2 className="font-bold text-sm text-stone-900 dark:text-stone-100 uppercase tracking-wider">
            Marketplace Categories ({CATEGORIES.length})
          </h2>
          <div className="bg-white dark:bg-surface-darkCard rounded-card border divide-y overflow-hidden shadow-subtle">
            {CATEGORIES.map(c => (
              <div key={c.id} className="p-3.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">{c.name}</div>
                  <div className="text-[11px] text-stone-400">{c.description}</div>
                </div>
                <span className="text-[11px] font-mono font-bold text-brand-600">/{c.slug}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
