"use client";

import { useState } from "react";
import { Code, Settings, Paintbrush, AlignLeft, Send, MessageCircle, Bot, ArrowRight } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Widget({ onAlert }: ActionProps) {
  // Widget State
  const [welcomeText, setWelcomeText] = useState("Hi! How can we help you today?");
  const [primaryColor, setPrimaryColor] = useState("#4F46E5"); // Default Indigo
  const [position, setPosition] = useState<"right" | "left">("right");
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  // Chat Simulator State
  const [chatMessages, setChatMessages] = useState([
    { sender: "bot", text: "Hello! Welcome to Apex Business. Ask me anything about our services." }
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    const userMsg = userInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setUserInput("");

    // Simulate bot reply
    setTimeout(() => {
      let reply = "Thanks for asking! We specialize in custom software integrations and multi-channel AI assistants. Would you like to schedule a demo?";
      if (userMsg.toLowerCase().includes("price") || userMsg.toLowerCase().includes("pricing")) {
        reply = "Our starter plan starts at $49/mo. We also offer scale-up enterprise solutions. You can check the Subscription page for details.";
      }
      setChatMessages(prev => [...prev, { sender: "bot", text: reply }]);
    }, 1000);
  };

  const handleCopyCode = () => {
    const embedCode = `<script src="https://cdn.botty.ai/widget.js" data-tenant-id="apex-829" data-color="${primaryColor}" data-position="${position}"></script>`;
    navigator.clipboard.writeText(embedCode);
    onAlert("Embed code copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title & Copy Code */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Website Chat Widget</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Customize your website chat client UI and copy integration snippet tags.</p>
        </div>
        <Button 
          onPress={handleCopyCode}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] rounded-xl text-xs font-bold cursor-pointer text-white h-auto shrink-0 transition-colors"
        >
          <Code className="w-3.5 h-3.5" /> Copy Code Snippet
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Editor Controls */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white flex-1" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-5 flex items-center gap-2">
              <Paintbrush className="w-4 h-4 text-[#6B7280]" />
              Widget Customisation
            </h3>

            <div className="flex flex-col gap-5">
              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Welcome Banner Message</label>
                <input
                  type="text"
                  value={welcomeText}
                  onChange={(e) => setWelcomeText(e.target.value)}
                  className="w-full bg-[#F8FAFC] border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-xl py-2 px-3 text-xs text-[#111827] placeholder-[#9CA3AF] outline-none focus:border-[#4F46E5] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Theme Palette Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 border border-[#E5E7EB] rounded-xl cursor-pointer p-0.5"
                  />
                  <input
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] font-mono outline-none focus:border-[#4F46E5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Alignment Position</label>
                  <select
                    value={position}
                    onChange={(e) => setPosition(e.target.value as "right" | "left")}
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5]"
                  >
                    <option value="right">Bottom Right</option>
                    <option value="left">Bottom Left</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block mb-1.5">Contrast Mode</label>
                  <select
                    value={themeMode}
                    onChange={(e) => setThemeMode(e.target.value as "light" | "dark")}
                    className="w-full bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-2 px-3 text-xs text-[#111827] outline-none focus:border-[#4F46E5]"
                  >
                    <option value="light">Light Base</option>
                    <option value="dark">Dark Base</option>
                  </select>
                </div>
              </div>

              <Button
                onPress={() => onAlert("Widget customization config saved!")}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#4F46E5] text-xs font-bold transition-colors cursor-pointer mt-2"
              >
                Save Widget Config
              </Button>
            </div>
          </Card>
        </div>

        {/* Live Simulator View */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <Card className="border border-[#E5E7EB] bg-[#F1F5F9] p-6 flex flex-col justify-between items-center relative overflow-hidden flex-1 min-h-[450px]" style={{ borderRadius: "16px" }}>
            <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider absolute top-4 left-4 select-none">
              Interactive Preview Simulator
            </span>

            {/* Simulated Desktop Website Frame */}
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl flex flex-col h-[380px] border border-[#E5E7EB] mt-4 relative overflow-hidden">
              {/* Widget Header Mock */}
              <div 
                className="px-4 py-3 flex items-center gap-2.5 text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center font-extrabold text-xs">
                  B
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold truncate">Apex Support Assistant</h4>
                  <span className="text-[9px] opacity-80 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                    AI bot online
                  </span>
                </div>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-[#F8FAFC]">
                <div className="p-2.5 rounded-2xl bg-slate-100 text-slate-800 text-[10px] leading-relaxed max-w-[85%] self-start font-medium shadow-xs">
                  {welcomeText}
                </div>

                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`p-2.5 rounded-2xl text-[10px] leading-relaxed max-w-[85%] font-medium shadow-xs ${
                      msg.sender === "user" 
                        ? "bg-[#4F46E5] text-white self-end" 
                        : "bg-slate-100 text-slate-800 self-start"
                    }`}
                    style={msg.sender === "user" ? { backgroundColor: primaryColor } : {}}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input section */}
              <div className="border-t border-[#E5E7EB] p-2 bg-white flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask a question..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleSendMessage(); }}
                  className="flex-1 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl py-1.5 px-3 text-[10px] text-[#111827] outline-none"
                />
                <Button
                  isIconOnly
                  size="sm"
                  onPress={handleSendMessage}
                  className="w-8 h-8 min-w-8 rounded-xl bg-[#4F46E5] text-white flex items-center justify-center p-0 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
