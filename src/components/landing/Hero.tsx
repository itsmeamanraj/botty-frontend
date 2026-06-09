"use client";

import { useEffect, useRef, useState } from "react";
import { animate, createTimeline, createMotionPath, stagger } from "animejs";
import { Play, ArrowRight, MessageSquare, Bot, User, Database, Sparkles, CheckCircle2, FileText, Globe, Upload } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Refs for interactive nodes
  const nodeCoreRef = useRef<HTMLDivElement>(null);
  const nodeWaRef = useRef<HTMLDivElement>(null);
  const nodeWcRef = useRef<HTMLDivElement>(null);
  const nodeKbRef = useRef<HTMLDivElement>(null);
  const nodeCrmRef = useRef<HTMLDivElement>(null);

  // Autoplay demonstration states
  const [activeNode, setActiveNode] = useState<string | null>("wa");
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const autoplayIndex = useRef(0);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nodeSequence = ["wa", "kb", "crm", "wc"];

  // Autoplay loop when user is not hovering
  useEffect(() => {
    if (isUserInteracting) return;

    const cycleNext = () => {
      autoplayIndex.current = (autoplayIndex.current + 1) % nodeSequence.length;
      setActiveNode(nodeSequence[autoplayIndex.current]);
    };

    const timer = setInterval(cycleNext, 3500);
    return () => clearInterval(timer);
  }, [isUserInteracting]);

  // Handle manual hover triggers
  const handleMouseEnterNode = (nodeId: string) => {
    setIsUserInteracting(true);
    setActiveNode(nodeId);
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
  };

  const handleMouseLeaveNode = () => {
    // Return to autoplay cycle after 4 seconds of idle time
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    idleTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 4000);
  };

  // Anime.js 3D perspective tilt & entry animations
  useEffect(() => {
    const container = containerRef.current;
    const nodeCore = nodeCoreRef.current;
    const nodeWa = nodeWaRef.current;
    const nodeWc = nodeWcRef.current;
    const nodeKb = nodeKbRef.current;
    const nodeCrm = nodeCrmRef.current;

    if (!container || !nodeCore || !nodeWa || !nodeWc || !nodeKb || !nodeCrm) return;

    // Set initial 3D positions
    animate(container, {
      rotateX: 10,
      rotateY: -12,
      rotateZ: 0,
      duration: 0,
    });

    animate(nodeCore, { translateZ: 20, scale: 0, opacity: 0, duration: 0 });
    animate(nodeWa, { translateZ: 40, scale: 0, opacity: 0, duration: 0 });
    animate(nodeWc, { translateZ: 40, scale: 0, opacity: 0, duration: 0 });
    animate(nodeKb, { translateZ: 50, scale: 0, opacity: 0, duration: 0 });
    animate(nodeCrm, { translateZ: 50, scale: 0, opacity: 0, duration: 0 });

    // Staggered Entry Animation
    createTimeline({
      defaults: {
        ease: "easeOutElastic(1, .85)",
        duration: 1200,
      }
    })
    .add(container, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
      ease: "easeOutQuart"
    })
    .add(nodeCore, {
      scale: [0, 1],
      opacity: [0, 1],
    }, "-=600")
    .add([nodeWa, nodeWc, nodeKb, nodeCrm], {
      scale: [0, 1],
      opacity: [0, 1],
      delay: stagger(120)
    }, "-=800");

    // Initialize SVG Path Animations (Data Packets)
    try {
      const motionPathWA = createMotionPath("#path-wa");
      const motionPathWC = createMotionPath("#path-wc");
      const motionPathKB = createMotionPath("#path-kb");
      const motionPathCRM = createMotionPath("#path-crm");

      // 1. WhatsApp -> Core (infinite repeat)
      animate("#packet-wa", {
        translateX: motionPathWA.translateX,
        translateY: motionPathWA.translateY,
        ease: "linear",
        duration: 3200,
        loop: true,
      });

      // 2. WebWidget -> Core (infinite repeat)
      animate("#packet-wc", {
        translateX: motionPathWC.translateX,
        translateY: motionPathWC.translateY,
        ease: "linear",
        duration: 3600,
        loop: true,
      });

      // 3. Core -> KB (back and forth check)
      animate("#packet-kb", {
        translateX: motionPathKB.translateX,
        translateY: motionPathKB.translateY,
        ease: "linear",
        duration: 2800,
        loop: true,
        direction: "alternate",
      });

      // 4. Core -> CRM (infinite sync repeat)
      animate("#packet-crm", {
        translateX: motionPathCRM.translateX,
        translateY: motionPathCRM.translateY,
        ease: "linear",
        duration: 2600,
        loop: true,
      });
    } catch (err) {
      console.warn("SVG Motion Paths not ready", err);
    }

    // Interactive mouse move tilt and parallax offsets
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Rotations
      const rotX = ((y - centerY) / centerY) * -12; // tilt X
      const rotY = ((x - centerX) / centerX) * 14;  // tilt Y

      animate(container, {
        rotateX: rotX,
        rotateY: rotY,
        duration: 300,
        easing: "easeOutQuad",
      });

      // Parallax shifts on Z/X/Y coordinates
      animate(nodeCore, {
        translateX: ((x - centerX) / centerX) * 6,
        translateY: ((y - centerY) / centerY) * 6,
        translateZ: 25,
        duration: 300,
        easing: "easeOutQuad",
      });

      animate(nodeWa, {
        translateX: ((x - centerX) / centerX) * -12,
        translateY: ((y - centerY) / centerY) * -12,
        translateZ: 45,
        duration: 300,
        easing: "easeOutQuad",
      });

      animate(nodeWc, {
        translateX: ((x - centerX) / centerX) * -12,
        translateY: ((y - centerY) / centerY) * 12,
        translateZ: 45,
        duration: 300,
        easing: "easeOutQuad",
      });

      animate(nodeKb, {
        translateX: ((x - centerX) / centerX) * 12,
        translateY: ((y - centerY) / centerY) * -12,
        translateZ: 55,
        duration: 300,
        easing: "easeOutQuad",
      });

      animate(nodeCrm, {
        translateX: ((x - centerX) / centerX) * 12,
        translateY: ((y - centerY) / centerY) * 12,
        translateZ: 55,
        duration: 300,
        easing: "easeOutQuad",
      });
    };

    const handleMouseLeave = () => {
      // Revert to stable default state
      animate(container, {
        rotateX: 10,
        rotateY: -12,
        rotateZ: 0,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
      animate(nodeCore, {
        translateX: 0,
        translateY: 0,
        translateZ: 20,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
      animate(nodeWa, {
        translateX: 0,
        translateY: 0,
        translateZ: 40,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
      animate(nodeWc, {
        translateX: 0,
        translateY: 0,
        translateZ: 40,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
      animate(nodeKb, {
        translateX: 0,
        translateY: 0,
        translateZ: 50,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
      animate(nodeCrm, {
        translateX: 0,
        translateY: 0,
        translateZ: 50,
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Helper to construct tooltip CSS classes
  const getTooltipClass = (nodeId: string, position: "top" | "bottom") => {
    const isActive = activeNode === nodeId;
    const yTranslation = position === "top" ? "translate-y-2" : "-translate-y-2";
    return `absolute ${position === "top" ? "bottom-14" : "top-14"} left-1/2 -translate-x-1/2 w-48 bg-slate-900 border border-slate-950 text-slate-300 shadow-xl rounded-2xl p-3 text-[10px] leading-relaxed font-medium transition-all duration-300 transform origin-bottom z-50 ${
      isActive 
        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
        : `opacity-0 ${yTranslation} scale-95 pointer-events-none`
    }`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-36 pb-24 overflow-hidden bg-white">
      {/* Vercel-like decorative background lines & dots */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid-bg-overlay opacity-80" />
        {/* Soft Radial Gradients */}
        <div className="absolute top-0 left-1/3 w-[800px] h-[600px] bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Side Content */}
        <div className="lg:col-span-5 flex flex-col text-center lg:text-left items-center lg:items-start">
          {/* Floating Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-xs font-semibold text-primary mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            Next-Gen Business AI Agent
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
            AI Employee For <br />
            <span className="bg-gradient-to-r from-primary via-[#7C3AED] to-accent bg-clip-text text-transparent">
              Your Business
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-slate-500 max-w-lg leading-relaxed mb-10">
            Automate WhatsApp replies, website chats, customer support, and lead generation with AI trained on your business knowledge.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a
              href="#trial"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900 text-white font-semibold shadow-md shadow-slate-950/10 hover:bg-slate-800 transition-all duration-200 hover:-translate-y-0.5"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current text-slate-700" />
              Watch Demo
            </a>
          </div>
        </div>

        {/* Right Side Constellation Display */}
        <div className="lg:col-span-7 flex justify-center items-center w-full min-h-[480px]">
          {/* 3D perspective wrapper */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-[500px] aspect-[5/4] perspective-1000 preserve-3d"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* SVG Constellation Connections */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none" 
              viewBox="0 0 500 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              
              {/* Paths connecting nodes to central Core */}
              <path id="path-wa" d="M 70 100 Q 150 110, 250 200" stroke="rgba(0,0,0,0.06)" strokeWidth="2" strokeDasharray="6 6" />
              <path id="path-wc" d="M 70 300 Q 150 290, 250 200" stroke="rgba(0,0,0,0.06)" strokeWidth="2" strokeDasharray="6 6" />
              <path id="path-kb" d="M 250 200 Q 350 155, 430 100" stroke="rgba(0,0,0,0.06)" strokeWidth="2" strokeDasharray="6 6" />
              <path id="path-crm" d="M 250 200 Q 350 245, 430 300" stroke="rgba(0,0,0,0.06)" strokeWidth="2" strokeDasharray="6 6" />
              
              {/* Animated Floating Packets */}
              <circle id="packet-wa" r="5" fill="#10B981" filter="url(#glow)" />
              <circle id="packet-wc" r="5" fill="#5F43F1" filter="url(#glow)" />
              <circle id="packet-kb" r="4.5" fill="#F59E0B" filter="url(#glow)" />
              <circle id="packet-crm" r="5.5" fill="#10B981" filter="url(#glow)" />
            </svg>

            {/* Constellation HTML Nodes */}

            {/* 1. WHATSAPP CHANNEL NODE (Input) */}
            <div 
              ref={nodeWaRef}
              onMouseEnter={() => handleMouseEnterNode("wa")}
              onMouseLeave={handleMouseLeaveNode}
              className={`absolute w-12 h-12 rounded-full border bg-white shadow-md flex items-center justify-center transition-all duration-350 cursor-pointer group/node ${
                activeNode === "wa" ? "scale-110 border-emerald-400 shadow-emerald-100 shadow-lg" : "border-slate-200/80"
              }`}
              style={{ left: "14%", top: "25%", transform: "translate(-50%, -50%)", transformStyle: "preserve-3d" }}
            >
              {/* Active Ping ring */}
              {activeNode === "wa" && (
                <span className="absolute inset-0 rounded-full border-2 border-emerald-400 animate-ping pointer-events-none" />
              )}
              
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                WA
              </div>
              
              {/* Info tooltips on hover */}
              <div className={getTooltipClass("wa", "top")}>
                <div className="font-bold text-white mb-0.5">WhatsApp Stream</div>
                Qualifying chats, answering product questions instantly over WhatsApp.
              </div>
            </div>

            {/* 2. WEB CHAT WIDGET NODE (Input) */}
            <div 
              ref={nodeWcRef}
              onMouseEnter={() => handleMouseEnterNode("wc")}
              onMouseLeave={handleMouseLeaveNode}
              className={`absolute w-12 h-12 rounded-full border bg-white shadow-md flex items-center justify-center transition-all duration-350 cursor-pointer group/node ${
                activeNode === "wc" ? "scale-110 border-primary/40 shadow-indigo-100 shadow-lg" : "border-slate-200/80"
              }`}
              style={{ left: "14%", top: "75%", transform: "translate(-50%, -50%)", transformStyle: "preserve-3d" }}
            >
              {/* Active Ping ring */}
              {activeNode === "wc" && (
                <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping pointer-events-none" />
              )}
              
              <div className="w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center font-bold text-xs">
                JS
              </div>
              
              <div className={getTooltipClass("wc", "bottom")}>
                <div className="font-bold text-white mb-0.5">Website Widget</div>
                Embedded JavaScript support widget responding to web visitors 24/7.
              </div>
            </div>

            {/* 3. KNOWLEDGE GRAPH DATABASE NODE (Context) */}
            <div 
              ref={nodeKbRef}
              onMouseEnter={() => handleMouseEnterNode("kb")}
              onMouseLeave={handleMouseLeaveNode}
              className={`absolute w-12 h-12 rounded-full border bg-white shadow-md flex items-center justify-center transition-all duration-350 cursor-pointer group/node ${
                activeNode === "kb" ? "scale-110 border-amber-400 shadow-amber-100 shadow-lg" : "border-slate-200/80"
              }`}
              style={{ left: "86%", top: "25%", transform: "translate(-50%, -50%)", transformStyle: "preserve-3d" }}
            >
              {/* Active Ping ring */}
              {activeNode === "kb" && (
                <span className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping pointer-events-none" />
              )}
              
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                <Database className="w-4 h-4" />
              </div>
              
              <div className={getTooltipClass("kb", "top")}>
                <div className="font-bold text-white mb-0.5">Trained Context</div>
                System parses your custom PDFs, text manuals & crawled websites.
              </div>
            </div>

            {/* 4. CRM / LEADS NODE (Output) */}
            <div 
              ref={nodeCrmRef}
              onMouseEnter={() => handleMouseEnterNode("crm")}
              onMouseLeave={handleMouseLeaveNode}
              className={`absolute w-12 h-12 rounded-full border bg-white shadow-md flex items-center justify-center transition-all duration-350 cursor-pointer group/node ${
                activeNode === "crm" ? "scale-110 border-emerald-500/50 shadow-emerald-50 shadow-lg" : "border-slate-200/80"
              }`}
              style={{ left: "86%", top: "75%", transform: "translate(-50%, -50%)", transformStyle: "preserve-3d" }}
            >
              {/* Active Ping ring */}
              {activeNode === "crm" && (
                <span className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping pointer-events-none" />
              )}
              
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              
              <div className={getTooltipClass("crm", "bottom")}>
                <div className="font-bold text-white mb-0.5">CRM Integrations</div>
                Extracts names & numbers and auto-syncs qualified leads to HubSpot.
              </div>
            </div>

            {/* 5. CENTRAL AI CORE ENGINE */}
            <div 
              ref={nodeCoreRef}
              onMouseEnter={() => handleMouseEnterNode("core")}
              onMouseLeave={handleMouseLeaveNode}
              className="absolute w-24 h-24 rounded-full border border-primary/20 bg-white/95 shadow-2xl flex items-center justify-center hover:scale-105 transition-transform duration-300 cursor-pointer group/core"
              style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", transformStyle: "preserve-3d" }}
            >
              {/* Outer dashed spinning ring */}
              <div className="absolute inset-0.5 rounded-full border border-dashed border-primary/30 animate-spin" style={{ animationDuration: '24s' }} />
              {/* Middle pulsing background */}
              <div className="absolute inset-3 rounded-full bg-primary/5 border border-primary/10 animate-pulse" />
              
              {/* Inner core badge */}
              <div className="relative w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5 animate-pulse" />
              </div>
              
              <div className={getTooltipClass("core", "top")}>
                <div className="font-bold text-white mb-1 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" /> Botty AI Engine
                </div>
                Decodes queries, reads trained vectors, and generates real-time answers.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
