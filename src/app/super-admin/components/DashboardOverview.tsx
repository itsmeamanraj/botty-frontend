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
  TrendingDown,
  Activity
} from "lucide-react";
import { Card, Button, Tooltip } from "@heroui/react";

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
    { action: "Business Approved", desc: "Coaching Institute 'Apex Hub' approved by admin.", time: "10m ago", icon: CheckCircle, color: "text-emerald-400 bg-emerald-500/[0.08] border-emerald-500/10" },
    { action: "New White Label Partner", desc: "Partner 'Apex Solutions' connected custom domain.", time: "42m ago", icon: Globe, color: "text-admin-secondary bg-admin-secondary/[0.08] border-admin-secondary/10" },
    { action: "Payment Received", desc: "Invoice #INV-4824 of $499 paid by 'Apex Solutions'.", time: "1h ago", icon: Receipt, color: "text-emerald-400 bg-emerald-500/[0.08] border-emerald-500/10" },
    { action: "AI Usage Spike", desc: "Tenant 'Hospitals Group' tokens reached 85% limit.", time: "2h ago", icon: Cpu, color: "text-amber-400 bg-amber-500/[0.08] border-amber-500/10" },
    { action: "System Event", desc: "WhatsApp Node provider backup sync completed.", time: "4h ago", icon: Activity, color: "text-admin-secondary bg-admin-secondary/[0.08] border-admin-secondary/10" }
  ];

  return (
    <div className="flex flex-col gap-8 select-none">
      {/* Welcome Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Dashboard Overview</h2>
          <p className="text-xs text-admin-text-muted mt-1 font-medium">Multi-tenant operations, billing summary, and AI status.</p>
        </div>
        <Button 
          onPress={() => onAlert("Refreshed dashboard metrics successfully!")} 
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl text-xs font-semibold cursor-pointer text-white h-auto transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh metrics
        </Button>
      </div>

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card 
              key={idx} 
              className="p-6 border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] flex flex-col justify-between hover:border-white/[0.1] hover:scale-[1.01] transition-all duration-200 group overflow-visible relative"
              style={{ borderRadius: "20px" }}
            >
              {/* Subtle Radial Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--admin-primary),transparent_65%)] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity rounded-[20px]" />
              
              <Card.Header className="flex justify-between items-center mb-4 p-0 bg-transparent relative z-10">
                <span className="text-xs font-bold text-[#64748B] tracking-wider uppercase">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-white/[0.03] border border-white/[0.05] flex items-center justify-center text-[#64748B] group-hover:text-admin-secondary transition-colors">
                  <Icon className="w-4.5 h-4.5" />
                </div>
              </Card.Header>
              
              <Card.Content className="flex items-baseline justify-between p-0 bg-transparent relative z-10">
                <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/80 tracking-tight">{stat.val}</span>
                <span className={`text-[9px] font-extrabold flex items-center gap-0.5 px-2 py-0.5 rounded-full border ${
                  stat.inc 
                    ? "bg-emerald-500/[0.06] text-emerald-400 border-emerald-500/10" 
                    : "bg-rose-500/[0.06] text-rose-400 border-rose-500/10"
                }`}>
                  {stat.inc ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
                  {stat.trend}
                </span>
              </Card.Content>
            </Card>
          );
        })}
      </div>

      {/* Graphs and Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Revenue Trends */}
        <Card 
          className="lg:col-span-8 p-6 border border-white/[0.04] bg-white/[0.01] overflow-visible"
          style={{ borderRadius: "20px" }}
        >
          <Card.Header className="flex justify-between items-center mb-8 p-0 bg-transparent">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Revenue & Usage Trends</h3>
              <p className="text-[10px] text-admin-text-muted mt-0.5">Aggregate usage volume metrics across all clusters.</p>
            </div>
            <span className="text-[10px] px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-admin-text-muted font-bold font-mono">Last 30 Days</span>
          </Card.Header>
          
          <Card.Content className="h-64 flex items-end gap-3 px-2 border-b border-white/[0.08] relative p-0 bg-transparent">
            {/* Background Gridlines */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pointer-events-none z-0">
              <div className="w-full border-t border-white/[0.02]" />
              <div className="w-full border-t border-white/[0.02]" />
              <div className="w-full border-t border-white/[0.02]" />
              <div className="w-full border-t border-white/[0.02]" />
            </div>

            {[40, 55, 45, 60, 75, 50, 70, 95, 80, 110, 90, 120].map((h, idx) => (
              <Tooltip key={idx}>
                <Tooltip.Trigger>
                  <div className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer z-10">
                    <div className="w-full bg-gradient-to-t from-admin-primary/60 to-admin-secondary rounded-t-md transition-all group-hover:from-admin-primary group-hover:to-[#00D4FF] group-hover:shadow-[0_0_12px_rgba(0,212,255,0.2)]" style={{ height: `${h}%` }}>
                    </div>
                    <span className="text-[9px] text-[#64748B] mt-2.5 font-bold font-mono">M{idx+1}</span>
                  </div>
                </Tooltip.Trigger>
                <Tooltip.Content showArrow className="px-3 py-1.5 bg-[#0D1225] border border-white/[0.08] rounded-xl text-xs font-bold text-white shadow-2xl">
                  ${h * 5}
                </Tooltip.Content>
              </Tooltip>
            ))}
          </Card.Content>
        </Card>

        {/* Recent Activities */}
        <Card 
          className="lg:col-span-4 p-6 border border-white/[0.04] bg-white/[0.01] overflow-visible"
          style={{ borderRadius: "20px" }}
        >
          <Card.Header className="p-0 bg-transparent mb-6">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Operations</h3>
            <p className="text-[10px] text-admin-text-muted mt-0.5">Real-time system events and logs.</p>
          </Card.Header>
          
          <Card.Content className="flex flex-col gap-6 p-0 bg-transparent">
            {activities.map((act, idx) => {
              const Icon = act.icon;
              return (
                <div key={idx} className="flex items-start gap-3.5 group cursor-default">
                  <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 duration-200 ${act.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="text-xs font-bold text-white truncate">{act.action}</h4>
                      <span className="text-[8px] text-admin-text-muted font-bold font-mono shrink-0">{act.time}</span>
                    </div>
                    <p className="text-[10px] text-admin-text-muted mt-1 leading-normal truncate">{act.desc}</p>
                  </div>
                </div>
              );
            })}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
