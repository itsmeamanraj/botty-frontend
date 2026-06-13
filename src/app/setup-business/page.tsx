"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2 } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { fetchIndustries, type IndustryOption } from "@/lib/industries";
import { useAuth } from "@/providers/AuthProvider";
import { resolveRedirectPath } from "@/lib/redirect";

const selectClassName =
  "w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 px-4 text-sm text-white outline-none transition-all";

export default function SetupBusinessPage() {
  const router = useRouter();
  const { refreshMe } = useAuth();
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [slug, setSlug] = useState("");
  const [industries, setIndustries] = useState<IndustryOption[]>([]);
  const [industriesError, setIndustriesError] = useState("");
  const [isLoadingIndustries, setIsLoadingIndustries] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchIndustries()
      .then(setIndustries)
      .catch((err) => {
        setIndustriesError(
          err instanceof Error ? err.message : "Failed to load industries",
        );
      })
      .finally(() => setIsLoadingIndustries(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await apiFetch("/api/v1/onboarding/bootstrap", {
        method: "POST",
        body: JSON.stringify({
          businessName,
          industry,
          ...(slug.trim() ? { slug: slug.trim() } : {}),
        }),
      });
      const me = await refreshMe();
      if (me) {
        router.push(resolveRedirectPath(me.nextStep));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create business");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bg text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Set up your business</h1>
          <p className="text-xs text-text-muted mt-1.5">
            Create your workspace to continue onboarding
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-muted">
              Business Name
            </label>
            <input
              type="text"
              required
              minLength={2}
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              placeholder="Acme Coaching"
              className={selectClassName}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-muted">
              Industry
            </label>
            <select
              required
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              disabled={isLoadingIndustries || !!industriesError}
              className={`${selectClassName} disabled:opacity-60`}
            >
              <option value="" disabled className="bg-[#0F1426]">
                {isLoadingIndustries ? "Loading industries…" : "Select industry"}
              </option>
              {industries.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                  className="bg-[#0F1426]"
                >
                  {item.label}
                </option>
              ))}
            </select>
            {industriesError && (
              <p className="text-[10px] text-red-400">{industriesError}</p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-muted">
              URL Slug <span className="text-text-muted/60">(optional)</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="acme-coaching"
              pattern="^[a-z0-9]+(?:-[a-z0-9]+)*$"
              className={selectClassName}
            />
            <span className="text-[10px] text-text-muted">
              Lowercase letters, numbers, and hyphens only
            </span>
          </div>

          {error && (
            <p className="text-xs text-red-400 font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting || isLoadingIndustries || !!industriesError}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-lg disabled:opacity-60 cursor-pointer mt-2"
          >
            {isSubmitting ? "Creating…" : "Create Business"}
          </button>
        </form>
      </div>
    </main>
  );
}
