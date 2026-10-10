import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, Building2 } from 'lucide-react';
import { SCHOOLS } from '@/lib/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-900 text-stone-300 border-t border-brand-800 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-brand-800">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent-500 text-white font-bold flex items-center justify-center text-lg">
                C
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CampusHustle</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Nigeria’s #1 trusted campus-first marketplace. Verified student sellers, Paystack escrow protection, and direct in-app chat — no WhatsApp group chaos.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-950/80 border border-brand-700 text-xs text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Paystack Escrow Protected</span>
            </div>
          </div>

          {/* Supported Campuses */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-accent-400" /> Launch Campuses
            </h4>
            <ul className="space-y-2 text-xs">
              {SCHOOLS.map(sch => (
                <li key={sch.id}>
                  <Link href={`/search?school=${sch.shortName}`} className="hover:text-white transition-colors flex items-center justify-between">
                    <span>{sch.name}</span>
                    <span className="text-[10px] text-accent-400 font-semibold">{sch.shortName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/about" className="hover:text-white transition-colors">About CampusHustle</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How Escrow Protection Works</Link></li>
              <li><Link href="/seller/onboarding" className="hover:text-white transition-colors font-semibold text-accent-400">Become a Verified Seller</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">Campus Safety & FAQ</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-white transition-colors text-stone-400">Admin Panel</Link></li>
            </ul>
          </div>

          {/* Safety & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Trust & Safety</h4>
            <p className="text-xs text-stone-400 mb-3">
              We strictly verify student emails (.edu.ng) and optional student ID cards before approving campus vendors.
            </p>
            <div className="text-xs text-stone-400">
              Need help? Chat with campus support:
              <a href="mailto:support@campushustle.ng" className="text-accent-400 underline block font-medium mt-1">
                support@campushustle.ng
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} CampusHustle. Built with <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-current" /> for Nigerian Students.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="hover:text-white">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-white">Terms of Service</Link>
            <Link href="/faq" className="hover:text-white">Escrow Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
