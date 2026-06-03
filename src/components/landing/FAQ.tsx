"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does Botty train on my business documents?",
      a: "You can upload PDFs, Word files, text documents, or paste public website URLs. Our system parses and builds a semantic knowledge graph. The AI uses this data to answer questions with high contextual accuracy.",
    },
    {
      q: "Can I connect my official WhatsApp Business API?",
      a: "Yes! We offer a direct integration for official WhatsApp Business numbers. You can link your number via our portal and start automating replies in less than 5 minutes.",
    },
    {
      q: "Is there a human backup/handoff if the AI gets stuck?",
      a: "Absolutely. You can set up custom threshold rules. If the customer asks to speak with a human or if the AI is unsure of an answer, the conversation is immediately flagged and transferred to your team dashboard.",
    },
    {
      q: "Does Botty support multiple languages?",
      a: "Yes. The AI automatically detects the customer's language and replies natively. We support over 50+ languages, including Hindi, Spanish, Arabic, German, and French.",
    },
    {
      q: "Can I customize the agent's prompt and tone of voice?",
      a: "Yes. You have full control over the system prompts, instructions, tone settings, and response creativity parameters inside the admin dashboard.",
    },
  ];

  return (
    <section className="py-24 relative z-10 max-w-4xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-accent mb-3">Support</h2>
        <h3 className="text-3xl sm:text-5xl font-extrabold text-white">Frequently Asked Questions</h3>
      </div>

      <div className="flex flex-col gap-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-white/5 bg-[#151B30]/30 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 text-white hover:text-accent transition-colors font-bold text-sm sm:text-base cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-xs sm:text-sm text-text-muted leading-relaxed border-t border-white/5 pt-4">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
