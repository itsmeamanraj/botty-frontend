"use client";

import { useState } from "react";
import { Phone, CheckCircle2, AlertCircle, RefreshCw, Smartphone, Send, MessageSquare, ListFilter, Trash2 } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function WhatsApp({ onAlert }: ActionProps) {
  const [apiType, setApiType] = useState<"sandbox" | "official">("sandbox");
  const [connectionStatus, setConnectionStatus] = useState<"disconnected" | "connecting" | "connected">("connected");
  const [phoneNumber, setPhoneNumber] = useState("+91 90000 12345");
  const [templates, setTemplates] = useState([
    { id: 1, name: "welcome_message", category: "Utility", language: "English (US)", status: "Approved", parameters: 2 },
    { id: 2, name: "appointment_reminder", category: "Marketing", language: "English (US)", status: "Approved", parameters: 3 },
    { id: 3, name: "payment_success_invoice", category: "Transactional", language: "English (UK)", status: "Approved", parameters: 1 },
    { id: 4, name: "lead_follow_up_agent", category: "Marketing", language: "Spanish", status: "Pending", parameters: 2 }
  ]);

  const toggleConnection = () => {
    if (connectionStatus === "connected") {
      setConnectionStatus("disconnected");
      onAlert("WhatsApp channel disconnected.");
    } else {
      setConnectionStatus("connecting");
      onAlert("Generating secure QR pairing code...");
      setTimeout(() => {
        setConnectionStatus("connected");
        onAlert("WhatsApp sandbox channel linked successfully!");
      }, 2000);
    }
  };

  const handleCreateTemplate = () => {
    onAlert("Template creation window opened.");
  };

  const deleteTemplate = (id: number, name: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    onAlert(`Template '${name}' deleted.`);
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title & Connection Header */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">WhatsApp API Manager</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Link official numbers, configure webhook payloads, and synchronize Meta templates.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border uppercase tracking-wide select-none ${
            connectionStatus === "connected" ? "bg-[#ECFDF5] text-[#10B981] border-[#A7F3D0]" :
            connectionStatus === "connecting" ? "bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE] animate-pulse" :
            "bg-[#FEF2F2] text-[#EF4444] border-[#FCA5A5]"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              connectionStatus === "connected" ? "bg-[#10B981]" :
              connectionStatus === "connecting" ? "bg-[#4F46E5]" :
              "bg-[#EF4444]"
            }`} />
            {connectionStatus === "connected" ? "Node Connected" : connectionStatus === "connecting" ? "Linking..." : "Offline"}
          </span>
          <Button 
            onPress={toggleConnection}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#4B5563] cursor-pointer h-auto"
          >
            <Smartphone className="w-3.5 h-3.5" />
            {connectionStatus === "connected" ? "Disconnect Channel" : "Scan QR Link"}
          </Button>
        </div>
      </div>

      {/* API Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          className={`p-5 border cursor-pointer transition-all flex flex-col justify-between ${
            apiType === "sandbox" ? "border-[#4F46E5] bg-[#EEF2FF]/20" : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
          }`}
          style={{ borderRadius: "16px" }}
          onClick={() => { setApiType("sandbox"); onAlert("Switched to sandbox mock mode."); }}
        >
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-[#4F46E5] uppercase tracking-wider bg-[#EEF2FF] px-2 py-0.5 rounded">Free Tier</span>
              <Smartphone className="w-4 h-4 text-[#6B7280]" />
            </div>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Botty WhatsApp Sandbox</h3>
            <p className="text-[10px] text-[#6B7280] mt-1.5 leading-relaxed">
              Instantly test flows using our shared test number. No Meta Business Verification required.
            </p>
          </div>
        </Card>

        <Card 
          className={`p-5 border cursor-pointer transition-all flex flex-col justify-between ${
            apiType === "official" ? "border-[#4F46E5] bg-[#EEF2FF]/20" : "border-[#E5E7EB] bg-white hover:border-[#D1D5DB]"
          }`}
          style={{ borderRadius: "16px" }}
          onClick={() => { setApiType("official"); onAlert("Meta WhatsApp Official API requires credentials."); }}
        >
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider bg-[#ECFDF5] px-2 py-0.5 rounded">Production</span>
              <Phone className="w-4 h-4 text-[#6B7280]" />
            </div>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">Official Cloud API (Meta)</h3>
            <p className="text-[10px] text-[#6B7280] mt-1.5 leading-relaxed">
              Connect your own verified business numbers. High throughput, customizable display names.
            </p>
          </div>
        </Card>
      </div>

      {/* Metrics & Template Management */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Connection Setup & QR Code Simulator */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {connectionStatus === "disconnected" ? (
            <Card className="p-6 border border-[#E5E7EB] bg-white text-center" style={{ borderRadius: "16px" }}>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4">Pair Your Device</h3>
              <div className="w-44 h-44 border border-[#E5E7EB] rounded-xl bg-[#F8FAFC] mx-auto flex items-center justify-center relative p-3">
                {/* Visual Mock QR */}
                <div className="w-full h-full bg-grid-pattern opacity-40 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=botty-whatsapp-link')] bg-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-white/90 p-4 rounded-xl border border-[#E5E7EB]">
                  <span className="text-[10px] font-semibold text-[#4F46E5] block leading-normal">
                    Click 'Scan QR Link' above to generate.
                  </span>
                </div>
              </div>
              <p className="text-[10px] text-[#6B7280] mt-4 leading-normal">
                Scan the QR code from your linked devices section in the WhatsApp mobile app to begin receiving notifications.
              </p>
            </Card>
          ) : (
            <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
              <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4">Channel Details</h3>
              <div className="flex flex-col gap-4 text-xs font-medium">
                <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                  <span className="text-[#6B7280]">Connected Number</span>
                  <span className="font-mono font-bold text-[#111827]">{phoneNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                  <span className="text-[#6B7280]">Display Name</span>
                  <span className="font-bold text-[#111827]">Apex Bot Support</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#F3F4F6]">
                  <span className="text-[#6B7280]">Meta App ID</span>
                  <span className="font-mono text-[#6B7280]">82948172659</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-[#6B7280]">Webhook Sync</span>
                  <span className="text-[#10B981] font-bold">Active (SLA 99.9%)</span>
                </div>
              </div>
            </Card>
          )}

          {/* Quick Stats */}
          <Card className="p-5 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4">Performance Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-center">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Sent</span>
                <span className="text-base font-extrabold text-[#111827] mt-1 block">4,820</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-center">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Delivered</span>
                <span className="text-base font-extrabold text-[#10B981] mt-1 block">99.2%</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-center">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Read Rate</span>
                <span className="text-base font-extrabold text-[#06B6D4] mt-1 block">88.4%</span>
              </div>
              <div className="p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-center">
                <span className="text-[9px] font-bold text-[#6B7280] uppercase tracking-wider block">Reply Rate</span>
                <span className="text-base font-extrabold text-[#4F46E5] mt-1 block">42.1%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Meta Message Templates */}
        <div className="lg:col-span-8">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider">HSM Templates (Meta Approved)</h3>
                <p className="text-[10px] text-[#6B7280] mt-0.5">Templates required to initiate conversations with outbound leads.</p>
              </div>
              <Button 
                onPress={handleCreateTemplate}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl text-xs font-bold cursor-pointer text-white h-auto transition-colors"
              >
                Create Template
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                    <th className="pb-4">Template Name</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4">Language</th>
                    <th className="pb-4">Vars</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((temp) => (
                    <tr key={temp.id} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC]">
                      <td className="py-4 font-bold text-[#111827] font-mono">{temp.name}</td>
                      <td className="py-4 text-[#6B7280]">{temp.category}</td>
                      <td className="py-4 text-[#6B7280]">{temp.language}</td>
                      <td className="py-4 font-bold font-mono text-[#111827]">{temp.parameters}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase ${
                          temp.status === "Approved" ? "bg-[#ECFDF5] text-[#10B981]" : "bg-[#FFFBEB] text-[#F59E0B]"
                        }`}>
                          {temp.status}
                        </span>
                      </td>
                      <td className="py-4 text-right flex justify-end gap-2">
                        <Button
                          isIconOnly
                          size="sm"
                          onPress={() => deleteTemplate(temp.id, temp.name)}
                          className="bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#EF4444] rounded-lg min-w-8 w-8 h-8 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
