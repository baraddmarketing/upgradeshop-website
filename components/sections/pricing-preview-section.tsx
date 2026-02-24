"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { PageSection, getSection } from "@/lib/pages-api";

interface PricingPreviewSectionProps {
  sections: PageSection[];
}

export function PricingPreviewSection({ sections }: PricingPreviewSectionProps) {
  const pricingPreviewSection = getSection(sections, "pricing-preview");
  const sectionId = pricingPreviewSection?.id;
  const sectionKey = pricingPreviewSection?.sectionKey;

  const modules = [
    {
      name: "Website",
      price: "from $170",
      period: "/mo",
      note: "Starter — 3 pages, setup included",
      highlight: true,
    },
    {
      name: "Landing Page",
      price: "$89",
      period: "/mo",
      note: "Single conversion page",
    },
    {
      name: "CRM",
      price: "$19",
      period: "/mo",
      note: "Pipeline + up to 5 users",
    },
    {
      name: "Email Marketing",
      price: "$16",
      period: "/mo",
      note: "5,000 sends/month",
    },
    {
      name: "WhatsApp",
      price: "$30",
      period: "/mo",
      note: "Business API + automation",
    },
    {
      name: "Facebook & Instagram",
      price: "$30",
      period: "/mo",
      note: "DMs, comments, lead capture",
    },
    {
      name: "Project Management",
      price: "$25",
      period: "/mo",
      note: "Tasks + up to 5 users",
    },
    {
      name: "SEO Management",
      price: "Soon",
      period: "",
      note: "Automated optimization",
    },
  ];

  return (
    <section
      className="py-24 md:py-32 bg-sand/50 relative overflow-hidden"
      data-section-id={sectionId}
      data-section-key={sectionKey}
    >
      <div className="absolute inset-0 bg-noise opacity-30" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6">
            Transparent Pricing
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Pay only for what you need.
            <br />
            <span className="text-gold">Everything works together.</span>
          </h2>
          <p className="text-lg text-foreground">
            Each module stands alone or integrates with the others. Start small.
            Add more as your business grows. No long-term contracts.
          </p>
        </motion.div>

        {/* AI Agent callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-8"
        >
          <div className="bg-foreground text-primary-foreground rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-gold/20 flex items-center justify-center">
              <Bot className="h-5 w-5 text-gold" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-gold text-xs font-bold uppercase tracking-wider">
                Included free with every subscription
              </span>
              <p className="font-semibold text-primary-foreground mt-0.5">
                Your own personal AI agent — named by you, from day one.
              </p>
              <p className="text-sm text-primary-foreground/55 mt-0.5">
                200 credits/month included. Manages your platform internally.
                Extend it to serve your customers when you&apos;re ready.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Module grid */}
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-xl p-5 border transition-all duration-300 ${
                mod.highlight
                  ? "bg-card border-gold/30 shadow-sm shadow-gold/10"
                  : "bg-card border-border hover:border-gold/20"
              }`}
            >
              {mod.highlight && (
                <span className="text-xs font-semibold text-gold-dark uppercase tracking-wide">
                  Flagship
                </span>
              )}
              <p className={`font-semibold text-foreground ${mod.highlight ? "mt-1" : ""}`}>
                {mod.name}
              </p>
              <p className="font-display text-2xl font-bold text-foreground mt-1">
                {mod.price}
                <span className="text-sm font-normal text-foreground/50">
                  {mod.period}
                </span>
              </p>
              <p className="text-xs text-foreground/45 mt-1">{mod.note}</p>
            </motion.div>
          ))}
        </div>

        {/* Free tier note + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-foreground/50 text-sm mb-5">
            Free CRM and basic email included with every subscription. Website
            add-ons (e-commerce, booking, blog) available separately.
          </p>
          <Button
            asChild
            className="bg-gold hover:bg-gold-dark text-foreground font-medium"
          >
            <Link href="/pricing">
              View Full Pricing & Add-Ons{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
