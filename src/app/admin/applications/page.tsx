"use client";

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AdminApplicationsPage() {
  const { applications, reviewApplication } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4">
        <div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Vendor Verification Applications Queue ({applications.length})</span>
          </h1>
          <p className="text-xs text-stone-500">Review student ID card uploads and issuing verified vendor badges</p>
        </div>
        <Link href="/admin/dashboard" className="text-xs font-bold text-rose-600 hover:underline">
          ← Back to Admin Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {applications.map(app => (
          <div key={app.id} className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">{app.storeName}</h3>
                <span className="text-xs text-stone-500">{app.applicantName} ({app.schoolShortName})</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                {app.status}
              </span>
            </div>

            <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
              <div>Email: <strong>{app.email}</strong></div>
              <div>Category: <strong>{app.category}</strong></div>
              <div className="text-stone-500 italic">"{app.businessDescription}"</div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold text-stone-400 uppercase">Uploaded Student ID Card:</span>
              <div className="relative h-32 w-full rounded-lg overflow-hidden border bg-stone-100">
                <img src={app.studentIdCardUrl} alt="ID card" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => reviewApplication(app.id, 'APPROVED')}
                className="py-2 rounded-button bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5" /> Approve Vendor
              </button>
              <button
                onClick={() => reviewApplication(app.id, 'REJECTED')}
                className="py-2 rounded-button bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1"
              >
                <XCircle className="w-3.5 h-3.5" /> Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
