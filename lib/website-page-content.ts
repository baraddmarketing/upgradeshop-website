/**
 * Static content for the dedicated Website product page.
 * All copy is centralized here for easy editing.
 */

// ─── S2: The Problem ───────────────────────────────────────────────────────────

export interface ProblemCard {
  icon: string; // lucide-react icon name
  title: string;
  description: string;
}

export const problemCards: ProblemCard[] = [
  {
    icon: "MousePointerClick",
    title: "DIY Builders",
    description:
      "You spend weekends dragging boxes around Wix, and it still looks like a template.",
  },
  {
    icon: "Banknote",
    title: "Agencies",
    description:
      "$5,000+ upfront, 6 weeks, and you still can't change a comma without calling them.",
  },
  {
    icon: "Ban",
    title: "Doing Nothing",
    description:
      "Your outdated site is turning away customers before they even call.",
  },
];

// ─── S3: How It Works ──────────────────────────────────────────────────────────

export interface HowItWorksStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    icon: "MessageCircle",
    title: "Tell us about your business",
    description:
      "A conversation with Max, our partner. He learns your business, your audience, your voice.",
  },
  {
    number: "02",
    icon: "Hammer",
    title: "We build it",
    description:
      "Real developers write real code. Custom design, not a template. Ready in days, not months.",
  },
  {
    number: "03",
    icon: "Rocket",
    title: "You're live — and it keeps improving",
    description:
      "Max handles updates. We build new features. Your site grows with your business.",
  },
];

// ─── S4: Meet Max Conversation ─────────────────────────────────────────────────

export interface MaxConversation {
  label: string;
  userMessage: string;
  maxResponse: string;
}

export const maxConversations: MaxConversation[] = [
  {
    label: "Update info",
    userMessage: "Change my phone number on every page",
    maxResponse:
      "Done! I've updated your phone number across all 8 pages. The changes are live now. Anything else?",
  },
  {
    label: "Seasonal update",
    userMessage: "Add a holiday banner this weekend",
    maxResponse:
      "Holiday banner is live on your homepage and landing pages. I've set it to automatically come down Monday morning. Want me to adjust anything?",
  },
  {
    label: "Rewrite copy",
    userMessage: "Rewrite the About page to sound warmer",
    maxResponse:
      "I've rewritten your About page with a warmer, more personal tone. Take a look and let me know if you'd like any tweaks.",
  },
  {
    label: "Add feature",
    userMessage: "Add a photo gallery to the services page",
    maxResponse:
      "I've routed this to the dev team — they'll have a beautiful gallery section added to your services page within 48 hours. I'll let you know when it's live.",
  },
];

// ─── S5: What's Included ──────────────────────────────────────────────────────

export interface IncludedFeature {
  icon: string;
  title: string;
  description: string;
}

export const includedFeatures: IncludedFeature[] = [
  {
    icon: "Paintbrush",
    title: "Custom design & development",
    description: "Hand-built by developers — no drag-and-drop, no templates.",
  },
  {
    icon: "Smartphone",
    title: "Mobile-responsive on every device",
    description: "Looks and works perfectly on phones, tablets, and desktops.",
  },
  {
    icon: "Bot",
    title: "Max — your content partner",
    description:
      "Text changes, image swaps, new sections — just tell Max what you need.",
  },
  {
    icon: "Shield",
    title: "Hosting, SSL & security",
    description:
      "Enterprise-grade hosting, SSL certificates, and security monitoring handled for you.",
  },
  {
    icon: "Search",
    title: "SEO foundations",
    description:
      "Proper structure, fast loading speeds, and meta tags that help you get found.",
  },
  {
    icon: "Wrench",
    title: "Ongoing updates & maintenance",
    description:
      "Security patches, framework updates, and bug fixes — all included.",
  },
  {
    icon: "BarChart3",
    title: "Analytics integration",
    description:
      "Google Analytics, Search Console, and performance tracking set up from day one.",
  },
  {
    icon: "TicketCheck",
    title: "24/7 ticket system for dev requests",
    description:
      "Need something custom? Submit a ticket anytime and our developers will build it.",
  },
];

// ─── S8: Continuous Improvement ────────────────────────────────────────────────

export interface ImprovementExample {
  title: string;
  description: string;
}

export const improvementExamples: ImprovementExample[] = [
  {
    title: "Photo gallery with lightbox",
    description: "A therapist needed to showcase her clinic. We built a custom gallery with fullscreen viewing.",
  },
  {
    title: "WhatsApp booking button",
    description: "A salon wanted clients to book via WhatsApp. We added a floating action button with pre-filled messages.",
  },
  {
    title: "Multi-language support",
    description: "A yoga studio started attracting international clients. We added English alongside their Hebrew site.",
  },
];

// ─── S9: Who It's For ─────────────────────────────────────────────────────────

export interface AudienceCard {
  icon: string;
  title: string;
  description: string;
}

export const audienceCards: AudienceCard[] = [
  {
    icon: "Heart",
    title: "Therapists & wellness practitioners",
    description:
      "Need a professional presence that builds trust — without learning a website builder.",
  },
  {
    icon: "Wrench",
    title: "Local service businesses",
    description:
      "Plumbers, electricians, salons — need to be found online and make a great first impression.",
  },
  {
    icon: "GraduationCap",
    title: "Coaches & consultants",
    description:
      "Need credibility, lead generation, and a site that reflects their expertise.",
  },
  {
    icon: "Store",
    title: "Small retailers going online",
    description:
      "Need a web presence alongside their physical store — without the e-commerce complexity.",
  },
];

// ─── S10: FAQ ──────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export const websiteFAQs: FAQItem[] = [
  {
    question: "How is this different from Wix or Squarespace?",
    answer:
      "With Wix or Squarespace, you're doing the work — picking templates, editing layouts, learning the platform. With us, real developers build your site from scratch. You never touch an editor. The result looks custom because it is custom.",
  },
  {
    question: "What if I need a change urgently?",
    answer:
      "Tell Max. Content changes like text, images, and banners are handled in minutes. Design changes and new features are routed to our dev team and typically completed within 48 hours.",
  },
  {
    question: "Can I add e-commerce later?",
    answer:
      "Absolutely. Our addon ecosystem lets you add a Simple Store, Full E-commerce, Booking System, or any other feature whenever you're ready. Just subscribe to the addon and it's built into your site — no migration needed.",
  },
  {
    question: "What happens if I cancel?",
    answer:
      "Your site, your content. No contracts, cancel anytime. If you decide to leave, we help with the transition and make sure you have everything you need.",
  },
  {
    question: "How long until my site is live?",
    answer:
      "Days, not months. After your conversation with Max, our team gets to work immediately. Most sites are live within a week.",
  },
  {
    question: "Do I need any technical knowledge?",
    answer:
      "Zero. You just talk to Max — describe what you want in plain language. No logins, no dashboards, no editors. If you can send a text message, you can manage your website.",
  },
];
