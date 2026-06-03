"use client";

import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, ArrowRightLeft } from "lucide-react";

export default function ProblemSolution() {
  const problems = [
    "Missed inquiries during non-business hours",
    "Slow response times causing user bounce",
    "Lost leads due to lack of immediate followup",
    "High staff dependency and training overhead",
    "Poor customer experience and satisfaction",
  ];

  const solutions = [
    "Instant replies to all user queries automatically",
    "Automated support active 24/7, all year round",
    "Real-time lead capture & automatic CRM syncing",
    "Consistent and instant answers based on documents",
    "Human handoff option for complex requests",
  ];

  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Challenges & Outcomes</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">Why Businesses Choose Botty</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Problems Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-2xl border border-red-500/10 bg-red-950/5 p-8 backdrop-blur-md"
          >
            <h4 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Typical Business Challenges
            </h4>
            <ul className="flex flex-col gap-4">
              {problems.map((p, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-text-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 mt-2 flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* VS Divider */}
          <div className="lg:col-span-2 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-primary/20">
              <ArrowRightLeft className="w-5 h-5 animate-pulse" />
            </div>
          </div>

          {/* Solutions Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-2xl border border-success/20 bg-success/5 p-8 backdrop-blur-md"
          >
            <h4 className="text-xl font-bold text-success mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6" />
              Botty AI Solutions
            </h4>
            <ul className="flex flex-col gap-4">
              {solutions.map((s, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
