"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, Building2, Store, Upload, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SCHOOLS, CATEGORIES } from '@/lib/mockData';

export default function SellerOnboardingPage() {
  const router = useRouter();
  const { submitApplication, selectedSchool, user } = useApp();

  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('Gadgets & Tech');
  const [businessDescription, setBusinessDescription] = useState('');
  const [studentIdCardUrl, setStudentIdCardUrl] = useState('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitApplication({
      applicantName: user?.name || "Student Entrepreneur",
      email: user?.email || "student@unilag.edu.ng",
      schoolName: SCHOOLS.find(s => s.shortName === selectedSchool)?.name || "University of Lagos",
      schoolShortName: selectedSchool !== 'ALL' ? selectedSchool : 'UNILAG',
      storeName,
      category,
      studentIdCardUrl,
      businessDescription
    });
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="w-12 h-12 rounded-xl bg-accent-500 text-white font-bold flex items-center justify-center mx-auto shadow-md">
          <Store className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-black text-stone-900 dark:text-stone-50">
          Become a Verified Campus Seller
        </h1>
        <p className="text-xs text-stone-500">
          Get your Verified Student Badge, access Paystack Escrow payouts, and build a trusted brand on your campus.
        </p>
      </div>

      {submitted ? (
        <div className="p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-modal text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
            Seller Application Submitted! 🚀
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
            Our campus admin team is reviewing your school email and student ID card for <strong className="text-stone-900 dark:text-stone-100">{storeName}</strong>. You will receive an approval notification shortly!
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="px-4 py-2.5 rounded-button bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
            >
              Test Admin Approval Queue →
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2.5 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs"
            >
              Back to Home Feed
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 sm:p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-card space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Store / Brand Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amina Glam & Braids"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Primary Product or Service Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-900 dark:text-stone-100"
              >
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Business & Product Description *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Briefly describe what you sell or offer to fellow students..."
                value={businessDescription}
                onChange={(e) => setBusinessDescription(e.target.value)}
                className="w-full p-3.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Upload Student ID Card Photo (Optional / Verification)
              </label>
              <input
                type="text"
                value={studentIdCardUrl}
                onChange={(e) => setStudentIdCardUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <span>Submit Verification Application</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
