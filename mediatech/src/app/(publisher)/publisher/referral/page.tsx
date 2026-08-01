import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Referral Program - Adsy",
};

export default async function PublisherReferralPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const referralLink = `${process.env.NEXTAUTH_URL ?? 'http://localhost:3000'}/register?ref=${session.user.id}`;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb & Title */}
      <div className="mb-6 font-inter text-xs text-muted">
        <span>Home &gt; Referral Program</span>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-space text-dark">Referral Program</h1>
      </div>

      {/* Green Promo Box */}
      <div className="rounded-lg p-6 mb-6 flex justify-between items-center" style={{ backgroundColor: '#8CF08A' }}>
        <p className="text-dark font-medium text-lg m-0 font-space">
          Earn a 10% commission by referring to Media Partner Hub.
        </p>
        <button className="btn btn-dark font-semibold font-space" style={{ borderRadius: '8px', padding: '10px 20px' }}>Earn commission</button>
      </div>

      {/* Blue info bar */}
      <div className="flex items-center gap-3 p-4 rounded-lg mb-6 border border-primary bg-[#EEF0FD]">
        <InformationCircleIcon className="w-5 h-5 text-primary flex-shrink-0" />
        <span className="text-sm font-inter text-dark">
          Please note that the Referral program is brought to you by <Link href="https://gainrock.com" target="_blank" className="text-primary hover:underline font-medium">GainRock</Link>. As soon as you click on the &quot;Earn commission&quot; button, you will be redirected to <Link href="https://gainrock.com" target="_blank" className="text-primary hover:underline font-medium">GainRock.com</Link>.
        </span>
      </div>

      {/* How it works boxes */}
      <div className="flex flex-col gap-6 mb-6">
        {/* Easy 1-2-3 steps list card */}
        <div className="card bg-card border-base rounded-lg p-6">
          <h3 className="font-space font-semibold text-dark text-md mb-6">Getting an extra commission is as easy as 1-2-3.</h3>
          
          <div className="flex flex-col gap-4 font-inter text-sm text-dark">
            <div className="p-4 rounded-lg bg-app border border-border">
              1. Sign up with a <Link href="https://gainrock.com" target="_blank" className="text-primary hover:underline">referral program</Link> via GainRock.
            </div>
            <div className="p-4 rounded-lg bg-app border border-border">
              2. Share the referral link and encourage your referrals to sign up with Media Partner Hub.
            </div>
            <div className="p-4 rounded-lg bg-app border border-border">
              3. Earn a commission as soon as referrals start using Media Partner Hub.
            </div>
          </div>
        </div>

        {/* Profit box card */}
        <div className="card bg-card border-base rounded-lg p-6">
          <h3 className="font-space font-semibold text-dark text-md mb-6">Your profit is real!</h3>
          <div className="p-5 rounded-lg bg-app border border-border text-sm font-inter leading-relaxed text-dark">
            <p className="mb-2"><strong>You get 100% of payments</strong> made by buyers who purchase posts on your websites.</p>
            <p>Moreover, <strong>Media Partner Hub will pay you a 10% extra commission</strong> for every completed task made by your referred customers from your blogs!</p>
          </div>
        </div>

        {/* How do you attract referrals box */}
        <div className="card bg-card border-base rounded-lg p-6">
          <h3 className="font-space font-semibold text-dark text-md mb-4">How do you attract referrals?</h3>
          <div className="p-5 rounded-lg bg-app border border-border text-sm font-inter leading-relaxed text-dark">
            <p className="mb-2">All you have to do is to <strong>place the referral link on your site</strong> and write a call-to-action phrase. It may sound like this:</p>
            <p className="italic text-muted mb-3">&quot;Buy posts from us via Media Partner Hub guest posting service.&quot;</p>
            <p>Use a button with a referral link or add a link to the phrase you are using to start earning.</p>
          </div>
        </div>

        {/* Why is referral program beneficial box */}
        <div className="card bg-card border-base rounded-lg p-6">
          <h3 className="font-space font-semibold text-dark text-md mb-4">Why is Media Partner Hub&apos;s referral program so beneficial?</h3>
          <div className="p-5 rounded-lg bg-app border border-border text-sm font-inter leading-relaxed text-dark">
            <p className="mb-2">You guaranteedly <strong>get a 10% lifetime commission</strong> from all other completed tasks made by your customers from other publishers!</p>
            <p>Plus, it will be much more convenient for you to get all the orders in one place, manage them all, communicate with buyers, complete orders, etc.</p>
          </div>
        </div>

        {/* Call to action footer button */}
        <div className="flex justify-between items-center bg-[#81F5FF20] border border-[#81F5FF60] p-6 rounded-lg">
          <div>
            <h4 className="font-space font-semibold text-dark text-md mb-1">How do you participate in the Referral program?</h4>
            <p className="text-xs text-muted font-inter">Getting started with the Media Partner Hub referral program is worry-free. Press the button to participate.</p>
          </div>
          <button className="btn btn-dark font-semibold font-space" style={{ borderRadius: '8px', padding: '12px 24px' }}>
            Earn commission now
          </button>
        </div>
      </div>
    </div>
  );
}
