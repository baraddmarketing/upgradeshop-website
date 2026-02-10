/**
 * Product data for UpgradeShop pricing page
 *
 * Terminology:
 * - MODULES: Standalone products purchasable independently (CRM, AI Agents, Email Marketing, etc.)
 * - WEBSITE: Fully managed website SERVICE with tiered pricing by page count (NOT a builder)
 * - LANDING_PAGE: Separate product for single high-converting pages (price from database)
 * - ADDONS: Extensions for specific modules (e.g., Digital Courses for Website)
 * - FEATURES: Free toggles inside modules (no pricing, just visibility flags)
 *
 * These products match the store.products table in the database.
 * The product IDs are used when creating orders through the checkout API.
 */

export type ProductCategory = "module" | "addon" | "website-addon" | "landing-addon" | "ai-agent" | "ai-agent-type" | "landing-page" | "website" | "test";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  pricePrefix?: string; // e.g., "Starting from"
  compareAtPrice?: number;
  prices?: Record<string, number> | null; // Multi-currency prices from database
  billingCycle: "monthly" | "yearly";
  features: string[];
  isBundle?: boolean;
  category: ProductCategory;
  requires?: string; // For addons, which module they require (e.g., "website")
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// Product IDs from the database (store.products where customer_id = UpgradeShop)
export const PRODUCT_IDS = {
  // Modules
  crm: "25b9954a-85a9-4525-96ee-17ff8b8dd7c0",
  emailMarketing: "61f757fb-52cc-44f5-826e-44d6ffd10cfa",
  whatsapp: "b63888a8-2b23-49b4-8215-1eaf29b8f9c0",
  aiAgent: "a9faff03-c67f-4f5b-8548-ca096558cb49",
  employeeManagement: "4486566d-3325-4a93-9cd8-73686904bc93",
  projectTaskManagement: "fde46275-5d68-4ce6-9039-78dbd2021d22",
  blog: "79265e22-c181-444c-b41f-920a25c43e8b",
  communityForum: "42cf6eaf-dcc7-483d-8f85-5860921e1000",
  facebookInstagram: "e74360ec-35c2-45ad-baaf-2865d889611f",
  salesFunnel: "661dc637-29d5-4797-b695-1e818a109fc5",
  // Website Addons (require website module)
  digitalCourse: "027e1552-5e7d-4958-bdf4-05daabbfe46e",
  bookingSystem: "a51a650f-c187-4af8-a61b-bfd2392c4833",
  eventsManagement: "759670a3-0b9c-4889-b9cb-4b97c61433e9",
  storeSimple: "c329a518-9cb4-47a3-a432-78dfdb3c65ab",
  storeFull: "7499fd04-9510-4ed5-a0cb-d0398cffe9eb",
  abTesting: "e54e6b54-3a37-4fa3-8628-64e64f47ca39",
  additionalLanguage: "8fcb3248-8188-44d0-ac1a-1706dc111cf4",
  liveStreamingPlatform: "bdc5779f-8a83-4fc7-b125-a38c31d867ec",
  videoLibraryVOD: "322da23e-cb85-47d8-92ef-24b6ec259f16",
  // Landing Page Addons (require landing page)
  landingBooking: "ec0ebedd-132c-486e-b814-e1fc91fea906",
  landingPaymentGateway: "84eb6204-9e1c-430d-b458-3839eb50a7ca",
  // AI Agents
  aiShiftManager: "0e3eb157-5351-4831-9981-d18ec05e327a",
  aiOnboarding: "102c07e1-2fb1-426c-b6fd-0321df3a6769",
  aiClaimsManager: "ac351af6-6d09-429c-8267-6aa3ac7b433c",
  aiComplaintManager: "c8340426-7b40-4b08-8cea-ee8e5c25cb79",
  customAIAgent: "92353e90-9ee4-4735-a24e-d29716e1788b",
  // Test Products (for SUMIT gateway testing)
  testSubscription: "f0658690-01ee-4d08-aca1-421ba77cd42c",
  testOneTime: "ec938382-a54f-452c-94a9-6dd85ce86c7d",
} as const;

