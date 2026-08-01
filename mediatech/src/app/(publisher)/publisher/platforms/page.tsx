import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  FunnelIcon, 
  ArrowDownTrayIcon,
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "My Platforms - Adsy Publisher",
};

export default async function PublisherPlatformsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch publisher platforms and packages from the database
  const platforms = await db.platform.findMany({
    where: { publisherId: session.user.id },
    include: { packages: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="platforms-container">
      {/* 2FA Reminder Banner */}
      <div className="banner banner-info rounded-lg mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="info-icon">ℹ</span>
          <span>Get more protection by adding Two-Factor Authentication (2FA) via Google Authenticator</span>
        </div>
        <button className="text-muted hover:text-dark">×</button>
      </div>

      {/* Moderation Warning Banner */}
      {platforms.some(p => p.status === "REJECTED") && (
        <div className="banner banner-promo rounded-lg mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="warning-icon">⚠️</span>
            <span>Unfortunately, one or several of your sites didn&apos;t pass the moderation. We recommend you to join our partner platform - Magenet - to earn money from your sites by placing contextual ads on them.</span>
          </div>
          <button className="text-muted hover:text-dark">×</button>
        </div>
      )}

      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold font-space text-dark">My platforms</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted text-sm">Contributor Status</span>
          <span className="badge badge-active flex items-center gap-1">
            <CheckCircleIcon className="w-4 h-4 text-success" /> Successful
          </span>
        </div>
      </div>

      {/* Accordion FAQ Toggle */}
      <details className="faq-details border-base bg-card rounded-lg mb-6">
        <summary className="font-space font-medium p-4 cursor-pointer flex justify-between items-center list-none">
          <div className="flex items-center gap-3">
            <span className="help-icon">?</span>
            <span>How to work with this page</span>
          </div>
          <ChevronRightIcon className="arrow-icon w-4 h-4 transition-transform" />
        </summary>
        <div className="p-4 pt-0 border-t border-muted text-sm text-muted leading-relaxed">
          Here you can list and edit your website platforms. Adding pricing packages enables marketers to buy content placements, link insertions, and press releases. Platform changes will require manual admin moderation.
        </div>
      </details>

      {/* Monetization Action Banner */}
      <div className="monetize-cta-banner rounded-lg p-6 mb-6 flex justify-between items-center bg-green-accent">
        <p className="text-dark font-medium text-lg m-0">
          Want to monetize your site while placing or creating unique and relevant content?
        </p>
        <Link href="/publisher/platforms/new" className="btn btn-dark btn-lg font-space font-semibold" style={{ borderRadius: '8px' }}>
          Add or update websites
        </Link>
      </div>

      {/* Filters & Tabs Section */}
      <div className="bg-card border-base rounded-lg p-6 mb-6">
        {/* Status Tabs */}
        <div className="status-tabs mb-6">
          <button className="status-tab active">All (except deleted) <span className="tab-count">{platforms.length}</span></button>
          <button className="status-tab">Pending indexation <span className="tab-count">0</span></button>
          <button className="status-tab">Pending specification <span className="tab-count">{platforms.filter(p => p.status === "PENDING").length}</span></button>
          <button className="status-tab">Pending moderation <span className="tab-count">0</span></button>
          <button className="status-tab">Approved <span className="tab-count">{platforms.filter(p => p.status === "ACTIVE").length}</span></button>
          <button className="status-tab">Rejected <span className="tab-count">{platforms.filter(p => p.status === "REJECTED").length}</span></button>
          <button className="status-tab">On hold <span className="tab-count">0</span></button>
          <button className="status-tab">Deleted <span className="tab-count">0</span></button>
        </div>

        {/* Filter Inputs Grid */}
        <div className="filter-grid mb-6">
          <div>
            <input className="input" type="text" placeholder="Site's URL" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="crowdPost" className="rounded border-border text-primary focus:ring-primary" />
            <label htmlFor="crowdPost" className="text-sm font-inter text-muted">Crowd Post ⓘ</label>
          </div>
          <div>
            <select className="input select text-muted">
              <option value="">Inventory status: Show all</option>
            </select>
          </div>
          <div>
            <select className="input select text-muted">
              <option value="">Site activity: Show all</option>
            </select>
          </div>
        </div>

        <div className="filter-details-row mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted font-inter">Price ⓘ</span>
            <input className="input w-24" type="text" placeholder="15" />
            <span className="text-muted">-</span>
            <input className="input w-24" type="text" placeholder="75,000" />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted font-inter">Link attribution type ⓘ</span>
            <select className="input select w-40">
              <option value="">All types</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted font-inter">Service type ⓘ</span>
            <select className="input select w-56">
              <option value="">Invite Servicetype Ids (all)</option>
            </select>
          </div>

          <div className="radio-options">
            <label className="flex items-center gap-2 text-sm text-dark font-inter">
              <input type="radio" name="serviceSelection" defaultChecked />
              Sites with selected service
            </label>
            <label className="flex items-center gap-2 text-sm text-dark font-inter">
              <input type="radio" name="serviceSelection" />
              Sites without selected services
            </label>
          </div>
        </div>

        <button className="btn btn-outline" style={{ border: '1.5px solid #3E4FEA', color: '#3E4FEA', fontWeight: 600 }}>
          Apply filters
        </button>
      </div>

      {/* Results Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="font-space font-semibold text-dark text-lg">Results: {platforms.length}</span>
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-sm text-muted hover:text-dark font-inter">
            <FunnelIcon className="w-4 h-4" /> Site activity
          </button>
          <button className="flex items-center gap-2 text-sm text-muted hover:text-dark font-inter">
            <ArrowDownTrayIcon className="w-4 h-4" /> Download websites
          </button>
        </div>
      </div>

      {/* Platforms List */}
      {platforms.length === 0 ? (
        <div className="card empty-state-container">
          <div className="empty-state">
            <span className="text-4xl">🌐</span>
            <p className="font-space font-medium text-dark text-lg m-0">No platforms listed yet</p>
            <p className="text-muted max-w-sm text-center">Add your first website to start receiving paid content creation, guest post placement, or link insertion orders.</p>
            <Link href="/publisher/platforms/new" className="btn btn-primary mt-2">
              <PlusIcon className="w-4 h-4" /> Add Website
            </Link>
          </div>
        </div>
      ) : (
        <div className="platforms-grid flex flex-col gap-6">
          {platforms.map((platform) => (
            <div key={platform.id} className="card bg-card border-base rounded-lg p-6 relative">
              {/* Top Row: URL, Status, Actions */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <a href={platform.url} target="_blank" rel="noopener noreferrer" className="text-primary font-space font-semibold text-lg hover:underline">
                    {platform.url}
                  </a>
                  <span className="badge badge-pending flex items-center gap-1">
                    Not in inventory
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-success text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-success"></span> Active
                  </span>
                  <button className="btn btn-outline flex items-center gap-2 btn-sm text-dark font-inter" style={{ padding: '6px 12px' }}>
                    📝 Edit
                  </button>
                  <button className="btn btn-outline btn-sm text-dark px-3">•••</button>
                </div>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-muted">
                {/* Col 1 */}
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">Status</span>
                    <span className={platform.status === "ACTIVE" ? "text-success font-medium" : platform.status === "REJECTED" ? "text-danger font-medium" : "text-warning font-medium"}>
                      {platform.status === "ACTIVE" ? "Approved" : platform.status === "REJECTED" ? "Rejected" : "Pending specification"}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Confirmation status</span>
                    <span className="font-semibold text-warning text-sm">Owner</span>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">Completion rate</span>
                    <span className="text-dark font-medium text-sm">N/A</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Tasks with initial Domain & Price</span>
                    <span className="text-dark font-medium text-sm">N/A</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Avg lifetime of links</span>
                    <span className="text-dark font-medium text-sm">N/A</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">TAT</span>
                    <span className="text-dark font-medium text-sm">N/A</span>
                  </div>
                </div>

                {/* Col 3: Packages */}
                <div className="flex flex-col gap-4">
                  <div className="border-b border-muted pb-2">
                    <span className="text-xs text-muted block mb-1">Article Posting</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Content placement</span>
                    <span className="font-semibold text-dark">${platform.packages.find(p => p.type === "ARTICLE_POSTING")?.price?.toFixed(2) || "10.00"} 📝</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Writing & placement</span>
                    <span className="font-semibold text-dark">${((platform.packages.find(p => p.type === "ARTICLE_POSTING")?.price || 10.00) + 15).toFixed(2)} 📝</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted">Special topic</span>
                    <span className="font-semibold text-dark">N/A 📝</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        .faq-details summary::-webkit-details-marker {
          display: none;
        }
        .faq-details[open] .arrow-icon {
          transform: rotate(90deg);
        }
        .help-icon {
          width: 20px;
          height: 20px;
          background: #EEF0FD;
          color: var(--color-primary);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 13px;
        }
        .monetize-cta-banner {
          background-color: #8CF08A;
        }
        .tab-count {
          background: #EEF0FD;
          color: var(--color-grey-blue);
          font-size: 11px;
          padding: 1px 6px;
          border-radius: 10px;
          margin-left: 4px;
        }
        .status-tab.active .tab-count {
          background: var(--color-primary);
          color: white;
        }
        .filter-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 16px;
          align-items: center;
        }
        .filter-details-row {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .radio-options {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .platforms-container {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
