"use client";

import { motion } from "framer-motion";
import { Quote, Star, Play } from "lucide-react";
import { Container } from "@/components/layout/container";
import { PageSection, getEditableText, getFieldId, getSection } from "@/lib/pages-api";

interface TestimonialsSectionProps {
  sections: PageSection[];
}

export function TestimonialsSection({ sections }: TestimonialsSectionProps) {
  const testimonialsSection = getSection(sections, "testimonials");
  const sectionId = testimonialsSection?.id;
  const sectionKey = testimonialsSection?.sectionKey;
  // Placeholder testimonials - will be replaced with real ones
  const testimonials = [
    {
      quote:
        "Finally, I can focus on my clients instead of fighting with technology. The Upgrade Shop handles everything.",
      author: "Coming Soon",
      role: "Therapist",
      avatar: null,
    },
    {
      quote:
        "I went from juggling 5 different tools to having everything in one place. Game changer.",
      author: "Coming Soon",
      role: "Consultant",
      avatar: null,
    },
    {
      quote:
        "The continuous improvement promise is real. I asked for a feature, and they built it within days.",
      author: "Coming Soon",
      role: "Small Business Owner",
      avatar: null,
    },
  ];

  const industries = [
    "Therapists",
    "Consultants",
    "Lawyers",
    "Coaches",
    "Healthcare",
    "Creative Services",
  ];

  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden" data-section-id={sectionId} data-section-key={sectionKey}>
      {/* Decorative quote marks */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote className="h-48 w-48 text-foreground" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 transform rotate-180">
        <Quote className="h-32 w-32 text-foreground" />
      </div>

      <Container className="relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-sm font-medium rounded-full mb-6" data-field-id={getFieldId(sections, "testimonials", "p", 1) || undefined}>
            {getEditableText(sections, "testimonials", "p", "Real Stories", 1)}
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6" data-field-id={getFieldId(sections, "testimonials", "h2", 0) || undefined}>
            {getEditableText(
              sections,
              "testimonials",
              "h2",
              "Trusted by professionals",
              0
            )}
          </h2>
          <p className="text-lg text-foreground" data-field-id={getFieldId(sections, "testimonials", "p", 0) || undefined}>
            {getEditableText(
              sections,
              "testimonials",
              "p",
              "Hear from business owners who made the switch.",
              0
            )}
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border hover:border-gold/20 hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-gold fill-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6 leading-relaxed italic" data-field-id={getFieldId(sections, "testimonials", "quote", index) || undefined}>
                "{getEditableText(sections, "testimonials", "quote", testimonial.quote, index)}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sand flex items-center justify-center">
                  <span className="text-foreground text-sm font-medium">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground" data-field-id={getFieldId(sections, "testimonials", "p", index + 2) || undefined}>
                    {getEditableText(sections, "testimonials", "p", testimonial.author, index + 2)}
                  </p>
                  <p className="text-sm text-foreground" data-field-id={getFieldId(sections, "testimonials", "p", index + 5) || undefined}>
                    {getEditableText(sections, "testimonials", "p", testimonial.role, index + 5)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video testimonial placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="relative bg-foreground rounded-2xl aspect-video flex items-center justify-center overflow-hidden group cursor-pointer">
            {/* Play button */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
            <div className="relative z-10 p-6 bg-gold rounded-full group-hover:scale-110 transition-transform duration-300">
              <Play className="h-8 w-8 text-foreground fill-foreground" />
            </div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/60 text-sm" data-field-id={getFieldId(sections, "testimonials", "p", 8) || undefined}>
              {getEditableText(sections, "testimonials", "p", "Video testimonials coming soon", 8)}
            </p>
          </div>
        </motion.div>

        {/* Industry indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <p className="text-foreground mb-4" data-field-id={getFieldId(sections, "testimonials", "p", 9) || undefined}>
            {getEditableText(sections, "testimonials", "p", "Trusted by professionals in", 9)}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-sand rounded-full text-sm text-foreground"
                data-field-id={getFieldId(sections, "testimonials", "ul", index) || undefined}
              >
                {getEditableText(sections, "testimonials", "ul", industry, index)}
              </span>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
