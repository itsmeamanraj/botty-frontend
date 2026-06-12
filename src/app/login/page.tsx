"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { resolveRedirectPath } from "@/lib/redirect";

type AuthView = "login" | "signup";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signUp, refreshMe } = useAuth();

  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signIn(email, password);
      const me = await refreshMe();
      if (me) {
        router.push(resolveRedirectPath(me.nextStep));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await signUp(name, email, password);
      setSignupSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-bg text-white flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-base shadow-lg shadow-primary/20">
              B
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              Botty
            </span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <AnimatePresence mode="wait">
            {signupSuccess ? (
              <motion.div
                key="signup-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Check your email
                </h2>
                <p className="text-sm text-text-muted max-w-xs mx-auto leading-relaxed">
                  We sent a verification link to{" "}
                  <span className="text-white font-semibold">{email}</span>.
                  Click the link, then sign in.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSignupSuccess(false);
                    setView("login");
                  }}
                  className="mt-6 text-xs font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer"
                >
                  Back to sign in
                </button>
              </motion.div>
            ) : view === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-xs text-text-muted mt-1.5">
                    Sign in to manage your AI workforce
                  </p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">
                      Password
                    </label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-3 w-4 h-4 text-text-muted" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
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
                    {isSubmitting ? "Signing in…" : "Sign In"}
                  </button>
                </form>

                <p className="text-center text-xs text-text-muted mt-6">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setView("signup");
                      setError("");
                    }}
                    className="font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
                <p className="text-center text-xs text-text-muted mt-3">
                  Need a custom demo?{" "}
                  <Link
                    href="/enquiry"
                    className="font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    Request a demo
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Create Account
                  </h2>
                  <p className="text-xs text-text-muted mt-1.5">
                    Sign up with email and verify to get started
                  </p>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">
                      Full Name
                    </label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 w-4 h-4 text-text-muted" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Aman Raj"
                        className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all"
                      />
                    </div>
                  </div>

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
                        placeholder="you@company.com"
                        className="w-full bg-white/5 border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">
                      Password
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

                  {error && (
                    <p className="text-xs text-red-400 font-semibold">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-98 cursor-pointer mt-2 disabled:opacity-60"
                  >
                    {isSubmitting ? "Creating account…" : "Create Account"}
                  </button>
                </form>

                <p className="text-center text-xs text-text-muted mt-6">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setView("login");
                      setError("");
                    }}
                    className="font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer"
                  >
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
