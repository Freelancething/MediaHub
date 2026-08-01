import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { 
  DocumentTextIcon, 
  BriefcaseIcon, 
  ClipboardIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "Tasks - Adsy Publisher",
};

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function PublisherTasksPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.status || "ALL";

  // Fetch publisher tasks
  const tasks = await db.task.findMany({
    where: {
      sellerId: session.user.id,
      sellerType: "PUBLISHER",
      ...(currentTab !== "ALL" ? { status: currentTab as any } : {}),
    },
    include: {
      platform: true,
      package: true,
    },
    orderBy: { createdAt: "desc" },
  });

  // Server actions for task responses
  async function handleAccept(formData: FormData) {
    "use server";
    const taskId = formData.get("taskId") as string;
    const { db } = await import("@/lib/db");
    await db.task.update({
      where: { id: taskId },
      data: { status: "IN_PROGRESS", acceptedAt: new Date() }
    });
    redirect("/publisher/tasks?status=IN_PROGRESS");
  }

  async function handleReject(formData: FormData) {
    "use server";
    const taskId = formData.get("taskId") as string;
    const { db } = await import("@/lib/db");

    const task = await db.task.findUnique({ where: { id: taskId } });
    if (!task) return;

    // Refund escrow to advertiser balance
    await db.$transaction([
      db.user.update({
        where: { id: task.advertiserId },
        data: {
          balance: { increment: task.price },
          reserved: { decrement: task.price }
        }
      }),
      db.task.update({
        where: { id: taskId },
        data: { status: "REJECTED" }
      })
    ]);
    redirect("/publisher/tasks?status=REJECTED");
  }

  async function handleSubmitDeliverable(formData: FormData) {
    "use server";
    const taskId = formData.get("taskId") as string;
    const liveUrl = formData.get("liveUrl") as string;
    const { db } = await import("@/lib/db");
    await db.task.update({
      where: { id: taskId },
      data: { 
        status: "YOUR_APPROVAL", 
        liveUrl,
        deliveredAt: new Date()
      }
    });
    redirect("/publisher/tasks?status=YOUR_APPROVAL");
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb & Title */}
      <div className="mb-6">
        <span className="text-xs text-muted font-inter">Home &gt; Tasks</span>
        <h1 className="text-2xl font-bold font-space text-dark mt-2">Publisher Placements Orders</h1>
      </div>

      {/* Status Tabs Bar */}
      <div className="bg-card border-base rounded-lg p-6">
        <div className="status-tabs mb-6" style={{ borderBottom: '1px solid var(--color-border)', display: 'flex', gap: '16px' }}>
          <a href="/publisher/tasks?status=ALL" className={`status-tab pb-2 ${currentTab === 'ALL' ? 'active font-bold text-primary' : 'text-muted'}`} style={currentTab === 'ALL' ? { borderBottom: '2px solid var(--color-primary)' } : {}}>
            All Tasks
          </a>
          <a href="/publisher/tasks?status=TASK_REVIEW" className={`status-tab pb-2 ${currentTab === 'TASK_REVIEW' ? 'active font-bold text-primary' : 'text-muted'}`} style={currentTab === 'TASK_REVIEW' ? { borderBottom: '2px solid var(--color-primary)' } : {}}>
            Pending Acceptance
          </a>
          <a href="/publisher/tasks?status=IN_PROGRESS" className={`status-tab pb-2 ${currentTab === 'IN_PROGRESS' ? 'active font-bold text-primary' : 'text-muted'}`} style={currentTab === 'IN_PROGRESS' ? { borderBottom: '2px solid var(--color-primary)' } : {}}>
            In Progress
          </a>
          <a href="/publisher/tasks?status=YOUR_APPROVAL" className={`status-tab pb-2 ${currentTab === 'YOUR_APPROVAL' ? 'active font-bold text-primary' : 'text-muted'}`} style={currentTab === 'YOUR_APPROVAL' ? { borderBottom: '2px solid var(--color-primary)' } : {}}>
            Sent for Approval
          </a>
          <a href="/publisher/tasks?status=COMPLETED" className={`status-tab pb-2 ${currentTab === 'COMPLETED' ? 'active font-bold text-primary' : 'text-muted'}`} style={currentTab === 'COMPLETED' ? { borderBottom: '2px solid var(--color-primary)' } : {}}>
            Completed
          </a>
          <a href="/publisher/tasks?status=REJECTED" className={`status-tab pb-2 ${currentTab === 'REJECTED' ? 'active font-bold text-primary' : 'text-muted'}`} style={currentTab === 'REJECTED' ? { borderBottom: '2px solid var(--color-primary)' } : {}}>
            Rejected
          </a>
        </div>

        {/* List Content */}
        {tasks.length === 0 ? (
          <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
            <div className="empty-state-icons flex gap-4 mb-4 text-muted">
              <DocumentTextIcon className="w-10 h-10" />
              <ClipboardIcon className="w-10 h-10" />
              <BriefcaseIcon className="w-10 h-10" />
            </div>
            <p className="font-space font-medium text-dark text-lg mb-1">No orders found.</p>
            <p className="text-muted text-sm max-w-sm">No incoming advertiser campaigns match this status filter.</p>
          </div>
        ) : (
          <div className="tasks-list flex flex-col gap-6">
            {tasks.map((task) => (
              <div key={task.id} className="card bg-card border-base rounded-lg p-6 relative">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">Website URL</span>
                    <span className="font-space font-bold text-dark">{task.platform?.url}</span>
                  </div>
                  <div>
                    <span className="badge badge-pending text-xs">{task.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-4 border-t border-muted mb-4 text-sm font-inter">
                  <div>
                    <span className="text-xs text-muted block mb-1">Target Promoted URL</span>
                    <a href={task.targetUrl || ""} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      {task.targetUrl}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Anchor Text</span>
                    <span className="text-dark font-medium">{task.anchorText}</span>
                  </div>
                </div>

                <div className="bg-app p-4 rounded-lg text-xs font-inter text-muted mb-4">
                  <strong>Content Brief:</strong> {task.brief}
                </div>

                {/* Workflow Actions */}
                <div className="flex justify-end pt-4 border-t border-muted gap-3">
                  {task.status === "TASK_REVIEW" && (
                    <>
                      <form action={handleReject}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <button type="submit" className="btn btn-outline flex items-center gap-1 btn-sm text-danger" style={{ borderColor: 'var(--color-danger)' }}>
                          <XMarkIcon className="w-4 h-4" /> Reject Order
                        </button>
                      </form>
                      <form action={handleAccept}>
                        <input type="hidden" name="taskId" value={task.id} />
                        <button type="submit" className="btn btn-primary flex items-center gap-1 btn-sm">
                          <CheckIcon className="w-4 h-4" /> Accept & Start
                        </button>
                      </form>
                    </>
                  )}

                  {task.status === "IN_PROGRESS" && (
                    <form action={handleSubmitDeliverable} className="flex gap-2 w-full">
                      <input type="hidden" name="taskId" value={task.id} />
                      <input 
                        name="liveUrl" 
                        type="url" 
                        required 
                        placeholder="Paste your live guest post URL here..." 
                        className="input flex-1" 
                      />
                      <button type="submit" className="btn btn-primary flex items-center gap-1 btn-sm">
                        <CheckIcon className="w-4 h-4" /> Submit Live URL
                      </button>
                    </form>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
