import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChartBarIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Demand - Adsy Publisher",
};

export default async function PublisherDemandPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="mb-6">
        <span className="text-xs text-muted font-inter">Home &gt; Demand</span>
        <h1 className="text-2xl font-bold font-space text-dark mt-2">Open Demand</h1>
      </div>

      <div className="card bg-card border-base rounded-lg p-6">
        <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
          <ChartBarIcon className="w-12 h-12 text-muted mb-4" />
          <p className="font-space font-medium text-dark text-lg mb-1">No open demand offers matching your platforms</p>
          <p className="text-muted text-sm max-w-sm">When advertisers submit generic order briefs matching your platforms niches, they will show up here as inbound opportunities.</p>
        </div>
      </div>
    </div>
  );
}