// =============================================================================
// MODULES - Standalone products purchasable independently
// =============================================================================

export const modules: Product[] = [
  {
    id: PRODUCT_IDS.crm,
    slug: "crm",
    name: "CRM",
    shortDescription: "Lead tracking & pipeline",
    description:
      "Lead tracking, pipeline management, contact history, and custom fields.",
    price: 19,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Lead tracking",
      "Pipeline management",
      "Contact history",
      "Custom fields",
      "Activity timeline",
      "Team collaboration",
    ],
  },
  {
    id: PRODUCT_IDS.emailMarketing,
    slug: "email-marketing",
    name: "Email Marketing",
    shortDescription: "Templates & analytics",
    description:
      "Beautiful templates, smart segmentation, and detailed analytics.",
    price: 17,
    billingCycle: "monthly",
    category: "module",
    features: [
      "5,000 emails/month included",
      "Email templates",
      "Smart segmentation",
      "A/B testing",
      "Analytics dashboard",
      "Automation sequences",
    ],
  },
  {
    id: PRODUCT_IDS.whatsapp,
    slug: "whatsapp",
    name: "WhatsApp Marketing",
    shortDescription: "Campaigns & automation",
    description: "WhatsApp broadcast messaging, marketing campaigns, and automated responses.",
    price: 25,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Broadcast messaging",
      "Message templates",
      "Campaign analytics",
      "Auto-responses",
      "Contact lists",
      "Marketing automation",
    ],
  },
  {
    id: PRODUCT_IDS.employeeManagement,
    slug: "employee-management",
    name: "Employee Management",
    shortDescription: "Scheduling & time tracking",
    description: "Employee scheduling, shift management, time tracking, and availability management.",
    price: 19,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Shift scheduling",
      "Time tracking",
      "Availability management",
      "Team calendar",
      "Schedule templates",
      "Mobile access",
    ],
  },
  {
    id: PRODUCT_IDS.projectTaskManagement,
    slug: "project-task-management",
    name: "Project Management",
    shortDescription: "Projects, tasks & time tracking",
    description: "Complete project planning, task tracking, team collaboration, and time logging system.",
    price: 25,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Project planning",
      "Task management",
      "Labels & filters",
      "Team collaboration",
      "Time tracking",
      "Comments & discussions",
    ],
  },
  {
    id: PRODUCT_IDS.facebookInstagram,
    slug: "social-media",
    name: "Facebook & Instagram",
    shortDescription: "Social media automation",
    description: "Instagram DM automation, Facebook Messenger automation, comment auto-replies, lead capture to CRM",
    price: 30,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Instagram DM automation",
      "Facebook Messenger automation",
      "Comment auto-replies",
      "Lead capture to CRM",
      "Template messages",
      "Analytics dashboard",
    ],
  },
];


// =============================================================================
// LANDING PAGE - Separate product for single high-converting pages
// =============================================================================

export const landingPageProduct: Product = {
  id: "6da65c79-276f-48a8-a091-c5f02a94dff0",
  slug: "landing-page",
  name: "Landing Page",
  shortDescription: "Single high-converting page",
  description: "Single high-converting page perfect for campaigns, lead generation, product launches, and promotions.",
  price: 89,
  billingCycle: "monthly",
  category: "module",
  features: [
    "1 professionally designed page",
    "Built by human developers",
    "Max AI for content updates",
    "Responsive & mobile-optimized",
    "SEO optimized",
    "SSL certificate included",
    "24/7 ticket support",
  ],
};

// =============================================================================
// WEBSITE SERVICE - Tiered pricing by page count
// =============================================================================

export interface WebsiteTier {
  key: string;
  name: string;
  maxPages: number | null; // null for enterprise/custom
  monthlyPrice: number;
  description: string;
}

