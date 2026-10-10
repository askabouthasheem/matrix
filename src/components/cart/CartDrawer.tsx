"use client";

import React from 'react';
import { X, Trash2, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { SafeImage } from '@/components/common/SafeImage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onProceedToCheckout }) => {
  const { cart, removeFromCart, cartTotal } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-stone-900 h-full shadow-modal flex flex-col justify-between">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <h2 className="font-extrabold text-base text-stone-900 dark:text-stone-100">Your Shopping Cart</h2>
            <span className="text-xs bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-400 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-stone-800 dark:text-stone-200 text-sm mb-1">Your cart is empty</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Explore campus listings to find powerbanks, sneakers, braid sessions, and hostel essentials!
              </p>
            </div>
          ) : (
            cart.map(({ listing, quantity }) => (
              <div
                key={listing.id}
                className="flex items-center gap-3 p-3 rounded-card bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-stone-200">
                  <SafeImage
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400 block uppercase">
                    {listing.brandName} • {listing.schoolShortName}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                    {listing.title}
                  </h4>
                  <div className="text-xs font-black text-stone-900 dark:text-stone-200 mt-1">
                    ₦{listing.price.toLocaleString()} × {quantity}
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(listing.id)}
                  className="p-1.5 text-stone-400 hover:text-rose-500 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/60 space-y-4">
            <div className="flex items-center justify-between text-xs text-stone-500">
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold">
                <ShieldCheck className="w-4 h-4" /> Paystack Escrow Protection
              </span>
              <span>Subtotal</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-stone-800 dark:text-stone-200">Total Amount</span>
              <span className="text-xl font-black text-stone-900 dark:text-stone-50">
                ₦{cartTotal.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 px-4 rounded-button bg-brand-900 hover:bg-brand-800 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-subtle transition-colors"
            >
              <span>Proceed to Escrow Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
