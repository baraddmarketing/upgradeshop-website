"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";
import { cn } from "@/lib/utils";

interface FAQSectionProps {
  sections: PageSection[];
}

export function FAQSection({ sections }: FAQSectionProps) {
  const faqSection = getSection(sections, "faq");
  const sectionId = faqSection?.id;
  const sectionKey = faqSection?.sectionKey;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How is this different from Wix or Squarespace?",
      answer:
        "With Wix or Squarespace, you're doing the work yourself — picking templates, editing layouts, learning the platform. With The Upgrade Shop, we build everything for you professionally. You describe what you need, and real developers create it. You never touch an editor.",
    },
    {
      question: "What if I need something custom?",
      answer:
        "That's exactly what we're built for. When you request a feature for a module you're subscribed to, we build it. For free. Your subscription doesn't just maintain — it improves based on your specific needs.",
    },
    {
      question: "Can I start small and add more later?",
      answer:
        "Absolutely. Start with just what you need — maybe just a website, or just CRM. Add more modules as your business grows. Everything works together seamlessly, so there's no penalty for starting small.",
    },
    {
      question: "What does 'Max handles it' actually mean?",
      answer:
        "Max is our AI partner who helps manage your day-to-day updates and requests. Need a text change on your website? Tell Max. Need a new email campaign? Tell Max. For anything that needs human expertise, Max routes it to our development team. You always have a responsive partner, 24/7.",
    },
    {
      question: "How long does it take to get started?",
      answer:
        "Most clients are up and running within days, not weeks. We handle all the technical setup, content migration, and configuration. You just provide the direction.",
    },
    {
      question: "What if I want to cancel?",
      answer:
        "No long-term contracts. Cancel anytime. Your data is always yours — we'll help you export everything if you ever decide to leave. We're confident you won't want to, but the door is never locked.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="sticky top-24">
              <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "faq", "p", 1) || undefined}>
                {getEditableText(sections, "faq", "p", "FAQ", 1)}
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6" data-field-id={getFieldId(sections, "faq", "h2", 0) || undefined}>
                {getEditableText(
                  sections,
                  "faq",
                  "h2",
                  "Common questions",
                  0
                )}
              </h2>
              <p className="text-lg text-foreground mb-8" data-field-id={getFieldId(sections, "faq", "p", 0) || undefined}>
                {getEditableText(
                  sections,
                  "faq",
                  "p",
                  "Can't find what you're looking for? We're always here to help.",
                  0
                )}
              </p>

              <div className="flex items-center gap-3 p-4 bg-sand rounded-xl">
                <div className="p-2 bg-gold/20 rounded-lg">
                  <MessageCircle className="h-5 w-5 text-gold-dark" />
                </div>
                <div>
                  <p className="font-medium text-foreground" data-field-id={getFieldId(sections, "faq", "p", 2) || undefined}>
                    {getEditableText(sections, "faq", "p", "Still have questions?", 2)}
                  </p>
                  <p className="text-sm text-foreground" data-field-id={getFieldId(sections, "faq", "p", 3) || undefined}>
                    {getEditableText(sections, "faq", "p", "Chat with us anytime", 3)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: FAQ list */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  className="w-full text-left"
                >
                  <div
                    className={cn(
                      "bg-card rounded-xl p-6 border transition-all duration-300",
                      openIndex === index
                        ? "border-gold/30 shadow-md"
                        : "border-border hover:border-gold/20"
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-lg font-semibold text-foreground" data-field-id={getFieldId(sections, "faq", "h3", index) || undefined}>
                        {getEditableText(sections, "faq", "h3", faq.question, index)}
                      </h3>
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 text-foreground transition-transform duration-300 flex-shrink-0",
                          openIndex === index && "rotate-180"
                        )}
                      />
                    </div>

                    <div
                      className={cn(
                        "overflow-hidden transition-all duration-300",
                        openIndex === index
                          ? "max-h-96 opacity-100 mt-4"
                          : "max-h-0 opacity-0"
                      )}
                    >
                      <p className="text-foreground leading-relaxed" data-field-id={getFieldId(sections, "faq", "p", index + 4) || undefined}>
                        {getEditableText(sections, "faq", "p", faq.answer, index + 4)}
                      </p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
