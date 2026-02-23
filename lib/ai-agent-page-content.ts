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
    icon: "UserCircle",
    title: "Name it during onboarding",
    description:
      "When you sign up, Max walks you through naming and configuring your personal agent. Call it Sara, Bolt, Alex — anything. It's yours from day one, no extra purchase needed.",
  },
  {
    number: "02",
    icon: "LayoutDashboard",
    title: "It manages your platform",
    description:
      "Your agent handles everything across your active modules — website edits, CRM updates, email campaigns, product descriptions. All through natural conversation, covered by your included monthly credits.",
  },
  {
    number: "03",
    icon: "Megaphone",
    title: "Extend it to your customers",
    description:
      "When you're ready, activate it customer-facing. It handles WhatsApp inquiries, bookings, support, and order questions 24/7, in any language — using additional paid credits.",
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
    label: "E-commerce",
    module: "Full E-commerce",
    contactMessage:
      "How much is the wireless speaker? And do you deliver to Tel Aviv?",
    agentResponse:
      "The wireless speaker is $89. Yes, we deliver to Tel Aviv — standard delivery takes 2-3 business days. Want me to send you the product link so you can order?",
  },
  {
    label: "Complaint",
    module: "Customer Support",
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
    label: "Abandoned Cart",
    module: "Full E-commerce",
    contactMessage:
      "I saw the running shoes I had in my cart went back to full price",
    agentResponse:
      "Hey! I noticed you left those in your cart too — they're popular. I can apply a 10% discount for you right now if you'd like to complete the order. Want me to send the link?",
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
    icon: "Gift",
    title: "Included from day one",
    description:
      "Every subscription includes your personal agent. 200 credits/month covers normal platform management — no top-up needed for most users.",
  },
  {
    icon: "Puzzle",
    title: "Grows with your modules",
    description:
      "Add the Website module — your agent can update it. Add CRM — it manages contacts. Each new module automatically expands what your agent can do.",
  },
  {
    icon: "Globe",
    title: "Multi-channel support",
    description:
      "WhatsApp, Facebook Messenger, Instagram DM — one agent, every channel your contacts use.",
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
    description: "Qualify leads, collect contact info, update deals and pipelines.",
  },
  {
    icon: "ShoppingBag",
    name: "E-commerce",
    description: "Answer product questions, recover abandoned carts, share order status.",
  },
  {
    icon: "MessageCircle",
    name: "WhatsApp Integration",
    description: "Broadcast messages, handle replies, automate follow-up sequences.",
  },
  {
    icon: "CalendarCheck",
    name: "Booking System",
    description: "Check availability, book appointments, send confirmations.",
  },
  {
    icon: "Mail",
    name: "Email Marketing",
    description: "Draft campaigns, manage sequences, report on performance.",
  },
  {
    icon: "FolderKanban",
    name: "Project Management",
    description: "Create tasks, update status, track deadlines — all via chat.",
  },
];

// ─── Credits ──────────────────────────────────────────────────────────────────

export interface CreditPackage {
  name: string;
  credits: number;
  price: number;
  pricePerCredit: string;
  saving: string;
  highlighted?: boolean;
}

export const creditPackages: CreditPackage[] = [
  {
    name: "Starter",
    credits: 500,
    price: 29,
    pricePerCredit: "$0.058",
    saving: "27%",
  },
  {
    name: "Growth",
    credits: 1500,
    price: 59,
    pricePerCredit: "$0.039",
    saving: "51%",
    highlighted: true,
  },
  {
    name: "Pro",
    credits: 5000,
    price: 149,
    pricePerCredit: "$0.030",
    saving: "63%",
  },
  {
    name: "Scale",
    credits: 15000,
    price: 349,
    pricePerCredit: "$0.023",
    saving: "71%",
  },
];

// ─── S8: Max vs Your Agent ────────────────────────────────────────────────────

export const maxVsAgent = {
  agent: {
    title: "Your Personal Agent",
    subtitle: "Manages your business",
    points: [
      "Named by you during onboarding — fully yours",
      "Updates your website, manages CRM, runs email campaigns",
      "Handles your customers via WhatsApp and other channels",
      "Gets smarter with every module you add",
    ],
  },
  max: {
    title: "Max",
    subtitle: "The Upgrade Shop's own agent",
    points: [
      "Max is our agent — built on the same system we sell",
      "Onboards you and configures your personal agent",
      "Handles your support and account questions",
      "Proof that the product actually works",
    ],
  },
  tagline:
    "Max shows it's possible. Your agent makes it personal.",
};

// ─── S9: FAQ ───────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export const aiAgentFAQs: FAQItem[] = [
  {
    question: "Is the AI agent included in my subscription?",
    answer:
      "Yes — every account gets a personal AI agent from day one, at no extra cost. You name it during onboarding and it immediately begins managing your platform across all active modules.",
  },
  {
    question: "What are credits and when do I need more?",
    answer:
      "Every subscription includes 200 credits/month — enough for normal platform management like website edits, CRM updates, and email campaigns. Additional credits are needed for customer-facing use: WhatsApp support bots, sales automation, order notifications, and broadcast messaging. You choose if and when to top up.",
  },
  {
    question: "What's the difference between internal and customer-facing use?",
    answer:
      "Internal use means your agent manages your platform — updating your website, creating products, managing CRM contacts. Customer-facing means your agent talks to YOUR customers — answering WhatsApp inquiries, handling bookings, recovering abandoned carts. Internal use is covered by your base 200 credits. Customer-facing use requires additional paid credits.",
  },
  {
    question: "Which channels does the customer-facing agent support?",
    answer:
      "WhatsApp, Facebook Messenger, and Instagram DM. Your contacts reach your agent on whichever channel they prefer — the experience is consistent everywhere.",
  },
  {
    question: "Can it handle multiple languages?",
    answer:
      "Yes. The agent auto-detects the contact's language and responds naturally — Hebrew, English, Spanish, Arabic, and more. Train it in one language, it serves in many.",
  },
  {
    question: "What's the difference between my agent and Max?",
    answer:
      "Max is The Upgrade Shop's own AI agent — it onboards you, configures your personal agent, and handles your platform support. Your personal agent is entirely yours: named by you, scoped to your business, managing your platform and optionally serving your customers. Max is the demo. Your agent is the product.",
  },
  {
    question: "Do I need technical skills to set it up?",
    answer:
      "Zero. Max walks you through naming and configuring your agent during onboarding. You describe your business, upload any documents or FAQs, and we handle everything else. Changing your agent's behavior later is as simple as sending it a message.",
  },
];
