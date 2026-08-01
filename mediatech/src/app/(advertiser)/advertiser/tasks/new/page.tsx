import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShoppingBagIcon, GlobeAltIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "New Purchase Placement - Adsy Advertiser",
};

interface PageProps {
  searchParams: Promise<{ platformId?: string; channelId?: string }>;
}

export default async function NewTaskPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const { platformId, channelId } = await searchParams;

  let platform: any = null;
  let channel: any = null;
  let targetPrice = 0;

  // Retrieve selected platform or influencer details
  if (platformId) {
    platform = await db.platform.findUnique({
      where: { id: platformId },
      include: { packages: true },
    });
    const mainPkg = platform?.packages.find((p: any) => p.type === "ARTICLE_POSTING");
    targetPrice = mainPkg?.price || 10.00;
  } else if (channelId) {
    channel = await db.channel.findUnique({
      where: { id: channelId },
      include: { packages: true },
    });
    const mainPkg = channel?.packages.find((p: any) => p.type === "POST");
    targetPrice = mainPkg?.price || 25.00;
  }

  if (!platform && !channel) {
    redirect("/advertiser/sites");
  }

  // Fetch advertiser wallet details
  const advertiser = await db.user.findUnique({
    where: { id: session.user.id },
    select: { balance: true }
  });

  const walletBalance = advertiser?.balance ?? 0;
  const insuﬃcientFunds = walletBalance < targetPrice;

  // Server action to create order task
  async function handleCreateOrder(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) return;

    const targetUrl = formData.get("targetUrl") as string;
    const anchorText = formData.get("anchorText") as string;
    const brief = formData.get("brief") as string;

    const { db } = await import("@/lib/db");

    // Fetch user and check balance again
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { balance: true, reserved: true }
    });

    if (!user || user.balance < targetPrice) {
      redirect("/advertiser/wallet?error=insufficient_funds");
    }

    // Begin transaction: deduct balance, reserve funds, create task
    await db.$transaction([
      db.user.update({
        where: { id: session.user.id },
        data: {
          balance: { decrement: targetPrice },
          reserved: { increment: targetPrice }
        }
      }),
      db.task.create({
        data: {
          advertiserId: session.user.id,
          sellerId: platform ? platform.publisherId : (channel ? channel.influencerId : ""),
          sellerType: platform ? "PUBLISHER" : "INFLUENCER",
          platformId: platformId || null,
          channelId: channelId || null,
          brief,
          anchorText,
          targetUrl,
          price: targetPrice,
          platformFee: targetPrice * 0.1, // 10% platform commission
          sellerEarning: targetPrice * 0.9,
          status: "TASK_REVIEW"
        }
      })
    ]);

    redirect("/advertiser/tasks");
  }

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="mb-6">
        <Link href="/advertiser/sites" className="text-sm text-primary hover:underline">
          ← Back to Marketplace
        </Link>
        <h1 className="text-2xl font-bold font-space text-dark mt-2">Create Placement Order</h1>
      </div>

      {/* Product Summary Card */}
      <div className="card bg-card border-base rounded-lg p-6 mb-6">
        <h3 className="font-space font-semibold text-dark text-md mb-4">Placement Summary</h3>
        <div className="flex justify-between items-center text-sm font-inter">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {platform ? <GlobeAltIcon className="w-5 h-5 text-primary" /> : <UserCircleIcon className="w-5 h-5 text-primary" />}
              <span className="font-semibold text-dark">{platform ? platform.url : channel?.handle}</span>
            </div>
            <span className="text-muted">Type: {platform ? "Website Placement" : "Social Shoutout"}</span>
          </div>
          <div className="text-right">
            <span className="text-muted block text-xs">Total cost</span>
            <span className="text-dark font-bold text-lg font-space">${targetPrice.toFixed(2)}</span>
          </div>
        </div>

        {insuﬃcientFunds && (
          <div className="banner banner-promo rounded-lg mt-4 flex items-center justify-between" style={{ backgroundColor: '#FFF4D9' }}>
            <span className="text-xs text-dark font-inter">
              Your wallet balance (${walletBalance.toFixed(2)}) is insufficient. Please <Link href="/advertiser/wallet" className="text-primary font-semibold hover:underline">top up balance</Link> before booking.
            </span>
          </div>
        )}
      </div>

      {/* Brief Form */}
      <div className="card bg-card border-base rounded-lg p-6">
        <form action={handleCreateOrder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="text-sm font-medium text-dark block mb-2 font-inter">Target Promoted URL</label>
            <input name="targetUrl" type="url" required placeholder="https://yourbrand.com/landing-page" className="input" />
          </div>

          <div>
            <label className="text-sm font-medium text-dark block mb-2 font-inter">Anchor Text</label>
            <input name="anchorText" type="text" required placeholder="Best marketing tools" className="input" />
          </div>

          <div>
            <label className="text-sm font-medium text-dark block mb-2 font-inter">Content Brief & Guidelines</label>
            <textarea 
              name="brief" 
              required 
              rows={5}
              placeholder="Provide writing guidelines, target keywords, topics to cover, or specific instructions for the publisher." 
              className="input"
              style={{ resize: 'vertical', fontFamily: 'var(--font-inter)' }}
            />
          </div>

          <button 
            type="submit" 
            disabled={insuﬃcientFunds}
            className="btn btn-primary font-space font-semibold mt-4" 
            style={{ justifyContent: 'center' }}
          >
            Confirm & Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