export const websiteTiers: WebsiteTier[] = [
  {
    key: "starter",
    name: "Starter",
    maxPages: 3,
    monthlyPrice: 170,
    description: "Small business, getting started",
  },
  {
    key: "standard",
    name: "Standard",
    maxPages: 10,
    monthlyPrice: 260,
    description: "Perfect for most businesses",
  },
  {
    key: "professional",
    name: "Professional",
    maxPages: 20,
    monthlyPrice: 350,
    description: "Established businesses",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    maxPages: null,
    monthlyPrice: 0, // Custom pricing
    description: "Complex sites, custom pricing",
  },
];

export const websiteService = {
  slug: "website",
  name: "Professional Website",
  tagline: "Built by developers, managed by Max AI",
  description: "Custom-designed website built by our development team. Max AI handles all your content updates and changes. This is a fully managed website SERVICE, not a website builder.",
  tiers: websiteTiers,
  features: [
    "Built by human developers",
    "Max AI for content updates",
    "24/7 ticket system to developers",
    "Responsive & mobile-optimized",
    "SEO optimized",
    "SSL certificate included",
    "Affordable alternative to agencies",
    "Higher quality than DIY tools",
  ],
};

// =============================================================================
// WEBSITE ADDONS - Extensions that require the Website module
// =============================================================================

