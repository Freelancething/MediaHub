import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import BalanceClient from "./balance-client";

export const metadata = {
  title: "Balance - Adsy",
};

interface SearchParams {
  type?: string;
  query?: string;
}

export default async function AdvertiserBalancePage({
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
  const urlQuery = resolvedParams.query || "";

  // Fetch advertiser balance details
  const advertiser = await db.user.findUnique({
    where: { id: session.user.id },
    select: { balance: true, reserved: true, bonus: true }
  });

  const balance = advertiser?.balance ?? 0;
  const reserved = advertiser?.reserved ?? 0;
  const bonus = advertiser?.bonus ?? 0;

  // Fetch transaction history
  const transactions = await db.transaction.findMany({
    where: {
      userId: session.user.id,
      ...(currentTab !== "ALL" ? { type: currentTab as any } : {}),
      ...(urlQuery ? {
        note: {
          contains: urlQuery,
          mode: "insensitive" as const
        }
      } : {})
    },
    orderBy: { createdAt: "desc" },
  });

  // Server Action to add funds to balance
  async function handleAddFundsAction(amountValue: number, methodLabel: string) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) return;

    const { db } = await import("@/lib/db");
    
    // Retrieve current user balance
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { balance: true }
    });

    const currentBalance = user?.balance ?? 0;
    const finalDeposit = amountValue;
    const finalBalance = currentBalance + finalDeposit;

    // Transaction updates balance and inserts transaction history record
    await db.$transaction([
      db.user.update({
        where: { id: session.user.id },
        data: { balance: finalBalance }
      }),
      db.transaction.create({
        data: {
          userId: session.user.id,
          type: "TOPUP",
          amount: finalDeposit,
          note: `Funds added via ${methodLabel}`
        }
      })
    ]);
  }

  return (
    <BalanceClient 
      initialBalance={balance}
      initialReserved={reserved}
      initialBonus={bonus}
      transactions={transactions}
      currentTab={currentTab}
      urlQuery={urlQuery}
      onAddFundsAction={handleAddFundsAction}
    />
  );
}
