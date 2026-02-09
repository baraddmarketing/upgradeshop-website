/**
 * Static content for the dedicated AI Agent product page.
 * All copy is centralized here for easy editing.
 */

// ─── S2: The Problem ───────────────────────────────────────────────────────────

export interface ProblemCard {
  icon: string;
  title: string;
  description: string;
}

export const aiAgentProblemCards: ProblemCard[] = [
  {
    icon: "Clock",
    title: "Missed messages",
    description:
      "A customer texts at 9pm. You see it at 8am. They've already moved on.",
  },
  {
    icon: "Repeat",
    title: "Repetitive questions",
    description:
      "Your team answers the same 20 questions every day. It's draining and expensive.",
  },
  {
    icon: "MessagesSquare",
    title: "Channel chaos",
    description:
      "WhatsApp, Instagram, email — messages everywhere, nothing centralized.",
  },
];

// ─── S3: How It Works ──────────────────────────────────────────────────────────

export interface HowItWorksStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

export const aiAgentHowItWorksSteps: HowItWorksStep[] = [
  {
    number: "01",
    icon: "ToggleRight",
    title: "Activate on your modules",
    description:
      "Purchase the AI Agent and activate it on any module you own — complaints, booking, onboarding, shift management.",
  },
  {
    number: "02",
    icon: "MessageCircle",
    title: "Your contacts start talking",
    description:
      "Customers and contacts interact with the AI agent via WhatsApp, Telegram, or any channel. It knows your business, your policies, your tone.",
  },
  {
    number: "03",
    icon: "Sparkles",
    title: "You review with Max",
    description:
      "Ask Max 'What happened today?' — he summarizes complaints, bookings, and new leads. You stay in control without doing the work.",
  },
];

// ─── S4: See It In Action ──────────────────────────────────────────────────────

export interface AgentConversation {
  label: string;
  module: string;
  contactMessage: string;
  agentResponse: string;
}

export const agentConversations: AgentConversation[] = [
  {
    label: "Complaint",
    module: "Complaint Management",
    contactMessage:
      "Hi, I ordered a cake for my daughter's birthday and it arrived damaged. I'm really upset.",
    agentResponse:
      "I'm so sorry to hear that. I've logged your complaint and our team will reach out within 2 hours with a resolution. Can you share a photo of the damage so we can expedite this?",
  },
  {
    label: "Booking",
    module: "Booking System",
    contactMessage:
      "Do you have any availability for a haircut this Thursday afternoon?",
    agentResponse:
      "Thursday afternoon — let me check. We have slots at 2:00pm and 4:30pm. Which works better for you? I'll book it right away.",
  },
  {
    label: "Shift",
    module: "Shift Management",
    contactMessage:
      "Hey, I can work Sunday morning and Tuesday all day, but not Wednesday.",
    agentResponse:
      "Got it! I've recorded your availability: Sunday morning, Tuesday full day, Wednesday unavailable. I'll notify the manager. Anything else to update?",
  },
  {
    label: "Inquiry",
    module: "E-commerce",
    contactMessage:
      "How much is the wireless speaker? And do you deliver to Tel Aviv?",
    agentResponse:
      "The wireless speaker is $89. Yes, we deliver to Tel Aviv — standard delivery takes 2-3 business days. Want me to send you the product link so you can order?",
  },
];

// ─── S5: What's Included ──────────────────────────────────────────────────────

export interface IncludedFeature {
  icon: string;
  title: string;
  description: string;
}

