"use client";

import { useState } from "react";
import { Bell, Shield, MessageSquare, TrendingUp, CreditCard, CheckCircle2, Trash2 } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Notifications({ onAlert }: ActionProps) {
  const [activeFilter, setActiveFilter] = useState<"all" | "system" | "leads" | "conversations" | "billing">("all");
  const [alerts, setAlerts] = useState([
    { id: 1, type: "system", title: "PDF Synced Successfully", desc: "faq_file_v2.pdf parsed into vector storage chunks.", time: "10m ago", read: false },
    { id: 2, type: "conversations", title: "AI Handover Requested", desc: "Customer Aman Raj requested human connection on WhatsApp.", time: "45m ago", read: false },
    { id: 3, type: "leads", title: "New WhatsApp CRM Lead", desc: "Lead captured from phone +91 98765 43210.", time: "2h ago", read: true },
    { id: 4, type: "billing", title: "Payment Successful", desc: "Invoice INV-2026-004 processed successfully via Visa.", time: "1d ago", read: true },
    { id: 5, type: "system", title: "Domain mapping completed", desc: "Domain 'support.apex.com' linked successfully.", time: "2d ago", read: true }
  ]);

  const markAllRead = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
    onAlert("All notifications marked as read.");
  };

  const deleteAlert = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    onAlert("Notification cleared.");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "system": return Shield;
      case "conversations": return MessageSquare;
      case "leads": return TrendingUp;
      case "billing": return CreditCard;
      default: return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case "system": return "text-[#06B6D4] bg-[#ECFEFF] border-[#CFFAFE]";
      case "conversations": return "text-[#4F46E5] bg-[#EEF2FF] border-[#C7D2FE]";
      case "leads": return "text-[#10B981] bg-[#ECFDF5] border-[#A7F3D0]";
      case "billing": return "text-[#F59E0B] bg-[#FFFBEB] border-[#FEF3C7]";
      default: return "text-[#6B7280] bg-[#F8FAFC] border-[#E5E7EB]";
    }
  };

  const filteredAlerts = activeFilter === "all" ? alerts : alerts.filter(a => a.type === activeFilter);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Notification Center</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Filter system webhooks, support escalations, CRM changes, and subscription billing receipts.</p>
        </div>
        <Button 
          onPress={markAllRead}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#4B5563] cursor-pointer h-auto shrink-0 transition-colors"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Mark All Read
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Category Filters */}
        <div className="lg:col-span-3 flex flex-col gap-2 shrink-0">
          {([
            { id: "all", label: "All Alerts" },
            { id: "system", label: "System Sync" },
            { id: "leads", label: "Leads Pipeline" },
            { id: "conversations", label: "Conversations" },
            { id: "billing", label: "Billing & Security" }
          ] as const).map((tab) => {
            const count = tab.id === "all" ? alerts.filter(a => !a.read).length : alerts.filter(a => a.type === tab.id && !a.read).length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                  activeFilter === tab.id
                    ? "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]"
                    : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] border-transparent"
                }`}
              >
                <span>{tab.label}</span>
                {count > 0 && (
                  <span className="text-[9px] font-extrabold bg-[#EF4444] text-white px-1.5 py-0.5 rounded-full">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Alerts Feed */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
            <div className="flex flex-col gap-4">
              {filteredAlerts.map((alert) => {
                const Icon = getIcon(alert.type);
                const colorClass = getColor(alert.type);
                return (
                  <div 
                    key={alert.id} 
                    className={`p-4 rounded-xl border flex justify-between items-start gap-4 transition-colors ${
                      alert.read ? "bg-white border-[#E5E7EB]" : "bg-[#F8FAFC] border-[#4F46E5]/20"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-[#111827]">{alert.title}</h4>
                          {!alert.read && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-pulse" />
                          )}
                        </div>
                        <p className="text-[10px] text-[#6B7280] mt-1 leading-normal">{alert.desc}</p>
                        <span className="text-[9px] text-[#9CA3AF] font-bold block mt-1.5 font-mono">{alert.time}</span>
                      </div>
                    </div>
                    <Button
                      isIconOnly
                      size="sm"
                      onPress={() => deleteAlert(alert.id)}
                      className="bg-transparent hover:bg-[#FEF2F2] text-[#9CA3AF] hover:text-[#EF4444] rounded-lg min-w-8 w-8 h-8 cursor-pointer border border-transparent"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                );
              })}

              {filteredAlerts.length === 0 && (
                <div className="text-center py-16 text-xs text-[#9CA3AF] border border-dashed border-[#E5E7EB] rounded-xl bg-white select-none">
                  No notifications in this category.
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
