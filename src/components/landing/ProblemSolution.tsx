"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, ArrowDown, Sparkles } from "lucide-react";

export default function ProblemSolution() {
  const transformations = [
    {
      area: "Availability",
      title: "24/7 Customer Support",
      before: "Missed inquiries after 6 PM and during weekends, leading to lost sales and frustrated prospects.",
      after: "Instant automated responses active 24/7/365, ensuring no customer inquiry ever goes unanswered.",
    },
    {
      area: "Lead Capture",
      title: "Automated CRM Syncing",
      before: "Manual lead copy-pasting from chat history; contact details get buried and forgotten.",
      after: "AI automatically extracts customer names, phones, and intents, syncing them instantly to HubSpot.",
    },
    {
      area: "Resolution Speed",
      title: "Context-Aware Accuracy",
      before: "Support agents take minutes searching documents and guidelines, leading to high bounce rates.",
      after: "Vector-trained AI answers queries accurately in milliseconds based directly on uploaded PDFs and URLs.",
    },
    {
      area: "System Control",
      title: "Hybrid Human Handoff",
      before: "Pure chatbots get stuck in loops, irritating customers and driving them away without help.",
      after: "Smart filters detect complex tickets and smoothly transition the conversation to live human agents.",
    },
  ];

  return (
    <section id="features" className="py-24 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Headers */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Why Choose Botty</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900">The Ultimate Support Transformation</h3>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            See how Botty shifts your business operations from manual bottlenecks to fully automated, secure workflows.
          </p>
        </div>

        {/* Transformation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {transformations.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group p-6 sm:p-8 rounded-2xl border border-slate-200/80 bg-white hover:border-primary/20 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-extrabold text-slate-900 text-lg leading-none">{item.title}</h4>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                    {item.area}
                  </span>
                </div>

                {/* Before Row */}
                <div className="p-4 rounded-xl border border-red-100 bg-red-50/20 flex items-start gap-3 transition-colors duration-300">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest block mb-0.5">Before Botty</span>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.before}</p>
                  </div>
                </div>

                {/* Connecting Arrow */}
                <div className="flex justify-center my-3 relative">
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] border-l border-dashed border-slate-200" />
                  <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center relative z-10 text-slate-400 group-hover:text-primary group-hover:border-primary/30 transition-colors duration-300">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* After Row */}
                <div className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/20 flex items-start gap-3 group-hover:bg-emerald-50/30 transition-all duration-300">
                  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300" />
                  <div>
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest block mb-0.5 flex items-center gap-1">
                      After Botty <Sparkles className="w-3 h-3 text-emerald-500 animate-pulse" />
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">{item.after}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
