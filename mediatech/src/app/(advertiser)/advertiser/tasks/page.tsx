import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { 
  DocumentTextIcon, 
  BriefcaseIcon, 
  ClipboardIcon 
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Tasks - Adsy Advertiser",
};

export default async function AdvertiserTasksPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch advertiser tasks
  const tasks = await db.task.findMany({
    where: { advertiserId: session.user.id },
    include: {
      platform: true,
      channel: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="mb-6">
        <span className="text-xs text-muted font-inter">Home &gt; Tasks</span>
        <h1 className="text-2xl font-bold font-space text-dark mt-2">Sent Placements</h1>
      </div>

      <div className="bg-card border-base rounded-lg p-6">
        <div className="status-tabs mb-6" style={{ borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '16px' }}>
          <button className="status-tab active pb-2" style={{ borderBottom: '2px solid var(--color-primary)', color: 'var(--color-primary)', fontWeight: 600 }}>
            Sent Tasks <span className="badge badge-new" style={{ marginLeft: '4px', fontSize: '10px', padding: '1px 5px' }}>{tasks.length}</span>
          </button>
          <button className="status-tab pb-2 text-muted hover:text-dark">In Progress</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Moderation Review</button>
          <button className="status-tab pb-2 text-muted hover:text-dark">Completed</button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
            <div className="empty-state-icons flex gap-4 mb-4 text-muted">
              <DocumentTextIcon className="w-10 h-10" />
              <ClipboardIcon className="w-10 h-10" />
              <BriefcaseIcon className="w-10 h-10" />
            </div>
            <p className="font-space font-medium text-dark text-lg mb-1">No tasks submitted yet.</p>
            <p className="text-muted text-sm max-w-sm">When you buy placements or shoutouts from publishers or creators, they will appear here.</p>
          </div>
        ) : (
          <div className="tasks-list flex flex-col gap-4">
            {tasks.map((task) => (
              <div key={task.id} className="card bg-card border-base rounded-lg p-6 relative">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">Target URL</span>
                    <a href={task.targetUrl || ""} target="_blank" rel="noopener noreferrer" className="text-primary font-space font-semibold text-sm hover:underline">
                      {task.targetUrl}
                    </a>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted block mb-1">Status</span>
                    <span className="badge badge-pending text-xs">{task.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-4 border-t border-muted text-sm font-inter">
                  <div>
                    <span className="text-xs text-muted block mb-1">Anchor Text</span>
                    <span className="text-dark font-medium">{task.anchorText}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Total Cost</span>
                    <span className="text-dark font-semibold">${task.price.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Placement details</span>
                    <span className="text-muted text-xs">{task.platformId ? "Website Placement" : "Social shoutout"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
