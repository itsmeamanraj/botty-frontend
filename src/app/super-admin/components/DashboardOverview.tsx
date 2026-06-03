"use client";

import {
  Building2,
  CheckCircle,
  AlertCircle,
  Globe,
  Phone,
  Cpu,
  Receipt,
  CreditCard,
  RefreshCw,
  TrendingUp,
  Activity
} from "lucide-react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function DashboardOverview({ onAlert }: ActionProps) {
  const stats = [
    { label: "Total Businesses", val: "1,240", trend: "+12.4%", inc: true, icon: Building2 },
    { label: "Active Businesses", val: "984", trend: "+8.2%", inc: true, icon: CheckCircle },
    { label: "Pending Approvals", val: "24", trend: "-15.3%", inc: false, icon: AlertCircle },
    { label: "White Label Partners", val: "48", trend: "+4.1%", inc: true, icon: Globe },
    { label: "Total Messages", val: "8.4M", trend: "+24.8%", inc: true, icon: Phone },
    { label: "AI Requests", val: "4.2M", trend: "+32.1%", inc: true, icon: Cpu },
    { label: "Monthly Revenue", val: "$48,240", trend: "+18.4%", inc: true, icon: Receipt },
    { label: "Active Subscriptions", val: "1,042", trend: "+9.3%", inc: true, icon: CreditCard }
  ];

  const activities = [
    { action: "Business Approved", desc: "Coaching Institute 'Apex Hub' approved by admin.", time: "10 minutes ago", icon: CheckCircle, color: "text-admin-success" },
    { action: "New White Label Partner", desc: "Partner 'Apex Solutions' connected custom domain.", time: "42 minutes ago", icon: Globe, color: "text-admin-secondary" },
    { action: "Payment Received", desc: "Invoice #INV-4824 of $499 paid by 'Apex Solutions'.", time: "1 hour ago", icon: Receipt, color: "text-admin-success" },
    { action: "AI Usage Spike", desc: "Tenant 'Hospitals Group' tokens reached 85% limit.", time: "2 hours ago", icon: Cpu, color: "text-admin-warning" },
    { action: "System Event", desc: "WhatsApp Node provider backup sync completed.", time: "4 hours ago", icon: Activity, color: "text-admin-secondary" }
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Dashboard Overview</h2>
          <p className="text-xs text-admin-text-muted mt-1">Multi-tenant operations, billing summary, and AI status.</p>
        </div>
        <button onClick={() => onAlert("Refreshed dashboard metrics successfully!")} className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold cursor-pointer text-white">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh metrics
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="p-6 rounded-2xl border border-white/5 bg-admin-card flex flex-col justify-between hover:border-admin-primary/20 transition-all group">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold text-admin-text-muted">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-admin-text-muted group-hover:text-admin-primary transition-colors">
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-white">{stat.val}</span>
                <span className={`text-[10px] font-bold flex items-center gap-0.5 ${stat.inc ? "text-admin-success" : "text-admin-danger"}`}>
                  <TrendingUp className="w-3 h-3" /> {stat.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue Trends */}
        <div className="lg:col-span-8 p-6 rounded-2xl border border-white/5 bg-admin-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Revenue & Usage Trends</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-admin-text-muted font-semibold font-mono">Last 30 Days</span>
          </div>
          <div className="h-64 flex items-end gap-2 px-2 border-b border-l border-white/5 relative">
            {[40, 55, 45, 60, 75, 50, 70, 95, 80, 110, 90, 120].map((h, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                <div className="w-full bg-gradient-to-t from-admin-primary to-admin-secondary rounded-t-md transition-all hover:opacity-80" style={{ height: `${h}%` }}>
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 z-20 px-2 py-0.5 bg-admin-card border border-white/10 rounded text-[9px] font-bold text-white transition-opacity whitespace-nowrap">
                    ${h * 5}
                  </div>
                </div>
                <span className="text-[9px] text-admin-text-muted mt-2 font-mono">M{idx+1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-white/5 bg-admin-card">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6">Recent Operations</h3>
          <div className="flex flex-col gap-5">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 ${act.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{act.action}</h4>
                    <p className="text-[10px] text-admin-text-muted mt-0.5 leading-relaxed">{act.desc}</p>
                    <span className="text-[8px] text-admin-text-muted block mt-1 font-mono">{act.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
