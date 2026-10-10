"use client";

import React from 'react';
import Link from 'next/link';
import { 
  SlidersHorizontal, 
  ShieldCheck, 
  Users, 
  Building2, 
  ShoppingBag, 
  CheckCircle2, 
  XCircle,
  Eye,
  Store
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function AdminDashboardPage() {
  const { applications, reviewApplication, listings, deleteListing } = useApp();

  const pendingApps = applications.filter(a => a.status === 'PENDING');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="p-6 rounded-card bg-gradient-to-r from-stone-900 via-rose-950 to-stone-900 text-white shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-rose-400" />
            <h1 className="text-xl sm:text-2xl font-black">CampusHustle Admin Panel</h1>
          </div>
          <p className="text-xs text-stone-300">
            Platform moderation, seller verification queue, and campus metrics
          </p>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
          Master SuperAdmin Mode
        </div>
      </div>

      {/* Platform Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="text-xs text-stone-400 font-medium">Pending Approvals</div>
          <div className="text-2xl font-black text-rose-600">
            {pendingApps.length} Applications
          </div>
          <div className="text-[11px] text-stone-400">Student ID Verification</div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="text-xs text-stone-400 font-medium">Active Campuses</div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100">
            5 Universities
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">UNILAG, LASU, UI, UNIOSUN, FOUNTAIN</div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="text-xs text-stone-400 font-medium">Total Listings</div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100">
            {listings.length} Active
          </div>
          <div className="text-[11px] text-stone-400">Products, Services, Trainings</div>
        </div>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="text-xs text-stone-400 font-medium">Escrow Volume</div>
          <div className="text-2xl font-black text-emerald-600">
            ₦12.8M Protected
          </div>
          <div className="text-[11px] text-stone-400">Paystack Escrow System</div>
        </div>
      </div>

      {/* Seller Verification Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
          <div>
            <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Seller Verification Applications Queue ({pendingApps.length})</span>
            </h2>
            <p className="text-xs text-stone-500">Review student ID uploads and .edu.ng emails before granting seller badges</p>
          </div>
        </div>

        {pendingApps.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-surface-darkCard rounded-card border text-xs text-stone-500">
            No pending seller applications! All campus vendors are reviewed.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pendingApps.map(app => (
              <div
                key={app.id}
                className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-4"
              >
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {app.storeName}
                    </h3>
                    <span className="text-xs text-stone-500">
                      Applicant: {app.applicantName} ({app.schoolShortName})
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800">
                    PENDING REVIEW
                  </span>
                </div>

                <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
                  <div>School Email: <strong className="text-stone-900 dark:text-stone-100">{app.email}</strong></div>
                  <div>Category: <strong className="text-stone-900 dark:text-stone-100">{app.category}</strong></div>
                  <div className="text-stone-500 pt-1 italic">"{app.businessDescription}"</div>
                </div>

                {/* Student ID Card Preview */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase">Uploaded Student ID Card:</span>
                  <div className="relative h-32 w-full rounded-lg overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100">
                    <img src={app.studentIdCardUrl} alt="Student ID" className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => reviewApplication(app.id, 'APPROVED')}
                    className="py-2.5 rounded-button bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Vendor</span>
                  </button>
                  <button
                    onClick={() => reviewApplication(app.id, 'REJECTED', 'Student ID card unreadable')}
                    className="py-2.5 rounded-button bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Listings Moderation Section */}
      <div className="space-y-4">
        <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
          Listings Moderation ({listings.length} Items)
        </h2>
        <div className="bg-white dark:bg-surface-darkCard rounded-card border border-stone-200 dark:border-stone-800 overflow-hidden divide-y divide-stone-100 dark:divide-stone-800">
          {listings.map(item => (
            <div key={item.id} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <img src={item.images[0]} alt={item.title} className="w-10 h-10 rounded object-cover shrink-0" />
                <div className="min-w-0">
                  <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">{item.title}</h4>
                  <span className="text-[10px] text-stone-400">{item.brandName} • {item.schoolShortName} • ₦{item.price.toLocaleString()}</span>
                </div>
              </div>
              <button
                onClick={() => deleteListing(item.id)}
                className="px-3 py-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white text-xs font-bold transition-colors"
              >
                Delete Listing
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
