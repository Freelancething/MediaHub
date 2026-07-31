# Media Partner Hub

A full-stack escrow-based content marketing marketplace connecting **Advertisers**, **Publishers**, and **Influencers**.

---

## What Is This?

**Media Partner Hub** is a platform similar to [Adsy.com](https://adsy.com) that enables:

- 🛒 **Advertisers** to buy guest posts, link insertions, press releases, and influencer shoutouts
- 📰 **Publishers** (website owners) to monetize their sites by accepting paid content placements
- 📱 **Influencers** (social media creators) to monetize their channels through brand collaborations
- 🔒 **Escrow-based payments** ensuring money is only released after work is approved

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Auth | NextAuth.js v5 |
| Email | Resend |
| Deployment | Vercel |

---

## Project Structure

```
MediaHub/
├── mediatech/          ← Next.js application (work here)
│   ├── src/
│   │   ├── app/        ← App Router pages
│   │   ├── components/ ← Reusable UI components
│   │   ├── lib/        ← Utilities, DB client, auth config
│   │   └── types/      ← TypeScript type definitions
│   ├── prisma/         ← Database schema & migrations
│   └── public/         ← Static assets
└── README.md           ← This file
```

---

## User Roles

| Role | Description |
|---|---|
| **Advertiser** | Buys content placements across websites and social channels |
| **Publisher** | Lists websites for guest posts, link insertions, press releases |
| **Influencer** | Lists social channels (Instagram, YouTube, TikTok, X, etc.) for brand deals |
| **Admin** | Manages platform, approves listings, oversees escrow and disputes |

---

## Core Features

- ✅ Multi-role authentication (email + Google OAuth)
- ✅ Publisher website listings with DA, traffic, niche metrics
- ✅ Influencer channel listings with followers, engagement metrics
- ✅ Marketplace search with advanced filtering
- ✅ Full order/task workflow with 9 status stages
- ✅ Escrow wallet system (Balance / Reserved / Bonus)
- ✅ Wallet manual top-up & withdrawals (automated payments in Phase 2)
- ✅ In-task messaging
- ✅ Real-time notifications
- ✅ Admin control panel
- ✅ Project management (group tasks into campaigns)
- ✅ Referral program

---

## Task Status Flow

```
ADVERTISER: Draft → Task Review → Task's Acceptance → In Progress → Your Approval → Completed
PUBLISHER:  New   → Your Acceptance → In Progress → Approval → Completed
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or Supabase account)
- Resend account (for emails)

### Installation

```bash
# Navigate to the app
cd mediatech

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Sync database schema (Prisma 7)
npx prisma db push

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Environment Variables

```env
# Database
DATABASE_URL=
DIRECT_URL=

# NextAuth
AUTH_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Resend (Email)
RESEND_API_KEY=
```

---

## Content Types

### Website (Publisher)
- Article Posting
- Link Insertion  
- Press Release

### Social (Influencer)
- Instagram Story / Reel / Post
- YouTube Video
- TikTok Video
- LinkedIn Post
- X (Twitter) Post
- Facebook Post

---

## Development Timeline

Built in a focused **14-day sprint** covering:
- Week 1: Foundation, Auth, Marketplace, Order Flow
- Week 2: Payments, Admin, Messaging, Polish, Deployment

---

## License

Private — All rights reserved.