"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { 
  WalletIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  CreditCardIcon,
  BanknotesIcon,
  QrCodeIcon
} from "@heroicons/react/24/outline";
import { BalanceCards } from "@/components/ui/balance-cards";

interface BalanceClientProps {
  initialBalance: number;
  initialReserved: number;
  initialBonus: number;
  transactions: any[];
  currentTab: string;
  urlQuery: string;
  onAddFundsAction: (amount: number, method: string) => Promise<void>;
}

export default function BalanceClient({
  initialBalance,
  initialReserved,
  initialBonus,
  transactions,
  currentTab,
  urlQuery,
  onAddFundsAction,
}: BalanceClientProps) {
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"card" | "paypal" | "wire" | "crypto">("card");
  const [cryptoCoin, setCryptoCoin] = useState<"btc" | "eth" | "usdt" | "usdc">("btc");
  const [amount, setAmount] = useState("100.00");
  const [isPending, startTransition] = useTransition();

  const cryptoAddresses = {
    btc: "bc1qxy2kg3kytsp4q43rt5t83ts4s63rt5t83ts",
    eth: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    usdt: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    usdc: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
  };

  async function handleAddFunds(e: React.FormEvent) {
    e.preventDefault();
    const paymentVal = parseFloat(amount);
    if (isNaN(paymentVal) || paymentVal <= 0) return;

    startTransition(async () => {
      let methodLabel = "Credit Card";
      if (selectedMethod === "paypal") methodLabel = "PayPal";
      if (selectedMethod === "wire") methodLabel = "Bank Wire";
      if (selectedMethod === "crypto") methodLabel = `Crypto (${cryptoCoin.toUpperCase()})`;

      await onAddFundsAction(paymentVal, methodLabel);
      setIsTopUpOpen(false);
      window.location.reload();
    });
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumbs & Title */}
      <div className="mb-6 font-inter text-xs text-muted">
        <span>Home &gt; Main balance</span>
      </div>

      {/* Warning banner */}
      <div className="banner banner-promo rounded-lg mb-6 flex items-center justify-between" style={{ backgroundColor: '#FFF4D9', borderBottom: '1px solid #F5A72340' }}>
        <div className="flex items-center gap-2">
          <span>🎁</span>
          <span>Limited time offer! Get 3% bonus for topping up via Bank Wire Transfer. <Link href="/advertiser/balance" className="text-primary font-semibold hover:underline">Add funds now.</Link></span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-space text-dark">Balance <span className="text-xs font-semibold text-primary bg-[#eef0fd] px-2 py-1 rounded ml-2" style={{ verticalAlign: 'middle' }}>FAQ</span></h1>
      </div>

      {/* Monetization Action Banner */}
      <div className="monetize-cta-banner rounded-lg p-6 mb-8 flex justify-between items-center" style={{ backgroundColor: '#8CF08A' }}>
        <p className="text-dark font-semibold text-lg m-0 font-space">
          Need more funds?
        </p>
        <button 
          onClick={() => setIsTopUpOpen(true)}
          className="btn btn-dark btn-lg font-space font-semibold" 
          style={{ borderRadius: '8px', padding: '12px 24px' }}
        >
          Add funds
        </button>
      </div>

      <BalanceCards 
        balance={initialBalance}
        reserved={initialReserved}
        thirdMetric={initialBonus}
        thirdMetricLabel="Bonus balance"
      />

      {/* Query Search Form */}
      <div className="mb-6">
        <form method="GET" action="/advertiser/balance" className="flex items-center gap-2 max-w-sm bg-card border-base rounded-lg px-3 py-2">
          <input 
            name="query" 
            className="w-full text-sm font-inter text-dark outline-none bg-transparent" 
            type="text" 
            placeholder="Task ID or Content order ID" 
            defaultValue={urlQuery}
          />
        </form>
      </div>

      {/* Transactions History Section */}
      <div className="bg-card border-base rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 pb-2 border-b border-muted">
            <Link href="/advertiser/balance?type=ALL" className={`status-tab pb-2 ${currentTab === 'ALL' ? 'active font-bold text-primary' : 'text-muted'}`}>All Payments</Link>
            <Link href="/advertiser/balance?type=TOPUP" className={`status-tab pb-2 ${currentTab === 'TOPUP' ? 'active font-bold text-primary' : 'text-muted'}`}>Added funds</Link>
            <Link href="/advertiser/balance?type=WITHDRAWAL" className={`status-tab pb-2 ${currentTab === 'WITHDRAWAL' ? 'active font-bold text-primary' : 'text-muted'}`}>Product Payments</Link>
            <Link href="/advertiser/balance?type=REFUND" className={`status-tab pb-2 ${currentTab === 'REFUND' ? 'active font-bold text-primary' : 'text-muted'}`}>Refunds</Link>
          </div>
        </div>

        {transactions.length === 0 ? (
          <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
            <span className="text-3xl mb-4">📋</span>
            <p className="font-space font-medium text-dark text-lg mb-1">No transaction records found</p>
            <p className="text-muted text-sm max-w-sm">No transaction matches your search parameters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-inter text-sm">
              <thead>
                <tr className="border-b border-muted text-muted text-xs uppercase">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Transaction description</th>
                  <th className="pb-3 font-semibold text-right">Transaction amount</th>
                  <th className="pb-3 font-semibold text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-muted">
                    <td className="py-4 text-muted">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 font-semibold text-dark">{tx.note || "System Deposit"}</td>
                    <td className={`py-4 text-right font-bold ${tx.amount < 0 ? 'text-danger' : 'text-success'}`}>
                      {tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toFixed(2)}
                    </td>
                    <td className="py-4 text-right text-muted">-</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Deposit Modal */}
      {isTopUpOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,44,62,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div className="card bg-card rounded-xl p-8" style={{ width: '100%', maxWidth: '650px', border: '1px solid var(--color-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', margin: 'auto' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-space text-dark">Top Up Balance</h2>
              <button 
                onClick={() => setIsTopUpOpen(false)}
                className="text-muted hover:text-dark font-bold text-lg"
              >
                ×
              </button>
            </div>

            {/* Methods Selectors Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              <button 
                onClick={() => setSelectedMethod("card")}
                className={`btn btn-sm flex flex-col items-center gap-1 p-3 ${selectedMethod === 'card' ? 'btn-primary' : 'btn-outline text-muted'}`}
                style={{ height: 'auto', borderRadius: '8px' }}
              >
                <CreditCardIcon className="w-5 h-5" />
                <span className="text-xs font-semibold">Card</span>
              </button>
              <button 
                onClick={() => setSelectedMethod("paypal")}
                className={`btn btn-sm flex flex-col items-center gap-1 p-3 ${selectedMethod === 'paypal' ? 'btn-primary' : 'btn-outline text-muted'}`}
                style={{ height: 'auto', borderRadius: '8px' }}
              >
                <span className="font-bold text-sm">P</span>
                <span className="text-xs font-semibold">PayPal</span>
              </button>
              <button 
                onClick={() => setSelectedMethod("wire")}
                className={`btn btn-sm flex flex-col items-center gap-1 p-3 ${selectedMethod === 'wire' ? 'btn-primary' : 'btn-outline text-muted'}`}
                style={{ height: 'auto', borderRadius: '8px' }}
              >
                <BanknotesIcon className="w-5 h-5" />
                <span className="text-xs font-semibold">Wire</span>
              </button>
              <button 
                onClick={() => setSelectedMethod("crypto")}
                className={`btn btn-sm flex flex-col items-center gap-1 p-3 ${selectedMethod === 'crypto' ? 'btn-primary' : 'btn-outline text-muted'}`}
                style={{ height: 'auto', borderRadius: '8px' }}
              >
                <QrCodeIcon className="w-5 h-5" />
                <span className="text-xs font-semibold">Crypto</span>
              </button>
            </div>

            {/* Forms block based on selected deposit method */}
            {selectedMethod === "card" && (
              <form onSubmit={handleAddFunds} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="text-sm font-medium text-dark block mb-2 font-inter">Deposit Amount ($)</label>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                    min="10" 
                    className="input font-semibold" 
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="text-sm font-medium text-dark block mb-2 font-inter">Card Number</label>
                    <input type="text" required placeholder="4242 4242 4242 4242" className="input text-xs" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark block mb-2 font-inter">Expiry</label>
                    <input type="text" required placeholder="MM/YY" className="input text-xs" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark block mb-2 font-inter">CVV</label>
                    <input type="text" required placeholder="123" className="input text-xs" />
                  </div>
                </div>
                <button type="submit" disabled={isPending} className="btn btn-primary w-full mt-4" style={{ justifyContent: 'center' }}>
                  Pay & Deposit ${amount}
                </button>
              </form>
            )}

            {selectedMethod === "paypal" && (
              <form onSubmit={handleAddFunds} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="text-sm font-medium text-dark block mb-2 font-inter">Deposit Amount ($)</label>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                    min="10" 
                    className="input font-semibold" 
                  />
                </div>
                <div className="bg-app p-4 rounded-lg text-center text-sm font-inter text-muted">
                  You will be redirected to PayPal to complete your checkout flow securely.
                </div>
                <button type="submit" disabled={isPending} className="btn btn-primary w-full mt-4" style={{ justifyContent: 'center', backgroundColor: '#F5A723' }}>
                  Checkout with PayPal
                </button>
              </form>
            )}

            {selectedMethod === "wire" && (
              <form onSubmit={handleAddFunds} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="bg-[#d6f5d0] p-4 rounded-lg text-sm text-success mb-2 font-semibold">
                  🎁 Bank Wire Bonus: Deposits via bank wire receive a 3% cash bonus added to balance!
                </div>
                <div>
                  <label className="text-sm font-medium text-dark block mb-2 font-inter">Wire Amount ($)</label>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                    min="10" 
                    className="input font-semibold" 
                  />
                </div>
                <div className="flex flex-col gap-3 text-sm text-dark bg-app p-4 rounded-lg">
                  <div className="flex justify-between"><strong>Bank Name:</strong> <span>Chase Manhattan Bank</span></div>
                  <div className="flex justify-between"><strong>Beneficiary:</strong> <span>Adsy Media Hub LLC</span></div>
                  <div className="flex justify-between"><strong>IBAN / Account:</strong> <span>US89 1002 9382 1092 38</span></div>
                  <div className="flex justify-between"><strong>Swift Code:</strong> <span>CHASUS33XX</span></div>
                </div>
                <p className="text-xs text-muted leading-relaxed">Please state your account email address as reference in the wire description logs. Wire transfers require manual bank processing and take 1-3 business days to clear.</p>
                <button type="submit" disabled={isPending} className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Confirm Manual Deposit of ${amount}
                </button>
              </form>
            )}

            {selectedMethod === "crypto" && (
              <form onSubmit={handleAddFunds} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setCryptoCoin("btc")} className={`btn btn-sm ${cryptoCoin === 'btc' ? 'btn-primary' : 'btn-outline'}`}>BTC</button>
                  <button type="button" onClick={() => setCryptoCoin("eth")} className={`btn btn-sm ${cryptoCoin === 'eth' ? 'btn-primary' : 'btn-outline'}`}>ETH</button>
                  <button type="button" onClick={() => setCryptoCoin("usdt")} className={`btn btn-sm ${cryptoCoin === 'usdt' ? 'btn-primary' : 'btn-outline'}`}>USDT</button>
                  <button type="button" onClick={() => setCryptoCoin("usdc")} className={`btn btn-sm ${cryptoCoin === 'usdc' ? 'btn-primary' : 'btn-outline'}`}>USDC</button>
                </div>
                <div>
                  <label className="text-sm font-medium text-dark block mb-2 font-inter">Deposit Value ($)</label>
                  <input 
                    type="number" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required 
                    min="10" 
                    className="input font-semibold" 
                  />
                </div>
                <div className="bg-app p-4 rounded-lg text-center">
                  <div className="w-24 h-24 bg-white border border-border rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <span className="text-muted text-xs">QR Code</span>
                  </div>
                  <span className="text-xs text-muted block mb-1 uppercase font-semibold">{cryptoCoin} Address</span>
                  <input 
                    type="text" 
                    readOnly 
                    value={cryptoAddresses[cryptoCoin]} 
                    className="input text-center text-xs font-mono select-all" 
                  />
                </div>
                <p className="text-xs text-muted leading-relaxed">Deposit only {cryptoCoin.toUpperCase()} to this address. Sending other tokens will result in permanent loss.</p>
                <button type="submit" disabled={isPending} className="btn btn-primary w-full" style={{ justifyContent: 'center' }}>
                  Confirm Crypto Deposit of ${amount}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
