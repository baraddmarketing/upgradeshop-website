"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Check } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import {
  PageSection,
  getEditableText,
  getEditableButton,
  getFieldId,
  getSection,
} from "@/lib/pages-api";

interface FinalCTASectionProps {
  sections: PageSection[];
}

export function FinalCTASection({ sections }: FinalCTASectionProps) {
  const finalCtaSection = getSection(sections, "final-cta");
  const sectionId = finalCtaSection?.id;
  const sectionKey = finalCtaSection?.sectionKey;
  const primaryCta = getEditableButton(
    sections,
    "final-cta",
    "Get Started Now",
    "/pricing",
    0
  );

  const trustIndicators = [
    "No long-term contracts",
    "Cancel anytime",
    "Your data is always yours",
  ];

  return (
    <section className="py-24 md:py-32 bg-foreground text-primary-foreground relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Gold accent stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight" data-field-id={getFieldId(sections, "final-cta", "h2", 0) || undefined}>
              {getEditableText(
                sections,
                "final-cta",
                "h2",
                "Ready to focus on what matters?",
                0
              )}
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto" data-field-id={getFieldId(sections, "final-cta", "p", 0) || undefined}>
              {getEditableText(
                sections,
                "final-cta",
                "p",
                "Your digital infrastructure shouldn't be a project you manage. Let us handle it so you can focus on your craft.",
                0
              )}
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10"
          >
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-dark text-foreground font-medium px-8 py-6 text-base rounded-xl shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40 transition-all duration-300"
              data-field-id={getFieldId(sections, "final-cta", "button", 0) || undefined}
            >
              <Link href={primaryCta.url}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm" data-field-id={getFieldId(sections, "final-cta", "p", 1) || undefined}>
                {getEditableText(sections, "final-cta", "p", "or chat with us now", 1)}
              </span>
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-6"
          >
            {trustIndicators.map((indicator, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-gold" />
                <span className="text-sm text-primary-foreground/70" data-field-id={getFieldId(sections, "final-cta", "ul", index) || undefined}>
                  {getEditableText(sections, "final-cta", "ul", indicator, index)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
