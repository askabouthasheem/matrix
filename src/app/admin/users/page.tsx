"use client";

import React from 'react';
import Link from 'next/link';
import { Users, ShieldCheck, Mail, Building2 } from 'lucide-react';
import { SCHOOLS } from '@/lib/mockData';

export default function AdminUsersPage() {
  const sampleUsers = [
    { name: "Chioma Nwosu", email: "chioma.n@unilag.edu.ng", school: "UNILAG", role: "BUYER", verified: true },
    { name: "Tobi Adebayo", email: "tobi.adebayo@unilag.edu.ng", school: "UNILAG", role: "SELLER", verified: true },
    { name: "Deji Okafor", email: "deji.okafor@lasu.edu.ng", school: "LASU", role: "SELLER", verified: true },
    { name: "Amina Bello", email: "amina.bello@unilag.edu.ng", school: "UNILAG", role: "SELLER", verified: true },
    { name: "Oluwaseun Alabi", email: "seun.alabi@ui.edu.ng", school: "UI", role: "SELLER", verified: true },
    { name: "Kelechi Amadi", email: "kelechi.a@lasu.edu.ng", school: "LASU", role: "BUYER", verified: true }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <Users className="w-5 h-5 text-rose-600" />
            <span>Campus Users & Verification ({sampleUsers.length})</span>
          </h1>
          <p className="text-xs text-stone-500">All registered student accounts with university email domains</p>
        </div>
        <Link href="/admin/dashboard" className="text-xs font-bold text-rose-600 hover:underline">
          ← Back to Admin Dashboard
        </Link>
      </div>

      <div className="bg-white dark:bg-surface-darkCard rounded-card border divide-y overflow-hidden shadow-subtle">
        {sampleUsers.map((u, i) => (
          <div key={i} className="p-4 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-stone-900 dark:text-stone-100">{u.name}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  .edu.ng verified
                </span>
              </div>
              <div className="text-xs text-stone-500 mt-0.5">{u.email} • {u.school}</div>
            </div>
            <span className="text-xs font-extrabold px-2.5 py-1 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              Role: {u.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
