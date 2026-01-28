/**
 * Product data for UpgradeShop pricing page
 *
 * Terminology:
 * - MODULES: Standalone products purchasable independently (CRM, AI Agents, Email Marketing, etc.)
 * - WEBSITE: Fully managed website SERVICE with tiered pricing by page count (NOT a builder)
 * - LANDING_PAGE: Separate product for single high-converting pages ($89/mo)
 * - ADDONS: Extensions for specific modules (e.g., Digital Courses for Website)
 * - FEATURES: Free toggles inside modules (no pricing, just visibility flags)
 *
 * These products match the store.products table in the database.
 * The product IDs are used when creating orders through the checkout API.
 */

export type ProductCategory = "module" | "addon";

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
  isPopular?: boolean;
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
  // Website Addons (require website module)
  digitalCourse: "027e1552-5e7d-4958-bdf4-05daabbfe46e",
  bookingSystem: "a51a650f-c187-4af8-a61b-bfd2392c4833",
  eventsManagement: "759670a3-0b9c-4889-b9cb-4b97c61433e9",
  storeSimple: "21a9bff3-bf34-4f12-b873-b391b48cdccc",
  storeFull: "69c69a27-b911-4974-9d58-c2daef6b8b9e",
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
    id: PRODUCT_IDS.aiAgent,
    slug: "ai-agent",
    name: "AI Agents",
    shortDescription: "Multi-channel smart assistant",
    description: "Intelligent AI assistant across WhatsApp, Telegram, Messenger, and Instagram DM.",
    price: 35,
    pricePrefix: "Starting from",
    billingCycle: "monthly",
    category: "module",
    features: [
      "WhatsApp integration",
      "Telegram support",
      "Messenger integration",
      "Instagram DM automation",
      "Custom personality",
      "Context-aware conversations",
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
    name: "Task & Project Management",
    shortDescription: "Projects, tasks & time tracking",
    description: "Complete project planning, task tracking, team collaboration, and time logging system.",
    price: 24,
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
  isPopular?: boolean;
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
    isPopular: true,
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
    description: "Full-featured e-commerce platform with unlimited products, advanced inventory, and powerful sales tools.",
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
];

// =============================================================================
// COMBINED EXPORTS FOR BACKWARDS COMPATIBILITY
// =============================================================================

// All products (modules + landing page, excluding website addons for now)
export const products: Product[] = [...modules];

// All products including addons
export const allProducts: Product[] = [...modules, landingPageProduct, ...websiteAddons];

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
