import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "My Channels - Adsy Influencer",
};

export default async function InfluencerChannelsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const channels = await db.channel.findMany({
    where: { influencerId: session.user.id },
    include: { packages: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Title block */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold font-space text-dark">My Channels</h1>
          <p className="text-sm text-muted font-inter">Manage your social channels and configure shoutout or dedicated video pricing.</p>
        </div>
        <Link href="/influencer/channels/new" className="btn btn-primary">
          <PlusIcon className="w-4.5 h-4.5" /> Add Channel
        </Link>
      </div>

      {channels.length === 0 ? (
        <div className="card bg-card border-base rounded-lg p-6">
          <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
            <span className="text-4xl mb-4">📱</span>
            <p className="font-space font-medium text-dark text-lg mb-1">No channels listed yet</p>
            <p className="text-muted text-sm max-w-sm">Connect your Instagram, TikTok, YouTube, or LinkedIn accounts to start receiving brand deals.</p>
            <Link href="/influencer/channels/new" className="btn btn-outline mt-4">
              Connect Social Account
            </Link>
          </div>
        </div>
      ) : (
        <div className="channels-grid">
          {/* Channels list would render here */}
        </div>
      )}
    </div>
  );
}
