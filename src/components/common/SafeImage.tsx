"use client";

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { ImageOff, Sparkles } from 'lucide-react';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  className?: string;
}

export const DEFAULT_FALLBACK = "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80";

export const SafeImage: React.FC<SafeImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc = DEFAULT_FALLBACK, 
  className = '', 
  fill,
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const imgSrc = error || !src ? fallbackSrc : src;

  return (
    <div className={`relative overflow-hidden bg-stone-100 dark:bg-stone-800 ${fill ? 'w-full h-full' : ''}`}>
      {loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 dark:from-stone-800 dark:via-stone-700 dark:to-stone-800 animate-pulse z-10" />
      )}

      {error && !fallbackSrc ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-800 text-stone-400 p-2 text-center">
          <ImageOff className="w-6 h-6 mb-1 text-stone-300" />
          <span className="text-[10px] font-semibold">Image unavailable</span>
        </div>
      ) : (
        <Image
          {...props}
          src={imgSrc}
          alt={alt || 'Campus item'}
          fill={fill}
          className={`${className} transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
          unoptimized={typeof imgSrc === 'string' && imgSrc.startsWith('http')}
        />
      )}
    </div>
  );
};
