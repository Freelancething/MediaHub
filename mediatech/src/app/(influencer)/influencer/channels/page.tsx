import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import { redirect } from "next/navigation";
import { 
  PlusIcon,
  CheckCircleIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  DevicePhoneMobileIcon
} from "@heroicons/react/24/outline";

export const metadata = {
  title: "My Channels - MediaHub",
};

export default async function InfluencerChannelsPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Fetch influencer's connected social channels
  const channels = await db.channel.findMany({
    where: { influencerId: session.user.id },
    include: { packages: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Info */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold font-space text-dark">My Channels</h1>
          <p className="text-sm text-muted font-inter mt-1">Manage your connected social accounts and packages.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/influencer/channels/new" className="btn btn-primary font-space">
            <PlusIcon className="w-4 h-4" /> Add Channel
          </Link>
        </div>
      </div>

      {/* Channels List */}
      {channels.length === 0 ? (
        <div className="card bg-card border-base rounded-lg p-6">
          <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
            <DevicePhoneMobileIcon className="w-12 h-12 text-muted mb-4" />
            <p className="font-space font-medium text-dark text-lg mb-1">No channels connected yet</p>
            <p className="text-muted text-sm max-w-sm">Connect your Instagram, TikTok, YouTube, or X channels to start receiving paid collaboration requests.</p>
            <Link href="/influencer/channels/new" className="btn btn-outline mt-4">
              Connect Channel
            </Link>
          </div>
        </div>
      ) : (
        <div className="channels-grid flex flex-col gap-6">
          {channels.map((channel) => (
            <div key={channel.id} className="card bg-card border-base rounded-lg p-6 relative">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-space font-bold text-dark text-lg">{channel.handle}</span>
                    <span className="badge badge-paused text-xs">
                      {channel.platform}
                    </span>
                  </div>
                  <span className="text-xs text-muted font-inter">Niche: {channel.niche} | Location: {channel.country}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-success text-sm font-medium">
                    <span className="w-2 h-2 rounded-full bg-success"></span> Active
                  </span>
                  <button className="btn btn-outline btn-sm text-dark">•••</button>
                </div>
              </div>

              {/* Data Table */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-muted">
                {/* Col 1 */}
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">Followers</span>
                    <span className="text-dark font-semibold text-md font-space">{channel.followers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Engagement Rate</span>
                    <span className="text-dark font-semibold text-md font-space">{channel.engagement}%</span>
                  </div>
                </div>

                {/* Col 2 */}
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-xs text-muted block mb-1">Completion rate</span>
                    <span className="text-dark font-medium text-sm">N/A</span>
                  </div>
                  <div>
                    <span className="text-xs text-muted block mb-1">Status</span>
                    <span className="text-warning font-medium text-sm">Pending moderation</span>
                  </div>
                </div>

                {/* Col 3: Packages */}
                <div className="flex flex-col gap-4">
                  <div className="border-b border-muted pb-2">
                    <span className="text-xs text-muted block mb-1">Social Packages</span>
                  </div>
                  {channel.packages.map((pkg) => (
                    <div key={pkg.id} className="flex justify-between items-center text-sm">
                      <span className="text-muted">{pkg.type} shoutout</span>
                      <span className="font-semibold text-dark">${pkg.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
