"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Role = "ADVERTISER" | "PUBLISHER" | "INFLUENCER";

const ROLES: { value: Role; label: string; icon: string; desc: string }[] = [
  {
    value: "ADVERTISER",
    label: "Advertiser",
    icon: "🛒",
    desc: "Buy guest posts, link insertions & influencer shoutouts",
  },
  {
    value: "PUBLISHER",
    label: "Publisher",
    icon: "📰",
    desc: "Monetize your website by accepting paid content",
  },
  {
    value: "INFLUENCER",
    label: "Influencer",
    icon: "📱",
    desc: "Earn from brand deals on your social channels",
  },
];

export function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>("ADVERTISER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step === 1) { setStep(2); return; }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); setLoading(false); return; }

      // Auto-login after register
      const { signIn } = await import("next-auth/react");
      await signIn("credentials", { email, password, redirect: false });
      router.push(
        role === "ADVERTISER" ? "/advertiser/sites" :
        role === "PUBLISHER"  ? "/publisher/platforms" :
        "/influencer/channels"
      );
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      {error && <div className="reg-error">{error}</div>}

      {step === 1 && (
        <>
          <p className="reg-label">I want to join as a…</p>
          <div className="role-grid">
            {ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`role-card ${role === r.value ? "role-card--active" : ""}`}
              >
                <span className="role-icon">{r.icon}</span>
                <span className="role-name">{r.label}</span>
                <span className="role-desc">{r.desc}</span>
              </button>
            ))}
          </div>
          <button type="submit" className="login-submit-btn">
            <span>Continue</span>
            <span className="login-submit-arrow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="#112c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <button type="button" onClick={() => setStep(1)} className="reg-back">
            ← Back
          </button>
          <div className="reg-role-chip">
            {ROLES.find(r => r.value === role)?.icon} Joining as {ROLES.find(r => r.value === role)?.label}
          </div>
          <input className="input" type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} required autoComplete="name" />
          <input className="input" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
          <div style={{ position: "relative" }}>
            <input className="input" type={showPassword ? "text" : "password"} placeholder="Password (min 8 characters)" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} autoComplete="new-password" style={{ paddingRight: "60px" }} />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle">
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button type="submit" disabled={loading} className="login-submit-btn">
            <span>{loading ? "Creating account…" : "Create Account"}</span>
            <span className="login-submit-arrow">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7h12M8 2l5 5-5 5" stroke="#112c3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </>
      )}

      <style>{`
        .reg-error { background: #fddde5; color: #b91c3d; border-radius: 8px; padding: 10px 14px; font-size: 13px; font-family: var(--font-inter); }
        .reg-label { font-size: 14px; font-family: var(--font-inter); color: var(--color-grey-blue); margin-bottom: -4px; }
        .role-grid { display: flex; flex-direction: column; gap: 8px; }
        .role-card { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 14px 16px; border: 1.5px solid var(--color-border); border-radius: 10px; background: white; cursor: pointer; text-align: left; transition: border-color 0.15s, background 0.15s; }
        .role-card:hover { border-color: var(--color-primary); background: #f0f2fd; }
        .role-card--active { border-color: var(--color-primary); background: #f0f2fd; }
        .role-icon { font-size: 20px; }
        .role-name { font-size: 15px; font-weight: 600; color: var(--color-dark); font-family: var(--font-space-grotesk); }
        .role-desc { font-size: 12px; color: var(--color-grey-blue); font-family: var(--font-inter); }
        .login-submit-btn { display: flex; align-items: center; justify-content: space-between; width: 100%; padding: 13px 16px 13px 20px; background: var(--color-dark); color: white; border: none; border-radius: 50px; font-size: 15px; font-weight: 600; font-family: var(--font-space-grotesk); cursor: pointer; transition: opacity 0.15s ease; }
        .login-submit-btn:hover:not(:disabled) { opacity: 0.88; }
        .login-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .login-submit-arrow { width: 34px; height: 34px; background: #8cf08a; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .password-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 13px; font-family: var(--font-inter); color: var(--color-primary); cursor: pointer; font-weight: 500; }
        .reg-back { background: none; border: none; color: var(--color-grey-blue); font-size: 13px; font-family: var(--font-inter); cursor: pointer; text-align: left; padding: 0; }
        .reg-back:hover { color: var(--color-dark); }
        .reg-role-chip { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #e8eaf9; border-radius: 20px; font-size: 13px; font-weight: 500; color: var(--color-primary); font-family: var(--font-inter); }
      `}</style>
    </form>
  );
}
