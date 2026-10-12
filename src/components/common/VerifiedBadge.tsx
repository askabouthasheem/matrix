import React from 'react';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

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
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-500/25 backdrop-blur-xs font-medium">
      <ShieldCheck className={`${iconSizes[size]} text-emerald-600 dark:text-emerald-400 shrink-0 stroke-[2.2]`} />
      {showText && (
        <span className={textSizes[size]}>
          Verified Student {schoolShortName ? <span className="opacity-70 font-mono font-normal">({schoolShortName})</span> : ''}
        </span>
      )}
    </span>
  );
};

export const TrustScoreRing: React.FC<{ score: number; size?: 'sm' | 'md' }> = ({ score, size = 'md' }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-stone-100/80 dark:bg-stone-800 border border-stone-200/50 dark:border-stone-700/50 text-stone-600 dark:text-stone-300 text-[11px] font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shrink-0" />
      <span className="tracking-tight tabular-nums">
        {score}% Trust Score
      </span>
    </div>
  );
};

export const EscrowBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100/90 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold border border-stone-200/70 dark:border-stone-700/70 shadow-xs">
      <Lock className="w-3.5 h-3.5 text-stone-900 dark:text-stone-100 shrink-0" />
      Paystack Escrow Protected
    </span>
  );
};
