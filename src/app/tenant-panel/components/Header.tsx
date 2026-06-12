"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, LogOut, Settings, User, Eye, Sliders, ChevronDown } from "lucide-react";
import { Dropdown, Separator } from "@heroui/react";
import { TenantRole, ROLE_LABELS } from "@/hooks/useRBAC";
import { TenantFeature, FEATURE_LABELS } from "@/hooks/useFeatures";
import { useAuth } from "@/providers/AuthProvider";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  role: TenantRole;
  setRole: (role: TenantRole) => void;
  enabledFeatures: Record<TenantFeature, boolean>;
  toggleFeature: (feature: TenantFeature) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Header({
  searchQuery,
  setSearchQuery,
  role,
  setRole,
  enabledFeatures,
  toggleFeature,
  activeTab,
  setActiveTab
}: HeaderProps) {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isDemoConsoleOpen, setIsDemoConsoleOpen] = useState(false);

  const displayName = user?.name ?? user?.email ?? "User";
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const rolesList: TenantRole[] = [
    "WHITE_LABEL_OWNER",
    "WHITE_LABEL_STAFF",
    "BUSINESS_OWNER",
    "MANAGER",
    "SALES_AGENT",
    "SUPPORT_AGENT",
    "VIEWER"
  ];

  const featuresList = Object.keys(FEATURE_LABELS) as TenantFeature[];

  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB] px-8 py-3.5 flex items-center justify-between z-40 select-none">
      {/* Search Bar */}
      <div className="relative w-80 group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] group-focus-within:text-[#4F46E5] transition-colors" />
        <input
          type="text"
          placeholder="Search conversations, files, CRM..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 pl-10 pr-12 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white focus:ring-2 focus:ring-[#EEF2FF] transition-all font-medium"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-[#E5E7EB] bg-white text-[9px] font-bold text-[#9CA3AF] select-none font-mono">
          <span>⌘</span><span>K</span>
        </div>
      </div>

      {/* Action controls & switcher */}
      <div className="flex items-center gap-4">
        {/* Floating Demo Console Button */}
        <button
          onClick={() => setIsDemoConsoleOpen(!isDemoConsoleOpen)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#EEF2FF] text-[#4F46E5] hover:bg-[#E0E7FF] border border-[#C7D2FE] transition-colors cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5" />
          Demo Controls
        </button>

        {/* Notifications */}
        <button className="p-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] relative cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
        </button>

        {/* Profile Dropdown */}
        <Dropdown>
          <Dropdown.Trigger className="bg-transparent border-none p-0 outline-none focus:outline-none flex items-center select-none cursor-pointer group">
            <div className="flex items-center gap-3 pl-4 border-l border-[#E5E7EB]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#4F46E5] to-[#06B6D4] flex items-center justify-center text-xs font-bold text-white shadow-md shadow-[#4F46E5]/10 group-hover:scale-102 transition-transform">
                {initials}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-[#111827] leading-none flex items-center gap-1 group-hover:text-[#4F46E5] transition-colors">
                  {displayName}
                  <ChevronDown className="w-3 h-3 text-[#9CA3AF]" />
                </div>
                <span className="text-[9px] text-[#6B7280] font-bold uppercase tracking-wider block mt-0.5">
                  {ROLE_LABELS[role]}
                </span>
              </div>
            </div>
          </Dropdown.Trigger>
          <Dropdown.Popover 
            placement="bottom end" 
            className="z-50 !bg-white border !border-[#E5E7EB] rounded-2xl !shadow-xl p-1.5 outline-none w-52"
          >
            <Dropdown.Menu className="outline-none bg-transparent p-0 border-none shadow-none select-none flex flex-col gap-1">
              <Dropdown.Item 
                onPress={() => setActiveTab("profile")}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-xl outline-none cursor-pointer transition-colors"
              >
                <User className="w-4 h-4 text-[#9CA3AF]" />
                My Account
              </Dropdown.Item>
              <Dropdown.Item 
                onPress={() => setActiveTab("settings")}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded-xl outline-none cursor-pointer transition-colors"
              >
                <Settings className="w-4 h-4 text-[#9CA3AF]" />
                Settings
              </Dropdown.Item>
              <Separator className="my-1 border-b border-[#F3F4F6] block" />
              <Dropdown.Item 
                onPress={handleSignOut}
                className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#EF4444] hover:bg-[#FEF2F2] rounded-xl outline-none cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      {/* Floating Right Drawer: Demo Controls Console */}
      {isDemoConsoleOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden select-none">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#111827]/30 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDemoConsoleOpen(false)}
          />

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl p-6 flex flex-col justify-between border-l border-[#E5E7EB] transform transition-transform duration-300">
              <div>
                <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4 mb-6">
                  <h3 className="text-sm font-extrabold text-[#111827] flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#4F46E5]" />
                    Interactive Demo Console
                  </h3>
                  <button
                    onClick={() => setIsDemoConsoleOpen(false)}
                    className="p-1 rounded-lg hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#6B7280] cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-[11px] text-[#6B7280] mb-6 leading-relaxed bg-[#F8FAFC] p-3 rounded-xl border border-[#E5E7EB]">
                  Switch roles and toggle features in real-time to watch the sidebar, layout permissions, and page panels dynamically update.
                </p>

                {/* Role Switcher */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#6B7280]" /> Active User Role
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    {rolesList.map((r) => (
                      <label
                        key={r}
                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-colors ${
                          role === r
                            ? "bg-[#EEF2FF] border-[#4F46E5]/40 text-[#4F46E5]"
                            : "bg-white border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#4B5563]"
                        }`}
                      >
                        <span className="text-xs font-semibold">{ROLE_LABELS[r]}</span>
                        <input
                          type="radio"
                          name="demo-role"
                          checked={role === r}
                          onChange={() => setRole(r)}
                          className="w-3.5 h-3.5 accent-[#4F46E5] cursor-pointer"
                        />
                      </label>
                    ))}
                  </div>
                </div>

                {/* Feature Switcher */}
                <div>
                  <h4 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-[#6B7280]" /> Modules Feature Flags
                  </h4>
                  <div className="flex flex-col gap-2">
                    {featuresList.map((f) => (
                      <div
                        key={f}
                        className="flex items-center justify-between p-3 rounded-xl border border-[#E5E7EB] bg-white"
                      >
                        <div>
                          <span className="text-xs font-semibold text-[#111827] block">
                            {FEATURE_LABELS[f]}
                          </span>
                          <span className="text-[10px] text-[#6B7280] font-mono mt-0.5 block">
                            flag: {f}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleFeature(f)}
                          className={`w-10 h-6 flex items-center rounded-full p-0.5 cursor-pointer transition-colors duration-200 focus:outline-none ${
                            enabledFeatures[f] ? "bg-[#10B981]" : "bg-[#D1D5DB]"
                          }`}
                        >
                          <div
                            className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-200 ${
                              enabledFeatures[f] ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-4 mt-6">
                <button
                  onClick={() => setIsDemoConsoleOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold tracking-wide transition-colors cursor-pointer"
                >
                  Apply and Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
