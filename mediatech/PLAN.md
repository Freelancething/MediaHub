# Media Partner Hub — 2-Week Build Plan (Next.js)

## Platform Overview

**Media Partner Hub** is an escrow-based content marketplace with **3 seller roles** and **1 buyer role**:

| Role | Description |
|---|---|
| **Advertiser** | Buys content placements (guest posts, link insertions, influencer shoutouts) |
| **Publisher** | Owns websites/blogs, lists them for content placements |
| **Influencer** | Owns social channels (Instagram, YouTube, TikTok, X, etc.), lists them for brand deals |
| **Admin** | Manages platform, approves listings, oversees escrow |

---

## Tech Stack

| Layer | Choice |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | PostgreSQL via Supabase |
| **ORM** | Prisma 7 |
| **Auth** | NextAuth.js v5 |
| **Payments** | PayPal + Credit Card (no crypto/bank wire) |
| **Storage** | Supabase Storage (proofs, avatars) |
| **Deployment** | Vercel |
| **Email** | Resend (transactional emails) |

---

## Project Structure

```
mediatech/
├── src/
│   ├── app/
│   │   ├── (auth)/                  # login, register, forgot-password, reset-password
│   │   ├── (advertiser)/            # advertiser dashboard
│   │   │   ├── dashboard/
│   │   │   ├── sites/               # search websites
│   │   │   ├── influencers/         # search influencers
│   │   │   ├── tasks/
│   │   │   ├── projects/
│   │   │   ├── partners/            # media partner list
│   │   │   └── wallet/
│   │   ├── (publisher)/             # publisher dashboard
│   │   │   ├── platforms/           # my websites
│   │   │   ├── demand/
│   │   │   ├── tasks/
│   │   │   └── referral/
│   │   ├── (influencer)/            # influencer dashboard
│   │   │   ├── channels/            # my social channels
│   │   │   ├── demand/
│   │   │   ├── tasks/
│   │   │   └── referral/
│   │   ├── (admin)/                 # admin panel
│   │   │   ├── dashboard/
│   │   │   ├── users/
│   │   │   ├── listings/
│   │   │   ├── tasks/
│   │   │   └── transactions/
│   │   └── api/                     # API routes
│   ├── components/
│   │   ├── ui/                      # base components (Button, Input, Badge, etc.)
│   │   ├── layout/                  # Sidebar, Header, Breadcrumb
│   │   ├── marketplace/             # ListingCard, FilterPanel, SearchBar
│   │   ├── tasks/                   # TaskCard, StatusTabs, TaskDetail
│   │   └── wallet/                  # BalanceCard, TransactionRow
│   ├── lib/
│   │   ├── db.ts                    # Prisma client
│   │   ├── auth.ts                  # NextAuth config
│   │   ├── stripe.ts                # Stripe helpers
│   │   └── utils.ts
│   ├── auth.config.ts               # Edge-safe auth config
│   └── proxy.ts                     # Next.js middleware (role-based routing)
└── prisma/
    └── schema.prisma
```

---

## Database Schema

```prisma
// Users
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String
  avatar        String?
  role          Role      // ADVERTISER | PUBLISHER | INFLUENCER | ADMIN
  balance       Float     @default(0)
  reserved      Float     @default(0)
  bonus         Float     @default(0)
  createdAt     DateTime  @default(now())
}

// Website listings (Publisher)
model Platform {
  id           String    @id @default(cuid())
  publisherId  String
  url          String
  da           Int       // Domain Authority
  traffic      Int       // Monthly traffic
  niche        String
  country      String
  language     String
  status       PlatformStatus  // PENDING | ACTIVE | PAUSED | REJECTED
  packages     Package[]
}

// Social channel listings (Influencer)
model Channel {
  id            String    @id @default(cuid())
  influencerId  String
  platform      SocialPlatform  // INSTAGRAM | YOUTUBE | TIKTOK | X | FACEBOOK | LINKEDIN
  handle        String
  followers     Int
  engagement    Float     // engagement rate %
  avgViews      Int?
  niche         String
  country       String
  status        PlatformStatus
  packages      ChannelPackage[]
}

// Packages per website listing
model Package {
  id           String    @id @default(cuid())
  platformId   String
  type         ProductType  // ARTICLE_POSTING | LINK_INSERTION | PRESS_RELEASE
  price        Float
  turnaround   Int       // days
  description  String?
}

// Packages per channel listing
model ChannelPackage {
  id           String    @id @default(cuid())
  channelId    String
  type         InfluencerProductType  // STORY | REEL | POST | VIDEO | MENTION | REVIEW
  price        Float
  turnaround   Int
  description  String?
}

// Orders / Tasks
model Task {
  id              String    @id @default(cuid())
  advertiserId    String
  sellerId        String    // publisher OR influencer
  sellerType      SellerType  // PUBLISHER | INFLUENCER
  platformId      String?   // if website task
  channelId       String?   // if influencer task
  packageId       String?
  projectId       String?
  status          TaskStatus
  brief           String
  anchorText      String?
  targetUrl       String?
  deliverableUrl  String?   // proof of work
  price           Float
  createdAt       DateTime  @default(now())
  messages        Message[]
}

// Projects (group tasks)
model Project {
  id           String    @id @default(cuid())
  advertiserId String
  name         String
  tasks        Task[]
  createdAt    DateTime  @default(now())
}

// Wallet transactions
model Transaction {
  id        String    @id @default(cuid())
  userId    String
  type      TxType    // TOPUP | PAYMENT | EARNING | WITHDRAWAL | BONUS | REFUND
  amount    Float
  note      String?
  ref       String?   // Stripe payment intent ID
  createdAt DateTime  @default(now())
}

// In-task messaging
model Message {
  id        String   @id @default(cuid())
  taskId    String
  senderId  String
  content   String
  createdAt DateTime @default(now())
}

// Notifications
model Notification {
  id        String   @id @default(cuid())
  userId    String
  type      String
  title     String
  body      String
  isRead    Boolean  @default(false)
  link      String?
  createdAt DateTime @default(now())
}
```

