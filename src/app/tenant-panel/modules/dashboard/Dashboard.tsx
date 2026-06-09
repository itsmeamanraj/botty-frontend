"use client";

import {
  MessageSquare,
  Clock,
  TrendingUp,
  Activity,
  Cpu,
  UserCheck,
  Zap,
  CheckCircle,
  HelpCircle,
  Database
} from "lucide-react";
import { Card } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Dashboard({ onAlert }: ActionProps) {
  const kpiData = [
    { label: "Total Conversations", val: "8,240", change: "+14.2%", inc: true, icon: MessageSquare },
    { label: "Open Conversations", val: "42", change: "-8.5%", inc: false, icon: Clock },
    { label: "Total Leads", val: "1,482", change: "+18.4%", inc: true, icon: TrendingUp },
    { label: "Lead Conversion Rate", val: "18.4%", change: "+2.1%", inc: true, icon: Zap },
    { label: "Messages Today", val: "1,240", change: "+24.3%", inc: true, icon: Activity },
    { label: "AI Resolution Rate", val: "84.2%", change: "+4.8%", inc: true, icon: Cpu },
    { label: "Active Chatbots", val: "3", change: "Stable", inc: true, icon: CheckCircle },
  ];

  const activities = [
    { type: "Lead", title: "New Lead Created", desc: "Aman Raj (aman@zenith-mfg.com) captured via Chat Widget.", time: "2 minutes ago", color: "text-[#4F46E5] bg-[#EEF2FF]" },
    { type: "Conversation", title: "AI Resolved Chat", desc: "Customer query about invoice download resolved by bot.", time: "8 minutes ago", color: "text-[#10B981] bg-[#ECFDF5]" },
    { type: "CRM", title: "Lead Converted", desc: "Apex solutions moved to 'Won' pipeline.", time: "1 hour ago", color: "text-[#06B6D4] bg-[#ECFEFF]" },
    { type: "KB", title: "Document Processed", desc: "knowledge_base_v2.pdf parsed successfully into 142 chunks.", time: "3 hours ago", color: "text-[#F59E0B] bg-[#FFFBEB]" },
    { type: "WhatsApp", title: "WhatsApp Node Linked", desc: "Official API linked successfully to sandbox node #4.", time: "5 hours ago", color: "text-[#10B981] bg-[#ECFDF5]" }
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-200">
      {/* Page Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Executive Summary</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Real-time indicators, conversion funnels, and bot accuracy metrics.</p>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card 
              key={idx} 
              className="p-5 border border-[#E5E7EB] bg-white flex flex-col justify-between hover:border-[#4F46E5]/40 hover:scale-[1.01] transition-all group overflow-visible"
              style={{ borderRadius: "16px" }}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">{kpi.label}</span>
                <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] group-hover:text-[#4F46E5] transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-xl font-extrabold text-[#111827] tracking-tight">{kpi.val}</span>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                  kpi.inc 
                    ? "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]" 
                    : "bg-[#FEF2F2] text-[#EF4444] border-[#FCA5A5]"
                }`}>
                  {kpi.change}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Analytics and Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Performance Widgets */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <Card.Header className="flex justify-between items-center mb-6 p-0 bg-transparent">
              <div>
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">AI Operations</h3>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Summary of automated responses and agent escalations.</p>
              </div>
            </Card.Header>
            <Card.Content className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-0 bg-transparent">
              <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC]">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Success Rate</span>
                <span className="text-2xl font-extrabold text-[#111827] mt-1 block">94.8%</span>
                <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-[#10B981] h-full rounded-full" style={{ width: "94.8%" }} />
                </div>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC]">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Avg Response Time</span>
                <span className="text-2xl font-extrabold text-[#111827] mt-1 block">1.8s</span>
                <span className="text-[9px] text-[#10B981] font-bold block mt-3">Under 2.5s threshold</span>
              </div>
              <div className="p-4 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC]">
                <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Handover Rate</span>
                <span className="text-2xl font-extrabold text-[#111827] mt-1 block">5.2%</span>
                <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-[#4F46E5] h-full rounded-full" style={{ width: "5.2%" }} />
                </div>
              </div>
            </Card.Content>
          </Card>

          {/* Simple Visual Chart Mock */}
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <Card.Header className="flex justify-between items-center mb-6 p-0 bg-transparent">
              <div>
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Volume Trend (Last 7 Days)</h3>
              </div>
            </Card.Header>
            <Card.Content className="h-44 flex items-end gap-3 px-2 border-b border-[#E5E7EB] relative p-0 bg-transparent">
              {[60, 45, 80, 50, 95, 70, 110].map((h, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer z-10">
                  <div className="w-full bg-[#4F46E5]/10 group-hover:bg-[#4F46E5] rounded-t-md transition-all h-full relative overflow-hidden" style={{ height: `${h}%` }}>
                    <div className="absolute inset-x-0 bottom-0 bg-[#4F46E5] rounded-t-md" style={{ height: "60%" }} />
                  </div>
                  <span className="text-[9px] text-[#6B7280] mt-2 font-bold font-mono">Day {idx+1}</span>
                </div>
              ))}
            </Card.Content>
          </Card>
        </div>

        {/* Live Activity Feed */}
        <Card 
          className="lg:col-span-4 p-6 border border-[#E5E7EB] bg-white overflow-visible"
          style={{ borderRadius: "16px" }}
        >
          <Card.Header className="p-0 bg-transparent mb-6">
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Live Activity Feed</h3>
            <p className="text-[10px] text-[#6B7280] mt-0.5">Real-time event streams from active widgets.</p>
          </Card.Header>
          <Card.Content className="flex flex-col gap-5 p-0 bg-transparent">
            {activities.map((act, idx) => (
              <div key={idx} className="flex items-start gap-3 group">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-extrabold shadow-sm border border-[#E5E7EB] ${act.color}`}>
                  {act.type[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="text-xs font-bold text-[#111827] truncate">{act.title}</h4>
                    <span className="text-[8px] text-[#9CA3AF] font-bold shrink-0">{act.time}</span>
                  </div>
                  <p className="text-[10px] text-[#6B7280] mt-0.5 leading-normal truncate">{act.desc}</p>
                </div>
              </div>
            ))}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
