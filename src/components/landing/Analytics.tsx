"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageSquare, Users, Activity, Clock } from "lucide-react";

export default function Analytics() {
  const stats = [
    {
      label: "Messages Processed",
      value: 1000000,
      suffix: "+",
      icon: MessageSquare,
      color: "text-primary",
    },
    {
      label: "Leads Generated",
      value: 50000,
      suffix: "+",
      icon: Users,
      color: "text-accent",
    },
    {
      label: "Uptime Guaranteed",
      value: 99.9,
      suffix: "%",
      icon: Activity,
      color: "text-success",
    },
    {
      label: "AI Coverage",
      value: 24,
      suffix: "/7",
      icon: Clock,
      color: "text-purple-400",
    },
  ];

  return (
    <section className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-8 rounded-2xl border border-white/5 bg-[#151B30]/30 hover:bg-[#151B30]/50 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 text-white/70">
                  <Icon className="w-5 h-5" />
                </div>
                
                {/* Visual Number display */}
                <div className={`text-4xl font-extrabold tracking-tight ${stat.color} mb-2`}>
                  <Counter target={stat.value} />
                  <span>{stat.suffix}</span>
                </div>

                <div className="text-sm font-semibold text-white/80">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Simple counter component
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2 seconds
    const end = target;
    if (start === end) return;

    const increment = end > 100 ? Math.ceil(end / 100) : 0.1;
    const stepTime = Math.abs(Math.floor(duration / (end / increment)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(parseFloat(start.toFixed(1)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  // Format big numbers
  if (count >= 1000000) {
    return <>{(count / 1000000).toFixed(0)}M</>;
  }
  if (count >= 1000) {
    return <>{(count / 1000).toFixed(0)}K</>;
  }

  return <>{count}</>;
}
