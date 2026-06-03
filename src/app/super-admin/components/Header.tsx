"use client";

import { Search, Bell } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
  return (
    <header className="sticky top-0 bg-admin-bg/85 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between z-20">
      {/* Global Search */}
      <div className="relative w-80">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-admin-text-muted" />
        <input
          type="text"
          placeholder="Search tenants, partners, invoices, API logs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white placeholder-admin-text-muted outline-none focus:border-admin-primary focus:ring-1 focus:ring-admin-primary transition-all"
        />
      </div>

      {/* Status pills, notifications, profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-admin-success/10 border border-admin-success/20">
          <span className="w-1.5 h-1.5 rounded-full bg-admin-success animate-pulse" />
          <span className="text-[10px] font-bold text-admin-success uppercase tracking-wider">
            All Systems Operational
          </span>
        </div>

        <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white relative cursor-pointer">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-admin-primary animate-ping" />
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-admin-primary to-admin-secondary flex items-center justify-center text-xs font-bold text-white shadow-lg">
            SA
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-bold text-white leading-none">Aman Raj</div>
            <span className="text-[9px] text-admin-text-muted font-medium">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
