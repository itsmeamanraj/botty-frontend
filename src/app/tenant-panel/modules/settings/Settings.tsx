"use client";

import { useState } from "react";
import { Settings as SettingsIcon, Save, Key, Globe, Mail, Shield, Eye, EyeOff } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Settings({ onAlert }: ActionProps) {
  const [activeTab, setActiveTab] = useState<"profile" | "domains" | "smtp" | "keys">("profile");

  // Mask toggles for secret credentials
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [showClaudeKey, setShowClaudeKey] = useState(false);

  const [settings, setSettings] = useState({
    businessName: "Apex Business Solutions",
    businessEmail: "billing@apex.com",
    customDomain: "support.apex.com",
    smtpHost: "smtp.mailgun.org",
    smtpPort: "587",
    smtpUser: "postmaster@apex.com",
    openaiKey: "sk-proj-48201948172659101827462018",
    claudeKey: "sk-ant-clazz-9284715918275927491028"
  });

  const handleSave = () => {
    onAlert("General settings configuration updated successfully.");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">System Settings</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Configure system parameters, reseller domain bindings, mail relays, and API keys.</p>
        </div>
        <Button 
          onPress={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl text-xs font-bold cursor-pointer text-white h-auto shrink-0 transition-colors"
        >
          <Save className="w-3.5 h-3.5" /> Save Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-2 shrink-0">
          {([
            { id: "profile", label: "Business Profile", icon: SettingsIcon },
            { id: "domains", label: "Domain Mapping", icon: Globe },
            { id: "smtp", label: "SMTP Mail Relay", icon: Mail },
            { id: "keys", label: "LLM API Providers", icon: Key }
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

        {/* Input Form Panel */}
        <div className="lg:col-span-9">
          <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
            {activeTab === "profile" && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">Business Profile Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Business Name</label>
                    <input
                      type="text"
                      value={settings.businessName}
                      onChange={(e) => setSettings(prev => ({ ...prev, businessName: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Support Inbox Email</label>
                    <input
                      type="email"
                      value={settings.businessEmail}
                      onChange={(e) => setSettings(prev => ({ ...prev, businessEmail: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "domains" && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">Custom Reseller Domains</h3>
                <p className="text-[10px] text-[#6B7280] leading-relaxed -mt-2">
                  Map your branding interface dashboard under a white-label domain name. Ensure your domain points to our CNAME node `dns.botty.ai`.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Domain Link (CNAME)</label>
                    <input
                      type="text"
                      value={settings.customDomain}
                      onChange={(e) => setSettings(prev => ({ ...prev, customDomain: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                    />
                  </div>
                  <div className="px-3.5 py-2.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-xl text-[#065F46] text-xs font-semibold flex items-center justify-between">
                    <span>SSL Certificate Valid</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "smtp" && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">SMTP Mail Server Config</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">SMTP Host Server</label>
                    <input
                      type="text"
                      value={settings.smtpHost}
                      onChange={(e) => setSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">SMTP Port</label>
                    <input
                      type="text"
                      value={settings.smtpPort}
                      onChange={(e) => setSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                  <div className="md:col-span-3">
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">SMTP Username Credentials</label>
                    <input
                      type="text"
                      value={settings.smtpUser}
                      onChange={(e) => setSettings(prev => ({ ...prev, smtpUser: e.target.value }))}
                      className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5]"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "keys" && (
              <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2">LLM Engine Private API Keys</h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">OpenAI Key (GPT-4o, Embeddings)</label>
                    <div className="relative">
                      <input
                        type={showOpenAIKey ? "text" : "password"}
                        value={settings.openaiKey}
                        onChange={(e) => setSettings(prev => ({ ...prev, openaiKey: e.target.value }))}
                        className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 pl-3 pr-12 text-xs text-[#111827] font-mono outline-none focus:border-[#4F46E5] focus:bg-white"
                      />
                      <button
                        onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
                      >
                        {showOpenAIKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Anthropic Claude Key (Sonnet 3.5)</label>
                    <div className="relative">
                      <input
                        type={showClaudeKey ? "text" : "password"}
                        value={settings.claudeKey}
                        onChange={(e) => setSettings(prev => ({ ...prev, claudeKey: e.target.value }))}
                        className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 pl-3 pr-12 text-xs text-[#111827] font-mono outline-none focus:border-[#4F46E5] focus:bg-white"
                      />
                      <button
                        onClick={() => setShowClaudeKey(!showClaudeKey)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#6B7280] cursor-pointer"
                      >
                        {showClaudeKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
