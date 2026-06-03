"use client";

import { motion } from "framer-motion";
import { Check, HelpCircle } from "lucide-react";

export default function Pricing() {
  const tiers = [
    {
      name: "Starter",
      desc: "Perfect for local businesses starting with AI customer support.",
      price: "$29",
      period: "/month",
      features: [
        "1 Connected WhatsApp Number",
        "500 AI Messages / month",
        "Train on up to 5 Documents",
        "Standard Web Chat Widget",
        "Email Support",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Growth",
      desc: "Ideal for growing teams seeking advanced CRM automation.",
      price: "$79",
      period: "/month",
      features: [
        "3 Connected WhatsApp Numbers",
        "5,000 AI Messages / month",
        "Unlimited Knowledge Base Training",
        "Custom Branding Chat Widget",
        "HubSpot & Salesforce Sync",
        "Priority 24/7 Slack Support",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      desc: "Custom deployments and dedicated AI features for large teams.",
      price: "Custom",
      period: "",
      features: [
        "Unlimited WhatsApp Numbers",
        "Unlimited AI Messages",
        "Dedicated GPT/Claude Instance",
        "Complete White-Label Interface",
        "Custom CRM integrations",
        "Dedicated Account Director",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Subscription Plans</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white">Fair, Growth-Friendly Pricing</h3>
          <p className="text-text-muted mt-4 max-w-xl mx-auto">
            Choose the package that matches your operational needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`p-8 rounded-3xl border flex flex-col justify-between relative ${
                tier.popular
                  ? "border-primary bg-[#121832] shadow-xl shadow-primary/10"
                  : "border-white/5 bg-[#151B30]/30"
              }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold shadow-md shadow-primary/20 uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <h4 className="text-lg font-bold text-white mb-2">{tier.name}</h4>
                <p className="text-xs text-text-muted leading-relaxed mb-6">{tier.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-extrabold text-white">{tier.price}</span>
                  <span className="text-xs text-text-muted font-medium">{tier.period}</span>
                </div>

                <hr className="border-white/5 mb-8" />

                <ul className="flex flex-col gap-4 mb-8">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-white/90 leading-relaxed">
                      <span className="w-5 h-5 rounded-full bg-success/15 border border-success/20 flex items-center justify-center flex-shrink-0 text-success">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  tier.popular
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 hover:opacity-95"
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}
              >
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
