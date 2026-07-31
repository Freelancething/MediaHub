import Link from "next/link";

export default function Home() {
  return (
    <div className="landing-page">
      {/* Header / Navbar */}
      <header className="landing-header">
        <div className="landing-container flex items-center justify-between py-4">
          <div className="flex items-center gap-2 font-bold text-dark text-xl">
            <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
              <circle cx="18" cy="18" r="18" fill="#3E4FEA" />
              <text x="18" y="23" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Space Grotesk">M</text>
            </svg>
            <span>Media Partner Hub</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/login" className="btn btn-ghost font-medium">Log In</Link>
            <Link href="/register" className="btn btn-primary font-medium">Sign Up</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="landing-container text-center py-20 md:py-32">
          <h1 className="hero-title max-w-4xl mx-auto mb-6">
            Digital PR, Blog & Guest Posting Service
          </h1>
          <p className="hero-subtitle max-w-2xl mx-auto mb-10 text-muted">
            Grow your SEO traffic and domain authority by placing high-quality backlinks on verified media publisher websites and social channels.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register" className="btn btn-primary btn-lg">
              Get Started
            </Link>
            <Link href="/login" className="btn btn-outline btn-lg">
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features-section py-16 bg-white border-t border-b border-base">
        <div className="landing-container">
          <h2 className="section-title text-center mb-12">How it works for your growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card card">
              <div className="feature-icon bg-[#eef0fd] text-primary">🛒</div>
              <h3 className="feature-card-title mt-4">Advertisers (Buyers)</h3>
              <p className="text-muted text-sm mt-2">
                Top up your wallet, search verified publishers or social influencers, place orders securely, and pay only after approving the delivery.
              </p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon bg-[#d6f5d0] text-success">📰</div>
              <h3 className="feature-card-title mt-4">Web Publishers (Sellers)</h3>
              <p className="text-muted text-sm mt-2">
                List your website platform, set metrics like Domain Authority and traffic, accept guest post or link insertion orders, and monetize.
              </p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon bg-[#fddde5] text-danger">📱</div>
              <h3 className="feature-card-title mt-4">Social Influencers</h3>
              <p className="text-muted text-sm mt-2">
                Connect your social channels (Instagram, YouTube, TikTok, X), build custom shoutout packages, work with top brands, and cash out easily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Marquee (Dark Navy Section) */}
      <section className="awards-section bg-dark py-12 text-white overflow-hidden relative">
        <div className="awards-marquee">
          <div className="marquee-content flex gap-8 whitespace-nowrap text-xl font-bold tracking-wider opacity-60">
            <span>★ ADVERTISING</span>
            <span>★ SEO LINK BUILDING</span>
            <span>★ GUEST POSTING MARKETPLACE</span>
            <span>★ VERIFIED PUBLISHERS</span>
            <span>★ SOCIAL INFLUENCERS</span>
            <span>★ ESCROW PROTECTION</span>
            <span>★ DIGITAL PR SERVICES</span>
            {/* Duplicate for infinite loop effect */}
            <span>★ ADVERTISING</span>
            <span>★ SEO LINK BUILDING</span>
            <span>★ GUEST POSTING MARKETPLACE</span>
            <span>★ VERIFIED PUBLISHERS</span>
            <span>★ SOCIAL INFLUENCERS</span>
            <span>★ ESCROW PROTECTION</span>
            <span>★ DIGITAL PR SERVICES</span>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="stats-section py-16 bg-app">
        <div className="landing-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="stat-item">
              <div className="stat-number text-primary">95K+</div>
              <div className="stat-label text-muted">Verified Platforms</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-primary">300K+</div>
              <div className="stat-label text-muted">Tasks Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-primary">5K+</div>
              <div className="stat-label text-muted">Active Advertisers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number text-primary">4.8 / 5</div>
              <div className="stat-label text-muted">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer py-12 bg-white border-t border-base">
        <div className="landing-container flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-muted text-sm">
            © {new Date().getFullYear()} Media Partner Hub. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-muted">
            <Link href="/terms" className="hover:text-dark">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-dark">Privacy Policy</Link>
          </div>
        </div>
      </footer>

      <style>{`
        .landing-page {
          background-color: var(--color-app);
          min-height: 100vh;
        }
        .landing-container {
          max-width: 1200px;
          margin: 0 auto;
          padding-left: 20px;
          padding-right: 20px;
        }
        .landing-header {
          background-color: white;
          border-bottom: 1px solid var(--color-border);
        }
        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          color: var(--color-dark);
          font-family: var(--font-space-grotesk);
        }
        .hero-subtitle {
          font-size: clamp(1.1rem, 2vw, 1.25rem);
          line-height: 1.6;
        }
        .section-title {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          color: var(--color-dark);
          font-family: var(--font-space-grotesk);
        }
        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
        }
        .feature-card-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--color-dark);
          font-family: var(--font-space-grotesk);
        }
        .stat-number {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          font-family: var(--font-space-grotesk);
        }
        .stat-label {
          font-size: 14px;
          font-weight: 500;
        }
        .awards-marquee {
          width: 100%;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-content {
          animation: marquee 25s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
}
