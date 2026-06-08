"use client";

import {
  LayoutDashboard,
  MessageSquare,
  TrendingUp,
  Users,
  Database,
  Cpu,
  Terminal,
  Phone,
  Settings as SettingsIcon,
  HelpCircle,
  BarChart3,
  User,
  ShieldCheck,
  CreditCard,
  Receipt,
  Bell,
  Code
} from "lucide-react";
import { TenantRole, useRBAC } from "@/hooks/useRBAC";
import { TenantFeature, useFeatures } from "@/hooks/useFeatures";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: TenantRole;
  enabledFeatures: Record<TenantFeature, boolean>;
}

export default function Sidebar({ activeTab, setActiveTab, role, enabledFeatures }: SidebarProps) {
  const { hasPermission } = useRBAC();
  const { hasFeature } = useFeatures();

  const sections = [
    {
      title: "Core",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "conversations", label: "Conversations", icon: MessageSquare, permission: "conversation.view" },
        { id: "leads", label: "Leads CRM", icon: TrendingUp, permission: "lead.view", feature: "crm" },
        { id: "contacts", label: "Contacts", icon: Users, permission: "contact.view" },
      ]
    },
    {
      title: "AI & Channels",
      items: [
        { id: "knowledge-base", label: "Knowledge Base", icon: Database, permission: "kb.view", feature: "knowledge_base" },
        { id: "ai-training", label: "AI Training", icon: Cpu, permission: "kb.view", feature: "knowledge_base" },
        { id: "prompts", label: "Prompts Control", icon: Terminal, permission: "prompt.view" },
        { id: "whatsapp", label: "WhatsApp Connect", icon: Phone, permission: "whatsapp.view", feature: "whatsapp" },
        { id: "widget", label: "Chat Widget", icon: Code, permission: "widget.view", feature: "widget" },
      ]
    },
    {
      title: "Organization",
      items: [
        { id: "analytics", label: "Analytics", icon: BarChart3, permission: "analytics.view", feature: "analytics" },
        { id: "team", label: "Team", icon: Users, permission: "team.view" },
        { id: "roles", label: "Roles & Permissions", icon: ShieldCheck, permission: "team.manage" },
        { id: "white-label", label: "White Label Hub", icon: GlobeIcon, permission: "whitelabel.view", feature: "white_label" },
      ]
    },
    {
      title: "Settings & Billing",
      items: [
        { id: "subscription", label: "Subscription", icon: CreditCard, permission: "subscription.view", feature: "billing" },
        { id: "billing", label: "Billing", icon: Receipt, permission: "billing.view", feature: "billing" },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "settings", label: "Settings", icon: SettingsIcon, permission: "settings.view" },
      ]
    }
  ];

  // Helper to determine plan name
  const getPlanBadge = () => {
    if (role.startsWith("WHITE_LABEL")) return "Reseller Plan";
    if (enabledFeatures.white_label) return "Enterprise Custom";
    if (enabledFeatures.crm && enabledFeatures.whatsapp) return "Growth Plan";
    return "Starter Plan";
  };

  return (
    <aside className="w-[260px] bg-white border-r border-[#E5E7EB] flex flex-col justify-between h-screen sticky top-0 flex-shrink-0 z-30 select-none">
      <div className="flex flex-col h-full overflow-hidden p-5">
        {/* Brand Header */}
        <div className="flex items-center gap-3 mb-6 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center text-white font-extrabold text-base shadow-md shadow-[#4F46E5]/20">
            B
          </div>
          <div className="min-w-0">
            <span className="font-bold text-sm tracking-tight text-[#111827] block truncate">
              Apex Business
            </span>
            <span className="px-1.5 py-0.5 rounded bg-[#EEF2FF] text-[#4F46E5] text-[9px] font-bold tracking-wide uppercase inline-block mt-0.5">
              {getPlanBadge()}
            </span>
          </div>
        </div>

        {/* Navigation Categories */}
        <nav className="flex-1 flex flex-col gap-5 overflow-y-auto pr-1 -mr-2 custom-scrollbar">
          {sections.map((section, secIdx) => {
            // Filter items based on permissions and features
            const visibleItems = section.items.filter((item) => {
              if (item.permission && !hasPermission(role, item.permission)) return false;
              if (item.feature && !hasFeature(enabledFeatures, item.feature as TenantFeature)) return false;
              return true;
            });

            if (visibleItems.length === 0) return null;

            return (
              <div key={secIdx} className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider px-3 mb-1 block">
                  {section.title}
                </span>
                <div className="flex flex-col gap-0.5">
                  {visibleItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-150 text-left cursor-pointer w-full group ${
                          isActive
                            ? "bg-[#EEF2FF] text-[#4F46E5]"
                            : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC]"
                        }`}
                      >
                        <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-[#4F46E5]" : "text-[#9CA3AF] group-hover:text-[#6B7280]"}`} />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

// Inline fallback for Globe Icon
function GlobeIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
