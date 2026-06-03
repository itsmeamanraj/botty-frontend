"use client";

import { motion } from "framer-motion";
import { Link2, FileUp, Sparkles, MessageCircle, Zap, ShieldCheck } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Connect WhatsApp",
      desc: "Link your WhatsApp Business phone number or scan our widget code in seconds.",
      icon: Link2,
      color: "from-primary to-[#8A84FF]",
    },
    {
      step: "02",
      title: "Upload Documents",
      desc: "Upload PDFs, support documents, FAQs, or provide your public website URL.",
      icon: FileUp,
      color: "from-[#8A84FF] to-accent",
    },
    {
      step: "03",
      title: "Train Your AI",
      desc: "Our engine processes your documentation and builds a custom knowledge graph.",
      icon: Sparkles,
      color: "from-accent to-success",
    },
    {
      step: "04",
      title: "Receive Queries",
      desc: "Customers initiate chat via WhatsApp or your website interface.",
      icon: MessageCircle,
      color: "from-success to-[#4FD1C5]",
    },
    {
      step: "05",
      title: "AI Responds Instantly",
      desc: "The chatbot answers customer queries accurately in real-time.",
      icon: Zap,
      color: "from-[#4FD1C5] to-[#B388FF]",
    },
    {
      step: "06",
      title: "Leads Stored",
      desc: "All contacts, intents, and lead data are synced directly into your CRM.",
      icon: ShieldCheck,
      color: "from-[#B388FF] to-primary",
    },
  ];

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-[#0A0E1A]/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Workflow</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white">How Botty Works</h3>
          <p className="text-text-muted mt-4 max-w-lg mx-auto">
            From connection to automated resolution in 6 simple, fully automated steps.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[55px] left-[5%] right-[5%] h-[2px] bg-gradient-to-r from-primary/20 via-accent/30 to-success/20 z-0" />

          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                {/* Glowing step icon */}
                <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${item.color} p-[1px] shadow-lg shadow-black/35 group-hover:scale-105 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-full bg-[#0F1426] flex items-center justify-center relative">
                    <Icon className="w-8 h-8 text-white group-hover:text-accent transition-colors" />
                    <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#1A2238] border border-white/10 flex items-center justify-center text-xs font-extrabold text-white">
                      {item.step}
                    </span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-white mt-6 mb-3 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h4>
                
                <p className="text-sm text-text-muted max-w-xs leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
