"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Send, 
  Paperclip, 
  MessageCircle, 
  ShoppingBag, 
  ShieldCheck, 
  ChevronLeft, 
  CheckCheck,
  Zap,
  Lock
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { SafeImage } from '@/components/common/SafeImage';

function ChatContent() {
  const searchParams = useSearchParams();
  const listingIdParam = searchParams.get('listingId');
  const convIdParam = searchParams.get('id');

  const { conversations, sendMessage, user, listings } = useApp();

  const [activeConvId, setActiveConvId] = useState<string>(
    convIdParam || conversations[0]?.id || ''
  );
  const [inputText, setInputText] = useState('');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  const activeConv = conversations.find(c => c.id === activeConvId) || conversations[0];
  const targetListing = listings.find(l => l.title === activeConv?.listingTitle) || listings[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConvId) return;

    sendMessage(activeConvId, inputText.trim());
    setInputText('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-8rem)]">
      <div className="bg-white dark:bg-surface-darkCard rounded-card border border-stone-200 dark:border-stone-800 shadow-card h-full flex overflow-hidden">
        {/* Left Column: Conversations List */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-stone-200 dark:border-stone-800 flex flex-col ${activeConvId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <h2 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-brand-600" />
              <span>Campus Chats</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Direct & Encrypted
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-800">
            {conversations.map(conv => {
              const isSelected = conv.id === activeConvId;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full p-3.5 text-left flex items-start gap-3 transition-colors ${
                    isSelected
                      ? 'bg-brand-50/80 dark:bg-brand-950/60 border-l-4 border-brand-600'
                      : 'hover:bg-stone-50 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <img
                    src={conv.otherPartyAvatar}
                    alt={conv.otherPartyName}
                    className="w-10 h-10 rounded-full object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                        {conv.otherPartyName}
                      </h4>
                      <span className="text-[10px] text-stone-400">{conv.lastMessageTime}</span>
                    </div>
                    {conv.listingTitle && (
                      <span className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 block truncate mt-0.5">
                        📦 {conv.listingTitle}
                      </span>
                    )}
                    <p className="text-xs text-stone-500 truncate mt-1">
                      {conv.lastMessage}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Chat Window */}
        <div className={`flex-1 flex flex-col h-full bg-stone-50/50 dark:bg-stone-950/40 ${!activeConvId ? 'hidden md:flex' : 'flex'}`}>
          {activeConv ? (
            <>
              {/* Chat Thread Header */}
              <div className="p-3 sm:p-4 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveConvId('')}
                    className="md:hidden p-1 text-stone-400 hover:text-stone-600"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <img
                    src={activeConv.otherPartyAvatar}
                    alt={activeConv.otherPartyName}
                    className="w-9 h-9 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100">
                      {activeConv.otherPartyName}
                    </h3>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Verified Student Vendor
                    </span>
                  </div>
                </div>

                {/* Quick Buy CTA */}
                {activeConv.listingTitle && (
                  <button
                    onClick={() => setIsCheckoutModalOpen(true)}
                    className="px-3 py-1.5 rounded-button bg-accent-500 hover:bg-accent-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Buy Item (Escrow)</span>
                  </button>
                )}
              </div>

              {/* Listing Context Banner */}
              {activeConv.listingTitle && (
                <div className="p-3 bg-brand-50 dark:bg-brand-950/80 border-b border-brand-200 dark:border-brand-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    {activeConv.listingImage && (
                      <div className="relative w-8 h-8 rounded overflow-hidden shrink-0">
                        <SafeImage src={activeConv.listingImage} alt="item" fill className="object-cover" />
                      </div>
                    )}
                    <div>
                      <span className="font-bold text-brand-900 dark:text-brand-200 block truncate max-w-xs">
                        {activeConv.listingTitle}
                      </span>
                      {activeConv.listingPrice && (
                        <span className="text-[11px] font-semibold text-stone-600 dark:text-stone-300">
                          ₦{activeConv.listingPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link
                    href={`/listing/${targetListing.id}`}
                    className="text-[11px] font-bold text-brand-700 dark:text-brand-300 underline"
                  >
                    View Listing Details
                  </Link>
                </div>
              )}

              {/* Messages History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {activeConv.messages.map(msg => {
                  const isMe = msg.senderId === user?.id || msg.senderName === 'Chioma' || msg.senderId === 'buyer_me';
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md p-3 rounded-card text-xs leading-relaxed shadow-sm ${
                          isMe
                            ? 'bg-brand-900 text-white rounded-br-none'
                            : 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-stone-400 mt-1 px-1">
                        {msg.timestamp}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Bar */}
              <form onSubmit={handleSend} className="p-3 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 flex items-center gap-2">
                <button
                  type="button"
                  className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
                  title="Attach Photo"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder={`Message ${activeConv.otherPartyName.split(' ')[0]}...`}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-button bg-stone-100 dark:bg-stone-800 text-xs text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-brand-600/30"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 rounded-button bg-brand-900 hover:bg-brand-800 text-white disabled:opacity-40 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <MessageCircle className="w-12 h-12 text-stone-300 mb-2" />
              <h3 className="font-bold text-sm text-stone-700">Select a chat to view messages</h3>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal Trigger */}
      {targetListing && (
        <CheckoutModal
          isOpen={isCheckoutModalOpen}
          onClose={() => setIsCheckoutModalOpen(false)}
          singleListing={targetListing}
        />
      )}
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading campus chat...</div>}>
      <ChatContent />
    </Suspense>
  );
}
