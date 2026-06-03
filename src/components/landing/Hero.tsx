"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight, MessageSquare, Bot, User, Database, Sparkles, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [chatStep, setChatStep] = useState(0);

  // Cycle through chatbot steps on the mockup dashboard
  useEffect(() => {
    const timer = setInterval(() => {
      setChatStep((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="absolute inset-0 z-0">
        {/* Glow Orb 1 */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-gradient-glow" />
        {/* Glow Orb 2 */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[100px] animate-gradient-glow" style={{ animationDelay: "-3s" }} />
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side Content */}
        <div className="lg:col-span-6 flex flex-col text-center lg:text-left items-center lg:items-start">
          {/* Floating Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "3s" }} />
            Next-Gen Business AI Agent
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none mb-6"
          >
            AI Employee For <br />
            <span className="bg-gradient-to-r from-primary via-[#9F7AEA] to-accent bg-clip-text text-transparent">
              Your Business
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-text-muted max-w-lg leading-relaxed mb-10"
          >
            Automate WhatsApp replies, website chats, customer support, and lead generation with AI trained on your business knowledge.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a
              href="#trial"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current text-accent" />
              Watch Demo
            </a>
          </motion.div>
        </div>

        {/* Right Side Mockup Dashboard */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-6 relative w-full"
        >
          {/* Main Glass Dashboard Card */}
          <div className="w-full rounded-2xl border border-white/10 bg-[#0F1426]/80 shadow-2xl overflow-hidden backdrop-blur-md">
            {/* Header bar */}
            <div className="border-b border-white/5 bg-white/5 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="text-xs text-text-muted font-medium font-mono">botty-agent-v1.0</div>
              <div className="w-16" />
            </div>

            {/* Content area */}
            <div className="p-5 grid grid-cols-1 md:grid-cols-12 gap-5 h-[340px] relative">
              {/* Left Bar (Mock Chat List) */}
              <div className="hidden md:block md:col-span-4 border-r border-white/5 pr-4 flex flex-col gap-2">
                <div className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-2">Active Chats</div>
                <div className="p-2 rounded bg-primary/10 border border-primary/20 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-white">AR</div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white leading-none">Aman Raj</div>
                    <span className="text-[9px] text-accent font-medium">WhatsApp</span>
                  </div>
                </div>
                <div className="p-2 rounded hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer">
                  <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-[10px] font-bold text-white">JD</div>
                  <div className="truncate">
                    <div className="text-[11px] font-bold text-white/80 leading-none">John Doe</div>
                    <span className="text-[9px] text-text-muted">Website Chat</span>
                  </div>
                </div>
              </div>

              {/* Right/Main Chat Area */}
              <div className="col-span-12 md:col-span-8 flex flex-col justify-between h-full">
                {/* Chat window Header */}
                <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-[11px] font-bold text-white">AR</div>
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-success border-2 border-[#0F1426]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Aman Raj</div>
                      <div className="text-[9px] text-success font-medium">AI Agent Responding</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-text-muted font-mono bg-white/5 px-2 py-0.5 rounded">WhatsApp Business</span>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-3 py-2 text-xs">
                  {/* Step 0: User Msg */}
                  {chatStep >= 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 max-w-[80%]"
                    >
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-3 h-3 text-text-muted" />
                      </div>
                      <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-white">
                        Hey! Do you have real estate properties near Sector 62?
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: AI Typing / Reading knowledge base */}
                  {chatStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1.5 text-[10px] text-accent pl-8"
                    >
                      <Database className="w-3 h-3 animate-pulse" />
                      Reading documents & searching knowledge base...
                    </motion.div>
                  )}

                  {/* Step 2: AI Response */}
                  {chatStep >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 max-w-[85%] self-end flex-row-reverse"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center flex-shrink-0">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
                      <div className="p-2.5 rounded-2xl bg-primary/20 border border-primary/20 text-white">
                        Checking our database... Yes! We have 3 premium properties available in Sector 62. Would you like to book a site visit?
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Floating CRM Update Card */}
          {chatStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="absolute -bottom-8 -left-6 md:-left-12 max-w-[280px] p-4 rounded-xl border border-success/30 bg-[#121B2A]/90 backdrop-blur-md shadow-lg shadow-black/40 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0 text-success">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  CRM Lead Generated
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
                </h4>
                <p className="text-[10px] text-text-muted mt-1">Aman Raj synced to HubSpot and WhatsApp CRM.</p>
              </div>
            </motion.div>
          )}

          {/* Floating Abstract Element */}
          <div className="absolute -top-6 -right-6 w-16 h-16 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/20 animate-bounce" style={{ animationDuration: "4s" }}>
            <MessageSquare className="w-7 h-7 text-accent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
