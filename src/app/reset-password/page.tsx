"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword } = useAuth();

  const token = searchParams.get("token");
  const linkError = searchParams.get("error");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const invalidLink = linkError === "INVALID_TOKEN" || !token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Reset link is invalid or expired.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 shadow-2xl backdrop-blur-md">
      {success ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Password updated</h1>
          <p className="text-sm text-text-muted">
            You can now sign in with your new password.
          </p>
        </div>
      ) : invalidLink ? (
        <div className="text-center py-4">
          <h1 className="text-2xl font-bold mb-2">Link expired</h1>
          <p className="text-sm text-text-muted mb-6">
            This reset link is invalid or has expired. Request a new one.
          </p>
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
          >
            Request new reset link
          </Link>
        </div>
      ) : (
        <>
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight">
              Set new password
            </h1>
            <p className="text-xs text-text-muted mt-1.5">
              Choose a strong password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-muted">
                New password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-text-muted" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-muted">
                Confirm password
              </label>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-text-muted" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
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
              {isSubmitting ? "Updating…" : "Update password"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function ResetPasswordPage() {
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

        <Suspense
          fallback={
            <div className="rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 text-center text-sm text-text-muted">
              Loading…
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  );
}
