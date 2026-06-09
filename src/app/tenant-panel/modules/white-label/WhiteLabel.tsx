"use client";

import { useState } from "react";
import { Globe, Palette, Users, Save, Trash2, Edit2, ShieldAlert, BadgeDollarSign } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function WhiteLabel({ onAlert }: ActionProps) {
  const [activeTab, setActiveTab] = useState<"branding" | "pricing" | "tenants">("branding");

  // Branding Customization
  const [logoName, setLogoName] = useState("Zenith Reseller Logo");
  const [brandColor, setBrandColor] = useState("#06B6D4"); // Cyan Default
  const [portalDomain, setPortalDomain] = useState("dashboard.zenithsaas.com");

  // Reseller Pricing Config
  const [prices, setPrices] = useState({
    starter: "49",
    growth: "149",
    enterprise: "499"
  });

  // Tenants Customers List
  const [tenants, setTenants] = useState([
    { id: 1, name: "Alpha Logistics", domain: "support.alpha-log.com", plan: "Growth", botsCount: 4, status: "Active" },
    { id: 2, name: "Hospitality Pros", domain: "chat.hpros.net", plan: "Starter", botsCount: 1, status: "Active" },
    { id: 3, name: "Delta Global LLC", domain: "delta-help.com", plan: "Enterprise", botsCount: 12, status: "Active" },
    { id: 4, name: "Real Estate Match", domain: "assistant.rematch.co", plan: "Growth", botsCount: 0, status: "Suspended" }
  ]);

  const handleSaveBranding = () => {
    onAlert("Reseller White Label branding configuration saved.");
  };

  const handleUpdatePrices = () => {
    onAlert(`Tenant billing prices modified: Starter $${prices.starter}/mo, Growth $${prices.growth}/mo`);
  };

  const toggleTenantStatus = (id: number, current: string) => {
    const nextStatus = current === "Active" ? "Suspended" : "Active";
    setTenants(prev => prev.map(t => t.id === id ? { ...t, status: nextStatus } : t));
    onAlert(`Tenant status changed to ${nextStatus}.`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">White Label Hub</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Configure white-label branding, customized pricing plans, and oversee reseller tenant customer accounts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Switcher */}
        <div className="lg:col-span-3 flex flex-col gap-2 shrink-0">
          {([
            { id: "branding", label: "Dashboard Branding", icon: Palette },
            { id: "pricing", label: "SaaS Price Config", icon: BadgeDollarSign },
            { id: "tenants", label: "Tenant Accounts", icon: Users }
          ] as const).map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                  activeTab === tab.id
                    ? "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] border-transparent"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Configurations Forms Panel */}
        <div className="lg:col-span-9">
          <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
            {activeTab === "branding" && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Dashboard Branding Customisation</h3>
                  <Button 
                    onPress={handleSaveBranding}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl text-xs font-bold cursor-pointer text-white h-auto shrink-0 transition-colors"
                  >
                    Save Branding
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Reseller Portal Name</label>
                    <input
                      type="text"
                      value={logoName}
                      onChange={(e) => setLogoName(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Portal Custom CNAME Domain</label>
                    <input
                      type="text"
                      value={portalDomain}
                      onChange={(e) => setPortalDomain(e.target.value)}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5] focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Primary Interface Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="w-10 h-10 border border-[#E5E7EB] rounded-xl cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] font-mono outline-none focus:border-[#4F46E5]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "pricing" && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Tenant Subscription Pricing Tiers</h3>
                  <Button 
                    onPress={handleUpdatePrices}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl text-xs font-bold cursor-pointer text-white h-auto shrink-0 transition-colors"
                  >
                    Save Prices
                  </Button>
                </div>
                <p className="text-[10px] text-[#6B7280] leading-relaxed -mt-2">
                  Set custom monthly subscription charges that your client tenants will pay. Your reseller cost is fixed at $200/mo base.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Starter Tier Price ($/mo)</label>
                    <input
                      type="number"
                      value={prices.starter}
                      onChange={(e) => setPrices(prev => ({ ...prev, starter: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Growth Tier Price ($/mo)</label>
                    <input
                      type="number"
                      value={prices.growth}
                      onChange={(e) => setPrices(prev => ({ ...prev, growth: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Enterprise Tier Price ($/mo)</label>
                    <input
                      type="number"
                      value={prices.enterprise}
                      onChange={(e) => setPrices(prev => ({ ...prev, enterprise: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "tenants" && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">Reseller Tenant Accounts ({tenants.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                        <th className="pb-4">Tenant Company</th>
                        <th className="pb-4">Mapped CNAME</th>
                        <th className="pb-4">Active Plan</th>
                        <th className="pb-4">Chatbots</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenants.map((t) => (
                        <tr key={t.id} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC]">
                          <td className="py-4 font-bold text-[#111827]">{t.name}</td>
                          <td className="py-4 text-[#6B7280] font-mono">{t.domain}</td>
                          <td className="py-4 font-semibold text-[#4F46E5]">{t.plan}</td>
                          <td className="py-4 font-bold font-mono text-[#111827] text-center md:text-left">{t.botsCount} bots</td>
                          <td className="py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                              t.status === "Active" ? "bg-[#ECFDF5] text-[#10B981]" : "bg-[#FEF2F2] text-[#EF4444]"
                            }`}>
                              {t.status}
                            </span>
                          </td>
                          <td className="py-4 text-right flex justify-end gap-2">
                            <Button
                              size="sm"
                              onPress={() => toggleTenantStatus(t.id, t.status)}
                              className={`px-2 py-1 rounded-lg text-[9px] font-bold cursor-pointer ${
                                t.status === "Active"
                                  ? "bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444]"
                                  : "bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#10B981]"
                              }`}
                            >
                              {t.status === "Active" ? "Suspend" : "Activate"}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
