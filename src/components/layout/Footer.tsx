import React from 'react';
import Link from 'next/link';
import { SCHOOLS } from '@/lib/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-50 dark:bg-stone-950 text-stone-600 dark:text-stone-400 border-t border-stone-200/60 dark:border-stone-800/80 pt-16 pb-24 md:pb-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-200/60 dark:border-stone-800">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold flex items-center justify-center text-xs">
                C
              </div>
              <span className="text-base font-bold text-stone-900 dark:text-stone-100 tracking-tight">
                CampusHustle
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed font-normal">
              A trusted campus-first marketplace for Nigerian university students. Verified student sellers, Paystack escrow protection, and direct in-app messaging.
            </p>
          </div>

          {/* Supported Campuses */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider mb-3">
              Campuses
            </h4>
            <ul className="space-y-2 text-stone-500">
              {SCHOOLS.map(sch => (
                <li key={sch.id}>
                  <Link href={`/search?school=${sch.shortName}`} className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">
                    {sch.name} ({sch.shortName})
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-stone-500">
              <li><Link href="/about" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">About</Link></li>
              <li><Link href="/how-it-works" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">How Escrow Works</Link></li>
              <li><Link href="/seller/onboarding" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">Become a Seller</Link></li>
              <li><Link href="/faq" className="hover:text-stone-900 dark:hover:text-stone-200 transition-colors">Safety & FAQ</Link></li>
            </ul>
          </div>

          {/* Trust & Safety */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-200 uppercase tracking-wider mb-3">
              Trust & Safety
            </h4>
            <p className="text-xs text-stone-500 leading-relaxed mb-3">
              All campus vendors are verified with active university emails (.edu.ng) and optional student ID cards.
            </p>
            <div className="text-stone-500">
              Campus support: <a href="mailto:support@campushustle.ng" className="text-stone-800 dark:text-stone-200 underline">support@campushustle.ng</a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-400">
          <div>
            © {new Date().getFullYear()} CampusHustle. Designed for Nigerian students.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-stone-700 dark:hover:text-stone-300">Privacy</Link>
            <Link href="/faq" className="hover:text-stone-700 dark:hover:text-stone-300">Terms</Link>
            <Link href="/how-it-works" className="hover:text-stone-700 dark:hover:text-stone-300">Escrow Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