export const aiAgentIncludedFeatures: IncludedFeature[] = [
  {
    icon: "Globe",
    title: "Multi-channel support",
    description:
      "WhatsApp, Telegram, Facebook Messenger, Instagram DM — one agent, every channel your contacts use.",
  },
  {
    icon: "BookOpen",
    title: "Learns your business",
    description:
      "Feed it your FAQ, product catalog, pricing, and policies. It gives accurate answers every time.",
  },
  {
    icon: "Palette",
    title: "Speaks your brand voice",
    description:
      "Define your tone — professional, friendly, casual. It speaks like your best team member.",
  },
  {
    icon: "Brain",
    title: "Context-aware conversations",
    description:
      "Remembers conversation history. Never asks contacts to repeat themselves.",
  },
  {
    icon: "Users",
    title: "Smart human handoff",
    description:
      "When a conversation needs a human touch, it transfers with full context. Nothing lost.",
  },
  {
    icon: "Languages",
    title: "Multi-language support",
    description:
      "Auto-detects the contact's language and responds naturally. Serve anyone, anywhere.",
  },
  {
    icon: "BarChart3",
    title: "Conversation analytics",
    description:
      "See what contacts ask most, where the agent excels, and where to improve. Data-driven insights.",
  },
  {
    icon: "Puzzle",
    title: "Works across all your modules",
    description:
      "Activate on CRM, complaints, booking, shift management — one subscription, every module.",
  },
];

// ─── S6: Compatible Modules ───────────────────────────────────────────────────

export interface CompatibleModule {
  icon: string;
  name: string;
  description: string;
}

export const compatibleModules: CompatibleModule[] = [
  {
    icon: "Users",
    name: "CRM & Customer Management",
    description: "Qualify leads, collect contact info, answer account questions.",
  },
  {
    icon: "AlertCircle",
    name: "Complaint Management",
    description: "Receive complaints, acknowledge issues, log and escalate.",
  },
  {
    icon: "CalendarCheck",
    name: "Booking System",
    description: "Check availability, book appointments, send confirmations.",
  },
  {
    icon: "Clock",
    name: "Shift Management",
    description: "Collect employee availability, confirm schedules, send reminders.",
  },
  {
    icon: "UserPlus",
    name: "Onboarding",
    description: "Guide new customers through setup, collect required information.",
  },
  {
    icon: "ShoppingBag",
    name: "E-commerce",
    description: "Answer product questions, check stock, share order status.",
  },
];

// ─── S8: Max vs AI Agent ──────────────────────────────────────────────────────

export const maxVsAgent = {
  agent: {
    title: "Your AI Agent",
    subtitle: "Talks to your customers",
    points: [
      "Handles complaints, bookings, and inquiries",
      "Available 24/7 on WhatsApp, Telegram, and more",
      "Speaks your brand voice in any language",
      "Logs everything on your account automatically",
    ],
  },
  max: {
    title: "Max",
    subtitle: "Talks to you",
    points: [
      "Manages your account and updates your website",
      "Summarizes what happened — complaints, leads, bookings",
      "Routes dev requests to our team",
      "Your partner for running the business side",
    ],
  },
  tagline:
    "They work together. The AI agent handles the front line. Max keeps you informed.",
};

// ─── S9: FAQ ───────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export const aiAgentFAQs: FAQItem[] = [
  {
    question: "What are credits?",
    answer:
      "Each AI interaction with your contacts uses credits. A simple question-and-answer uses fewer credits, while a longer multi-step conversation uses more. You choose how many credits you need per month, and can always scale up.",
  },
  {
    question: "Which channels does it support?",
    answer:
      "WhatsApp, Telegram, Facebook Messenger, and Instagram DM. Your contacts reach your AI agent on whichever channel they prefer — the experience is consistent everywhere.",
  },
  {
    question: "Can it handle multiple languages?",
    answer:
      "Yes. The AI agent auto-detects the contact's language and responds naturally. Whether your contacts speak English, Hebrew, Spanish, or Arabic — it handles the conversation fluently.",
  },
  {
    question: "What if it can't answer a question?",
    answer:
      "It seamlessly escalates to a human on your team — with full conversation context included. The contact doesn't have to repeat anything, and your team picks up right where the AI left off.",
  },
  {
    question: "Do I need technical skills to set it up?",
    answer:
      "Zero. We configure everything for you. You just describe your business, upload your FAQ or documents, and we handle the rest. Training your agent is as simple as having a conversation.",
  },
  {
    question: "What's the difference between the AI Agent and Max?",
    answer:
      "The AI Agent talks to your customers and contacts — handling inquiries, complaints, bookings on WhatsApp and other channels. Max talks to you — managing your account, updating your website, summarizing activity. They work together as your complete infrastructure.",
  },
];
