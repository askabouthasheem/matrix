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
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-xs font-semibold',
    lg: 'text-sm font-bold'
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-badge bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
      <ShieldCheck className={`${iconSizes[size]} text-emerald-600 dark:text-emerald-400 shrink-0`} />
      {showText && (
        <span className={textSizes[size]}>
          Verified Student {schoolShortName ? `(${schoolShortName})` : ''}
        </span>
      )}
    </span>
  );
};

export const EscrowBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-badge bg-brand-50 text-brand-900 dark:bg-brand-950/80 dark:text-brand-200 border border-brand-200 dark:border-brand-800/60 text-xs font-medium">
      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
      Escrow Protected Payment
    </span>
  );
};
