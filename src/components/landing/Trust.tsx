"use client";

import { motion } from "framer-motion";
import { School, Landmark, Building2, Factory, Home, Plane } from "lucide-react";

export default function Trust() {
  const industries = [
    { name: "Schools", icon: School },
    { name: "Institutes", icon: Landmark },
    { name: "Hospitals", icon: Building2 },
    { name: "Manufacturers", icon: Factory },
    { name: "Real Estate", icon: Home },
    { name: "Travel Agencies", icon: Plane },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-[#0F1426]/30 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-center text-xs font-semibold uppercase tracking-widest text-text-muted mb-8">
          Trusted by Growing Businesses across Industries
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-2.5 text-white/40 hover:text-white/80 transition-all duration-300 group cursor-pointer"
              >
                <Icon className="w-5 h-5 group-hover:text-accent transition-colors duration-300" />
                <span className="font-semibold text-sm tracking-wide">{ind.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
