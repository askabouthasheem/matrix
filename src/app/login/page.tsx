"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck, Store, SlidersHorizontal } from 'lucide-react';
import { useApp, UserRole } from '@/context/AppContext';

export default function LoginPage() {
  const router = useRouter();
  const { loginAs } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAs('BUYER');
    router.push('/');
  };

  const handleQuickLogin = (role: UserRole, targetUrl: string) => {
    loginAs(role);
    router.push(targetUrl);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-6 sm:p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-modal space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-900 to-accent-500 text-white font-black text-2xl flex items-center justify-center mx-auto shadow-md">
            C
          </div>
          <h1 className="text-xl font-extrabold text-stone-900 dark:text-stone-50">
            Welcome Back to CampusHustle
          </h1>
          <p className="text-xs text-stone-500">
            Sign in to access your campus marketplace, chats, and orders
          </p>
        </div>

        {/* Demo Role Switcher Buttons */}
        <div className="p-3.5 rounded-card bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 space-y-2">
          <div className="text-[11px] font-bold text-brand-900 dark:text-brand-200 uppercase tracking-wider text-center">
            ⚡ Demo Instant Logins (Click to Switch Role)
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleQuickLogin('BUYER', '/')}
              className="p-2 rounded bg-white dark:bg-stone-800 border text-[11px] font-bold text-stone-800 dark:text-stone-200 hover:border-brand-500 transition-colors text-center"
            >
              Buyer User
            </button>
            <button
              onClick={() => handleQuickLogin('SELLER', '/seller/dashboard')}
              className="p-2 rounded bg-white dark:bg-stone-800 border text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:border-brand-500 transition-colors text-center"
            >
              Seller User
            </button>
            <button
              onClick={() => handleQuickLogin('ADMIN', '/admin/dashboard')}
              className="p-2 rounded bg-white dark:bg-stone-800 border text-[11px] font-bold text-rose-600 hover:border-rose-500 transition-colors text-center"
            >
              Admin Panel
            </button>
          </div>
        </div>

        <form onSubmit={handleCustomLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              School Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="chioma.n@unilag.edu.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                Password
              </label>
              <Link href="/forgot-password" className="text-[11px] text-brand-600 hover:underline">
                Forgot password?
              </Link>
            </div>
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
            <span>Sign In to Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-stone-500 pt-2 border-t border-stone-100 dark:border-stone-800">
          New on campus?{' '}
          <Link href="/signup" className="font-bold text-brand-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
