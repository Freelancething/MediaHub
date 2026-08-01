import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { 
  FunnelIcon, 
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  ClipboardIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Tasks - Adsy Publisher",
};

export default async function PublisherTasksPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch incoming publisher orders
  const tasks = await db.task.findMany({
    where: {
      sellerId: session.user.id,
      sellerType: "PUBLISHER",
    },
    include: {
      platform: true,
      package: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <span className="text-xs text-muted font-inter">Home &gt; Tasks</span>
        <div className="flex justify-between items-center mt-2">
          <h1 className="text-2xl font-bold font-space text-dark">Tasks</h1>
          <a href="/faq" className="text-primary hover:underline text-sm font-inter">FAQ</a>
        </div>
      </div>

      {/* Filters Grid card */}
      <div className="bg-card border-base rounded-lg p-6 mb-6">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <select className="input select text-muted">
              <option value="">Product type (all)</option>
            </select>
          </div>
          <div>
            <input className="input" type="text" placeholder="Task ID" />
          </div>
          <div>
            <input className="input" type="text" placeholder="Created date" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          <div>
            <input className="input" type="text" placeholder="Your site's URL" />
          </div>
          <div>
            <input className="input" type="text" placeholder="Promoted URL(s)" />
          </div>
          <div>
            <input className="input" type="text" placeholder="Anchor text" />
          </div>
        </div>
      </div>

      {/* Status Tabs Bar */}
      <div className="bg-card border-base rounded-lg p-6">
        <div className="status-tabs mb-6" style={{ borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '16px' }}>
          <button className="status-tab active pb-2" style={{ borderBottom: '2px solid var(--color-primary)', color: 'var(--color-primary)', fontWeight: 600 }}>
            All (except deleted) ⓘ
          </button>
          <button className="status-tab pb-2 text-muted hover:text-dark">
            Task Review <span className="badge badge-new" style={{ marginLeft: '4px', fontSize: '10px', padding: '1px 5px' }}>new</span>
          </button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Your Acceptance</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">In Progress</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Approval</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Improvement</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Completed ⓘ</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Rejected</button>
        </div>

        {/* List Content */}
        {tasks.length === 0 ? (
          <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
            <div className="empty-state-icons flex gap-4 mb-4 text-muted">
              <DocumentTextIcon className="w-10 h-10" />
              <ClipboardIcon className="w-10 h-10" />
              <BriefcaseIcon className="w-10 h-10" />
            </div>
            <p className="font-space font-medium text-dark text-lg mb-1">This list is empty.</p>
            <p className="text-muted text-sm max-w-sm">When you receive content placement or link insertion orders from advertisers, they will appear here.</p>
          </div>
        ) : (
          <div className="tasks-list">
            {/* Real list would render here */}
          </div>
        )}
      </div>
    </div>
  );
}
