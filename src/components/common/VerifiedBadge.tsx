import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

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
    sm: 'w-3 h-3',
    md: 'w-3.5 h-3.5',
    lg: 'w-4 h-4'
  };

  const textSizes = {
    sm: 'text-[10px] font-semibold tracking-tight',
    md: 'text-[11px] font-semibold tracking-tight',
    lg: 'text-xs font-bold tracking-tight'
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/20 backdrop-blur-sm">
      <ShieldCheck className={`${iconSizes[size]} text-emerald-600 dark:text-emerald-400 shrink-0`} />
      {showText && (
        <span className={textSizes[size]}>
          Verified student {schoolShortName ? <span className="opacity-75 font-normal">({schoolShortName})</span> : ''}
        </span>
      )}
    </span>
  );
};

export const TrustScoreRing: React.FC<{ score: number; size?: 'sm' | 'md' }> = ({ score, size = 'md' }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800/80 border border-stone-200/60 dark:border-stone-700/60 text-stone-700 dark:text-stone-300">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
      <span className="text-xs font-semibold tracking-tight">
        {score}% Trust Score
      </span>
    </div>
  );
};

export const EscrowBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-stone-200/60 dark:border-stone-700/60 shadow-sm">
      <CheckCircle2 className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100" />
      Paystack Escrow Protected
    </span>
  );
};
