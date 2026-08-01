# Media Partner Hub — Product Overview & UI Reference

> **Platform Name**: Media Partner Hub  
> **Reference/Inspiration**: Adsy.com  
> **Build Time**: 14 days  
> **Stack**: Next.js 16 · TypeScript · Tailwind CSS v4 · Supabase · Prisma 7 · NextAuth.js v5 · Stripe · Resend

---

## What Are We Building?

**Media Partner Hub** is a **content marketing marketplace** — a platform that connects:

1. **People who WANT to promote their business** (Advertisers/Buyers)
2. **People who HAVE audiences to promote on** (Publishers & Influencers/Sellers)

Think of it like **Fiverr, but specifically for content marketing** — guest posts, link placements, press releases, and influencer shoutouts — with a built-in **escrow system** that holds money safely until work is delivered and approved.

---

## The 4 Roles

### 🛒 Advertiser (Buyer)
Business owners, SEO agencies, marketing teams, startup founders.
- Top up wallet → Browse publishers/influencers → Place order → Approve delivery → Funds released

### 📰 Publisher (Website Owner / Media Partner)
Blog owners, news site owners, content website operators.
- **Sells**: Article Posting · Link Insertion · Press Release
- List website → Set prices → Accept orders → Deliver → Get paid

### 📱 Influencer (Social Media Creator)
Instagram creators, YouTubers, TikTokers, X/Twitter personalities, LinkedIn thought leaders.
- **Sells**: Story · Reel · Post · YouTube Video · TikTok · LinkedIn · X mention
- List channels → Set prices → Accept brand deals → Deliver → Get paid

### 🔧 Admin (Platform Operator)
The MediaHub team.
- Approve/reject listings · Oversee tasks · Manage users · Process withdrawals · View all transactions

---

## How the Money Works (Escrow System)

```
STEP 1: Advertiser tops up their wallet
         Advertiser pays $100 via card → $100 added to their Balance

STEP 2: Advertiser places an order ($50 task)
         $50 moves from Balance → Reserved
         (Money is locked, can't be spent elsewhere)

STEP 3: Publisher/Influencer accepts and delivers the work
         Task moves through In Progress → Delivered

STEP 4: Advertiser approves the delivery
         $50 moves from Advertiser's Reserved → Publisher's Earnings
         Publisher can now withdraw that money

STEP 5: If Advertiser is unhappy
         They request "Improvement" → Publisher revises
         Or Admin steps in to resolve dispute
         If cancelled: $50 is refunded to Advertiser's Balance
```

**Wallet header display**: Balance | Reserved | Bonus

---

## Task Status Workflow

```
ADVERTISER VIEW:
  Draft → Task Review → Task's Acceptance → In Progress → Your Approval → Completed
                                                           ↓
                                                      Improvement → In Progress (loop)
                                                           ↓
                                                         Rejected → Archived

PUBLISHER / INFLUENCER VIEW:
  Task Review → Your Acceptance → In Progress → Approval → Completed
                    ↓                              ↓
                 Declined                      Improvement → In Progress (loop)
```

---

## All Pages

### 🔐 Auth Pages (3)
| Page | Route | What it does |
|---|---|---|
| Login | `/login` | Email + password or Google login |
| Register | `/register` | Choose role, fill profile details |
| Forgot Password | `/forgot-password` | Send reset link to email |
| Reset Password | `/reset-password` | New password form via token |

### 🛒 Advertiser Dashboard (7)
| Page | Route | What it does |
|---|---|---|
| Dashboard | `/dashboard` | Overview stats and quick actions |
| Search for Sites | `/sites` | Browse publisher websites with filters |
| Search for Influencers | `/influencers` | Browse influencer channels with filters |
| Tasks | `/tasks` | All orders placed, tabbed by status |
| My Projects | `/projects` | Group tasks into campaigns |
| Media Partner List | `/partners` | Saved/favorited publishers & influencers |
| Wallet | `/wallet` | Top up balance, view transactions |

### 📰 Publisher Dashboard (5)
| Page | Route | What it does |
|---|---|---|
| My Platforms | `/platforms` | List and manage websites |
| Demand | `/demand` | Incoming requests from advertisers |
| Tasks | `/tasks` | Incoming orders with status tabs |
| Referral Program | `/referral` | Earn 10% commission |
| Wallet | `/wallet` | View earnings, request withdrawal |

### 📱 Influencer Dashboard (5)
| Page | Route | What it does |
|---|---|---|
| My Channels | `/channels` | List and manage social channels |
| Demand | `/demand` | Open brand collaboration requests |
| Tasks | `/tasks` | Incoming brand orders |
| Referral Program | `/referral` | Earn 10% commission |
| Wallet | `/wallet` | View earnings, request withdrawal |

### 🔧 Admin Panel (5)
| Page | Route | What it does |
|---|---|---|
| Dashboard | `/admin` | Platform stats overview |
| Users | `/admin/users` | User management (suspend/activate) |
| Listings | `/admin/listings` | Approve/reject publisher sites & influencer channels |
| Tasks | `/admin/tasks` | View all tasks, force-complete/refund |
| Transactions | `/admin/transactions` | Full financial audit log |

