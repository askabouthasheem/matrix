import React from 'react';
import { HelpCircle, ShieldCheck, Lock, RefreshCw, MessageCircle } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: "How does Paystack Escrow protection work on CampusHustle?",
      a: "When you pay for an item or service, your funds are securely deposited into a Paystack Escrow account. The seller is notified to deliver or fulfill your order. Only after you physically inspect the item and tap 'Confirm Receipt' in your Orders tab will the money be released to the seller's bank account."
    },
    {
      q: "How do I become a Verified Seller?",
      a: "Sign up with your university school email (.edu.ng) and submit your store details under 'Become a Verified Seller'. Uploading a photo of your student ID card speeds up approval. Once approved by admin, your storefront displays the green Verified Student Badge."
    },
    {
      q: "What if the item delivered is not as described?",
      a: "Do not confirm receipt! You can tap 'Report Issue to Support' in your Orders tab. Our campus dispute team will review the chat and order details, and if appropriate, issue a 100% full refund from Escrow back to your bank account."
    },
    {
      q: "Is there a fee for buying or selling?",
      a: "CampusHustle is 100% free for student buyers. Sellers pay a minimal 2.5% platform fee on completed escrow payouts to cover Paystack processing and fraud prevention."
    },
    {
      q: "Can I sell services like hair braiding, photo shoots, or coding tutoring?",
      a: "Yes! CampusHustle supports three distinct listing types: Products (tech, fashion, parfait), Services (hair styling, laundry, photography), and Trainings (UI/UX bootcamps, coding, trading workshops)."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center space-y-2">
        <HelpCircle className="w-10 h-10 text-brand-600 mx-auto" />
        <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-50">
          Frequently Asked Questions
        </h1>
        <p className="text-xs text-stone-500">
          Everything you need to know about campus buying, selling, and Escrow protection
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-6 rounded-card bg-white dark:bg-surface-darkCard border border-stone-200 dark:border-stone-800 shadow-subtle space-y-2">
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-700 text-xs font-bold flex items-center justify-center shrink-0">
                Q
              </span>
              {faq.q}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed pl-8">
              {faq.a}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
