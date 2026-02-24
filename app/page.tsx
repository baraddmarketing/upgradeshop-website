import { fetchPageSections } from "@/lib/pages-api";
import { HeroSection } from "@/components/sections/hero-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { SolutionSection } from "@/components/sections/solution-section";
import { WebsiteCalloutSection } from "@/components/sections/website-callout-section";
import { EcommerceSection } from "@/components/sections/ecommerce-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { ImprovementSection } from "@/components/sections/improvement-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PricingPreviewSection } from "@/components/sections/pricing-preview-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ExamplesSection } from "@/components/sections/examples-section";
import { FAQSection } from "@/components/sections/faq-section";
import { FinalCTASection } from "@/components/sections/final-cta-section";

// ISR: Revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // Fetch page sections from CMS with fallback
  const data = await fetchPageSections("home");
  const sections = data?.sections || [];

  return (
    <main>
      {/* Hero - Immediate emotional connection + core promise */}
      <HeroSection sections={sections} />

      {/* Problem - Build empathy, acknowledge their pain */}
      <ProblemSection sections={sections} />

      {/* Solution - Introduce The Upgrade Shop as the third option */}
      <SolutionSection sections={sections} />

      {/* Website Callout - Full website product showcase with tiers & add-ons */}
      <WebsiteCalloutSection sections={sections} />

      {/* E-commerce - Stack consolidation ROI story */}
      <EcommerceSection />

      {/* Capabilities - Show the full ecosystem */}
      <CapabilitiesSection sections={sections} />

      {/* Continuous Improvement - Differentiate from static software */}
      <ImprovementSection sections={sections} />

      {/* How It Works - Reduce friction, show simplicity */}
      <HowItWorksSection sections={sections} />

      {/* Pricing Preview - Transparency + conversion */}
      <PricingPreviewSection sections={sections} />

      {/* Testimonials - Build trust (placeholder for now) */}
      <TestimonialsSection sections={sections} />

      {/* Examples - Show real results (placeholder for now) */}
      <ExamplesSection sections={sections} />

      {/* FAQ - Address objections */}
      <FAQSection sections={sections} />

      {/* Final CTA - Convert */}
      <FinalCTASection sections={sections} />
    </main>
  );
}
