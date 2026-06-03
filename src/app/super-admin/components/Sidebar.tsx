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
  User,
  LogOut
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "businesses", label: "Business Management", icon: Building2 },
    { id: "whitelabel", label: "White Label Partners", icon: Globe },
    { id: "users", label: "Users", icon: Users },
    { id: "subscriptions", label: "Subscriptions", icon: CreditCard },
    { id: "billing", label: "Billing & Finance", icon: Receipt },
    { id: "whatsapp", label: "WhatsApp Management", icon: Phone },
    { id: "ai", label: "AI Control Center", icon: Cpu },
    { id: "kb", label: "Knowledge Base", icon: Database },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "logs", label: "Audit Logs", icon: Shield }, // lucide Shield icon
    { id: "settings", label: "System Settings", icon: Settings },
    { id: "profile", label: "Profile", icon: User }
  ];

  return (
    <aside className="w-[280px] bg-admin-card border-r border-white/5 flex flex-col justify-between p-6 h-screen sticky top-0 flex-shrink-0 z-30">
      <div>
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 mb-8 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-admin-primary to-admin-secondary flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-admin-primary/20">
            R
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">
              ReplyDesk<span className="text-admin-secondary">.ai</span>
            </span>
            <span className="text-[10px] text-admin-text-muted font-semibold tracking-wider uppercase block">
              Super Admin
            </span>
          </div>
        </Link>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-200px)] custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 text-left cursor-pointer ${
                  isActive
                    ? "bg-admin-primary text-white shadow-lg shadow-admin-primary/20"
                    : "text-admin-text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-admin-text-muted"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-4 border-t border-white/5">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-admin-danger hover:bg-admin-danger/10 transition-colors w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Link>
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