---

## Design System (from Adsy.com reference)

### Color Palette
| Token | Value | Usage |
|---|---|---|
| Background | `#F5F8FA` | App background |
| Surface | `#FFFFFF` | Cards, sidebar, content |
| Primary Dark | `#112C3E` | Text, login button, headings |
| Primary Blue | `#3E4FEA` | Active nav, primary CTAs |
| Grey Text | `#677F9B` | Secondary labels, inactive nav |
| Green Accent | `#8CF08A` | Arrow on CTA, "new" badges |
| Amber | warm amber | Promo banners |
| Info Blue | light lavender | Security/info banners |

### Typography
- **Font**: Space Grotesk (headings, nav) + Inter (body, labels)
- **Page Title**: ~32px bold dark `#112C3E`
- **Nav items**: 14–16px regular weight
- **Breadcrumbs**: small, grey

### Layout
- Sidebar width: ~190px fixed
- Content padding: 20–30px
- Card border radius: 8–12px
- Subtle box shadows on containers

---

## Key UX Patterns (from Adsy.com reference)

1. **Notification banners**: Stacked dismissable banners (orange = promo, blue = security) below header
2. **Empty states**: Centered "No results found." with optional decorative icons
3. **Tab-based status filtering**: Horizontal scrollable tabs for order statuses
4. **Multi-column filters**: 2–3 column grid of filter inputs above content tables
5. **Breadcrumbs**: Simple "Home > Page" pattern on inner pages
6. **Sidebar collapse**: "Collapse view" toggle at bottom of sidebar
7. **Social auth**: Google + Facebook quick sign-up on login
8. **Balance in header**: Shows Balance / Reserved / Bonus inline in header
9. **Badge on nav items**: Green "new" pill badge for new features
10. **CTA in sidebar**: "Demo Call" dark button + "Earn $1,000+/month!" promo link

---

## Login Page Design
- Centered card on gradient background with purple (TL), white (center), green (BR) blobs
- Faint "DA: 31", "DA: 54" numbers watermarked in background as decoration
- White card ~480px wide with:
  - Logo at top center
  - H1: "Log In" in bold dark
  - Google + Facebook social buttons (pill-shaped, white, bordered)
  - Divider: "Or continue with"
  - Email + Password inputs (light grey bg, rounded)
  - "Remember me" checkbox + "Lost password?" link
  - CTA: Full-width dark `#112C3E` button with bright **green circle + arrow** on right
  - Footer: "No account yet? Create a new account"

---

## Sidebar Navigation Details

### Advertiser Sidebar
1. Search for sites (magnifying glass)
2. Article Posting (bullet)
3. Link Insertion (bullet)
4. Press Release (bullet)
5. **New sites** — green "new" badge pill
6. Media partner list (people icon)
7. My projects (clipboard icon)
8. **Tasks** (checklist) — currently active = blue highlight
9. Content purchase (receipt icon)
10. **Earn $1,000+/month!** (network icon) — promo
11. **Demo Call** — dark rounded button (bottom)
12. **Collapse view** — toggle (very bottom)

**Active state**: Blue `#3E4FEA` text + icon + light blue left border

### Publisher Sidebar
1. My platforms (grid icon)
2. Demand (bar chart icon)
3. Tasks (checklist)
4. Referral program (share icon) — active = blue
5. Collapse view (bottom toggle)

---

## Content Types

### For Websites (Publisher):
| Type | Description |
|---|---|
| Article Posting | Full article published on publisher's site with advertiser's link |
| Link Insertion | Advertiser's link inserted into an existing live article |
| Press Release | Press release published on publisher's site |

### For Social Channels (Influencer):
| Type | Description |
|---|---|
| Instagram Story | 24-hour story mention with swipe-up link |
| Instagram Reel | Short video featuring brand/product |
| Instagram Post | Permanent feed post with caption |
| YouTube Video | Dedicated or integrated brand mention |
| TikTok Video | Short-form video featuring brand |
| LinkedIn Post | Professional audience reach post |
| X (Twitter) Post | Tweet or thread mentioning brand |
| Facebook Post | Facebook page or group post |

---

## Business Model

| Revenue Stream | How it works |
|---|---|
| Platform Commission | % cut from each completed task (15–20% of task value) |
| Bonus Credits | Sell bonus credits at a premium |
| Premium Listings | Publishers/Influencers pay to get featured in search results |
| Content Writing | Charge for article writing service |

---

## Summary

- **2-sided marketplace** (buyers + sellers)
- **3 seller types** (website publishers + social influencers)
- **Escrow-based payments** via Stripe
- **Full order management** with 15+ status states
- **Role-based dashboards** (4 roles, ~28 pages)
- **Real-time notifications** + in-task messaging
- **Admin control panel** for platform oversight
- Built in **2 weeks** using Next.js 16, Tailwind CSS v4, Supabase, Prisma 7, NextAuth.js v5, Stripe, Resend
