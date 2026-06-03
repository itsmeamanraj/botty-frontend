"use client";

import { motion } from "framer-motion";
import {
  MessageSquare,
  MessagesSquare,
  Users,
  FileText,
  BarChart3,
  Award,
  UserCheck,
  Globe,
  Terminal,
} from "lucide-react";

export default function Features() {
  const list = [
    {
      title: "WhatsApp AI Agent",
      desc: "Connect your official WhatsApp Business API. Auto-reply to queries instantly with context-aware responses.",
      icon: MessageSquare,
    },
    {
      title: "Website Chat Widget",
      desc: "Embed a lightweight, highly customizable chat widget on your website to capture visitors.",
      icon: MessagesSquare,
    },
    {
      title: "Lead CRM",
      desc: "Automatically capture contacts, conversation details, and categorize leads in an integrated CRM dashboard.",
      icon: Users,
    },
    {
      title: "Knowledge Base Training",
      desc: "Upload PDFs, docx, links, or text to train your custom AI agent in minutes. No coding required.",
      icon: FileText,
    },
    {
      title: "AI Analytics",
      desc: "Monitor conversation volume, resolution rate, top customer queries, and agent performance.",
      icon: BarChart3,
    },
    {
      title: "White Label Solution",
      desc: "Rebrand the entire platform under your domain and logo, offering AI chatbot services to your own clients.",
      icon: Award,
    },
    {
      title: "Team Management",
      desc: "Manage operator access, roles, and handoff rules when human supervision is required.",
      icon: UserCheck,
    },
    {
      title: "Multi Language Support",
      desc: "Communicate with customers in over 50+ languages automatically with native translations.",
      icon: Globe,
    },
    {
      title: "Custom AI Prompts",
      desc: "Define custom system prompts and tone of voice so that the agent matches your exact brand identity.",
      icon: Terminal,
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Capabilities</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white">Features Built for Growth</h3>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Scale your marketing, customer support, and sales automation with our integrated enterprise features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group p-8 rounded-2xl border border-white/5 bg-[#151B30]/40 hover:bg-[#151B30]/80 hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Glow overlay */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:text-accent group-hover:border-accent/40 transition-colors duration-300 mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                
                <h4 className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
                  {item.title}
                </h4>
                
                <p className="text-sm text-text-muted leading-relaxed">
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
