"use client";

import {
  LayoutDashboard,
  Building2,
  Globe,
  Users,
  CreditCard,
  Receipt,
  Phone,
  Cpu,
  Database,
  BarChart3,
  Bell,
  Settings,
  User
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const categories = [
    {
      title: "Core Operations",
      items: [
        { id: "dashboard", label: "Overview", icon: LayoutDashboard },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "logs", label: "Audit Logs", icon: Shield }
      ]
    },
    {
      title: "Management",
      items: [
        { id: "businesses", label: "Tenants", icon: Building2 },
        { id: "whitelabel", label: "White Label", icon: Globe },
        { id: "users", label: "Users", icon: Users }
      ]
    },
    {
      title: "AI & WhatsApp",
      items: [
        { id: "whatsapp", label: "WhatsApp Node", icon: Phone },
        { id: "ai", label: "AI Center", icon: Cpu },
        { id: "kb", label: "Knowledge Base", icon: Database }
      ]
    },
    {
      title: "Billing & Settings",
      items: [
        { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
        { id: "billing", label: "Finance & Invoices", icon: Receipt },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "settings", label: "System Settings", icon: Settings },
        { id: "profile", label: "Profile", icon: User }
      ]
    }
  ];

  return (
    <aside className="w-[280px] bg-[#070B16] border-r border-white/[0.04] flex flex-col justify-between p-6 h-screen sticky top-0 flex-shrink-0 z-30 select-none">
      <div className="flex flex-col h-full overflow-hidden">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-3 mb-8 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-admin-primary to-admin-secondary flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-admin-primary/10 group-hover:scale-[1.02] transition-transform duration-200">
            R
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white block">
              ReplyDesk<span className="text-admin-secondary">.ai</span>
            </span>
            <span className="text-[9px] text-admin-text-muted font-bold tracking-wider uppercase block mt-0.5">
              Super Admin
            </span>
          </div>
        </Link>

        {/* Categories & Items */}
        <nav className="flex-1 flex flex-col gap-6 overflow-y-auto pr-1 -mr-2 custom-scrollbar">
          {categories.map((cat, catIdx) => (
            <div key={catIdx} className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-admin-text-muted/60 uppercase tracking-widest px-3.5 mb-1 block">
                {cat.title}
              </span>
              <div className="flex flex-col gap-0.5">
                {cat.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 text-left cursor-pointer w-full relative group ${
                        isActive
                          ? "bg-white/[0.06] text-white shadow-inner"
                          : "text-[#94A3B8] hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-md bg-gradient-to-b from-admin-primary to-admin-secondary" />
                      )}
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-admin-secondary" : "text-[#64748B] group-hover:text-white"}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// Inline fallback for Shield icon
function Shield(props: any) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 9.7a1 1 0 0 1-.68 0C7.5 20.5 4 18 4 13V6a1 1 0 0 1 .76-.97l7-2a1 1 0 0 1 .48 0l7 2A1 1 0 0 1 20 6z" />
    </svg>
  );
}
