import React from 'react';
import { ShieldCheck, CheckCircle2, Award } from 'lucide-react';

interface VerifiedBadgeProps {
  schoolShortName?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  schoolShortName, 
  size = 'md',
  showText = true 
}) => {
  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-[11px] font-bold',
    md: 'text-xs font-extrabold',
    lg: 'text-sm font-black'
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-500/30 shadow-subtle backdrop-blur-sm">
      <ShieldCheck className={`${iconSizes[size]} text-emerald-600 dark:text-emerald-400 shrink-0 fill-emerald-500/20`} />
      {showText && (
        <span className={`${textSizes[size]} tracking-tight flex items-center gap-1`}>
          Verified Student {schoolShortName ? <span className="opacity-70 font-semibold">({schoolShortName})</span> : ''}
        </span>
      )}
    </span>
  );
};

export const TrustScoreRing: React.FC<{ score: number; size?: 'sm' | 'md' }> = ({ score, size = 'md' }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge bg-brand-900/5 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-900 dark:text-brand-200">
      <div className="relative w-4 h-4 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-stone-200 dark:text-stone-700"
            strokeWidth="4"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-emerald-500"
            strokeDasharray={`${score}, 100`}
            strokeWidth="4"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
      <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
        {score}% Trust Score
      </span>
    </div>
  );
};

export const EscrowBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-bold shadow-subtle">
      <CheckCircle2 className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />
      Paystack Escrow Protected
    </span>
  );
};
