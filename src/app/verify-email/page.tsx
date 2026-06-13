"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmailPage() {
  const { user, resendVerificationEmail } = useAuth();
  const [emailInput, setEmailInput] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const email = user?.email ?? emailInput.trim();

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (!email) {
      setError("Enter your email address to resend.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    try {
      await resendVerificationEmail(email);
      setSent(true);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not resend email");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bg text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 shadow-2xl text-center">
        <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mx-auto mb-6">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Verify your email</h1>
        <p className="text-sm text-text-muted leading-relaxed mb-4">
          We sent a verification link to{" "}
          <span className="text-white font-semibold">
            {user?.email ?? "your email"}
          </span>
          . Click the link in that email to verify and continue setup.
        </p>

        {!user?.email && (
          <div className="mb-4 text-left">
            <label className="text-xs font-semibold text-text-muted block mb-1.5">
              Email address
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 px-4 text-sm text-white placeholder-white/30 outline-none transition-all"
            />
          </div>
        )}

        {sent && (
          <div className="flex items-center justify-center gap-2 text-success text-xs font-semibold mb-4">
            <CheckCircle2 className="w-4 h-4" />
            Verification email sent again
          </div>
        )}

        {error && (
          <p className="text-xs text-red-400 font-semibold mb-4">{error}</p>
        )}

        <p className="text-xs text-text-muted mb-4">
          Did not get the email? Check your spam folder.
        </p>

        <button
          type="button"
          onClick={handleResend}
          disabled={isSubmitting || cooldown > 0 || !email}
          className="w-full py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isSubmitting
            ? "Sending…"
            : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend verification email"}
        </button>

        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Already verified? Sign in
        </Link>
      </div>
    </main>
  );
}
