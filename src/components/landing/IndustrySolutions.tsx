"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  HeartPulse,
  Wrench,
  Building,
  PlaneTakeoff,
  ShoppingBag,
  Briefcase,
} from "lucide-react";

export default function IndustrySolutions() {
  const industries = [
    {
      name: "Schools",
      desc: "Manage admissions queries, tuition alerts, and parent updates seamlessly.",
      icon: GraduationCap,
    },
    {
      name: "Coaching Institutes",
      desc: "Automate exam schedules, test results, and course registrations.",
      icon: BookOpen,
    },
    {
      name: "Hospitals & Clinics",
      desc: "Coordinate appointments, patient pre-checklists, and report downloads.",
      icon: HeartPulse,
    },
    {
      name: "Manufacturers",
      desc: "Provide shipping statuses, tracking links, and warehouse queries.",
      icon: Wrench,
    },
    {
      name: "Real Estate",
      desc: "Qualify property buyers, schedule visits, and send site brochures.",
      icon: Building,
    },
    {
      name: "Travel Agencies",
      desc: "Send custom travel itineraries, flight changes, and instant replies.",
      icon: PlaneTakeoff,
    },
    {
      name: "E-commerce",
      desc: "Send order status alerts, discount coupons, and handle returns.",
      icon: ShoppingBag,
    },
    {
      name: "Consultants & Agencies",
      desc: "Automate calendar booking, qualification forms, and initial callbacks.",
      icon: Briefcase,
    },
  ];

  return (
    <section id="industries" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Verticals</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white">Tailored Industry Solutions</h3>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Pre-configured AI agent templates optimized for specific business verticals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group p-6 rounded-2xl border border-white/5 bg-[#151B30]/30 hover:bg-[#151B30]/65 hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {ind.name}
                  </h4>
                  <p className="text-xs text-text-muted leading-relaxed">
                    {ind.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[11px] font-semibold text-accent flex items-center gap-1 cursor-pointer">
                    Explore Template &rarr;
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
