"use client";

import { motion } from "framer-motion";
import { Clock, DollarSign, Puzzle, Wrench } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface ProblemSectionProps {
  sections: PageSection[];
}

export function ProblemSection({ sections }: ProblemSectionProps) {
  const problemSection = getSection(sections, "problem");
  const sectionId = problemSection?.id;
  const sectionKey = problemSection?.sectionKey;

  const diyProblems = [
    {
      icon: Wrench,
      text: "Hours spent tinkering instead of running your business",
    },
    { icon: Clock, text: "Watching YouTube tutorials at midnight" },
    { icon: Puzzle, text: "Limited capabilities that break when you need them" },
  ];

  const enterpriseProblems = [
    { icon: DollarSign, text: "$5k-$50k for agencies + monthly subscriptions" },
    { icon: Puzzle, text: "Juggling 7+ different platforms and logins" },
    { icon: Wrench, text: "Integrations that constantly break" },
  ];

  return (
    <section className="py-24 md:py-32 bg-sand/50 relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-noise opacity-50" />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6" data-field-id={getFieldId(sections, "problem", "h2", 0) || undefined}>
            {getEditableText(
              sections,
              "problem",
              "h2",
              "You're told you have two choices",
              0
            )}
          </h2>
          <p className="text-lg text-foreground" data-field-id={getFieldId(sections, "problem", "p", 0) || undefined}>
            {getEditableText(
              sections,
              "problem",
              "p",
              "Neither of them work for business owners who value their time.",
              0
            )}
          </p>
        </motion.div>

        {/* Two options comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* DIY Option */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="inline-block px-3 py-1 bg-muted text-foreground text-sm font-medium rounded-full mb-4">
              Option 1
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2" data-field-id={getFieldId(sections, "problem", "h3", 0) || undefined}>
              {getEditableText(
                sections,
                "problem",
                "h3",
                "DIY Platforms",
                0
              )}
            </h3>
            <p className="text-foreground mb-6" data-field-id={getFieldId(sections, "problem", "p", 1) || undefined}>
              {getEditableText(
                sections,
                "problem",
                "p",
                "Wix, Shopify, WordPress, HubSpot free tier...",
                1
              )}
            </p>

            <ul className="space-y-4">
              {diyProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-destructive/10 rounded-lg">
                    <problem.icon className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="text-foreground" data-field-id={getFieldId(sections, "problem", "ul", index) || undefined}>
                    {getEditableText(sections, "problem", "ul", problem.text, index)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-foreground italic" data-field-id={getFieldId(sections, "problem", "quote", 0) || undefined}>
                {getEditableText(
                  sections,
                  "problem",
                  "quote",
                  '"Cheap upfront, but you become your own tech department."',
                  0
                )}
              </p>
            </div>
          </motion.div>

          {/* Enterprise Option */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border border-border shadow-sm"
          >
            <div className="inline-block px-3 py-1 bg-muted text-foreground text-sm font-medium rounded-full mb-4">
              Option 2
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-2" data-field-id={getFieldId(sections, "problem", "h3", 1) || undefined}>
              {getEditableText(
                sections,
                "problem",
                "h3",
                "Enterprise Solutions",
                1
              )}
            </h3>
            <p className="text-foreground mb-6" data-field-id={getFieldId(sections, "problem", "p", 3) || undefined}>
              {getEditableText(
                sections,
                "problem",
                "p",
                "Agencies, Salesforce, multiple specialists...",
                3
              )}
            </p>

            <ul className="space-y-4">
              {enterpriseProblems.map((problem, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-destructive/10 rounded-lg">
                    <problem.icon className="h-4 w-4 text-destructive" />
                  </div>
                  <span className="text-foreground" data-field-id={getFieldId(sections, "problem", "ul", index + 3) || undefined}>
                    {getEditableText(sections, "problem", "ul", problem.text, index + 3)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-foreground italic" data-field-id={getFieldId(sections, "problem", "quote", 1) || undefined}>
                {getEditableText(
                  sections,
                  "problem",
                  "quote",
                  '"Expensive, complex, and you still have to manage it all."',
                  1
                )}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Key insight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="font-display text-xl md:text-2xl text-foreground max-w-2xl mx-auto" data-field-id={getFieldId(sections, "problem", "p", 1) || undefined}>
            {getEditableText(
              sections,
              "problem",
              "p",
              "Both options rob you of the one thing you can't get back:",
              1
            )}{" "}
            <span className="text-gold font-semibold" data-field-id={getFieldId(sections, "problem", "p", 2) || undefined}>
              {getEditableText(sections, "problem", "p", "your time.", 2)}
            </span>
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
