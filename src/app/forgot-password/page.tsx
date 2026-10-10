"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-modal text-center space-y-6">
        <h1 className="text-xl font-black text-stone-900 dark:text-stone-50">
          Reset Password
        </h1>
        <p className="text-xs text-stone-500">
          Enter your registered student email to receive a password reset link.
        </p>

        {sent ? (
          <div className="p-4 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Password reset link sent to your email!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Student Email (.edu.ng)
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="student@unilag.edu.ng"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-input bg-stone-50 dark:bg-stone-800 border text-xs text-stone-900 dark:text-stone-100"
                />
                <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-button bg-brand-900 text-white font-extrabold text-xs"
            >
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-xs text-stone-400 pt-2">
          Remember password? <Link href="/login" className="text-brand-600 font-bold">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
