"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Card, Button } from "@heroui/react";

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
    <section id="pricing" className="py-24 relative z-10 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Subscription Plans</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900">Fair, Growth-Friendly Pricing</h3>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
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
              className="flex flex-col h-full"
            >
              <Card
                className={`p-8 border flex flex-col justify-between relative bg-transparent overflow-visible flex-grow ${
                  tier.popular
                    ? "border-primary bg-indigo-50/20 shadow-xl shadow-indigo-600/5"
                    : "border-slate-200/80 bg-white shadow-sm"
                }`}
                style={{ borderRadius: "24px" }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold shadow-md uppercase tracking-wider z-20">
                    Most Popular
                  </span>
                )}

                <Card.Header className="flex flex-col items-start p-0 mb-6 bg-transparent">
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{tier.name}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{tier.desc}</p>
                </Card.Header>

                <Card.Content className="p-0 flex-grow bg-transparent">
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-slate-900">{tier.price}</span>
                    <span className="text-xs text-slate-400 font-medium">{tier.period}</span>
                  </div>

                  <hr className="border-slate-100 mb-8" />

                  <ul className="flex flex-col gap-4 mb-8">
                    {tier.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-slate-700 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-600">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </Card.Content>

                <Card.Footer className="p-0 bg-transparent mt-auto">
                  <Button
                    fullWidth
                    className={`py-6 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                      tier.popular
                        ? "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary/95"
                        : "bg-white hover:bg-slate-50 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Card.Footer>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
