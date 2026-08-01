/**
 * Notification helper — create platform notifications for key task events.
 * Import in server actions to keep notification logic centralised.
 */

import { db } from "@/lib/db";

type NotifType = "TASK_UPDATE" | "PAYMENT" | "MESSAGE" | "SYSTEM";

interface CreateNotifInput {
  userId: string;
  type: NotifType;
  title: string;
  body: string;
  link?: string;
}

export async function createNotification(input: CreateNotifInput) {
  await db.notification.create({
    data: {
      userId: input.userId,
      type: input.type,
      title: input.title,
      body: input.body,
      link: input.link,
    },
  });
}

// ── Task event helpers ─────────────────────────────────────────

export async function notifyNewTask(taskId: string, sellerId: string, platformLabel: string) {
  await createNotification({
    userId: sellerId,
    type: "TASK_UPDATE",
    title: "New placement order received",
    body: `You have a new order for ${platformLabel}. Review and accept it to get started.`,
    link: `/publisher/tasks/${taskId}`,
  });
}

export async function notifyNewDeal(taskId: string, sellerId: string, channelLabel: string) {
  await createNotification({
    userId: sellerId,
    type: "TASK_UPDATE",
    title: "New brand deal received",
    body: `You have a new brand deal request for ${channelLabel}. Review and accept to begin.`,
    link: `/influencer/tasks/${taskId}`,
  });
}

export async function notifyTaskAccepted(taskId: string, advertiserId: string, sellerName: string) {
  await createNotification({
    userId: advertiserId,
    type: "TASK_UPDATE",
    title: "Order accepted",
    body: `${sellerName} accepted your placement order and has started working on it.`,
    link: `/advertiser/tasks/${taskId}`,
  });
}

export async function notifyTaskRejected(taskId: string, advertiserId: string, sellerName: string) {
  await createNotification({
    userId: advertiserId,
    type: "TASK_UPDATE",
    title: "Order declined",
    body: `${sellerName} declined your order. Your funds have been refunded to your balance.`,
    link: `/advertiser/tasks/${taskId}`,
  });
}

export async function notifyDeliverableSubmitted(taskId: string, advertiserId: string, sellerName: string) {
  await createNotification({
    userId: advertiserId,
    type: "TASK_UPDATE",
    title: "Deliverable submitted — review needed",
    body: `${sellerName} submitted the deliverable. Please review and approve or request revisions.`,
    link: `/advertiser/tasks/${taskId}`,
  });
}

export async function notifyTaskApproved(taskId: string, sellerId: string, amount: number) {
  await createNotification({
    userId: sellerId,
    type: "PAYMENT",
    title: "Payment released — order approved!",
    body: `Your placement was approved. $${amount.toFixed(2)} has been credited to your balance.`,
    link: `/publisher/tasks/${taskId}`,
  });
}

export async function notifyTaskApprovedInfluencer(taskId: string, sellerId: string, amount: number) {
  await createNotification({
    userId: sellerId,
    type: "PAYMENT",
    title: "Payment released — deal approved!",
    body: `Your content was approved. $${amount.toFixed(2)} has been credited to your balance.`,
    link: `/influencer/tasks/${taskId}`,
  });
}

export async function notifyRevisionRequested(taskId: string, sellerId: string, note: string, isInfluencer = false) {
  await createNotification({
    userId: sellerId,
    type: "TASK_UPDATE",
    title: "Revision requested",
    body: `The advertiser requested a revision: "${note.slice(0, 120)}${note.length > 120 ? "…" : ""}"`,
    link: isInfluencer ? `/influencer/tasks/${taskId}` : `/publisher/tasks/${taskId}`,
  });
}

export async function notifyTopUp(userId: string, amount: number, method: string) {
  await createNotification({
    userId,
    type: "PAYMENT",
    title: "Balance topped up",
    body: `$${amount.toFixed(2)} was added to your balance via ${method}.`,
    link: `/advertiser/balance`,
  });
}
