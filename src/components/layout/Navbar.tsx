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
  Store,
  SlidersHorizontal,
  LogOut,
  Moon,
  Sun,
  PlusCircle,
  Package,
  Settings
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const activeSchoolObj = SCHOOLS.find(s => s.shortName === selectedSchool) || SCHOOLS[0];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-surface-darkCard/95 backdrop-blur-md border-b border-surface-border dark:border-surface-darkBorder">
      {/* Top Bar for Role Switching & Escrow Safety */}
      <div className="bg-brand-900 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-400" />
            <span className="hidden sm:inline">Paystack Escrow Protection: Funds held safe until campus pickup is confirmed.</span>
            <span className="sm:hidden font-bold">Escrow Protected Campus Market</span>
          </div>

          {/* Meaningful Role Switcher */}
          <div className="flex items-center gap-2 text-stone-300">
            <span className="hidden md:inline text-[11px] text-stone-400">Current Role:</span>
            <div className="flex items-center bg-black/30 p-0.5 rounded-md border border-white/10">
              <button 
                onClick={() => loginAs('BUYER')} 
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${user?.role === 'BUYER' ? 'bg-accent-500 text-white shadow-sm' : 'text-stone-300 hover:text-white'}`}
              >
                Buyer
              </button>
              <button 
                onClick={() => loginAs('SELLER')} 
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${user?.role === 'SELLER' ? 'bg-accent-500 text-white shadow-sm' : 'text-stone-300 hover:text-white'}`}
              >
                Seller
              </button>
              <button 
                onClick={() => loginAs('ADMIN')} 
                className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${user?.role === 'ADMIN' ? 'bg-rose-600 text-white shadow-sm' : 'text-stone-300 hover:text-white'}`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo & Campus Switcher */}
        <div className="flex items-center gap-3 sm:gap-5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-900 via-brand-800 to-accent-500 flex items-center justify-center text-white font-black text-lg shadow-subtle group-hover:scale-105 transition-transform">
              C
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-stone-900 dark:text-stone-100 flex items-center gap-1 leading-none">
                CampusHustle
              </span>
              <span className="text-[10px] font-bold text-accent-500 tracking-wider uppercase mt-0.5">
                {selectedSchool} Market
              </span>
            </div>
          </Link>

          {/* Campus Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSchoolMenuOpen(!isSchoolMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors border border-stone-200/80 dark:border-stone-700"
            >
              <Building2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              <span>{activeSchoolObj.shortName}</span>
              <ChevronDown className="w-3 h-3 text-stone-400" />
            </button>

            {isSchoolMenuOpen && (
              <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-card shadow-modal border border-stone-200 dark:border-stone-800 py-2 z-50">
                <div className="px-3 py-1 text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
                  Select University Campus
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

        {/* Dynamic Navigation Links based on active Role */}
        <div className="hidden lg:flex items-center gap-5 text-xs font-bold text-stone-700 dark:text-stone-300">
          {user?.role === 'SELLER' ? (
            <>
              <Link href="/seller/dashboard" className={`hover:text-brand-600 transition-colors flex items-center gap-1.5 ${pathname === '/seller/dashboard' ? 'text-brand-600 font-black' : ''}`}>
                <Store className="w-4 h-4 text-brand-600" /> Dashboard Overview
              </Link>
              <Link href="/seller/listings" className={`hover:text-brand-600 transition-colors flex items-center gap-1.5 ${pathname === '/seller/listings' ? 'text-brand-600 font-black' : ''}`}>
                <Package className="w-4 h-4 text-brand-600" /> My Store Items
              </Link>
              <Link href="/seller/orders" className={`hover:text-brand-600 transition-colors flex items-center gap-1.5 ${pathname === '/seller/orders' ? 'text-brand-600 font-black' : ''}`}>
                <ShoppingBag className="w-4 h-4 text-brand-600" /> Received Orders
              </Link>
              <Link href="/seller/listings/new" className="px-3 py-1.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-extrabold flex items-center gap-1 shadow-sm">
                <PlusCircle className="w-3.5 h-3.5" /> Post Item
              </Link>
            </>
          ) : user?.role === 'ADMIN' ? (
            <>
              <Link href="/admin/dashboard" className={`hover:text-rose-600 transition-colors flex items-center gap-1.5 ${pathname === '/admin/dashboard' ? 'text-rose-600 font-black' : ''}`}>
                <SlidersHorizontal className="w-4 h-4 text-rose-600" /> Moderation Overview
              </Link>
              <Link href="/admin/applications" className={`hover:text-rose-600 transition-colors flex items-center gap-1.5 ${pathname === '/admin/applications' ? 'text-rose-600 font-black' : ''}`}>
                <ShieldCheck className="w-4 h-4 text-rose-600" /> Vendor Approvals
              </Link>
              <Link href="/admin/listings" className={`hover:text-rose-600 transition-colors flex items-center gap-1.5 ${pathname === '/admin/listings' ? 'text-rose-600 font-black' : ''}`}>
                <Package className="w-4 h-4 text-rose-600" /> Moderate Listings
              </Link>
            </>
          ) : (
            <>
              <Link href="/search" className={`hover:text-brand-600 transition-colors ${pathname === '/search' ? 'text-brand-600 font-black' : ''}`}>
                Explore Campus Market
              </Link>
              <Link href="/how-it-works" className={`hover:text-brand-600 transition-colors ${pathname === '/how-it-works' ? 'text-brand-600 font-black' : ''}`}>
                How Escrow Works
              </Link>
              <Link href="/seller/onboarding" className="text-accent-600 hover:text-accent-700 font-extrabold flex items-center gap-1">
                <Store className="w-3.5 h-3.5" /> Sell on Campus
              </Link>
            </>
          )}
        </div>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xs relative">
          <input
            type="text"
            placeholder={`Search ${selectedSchool}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-button bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs placeholder:text-stone-400 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </form>

        {/* Header Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
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
              <Bell className="w-4.5 h-4.5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent-500"></span>
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
            <Heart className="w-4.5 h-4.5" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
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
            <MessageCircle className="w-4.5 h-4.5" />
          </Link>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4.5 h-4.5" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-brand-900 text-white text-[9px] font-bold flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {/* User Account Menu */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="text-xs font-bold text-stone-800 dark:text-stone-200 pr-1 hidden sm:inline">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-button bg-brand-900 text-white text-xs font-extrabold hover:bg-brand-800 transition-colors"
              >
                Sign In
              </Link>
            )}

            {isUserMenuOpen && user && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-stone-900 rounded-card shadow-modal border border-stone-200 dark:border-stone-800 py-2 z-50">
                <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
                  <div className="font-bold text-xs text-stone-900 dark:text-stone-100">{user.name}</div>
                  <div className="text-[11px] text-stone-400">{user.email}</div>
                  <div className="mt-1 flex items-center gap-1">
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

                <Link
                  href="/seller/dashboard"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2 font-semibold text-brand-600"
                >
                  <Store className="w-4 h-4 text-brand-600" /> Seller Dashboard
                </Link>

                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="px-4 py-2 text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 flex items-center gap-2 font-semibold text-rose-600"
                >
                  <SlidersHorizontal className="w-4 h-4 text-rose-600" /> Admin Dashboard
                </Link>

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
    </header>
  );
};
