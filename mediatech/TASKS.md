# Media Partner Hub — Task Tracker

> Keep this file open as your daily working checklist.
> Mark `[x]` when done, `[/]` when in progress.

---

## Day 1 — Project Setup & Infrastructure ✅ COMPLETE
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

---

## Day 2 — Auth & Onboarding ✅ COMPLETE
- [x] Forgot password page (email input, send reset link)
- [x] Reset password page (new password + strength meter + match check)
- [x] API: /api/auth/forgot-password (token generation + Resend email)
- [x] API: /api/auth/reset-password (token validation + bcrypt hash)
- [x] PasswordResetToken added to Prisma schema
- [x] Advertiser layout (sidebar + header + role guard)
- [x] Publisher layout (sidebar + header + role guard)
- [x] Influencer layout (sidebar + header + role guard)
- [x] Dashboard placeholder pages for all 3 roles
- [x] Post-register redirect by role (already in register-form.tsx)

---

## Day 3 — Publisher: My Platforms ✅ COMPLETE
- [x] "My Platforms" list page (renders banners, tabs, filters, website list card grids)
- [x] Add website platform form (URL, DA, traffic, niche, country, language metrics)
- [x] Package builder per platform (Article Posting placement + writing packages)
- [x] Platform status badges (Approved, Pending specification, Rejected)
- [x] Nice illustrated empty state for new publishers

---

## Day 4 — Influencer: My Channels
- [ ] "My Channels" list page + empty state
- [ ] Add/edit channel form (platform type, handle, followers, engagement, niche, country)
- [ ] Channel package builder (Story, Post, Reel, Video, Review + pricing)
- [ ] Platform icons (Instagram, YouTube, TikTok, X, etc.)
- [ ] Channel status badge system
- [ ] Influencer sidebar layout (My Channels, Demand, Tasks, Referral)

---

## Day 7 — Advertiser: Purchase Placement Brief Form ✅ COMPLETE
- [x] Purchase page template routing platformId / channelId query params
- [x] Summary block displaying selected platform information and total cost
- [x] Target URL, Anchor Text, and Content Brief fields inputs
- [x] Insufficient wallet funds detection banner alerts
- [x] Submit database logic (decrement balance, increment reserved escrows, and save new Task record)
- [x] Sent placement tasks tracking list layout page

---

## Day 7 — Task/Order Placement Flow
- [ ] "Buy now" → order briefing modal/page (target URL, anchor text, content notes, deadline)
- [ ] Project selector (or create new inline)
- [ ] Task creation → escrow hold (balance → reserved)
- [ ] Publisher/Influencer receives notification
- [ ] Draft → Task Review state on submit

---

## Day 8 — Advertiser & Publisher: Tasks Management Workﬂow ✅ COMPLETE
- [x] Publisher tasks dashboard list sorting (status tab params)
- [x] Accept / Reject order triggers (escrow refunds to advertiser balance on rejection)
- [x] Live URL deliverable submission form
- [x] Advertiser tasks status lists (Reviewing, In Progress, Waiting for Approval, Completed)
- [x] Release escrow transactions (decrements advertiser reserved funds, credits publisher wallet balance and lifetime earnings)
- [x] Request improvements notes submissions (returns tasks to revisions status) detail view: brief, timeline, delivery proof, chat thread

---

## Day 9 — Wallet & Stripe Payments
- [ ] Wallet page: Balance / Reserved / Bonus cards
- [ ] Top-up via Stripe Checkout (preset amounts: $50, $100, $250, $500 + custom)
- [ ] Stripe webhook: credit balance on successful payment
- [ ] Bonus logic (e.g. bank wire = +3% bonus)
- [ ] Transaction history table (filterable by type + date)
- [ ] On task completion: reserved → publisher/influencer earning

---

## Day 10 — Publisher/Influencer Earnings & Withdrawal
- [ ] Seller wallet: Earnings / Reserved / Withdrawn
- [ ] Withdrawal request form (amount, method: PayPal / bank)
- [ ] Admin withdrawal approval queue
- [ ] Earnings history with task reference links

---

## Day 11 — Notifications + In-Task Messaging
- [ ] Notification bell with unread badge count
- [ ] Notification dropdown with mark-as-read
- [ ] "View all notifications" page
- [ ] In-task chat thread (message input + message list)
- [ ] Real-time via Supabase subscriptions or 5s polling fallback
- [ ] Email notifications via Resend (task accepted, approval needed, withdrawal processed)

---

## Day 12 — Admin Panel
- [ ] Admin dashboard: stats (total users, revenue, active tasks, pending approvals)
- [ ] User management table (search, filter by role, suspend/activate)
- [ ] Platform approval queue (approve/reject publisher sites)
- [ ] Channel approval queue (approve/reject influencer channels)
- [ ] Task oversight (all tasks, force-complete, force-refund)
- [ ] Transaction log (all financial activity)

---

## Day 13 — Additional Pages + Polish
- [ ] My Projects CRUD (advertiser)
- [ ] Media Partner List (saved publishers/influencers)
- [ ] Content Purchase page
- [ ] Referral Program page (publisher + influencer)
- [ ] Dismissable promo banners (localStorage state)
- [ ] Loading skeletons for all tables
- [ ] Toast notifications (success, error, info)
- [ ] Mobile responsive + sidebar collapse toggle

---

## Day 14 — Testing & Deployment
- [ ] Full end-to-end test: Advertiser places order → Publisher accepts → delivers → Approved → Funds released
- [ ] Full influencer flow test
- [ ] Stripe webhook test (top-up, payout)
- [ ] Auth edge cases (wrong role redirect, expired session)
- [ ] Lighthouse performance audit (target >85)
- [ ] Seed demo data (5 publishers, 5 influencers, 3 advertisers, sample tasks)
- [ ] Production deploy on Vercel
- [ ] Custom domain setup
