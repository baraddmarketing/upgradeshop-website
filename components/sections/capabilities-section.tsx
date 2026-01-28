"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Users,
  Mail,
  MessageCircle,
  Facebook,
  FolderKanban,
  BarChart3,
  Zap,
  Badge,
} from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface CapabilitiesSectionProps {
  sections: PageSection[];
}

export function CapabilitiesSection({ sections }: CapabilitiesSectionProps) {
  const capabilitiesSection = getSection(sections, "capabilities");
  const sectionId = capabilitiesSection?.id;
  const sectionKey = capabilitiesSection?.sectionKey;

  const capabilities = [
    {
      icon: Globe,
      title: "Website & Landing Pages",
      description:
        "Professional websites built by developers, not DIY templates. Managed updates through conversation.",
      highlight: true,
      badge: "Built for you",
    },
    {
      icon: Users,
      title: "CRM & Customer Management",
      description:
        "Track leads, manage relationships, and close deals. All your customer data in one place.",
      highlight: false,
    },
    {
      icon: Mail,
      title: "Email Marketing",
      description:
        "Automated campaigns that convert. Beautiful templates, smart segmentation, easy management.",
      highlight: false,
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Integration",
      description:
        "Meet customers where they are. Business messaging that feels personal, scales professionally.",
      highlight: false,
    },
    {
      icon: Facebook,
      title: "Facebook & Instagram",
      description:
        "Social presence managed. Content scheduling, engagement tracking, ad integration.",
      highlight: false,
    },
    {
      icon: FolderKanban,
      title: "Project Management",
      description:
        "Keep your work organized. Tasks, timelines, and collaboration — all connected.",
      highlight: false,
    },
    {
      icon: BarChart3,
      title: "SEO & Analytics",
      description:
        "Know what's working. Search visibility, traffic insights, performance tracking.",
      highlight: false,
    },
    {
      icon: Zap,
      title: "Automations & Integrations",
      description:
        "Connect everything. Automate the repetitive. Focus on what matters.",
      highlight: false,
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sand-dark/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "capabilities", "p", 2) || undefined}>
            {getEditableText(sections, "capabilities", "p", "One Unified System", 2)}
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6" data-field-id={getFieldId(sections, "capabilities", "h2", 0) || undefined}>
            {getEditableText(
              sections,
              "capabilities",
              "h2",
              "Everything you need.",
              0
            )}{" "}
            <span className="text-gold" data-field-id={getFieldId(sections, "capabilities", "h2", 1) || undefined}>
              {getEditableText(sections, "capabilities", "h2", "Connected.", 1)}
            </span>
          </h2>
          <p className="text-lg text-foreground" data-field-id={getFieldId(sections, "capabilities", "p", 0) || undefined}>
            {getEditableText(
              sections,
              "capabilities",
              "p",
              "Stop juggling 7+ different platforms. One system, one login, one partner handling it all.",
              0
            )}
          </p>
        </motion.div>

        {/* Capabilities grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`group relative bg-card rounded-2xl p-6 border transition-all duration-300 ${
                capability.highlight
                  ? "border-gold/30 shadow-lg shadow-gold/10 hover:shadow-xl hover:shadow-gold/15"
                  : "border-border hover:border-gold/20 hover:shadow-lg hover:shadow-gold/5"
              }`}
            >
              {/* Badge for highlighted items */}
              {capability.badge && (
                <div className="absolute -top-3 left-6 inline-flex items-center gap-1 px-3 py-1 bg-gold text-foreground text-xs font-semibold rounded-full">
                  <Badge className="h-3 w-3" />
                  <span data-field-id={getFieldId(sections, "capabilities", "p", 3) || undefined}>
                    {getEditableText(sections, "capabilities", "p", capability.badge, 3)}
                  </span>
                </div>
              )}

              <div
                className={`p-3 rounded-xl w-fit mb-4 transition-colors ${
                  capability.highlight
                    ? "bg-gold/20 group-hover:bg-gold/30"
                    : "bg-muted group-hover:bg-gold/10"
                }`}
              >
                <capability.icon
                  className={`h-6 w-6 ${
                    capability.highlight ? "text-gold-dark" : "text-foreground"
                  }`}
                />
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground mb-2" data-field-id={getFieldId(sections, "capabilities", "h3", index) || undefined}>
                {getEditableText(sections, "capabilities", "h3", capability.title, index)}
              </h3>

              <p className="text-sm text-foreground leading-relaxed" data-field-id={getFieldId(sections, "capabilities", "p", index + 4) || undefined}>
                {getEditableText(sections, "capabilities", "p", capability.description, index + 4)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground" data-field-id={getFieldId(sections, "capabilities", "p", 1) || undefined}>
            {getEditableText(
              sections,
              "capabilities",
              "p",
              "Start with what you need. Add more as you grow. Everything works together seamlessly.",
              1
            )}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