---

## Task Status Workflow

```
ADVERTISER VIEW:
  Draft → Task Review → Task's Acceptance → In Progress → Your Approval → Completed
                                                            ↓
                                                       Improvement → In Progress (loop)
                                                            ↓
                                                          Rejected

PUBLISHER / INFLUENCER VIEW:
  New Order → Your Acceptance → In Progress → Approval → Completed
     ↓                                           ↓
   Declined                                   Improvement → In Progress (loop)
```

---

## Influencer Page — Detailed Breakdown

### Influencer Marketplace Page (Advertiser)
- Toggle tabs: **Websites** | **Influencers** (at top of search page)
- Filter panel:
  - Social platform (Instagram, YouTube, TikTok, X, Facebook, LinkedIn)
  - Followers range (1k–10k, 10k–100k, 100k+)
  - Engagement rate (>1%, >3%, >5%)
  - Niche/category
  - Country
  - Price range
- Listing row: Channel handle, platform icon, followers, engagement %, niche, price, "Buy now" button

### Influencer Dashboard (Seller)
**Sidebar navigation:**
- My Channels (list/add/edit social channels)
- Demand (browse open requests from advertisers)
- Tasks (with same status tabs as Publisher)
- Referral Program

**My Channels page:**
- Add channel form: platform dropdown, handle, followers, engagement rate, niche, country, pricing per package type

**Package types for Influencer:**
- Story/Reel mention
- Dedicated Post
- YouTube Video
- Honest Review
- Brand Mention

---

## 14-Day Sprint Schedule

---

### 🗓️ Week 1 — Foundation + Core Features

#### Day 1 — Project Setup & Infrastructure ✅ DONE
- [x] Init Next.js 16 with Tailwind CSS v4, TypeScript
- [x] Setup Prisma schema + Prisma 7 config (prisma.config.ts)
- [x] Setup NextAuth.js v5 (Google + credentials)
- [x] Edge-safe auth split (auth.config.ts + lib/auth.ts)
- [x] Role-based proxy.ts (Next.js 16 middleware)
- [x] Shared layout: Sidebar, TopHeader components
- [x] Design system: globals.css with all tokens + component classes
- [x] Root layout with next/font (zero layout shift)
- [x] Login page UI + LoginForm component
- [x] Register page UI + RegisterForm component (2-step)
- [x] API routes: /api/auth/[...nextauth] + /api/auth/register
- [x] .env.example + CONTRIBUTING.md + README.md
- [x] next.config.ts (optimized: image, compression, tree-shaking)
- [x] lib/db.ts (Prisma 7 adapter-pg)
- [x] lib/utils.ts (cn, formatCurrency, formatNumber, formatDate)

#### Day 2 — Auth & Onboarding
- [ ] Forgot password page (email input, send reset link)
- [ ] Reset password page (new password form)
- [ ] Email verification flow (optional)
- [ ] Protected route groups fully working
- [ ] Post-register redirect by role

#### Day 3 — Publisher: My Platforms
- [ ] "My Platforms" list page + empty state
- [ ] Add/edit platform form (URL, DA, traffic, niche, country, language)
- [ ] Package builder per platform (Article Posting, Link Insertion, Press Release + pricing)
- [ ] Platform status badge (Pending Review, Active, Paused)
- [ ] Platform metrics display card

