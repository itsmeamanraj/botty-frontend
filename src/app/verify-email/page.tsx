"use client";

import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

export default function VerifyEmailPage() {
  const { user } = useAuth();

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
          . Click the link in that email to continue.
        </p>
        <p className="text-xs text-text-muted mb-6">
          In development, check the API server logs for the verification URL.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </div>
    </main>
  );
}
