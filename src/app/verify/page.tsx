"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['5', '8', '2', '9', '1', '0']);
  const [verified, setVerified] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerified(true);
    setTimeout(() => router.push('/'), 1500);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-modal text-center space-y-6">
        <div className="w-12 h-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-xl font-black text-stone-900 dark:text-stone-50">
          Verify Your School Email
        </h1>
        <p className="text-xs text-stone-500">
          We sent a 6-digit verification OTP code to your university email address.
        </p>

        {verified ? (
          <div className="p-4 rounded-lg bg-emerald-50 text-emerald-800 font-bold text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Email Verified! Redirecting...
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex items-center justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                  className="w-10 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 border text-center font-mono font-bold text-lg text-stone-900 dark:text-stone-100 focus:ring-2 focus:ring-brand-600/30"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-button bg-brand-900 hover:bg-brand-800 text-white font-extrabold text-xs"
            >
              Verify OTP & Proceed
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