export const websiteAddons: Product[] = [
  {
    id: PRODUCT_IDS.digitalCourse,
    slug: "digital-course-platform",
    name: "Digital Course Platform",
    shortDescription: "Create and sell online courses",
    description: "Create, host, and sell unlimited online courses with our comprehensive digital course platform. Perfect for educators, coaches, and content creators.",
    price: 49,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Unlimited courses",
      "Student management",
      "Video hosting",
      "Quiz & assessments",
      "Certificate generation",
      "Progress tracking",
    ],
  },
  {
    id: PRODUCT_IDS.bookingSystem,
    slug: "booking-system",
    name: "Booking System",
    shortDescription: "Calendly-style appointment scheduling",
    description: "Smart appointment scheduling with Google Calendar integration. Let clients book appointments 24/7 with automated reminders and calendar sync.",
    price: 19,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Google Calendar sync",
      "Automated reminders",
      "Custom availability",
      "Multiple time zones",
      "Email notifications",
      "Booking page customization",
    ],
  },
  {
    id: PRODUCT_IDS.eventsManagement,
    slug: "events-management",
    name: "Events Management",
    shortDescription: "Manage events, registrations, and tickets",
    description: "Complete events management system for conferences, workshops, webinars, and community events. Manage registrations, tickets, schedules, and attendees.",
    price: 35,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Event creation",
      "Registration management",
      "Ticket sales",
      "Attendee tracking",
      "Event schedules",
      "Email notifications",
    ],
  },
  {
    id: PRODUCT_IDS.storeSimple,
    slug: "simple-store",
    name: "Simple Store",
    shortDescription: "Accept payments and sell products",
    description: "Start selling online with a simple, easy-to-manage store. Perfect for small businesses with up to 25 products.",
    price: 25,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Up to 25 products",
      "Accept payments",
      "Basic checkout",
      "Order management",
      "Product pages",
      "Inventory tracking",
    ],
  },
  {
    id: PRODUCT_IDS.storeFull,
    slug: "full-ecommerce",
    name: "Full E-commerce",
    shortDescription: "Complete online store solution",
    description: "Unlimited products, inventory tracking, variants, abandoned cart recovery, shipping calculator, tax automation",
    price: 50,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Unlimited products",
      "Inventory tracking",
      "Product variants",
      "Abandoned cart recovery",
      "Shipping calculator",
      "Tax automation",
    ],
  },
  {
    id: PRODUCT_IDS.abTesting,
    slug: "ab-testing",
    name: "A/B Testing",
    shortDescription: "Test multiple page versions",
    description: "Test multiple versions of your landing page. Split traffic automatically, track conversions, find what works best",
    price: 19,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Split traffic testing",
      "Automatic routing",
      "Conversion tracking",
      "Statistical analysis",
      "Winner detection",
      "Multi-variant testing",
    ],
  },
  {
    id: PRODUCT_IDS.additionalLanguage,
    slug: "additional-language",
    name: "Additional Language",
    shortDescription: "Add another language",
    description: "Add another language to your website ($17/mo per language)",
    price: 17,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Full language support",
      "Translation management",
      "Language switcher",
      "SEO for each language",
      "Localized URLs",
      "RTL support",
    ],
  },
  {
    id: PRODUCT_IDS.liveStreamingPlatform,
    slug: "live-streaming-platform",
    name: "Live Streaming Platform",
    shortDescription: "Complete live streaming solution",
    description: "Complete live streaming solution with OBS integration, real-time chat, automatic recording, and comprehensive analytics.",
    price: 119,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "OBS Studio RTMP integration",
      "CDN delivery (Bunny.net, Mux)",
      "Real-time viewer chat",
      "Automatic session recording",
      "Live analytics",
      "Privacy controls",
    ],
  },
  {
    id: PRODUCT_IDS.videoLibraryVOD,
    slug: "video-library-vod",
    name: "Video Library (VOD)",
    shortDescription: "Video-on-demand platform",
    description: "Complete video-on-demand platform with searchable archive, embedded player, and engagement analytics.",
    price: 69,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "CDN-powered video hosting",
      "Searchable archive",
      "DRM-protected player",
      "View counts & analytics",
      "Threaded comments",
      "Playlists and collections",
    ],
  },
  {
    id: PRODUCT_IDS.blog,
    slug: "blog",
    name: "Blog",
    shortDescription: "Full blog functionality",
    description: "Full blog functionality with post management, categories, tags, RSS feed",
    price: 9,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Unlimited blog posts",
      "Categories & tags",
      "RSS feed",
      "SEO optimization",
      "Comment system",
      "Media management",
    ],
  },
  {
    id: PRODUCT_IDS.communityForum,
    slug: "community-forum",
    name: "Community/Forum",
    shortDescription: "Member area & discussion forums",
    description: "Member area, discussion forums, user profiles, moderation tools",
    price: 30,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Discussion forums",
      "User profiles",
      "Member directory",
      "Moderation tools",
      "Private messaging",
      "Topic subscriptions",
    ],
  },
  {
    id: PRODUCT_IDS.salesFunnel,
    slug: "sales-funnel",
    name: "Sales Funnel",
    shortDescription: "Complete conversion flow",
    description: "Complete conversion flow: Opt-in landing page for lead capture, sales page, booking integration, and downsell pages",
    price: 149,
    billingCycle: "monthly",
    category: "addon",
    requires: "website",
    features: [
      "Opt-in landing page",
      "Sales page builder",
      "Booking integration",
      "Downsell pages",
      "A/B testing",
      "Conversion tracking",
    ],
  },
];

// =============================================================================
// LANDING PAGE ADDONS - Extensions for the Landing Page product
// =============================================================================

export const landingPageAddons: Product[] = [
  {
    id: PRODUCT_IDS.landingBooking,
    slug: "landing-booking",
    name: "Booking System (Landing Page)",
    shortDescription: "Add appointment scheduling",
    description: "Add appointment scheduling to your landing page. Calendar sync, automated reminders, payment collection",
    price: 25,
    billingCycle: "monthly",
    category: "addon",
    requires: "landing-page",
    features: [
      "Calendar sync",
      "Automated reminders",
      "Payment collection",
      "Timezone support",
      "Availability management",
      "Email notifications",
    ],
  },
  {
    id: PRODUCT_IDS.landingPaymentGateway,
    slug: "landing-payment-gateway",
    name: "Payment Gateway",
    shortDescription: "Accept payments on landing page",
    description: "Accept payments directly on your landing page. Stripe/PayPal integration, checkout forms, and order management",
    price: 25,
    billingCycle: "monthly",
    category: "addon",
    requires: "landing-page",
    features: [
      "Stripe integration",
      "PayPal support",
      "Checkout forms",
      "Order management",
      "Payment receipts",
      "Secure processing",
    ],
  },
];

