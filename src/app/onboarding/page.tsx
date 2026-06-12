"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/providers/AuthProvider";
import { resolveRedirectPath } from "@/lib/redirect";

export default function OnboardingPage() {
  const router = useRouter();
  const { tenant, refreshMe } = useAuth();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = async () => {
    setError("");
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/onboarding/complete", { method: "PATCH" });
      const me = await refreshMe();
      if (me) {
        router.push(resolveRedirectPath(me.nextStep));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to complete onboarding",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bg text-white flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to Botty</h1>
          <p className="text-xs text-text-muted mt-1.5">
            {tenant?.name
              ? `Your workspace "${tenant.name}" is ready.`
              : "Your workspace is almost ready."}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-sm font-bold mb-1">Connect WhatsApp</h2>
            <p className="text-xs text-text-muted">
              Link your WhatsApp Business account from the dashboard after setup.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-sm font-bold mb-1">Train your AI agent</h2>
            <p className="text-xs text-text-muted">
              Add knowledge base content and prompts to customize responses.
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5">
            <h2 className="text-sm font-bold mb-1">Invite your team</h2>
            <p className="text-xs text-text-muted">
              Add agents and managers from the team settings page.
            </p>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-400 font-semibold mb-4">{error}</p>
        )}

        <button
          type="button"
          onClick={handleComplete}
          disabled={isSubmitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-lg disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? "Finishing…" : "Go to Dashboard"}
        </button>
      </div>
    </main>
  );
}
