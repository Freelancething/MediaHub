import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { BalanceClient } from "@/components/balance/balance-client";

export const metadata = {
  title: "Balance - MediaHub",
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
    
    const finalDeposit = amountValue;

    // Transaction atomically increments balance to prevent race conditions
    await db.$transaction([
      db.user.update({
        where: { id: session.user.id },
        data: { balance: { increment: finalDeposit } }
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

    // Notify user of successful top-up
    await db.notification.create({
      data: {
        userId: session.user.id,
        type: "PAYMENT",
        title: "Balance topped up",
        body: `$${finalDeposit.toFixed(2)} was successfully added to your balance via ${methodLabel}.`,
        link: "/advertiser/balance",
      }
    });
  }

  return (
    <BalanceClient
      initialBalance={balance}
      initialReserved={reserved}
      initialEarnings={bonus}
      transactions={transactions}
      currentTab={currentTab}
      onAddFundsAction={handleAddFundsAction}
      basePath="advertiser"
    />
  );
}
