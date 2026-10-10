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
  Store,
  ArrowRight,
  Package
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SafeImage } from '@/components/common/SafeImage';

export default function AdminDashboardPage() {
  const { applications, reviewApplication, listings, deleteListing } = useApp();

  const pendingApps = applications.filter(a => a.status === 'PENDING');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="p-6 rounded-card bg-stone-900 text-white shadow-subtle border border-stone-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-rose-500" />
            <h1 className="text-xl sm:text-2xl font-black">CampusHustle Admin Panel</h1>
          </div>
          <p className="text-xs text-stone-300">
            Platform moderation, seller verification queue, and university campus control
          </p>
        </div>
        <div className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold">
          Master SuperAdmin Mode
        </div>
      </div>

      {/* Platform Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Link href="/admin/applications" className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-2 hover:border-rose-500 transition-all">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Pending Approvals</span>
            <ShieldCheck className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            {pendingApps.length} Applications
          </div>
          <div className="text-[11px] text-stone-400 font-medium flex items-center justify-between">
            <span>Student ID Queue</span>
            <span className="text-rose-600 font-bold">Review →</span>
          </div>
        </Link>

        <Link href="/admin/campuses" className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-2 hover:border-brand-500 transition-all">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Active Campuses</span>
            <Building2 className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100">
            5 Universities
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">UNILAG, LASU, UI, UNIOSUN, FOUNTAIN</div>
        </Link>

        <Link href="/admin/listings" className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-2 hover:border-brand-500 transition-all">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Active Listings</span>
            <Package className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-stone-900 dark:text-stone-100">
            {listings.length} Active
          </div>
          <div className="text-[11px] text-stone-400">Products, Braids, Skills</div>
        </Link>

        <div className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-400 font-bold uppercase tracking-wider">
            <span>Escrow Volume</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600">
            ₦12.8M Protected
          </div>
          <div className="text-[11px] text-stone-400 font-medium">Paystack Escrow System</div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Link
          href="/admin/applications"
          className="p-4 rounded-card bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between font-bold text-xs text-rose-800 dark:text-rose-300 hover:shadow-subtle transition-all"
        >
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> Vendor Approvals Queue
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/admin/listings"
          className="p-4 rounded-card bg-brand-50/60 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-900/60 flex items-center justify-between font-bold text-xs text-brand-800 dark:text-brand-300 hover:shadow-subtle transition-all"
        >
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4" /> Moderate Listings
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/admin/users"
          className="p-4 rounded-card bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-between font-bold text-xs text-stone-800 dark:text-stone-200 hover:shadow-subtle transition-all"
        >
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" /> Registered Users
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          href="/admin/campuses"
          className="p-4 rounded-card bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 flex items-center justify-between font-bold text-xs text-emerald-800 dark:text-emerald-300 hover:shadow-subtle transition-all"
        >
          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4" /> Campuses & Categories
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Seller Verification Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
          <div>
            <h2 className="font-black text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Pending Seller Applications ({pendingApps.length})</span>
            </h2>
            <p className="text-xs text-stone-500">Inspect student ID uploads and .edu.ng emails before granting verified status</p>
          </div>
          <Link href="/admin/applications" className="text-xs font-bold text-rose-600 hover:underline">
            View All Applications →
          </Link>
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
                className="p-5 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200/90 dark:border-stone-800 shadow-subtle space-y-4"
              >
                <div className="flex items-center justify-between border-b pb-3">
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
                  <div className="relative h-32 w-full rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                    <SafeImage src={app.studentIdCardUrl} alt="Student ID" fill className="object-cover" />
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => reviewApplication(app.id, 'APPROVED')}
                    className="py-2.5 rounded-button bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center justify-center gap-1 shadow-sm transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Vendor</span>
                  </button>
                  <button
                    onClick={() => reviewApplication(app.id, 'REJECTED')}
                    className="py-2.5 rounded-button bg-rose-100 hover:bg-rose-200 text-rose-700 font-extrabold text-xs flex items-center justify-center gap-1 transition-colors"
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
    </div>
  );
}
