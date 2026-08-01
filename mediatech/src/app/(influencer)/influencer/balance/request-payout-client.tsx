"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { 
  InformationCircleIcon 
} from "@heroicons/react/24/outline";

interface RequestPayoutClientProps {
  initialBalance: number;
  onWithdrawalAction: (amount: number, method: string, details: string) => Promise<void>;
  role: "publisher" | "influencer";
}

export default function RequestPayoutClient({
  initialBalance,
  onWithdrawalAction,
  role
}: RequestPayoutClientProps) {
  const [activeTab, setActiveTab] = useState<"usdt" | "paypal">("usdt");
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    if (withdrawAmount > initialBalance) {
      alert("Insufficient balance available");
      return;
    }

    startTransition(async () => {
      try {
        const method = activeTab === "usdt" ? "USDT (TRC20)" : "PayPal";
        const details = activeTab === "usdt" ? address : paypalEmail;
        await onWithdrawalAction(withdrawAmount, method, details);
      } catch (err: any) {
        alert(err.message || "Payout request failed");
      }
    });
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb & Title */}
      <div className="mb-4 font-inter text-xs text-muted">
        <span>Home &gt; Balance &gt; Request earnings</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold font-space text-dark">Request earnings</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border mb-6 font-inter text-sm">
        <button 
          onClick={() => setActiveTab("usdt")}
          className={`pb-3 font-semibold ${activeTab === "usdt" ? "text-primary border-b-2 border-primary" : "text-muted"}`}
        >
          USDT (TRC20, TRX Network)
        </button>
        <button 
          onClick={() => setActiveTab("paypal")}
          className={`pb-3 font-semibold ${activeTab === "paypal" ? "text-primary border-b-2 border-primary" : "text-muted"}`}
        >
          PayPal
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Fields Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: '24px' }} className="mb-6">
          {/* Card left */}
          <div className="card bg-card border-base rounded-lg p-6 flex flex-col justify-center">
            <span className="text-3xl font-bold text-dark font-space">${initialBalance.toFixed(2)}</span>
            <span className="text-xs text-muted font-inter mt-1">Funds available</span>
          </div>

          {/* Amount input */}
          <div>
            <label className="text-xs font-semibold text-dark block mb-2 font-inter">Amount you&apos;d like to get</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-muted">$</span>
              <input 
                type="number" 
                required
                min="50"
                max={initialBalance}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="input" 
                style={{ paddingLeft: '24px' }}
              />
            </div>
          </div>

          {/* Details input */}
          {activeTab === "usdt" ? (
            <div>
              <label className="text-xs font-semibold text-dark block mb-2 font-inter">USDT (TRC20) address*</label>
              <input 
                type="text" 
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your USDT address"
                className="input" 
              />
            </div>
          ) : (
            <div>
              <label className="text-xs font-semibold text-dark block mb-2 font-inter">PayPal email address*</label>
              <input 
                type="email" 
                required
                value={paypalEmail}
                onChange={(e) => setPaypalEmail(e.target.value)}
                placeholder="Enter your PayPal email"
                className="input" 
              />
            </div>
          )}
        </div>

        {/* Info alerts */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-3 p-4 rounded-lg border border-primary bg-[#EEF0FD]">
            <InformationCircleIcon className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm font-inter text-dark">Your billing details here</span>
          </div>

          {activeTab === "usdt" && (
            <div className="flex gap-3 p-6 rounded-lg border border-primary bg-[#EEF0FD] text-xs font-inter leading-relaxed text-dark">
              <InformationCircleIcon className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="mb-2">We will <strong>NOT</strong> be able to recover your funds if you indicate a wrong address or network. We only provide payments for USDT (TRC20) Tron Network addresses. (NOT ERC20 or any other networks.)</p>
                <p className="mb-2">If you&apos;re going to accept USDT to a centralized exchange, then you need to select Deposit -&gt; Cryptocurrencies -&gt; USDT -&gt; then select TRC20 network. If the generated address to which you&apos;re going to accept USDT starts with the letter T (for example TY1ctya2725wD3xAxRJJMgHmhyDhwfner24) - it means it is in TRC20 network, so this is the right network. TIP: you can always send yourself a small amount to this address first to make sure it is a correct address.</p>
                <p>How to check whether you&apos;ve received funds to your USDT wallet? Use <Link href="https://tronscan.org" target="_blank" className="text-primary hover:underline">https://tronscan.org/</Link>: enter your wallet ID in the &quot;search&quot; field and press &quot;Enter&quot;. There you&apos;ll find all the transactions received.</p>
              </div>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="btn btn-primary font-space font-semibold"
          style={{ padding: '12px 24px', borderRadius: '8px' }}
        >
          {isPending ? "Processing..." : "Request earnings"}
        </button>
      </form>
    </div>
  );
}
