"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  Bell, 
  MessageCircle, 
  Building2, 
  User as UserIcon, 
  ChevronDown, 
  Store,
  SlidersHorizontal,
  LogOut,
  Moon,
  Sun,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SCHOOLS } from '@/lib/mockData';

export const Navbar: React.FC<{ onOpenCart?: () => void }> = ({ onOpenCart }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { 
    user, 
    loginAs, 
    logout, 
    selectedSchool, 
    setSelectedSchool, 
    wishlist, 
    cart, 
    notifications, 
    unreadNotificationCount,
    markNotificationsRead,
    isDarkMode,
    toggleDarkMode
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [isSchoolMenuOpen, setIsSchoolMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const activeSchoolObj = SCHOOLS.find(s => s.shortName === selectedSchool) || SCHOOLS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-200/60 dark:border-stone-800">
      {/* Quiet, Minimal Top Announcement */}
      <div className="bg-stone-100/80 dark:bg-stone-950 text-stone-600 dark:text-stone-300 text-xs py-1.5 px-4 border-b border-stone-200/40 dark:border-stone-800/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] sm:text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Escrow payment protection active for all <strong>{selectedSchool}</strong> student orders</span>
          </div>

          {/* Discreet Role Selector */}
          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-stone-400 hidden sm:inline">Role:</span>
            <div className="inline-flex rounded-lg bg-stone-200/60 dark:bg-stone-800/60 p-0.5">
              <button
                onClick={() => loginAs('BUYER')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  user?.role === 'BUYER' 
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm' 
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Buyer
              </button>
              <button
                onClick={() => loginAs('SELLER')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  user?.role === 'SELLER' 
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm' 
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Seller
              </button>
              <button
                onClick={() => loginAs('ADMIN')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                  user?.role === 'ADMIN' 
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm' 
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Campus */}
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center font-bold text-sm tracking-tight">
              C
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight text-stone-900 dark:text-stone-100">
              CampusHustle
            </span>
          </Link>

          {/* Campus Selector */}
          <div className="relative">
            <button
              onClick={() => setIsSchoolMenuOpen(!isSchoolMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium hover:bg-stone-200/70 transition-colors"
            >
              <span>{activeSchoolObj.shortName}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isSchoolMenuOpen && (
              <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-stone-900 rounded-xl shadow-lg border border-stone-200 dark:border-stone-800 py-1.5 z-50 animate-in fade-in duration-100">
                <div className="px-3 py-1 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                  Campus
                </div>
                {SCHOOLS.map(sch => (
                  <button
                    key={sch.id}
                    onClick={() => {
                      setSelectedSchool(sch.shortName);
                      setIsSchoolMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors ${
                      selectedSchool === sch.shortName ? 'font-semibold text-brand-900 dark:text-stone-100 bg-stone-50' : 'text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    <span>{sch.name} ({sch.shortName})</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Clean Center Search */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm relative">
          <input
            type="text"
            placeholder="Search products or services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-full bg-stone-100/80 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder:text-stone-400 border border-transparent focus:border-stone-300 dark:focus:border-stone-700 focus:bg-white focus:outline-none transition-all"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </form>

        {/* Role Navigation & Actions */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Role specific quick link */}
          {user?.role === 'SELLER' && (
            <Link
              href="/seller/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-brand-900 dark:text-brand-300 bg-brand-50 dark:bg-stone-800 hover:bg-brand-100 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Seller Dashboard</span>
            </Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link
              href="/admin/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
          )}

          {/* Chat */}
          <Link
            href="/chat"
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded-full"
            aria-label="Messages"
          >
            <MessageCircle className="w-4 h-4" />
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded-full relative"
            aria-label="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
            )}
          </Link>

          {/* Cart */}
          <button
            onClick={onOpenCart}
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors rounded-full relative"
            aria-label="Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-brand-900 dark:bg-accent-500" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative pl-1">
            {user ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-full bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                Sign In
              </Link>
            )}

            {isUserMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-stone-900 rounded-xl shadow-lg border border-stone-200 dark:border-stone-800 py-1.5 z-50 animate-in fade-in duration-100">
                <div className="px-3 py-2 border-b border-stone-100 dark:border-stone-800">
                  <div className="font-semibold text-xs text-stone-900 dark:text-stone-100">{user.name}</div>
                  <div className="text-[11px] text-stone-400 truncate">{user.email}</div>
                </div>

                <Link
                  href="/orders"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-stone-400" /> My Orders
                </Link>

                <Link
                  href="/seller/dashboard"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2"
                >
                  <Store className="w-3.5 h-3.5 text-stone-400" /> Seller Dashboard
                </Link>

                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" /> Admin Dashboard
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-3 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2"
                >
                  <UserIcon className="w-3.5 h-3.5 text-stone-400" /> Account Settings
                </Link>

                <div className="border-t border-stone-100 dark:border-stone-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
