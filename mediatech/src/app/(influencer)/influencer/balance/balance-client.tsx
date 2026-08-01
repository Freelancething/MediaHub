"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { 
  WalletIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  BanknotesIcon
} from "@heroicons/react/24/outline";
import { BalanceCards } from "@/components/ui/balance-cards";

interface BalanceClientProps {
  initialBalance: number;
  initialReserved: number;
  initialEarnings: number;
  transactions: any[];
  currentTab: string;
  onWithdrawalAction: (amount: number, method: string, details: string) => Promise<void>;
}

export default function BalanceClient({
  initialBalance,
  initialReserved,
  initialEarnings,
  transactions,
  currentTab,
  onWithdrawalAction,
}: BalanceClientProps) {
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<"paypal" | "wire">("paypal");
  const [amount, setAmount] = useState("50.00");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleRequestWithdrawal(e: React.FormEvent) {
    e.preventDefault();
    const withdrawValue = parseFloat(amount);
    if (isNaN(withdrawValue) || withdrawValue <= 0 || withdrawValue > initialBalance) {
      alert("Invalid withdrawal amount or insufficient balance.");
      return;
    }

    startTransition(async () => {
      try {
        const methodLabel = selectedMethod === "paypal" ? "PayPal" : "Bank Transfer";
        const details = selectedMethod === "paypal" ? paypalEmail : `${bankName} (${accountNumber})`;

        await onWithdrawalAction(withdrawValue, methodLabel, details);
        setIsWithdrawOpen(false);
        window.location.reload();
      } catch (err: any) {
        alert(err.message || "Withdrawal failed");
      }
    });
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Row */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold font-space text-dark">Balance</h1>
          <p className="text-sm text-muted font-inter mt-1">Request payouts and check transaction history logs.</p>
        </div>
        <button 
          onClick={() => setIsWithdrawOpen(true)}
          className="btn btn-primary flex items-center gap-2 font-space"
          disabled={initialBalance < 50}
        >
          <WalletIcon className="w-5 h-5" /> Request Withdrawal
        </button>
      </div>

      <BalanceCards 
        balance={initialBalance}
        reserved={initialReserved}
        thirdMetric={initialEarnings}
        thirdMetricLabel="Lifetime earnings"
      />

      {/* Transactions List */}
      <div className="bg-card border-base rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4 pb-2 border-b border-muted">
            <Link href="/influencer/balance?type=ALL" className={`status-tab pb-2 ${currentTab === 'ALL' ? 'active font-bold text-primary' : 'text-muted'}`}>All</Link>
            <Link href="/influencer/balance?type=DEPOSIT" className={`status-tab pb-2 ${currentTab === 'DEPOSIT' ? 'active font-bold text-primary' : 'text-muted'}`}>Earnings</Link>
            <Link href="/influencer/balance?type=WITHDRAWAL" className={`status-tab pb-2 ${currentTab === 'WITHDRAWAL' ? 'active font-bold text-primary' : 'text-muted'}`}>Payouts</Link>
          </div>
        </div>
        
        {transactions.length === 0 ? (
          <div className="empty-state py-12 flex flex-col items-center justify-center text-center">
            <WalletIcon className="w-12 h-12 text-muted mb-4" />
            <p className="font-space font-medium text-dark text-lg mb-1">No transactions found</p>
            <p className="text-muted text-sm max-w-sm">Complete sponsored brand deals or campaign shoutouts to build up your balance.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-inter text-sm">
              <thead>
                <tr className="border-b border-muted text-muted text-xs uppercase">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Description</th>
                  <th className="pb-3 font-semibold text-right">Amount</th>
                  <th className="pb-3 font-semibold text-right">Balance</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-muted">
                    <td className="py-4 text-muted">{new Date(tx.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 font-semibold text-dark">{tx.note || "Placement Earnings"}</td>
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

      {/* Withdrawal request Modal */}
      {isWithdrawOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,44,62,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }}>
          <div className="card bg-card rounded-xl p-8" style={{ width: '100%', maxWidth: '500px', border: '1px solid var(--color-border)', boxShadow: '0 20px 50px rgba(0,0,0,0.15)', margin: 'auto' }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold font-space text-dark">Request Withdrawal</h2>
              <button 
                onClick={() => setIsWithdrawOpen(false)}
                className="text-muted hover:text-dark font-bold text-lg"
              >
                ×
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              <button 
                onClick={() => setSelectedMethod("paypal")}
                className={`btn btn-sm flex flex-col items-center gap-1 p-3 ${selectedMethod === 'paypal' ? 'btn-primary' : 'btn-outline text-muted'}`}
                style={{ height: 'auto', borderRadius: '8px' }}
              >
                <span className="font-bold text-sm">P</span>
                <span className="text-xs">PayPal</span>
              </button>
              <button 
                onClick={() => setSelectedMethod("wire")}
                className={`btn btn-sm flex flex-col items-center gap-1 p-3 ${selectedMethod === 'wire' ? 'btn-primary' : 'btn-outline text-muted'}`}
                style={{ height: 'auto', borderRadius: '8px' }}
              >
                <BanknotesIcon className="w-5 h-5" />
                <span className="text-xs">Bank Transfer</span>
              </button>
            </div>

            <form onSubmit={handleRequestWithdrawal} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="text-sm font-medium text-dark block mb-2 font-inter">Withdrawal Amount ($)</label>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  required 
                  min="50" 
                  max={initialBalance}
                  className="input font-semibold" 
                />
              </div>

              {selectedMethod === "paypal" ? (
                <div>
                  <label className="text-sm font-medium text-dark block mb-2 font-inter">PayPal Email Address</label>
                  <input type="email" required value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} placeholder="paypal@example.com" className="input text-xs" />
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label className="text-sm font-medium text-dark block mb-2 font-inter">Bank Name</label>
                    <input type="text" required value={bankName} onChange={(e) => setBankName(e.target.value)} placeholder="Chase Manhattan Bank" className="input text-xs" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-dark block mb-2 font-inter">IBAN / Account Number</label>
                    <input type="text" required value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} placeholder="US89 1002 9382 1092 38" className="input text-xs" />
                  </div>
                </div>
              )}

              <button type="submit" disabled={isPending} className="btn btn-primary w-full mt-4" style={{ justifyContent: 'center' }}>
                Submit Payout Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
