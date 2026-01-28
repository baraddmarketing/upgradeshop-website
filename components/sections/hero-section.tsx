"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
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

interface HeroSectionProps {
  sections: PageSection[];
}

export function HeroSection({ sections }: HeroSectionProps) {
  const primaryCta = getEditableButton(
    sections,
    "hero",
    "Get Started Now",
    "/pricing",
    0
  );
  const secondaryCta = getEditableButton(
    sections,
    "hero",
    "See How It Works",
    "#how-it-works",
    1
  );

  // Get section ID for data attribute
  const heroSection = getSection(sections, "hero");
  const sectionId = heroSection?.id;
  const sectionKey = heroSection?.sectionKey;

  return (
    <section
      className="relative min-h-[90vh] flex items-center bg-background overflow-hidden"
      data-section-id={sectionId}
      data-section-key={sectionKey}
    >
      {/* Subtle warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sand/50 via-background to-background" />

      {/* Decorative gold accent - subtle top-right glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />

      {/* Decorative bottom-left shape */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-dark/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <Container className="relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Eyebrow text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm md:text-base font-medium text-gold-dark tracking-wide uppercase mb-6"
            data-field-id={getFieldId(sections, "hero", "p", 0) || undefined}
          >
            {getEditableText(
              sections,
              "hero",
              "p",
              "Digital Infrastructure for Small Businesses",
              0
            )}
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight mb-6"
          >
            <span data-field-id={getFieldId(sections, "hero", "h1", 0) || undefined}>
              {getEditableText(
                sections,
                "hero",
                "h1",
                "Your digital foundation.",
                0
              )}
            </span>
            <br />
            <span className="text-gold" data-field-id={getFieldId(sections, "hero", "h2", 0) || undefined}>
              {getEditableText(sections, "hero", "h2", "Handled.", 0)}
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            data-field-id={getFieldId(sections, "hero", "p", 1) || undefined}
          >
            {getEditableText(
              sections,
              "hero",
              "p",
              "Professional digital infrastructure for your business — built by developers, managed for you, growing with you. Focus on what you do best. We handle the rest.",
              1
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold-dark text-foreground font-medium px-8 py-6 text-base rounded-xl shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
            >
              <Link href={primaryCta.url}>
                {primaryCta.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-border hover:border-foreground/30 px-8 py-6 text-base rounded-xl transition-all duration-300"
            >
              <Link href={secondaryCta.url}>{secondaryCta.text}</Link>
            </Button>
          </motion.div>

          {/* Trust indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-2 text-sm text-foreground"
          >
            <MessageCircle className="h-4 w-4" />
            <span data-field-id={getFieldId(sections, "hero", "p", 2) || undefined}>
              {getEditableText(sections, "hero", "p", "Questions? Chat with us anytime.", 2)}
            </span>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-3 bg-foreground/40 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
