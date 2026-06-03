"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  MessageSquare,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  UserCheck,
  Upload,
  Globe,
  Database,
} from "lucide-react";

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState("conversations");

  const tabs = [
    { id: "conversations", label: "Conversations", icon: MessageSquare },
    { id: "leads", label: "Leads CRM", icon: Users },
    { id: "analytics", label: "AI Analytics", icon: BarChart3 },
    { id: "kb", label: "Knowledge Base", icon: BookOpen },
    { id: "settings", label: "AI Settings", icon: Settings },
  ];

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-[#0A0E1A]/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Workspace</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white">The Unified AI Control Center</h3>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Manage your AI employee, upload business context, review customer transcripts, and monitor lead growth from a single secure interface.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-lg shadow-primary/25 border border-primary/20"
                    : "bg-[#151B30]/40 text-text-muted hover:text-white border border-white/5"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Laptop Container Mockup */}
        <div className="relative max-w-4xl mx-auto">
          {/* Outer bezel */}
          <div className="rounded-2xl border-4 border-[#2A3454] bg-[#0B1020] p-3 shadow-2xl relative z-10">
            {/* Screen border */}
            <div className="rounded-xl border border-white/10 bg-[#0F1426] overflow-hidden aspect-[16/10] flex flex-col justify-between">
              
              {/* Internal Mock Dashboard Interface */}
              {activeTab === "conversations" && (
                <div className="p-6 flex-1 flex flex-col justify-between text-white font-sans">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h4 className="font-bold text-base flex items-center gap-2 text-accent">
                      <MessageSquare className="w-5 h-5" /> Live Agent Transcripts
                    </h4>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20">
                      3 Active Chats
                    </span>
                  </div>
                  <div className="flex-1 py-4 flex flex-col gap-3 text-xs overflow-y-auto">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 max-w-[70%]">
                      <span className="text-[10px] text-accent block mb-1">Customer (WhatsApp)</span>
                      Can you explain your pricing plans for coaching institutes?
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 max-w-[75%] self-end">
                      <span className="text-[10px] text-[#A594FF] block mb-1">Botty AI Agent</span>
                      Sure! We have a Growth plan ($49/mo) and an Enterprise custom plan. The Growth plan supports up to 10 team members.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "leads" && (
                <div className="p-6 flex-1 flex flex-col justify-between text-white font-sans">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h4 className="font-bold text-base flex items-center gap-2 text-accent">
                      <Users className="w-5 h-5" /> Automated Lead CRM
                    </h4>
                    <span className="text-xs text-text-muted">Updated 2m ago</span>
                  </div>
                  <div className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto text-xs">
                    <div className="grid grid-cols-12 gap-2 p-2 border-b border-white/5 font-semibold text-text-muted">
                      <div className="col-span-4">Contact</div>
                      <div className="col-span-4">Source</div>
                      <div className="col-span-4">Status</div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 p-2 items-center hover:bg-white/5 rounded-lg">
                      <div className="col-span-4 font-medium">Aman Raj</div>
                      <div className="col-span-4 text-accent">WhatsApp</div>
                      <div className="col-span-4"><span className="px-2 py-0.5 rounded bg-success/20 text-success text-[10px]">Synced</span></div>
                    </div>
                    <div className="grid grid-cols-12 gap-2 p-2 items-center hover:bg-white/5 rounded-lg">
                      <div className="col-span-4 font-medium">Emily Watson</div>
                      <div className="col-span-4 text-purple-400">Web Widget</div>
                      <div className="col-span-4"><span className="px-2 py-0.5 rounded bg-success/20 text-success text-[10px]">Synced</span></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="p-6 flex-1 flex flex-col justify-between text-white font-sans">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h4 className="font-bold text-base flex items-center gap-2 text-accent">
                      <BarChart3 className="w-5 h-5" /> AI Analytics & Performance
                    </h4>
                    <span className="text-xs text-success">98.4% Resolution Rate</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                      <span className="text-2xl font-bold block text-primary">12,482</span>
                      <span className="text-[10px] text-text-muted">Processed Messages</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                      <span className="text-2xl font-bold block text-accent">99.9%</span>
                      <span className="text-[10px] text-text-muted">AI Accuracy</span>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                      <span className="text-2xl font-bold block text-success">840</span>
                      <span className="text-[10px] text-text-muted">Leads Captured</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "kb" && (
                <div className="p-6 flex-1 flex flex-col justify-between text-white font-sans">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h4 className="font-bold text-base flex items-center gap-2 text-accent">
                      <BookOpen className="w-5 h-5" /> Knowledge Base Training
                    </h4>
                    <button className="px-3 py-1.5 rounded-lg bg-primary text-xs font-semibold hover:bg-primary/95 flex items-center gap-1.5">
                      <Upload className="w-3.5 h-3.5" /> Upload File
                    </button>
                  </div>
                  <div className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-accent" />
                        <div>
                          <div className="font-bold">admission_guidelines_2026.pdf</div>
                          <span className="text-[10px] text-text-muted">2.4 MB &bull; PDF</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-success font-semibold bg-success/15 px-2 py-0.5 rounded">Trained</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-purple-400" />
                        <div>
                          <div className="font-bold">https://botty.ai/faq-docs</div>
                          <span className="text-[10px] text-text-muted">Web Crawler &bull; 14 subpages</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-success font-semibold bg-success/15 px-2 py-0.5 rounded">Trained</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="p-6 flex-1 flex flex-col justify-between text-white font-sans">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <h4 className="font-bold text-base flex items-center gap-2 text-accent">
                      <Settings className="w-5 h-5" /> AI Settings & Prompts
                    </h4>
                    <span className="text-xs text-text-muted">V1.0 (GPT-4o)</span>
                  </div>
                  <div className="flex-1 py-4 flex flex-col gap-3 text-xs overflow-y-auto">
                    <div>
                      <label className="block text-[10px] text-text-muted mb-1 font-bold">System Prompt / Character Instructions</label>
                      <textarea
                        readOnly
                        value="You are a professional assistant for Botty. Format output clearly, act polite, and only answer questions based on the knowledge base uploads. If you don't know the answer, flag for human handoff."
                        className="w-full h-16 bg-white/5 border border-white/10 rounded-lg p-2 text-[11px] font-mono text-white/80 resize-none outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] text-text-muted mb-1 font-bold">Creativity (Temperature)</label>
                        <div className="h-2 rounded-full bg-white/10 relative"><div className="absolute top-0 left-0 bottom-0 w-[20%] bg-primary rounded-full" /></div>
                      </div>
                      <div>
                        <label className="block text-[10px] text-text-muted mb-1 font-bold">Confidence Score Cutoff</label>
                        <div className="h-2 rounded-full bg-white/10 relative"><div className="absolute top-0 left-0 bottom-0 w-[85%] bg-accent rounded-full" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Floating glass card 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex absolute -left-12 top-1/4 z-20 p-4 rounded-xl border border-white/10 bg-[#121B2A]/90 backdrop-blur-md shadow-xl flex-col gap-1.5 max-w-[200px]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">Active Knowledge</span>
            <div className="font-bold text-xs text-white truncate">product_catalog_v2.docx</div>
            <div className="text-[9px] text-success flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" /> Trained & Synced
            </div>
          </motion.div>

          {/* Floating glass card 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:flex absolute -right-12 bottom-1/4 z-20 p-4 rounded-xl border border-white/10 bg-[#121B2A]/90 backdrop-blur-md shadow-xl flex-col gap-1 max-w-[190px]"
          >
            <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">Leads Captured</span>
            <div className="font-bold text-xl text-white">48 leads</div>
            <div className="text-[9px] text-text-muted">In the last 24 hours</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
