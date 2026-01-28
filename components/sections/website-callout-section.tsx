"use client";

import { motion } from "framer-motion";
import { Code, MessageSquare, Sparkles, X, Check } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface WebsiteCalloutSectionProps {
  sections: PageSection[];
}

export function WebsiteCalloutSection({ sections }: WebsiteCalloutSectionProps) {
  const websitesCalloutSection = getSection(sections, "websites-callout");
  const sectionId = websitesCalloutSection?.id;
  const sectionKey = websitesCalloutSection?.sectionKey;

  const ourApproach = [
    {
      icon: Code,
      text: "Real developers create it professionally",
    },
    {
      icon: MessageSquare,
      text: "Max helps you manage updates through conversation",
    },
    {
      icon: Sparkles,
      text: "Request industry-specific features — we build them free",
    },
  ];

  const thingsYouNeverDo = [
    "Touch a website editor",
    "Watch tutorial videos",
    "Become a part-time web designer",
    "Debug why something broke",
  ];

  return (
    <section className="py-24 md:py-32 bg-foreground text-primary-foreground relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Gold accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full">
              <Sparkles className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-gold" data-field-id={getFieldId(sections, "websites-callout", "p", 2) || undefined}>
                {getEditableText(sections, "websites-callout", "p", "Key Differentiator", 2)}
              </span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight" data-field-id={getFieldId(sections, "websites-callout", "h2", 0) || undefined}>
              {getEditableText(
                sections,
                "websites-callout",
                "h2",
                "Your website?",
                0
              )}{" "}
              <span className="text-gold" data-field-id={getFieldId(sections, "websites-callout", "h2", 1) || undefined}>
                {getEditableText(
                  sections,
                  "websites-callout",
                  "h2",
                  "We build it for you.",
                  1
                )}
              </span>
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto" data-field-id={getFieldId(sections, "websites-callout", "p", 0) || undefined}>
              {getEditableText(
                sections,
                "websites-callout",
                "p",
                "Unlike Wix, WordPress, or Shopify where you either DIY it yourself or hire expensive freelancers for $5k-$50k — we handle everything.",
                0
              )}
            </p>
          </motion.div>

          {/* Two columns */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Our approach */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-gold mb-6" data-field-id={getFieldId(sections, "websites-callout", "h3", 0) || undefined}>
                {getEditableText(sections, "websites-callout", "h3", "What we do", 0)}
              </h3>
              <ul className="space-y-4">
                {ourApproach.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 bg-gold/20 rounded-lg">
                      <item.icon className="h-4 w-4 text-gold" />
                    </div>
                    <span className="text-primary-foreground/90" data-field-id={getFieldId(sections, "websites-callout", "ul", index) || undefined}>
                      {getEditableText(sections, "websites-callout", "ul", item.text, index)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* What you never do */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-primary-foreground/60 mb-6" data-field-id={getFieldId(sections, "websites-callout", "h3", 1) || undefined}>
                {getEditableText(sections, "websites-callout", "h3", "What you never do", 1)}
              </h3>
              <ul className="space-y-4">
                {thingsYouNeverDo.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="p-1.5 bg-white/10 rounded-full">
                      <X className="h-3 w-3 text-primary-foreground/40" />
                    </div>
                    <span className="text-primary-foreground/60 line-through decoration-primary-foreground/20" data-field-id={getFieldId(sections, "websites-callout", "ul", index + 3) || undefined}>
                      {getEditableText(sections, "websites-callout", "ul", item, index + 3)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 border border-gold/20 rounded-full">
              <Check className="h-5 w-5 text-gold" />
              <span className="text-primary-foreground/90" data-field-id={getFieldId(sections, "websites-callout", "p", 1) || undefined}>
                {getEditableText(
                  sections,
                  "websites-callout",
                  "p",
                  "Your website isn't a project you manage. It's one part of your infrastructure that just works.",
                  1
                )}
              </span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
