"use client";

import { useState } from "react";
import { CreditCard, Check, Zap, Cpu, Users, BarChart } from "lucide-react";
import { Card, Button } from "@heroui/react";
import { TenantRole } from "@/hooks/useRBAC";
import { TenantFeature } from "@/hooks/useFeatures";

interface SubscriptionProps {
  onAlert: (msg: string) => void;
  role: TenantRole;
  enabledFeatures: Record<TenantFeature, boolean>;
}

export default function Subscription({ onAlert, role, enabledFeatures }: SubscriptionProps) {
  // Helper to determine plan name
  const getPlanName = () => {
    if (role.startsWith("WHITE_LABEL")) return "Reseller SaaS Tier";
    if (enabledFeatures.white_label) return "Enterprise custom";
    if (enabledFeatures.crm && enabledFeatures.whatsapp) return "Growth Plan";
    return "Starter Plan";
  };

  const getPlanPrice = () => {
    if (role.startsWith("WHITE_LABEL")) return "$499/mo";
    if (enabledFeatures.white_label) return "Custom Pricing";
    if (enabledFeatures.crm && enabledFeatures.whatsapp) return "$149/mo";
    return "$49/mo";
  };

  const plans = [
    { name: "Starter Plan", price: "$49", desc: "Perfect for local businesses experimenting with AI support.", features: ["3 Active Chatbots", "10,000 Messages / month", "5 Team Members", "Website Chat Widget", "Basic Knowledge Base"] },
    { name: "Growth Plan", price: "$149", desc: "For scaling companies requiring advanced CRM & channels.", features: ["10 Active Chatbots", "50,000 Messages / month", "15 Team Members", "Leads CRM Pipeline Integration", "WhatsApp Connect Access", "Advanced API Access"] },
    { name: "Enterprise Custom", price: "Custom", desc: "For resellers and corporate clusters needing white labeling.", features: ["Unlimited Chatbots", "Unlimited Message Volume", "Custom Domain Mapping", "Custom Whitelabel Rebranding", "Dedicated Vector DB Nodes", "SLA Delivery Guarantee"] }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Subscription Plan Hub</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">View your current usage tier, invoice limits, and customize platform capabilities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active plan card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Currently Active Tier</span>
            <h3 className="text-2xl font-extrabold text-[#4F46E5] mt-1 tracking-tight">{getPlanName()}</h3>
            <p className="text-xs text-[#6B7280] mt-1.5 leading-relaxed">
              Your billing cycle renews on <strong>July 4, 2026</strong>. Billed at <strong>{getPlanPrice()}</strong> recurring monthly.
            </p>

            <div className="border-t border-[#F3F4F6] pt-5 mt-6 flex flex-col gap-4">
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[#9CA3AF]" /> Active Chatbots
                  </span>
                  <span className="text-[#111827]">3 / 5 Bots</span>
                </div>
                <div className="w-full bg-[#F3F4F6] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#4F46E5] h-full rounded-full" style={{ width: "60%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
                    <BarChart className="w-3.5 h-3.5 text-[#9CA3AF]" /> Monthly Message Volume
                  </span>
                  <span className="text-[#111827]">8,240 / 10,000 messages</span>
                </div>
                <div className="w-full bg-[#F3F4F6] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#EF4444] h-full rounded-full" style={{ width: "82.4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1.5">
                  <span className="text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#9CA3AF]" /> Organization Seats
                  </span>
                  <span className="text-[#111827]">4 / 5 Invited</span>
                </div>
                <div className="w-full bg-[#F3F4F6] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#10B981] h-full rounded-full" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-6">Upgrade Platform License</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plans.map((p) => {
                const isActive = getPlanName().toLowerCase().includes(p.name.split(" ")[0].toLowerCase());
                return (
                  <div 
                    key={p.name} 
                    className={`p-4 rounded-xl border flex flex-col justify-between gap-4 transition-all ${
                      isActive 
                        ? "border-[#4F46E5] bg-[#EEF2FF]/20" 
                        : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
                    }`}
                  >
                    <div>
                      <span className="text-xs font-extrabold text-[#111827] block">{p.name}</span>
                      <div className="flex items-baseline gap-1 mt-2 mb-2">
                        <span className="text-lg font-extrabold text-[#111827]">{p.price}</span>
                        {p.price !== "Custom" && <span className="text-[10px] text-[#6B7280]">/mo</span>}
                      </div>
                      <p className="text-[10px] text-[#6B7280] leading-relaxed line-clamp-3">{p.desc}</p>
                    </div>

                    <div className="border-t border-[#F3F4F6] pt-3 flex flex-col gap-2">
                      {p.features.slice(0, 3).map((f, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-1.5 text-[9px] text-[#4B5563] font-semibold">
                          <Check className="w-3 h-3 text-[#10B981] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onPress={() => {
                        if (isActive) {
                          onAlert("You are already on this plan!");
                        } else {
                          onAlert(`Checkout launched for plan: ${p.name}`);
                        }
                      }}
                      className={`w-full py-2 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]"
                          : "bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                      }`}
                    >
                      {isActive ? "Current Plan" : "Upgrade Plan"}
                    </Button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
