"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { motion } from "framer-motion";
import { Link2, FileUp, Sparkles, MessageCircle, Zap, ShieldCheck, Database, QrCode, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const mockupRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      step: "01",
      title: "Connect WhatsApp",
      desc: "Link your WhatsApp Business phone number or scan our widget code in seconds.",
      icon: Link2,
    },
    {
      step: "02",
      title: "Upload Documents",
      desc: "Upload PDFs, support documents, FAQs, or provide your public website URL.",
      icon: FileUp,
    },
    {
      step: "03",
      title: "Train Your AI",
      desc: "Our engine processes your documentation and builds a custom knowledge graph.",
      icon: Sparkles,
    },
    {
      step: "04",
      title: "Receive Queries",
      desc: "Customers initiate chat via WhatsApp or your website interface.",
      icon: MessageCircle,
    },
    {
      step: "05",
      title: "AI Responds Instantly",
      desc: "The chatbot answers customer queries accurately in real-time.",
      icon: Zap,
    },
    {
      step: "06",
      title: "Leads Stored",
      desc: "All contacts, intents, and lead data are synced directly into your CRM.",
      icon: ShieldCheck,
    },
  ];

  // Animate sticky mockup changes
  useEffect(() => {
    const el = mockupRef.current;
    if (!el) return;

    animate(el, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 350,
      easing: "easeOutQuad",
    });
  }, [activeStep]);

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-slate-50/30 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Workflow</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900">How Botty Works</h3>
          <p className="text-slate-500 mt-4 max-w-lg mx-auto">
            From connection to automated CRM sync in 6 simple, fully guided steps.
          </p>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: Sticky Mockup Visualizer */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 z-10 w-full flex justify-center">
            <div 
              ref={mockupRef}
              className="w-full max-w-[380px] h-[330px] rounded-2xl border border-slate-200 bg-white p-6 shadow-xl flex flex-col justify-between overflow-hidden relative"
            >
              {/* STEP 0: CONNECT WHATSAPP */}
              {activeStep === 0 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Link2 className="w-4 h-4 text-emerald-600" /> WhatsApp Connector
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Setup Active</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 py-4">
                    <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl shadow-inner relative group cursor-pointer hover:border-primary/25 transition-colors">
                      <QrCode className="w-24 h-24 text-slate-800" />
                      <span className="absolute inset-0 bg-white/80 flex items-center justify-center text-[10px] font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">Scan to Link</span>
                    </div>
                    <span className="text-[10px] text-slate-400 text-center max-w-[200px] leading-normal font-medium">
                      Link your device by scanning the QR code in Linked Devices.
                    </span>
                  </div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FileUp className="w-4 h-4 text-primary" /> Context Uploader
                    </span>
                    <span className="text-[9px] font-bold text-slate-400">PDF, TXT, URLs</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-2.5 py-5 justify-center">
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-[10px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-primary" /> admission_rules.pdf</span>
                      <span className="text-[9px] font-bold text-emerald-600">100% Ready</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50 text-[10px] text-slate-600 font-bold">
                      <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5 text-primary" /> faq_catalog.txt</span>
                      <span className="text-[9px] font-bold text-emerald-600">100% Ready</span>
                    </div>
                    <div className="border border-dashed border-slate-200 rounded-xl p-3 text-center text-[10px] text-slate-400 font-bold cursor-pointer hover:border-primary/30 transition-colors">
                      + Add files or paste website link
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Vector Processing
                    </span>
                    <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Indexing</span>
                  </div>
                  <div className="flex-1 flex flex-col items-center justify-center gap-4 py-4">
                    <div className="w-16 h-16 rounded-full border-4 border-dashed border-primary border-t-transparent animate-spin flex items-center justify-center">
                      <Database className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <div className="text-center">
                      <span className="text-[11px] font-bold text-slate-800 block">Constructing Knowledge Graph</span>
                      <span className="text-[9px] text-slate-400 font-medium mt-0.5 block">Embedding vectors into DB index...</span>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <MessageCircle className="w-4 h-4 text-primary" /> Incoming Customer Inquiry
                    </span>
                    <span className="text-[9px] font-mono text-slate-400">WhatsApp API</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center py-4">
                    <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 max-w-[85%] shadow-sm">
                      <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-slate-700">U</div>
                      <div className="text-[11px] text-slate-700 leading-normal font-medium">
                        "Hey, do you have any real estate options in Sector 62 under 50 Lakhs?"
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 4 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-primary animate-pulse" /> AI Agent Responding
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Resolving</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center py-4 items-end">
                    <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-primary text-white max-w-[90%] shadow-md shadow-primary/10">
                      <div className="text-[11px] leading-normal">
                        "Checking catalogs... Yes, we have 2 premium BHK flats in Sector 62 priced at 48L. Would you like a brochure?"
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStep === 5 && (
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> HubSpot Lead Synced
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Synced</span>
                  </div>
                  <div className="flex-1 flex flex-col gap-2 py-4 justify-center text-[10px]">
                    <div className="grid grid-cols-12 gap-1 py-1 border-b border-slate-50 font-bold">
                      <div className="col-span-4 text-slate-400">Name:</div>
                      <div className="col-span-8 text-slate-800">Aman Raj</div>
                    </div>
                    <div className="grid grid-cols-12 gap-1 py-1 border-b border-slate-50 font-bold">
                      <div className="col-span-4 text-slate-400">Phone:</div>
                      <div className="col-span-8 text-slate-800">+91 99824...</div>
                    </div>
                    <div className="grid grid-cols-12 gap-1 py-1 border-b border-slate-50 font-bold">
                      <div className="col-span-4 text-slate-400">Pipeline:</div>
                      <div className="col-span-8 text-slate-800">Real Estate Leads</div>
                    </div>
                    <div className="grid grid-cols-12 gap-1 py-1 font-bold">
                      <div className="col-span-4 text-slate-400">Intent:</div>
                      <div className="col-span-8 text-primary">Brochure Requested</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Card indicator dots */}
              <div className="flex justify-center gap-1 mt-2">
                {steps.map((_, idx) => (
                  <span 
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      activeStep === idx ? "bg-primary" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Vertical Connected Timeline */}
          <div className="lg:col-span-7 flex flex-col gap-6 relative pl-6 sm:pl-8">
            {/* Connecting Vertical Line */}
            <div className="absolute inset-y-2 left-3 sm:left-4 w-[2px] bg-gradient-to-b from-primary/30 via-accent/30 to-emerald-500/10 z-0" />

            {steps.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeStep === idx;
              return (
                <div
                  key={item.step}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`relative z-10 flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? "bg-white border-slate-200 shadow-md scale-[1.01]" 
                      : "bg-transparent border-transparent hover:bg-white/40 hover:border-slate-200/50"
                  }`}
                >
                  {/* Icon Node badge */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 relative transition-all duration-300 ${
                    isActive ? "bg-primary text-white scale-105" : "bg-white text-slate-400 border border-slate-200"
                  }`}>
                    <Icon className="w-4 h-4" />
                    <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-extrabold text-white ${
                      isActive ? "bg-slate-900 border border-primary" : "bg-slate-400 border border-white"
                    }`}>
                      {item.step}
                    </span>
                  </div>

                  <div>
                    <h4 className={`text-base font-extrabold mb-1 transition-colors ${
                      isActive ? "text-primary" : "text-slate-900"
                    }`}>
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