#### Day 4 — Influencer: My Channels
- [ ] "My Channels" list page + empty state
- [ ] Add/edit channel form (platform type, handle, followers, engagement, niche, country)
- [ ] Channel package builder (Story, Post, Reel, Video, Review + pricing)
- [ ] Platform icons (Instagram, YouTube, TikTok, X, etc.)
- [ ] Channel status badge system
- [ ] Influencer sidebar layout (My Channels, Demand, Tasks, Referral)

#### Day 5 — Advertiser: Website Marketplace
- [ ] "Search for sites" page — paginated table layout
- [ ] Listing row: URL, DA, traffic, niche, country flag, price, "Buy now"
- [ ] Filter sidebar: product type, niche, DA range, traffic range, country, price
- [ ] "New sites" section with green "new" badge
- [ ] Sort options: Price, DA, Traffic, Date added
- [ ] Pagination / infinite scroll

#### Day 6 — Advertiser: Influencer Marketplace
- [ ] "Search for influencers" page — same layout but influencer data
- [ ] Toggle between Websites/Influencers at top
- [ ] Listing row: handle, platform icon, followers, engagement %, niche, country, price
- [ ] Filter sidebar: social platform, follower range, engagement %, niche, country, price
- [ ] Sort options: Followers, Engagement, Price, Date added
- [ ] "Buy now" → briefing form for influencer deliverable

#### Day 7 — Task/Order Placement Flow ✅ DONE
- [x] "Buy now" → order briefing modal/page (target URL, anchor text, brief, deadline)
- [x] Task creation server action → escrow hold (balance → reserved)
- [x] Task transitions: Draft → Task Review on submit

---

### 🗓️ Week 2 — Full Workflow, Payments & Polish

- [ ] Seller wallet: Earnings / Reserved / Withdrawn
- [ ] Withdrawal request form (amount, method: PayPal / bank)
- [ ] Admin withdrawal approval queue
- [ ] Earnings history with task reference links

#### Day 11 — Notifications + In-Task Messaging
- [ ] Notification bell with unread badge count
- [ ] Notification dropdown with mark-as-read
- [ ] "View all notifications" page
- [ ] In-task chat thread (message input + message list)
- [ ] Real-time via Supabase subscriptions or 5s polling fallback
- [ ] Email notifications via Resend (task accepted, approval needed, withdrawal processed)

#### Day 12 — Admin Panel
- [ ] Admin dashboard: stats (total users, revenue, active tasks, pending approvals)
- [ ] User management table (search, filter by role, suspend/activate)
- [ ] Platform approval queue (approve/reject publisher sites)
- [ ] Channel approval queue (approve/reject influencer channels)
- [ ] Task oversight (all tasks, force-complete, force-refund)
- [ ] Transaction log (all financial activity)

#### Day 13 — Additional Pages + Polish
- [ ] My Projects CRUD (advertiser)
- [ ] Media Partner List (saved publishers/influencers)
- [ ] Content Purchase page
- [ ] Referral Program page (publisher + influencer)
- [ ] Dismissable promo banners (localStorage state)
- [ ] Loading skeletons for all tables
- [ ] Toast notifications (success, error, info)
- [ ] Mobile responsive + sidebar collapse toggle

#### Day 14 — Testing & Deployment
- [ ] Full end-to-end test: Advertiser places order → Publisher accepts → delivers → Approved → Funds released
- [ ] Full influencer flow test
- [ ] Stripe webhook test (top-up, payout)
- [ ] Auth edge cases (wrong role redirect, expired session)
- [ ] Lighthouse performance audit (target >85)
- [ ] Seed demo data (5 publishers, 5 influencers, 3 advertisers, sample tasks)
- [ ] Production deploy on Vercel
- [ ] Custom domain setup

---

## Page Count Summary

| Section | Pages |
|---|---|
| Auth | 3 (Login, Register, Forgot Password) |
| Advertiser | 7 (Dashboard, Sites, Influencers, Tasks, Projects, Partners, Wallet) |
| Publisher | 5 (Platforms, Demand, Tasks, Referral, Wallet) |
| Influencer | 5 (Channels, Demand, Tasks, Referral, Wallet) |
| Admin | 5 (Dashboard, Users, Listings, Tasks, Transactions) |
| Shared | 3 (Notifications, Profile, FAQ) |
| **Total** | **~28 pages** |

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| Stripe escrow complexity | Use Stripe Payment Intents with manual capture |
| Real-time messaging | Fallback to 5s polling if Supabase Realtime causes issues |
| Role auth bugs | Middleware-level role checks + API-level checks (double guard) |
| Time overrun | Content Purchase + Referral tracking are Day 13 (can defer to Phase 2) |
