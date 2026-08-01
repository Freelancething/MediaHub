import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShareIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Referral Program - Adsy Publisher",
};

export default async function PublisherReferralPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const referralLink = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/register?ref=${session.user.id}`;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Breadcrumb & H1 */}
      <div className="mb-6">
        <span className="text-xs text-muted font-inter">Home &gt; Referral Program</span>
        <h1 className="text-2xl font-bold font-space text-dark mt-2">Referral Program</h1>
      </div>

      {/* Green Promo Box */}
      <div className="rounded-lg p-6 mb-6 flex justify-between items-center bg-green-accent" style={{ backgroundColor: '#8CF08A' }}>
        <p className="text-dark font-medium text-lg m-0 font-space">
          Earn a 10% commission by referring to Media Partner Hub.
        </p>
        <button className="btn btn-dark">Earn commission</button>
      </div>

      {/* Info Warning banner */}
      <div className="banner banner-info rounded-lg mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InformationCircleIcon className="w-5 h-5 text-primary" />
          <span>We partner with GainRock to manage referral metrics and payouts transparently.</span>
        </div>
      </div>

      {/* Grid of details cards */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Card 1 */}
        <div className="card bg-card border-base rounded-lg p-6">
          <h3 className="font-space font-bold text-dark text-lg mb-4">Getting an extra commission is as easy as 1-2-3</h3>
          <ol className="flex flex-col gap-3 pl-4 list-decimal text-sm text-muted font-inter">
            <li>Sign up with our partner referral system.</li>
            <li>Get and share your unique referral tracking link.</li>
            <li>Earn a lifetime 10% cash commission on their spendings.</li>
          </ol>
        </div>

        {/* Card 2 */}
        <div className="card bg-card border-base rounded-lg p-6">
          <h3 className="font-space font-bold text-dark text-lg mb-4">Your profit is real!</h3>
          <ul className="flex flex-col gap-3 pl-4 list-disc text-sm text-muted font-inter">
            <li>You receive 100% of publisher payouts.</li>
            <li>Get an extra 10% commission on top paid by Adsy directly.</li>
            <li>No maximum limits on payout thresholds.</li>
          </ul>
        </div>
      </div>

      {/* Referral Link Box */}
      <div className="card bg-card border-base rounded-lg p-6 mb-6">
        <h3 className="font-space font-semibold text-dark text-md mb-2">Your referral link</h3>
        <p className="text-xs text-muted font-inter mb-4">Share this link to invite other publishers or marketers to join the platform.</p>
        
        <div className="flex gap-2">
          <input className="input" type="text" readOnly value={referralLink} style={{ fontFamily: 'monospace', fontSize: '13px' }} />
          <button className="btn btn-primary font-inter">Copy link</button>
        </div>
      </div>
    </div>
  );
}
