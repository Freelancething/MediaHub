import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Referral Program - Adsy Influencer",
};

export default async function InfluencerReferralPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const referralLink = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/register?ref=${session.user.id}`;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div className="mb-6">
        <span className="text-xs text-muted font-inter">Home &gt; Referral Program</span>
        <h1 className="text-2xl font-bold font-space text-dark mt-2">Referral Program</h1>
      </div>

      <div className="rounded-lg p-6 mb-6 flex justify-between items-center bg-green-accent" style={{ backgroundColor: '#8CF08A' }}>
        <p className="text-dark font-medium text-lg m-0 font-space">
          Invite other creators & earn a 10% commission on referrals.
        </p>
        <button className="btn btn-dark">Start Earning</button>
      </div>

      <div className="banner banner-info rounded-lg mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InformationCircleIcon className="w-5 h-5 text-primary" />
          <span>Track all commission conversions transparently in real-time.</span>
        </div>
      </div>

      <div className="card bg-card border-base rounded-lg p-6 mb-6">
        <h3 className="font-space font-semibold text-dark text-md mb-2">Your Influencer referral link</h3>
        <div className="flex gap-2 mt-4">
          <input className="input" type="text" readOnly value={referralLink} style={{ fontFamily: 'monospace', fontSize: '13px' }} />
          <button className="btn btn-primary font-inter">Copy link</button>
        </div>
      </div>
    </div>
  );
}
