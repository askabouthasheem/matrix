# CampusHustle 🎓 Nigeria's #1 Student Campus Marketplace

CampusHustle is a modern, production-ready campus-first marketplace tailored for Nigerian university and polytechnic students. Inspired by UniHustle.ng but built with Paystack Escrow protection, direct in-app chat, verified student badges (.edu.ng email verification), and same-campus discovery.

---

## 🌟 Key Differentiators

- **100% Escrow-Style Payment Protection (Paystack & Flutterwave):** Buyers' funds are locked safely in Escrow until they inspect and confirm item receipt on campus.
- **Strong Student Verification:** Verified Student badges issued after validating school email domain (`.edu.ng`) and student ID cards.
- **In-App Direct Chat:** Embedded chat threads with direct "Buy via Escrow" item context buttons.
- **Same-Campus / Pickup Today Discovery:** Instant filter for items ready for pickup today near hostels or faculty quadrangles.
- **Multi-Role Experience:** Seamless support for **Buyer**, **Seller / Vendor**, and **Admin** personas.

---

## 🏫 Supported Launch Universities

- **UNILAG** (University of Lagos, Akoka / Yaba)
- **LASU** (Lagos State University, Ojo)
- **UI** (University of Ibadan, Ibadan)
- **UNIOSUN** (Osun State University, Osogbo)
- **FOUNTAIN** (Fountain University, Osogbo)

---

## 🚀 Main Pages & Workflows

### Public & Marketing
1. **Landing / Home (`/`)**: Hero section, live campus stats, quick campus selector, category filter cards, "Pickup Today" banner, verified vendor grid, Escrow explainer.
2. **About (`/about`) & How It Works (`/how-it-works`)**: Vision for Nigerian campus trade.
3. **FAQ (`/faq`)**: Escrow safety, seller fees, dispute resolution.

### Auth & Onboarding
4. **Signup (`/signup`)**: Campus selection + school email verification.
5. **Login (`/login`)**: Account login + 1-click Demo Role Switcher (Buyer / Seller / Admin).
6. **Verify Email (`/verify`)**: OTP verification simulation.
7. **Forgot Password (`/forgot-password`)**: Password recovery workflow.
8. **Onboarding (`/onboarding`)**: Role selection modal.

### Discovery & Shopping
9. **Search & Browse (`/search`)**: Full-text search with category, campus, price range slider, pickup today filter, and sorting.
10. **Listing Detail (`/listing/[id]`)**: Product gallery, price breakdown, verified seller trust score (98%), response speed (`< 10 mins`), Paystack Escrow CTA button, WhatsApp catalog fallback, customer reviews.
11. **Storefront Profile (`/brand/[slug]`)**: Vendor store banner, trust score, sales counter, active listings grid.
12. **Chat (`/chat`)**: Responsive dual-pane messaging with item preview banner and quick Escrow checkout trigger.
13. **Cart Drawer & Checkout (`/checkout`)**: Paystack Escrow modal simulation with campus pickup location input.
14. **Orders & Escrow Release (`/orders`)**: Track orders, view payment reference, tap "Confirm Receipt & Release Funds to Seller".
15. **Wishlist (`/wishlist`)**: Saved products & services.

### Seller Dashboard
16. **Overview (`/seller/dashboard`)**: Sales revenue counter, active listings, order statistics.
17. **Create Listing (`/seller/listings/new`)**: Form to publish products, braid services, or bootcamps.
18. **Payout Settings (`/seller/payouts`)**: NUBAN bank account verification.
19. **Seller Application (`/seller/onboarding`)**: Submit store details + student ID upload.

### Admin Panel
20. **Admin Dashboard (`/admin/dashboard`)**: Seller approval queue, student ID inspection, listing moderation, escrow volume.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS + Custom Design System (Indigo / Coral palette)
- **Icons & Animation:** Lucide Icons + Framer Motion
- **Database Schema:** Prisma ORM with SQLite (easy switch to PostgreSQL)
- **State Management:** React AppContext with local persistence

---

## ⚡ Quick Start Guide

### 1. Installation
```bash
npm install
```

### 2. Database Setup & Prisma Generation
```bash
npx prisma generate
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing User Roles (Demo Mode)

The top navigation bar contains a **Role Switcher** bar to test all user perspectives instantly:
- Click **Buyer** to browse UNILAG deals and test Paystack Escrow checkout.
- Click **Seller Dashboard** to manage Tobi Tech Hub listings and payout bank details.
- Click **Admin** to review pending seller applications and moderate listings.

---

© 2026 CampusHustle. Built for Nigerian Campus Life.
