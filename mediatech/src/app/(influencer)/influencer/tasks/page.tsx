import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { 
  DocumentTextIcon, 
  BriefcaseIcon, 
  ClipboardIcon 
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Tasks - Adsy Influencer",
};

export default async function InfluencerTasksPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch influencer tasks
  const tasks = await db.task.findMany({
    where: {
      sellerId: session.user.id,
      sellerType: "INFLUENCER",
    },
    include: {
      channel: true,
      channelPkg: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="mb-6">
        <span className="text-xs text-muted font-inter">Home &gt; Tasks</span>
        <h1 className="text-2xl font-bold font-space text-dark mt-2">Brand Tasks</h1>
      </div>

      <div className="bg-card border-base rounded-lg p-6">
        <div className="status-tabs mb-6" style={{ borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '16px' }}>
          <button className="status-tab active pb-2" style={{ borderBottom: '2px solid var(--color-primary)', color: 'var(--color-primary)', fontWeight: 600 }}>
            Active Offers <span className="badge badge-new" style={{ marginLeft: '4px', fontSize: '10px', padding: '1px 5px' }}>{tasks.length}</span>
          </button>
          <button className="status-tab pb-2 text-muted hover:text-dark">In Progress</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Under Review</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Completed</button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
            <div className="empty-state-icons flex gap-4 mb-4 text-muted">
              <DocumentTextIcon className="w-10 h-10" />
              <ClipboardIcon className="w-10 h-10" />
              <BriefcaseIcon className="w-10 h-10" />
            </div>
            <p className="font-space font-medium text-dark text-lg mb-1">No orders yet.</p>
            <p className="text-muted text-sm max-w-sm">When advertisers order shoutouts or sponsorships on your social accounts, they will appear here.</p>
          </div>
        ) : (
          <div className="tasks-list">
            {/* Render items */}
          </div>
        )}
      </div>
    </div>
  );
}
