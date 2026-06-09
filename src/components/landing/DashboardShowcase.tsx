"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Users,
  BarChart3,
  BookOpen,
  Settings,
  Upload,
  Globe,
  Database,
  CheckCircle,
  Sparkles,
  ChevronRight
} from "lucide-react";

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState("conversations");
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Refs for 3D parallax elements
  const containerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null); // Floating Knowledge
  const card2Ref = useRef<HTMLDivElement>(null); // Floating CRM Sync

  const tabs = [
    { id: "conversations", label: "Conversations", icon: MessageSquare, badge: "Active" },
    { id: "leads", label: "Leads CRM", icon: Users, badge: "Synced" },
    { id: "analytics", label: "AI Analytics", icon: BarChart3, badge: "Live" },
    { id: "kb", label: "Knowledge Base", icon: BookOpen, badge: "Trained" },
    { id: "settings", label: "AI Settings", icon: Settings, badge: "V1.0" },
  ];

  // Animate tab content entry on tab change
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    animate(el, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 350,
      easing: "easeOutQuad",
    });
  }, [activeTab]);

  // Anime.js 3D tilt & parallax mouse effects
  useEffect(() => {
    const container = containerRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;

    if (!container || !card1 || !card2) return;

    // Default stable tilt angles
    animate(container, {
      rotateX: 6,
      rotateY: -8,
      rotateZ: 0.5,
      duration: 0,
    });

    animate(card1, { translateZ: 30, duration: 0 });
    animate(card2, { translateZ: 50, duration: 0 });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Rotations
      const rotX = ((y - centerY) / centerY) * -8; // Tilt X range
      const rotY = ((x - centerX) / centerX) * 8;  // Tilt Y range

      animate(container, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 300,
        easing: "easeOutQuad",
      });

      // Parallax translation of floating widgets
      animate(card1, {
        translateX: ((x - centerX) / centerX) * -12,
        translateY: ((y - centerY) / centerY) * -12,
        translateZ: 35,
        duration: 300,
        easing: "easeOutQuad",
      });

      animate(card2, {
        translateX: ((x - centerX) / centerX) * 12,
        translateY: ((y - centerY) / centerY) * 12,
        translateZ: 60,
        duration: 300,
        easing: "easeOutQuad",
      });
    };

    const handleMouseLeave = () => {
      // Revert to stable default state
      animate(container, {
        rotateX: 6,
        rotateY: -8,
        rotateZ: 0.5,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
      animate(card1, {
        translateX: 0,
        translateY: 0,
        translateZ: 30,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
      animate(card2, {
        translateX: 0,
        translateY: 0,
        translateZ: 50,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-slate-50/20 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* LEFT COLUMN: Section Headers & Navigation Selector */}
        <div className="lg:col-span-5 flex flex-col text-center lg:text-left items-center lg:items-start">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Workspace</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            The Unified AI <br />Control Center
          </h3>
          <p className="text-slate-500 mt-4 max-w-lg leading-relaxed mb-10 text-sm">
            Manage your AI employee, upload business context, review customer transcripts, and monitor lead growth from a single secure interface.
          </p>

          {/* Desktop Vertical Menu Selectors */}
          <div className="hidden lg:flex flex-col gap-3.5 w-full max-w-sm">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-950 shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50/50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4.5 h-4.5 ${isSelected ? "text-primary" : "text-slate-400 group-hover:text-primary"}`} />
                    <span className="text-xs font-bold tracking-tight">{tab.label}</span>
                  </div>
                  <span className={`text-[8.5px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    isSelected ? "bg-slate-800 border-slate-700 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-400"
                  }`}>
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: 3D App Workspace Scene */}
        <div className="lg:col-span-7 flex justify-center items-center w-full min-h-[480px]">
          {/* 3D Perspective Container */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-[580px] aspect-[16/10] rounded-2xl border border-slate-200/80 bg-white shadow-2xl flex preserve-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* 1. macOS Style App Navigation Sidebar inside window */}
            <div className="w-40 bg-slate-50 border-r border-slate-100 p-4 flex flex-col gap-4 rounded-l-2xl flex-shrink-0">
              {/* Window dots */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>

              {/* Sidebar Tabs */}
              <div className="flex flex-col gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isSelected = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full py-2 px-2.5 rounded-lg text-left flex items-center gap-2 transition-colors cursor-pointer focus:outline-none ${
                        isSelected 
                          ? "bg-slate-200/50 text-slate-950 font-bold" 
                          : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/20"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="text-[9px] tracking-tight">{tab.label.split(" ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Main Screen Area displaying active tab */}
            <div 
              ref={contentRef}
              className="flex-1 bg-white rounded-r-2xl overflow-hidden flex flex-col justify-between"
            >
              {/* Active Tab Component */}
              {activeTab === "conversations" && (
                <div className="p-5 flex-grow flex flex-col justify-between text-slate-800 font-sans h-full">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-xs flex items-center gap-2 text-slate-900">
                      <MessageSquare className="w-4 h-4 text-primary" /> Live Transcripts
                    </h4>
                    <span className="text-[8px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      3 Active Chats
                    </span>
                  </div>
                  <div className="flex-grow py-4 flex flex-col gap-3 text-[10px] overflow-y-auto">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 max-w-[75%] shadow-sm">
                      <span className="text-[8px] text-slate-400 font-bold block mb-0.5">Customer (WhatsApp)</span>
                      Can you explain your pricing plans for coaching institutes?
                    </div>
                    <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/10 text-slate-800 max-w-[80%] self-end shadow-sm">
                      <span className="text-[8px] text-primary font-bold block mb-0.5">Botty AI Agent</span>
                      Sure! We have a Growth plan ($49/mo) and an Enterprise plan. The Growth plan supports up to 10 team members and custom knowledge documents.
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "leads" && (
                <div className="p-5 flex-grow flex flex-col justify-between text-slate-800 font-sans h-full">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-xs flex items-center gap-2 text-slate-900">
                      <Users className="w-4 h-4 text-primary" /> Automated Lead CRM
                    </h4>
                    <span className="text-[8.5px] text-slate-400">Updated 2m ago</span>
                  </div>
                  <div className="flex-grow py-3 flex flex-col gap-1.5 overflow-y-auto text-[9.5px]">
                    <div className="grid grid-cols-12 gap-1 p-2 border-b border-slate-100 font-bold text-slate-400 uppercase text-[8px] tracking-wider">
                      <div className="col-span-5">Contact</div>
                      <div className="col-span-4">Source</div>
                      <div className="col-span-3">Status</div>
                    </div>
                    <div className="grid grid-cols-12 gap-1 p-2 items-center hover:bg-slate-50 rounded-lg">
                      <div className="col-span-5 font-bold text-slate-800">Aman Raj</div>
                      <div className="col-span-4 text-primary font-semibold">WhatsApp</div>
                      <div className="col-span-3"><span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[8.5px] font-bold border border-emerald-100">Synced</span></div>
                    </div>
                    <div className="grid grid-cols-12 gap-1 p-2 items-center hover:bg-slate-50 rounded-lg">
                      <div className="col-span-5 font-bold text-slate-800">Emily Watson</div>
                      <div className="col-span-4 text-indigo-500 font-semibold">Web Widget</div>
                      <div className="col-span-3"><span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[8.5px] font-bold border border-emerald-100">Synced</span></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="p-5 flex-grow flex flex-col justify-between text-slate-800 font-sans h-full">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-xs flex items-center gap-2 text-slate-900">
                      <BarChart3 className="w-4 h-4 text-primary" /> Performance
                    </h4>
                    <span className="text-[8.5px] text-emerald-600 font-bold">98.4% Accuracy</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 py-6 text-[10px]">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center shadow-sm">
                      <span className="text-xl font-extrabold block text-slate-900">12.4K</span>
                      <span className="text-[8.5px] text-slate-400 font-bold tracking-wider mt-0.5 block">Chats</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center shadow-sm">
                      <span className="text-xl font-extrabold block text-primary">99.9%</span>
                      <span className="text-[8.5px] text-slate-400 font-bold tracking-wider mt-0.5 block">Uptime</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center shadow-sm">
                      <span className="text-xl font-extrabold block text-emerald-600">840</span>
                      <span className="text-[8.5px] text-slate-400 font-bold tracking-wider mt-0.5 block">Leads</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "kb" && (
                <div className="p-5 flex-grow flex flex-col justify-between text-slate-800 font-sans h-full">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-xs flex items-center gap-2 text-slate-900">
                      <BookOpen className="w-4 h-4 text-primary" /> Training Database
                    </h4>
                    <button className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[8.5px] font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer">
                      <Upload className="w-3 h-3" /> Upload
                    </button>
                  </div>
                  <div className="flex-grow py-3 flex flex-col gap-2 overflow-y-auto text-[10px]">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="w-3.5 h-3.5 text-primary" />
                        <span className="font-bold text-slate-800 truncate max-w-[120px]">admissions_guide.pdf</span>
                      </div>
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Ready</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="font-bold text-slate-800 truncate max-w-[120px]">botty.ai/faq-docs</span>
                      </div>
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Ready</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="p-5 flex-grow flex flex-col justify-between text-slate-800 font-sans h-full">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="font-extrabold text-xs flex items-center gap-2 text-slate-900">
                      <Settings className="w-4 h-4 text-primary" /> Prompt config
                    </h4>
                    <span className="text-[9px] font-mono text-slate-400">Model: GPT-4o</span>
                  </div>
                  <div className="flex-grow py-3 flex flex-col gap-2.5 text-[9.5px] overflow-y-auto">
                    <div>
                      <label className="block text-[8px] text-slate-400 font-bold uppercase mb-0.5">System Prompt</label>
                      <textarea
                        readOnly
                        value="You are a professional assistant for Botty. Format output clearly, act polite, and only answer questions based on the knowledge base uploads."
                        className="w-full h-10 bg-slate-50 border border-slate-200 rounded-lg p-2 text-[9.5px] font-mono text-slate-700 resize-none outline-none leading-normal"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[8px] text-slate-400 font-bold uppercase mb-0.5">Creativity (Temp)</label>
                        <div className="h-1 rounded-full bg-slate-100 relative mt-1"><div className="absolute top-0 left-0 bottom-0 w-[20%] bg-primary rounded-full" /></div>
                      </div>
                      <div>
                        <label className="block text-[8px] text-slate-400 font-bold uppercase mb-0.5">Confidence Cutoff</label>
                        <div className="h-1 rounded-full bg-slate-100 relative mt-1"><div className="absolute top-0 left-0 bottom-0 w-[85%] bg-emerald-500 rounded-full" /></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Floating Widget Card 1 (Knowledge Sync Status) */}
            <div 
              ref={card1Ref}
              className="hidden md:flex absolute -left-14 top-1/4 z-20 p-3.5 rounded-xl border border-slate-200 bg-white/95 shadow-xl flex-col gap-1 max-w-[170px]"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(30px)" }}
            >
              <span className="text-[8px] font-bold uppercase tracking-wider text-primary">Active Context</span>
              <div className="font-extrabold text-[10px] text-slate-900 truncate">product_catalog_v2.docx</div>
              <div className="text-[8.5px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Trained & Synced
              </div>
            </div>

            {/* 4. Floating Widget Card 2 (CRM Sync Leads Captured) */}
            <div 
              ref={card2Ref}
              className="hidden md:flex absolute -right-14 bottom-1/4 z-20 p-3.5 rounded-xl border border-slate-200 bg-white/95 shadow-xl flex-col gap-1 max-w-[170px]"
              style={{ transformStyle: "preserve-3d", transform: "translateZ(50px)" }}
            >
              <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400">HubSpot Sync</span>
              <div className="font-extrabold text-xl text-slate-950 flex items-baseline gap-0.5">
                840 <span className="text-[8px] text-emerald-600 font-extrabold flex items-center gap-0.5"><CheckCircle className="w-2.5 h-2.5 inline" /> 100%</span>
              </div>
              <div className="text-[8px] text-slate-400">Leads exported to CRM</div>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
