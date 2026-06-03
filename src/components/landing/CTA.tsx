"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";

export default function CTA() {
  return (
    <section id="trial" className="py-24 relative z-10 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-primary/30 to-accent/20 rounded-full blur-[100px] opacity-75" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/10 bg-[#0F1426]/90 p-10 sm:p-16 text-center shadow-2xl backdrop-blur-md relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Your AI Employee Is Ready
          </h3>
          
          <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto mb-10 leading-relaxed">
            Start automating customer conversations, resolving tickets instantly, and capturing qualified leads over WhatsApp and Web Chat today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#trial-start"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-200 hover:-translate-y-0.5"
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#demo-calendar"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-accent" />
              Book 1-on-1 Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
