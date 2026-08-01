import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BalanceClient } from "./balance-client";
import RequestPayoutClient from "./request-payout-client";

export const metadata = {
  title: "My Balance - Adsy",
};

interface SearchParams {
  type?: string;
  view?: string;
  action?: string;
}

export default async function InfluencerBalancePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const resolvedParams = await searchParams;
  const currentTab = resolvedParams.type || "ALL";
  const activeView = (resolvedParams.view || "main") as "main" | "reserved" | "bonus";
  const isRequestAction = resolvedParams.action === "request";

  // Fetch influencer details
  const influencer = await db.user.findUnique({
    where: { id: session.user.id },
    select: { balance: true, reserved: true, earnings: true }
  });

  const balance = influencer?.balance ?? 0;
  const reserved = influencer?.reserved ?? 0;
  const earnings = influencer?.earnings ?? 0;

  // Fetch transaction history
  const transactions = await db.transaction.findMany({
    where: {
      userId: session.user.id,
      ...(currentTab !== "ALL" ? { type: currentTab as any } : {})
    },
    orderBy: { createdAt: "desc" },
  });

  // Server Action to request payout
  async function handleRequestPayoutAction(amountValue: number, methodLabel: string, details: string) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) return;

    const { db } = await import("@/lib/db");

    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { balance: true }
    });

    if (!user || user.balance < amountValue) {
      throw new Error("Insufficient funds");
    }

    const finalBalance = user.balance - amountValue;

    // Transaction reduces balance, creates transaction log
    await db.$transaction([
      db.user.update({
        where: { id: session.user.id },
        data: { balance: finalBalance }
      }),
      db.transaction.create({
        data: {
          userId: session.user.id,
          type: "WITHDRAWAL",
          amount: -amountValue,
          note: `Withdrawal payout requested via ${methodLabel} (${details})`
        }
      })
    ]);
    redirect("/influencer/balance");
  }

  if (isRequestAction) {
    return (
      <RequestPayoutClient 
        initialBalance={balance}
        onWithdrawalAction={handleRequestPayoutAction}
        role="influencer"
      />
    );
  }

  return (
    <BalanceClient 
      initialBalance={balance}
      initialReserved={reserved}
      initialEarnings={earnings}
      transactions={transactions}
      currentTab={currentTab}
      onWithdrawalAction={handleRequestPayoutAction}
      activeBalanceType={activeView}
    />
  );
}
