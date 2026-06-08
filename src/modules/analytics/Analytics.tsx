"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Calendar, ArrowUpRight, Zap, Target, Clock, MessageSquare } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Analytics({ onAlert }: ActionProps) {
  const [timeframe, setTimeframe] = useState("Last 7 Days");

  const funnelSteps = [
    { name: "Total Visitors", count: "24,800", percent: "100%" },
    { name: "Initiated Conversations", count: "8,240", percent: "33.2%" },
    { name: "Captured Emails / Leads", count: "1,482", percent: "17.9%" },
    { name: "AI Qualified Leads", count: "480", percent: "32.3%" },
    { name: "Won / Converted Customers", count: "168", percent: "35.0%" }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Page Title & Timeframe Selector */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Advanced Analytics Portal</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Track conversation performance indicators, first response speed, and lead conversion pipelines.</p>
        </div>
        <div className="flex items-center gap-2 border border-[#E5E7EB] bg-[#F8FAFC] rounded-xl p-1 shrink-0">
          {["Today", "Last 7 Days", "Last 30 Days"].map((time) => (
            <button
              key={time}
              onClick={() => { setTimeframe(time); onAlert(`Analytics time range updated to ${time}.`); }}
              className={`px-3 py-1.5 rounded-lg cursor-pointer text-xs font-semibold transition-all ${
                timeframe === time ? "bg-white text-[#4F46E5] shadow-xs border border-[#E5E7EB]" : "text-[#6B7280]"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-5 border border-[#E5E7EB] bg-white flex flex-col justify-between" style={{ borderRadius: "16px" }}>
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">First Response SLA</span>
            <span className="text-xl font-extrabold text-[#111827] mt-1.5 block">1.8 seconds</span>
          </div>
          <div className="flex justify-between items-baseline mt-4 pt-3 border-t border-[#F3F4F6]">
            <span className="text-[9px] text-[#10B981] font-bold">98.2% on SLA target</span>
            <Clock className="w-3.5 h-3.5 text-[#9CA3AF]" />
          </div>
        </Card>

        <Card className="p-5 border border-[#E5E7EB] bg-white flex flex-col justify-between" style={{ borderRadius: "16px" }}>
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">AI Deflection Rate</span>
            <span className="text-xl font-extrabold text-[#111827] mt-1.5 block">84.2%</span>
          </div>
          <div className="flex justify-between items-baseline mt-4 pt-3 border-t border-[#F3F4F6]">
            <span className="text-[9px] text-[#10B981] font-bold">+2.4% this month</span>
            <Zap className="w-3.5 h-3.5 text-[#9CA3AF]" />
          </div>
        </Card>

        <Card className="p-5 border border-[#E5E7EB] bg-white flex flex-col justify-between" style={{ borderRadius: "16px" }}>
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Conversion Rate</span>
            <span className="text-xl font-extrabold text-[#111827] mt-1.5 block">18.4%</span>
          </div>
          <div className="flex justify-between items-baseline mt-4 pt-3 border-t border-[#F3F4F6]">
            <span className="text-[9px] text-[#10B981] font-bold">+1.8% vs last week</span>
            <Target className="w-3.5 h-3.5 text-[#9CA3AF]" />
          </div>
        </Card>

        <Card className="p-5 border border-[#E5E7EB] bg-white flex flex-col justify-between" style={{ borderRadius: "16px" }}>
          <div>
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Total Sessions</span>
            <span className="text-xl font-extrabold text-[#111827] mt-1.5 block">8,240</span>
          </div>
          <div className="flex justify-between items-baseline mt-4 pt-3 border-t border-[#F3F4F6]">
            <span className="text-[9px] text-[#4F46E5] font-bold">100% indexed channels</span>
            <MessageSquare className="w-3.5 h-3.5 text-[#9CA3AF]" />
          </div>
        </Card>
      </div>

      {/* Funnel and Volume charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sales Funnel */}
        <div className="lg:col-span-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-5">Lead Conversion Funnel</h3>
            <div className="flex flex-col gap-4">
              {funnelSteps.map((step, idx) => (
                <div key={idx} className="flex flex-col gap-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-[#4B5563]">{step.name}</span>
                    <span className="text-[#111827]">{step.count} ({step.percent})</span>
                  </div>
                  <div className="w-full bg-[#F3F4F6] h-3.5 rounded-xl overflow-hidden relative">
                    <div 
                      className="bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] h-full rounded-xl transition-all duration-500" 
                      style={{ width: step.percent }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Volume Trend line graph */}
        <div className="lg:col-span-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-5">Hourly Conversation Volume</h3>
            
            <div className="h-48 flex items-end gap-3 px-2 border-b border-[#E5E7EB] relative mb-6">
              {/* Simulated Line graph points */}
              {[40, 65, 55, 90, 80, 110, 95].map((h, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer z-10">
                  <div 
                    className="w-2.5 rounded-full bg-[#4F46E5] hover:bg-[#06B6D4] transition-all relative"
                    style={{ height: `${h}%` }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#111827] text-white text-[8px] font-bold py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {h * 8} chats
                    </div>
                  </div>
                  <span className="text-[9px] text-[#6B7280] mt-2 font-bold font-mono">Slot {idx+1}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xs text-[#6B7280] font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4F46E5]" /> Active Chats
              </span>
              <span>Avg peak traffic: 14:00 - 17:00</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
