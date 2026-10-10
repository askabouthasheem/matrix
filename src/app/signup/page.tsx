"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building2, ShieldCheck, ArrowRight, Lock, Mail, User as UserIcon } from 'lucide-react';
import { SCHOOLS } from '@/lib/mockData';
import { useApp } from '@/context/AppContext';

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [school, setSchool] = useState('UNILAG');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({
      id: `usr_${Date.now()}`,
      name,
      email,
      role: 'BUYER',
      schoolShortName: school,
      isVerified: true,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
    });
    router.push('/onboarding');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-modal space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-900 to-accent-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
            C
          </div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50">
            Join CampusHustle
          </h1>
          <p className="text-xs text-stone-500">
            Create your account with your verified campus school email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Select Your University / Polytechnic *
            </label>
            <div className="relative">
              <select
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-900 dark:text-stone-100 focus:outline-none"
              >
                {SCHOOLS.map(s => (
                  <option key={s.id} value={s.shortName}>
                    {s.name} ({s.shortName})
                  </option>
                ))}
              </select>
              <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Chioma Nwosu"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
              <UserIcon className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Student Email (.edu.ng) *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder={`student@${school.toLowerCase()}.edu.ng`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-button bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
          >
            <span>Create Student Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-brand-600 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
