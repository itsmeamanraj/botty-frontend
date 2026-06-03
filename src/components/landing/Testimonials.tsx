"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Aman Raj",
      role: "Founder, TechEdu Solutions",
      review: "Botty automated 90% of our student admission inquiries within a week. The WhatsApp API integration is incredibly smooth and reliable.",
      avatar: "AR",
    },
    {
      name: "Sarah Jenkins",
      role: "Marketing Lead, RealEstate Pro",
      review: "We capture qualified property buyers directly through automated WhatsApp brochures. Our lead conversion rates increased by 42%.",
      avatar: "SJ",
    },
    {
      name: "Marcus Chen",
      role: "Operations Director, Zenith Manufacturing",
      review: "Our shipping and stock level inquiries are now 100% automated. Support staff can focus on custom logistics orders. Absolutely a game changer.",
      avatar: "MC",
    },
    {
      name: "Deepak Sharma",
      role: "Director, Apex Coaching Institute",
      review: "Automating test results distribution and inquiries over WhatsApp was a massive pain point. Botty solved it instantly.",
      avatar: "DS",
    },
  ];

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-[#0A0E1A]/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Testimonials</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white">Loved by Founders & Support Teams</h3>
        </div>

        {/* Marquee Row */}
        <div className="flex gap-6 overflow-hidden relative w-full py-4 mask-gradient">
          <motion.div
            animate={{ x: [0, -1000] }}
            transition={{
              ease: "linear",
              duration: 35,
              repeat: Infinity,
            }}
            className="flex gap-6 flex-shrink-0"
          >
            {/* Double the list to support infinite scroll wrap */}
            {[...reviews, ...reviews].map((rev, idx) => (
              <div
                key={idx}
                className="w-[340px] p-6 rounded-2xl border border-white/5 bg-[#151B30]/40 flex flex-col justify-between flex-shrink-0"
              >
                <div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-xs text-white/90 leading-relaxed mb-6 italic">
                    "{rev.review}"
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                    {rev.avatar}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                    <span className="text-[10px] text-text-muted">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
