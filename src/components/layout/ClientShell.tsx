"use client";

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { CartDrawer } from '../cart/CartDrawer';
import { CheckoutModal } from '../checkout/CheckoutModal';

export const ClientShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="flex-1 pb-16 md:pb-0">
        {children}
      </main>

      <Footer />
      <MobileNav />

      {/* Cart & Checkout Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
};
