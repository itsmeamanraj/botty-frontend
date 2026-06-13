"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { resolveRedirectPath } from "@/lib/redirect";

export default function AuthVerifiedPage() {
  const router = useRouter();
  const { refreshMe } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function completeVerification() {
      try {
        const me = await refreshMe();
        if (cancelled) return;

        if (!me) {
          setError("Could not start your session. Please sign in.");
          return;
        }

        router.replace(resolveRedirectPath(me.nextStep));
      } catch {
        if (!cancelled) {
          setError("Something went wrong. Please sign in.");
        }
      }
    }

    completeVerification();

    return () => {
      cancelled = true;
    };
  }, [refreshMe, router]);

  return (
    <main className="min-h-screen bg-surface-bg text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 shadow-2xl text-center">
        {error ? (
          <>
            <p className="text-sm text-red-400 mb-4">{error}</p>
            <a href="/login" className="text-xs font-semibold text-accent">
              Go to sign in
            </a>
          </>
        ) : (
          <>
            <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Email verified</h1>
            <p className="text-sm text-text-muted">Taking you to setup…</p>
          </>
        )}
      </div>
    </main>
  );
}
