"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, CheckCircle2, Phone, Briefcase, Users } from "lucide-react";
import Link from "next/link";

type AuthView = "login" | "forgot-password" | "signup";

export default function LoginPage() {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [sector, setSector] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (view === "signup") {
      let hasError = false;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address.");
        hasError = true;
      } else {
        setEmailError("");
      }

      const mobileRegex = /^\+?[0-9]{10,14}$/;
      if (!mobileRegex.test(mobile)) {
        setMobileError("Please enter a valid mobile number (10-14 digits).");
        hasError = true;
      } else {
        setMobileError("");
      }

      if (hasError) {
        return;
      }
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      if (view === "forgot-password" || view === "signup") {
        setView("login");
        // Reset states
        setName("");
        setEmail("");
        setPassword("");
        setMobile("");
        setSector("");
        setEmployeeCount("");
      }
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-surface-bg text-white flex items-center justify-center relative overflow-hidden px-4">
      {/* Background Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/15 rounded-full blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Back button */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white font-bold text-base shadow-lg shadow-primary/20">
              B
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">Botty</span>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#0F1426]/90 p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="submitted"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center py-8 flex flex-col items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-success/20 border border-success/30 flex items-center justify-center text-success mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Request Processed</h2>
                <p className="text-sm text-text-muted max-w-xs mx-auto leading-relaxed">
                  {view === "forgot-password" 
                    ? `We sent a recovery email to ${email}. Please check your inbox.`
                    : view === "signup"
                    ? `Thank you for your enquiry! Our team will review your business information and reach out shortly.`
                    : `Welcome to Botty! Processing your credentials...`
                  }
                </p>
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
                  <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
                  <p className="text-xs text-text-muted mt-1.5">Sign in to manage your AI workforce</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">Email Address</label>
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

                  {/* Password Input */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-text-muted">Password</label>
                      <button
                        type="button"
                        onClick={() => setView("forgot-password")}
                        className="text-xs font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
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

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-98 cursor-pointer mt-2"
                  >
                    Sign In
                  </button>
                </form>

                {/* Third Party Login Dividers */}
                <div className="relative flex py-5 items-center">
                  <div className="flex-grow border-t border-white/5"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-text-muted uppercase tracking-wider font-semibold">Or continue with</span>
                  <div className="flex-grow border-t border-white/5"></div>
                </div>

                {/* Third Party Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all cursor-pointer">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.033 1 1 6.033 1 12.24s5.033 11.24 11.24 11.24c6.478 0 10.793-4.537 10.793-10.985 0-.743-.08-1.309-.177-1.859H12.24z"/>
                    </svg>
                    Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs transition-all cursor-pointer">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.51-.61.7-1.15 1.84-1.01 2.96 1.12.09 2.27-.58 2.96-1.41z"/>
                    </svg>
                    Apple
                  </button>
                </div>

                <p className="text-center text-xs text-text-muted mt-6">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setView("signup")}
                    className="font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer"
                  >
                    Sign up
                  </button>
                </p>
              </motion.div>
            ) : view === "forgot-password" ? (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Reset Password</h2>
                  <p className="text-xs text-text-muted mt-1.5">Enter your email and we'll send you a recovery link</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">Email Address</label>
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

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-98 cursor-pointer mt-2"
                  >
                    Send Reset Link
                  </button>
                </form>

                <p className="text-center text-xs text-text-muted mt-6">
                  Remember your password?{" "}
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer"
                  >
                    Back to log in
                  </button>
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
                  <h2 className="text-2xl font-bold text-white tracking-tight">Business Enquiry</h2>
                  <p className="text-xs text-text-muted mt-1.5">Submit details to request custom platform access</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Full Name Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">Full Name</label>
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

                  {/* Mobile Number Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">Mobile Number</label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3 w-4 h-4 text-text-muted" />
                      <input
                        type="tel"
                        required
                        value={mobile}
                        onChange={(e) => {
                          setMobile(e.target.value);
                          if (mobileError) setMobileError("");
                        }}
                        placeholder="+91 9876543210"
                        className={`w-full bg-white/5 border focus:ring-1 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all ${
                          mobileError 
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" 
                            : "border-white/10 focus:border-primary focus:ring-primary"
                        }`}
                      />
                    </div>
                    {mobileError && <span className="text-[10px] text-red-400 font-semibold">{mobileError}</span>}
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">Email Address</label>
                    <div className="relative flex items-center">
                      <Mail className="absolute left-3 w-4 h-4 text-text-muted" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (emailError) setEmailError("");
                        }}
                        placeholder="you@company.com"
                        className={`w-full bg-white/5 border focus:ring-1 rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-white/30 outline-none transition-all ${
                          emailError 
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500" 
                            : "border-white/10 focus:border-primary focus:ring-primary"
                        }`}
                      />
                    </div>
                    {emailError && <span className="text-[10px] text-red-400 font-semibold">{emailError}</span>}
                  </div>

                  {/* Business Sector Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">Business Sector</label>
                    <div className="relative flex items-center">
                      <Briefcase className="absolute left-3 w-4 h-4 text-text-muted" />
                      <select
                        required
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        className="w-full bg-[#151B30] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select Business Sector</option>
                        <option value="schools">Schools</option>
                        <option value="institutes">Coaching Institutes</option>
                        <option value="hospitals">Hospitals & Clinics</option>
                        <option value="manufacturing">Manufacturers</option>
                        <option value="realestate">Real Estate</option>
                        <option value="travel">Travel Agencies</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="consulting">Consultants & Agencies</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Employee Number Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-text-muted">Number of Employees</label>
                    <div className="relative flex items-center">
                      <Users className="absolute left-3 w-4 h-4 text-text-muted" />
                      <select
                        required
                        value={employeeCount}
                        onChange={(e) => setEmployeeCount(e.target.value)}
                        className="w-full bg-[#151B30] border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl py-3 pl-10 pr-4 text-sm text-white outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="" disabled>Select Employee Count</option>
                        <option value="1-10">1 - 10 employees</option>
                        <option value="11-50">11 - 50 employees</option>
                        <option value="51-200">51 - 200 employees</option>
                        <option value="201-500">201 - 500 employees</option>
                        <option value="500+">More than 500 employees</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-98 cursor-pointer mt-2"
                  >
                    Submit Enquiry
                  </button>
                </form>

                <p className="text-center text-xs text-text-muted mt-6">
                  Already have an admin account?{" "}
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer"
                  >
                    Log in
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
