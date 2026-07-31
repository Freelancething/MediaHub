# Developer Setup Guide — Media Partner Hub

> Read this fully before touching any code. It covers setup instructions, architecture decisions, design rules, and the full 14-day build plan.

---

## What Are We Building?

**Media Partner Hub** is an escrow-based content marketing marketplace:

- 🛒 **Advertisers** buy guest posts, link insertions, press releases, and influencer shoutouts
- 📰 **Publishers** (website owners) earn by accepting paid content placements
- 📱 **Influencers** (social creators) earn through brand deals on their channels
- 🔒 **Escrow** holds money safely — released only after advertiser approves the work
- 🔧 **Admin** manages users, approves listings, oversees all transactions

Reference/inspiration: [Adsy.com](https://adsy.com)

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Database | PostgreSQL | 15+ |
| ORM | Prisma | 7.x |
| Auth | NextAuth.js | v5 (beta) |
| Email | Resend | latest |
| Deployment | Vercel | — |

---

## Prerequisites

- [ ] **Node.js** 18.17+ → [nodejs.org](https://nodejs.org)
- [ ] **npm** 9+
- [ ] **PostgreSQL** database — local or [Supabase](https://supabase.com) (free)
- [ ] **Git** installed
- [ ] VS Code (recommended)

---

## Quick Start

### 1. Go into the app folder

```bash
cd mediatech
```

> ⚠️ All commands run from inside `mediatech/` — NOT the root `MediaHub/` folder.

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# Required for local dev
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/mediahub?schema=public"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXTAUTH_URL="http://localhost:3000"

# Optional for local dev (leave empty to skip)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
RESEND_API_KEY=""
FROM_EMAIL="noreply@mediapartnerhub.com"

NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Media Partner Hub"
```

### 4. Push schema to database

```bash
npx prisma db push
npx prisma generate
```

### 5. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
mediatech/
├── prisma/
│   └── schema.prisma              ← All DB models, enums, indexes
├── prisma.config.ts               ← Prisma 7 DB connection config
├── src/
│   ├── app/
│   │   ├── (auth)/                ← Login, Register, Forgot Password
│   │   ├── (advertiser)/          ← Advertiser dashboard pages
│   │   ├── (publisher)/           ← Publisher dashboard pages
│   │   ├── (influencer)/          ← Influencer dashboard pages
│   │   ├── (admin)/               ← Admin panel pages
│   │   ├── api/
│   │   │   └── auth/
│   │   │       ├── [...nextauth]/ ← NextAuth handler
│   │   │       └── register/      ← User registration endpoint
│   │   ├── globals.css            ← ALL styles / design system
│   │   └── layout.tsx             ← Root layout (fonts, metadata)
│   ├── auth.config.ts             ← Edge-safe auth (no Prisma)
│   ├── proxy.ts                   ← Route protection (Next.js 16 middleware)
│   ├── components/
│   │   ├── auth/                  ← LoginForm, RegisterForm
│   │   └── layout/                ← Sidebar, TopHeader
│   └── lib/
│       ├── auth.ts                ← Full NextAuth (Prisma adapter)
│       ├── db.ts                  ← Prisma client singleton
│       └── utils.ts               ← cn(), formatCurrency(), formatDate()
├── .env.example
├── CONTRIBUTING.md                ← This file
├── next.config.ts
└── package.json
```

---

## User Roles & Route Access

| Role | After Login → | Allowed Routes |
|---|---|---|
| **ADVERTISER** | `/advertiser/sites` | `/advertiser/*`, `/wallet`, `/profile`, `/notifications` |
| **PUBLISHER** | `/publisher/platforms` | `/publisher/*`, `/wallet`, `/profile`, `/notifications` |
| **INFLUENCER** | `/influencer/channels` | `/influencer/*`, `/wallet`, `/profile`, `/notifications` |
| **ADMIN** | `/admin/dashboard` | All routes |

Protected by `proxy.ts`. Wrong role → redirected to own dashboard.

---

## Design Rules (MUST FOLLOW)

- **All styles go in `globals.css`** — no Tailwind utilities in JSX, no inline styles for layout
- **Fonts**: Space Grotesk (headings/nav/buttons) · Inter (body/labels/forms)
- **Colors**:
  - Primary Blue `#3E4FEA` — CTAs, active states
  - Dark Navy `#112C3E` — headings, dark buttons
  - App BG `#F5F8FA` — page background
  - Green `#8CF08A` — badges, arrow icons
  - Muted `#677F9B` — secondary text
- **Components available** (use these, don't reinvent):
  - `.card` `.btn` `.btn-primary` `.btn-dark` `.btn-outline` `.btn-ghost`
  - `.input` `.select` `.badge` `.badge-active` `.badge-pending` `.badge-rejected`
  - `.status-tabs` `.status-tab` `.status-tab.active`
  - `.skeleton` `.empty-state`
  - `.dashboard-shell` `.sidebar` `.main-content` `.top-header` `.page-body`

---

## Task Status Workflow

```
ADVERTISER VIEW:
  DRAFT → TASK_REVIEW → TASK_ACCEPTANCE → IN_PROGRESS → YOUR_APPROVAL → COMPLETED
                                                              ↓
                                                         IMPROVEMENT → IN_PROGRESS (loop)
                                                              ↓
                                                           REJECTED / ARCHIVED

PUBLISHER / INFLUENCER VIEW (same task, publisher-facing labels):
  New Order → Your Acceptance → In Progress → Approval → Completed / Rejected
```

---

## Wallet / Escrow Logic

```
Advertiser tops up $100  →  user.balance += 100
Advertiser places $75 order  →  user.balance -= 75, user.reserved += 75
Publisher delivers + Advertiser approves  →  user.reserved -= 75, seller.earnings += 75
Publisher requests withdrawal  →  Admin processes manually (Phase 2: Stripe)
```

---

## Common Commands

```bash
npm run dev              # Start dev server
npx tsc --noEmit        # Type check
npm run lint            # Lint
npx prisma studio       # Browse DB visually
npx prisma db push      # Push schema changes to DB
npx prisma generate     # Regenerate client after schema change
npm run build           # Production build
```

---

## Architecture Notes

**Why `proxy.ts` not `middleware.ts`?**
Next.js 16 renamed the middleware convention. Old `middleware.ts` is kept empty.

**Why two auth files?**
Edge runtime (proxy.ts) can't use Prisma. So:
- `auth.config.ts` → edge-safe (JWT only)
- `lib/auth.ts` → full config with Prisma adapter (Node.js only)

**Why `@prisma/adapter-pg`?**
Prisma 7 removed built-in URL from `schema.prisma`. We use the pg driver adapter.

---

## Known Issues / Gotchas

| Issue | Fix |
|---|---|
| `Can't resolve '.prisma/client/default'` | Run `npx prisma generate` |
| `P1012: url not supported in schema` | Already fixed — `prisma.config.ts` handles this |
| Google OAuth redirect error | Add `http://localhost:3000/api/auth/callback/google` in Google Console |
| Terminal blocked in Dropbox folder | Run commands from your own terminal, not IDE terminal |

---

---

# 📅 14-Day Build Plan

---

## ✅ Day 1 — Project Setup & Infrastructure (COMPLETE)

- [x] Next.js 16 + Tailwind CSS v4 + TypeScript initialized
- [x] Full Prisma schema — all models, enums, DB indexes
- [x] Prisma 7 config (`prisma.config.ts` + `@prisma/adapter-pg`)
- [x] NextAuth.js v5 — Google OAuth + email/password credentials
- [x] Edge-safe auth split (`auth.config.ts` + `lib/auth.ts`)
- [x] Route protection — `proxy.ts` with role-based access control
- [x] Design system — `globals.css` with all tokens, components, layout classes
- [x] Root layout with `next/font` — zero layout shift, no external font requests
- [x] Login page UI — gradient bg, DA watermarks, dark button + green arrow
- [x] Register page UI — 2-step: role selector (Advertiser/Publisher/Influencer) → credentials
- [x] Shared components — `Sidebar`, `TopHeader` (breadcrumbs, wallet display, notifications)
- [x] API routes — `/api/auth/[...nextauth]` + `/api/auth/register`
- [x] Optimized `next.config.ts` — image formats, compression, tree-shaking
- [x] `.env.example`, `README.md`, `CONTRIBUTING.md`

---

## ⬜ Day 2 — Auth Completion & Onboarding

- [ ] Forgot password page + reset password page
- [ ] `/api/auth/forgot-password` and `/api/auth/reset-password` API routes
- [ ] Email via Resend — password reset email template
- [ ] Profile setup page (shown after first login)
- [ ] Auth layout wrapper `(auth)/layout.tsx`
- [ ] Home page `/` — landing/redirect logic based on role

---

## ⬜ Day 3 — Publisher: My Platforms

- [ ] `/publisher/platforms` — list all publisher's websites
- [ ] Empty state with "Add your first platform" CTA
- [ ] Add platform form — URL, DA, DR, traffic, niche, country, language
- [ ] Package builder — add Article Posting / Link Insertion / Press Release packages with price + turnaround
- [ ] Edit/deactivate platform
- [ ] Platform status badge — Pending Review / Active / Paused / Rejected
- [ ] Publisher dashboard layout (sidebar with My Platforms, Demand, Tasks, Referral, Wallet)

---

## ⬜ Day 4 — Influencer: My Channels

- [ ] `/influencer/channels` — list all influencer's social channels
- [ ] Add channel form — platform type (Instagram/YouTube/TikTok/X/Facebook/LinkedIn), handle, followers, engagement rate, avg views, niche, country
- [ ] Channel package builder — Story / Reel / Post / Video / Review / Mention / Thread + price + turnaround
- [ ] Edit/deactivate channel
- [ ] Platform icon set (social platform icons)
- [ ] Channel status badge system
- [ ] Influencer dashboard layout (sidebar with My Channels, Demand, Tasks, Referral, Wallet)

---

## ⬜ Day 5 — Advertiser: Website Marketplace

- [ ] `/advertiser/sites` — paginated site listing table
- [ ] Listing row component — URL, DA, traffic, niche, country flag, price, "Buy now" button
- [ ] Filter sidebar — product type, niche, DA range, traffic range, country, price range
- [ ] "New sites" section — badge for sites added in last 7 days
- [ ] Sort options — Price, DA, Traffic, Date added
- [ ] Pagination
- [ ] Advertiser dashboard layout (sidebar: Search Sites, Search Influencers, Tasks, Projects, Partner List, Wallet)

---

## ⬜ Day 6 — Advertiser: Influencer Marketplace

- [ ] `/advertiser/influencers` — influencer listing page
- [ ] Toggle tabs — Websites | Influencers (links to day 5 and day 6 pages)
- [ ] Listing row — handle, platform icon, followers, engagement %, niche, country, price
- [ ] Filter sidebar — social platform, follower range, engagement %, niche, country, price range
- [ ] Sort options — Followers, Engagement, Price, Date added
- [ ] Pagination

---

## ⬜ Day 7 — Task / Order Placement Flow

- [ ] "Buy now" → Order briefing form (anchor text, target URL, content notes, deadline picker)
- [ ] Project selector dropdown (or "Create new project" inline)
- [ ] Task creation API — `/api/tasks` POST
- [ ] Escrow hold — deduct from advertiser balance → reserved
- [ ] Notification sent to publisher/influencer on order placed
- [ ] Task created in `DRAFT` → `TASK_REVIEW` on submit

---

## ⬜ Day 8 — Task Management (Both Sides)

- [ ] Publisher/Influencer `/tasks` page — status tabs, task rows
- [ ] Accept / Decline incoming task (YOUR_ACCEPTANCE tab)
- [ ] In Progress state + deadline display
- [ ] Upload deliverable URL — submit for approval
- [ ] Advertiser `/advertiser/tasks` — all status tabs matching design
- [ ] Approve or request improvement (YOUR_APPROVAL tab)
- [ ] Task detail page — brief, timeline, delivery proof link, chat thread
- [ ] Task status update API routes

---

## ⬜ Day 9 — Wallet Page (No Payments Yet)

- [ ] `/wallet` shared page — Balance / Reserved / Bonus / Earnings cards
- [ ] Transaction history table — filterable by type and date
- [ ] Manual top-up request form (admin credits balance manually for now)
- [ ] Withdrawal request form — amount, method (PayPal / bank transfer)
- [ ] Withdrawal history table

---

## ⬜ Day 10 — Notifications + In-Task Messaging

- [ ] Notification bell dropdown — mark as read, unread count badge
- [ ] `/notifications` full page — list all, filter by type
- [ ] In-task chat — message thread per task (on task detail page)
- [ ] Message send API — `/api/tasks/[id]/messages` POST
- [ ] Mark messages as read
- [ ] Email notification on key events (Resend) — task accepted, approval needed

---

## ⬜ Day 11 — Admin Panel

- [ ] `/admin/dashboard` — stats: total users, active tasks, pending listings, revenue
- [ ] `/admin/users` — user table, search, filter by role, suspend/activate
- [ ] `/admin/listings` — approve/reject Publisher websites + Influencer channels
- [ ] `/admin/tasks` — view all tasks, force-complete, force-refund disputes
- [ ] `/admin/transactions` — full financial audit log
- [ ] Admin sidebar layout

---

## ⬜ Day 12 — Additional Pages

- [ ] `/advertiser/projects` — CRUD: create, name, sort, search projects
- [ ] `/advertiser/partners` — saved media partner list (favorited publishers/influencers)
- [ ] `/publisher/demand` + `/influencer/demand` — browse open advertiser requests
- [ ] `/publisher/referral` + `/influencer/referral` — referral link + commission tracking
- [ ] Content Purchase page (`/advertiser/content`)
- [ ] `SavedPartner` toggle — save/unsave from marketplace

---

## ⬜ Day 13 — UI Polish & Responsiveness

- [ ] Mobile responsive — sidebar collapse, hamburger toggle
- [ ] Loading skeletons for all data tables and lists
- [ ] Toast notification system (success / error / info)
- [ ] Dismissable banner system (localStorage state)
- [ ] Empty states — illustrated, consistent wording per page
- [ ] Error boundaries on all data-fetching pages
- [ ] FAQ pages (static) for Advertiser and Publisher

---

## ⬜ Day 14 — Testing & Deployment

- [ ] End-to-end flow test: Advertiser places order → Publisher accepts → delivers → Approved
- [ ] End-to-end influencer flow test
- [ ] Auth edge cases (wrong role, expired session, duplicate email)
- [ ] Lighthouse audit (target score >85)
- [ ] Seed demo data — 5 publishers, 5 influencers, 3 advertisers, sample tasks
- [ ] Production deploy on Vercel
- [ ] Custom domain setup
- [ ] Final `README.md` update

---

## Page Count Summary

| Section | Pages | Status |
|---|---|---|
| Auth | 4 (Login, Register, Forgot, Reset) | 🟡 2/4 done |
| Advertiser | 7 (Sites, Influencers, Tasks, Projects, Partners, Content, Wallet) | ⬜ |
| Publisher | 5 (Platforms, Demand, Tasks, Referral, Wallet) | ⬜ |
| Influencer | 5 (Channels, Demand, Tasks, Referral, Wallet) | ⬜ |
| Admin | 5 (Dashboard, Users, Listings, Tasks, Transactions) | ⬜ |
| Shared | 3 (Notifications, Profile, FAQ) | ⬜ |
| **Total** | **~29 pages** | **Day 1 ✅** |
