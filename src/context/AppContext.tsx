"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  LISTINGS as initialListings, 
  BRANDS as initialBrands, 
  ORDERS as initialOrders,
  CONVERSATIONS as initialConversations,
  SELLER_APPLICATIONS as initialApplications,
  SCHOOLS,
  Listing,
  Brand,
  Order,
  Conversation,
  Message,
  SellerApplication
} from '@/lib/mockData';

export type UserRole = 'GUEST' | 'BUYER' | 'SELLER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  schoolShortName: string;
  isVerified: boolean;
  avatar: string;
  brandId?: string;
  brandName?: string;
}

interface CartItem {
  listing: Listing;
  quantity: number;
}

interface AppContextType {
  // User & Auth
  user: User | null;
  setUser: (user: User | null) => void;
  loginAs: (role: UserRole) => void;
  logout: () => void;

  // Selected School
  selectedSchool: string;
  setSelectedSchool: (schoolShortName: string) => void;

  // Listings
  listings: Listing[];
  addListing: (listing: Listing) => void;
  updateListing: (id: string, updated: Partial<Listing>) => void;
  deleteListing: (id: string) => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (listingId: string) => void;

  // Cart & Checkout
  cart: CartItem[];
  addToCart: (listing: Listing, qty?: number) => void;
  removeFromCart: (listingId: string) => void;
  clearCart: () => void;
  cartTotal: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: Partial<Order>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], escrowStatus?: Order['escrowStatus']) => void;

  // Chat Conversations
  conversations: Conversation[];
  sendMessage: (conversationId: string, text: string) => void;
  startConversation: (listing: Listing) => string;

  // Seller Applications
  applications: SellerApplication[];
  submitApplication: (appData: Omit<SellerApplication, 'id' | 'status' | 'submittedAt'>) => void;
  reviewApplication: (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => void;

  // Notifications
  notifications: { id: string; title: string; message: string; isRead: boolean; createdAt: string; link?: string }[];
  unreadNotificationCount: number;
  markNotificationsRead: () => void;

  // Theme
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default user is logged-in UNILAG student buyer for seamless immediate interaction
  const [user, setUser] = useState<User | null>({
    id: "usr_buyer_1",
    name: "Chioma Nwosu",
    email: "chioma.n@unilag.edu.ng",
    role: "BUYER",
    schoolShortName: "UNILAG",
    isVerified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  });

  const [selectedSchool, setSelectedSchool] = useState<string>("UNILAG");
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [wishlist, setWishlist] = useState<string[]>(["list_1", "list_2"]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [applications, setApplications] = useState<SellerApplication[]>(initialApplications);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [notifications, setNotifications] = useState([
    {
      id: "notif_1",
      title: "Order Confirmed! 📦",
      message: "Order #CH-2026-8891 for Anker Power Bank is held safely in Escrow until pickup.",
      isRead: false,
      createdAt: "10 mins ago",
      link: "/orders"
    },
    {
      id: "notif_2",
      title: "New Message from Tobi Tech",
      message: "Hi! Yes, I have 3 units left in stock...",
      isRead: false,
      createdAt: "25 mins ago",
      link: "/chat?id=conv_1"
    }
  ]);

  const loginAs = (role: UserRole) => {
    if (role === 'BUYER') {
      setUser({
        id: "usr_buyer_1",
        name: "Chioma Nwosu",
        email: "chioma.n@unilag.edu.ng",
        role: "BUYER",
        schoolShortName: "UNILAG",
        isVerified: true,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
      });
    } else if (role === 'SELLER') {
      setUser({
        id: "usr_seller_1",
        name: "Tobi Adebayo",
        email: "tobi.adebayo@unilag.edu.ng",
        role: "SELLER",
        schoolShortName: "UNILAG",
        isVerified: true,
        avatar: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=150&auto=format&fit=crop&q=80",
        brandId: "brand_tobi_tech",
        brandName: "Tobi Tech Hub"
      });
    } else if (role === 'ADMIN') {
      setUser({
        id: "usr_admin_1",
        name: "CampusHustle Admin",
        email: "admin@campushustle.edu.ng",
        role: "ADMIN",
        schoolShortName: "ALL",
        isVerified: true,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
      });
    } else {
      setUser(null);
    }
  };

  const logout = () => setUser(null);

  // Listings CRUD
  const addListing = (newListing: Listing) => {
    setListings(prev => [newListing, ...prev]);
  };

  const updateListing = (id: string, updated: Partial<Listing>) => {
    setListings(prev => prev.map(l => l.id === id ? { ...l, ...updated } : l));
  };

  const deleteListing = (id: string) => {
    setListings(prev => prev.filter(l => l.id !== id));
  };

  // Wishlist
  const toggleWishlist = (id: string) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Cart
  const addToCart = (listing: Listing, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.listing.id === listing.id);
      if (existing) {
        return prev.map(item => 
          item.listing.id === listing.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { listing, quantity: qty }];
    });
  };

  const removeFromCart = (listingId: string) => {
    setCart(prev => prev.filter(item => item.listing.id !== listingId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.listing.price * item.quantity), 0);

  // Orders
  const createOrder = (orderData: Partial<Order>): Order => {
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `CH-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerName: user?.name || "Verified Student",
      buyerEmail: user?.email || "student@unilag.edu.ng",
      buyerSchool: user?.schoolShortName || "UNILAG",
      sellerName: orderData.sellerName || "Campus Vendor",
      brandName: orderData.brandName || "Campus Store",
      listingTitle: orderData.listingTitle || "Product Item",
      listingImage: orderData.listingImage || "https://images.unsplash.com/photo-1609592424074-12ee49ef7ee2?w=400",
      listingType: orderData.listingType || "PRODUCT",
      quantity: orderData.quantity || 1,
      amount: orderData.amount || 0,
      escrowStatus: "HELD_IN_ESCROW",
      fulfillmentType: orderData.fulfillmentType || "PICKUP",
      deliveryLocation: orderData.deliveryLocation || "Faculty/Hostel Pickup",
      status: "PENDING",
      paymentRef: `PAYSTACK_${Date.now()}`,
      paymentProvider: "Paystack",
      createdAt: new Date().toISOString(),
      ...orderData
    };

    setOrders(prev => [newOrder, ...prev]);

    // Add notification
    setNotifications(prev => [
      {
        id: `notif_${Date.now()}`,
        title: "Order Placed Successfully! 🛡️",
        message: `Your payment of ₦${newOrder.amount.toLocaleString()} for "${newOrder.listingTitle}" is locked safely in Escrow.`,
        isRead: false,
        createdAt: "Just now",
        link: "/orders"
      },
      ...prev
    ]);

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], escrowStatus?: Order['escrowStatus']) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          status,
          ...(escrowStatus ? { escrowStatus } : {})
        };
      }
      return ord;
    }));
  };

  // Chat
  const sendMessage = (conversationId: string, text: string) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMsg: Message = {
          id: `msg_${Date.now()}`,
          senderId: user?.id || "user_current",
          senderName: user?.name || "Me",
          text,
          timestamp: "Just now",
          isRead: true
        };
        return {
          ...conv,
          lastMessage: text,
          lastMessageTime: "Just now",
          messages: [...conv.messages, newMsg]
        };
      }
      return conv;
    }));
  };

  const startConversation = (listing: Listing): string => {
    const existing = conversations.find(c => c.listingTitle === listing.title);
    if (existing) return existing.id;

    const newId = `conv_${Date.now()}`;
    const newConv: Conversation = {
      id: newId,
      otherPartyName: `${listing.brandName} (${listing.schoolShortName})`,
      otherPartyAvatar: listing.brandLogo,
      otherPartyRole: "SELLER",
      brandName: listing.brandName,
      listingTitle: listing.title,
      listingPrice: listing.price,
      listingImage: listing.images[0],
      lastMessage: `Hi ${listing.brandName}, I'm interested in "${listing.title}". Is it available today?`,
      lastMessageTime: "Just now",
      unreadCount: 0,
      messages: [
        {
          id: `msg_${Date.now()}`,
          senderId: user?.id || "user_current",
          senderName: user?.name || "Me",
          text: `Hi ${listing.brandName}, I'm interested in "${listing.title}". Is it available today?`,
          timestamp: "Just now",
          isRead: true
        }
      ]
    };

    setConversations(prev => [newConv, ...prev]);
    return newId;
  };

  // Applications
  const submitApplication = (appData: Omit<SellerApplication, 'id' | 'status' | 'submittedAt'>) => {
    const newApp: SellerApplication = {
      id: `app_${Date.now()}`,
      ...appData,
      status: 'PENDING',
      submittedAt: new Date().toISOString()
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const reviewApplication = (id: string, status: 'APPROVED' | 'REJECTED', reason?: string) => {
    setApplications(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };

  const markNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      loginAs,
      logout,
      selectedSchool,
      setSelectedSchool,
      listings,
      addListing,
      updateListing,
      deleteListing,
      wishlist,
      toggleWishlist,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      cartTotal,
      orders,
      createOrder,
      updateOrderStatus,
      conversations,
      sendMessage,
      startConversation,
      applications,
      submitApplication,
      reviewApplication,
      notifications,
      unreadNotificationCount,
      markNotificationsRead,
      isDarkMode,
      toggleDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
