import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export const metadata = { title: "User Management - MediaHub Admin" };

interface SearchParams { search?: string; role?: string; page?: string; }

export default async function AdminUsersPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== "ADMIN") redirect("/login");

  const params = await searchParams;
  const search = params.search ?? "";
  const roleFilter = params.role ?? "";
  const page = parseInt(params.page ?? "1");
  const perPage = 20;

  const where: any = {
    ...(search ? { OR: [{ name: { contains: search, mode: "insensitive" } }, { email: { contains: search, mode: "insensitive" } }] } : {}),
    ...(roleFilter ? { role: roleFilter } : {}),
  };

  const [users, total] = await Promise.all([
    db.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
      select: { id: true, name: true, email: true, role: true, balance: true, earnings: true, createdAt: true, _count: { select: { advertiserTasks: true, sellerTasks: true, platforms: true, channels: true } } },
    }),
    db.user.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  // Server actions
  async function suspendUser(formData: FormData) {
    "use server";
    const userId = formData.get("userId") as string;
    const s = await auth();
    if (!s?.user || (s.user as any).role !== "ADMIN") return;
    // For now tag in a notification — full suspend would add a `suspended` field to schema
    const { db } = await import("@/lib/db");
    await db.notification.create({
      data: { userId, type: "SYSTEM", title: "Account suspended", body: "Your account has been suspended by an admin. Please contact support.", link: "/" }
    });
    redirect("/admin/users");
  }

  const ROLE_COLORS: Record<string, { bg: string; color: string }> = {
    ADVERTISER: { bg: "#EEF0FD", color: "#3E4FEA" },
    PUBLISHER:  { bg: "#e8fbee", color: "#16a34a" },
    INFLUENCER: { bg: "#FFF8E8", color: "#d97706" },
    ADMIN:      { bg: "#fff0f0", color: "#dc2626" },
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div className="mb-6">
        <span className="text-xs text-muted font-inter">Admin &gt; Users</span>
        <h1 className="text-2xl font-bold font-space text-dark mt-1">User Management</h1>
        <p className="text-sm text-muted font-inter mt-1">{total} users total</p>
      </div>

      {/* Filters */}
      <div className="card bg-card border-base rounded-xl p-4 mb-6 flex items-center gap-3 flex-wrap">
        <form method="GET" className="flex items-center gap-3 flex-1 flex-wrap">
          <div className="flex items-center gap-2 bg-app rounded-lg px-3 py-2 border border-border flex-1 min-w-48">
            <MagnifyingGlassIcon className="w-4 h-4 text-muted flex-shrink-0" />
            <input name="search" defaultValue={search} placeholder="Search by name or email..." className="bg-transparent text-sm font-inter text-dark outline-none w-full" />
          </div>
          <select name="role" defaultValue={roleFilter} className="input text-sm" style={{ width: "160px" }}>
            <option value="">All roles</option>
            <option value="ADVERTISER">Advertiser</option>
            <option value="PUBLISHER">Publisher</option>
            <option value="INFLUENCER">Influencer</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button type="submit" className="btn btn-primary btn-sm font-space">Filter</button>
          {(search || roleFilter) && <Link href="/admin/users" className="text-sm text-muted font-inter hover:text-dark">Clear</Link>}
        </form>
      </div>

      {/* Table */}
      <div className="card bg-card border-base rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-inter text-sm">
            <thead>
              <tr className="border-b border-border bg-app">
                <th className="px-5 py-3 text-xs font-semibold text-muted uppercase tracking-wide">User</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted uppercase tracking-wide">Role</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted uppercase tracking-wide text-right">Balance</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted uppercase tracking-wide text-right">Earnings</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted uppercase tracking-wide">Activity</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted uppercase tracking-wide">Joined</th>
                <th className="px-5 py-3 text-xs font-semibold text-muted uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-muted font-inter text-sm">No users found</td></tr>
              ) : users.map((u) => {
                const roleStyle = ROLE_COLORS[u.role] ?? ROLE_COLORS.ADMIN;
                const activity = u.role === "ADVERTISER"
                  ? `${u._count.advertiserTasks} tasks`
                  : u.role === "PUBLISHER"
                  ? `${u._count.sellerTasks} tasks · ${u._count.platforms} sites`
                  : u.role === "INFLUENCER"
                  ? `${u._count.sellerTasks} tasks · ${u._count.channels} channels`
                  : "Admin";
                return (
                  <tr key={u.id} className="border-b border-border hover:bg-app transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#677F9B] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {(u.name ?? u.email ?? "U").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold font-space text-dark text-sm">{u.name ?? "—"}</p>
                          <p className="text-xs text-muted">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className="text-xs font-semibold font-inter px-2.5 py-1 rounded-full" style={{ background: roleStyle.bg, color: roleStyle.color }}>{u.role}</span>
                    </td>
                    <td className="px-5 py-3 text-right font-semibold text-dark">${u.balance.toFixed(2)}</td>
                    <td className="px-5 py-3 text-right font-semibold text-success">${u.earnings.toFixed(2)}</td>
                    <td className="px-5 py-3 text-xs text-muted">{activity}</td>
                    <td className="px-5 py-3 text-xs text-muted">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3">
                      <form action={suspendUser} className="inline">
                        <input type="hidden" name="userId" value={u.id} />
                        <button type="submit" className="text-xs text-danger hover:underline font-inter" title="Send suspension notice">Suspend</button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-3 border-t border-border">
            <p className="text-xs text-muted font-inter">Page {page} of {totalPages} · {total} results</p>
            <div className="flex gap-2">
              {page > 1 && (
                <Link href={`/admin/users?search=${search}&role=${roleFilter}&page=${page - 1}`} className="btn btn-outline btn-sm font-inter text-xs">← Prev</Link>
              )}
              {page < totalPages && (
                <Link href={`/admin/users?search=${search}&role=${roleFilter}&page=${page + 1}`} className="btn btn-outline btn-sm font-inter text-xs">Next →</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
