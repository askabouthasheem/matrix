"use client";

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, CreditCard, Sparkles, MapPin, Truck } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Listing } from '@/lib/mockData';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  singleListing?: Listing;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, singleListing }) => {
  const { cart, cartTotal, createOrder, clearCart, selectedSchool, user } = useApp();

  const [fulfillmentType, setFulfillmentType] = useState<'PICKUP' | 'DELIVERY'>('PICKUP');
  const [deliveryLocation, setDeliveryLocation] = useState('Faculty of Engineering / Moremi Car Park');
  const [paymentProvider, setPaymentProvider] = useState<'Paystack' | 'Flutterwave'>('Paystack');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderNum, setCreatedOrderNum] = useState('');

  if (!isOpen) return null;

  const itemsToBuy = singleListing 
    ? [{ listing: singleListing, quantity: 1 }] 
    : cart;

  const totalAmount = singleListing 
    ? singleListing.price 
    : cartTotal;

  const handlePaystackEscrowPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      // Create orders for items
      const mainItem = itemsToBuy[0];
      const newOrder = createOrder({
        sellerName: mainItem.listing.brandName,
        brandName: mainItem.listing.brandName,
        listingTitle: mainItem.listing.title,
        listingImage: mainItem.listing.images[0],
        listingType: mainItem.listing.type,
        quantity: mainItem.quantity,
        amount: totalAmount,
        fulfillmentType,
        deliveryLocation,
        paymentProvider
      });

      setCreatedOrderNum(newOrder.orderNumber);
      setIsSuccess(true);
      if (!singleListing) clearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-card shadow-modal border border-stone-200 dark:border-stone-800 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-brand-900 text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-accent-400" />
            <div>
              <h3 className="font-bold text-sm sm:text-base">Paystack Escrow Checkout</h3>
              <p className="text-[11px] text-stone-300">Safe Payment Guarantee • {selectedSchool}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {isSuccess ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100">
              Payment Held in Escrow! 🎉
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
              Your payment of <strong className="text-stone-900 dark:text-stone-100">₦{totalAmount.toLocaleString()}</strong> has been securely authorized via Paystack Escrow. Order Reference: <span className="font-mono font-bold text-brand-600">{createdOrderNum}</span>.
            </p>
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 text-left">
              <strong>What happens next?</strong>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                <li>The seller has been notified to fulfill your order at <strong>{deliveryLocation}</strong>.</li>
                <li>Inspect your item upon meetup.</li>
                <li>Tap "Confirm Delivery" in your Orders tab to release funds to the seller.</li>
              </ul>
            </div>
            <button
              onClick={() => {
                onClose();
                window.location.href = '/orders';
              }}
              className="w-full py-3 rounded-button bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs sm:text-sm"
            >
              View Order Details & Status
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-5">
            {/* Order Items Summary */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Order Summary</span>
              <div className="divide-y divide-stone-100 dark:divide-stone-800 max-h-36 overflow-y-auto">
                {itemsToBuy.map(({ listing, quantity }) => (
                  <div key={listing.id} className="py-2 flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800 dark:text-stone-200 truncate max-w-[240px]">
                      {quantity}× {listing.title}
                    </span>
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      ₦{(listing.price * quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fulfillment Options */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Fulfillment Method</span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentType('PICKUP')}
                  className={`p-3 rounded-button border text-left flex items-center gap-2 transition-all ${fulfillmentType === 'PICKUP' ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/60 text-brand-900 dark:text-brand-300 font-semibold' : 'border-stone-200 dark:border-stone-700 text-stone-600'}`}
                >
                  <MapPin className="w-4 h-4 text-brand-600" />
                  <div>
                    <div className="text-xs">Campus Pickup</div>
                    <div className="text-[10px] text-stone-400">Meet at Faculty/Car park</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setFulfillmentType('DELIVERY')}
                  className={`p-3 rounded-button border text-left flex items-center gap-2 transition-all ${fulfillmentType === 'DELIVERY' ? 'border-brand-600 bg-brand-50/60 dark:bg-brand-950/60 text-brand-900 dark:text-brand-300 font-semibold' : 'border-stone-200 dark:border-stone-700 text-stone-600'}`}
                >
                  <Truck className="w-4 h-4 text-brand-600" />
                  <div>
                    <div className="text-xs">Hostel Delivery</div>
                    <div className="text-[10px] text-stone-400">Delivered to your hall</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Location Input */}
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                Pickup Spot / Hostel Room Details
              </label>
              <input
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder="e.g. Moremi Hall Room 104 or Faculty of Science Quadrangle"
                className="w-full px-3 py-2 rounded-input bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
              />
            </div>

            {/* Escrow Guarantee Box */}
            <div className="p-3.5 rounded-card bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-xs text-brand-900 dark:text-brand-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-accent-500" />
                How Escrow Protects You:
              </div>
              <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-300">
                When you click pay, Paystack holds your funds safely. The seller won't receive money until you inspect the item in person and confirm delivery on the app.
              </p>
            </div>

            {/* Payment Provider Selection */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentProvider('Paystack')}
                  className={`text-xs px-2.5 py-1 rounded-md border font-semibold ${paymentProvider === 'Paystack' ? 'bg-cyan-50 border-cyan-500 text-cyan-800' : 'border-stone-200'}`}
                >
                  Paystack
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentProvider('Flutterwave')}
                  className={`text-xs px-2.5 py-1 rounded-md border font-semibold ${paymentProvider === 'Flutterwave' ? 'bg-amber-50 border-amber-500 text-amber-800' : 'border-stone-200'}`}
                >
                  Flutterwave
                </button>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-stone-400 block">Total Payable</span>
                <span className="text-lg font-black text-stone-900 dark:text-stone-50">
                  ₦{totalAmount.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Pay Button */}
            <button
              onClick={handlePaystackEscrowPayment}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Connecting to {paymentProvider} Escrow Gateway...</span>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ₦{totalAmount.toLocaleString()} via Escrow</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
