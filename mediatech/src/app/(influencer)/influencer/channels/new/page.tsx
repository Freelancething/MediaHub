import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import Link from "next/link";

export const metadata = {
  title: "Add Channel - Adsy Influencer",
};

export default async function NewChannelPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  // Server action to save the social channel
  async function handleSubmit(formData: FormData) {
    "use server";
    const session = await auth();
    if (!session?.user?.id) return;

    const platform = formData.get("platform") as any; // SocialPlatform enum
    const handle = formData.get("handle") as string;
    const followers = parseInt(formData.get("followers") as string || "0", 10);
    const engagement = parseFloat(formData.get("engagement") as string || "0.0");
    const niche = formData.get("niche") as string;
    const country = formData.get("country") as string;
    const price = parseFloat(formData.get("price") as string || "10.00");

    const { db } = await import("@/lib/db");
    
    // Create new influencer social channel
    await db.channel.create({
      data: {
        influencerId: session.user.id,
        platform,
        handle,
        followers,
        engagement,
        niche,
        country,
        status: "PENDING",
        packages: {
          create: {
            type: "POST",
            price,
            turnaround: 3,
            description: "Dedicated social feed post placement"
          }
        }
      }
    });

    redirect("/influencer/channels");
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="mb-6">
        <Link href="/influencer/channels" className="text-sm text-primary hover:underline">
          ← Back to Channels
        </Link>
        <h1 className="text-2xl font-bold font-space text-dark mt-2">Connect Social Channel</h1>
      </div>

      <div className="card bg-card border-base rounded-lg p-6">
        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="text-sm font-medium text-dark block mb-2 font-inter">Social Platform</label>
            <select name="platform" required className="input select">
              <option value="INSTAGRAM">Instagram</option>
              <option value="YOUTUBE">YouTube</option>
              <option value="TIKTOK">TikTok</option>
              <option value="X">X (formerly Twitter)</option>
              <option value="FACEBOOK">Facebook</option>
              <option value="LINKEDIN">LinkedIn</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-dark block mb-2 font-inter">Channel Handle / Username</label>
            <input name="handle" type="text" required placeholder="@username" className="input" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="text-sm font-medium text-dark block mb-2 font-inter">Followers Count</label>
              <input name="followers" type="number" min="0" required placeholder="5000" className="input" />
            </div>
            <div>
              <label className="text-sm font-medium text-dark block mb-2 font-inter">Engagement Rate (%)</label>
              <input name="engagement" type="number" step="0.01" min="0" max="100" required placeholder="3.5" className="input" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label className="text-sm font-medium text-dark block mb-2 font-inter">Niche / Category</label>
              <select name="niche" required className="input select">
                <option value="Fashion">Fashion</option>
                <option value="Fitness">Fitness</option>
                <option value="Gaming">Gaming</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-dark block mb-2 font-inter">Country</label>
              <input name="country" type="text" required placeholder="United States" className="input" />
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', marginTop: '8px' }}>
            <h3 className="font-space font-semibold text-dark text-md mb-3 mt-4">Pricing Package (Dedicated Post)</h3>
            <div>
              <label className="text-sm font-medium text-dark block mb-2 font-inter">Shoutout Placement Price ($)</label>
              <input name="price" type="number" step="0.01" min="1" required defaultValue="25.00" className="input" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary font-space font-semibold mt-4" style={{ justifyContent: 'center' }}>
            Connect Channel
          </button>
        </form>
      </div>
    </div>
  );
}
