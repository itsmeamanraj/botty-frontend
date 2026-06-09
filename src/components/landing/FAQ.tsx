"use client";

import { useState } from "react";
import { HelpCircle, ArrowRight, MessageSquare, Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does Botty train on my business documents?",
      a: "You can upload PDFs, Word files, text documents, or paste public website URLs. Our system parses the texts, decomposes them into embeddings, and constructs a semantic knowledge graph. The AI uses this contextual graph to answer customer questions with zero hallucinations.",
    },
    {
      q: "Can I connect my official WhatsApp Business API?",
      a: "Yes! We offer a direct meta-authorized integration for official WhatsApp Business numbers. You can link your number via our unified portal and start automating your replies in less than 5 minutes.",
    },
    {
      q: "Is there a human backup/handoff if the AI gets stuck?",
      a: "Absolutely. You can set up customized confidence thresholds. If a customer explicitly requests a human operator, or if the AI's confidence score falls below your limit, the chat is immediately flagged and routed to your team's live dashboard.",
    },
    {
      q: "Does Botty support multiple languages?",
      a: "Yes. The AI automatically detects the incoming customer's language and replies natively. We support over 50+ languages, including English, Spanish, Hindi, Arabic, German, and French with contextual translations.",
    },
    {
      q: "Can I customize the agent's prompt and tone of voice?",
      a: "Yes. You have full granular control over the system instructions, tone parameters, custom bot descriptions, and creative temperature scales inside your workspace dashboard settings.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 relative z-10 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Sticky Header & Support Widget */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col gap-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-primary" /> Support Hub
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-500 mt-4 text-sm max-w-md leading-relaxed">
              Find instant answers to common questions about Botty's training, integrations, security, and human handoff capabilities.
            </p>
          </div>

          {/* Contact Support Card */}
          <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col gap-4 max-w-sm mt-2">
            <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm mb-1">Still have questions?</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Can't find the answer you're looking for? Message our team for a personalized demo or custom integration quote.
              </p>
            </div>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm self-start"
            >
              Contact Support <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Modern Accordion list */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-slate-50/50 border-primary/30 shadow-sm" 
                    : "bg-white border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:border-slate-300"
                }`}
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-slate-800 hover:text-slate-950 font-bold text-sm sm:text-base cursor-pointer focus:outline-none select-none"
                >
                  <span className={isOpen ? "text-primary" : "text-slate-900"}>{faq.q}</span>
                  
                  {/* Rotating Indicator */}
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen 
                      ? "bg-primary text-white border-primary rotate-95" 
                      : "bg-white text-slate-400 border-slate-200 hover:text-slate-700"
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Smooth Expandable Body (CSS Grid Rows transition) */}
                <div className={`grid transition-all duration-300 ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-xs sm:text-sm text-slate-500 leading-relaxed pt-2 border-t border-slate-200/40">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
