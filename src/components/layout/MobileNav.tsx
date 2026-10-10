"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, MessageCircle, ShoppingBag, User, Store } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { user, conversations } = useApp();

  const unreadMessagesCount = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/search', icon: Compass },
    { 
      label: 'Chat', 
      href: '/chat', 
      icon: MessageCircle,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined
    },
    { label: 'Orders', href: '/orders', icon: ShoppingBag },
    { 
      label: user?.role === 'SELLER' ? 'Dashboard' : 'Profile', 
      href: user?.role === 'SELLER' ? '/seller/dashboard' : '/profile', 
      icon: user?.role === 'SELLER' ? Store : User 
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-200 dark:border-stone-800 shadow-nav px-2 py-1.5">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-lg relative transition-colors ${
                isActive 
                  ? 'text-brand-900 dark:text-brand-400 font-bold' 
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-accent-500 text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-accent-500 mt-0.5"></span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
