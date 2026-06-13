"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bg text-white flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to sign in
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-base">
              B
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Botty
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 shadow-2xl backdrop-blur-md">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Check your email</h1>
              <p className="text-sm text-text-muted leading-relaxed">
                If an account exists for{" "}
                <span className="text-white font-semibold">{email}</span>, we
                sent a password reset link. The link expires in 30 minutes.
              </p>
              <Link
                href="/login"
                className="inline-block mt-6 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
              >
                Return to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold tracking-tight">
                  Forgot password?
                </h1>
                <p className="text-xs text-text-muted mt-1.5">
                  Enter your email and we will send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-text-muted">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="absolute left-3 w-4 h-4 text-text-muted" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-red-400 font-semibold">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-98 cursor-pointer mt-2 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending…" : "Send reset link"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
