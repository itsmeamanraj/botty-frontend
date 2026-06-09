"use client";

import { useState } from "react";
import { Search, Send, User, Bot, Clock, Check, MoreVertical, Star, Shield } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Conversations({ onAlert }: ActionProps) {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: "Aman Raj",
      source: "WhatsApp",
      phone: "+91 9876543210",
      status: "Active",
      snippet: "Can I upgrade my subscription plan today?",
      time: "2m ago",
      messages: [
        { sender: "customer", text: "Hello, I am interested in upgrading my business account.", time: "10:42 AM" },
        { sender: "bot", text: "Hi Aman! You can upgrade your plan inside the Billing tab in the dashboard. Would you like me to send you the direct checkout link?", time: "10:42 AM" },
        { sender: "customer", text: "Can I upgrade my subscription plan today?", time: "10:44 AM" }
      ]
    },
    {
      id: 2,
      name: "Sarah Jenkins",
      source: "Website Chat",
      phone: "sarah@hosp-group.com",
      status: "AI Resolved",
      snippet: "Thanks, the scheduling is completed.",
      time: "14m ago",
      messages: [
        { sender: "customer", text: "How do I schedule an appointment?", time: "10:12 AM" },
        { sender: "bot", text: "To schedule an appointment, you can use our dynamic scheduling widget. Please choose a slot from the link below.", time: "10:13 AM" },
        { sender: "customer", text: "Thanks, the scheduling is completed.", time: "10:14 AM" }
      ]
    },
    {
      id: 3,
      name: "Marcus Chen",
      source: "WhatsApp",
      phone: "+1 555-0199",
      status: "Pending Handover",
      snippet: "I need to talk to a human agent immediately.",
      time: "1h ago",
      messages: [
        { sender: "customer", text: "Your chatbot is not understanding my issue.", time: "09:30 AM" },
        { sender: "customer", text: "I need to talk to a human agent immediately.", time: "09:31 AM" }
      ]
    }
  ]);

  const [activeId, setActiveId] = useState(1);
  const [replyText, setReplyText] = useState("");

  const activeChat = conversations.find(c => c.id === activeId) || conversations[0];

  const handleSend = () => {
    if (!replyText.trim()) return;
    setConversations(prev => prev.map(c => {
      if (c.id === activeId) {
        return {
          ...c,
          messages: [...c.messages, { sender: "agent", text: replyText, time: "Now" }],
          snippet: replyText
        };
      }
      return c;
    }));
    setReplyText("");
    onAlert("Message sent successfully!");
  };

  return (
    <div className="flex border border-[#E5E7EB] bg-white rounded-2xl overflow-hidden h-[calc(100vh-140px)] animate-in fade-in duration-200">
      {/* 1. Chat List */}
      <div className="w-[320px] border-r border-[#E5E7EB] flex flex-col h-full bg-[#F8FAFC]">
        <div className="p-4 border-b border-[#E5E7EB] bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 pl-9 pr-4 text-xs text-[#111827] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`p-3.5 rounded-xl text-left cursor-pointer transition-all ${
                c.id === activeId
                  ? "bg-white shadow-sm border border-[#E5E7EB] ring-1 ring-[#4F46E5]/10"
                  : "hover:bg-white/[0.6] border border-transparent"
              }`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-bold text-xs text-[#111827]">{c.name}</span>
                <span className="text-[9px] text-[#9CA3AF] font-mono">{c.time}</span>
              </div>
              <p className="text-[10px] text-[#6B7280] truncate leading-relaxed">{c.snippet}</p>
              <div className="flex justify-between items-center mt-2.5">
                <span className="text-[8px] px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] text-[#6B7280] font-medium font-mono uppercase tracking-wider">
                  {c.source}
                </span>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                  c.status === "Active" ? "bg-[#EEF2FF] text-[#4F46E5]" :
                  c.status === "AI Resolved" ? "bg-[#ECFDF5] text-[#10B981]" :
                  "bg-[#FFFBEB] text-[#F59E0B]"
                }`}>
                  {c.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Chat Viewport */}
      <div className="flex-1 flex flex-col h-full bg-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-xs font-bold text-[#4F46E5]">
              {activeChat.name[0]}
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#111827]">{activeChat.name}</h3>
              <p className="text-[10px] text-[#6B7280] mt-0.5 font-medium">{activeChat.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-[#10B981]/10 text-[#10B981] hover:bg-[#10B981]/20 font-bold text-[10px] h-8 px-3 rounded-lg cursor-pointer">
              Mark Resolved
            </Button>
            <button className="p-1.5 rounded-lg border border-[#E5E7EB] hover:bg-[#F8FAFC] text-[#6B7280] cursor-pointer">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#F8FAFC] flex flex-col gap-4">
          {activeChat.messages.map((msg, idx) => {
            const isCustomer = msg.sender === "customer";
            const isBot = msg.sender === "bot";
            return (
              <div
                key={idx}
                className={`flex gap-3 max-w-[70%] ${
                  isCustomer ? "self-start" : "self-end flex-row-reverse"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                  isCustomer ? "bg-[#EEF2FF] text-[#4F46E5]" :
                  isBot ? "bg-[#ECFDF5] text-[#10B981]" :
                  "bg-[#EEF2FF] text-[#4F46E5]"
                }`}>
                  {isCustomer ? <User className="w-3.5 h-3.5" /> : isBot ? <Bot className="w-3.5 h-3.5" /> : <Shield className="w-3.5 h-3.5" />}
                </div>
                <div>
                  <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isCustomer 
                      ? "bg-white border border-[#E5E7EB] text-[#111827] rounded-tl-none" 
                      : isBot 
                        ? "bg-[#E6F4EA] border border-[#10B981]/10 text-[#137333] rounded-tr-none"
                        : "bg-[#4F46E5] text-white rounded-tr-none"
                  }`}>
                    {isBot && (
                      <span className="text-[8px] font-extrabold tracking-wider uppercase text-[#137333] block mb-1 font-mono">
                        🤖 AI Agent Response
                      </span>
                    )}
                    {msg.text}
                  </div>
                  <span className="text-[8px] text-[#9CA3AF] font-bold font-mono mt-1 block px-1 text-right">
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reply Area */}
        <div className="p-4 border-t border-[#E5E7EB] bg-white flex gap-3">
          <input
            type="text"
            placeholder="Type your response as agent..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl px-4 py-2.5 text-xs text-[#111827] outline-none focus:border-[#4F46E5] transition-all bg-[#F8FAFC] focus:bg-white"
          />
          <Button
            onPress={handleSend}
            className="bg-[#4F46E5] text-white font-semibold text-xs rounded-xl px-4 h-10 flex items-center gap-1.5 cursor-pointer hover:bg-[#4338CA] transition-colors"
          >
            Send <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* 3. Detail Drawer (Sidebar Right) */}
      <div className="w-[280px] border-l border-[#E5E7EB] flex flex-col h-full bg-white p-5 select-none shrink-0">
        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-6">Customer Details</h3>

        <div className="flex flex-col gap-4 text-xs">
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
            <span className="text-[#6B7280]">Source</span>
            <span className="font-semibold text-[#111827]">{activeChat.source}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
            <span className="text-[#6B7280]">Identity</span>
            <span className="font-semibold text-[#111827]">{activeChat.name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
            <span className="text-[#6B7280]">Phone/Email</span>
            <span className="font-semibold text-[#111827] font-mono">{activeChat.phone}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-3">
            <span className="text-[#6B7280]">Assigned To</span>
            <span className="font-semibold text-[#4F46E5] flex items-center gap-1">
              <Bot className="w-3 h-3" /> AI Assistant
            </span>
          </div>

          <div className="mt-4">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-2">Customer Tags</span>
            <div className="flex flex-wrap gap-1">
              {["High Value", "Support", "Lead-Active"].map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] rounded-full text-[9px] font-bold">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-2 font-semibold">Internal Notes</span>
            <textarea
              placeholder="Add notes about this customer..."
              className="w-full border border-[#E5E7EB] rounded-xl p-2.5 text-[11px] leading-relaxed text-[#111827] outline-none focus:border-[#4F46E5] bg-[#F8FAFC] h-20 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
