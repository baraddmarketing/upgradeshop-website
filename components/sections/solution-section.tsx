"use client";

import { motion } from "framer-motion";
import { Check, Users, Zap, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface SolutionSectionProps {
  sections: PageSection[];
}

export function SolutionSection({ sections }: SolutionSectionProps) {
  const solutionSection = getSection(sections, "solution");
  const sectionId = solutionSection?.id;
  const sectionKey = solutionSection?.sectionKey;

  const benefits = [
    {
      icon: Users,
      title: "We build it for you",
      description: "Real developers create your infrastructure professionally. No DIY, no templates.",
    },
    {
      icon: Zap,
      title: "We manage it for you",
      description: "Max, our AI, handles day-to-day. Our team ensures quality. You just describe what you need.",
    },
    {
      icon: TrendingUp,
      title: "We keep improving it",
      description: "Request features and we build them. Free. Your infrastructure grows with your business.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Decorative gold accent */}
      <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Message */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "solution", "p", 1) || undefined}>
              {getEditableText(sections, "solution", "p", "The Third Option", 1)}
            </div>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 leading-tight" data-field-id={getFieldId(sections, "solution", "h2", 0) || undefined}>
              {getEditableText(
                sections,
                "solution",
                "h2",
                "Not a tool. Not a platform.",
                0
              )}
              <br />
              <span className="text-gold" data-field-id={getFieldId(sections, "solution", "h2", 1) || undefined}>
                {getEditableText(sections, "solution", "h2", "A partner.", 1)}
              </span>
            </h2>

            <p className="text-lg text-foreground mb-8 leading-relaxed" data-field-id={getFieldId(sections, "solution", "p", 0) || undefined}>
              {getEditableText(
                sections,
                "solution",
                "p",
                "The Upgrade Shop is your dedicated digital infrastructure partner. We handle everything — professionally — so you can focus on what you do best.",
                0
              )}
            </p>

            {/* Quick value props */}
            <div className="space-y-3">
              {[
                "One unified system instead of 7+ platforms",
                "Professional quality without the agency price tag",
                "Always-on support via Max, our AI partner",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="p-1 bg-gold/20 rounded-full">
                    <Check className="h-4 w-4 text-gold-dark" />
                  </div>
                  <span className="text-foreground" data-field-id={getFieldId(sections, "solution", "ul", index) || undefined}>
                    {getEditableText(sections, "solution", "ul", item, index)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Benefits cards */}
          <div className="space-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card rounded-2xl p-6 border border-border hover:border-gold/30 hover:shadow-lg hover:shadow-gold/5 transition-all duration-300"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 self-start p-3 bg-gold/10 rounded-xl group-hover:bg-gold/20 transition-colors">
                    <benefit.icon className="h-6 w-6 text-gold-dark" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2" data-field-id={getFieldId(sections, "solution", "h3", index) || undefined}>
                      {getEditableText(sections, "solution", "h3", benefit.title, index)}
                    </h3>
                    <p className="text-foreground leading-relaxed" data-field-id={getFieldId(sections, "solution", "p", index + 2) || undefined}>
                      {getEditableText(sections, "solution", "p", benefit.description, index + 2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <blockquote className="font-display text-2xl md:text-3xl text-foreground italic max-w-3xl mx-auto" data-field-id={getFieldId(sections, "solution", "quote", 0) || undefined}>
            {getEditableText(
              sections,
              "solution",
              "quote",
              '"You focus on what you do best. We handle everything else."',
              0
            )}
          </blockquote>
        </motion.div>
      </Container>
    </section>
  );
}
