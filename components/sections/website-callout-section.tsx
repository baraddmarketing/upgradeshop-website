"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight, Star, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { PageSection, getSection } from "@/lib/pages-api";

interface WebsiteCalloutSectionProps {
  sections: PageSection[];
}

export function WebsiteCalloutSection({ sections }: WebsiteCalloutSectionProps) {
  const websitesCalloutSection = getSection(sections, "websites-callout");
  const sectionId = websitesCalloutSection?.id;
  const sectionKey = websitesCalloutSection?.sectionKey;

  const tiers = [
    {
      name: "Starter",
      pages: "Up to 3 pages",
      price: 170,
      setup: 170,
    },
    {
      name: "Professional",
      pages: "Up to 10 pages",
      price: 260,
      setup: 260,
      popular: true,
    },
    {
      name: "Business",
      pages: "Up to 20 pages",
      price: 350,
      setup: 350,
    },
  ];

  const included = [
    "Built by real developers — not templates",
    "Your AI agent handles daily updates",
    "Responsive & mobile-optimized",
    "SSL certificate included",
    "24/7 dev team access via ticket system",
    "Unlimited revision requests",
  ];

  const addons = [
    { name: "Full E-commerce", price: "$50/mo" },
    { name: "Booking System", price: "$25/mo" },
    { name: "Simple Store", price: "$25/mo" },
    { name: "Blog", price: "$8/mo" },
    { name: "Events System", price: "$20/mo" },
    { name: "Digital Courses", price: "$30/mo" },
    { name: "Community / Forum", price: "$30/mo" },
  ];

  const neverDo = [
    "Touch a website editor",
    "Watch tutorial videos",
    "Hire a freelancer for every change",
    "Debug why something broke",
  ];

  return (
    <section
      className="py-24 md:py-32 bg-foreground text-primary-foreground relative overflow-hidden"
      data-section-id={sectionId}
      data-section-key={sectionKey}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold via-gold-light to-gold" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gold/8 rounded-full blur-3xl translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 rounded-full mb-6">
            <Star className="h-4 w-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-gold">Flagship Product</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
            Your website, built by{" "}
            <span className="text-gold">real developers.</span>
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            We build your professional website from scratch. Your AI agent
            manages daily changes. You never touch an editor — ever.
          </p>
        </motion.div>

        {/* Pricing tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-3 gap-4 mb-6 max-w-3xl mx-auto"
        >
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-6 border text-center ${
                tier.popular
                  ? "bg-gold/20 border-gold/50"
                  : "bg-white/5 border-white/10"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gold text-foreground text-xs font-bold rounded-full whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <p className="text-sm text-primary-foreground/50 mb-2">{tier.name}</p>
              <p className="font-display text-3xl font-bold text-primary-foreground">
                ${tier.price}
                <span className="text-base font-normal text-primary-foreground/50">/mo</span>
              </p>
              <p className="text-xs text-primary-foreground/40 mb-3">
                ${tier.setup} one-time setup
              </p>
              <p className="text-sm text-gold font-medium">{tier.pages}</p>
            </div>
          ))}
        </motion.div>

        {/* Extra pages note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-center mb-14 text-sm text-primary-foreground/50"
        >
          Need more pages?{" "}
          <span className="text-primary-foreground/70">
            Human-designed: <strong className="text-primary-foreground">$80/page</strong>
          </span>{" "}
          ·{" "}
          <span className="text-primary-foreground/70">
            AI-generated: <strong className="text-primary-foreground">$9/page</strong>
          </span>
        </motion.div>

        {/* Three-column grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* What's included */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-7 border border-white/10"
          >
            <h3 className="text-base font-semibold text-gold mb-5">
              Included in every tier
            </h3>
            <ul className="space-y-3">
              {included.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="h-4 w-4 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-primary-foreground/80">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Website add-ons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="bg-white/5 rounded-2xl p-7 border border-white/10"
          >
            <h3 className="text-base font-semibold text-primary-foreground/70 mb-5">
              Website add-ons
            </h3>
            <div className="space-y-3">
              {addons.map((addon, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-white/5 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-primary-foreground/70">
                    {addon.name}
                  </span>
                  <span className="text-sm font-medium text-gold">{addon.price}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-primary-foreground/30 mt-4">
              All add-ons managed by your AI agent.
            </p>
          </motion.div>

          {/* What you never do */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-2xl p-7 border border-white/10"
          >
            <h3 className="text-base font-semibold text-primary-foreground/40 mb-5">
              What you never do
            </h3>
            <ul className="space-y-3 mb-6">
              {neverDo.map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="p-1 bg-white/10 rounded-full flex-shrink-0">
                    <X className="h-3 w-3 text-primary-foreground/30" />
                  </div>
                  <span className="text-sm text-primary-foreground/40 line-through decoration-primary-foreground/20">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <div className="bg-gold/10 border border-gold/20 rounded-xl p-3">
              <p className="text-xs text-primary-foreground/70 leading-relaxed">
                Your website isn&apos;t a project you manage. It&apos;s one part of your
                infrastructure that just works.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Agency comparison + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-sm text-primary-foreground/50 mb-2">
              Compare to the alternative:
            </p>
            <p className="text-primary-foreground/70 mb-2">
              Agencies charge{" "}
              <span className="line-through text-primary-foreground/40">
                $5k–$50k setup
              </span>{" "}
              then{" "}
              <span className="line-through text-primary-foreground/40">
                $200–$500/mo
              </span>{" "}
              for maintenance.
            </p>
            <p className="text-gold font-semibold">
              We include setup, maintenance, and AI management — from $170/mo.
            </p>
          </div>

          <Button
            asChild
            className="bg-gold hover:bg-gold-dark text-foreground font-medium"
          >
            <Link href="/pricing#website">
              See Full Website Pricing <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
