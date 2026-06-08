"use client";

import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { TenantRole, useRBAC } from "@/hooks/useRBAC";
import { TenantFeature, useFeatures } from "@/hooks/useFeatures";
import { AnimatePresence, motion } from "framer-motion";
import { BellRing, X } from "lucide-react";

// Modules imports
import Dashboard from "@/modules/dashboard/Dashboard";
import Conversations from "@/modules/conversations/Conversations";
import Leads from "@/modules/leads/Leads";
import Contacts from "@/modules/contacts/Contacts";
import KnowledgeBase from "@/modules/knowledge-base/KnowledgeBase";
import AITraining from "@/modules/ai-training/AITraining";
import Prompts from "@/modules/prompts/Prompts";
import WhatsApp from "@/modules/whatsapp/WhatsApp";
import Widget from "@/modules/widget/Widget";
import Analytics from "@/modules/analytics/Analytics";
import Team from "@/modules/team/Team";
import Roles from "@/modules/roles/Roles";
import Subscription from "@/modules/subscription/Subscription";
import Billing from "@/modules/billing/Billing";
import Notifications from "@/modules/notifications/Notifications";
import Settings from "@/modules/settings/Settings";
import WhiteLabel from "@/modules/white-label/WhiteLabel";

export default function TenantPanelPage() {
  const { hasPermission } = useRBAC();
  const { hasFeature } = useFeatures();

  // Interactive Demo States
  const [role, setRole] = useState<TenantRole>("BUSINESS_OWNER");
  const [enabledFeatures, setEnabledFeatures] = useState<Record<TenantFeature, boolean>>({
    crm: true,
    analytics: true,
    knowledge_base: true,
    whatsapp: true,
    widget: true,
    billing: true,
    white_label: false,
  });

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastId, setToastId] = useState<number>(0);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setToastId(prev => prev + 1);
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastId, toastMessage]);

  const toggleFeature = (feat: TenantFeature) => {
    setEnabledFeatures(prev => {
      const updated = { ...prev, [feat]: !prev[feat] };
      triggerToast(`Feature flag "${feat}" toggled to ${updated[feat] ? "ENABLED" : "DISABLED"}`);
      return updated;
    });
  };

  const handleRoleChange = (newRole: TenantRole) => {
    setRole(newRole);
    triggerToast(`Switched active simulator role to: ${newRole}`);
  };

  // Verify permission constraints on activeTab when role/features change
  useEffect(() => {
    const tabPermissions: Record<string, string> = {
      conversations: "conversation.view",
      leads: "lead.view",
      contacts: "contact.view",
      "knowledge-base": "kb.view",
      "ai-training": "kb.view",
      prompts: "prompt.view",
      whatsapp: "whatsapp.view",
      widget: "widget.view",
      analytics: "analytics.view",
      team: "team.view",
      roles: "team.manage",
      "white-label": "whitelabel.view",
      subscription: "subscription.view",
      billing: "billing.view",
      settings: "settings.view",
    };

    const tabFeatures: Record<string, TenantFeature> = {
      leads: "crm",
      "knowledge-base": "knowledge_base",
      "ai-training": "knowledge_base",
      whatsapp: "whatsapp",
      widget: "widget",
      analytics: "analytics",
      "white-label": "white_label",
      subscription: "billing",
      billing: "billing",
    };

    const permission = tabPermissions[activeTab];
    const feature = tabFeatures[activeTab];

    if (permission && !hasPermission(role, permission)) {
      triggerToast(`Access denied: "${activeTab}" view requires permissions your role doesn't have. Redirecting to Dashboard.`);
      setActiveTab("dashboard");
    } else if (feature && !hasFeature(enabledFeatures, feature)) {
      triggerToast(`Feature disabled: "${activeTab}" module is currently turned off in demo settings. Redirecting to Dashboard.`);
      setActiveTab("dashboard");
    }
  }, [role, enabledFeatures, activeTab]);

  // Render correct component based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onAlert={triggerToast} />;
      case "conversations":
        return <Conversations onAlert={triggerToast} />;
      case "leads":
        return <Leads onAlert={triggerToast} />;
      case "contacts":
        return <Contacts onAlert={triggerToast} />;
      case "knowledge-base":
        return <KnowledgeBase onAlert={triggerToast} />;
      case "ai-training":
        return <AITraining onAlert={triggerToast} />;
      case "prompts":
        return <Prompts onAlert={triggerToast} />;
      case "whatsapp":
        return <WhatsApp onAlert={triggerToast} />;
      case "widget":
        return <Widget onAlert={triggerToast} />;
      case "analytics":
        return <Analytics onAlert={triggerToast} />;
      case "team":
        return <Team onAlert={triggerToast} />;
      case "roles":
        return <Roles onAlert={triggerToast} />;
      case "white-label":
        return <WhiteLabel onAlert={triggerToast} />;
      case "subscription":
        return <Subscription onAlert={triggerToast} role={role} enabledFeatures={enabledFeatures} />;
      case "billing":
        return <Billing onAlert={triggerToast} />;
      case "notifications":
        return <Notifications onAlert={triggerToast} />;
      case "settings":
        return <Settings onAlert={triggerToast} />;
      default:
        return <Dashboard onAlert={triggerToast} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans text-[#111827]">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={role}
        enabledFeatures={enabledFeatures}
      />

      {/* 2. Right Main Layout Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        {/* Sticky Header */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          role={role}
          setRole={handleRoleChange}
          enabledFeatures={enabledFeatures}
          toggleFeature={toggleFeature}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Dynamic View Scroll Container */}
        <main className="flex-1 overflow-y-auto px-8 py-7 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="h-full min-w-0"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Interactive Global Toast Alert Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[100] max-w-sm"
          >
            <div className="bg-[#111827] text-white px-4 py-3.5 rounded-2xl shadow-2xl border border-white/10 flex items-start gap-3 justify-between">
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-sm shadow-[#4F46E5]/30">
                  <BellRing className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-[#9CA3AF] font-bold uppercase tracking-wider block">Simulator Event</span>
                  <p className="text-xs font-semibold leading-relaxed mt-0.5 text-[#E5E7EB]">{toastMessage}</p>
                </div>
              </div>
              <button 
                onClick={() => setToastMessage(null)}
                className="p-1 rounded-md hover:bg-white/10 text-[#9CA3AF] hover:text-white cursor-pointer transition-colors mt-0.5 shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
