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
  Sparkles, 
  ShieldCheck, 
  ChevronDown, 
  Menu, 
  X,
  Store,
  SlidersHorizontal,
  LogOut,
  Moon,
  Sun
} from 'lucide-react';
import { useApp, UserRole } from '@/context/AppContext';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const activeSchoolObj = SCHOOLS.find(s => s.shortName === selectedSchool) || SCHOOLS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-surface-darkCard/95 backdrop-blur-md border-b border-surface-border dark:border-surface-darkBorder">
      {/* Top Banner for Campus Safety */}
      <div className="bg-brand-900 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-400" />
            <span>Campus-First Escrow Protection: Funds held safe with Paystack until pickup is confirmed.</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-stone-300">
            <span>Role Switcher (Demo):</span>
            <button 
              onClick={() => loginAs('BUYER')} 
              className={`px-2 py-0.5 rounded ${user?.role === 'BUYER' ? 'bg-accent-500 text-white font-bold' : 'hover:text-white'}`}
            >
              Buyer
            </button>
            <button 
              onClick={() => loginAs('SELLER')} 
              className={`px-2 py-0.5 rounded ${user?.role === 'SELLER' ? 'bg-accent-500 text-white font-bold' : 'hover:text-white'}`}
            >
              Seller Dashboard
            </button>
            <button 
              onClick={() => loginAs('ADMIN')} 
              className={`px-2 py-0.5 rounded ${user?.role === 'ADMIN' ? 'bg-accent-500 text-white font-bold' : 'hover:text-white'}`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Campus Selector */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-900 via-brand-700 to-accent-500 flex items-center justify-center text-white font-black text-lg shadow-md group-hover:scale-105 transition-transform">
              C
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-brand-900 dark:text-stone-100 flex items-center gap-1">
                CampusHustle
                <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
              </span>
              <span className="text-[10px] font-semibold text-stone-500 dark:text-stone-400 tracking-wider uppercase">
                {selectedSchool} Market
              </span>
            </div>
          </Link>

          {/* School Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSchoolMenuOpen(!isSchoolMenuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors border border-stone-200 dark:border-stone-700"
            >
              <Building2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>{activeSchoolObj.shortName}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isSchoolMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-card shadow-modal border border-stone-200 dark:border-stone-800 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1.5 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Select Your Campus
                </div>
                {SCHOOLS.map(sch => (
                  <button
                    key={sch.id}
                    onClick={() => {
                      setSelectedSchool(sch.shortName);
                      setIsSchoolMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors ${selectedSchool === sch.shortName ? 'bg-brand-50 dark:bg-brand-950/60 font-bold text-brand-900 dark:text-brand-300' : 'text-stone-700 dark:text-stone-300'}`}
                  >
                    <span>{sch.name} ({sch.shortName})</span>
                    <span className="text-[10px] text-stone-400">{sch.activeSellersCount} sellers</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            placeholder={`Search ${selectedSchool} products, braids, laptops...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs placeholder:text-stone-400 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/30 focus:border-brand-600 transition-all"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </form>

        {/* Navigation Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                markNotificationsRead();
              }}
              className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-accent-500 ring-2 ring-white dark:ring-stone-900 animate-ping"></span>
              )}
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-accent-500"></span>
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-stone-900 rounded-card shadow-modal border border-stone-200 dark:border-stone-800 py-3 z-50">
                <div className="px-4 pb-2 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="font-bold text-xs text-stone-900 dark:text-stone-100">Notifications</span>
                  <span className="text-[10px] text-brand-600 font-semibold">Campus Alert</span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
                  {notifications.map(n => (
                    <Link 
                      key={n.id} 
                      href={n.link || '#'}
                      onClick={() => setIsNotifOpen(false)}
                      className="p-3 block hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      <div className="text-xs font-semibold text-stone-900 dark:text-stone-100">{n.title}</div>
                      <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">{n.message}</div>
                      <div className="text-[9px] text-stone-400 mt-1">{n.createdAt}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Chat Link */}
          <Link
            href="/chat"
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Chat messages"
          >
            <MessageCircle className="w-5 h-5" />
          </Link>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cart.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full bg-brand-900 text-white text-[10px] font-bold flex items-center justify-center px-1">
                {cart.length}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="hidden sm:flex p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* User Profile / Dashboard Menu */}
          <div className="relative hidden sm:block">
            {user ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-semibold text-stone-800 dark:text-stone-200 pr-1">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-button bg-brand-900 text-white text-xs font-bold hover:bg-brand-800 transition-colors"
              >
                Sign In
              </Link>
            )}

            {isUserMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-card shadow-modal border border-stone-200 dark:border-stone-800 py-2 z-50">
                <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">{user.name}</div>
                  <div className="text-[11px] text-stone-400">{user.email}</div>
                  <div className="mt-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-50 text-brand-800 dark:bg-brand-950 dark:text-brand-300">
                      Role: {user.role}
                    </span>
                  </div>
                </div>

                <Link
                  href="/orders"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-stone-400" /> My Orders & Bookings
                </Link>

                {user.role === 'SELLER' && (
                  <Link
                    href="/seller/dashboard"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2 font-semibold text-brand-600"
                  >
                    <Store className="w-4 h-4 text-brand-600" /> Seller Dashboard
                  </Link>
                )}

                {user.role === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2 font-semibold text-rose-600"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-rose-600" /> Admin Dashboard
                  </Link>
                )}

                <Link
                  href="/profile"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2"
                >
                  <UserIcon className="w-4 h-4 text-stone-400" /> Account Settings
                </Link>

                <div className="border-t border-stone-100 dark:border-stone-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar Row */}
      <div className="px-4 pb-2.5 md:hidden">
        <form onSubmit={handleSearch} className="relative w-full">
          <input
            type="text"
            placeholder={`Search ${selectedSchool} products & services...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs placeholder:text-stone-400 border border-stone-200 dark:border-stone-700 focus:outline-none"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </form>
      </div>
    </header>
  );
};