// =============================================================================
// AI AGENTS - Specialized AI agent products
// =============================================================================

export const aiAgents: Product[] = [
  {
    id: PRODUCT_IDS.aiShiftManager,
    slug: "ai-shift-manager-agent",
    name: "Shift Manager Agent",
    shortDescription: "AI-powered shift scheduling",
    description: "AI agent that collects employee availability via WhatsApp and manages shift preferences",
    price: 17,
    billingCycle: "monthly",
    category: "module",
    features: [
      "WhatsApp integration",
      "Availability collection",
      "Shift preference tracking",
      "Automated reminders",
      "Calendar integration",
      "Team scheduling",
    ],
  },
  {
    id: PRODUCT_IDS.aiOnboarding,
    slug: "ai-onboarding-agent",
    name: "Onboarding Agent",
    shortDescription: "Automated customer onboarding",
    description: "AI agent that guides new customers through onboarding, answers questions, and collects required information",
    price: 35,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Automated onboarding flow",
      "Information collection",
      "Progress tracking",
      "Multi-channel support",
      "Custom workflows",
      "Integration with CRM",
    ],
  },
  {
    id: PRODUCT_IDS.aiClaimsManager,
    slug: "ai-claims-manager-agent",
    name: "Claims Manager Agent",
    shortDescription: "AI-powered claims processing",
    description: "AI agent that handles insurance claims, documentation, and status updates",
    price: 25,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Claims intake",
      "Document collection",
      "Status updates",
      "Automated notifications",
      "Integration with systems",
      "Compliance tracking",
    ],
  },
  {
    id: PRODUCT_IDS.aiComplaintManager,
    slug: "ai-complaint-manager-agent",
    name: "Complaint Manager Agent",
    shortDescription: "AI-powered complaint handling",
    description: "AI agent that manages customer complaints, tracks resolution, and maintains service quality",
    price: 15,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Complaint intake",
      "Priority classification",
      "Resolution tracking",
      "Escalation management",
      "Customer communication",
      "Analytics & reporting",
    ],
  },
  {
    id: PRODUCT_IDS.customAIAgent,
    slug: "custom-ai-agent",
    name: "Custom AI Agent",
    shortDescription: "Fully custom AI agent",
    description: "Custom-built AI agent tailored to your specific business needs and workflows",
    price: 800,
    billingCycle: "monthly",
    category: "module",
    features: [
      "Custom AI logic",
      "Tailored workflows",
      "Integration with systems",
      "Training on your data",
      "Dedicated support",
      "Ongoing optimization",
    ],
  },
];

// =============================================================================
// COMBINED EXPORTS FOR BACKWARDS COMPATIBILITY
// =============================================================================

// All products (modules + landing page, excluding website addons for now)
export const products: Product[] = [...modules];

// All products including addons (but not individual AI agent products - they're internal only)
export const allProducts: Product[] = [
  ...modules,
  landingPageProduct,
  ...landingPageAddons,
  ...websiteAddons,
];

// Helper to find product by ID
export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

// Helper to find product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

// Get only modules (standalone products)
export function getModules(): Product[] {
  return allProducts.filter((p) => p.category === "module");
}

// Get only addons
export function getAddons(): Product[] {
  return allProducts.filter((p) => p.category === "addon");
}

// Get addons for a specific parent module
export function getAddonsForModule(moduleSlug: string): Product[] {
  return allProducts.filter((p) => p.category === "addon" && p.requires === moduleSlug);
}

// Calculate total for cart items
export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

// UpgradeShop store customer ID (Tenant #1)
export const UPGRADESHOP_CUSTOMER_ID = "00000000-0000-0000-0000-000000000001";
