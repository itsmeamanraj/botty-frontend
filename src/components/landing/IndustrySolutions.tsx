"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { motion } from "framer-motion";
import {
  GraduationCap,
  HeartPulse,
  Building,
  ShoppingBag,
  Bot,
  User,
  CheckCircle,
  FileText,
  MapPin,
  Calendar,
  Truck
} from "lucide-react";

export default function IndustrySolutions() {
  const [activeIdx, setActiveIdx] = useState(0);
  const chatScreenRef = useRef<HTMLDivElement>(null);

  const industries = [
    {
      id: "edu",
      name: "Education",
      desc: "Manage school admissions, tuition alerts, exam syllabus updates, and parent notifications automatically.",
      icon: GraduationCap,
      color: "border-primary",
      avatarBg: "bg-primary/10 text-primary",
      botName: "Apex Academy AI",
      userMsg: "Is the Class 10 board exam syllabus PDF available?",
      botMsg: "Yes! The CBSE Class 10 board syllabus has been updated. I've fetched the syllabus document for you. Click below to view.",
      attachment: {
        name: "class_10_syllabus_2026.pdf",
        size: "1.8 MB",
        icon: FileText,
      }
    },
    {
      id: "health",
      name: "Healthcare",
      desc: "Coordinate appointments, patient pre-checklists, clinical questions, and diagnostic report distribution securely.",
      icon: HeartPulse,
      color: "border-sky-500",
      avatarBg: "bg-sky-50 text-sky-600",
      botName: "City Care Clinic",
      userMsg: "Can I book a consultation with Dr. Gupta tomorrow morning?",
      botMsg: "Dr. Gupta has slots available tomorrow at 10:15 AM and 11:30 AM. Would you like me to reserve the 10:15 AM appointment?",
      attachment: {
        name: "Dr. Gupta's Calendar",
        size: "Select Slot",
        icon: Calendar,
      }
    },
    {
      id: "real",
      name: "Real Estate",
      desc: "Qualify property buyers, distribute brochures, and schedule automated weekend site visits.",
      icon: Building,
      color: "border-amber-500",
      avatarBg: "bg-amber-50 text-amber-600",
      botName: "Sector 62 Residency",
      userMsg: "Send me the layout plans and brochure for Sector 62 Residency.",
      botMsg: "Certainly! I've sent the pricing sheet and residency layout brochure. We have a site tour scheduled this Sunday. Click below for maps.",
      attachment: {
        name: "sector_62_brochure.pdf",
        size: "3.4 MB",
        icon: MapPin,
      }
    },
    {
      id: "ecom",
      name: "E-Commerce",
      desc: "Deliver instant shipping alerts, order status lookups, return requests, and discount coupons.",
      icon: ShoppingBag,
      color: "border-emerald-500",
      avatarBg: "bg-emerald-50 text-emerald-600",
      botName: "EcoStore Support",
      userMsg: "What is the status of my order #1084? It was shipped yesterday.",
      botMsg: "Your order #1084 has been processed and is out for delivery today via DHL. You can track your shipment live below.",
      attachment: {
        name: "DHL Tracking Link",
        size: "Out for Delivery",
        icon: Truck,
      }
    },
  ];

  // Animate chat screen content on swap
  useEffect(() => {
    const el = chatScreenRef.current;
    if (!el) return;

    animate(el, {
      opacity: [0, 1],
      translateY: [12, 0],
      duration: 350,
      easing: "easeOutQuad",
    });
  }, [activeIdx]);

  const active = industries[activeIdx];
  const AttachmentIcon = active.attachment.icon;

  return (
    <section id="industries" className="py-24 relative z-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Verticals</h2>
          <h3 className="text-3xl sm:text-5xl font-extrabold text-slate-900">Tailored Industry Solutions</h3>
          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            See how Botty automates customer communication across specialized business verticals.
          </p>
        </div>

        {/* Interactive Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: 4 Industry Selectors */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              const isSelected = activeIdx === idx;
              return (
                <div
                  key={ind.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`group p-6 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex gap-4 ${
                    isSelected 
                      ? `bg-slate-50 ${ind.color} border-l-[4px] shadow-sm` 
                      : "bg-white border-slate-200/80 hover:bg-slate-50/50"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                    isSelected ? "bg-slate-900 text-white" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-base font-extrabold mb-1.5 transition-colors ${
                      isSelected ? "text-slate-950" : "text-slate-900 group-hover:text-primary"
                    }`}>
                      {ind.name}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {ind.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Smartphone Live Preview */}
          <div className="lg:col-span-5 flex justify-center items-center">
            {/* Phone Bezel */}
            <div className="border-[8px] border-slate-900 bg-slate-950 rounded-[36px] p-2 aspect-[9/16] w-full max-w-[280px] shadow-2xl relative overflow-hidden">
              
              {/* Phone Speaker & Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full z-20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              </div>

              {/* Chat Interface Screen */}
              <div 
                ref={chatScreenRef}
                className="bg-slate-50 w-full h-[420px] rounded-[28px] overflow-hidden flex flex-col justify-between font-sans shadow-inner text-slate-800 text-[10px]"
              >
                {/* Chat Top Bar */}
                <div className="bg-white border-b border-slate-100 px-3 pt-5 pb-2.5 flex items-center gap-2">
                  <div className="relative">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-extrabold ${active.avatarBg}`}>
                      {active.name.slice(0, 2)}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
                  </div>
                  <div>
                    <div className="font-extrabold text-[10px] text-slate-900 leading-none">{active.botName}</div>
                    <span className="text-[7.5px] text-emerald-600 font-bold mt-0.5 block">Online (AI Support)</span>
                  </div>
                </div>

                {/* Chat Message Thread */}
                <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-3 justify-end">
                  {/* User Message bubble */}
                  <div className="flex items-start gap-1.5 max-w-[85%] self-end flex-row-reverse">
                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 text-[8px] font-bold text-slate-700">U</div>
                    <div className="p-2.5 rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-700 leading-relaxed">
                      {active.userMsg}
                    </div>
                  </div>

                  {/* AI Response bubble */}
                  <div className="flex items-start gap-1.5 max-w-[88%]">
                    <div className="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center flex-shrink-0 text-white">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex flex-col gap-1.5 max-w-full">
                      <div className="p-2.5 rounded-2xl bg-slate-900 text-slate-200 leading-relaxed shadow-sm">
                        {active.botMsg}
                      </div>
                      
                      {/* Attachment Preview Card */}
                      <div className="p-2 rounded-xl border border-slate-200 bg-white shadow-sm flex items-center justify-between gap-2 cursor-pointer hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-2 truncate">
                          <AttachmentIcon className="w-4 h-4 text-primary flex-shrink-0" />
                          <div className="truncate">
                            <div className="font-bold text-[9px] text-slate-800 truncate">{active.attachment.name}</div>
                            <span className="text-[7.5px] text-slate-400 font-semibold">{active.attachment.size}</span>
                          </div>
                        </div>
                        <span className="text-[8.5px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10">View</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Fake Input Bar */}
                <div className="bg-white border-t border-slate-100 p-2 flex items-center justify-between">
                  <span className="text-slate-300 font-medium pl-1 text-[8.5px]">Type a message...</span>
                  <button className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-white text-[10px] font-bold hover:bg-slate-800 transition-colors">
                    &rarr;
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
