"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Hammer, Coffee } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface HowItWorksSectionProps {
  sections: PageSection[];
}

export function HowItWorksSection({ sections }: HowItWorksSectionProps) {
  const howItWorksSection = getSection(sections, "how-it-works");
  const sectionId = howItWorksSection?.id;
  const sectionKey = howItWorksSection?.sectionKey;
  const steps = [
    {
      number: "01",
      icon: MousePointerClick,
      title: "Choose what you need",
      description:
        "Start with one module or get everything. Pick what makes sense for your business right now.",
    },
    {
      number: "02",
      icon: Hammer,
      title: "We set it up",
      description:
        "Real developers build your infrastructure professionally. No DIY, no templates, no guesswork.",
    },
    {
      number: "03",
      icon: Coffee,
      title: "You run your business",
      description:
        "Max and our team handle the rest. Updates, changes, improvements — just describe what you need.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 md:py-32 bg-background relative overflow-hidden"
      data-section-id={sectionId} data-section-key={sectionKey}
    >
      {/* Decorative line connecting steps */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-0.5 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "how-it-works", "p", 1) || undefined}>
            {getEditableText(sections, "how-it-works", "p", "Simple Process", 1)}
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6" data-field-id={getFieldId(sections, "how-it-works", "h2", 0) || undefined}>
            {getEditableText(
              sections,
              "how-it-works",
              "h2",
              "How it works",
              0
            )}
          </h2>
          <p className="text-lg text-foreground" data-field-id={getFieldId(sections, "how-it-works", "p", 0) || undefined}>
            {getEditableText(
              sections,
              "how-it-works",
              "p",
              "Getting started is simple. Getting results is even simpler.",
              0
            )}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Step card */}
              <div className="bg-card rounded-2xl p-8 border border-border hover:border-gold/30 hover:shadow-lg transition-all duration-300 h-full">
                {/* Step number */}
                <div className="absolute -top-4 left-8">
                  <span className="inline-block px-3 py-1 bg-gold text-foreground text-sm font-bold rounded-full" data-field-id={getFieldId(sections, "how-it-works", "p", index + 2) || undefined}>
                    {getEditableText(sections, "how-it-works", "p", step.number, index + 2)}
                  </span>
                </div>

                {/* Icon */}
                <div className="p-4 bg-sand rounded-xl w-fit mb-6 mt-2">
                  <step.icon className="h-8 w-8 text-gold-dark" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-foreground mb-3" data-field-id={getFieldId(sections, "how-it-works", "h3", index) || undefined}>
                  {getEditableText(sections, "how-it-works", "h3", step.title, index)}
                </h3>
                <p className="text-foreground leading-relaxed" data-field-id={getFieldId(sections, "how-it-works", "p", index + 5) || undefined}>
                  {getEditableText(sections, "how-it-works", "p", step.description, index + 5)}
                </p>
              </div>

              {/* Arrow connector (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 transform -translate-y-1/2">
                  <svg
                    className="w-8 h-8 text-gold/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
