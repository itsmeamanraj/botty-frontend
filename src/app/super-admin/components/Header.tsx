"use client";

import { Search, Bell, LogOut, Settings, User } from "lucide-react";
import { Dropdown, Separator } from "@heroui/react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: string) => void;
}

export default function Header({ searchQuery, setSearchQuery, setActiveTab }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-[#0B1020]/75 backdrop-blur-md border-b border-white/[0.04] px-8 py-4 flex items-center justify-between z-20 select-none">
      {/* Global Search */}
      <div className="relative w-80 group">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] group-focus-within:text-admin-secondary transition-colors" />
        <input
          type="text"
          placeholder="Search logs, invoices, databases..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.12] rounded-xl py-2.5 pl-10 pr-12 text-xs text-white placeholder-[#64748B] outline-none focus:border-admin-secondary focus:ring-1 focus:ring-admin-secondary/20 transition-all font-medium"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] text-[9px] font-bold text-[#64748B] select-none font-mono">
          <span>⌘</span><span>K</span>
        </div>
      </div>

      {/* Status pills, notifications, profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/[0.06] border border-emerald-500/15">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">
            Systems Nominal
          </span>
        </div>

        <button className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] text-white relative cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
          <Bell className="w-4 h-4 text-[#94A3B8]" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-admin-primary" />
        </button>

        <Dropdown>
          <Dropdown.Trigger className="bg-transparent border-none p-0 outline-none focus:outline-none flex items-center select-none cursor-pointer group">
            <div className="flex items-center gap-3 pl-4 border-l border-white/[0.08]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-admin-primary to-admin-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg ring-1 ring-white/10 group-hover:ring-admin-secondary/40 transition-all">
                SA
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-semibold text-white leading-none group-hover:text-admin-secondary transition-colors">Aman Raj</div>
                <span className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider block mt-0.5">Super Admin</span>
              </div>
            </div>
          </Dropdown.Trigger>
          <Dropdown.Popover 
            placement="bottom end" 
            className="z-50 !bg-[#0D1225] border !border-white/[0.06] rounded-2xl !shadow-2xl p-1.5 outline-none w-56"
          >
            <Dropdown.Menu className="outline-none bg-transparent p-0 border-none shadow-none select-none flex flex-col gap-1">
              <Dropdown.Item 
                onPress={() => setActiveTab("profile")}
                className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-white/[0.04] rounded-xl outline-none cursor-pointer transition-colors"
              >
                <User className="w-4 h-4 text-[#64748B]" />
                My Account
              </Dropdown.Item>
              <Dropdown.Item 
                onPress={() => setActiveTab("settings")}
                className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-[#94A3B8] hover:text-white hover:bg-white/[0.04] rounded-xl outline-none cursor-pointer transition-colors"
              >
                <Settings className="w-4 h-4 text-[#64748B]" />
                Settings
              </Dropdown.Item>
              <Separator className="my-1 border-b border-white/[0.04] block" />
              <Dropdown.Item 
                href="/login"
                className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-semibold text-admin-danger hover:bg-admin-danger/10 rounded-xl outline-none cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </header>
  );
}
