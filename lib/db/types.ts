/**
 * Type definitions for customer data from Max database
 *
 * Max collects 17 data items from clients:
 * - 10 Required (6 business + 4 design)
 * - 7 Optional (3 business + 4 design)
 */

// =============================================================================
// Core Types
// =============================================================================

export type DataStatus = 'completed' | 'not_started' | 'skipped'

export type PriorityGroup = 1 | 2 | 3 | 4 | 5

export type ConfidenceLevel = 'high' | 'medium' | 'low'

export type DataSource = 'direct_answer' | 'inferred' | 'partial'

// All possible item keys from Max's collection
export type ItemKey =
  // Required - Business Info (6)
  | 'business_name'
  | 'services'
  | 'target_audience'
  | 'pain_points'
  | 'solutions'
  | 'about_story'
  // Required - Design Preferences (4)
  | 'inspiration_sites'
  | 'mood_feeling'
  | 'color_preferences'
  | 'brand_colors'
  // Optional - Business Info (3)
  | 'unique_value'
  | 'success_stories'
  | 'testimonials'
  // Optional - Design Preferences (4)
  | 'professional_image'
  | 'photo_style'
  | 'aesthetic'
  | 'icon_style'

// =============================================================================
// Data Item Structure
// =============================================================================

export interface ExtractedData {
  value: string | string[] | Record<string, unknown>
  confidence: number  // 0.0 - 1.0
  source: DataSource
}

export interface DataItem {
  item_key: ItemKey
  item_label?: string
  status: DataStatus
  extracted_data: ExtractedData | null
  full_text: string | null  // Customer's original response in their language
  is_required: boolean
  priority: PriorityGroup
}

// =============================================================================
// Client Data (from Max database)
// =============================================================================

export interface CustomerInfo {
  id: string
  name?: string
  email?: string
  phone?: string
  language?: string
  created_at?: string
}

export interface MaxClientData {
  customer_id: string
  customer_info?: CustomerInfo
  items: Record<ItemKey, DataItem>
  messages?: ConversationMessage[]
  metadata: {
    language: string
    collection_duration?: number
    completion_percentage: number
    onboarding_stage?: string
    customer_name?: string
  }
}

export interface ConversationMessage {
  content: string
  role: 'user' | 'assistant'
  timestamp: string
}

// =============================================================================
// Product & Subscription System
// =============================================================================

export interface Product {
  id: string
  product_key: 'website' | 'landing_page' | 'seo' | 'crm' | 'whatsapp_bot'
  product_name: string
  description: string
  can_be_addon: boolean
  is_active: boolean
  display_order: number
  created_at?: string
  updated_at?: string
}

export interface ProductPlan {
  id: string
  product_id: string
  plan_key: string
  plan_name: string
  setup_fee: string
  price_monthly?: string
  price_yearly?: string
  monthly_changes: number
  max_pages: number | null
  includes_policy_pages: boolean
  monthly_content_pages: number
  monthly_blog_posts: number
  trial_days: number
  limits: Record<string, unknown>
  features: unknown[]
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export interface CustomerSubscription {
  id: string
  customer_id: string
  product_id: string
  plan_id: string
  status: 'active' | 'trial' | 'cancelled' | 'expired'
  started_at: string
  trial_ends_at?: string
  changes_used_this_month: number
  usage_month_start: string
  is_addon: boolean
  parent_subscription_id?: string
  metadata?: Record<string, unknown>
  cancelled_at?: string
  expires_at?: string
  created_at?: string
  updated_at?: string
}

// =============================================================================
// Website Tables
// =============================================================================

export type PageStatus = 'in_progress' | 'content_ready' | 'in_review' | 'completed'

export interface SubscriptionPlan {
  plan_key: string
  plan_name: string
  max_pages: number
  includes_policy_pages: boolean
  monthly_content_pages: number
  monthly_blog_posts: number
  features: Record<string, unknown>
}

export interface WebsitePage {
  id: string
  customer_id: string
  subscription_id?: string
  page_slug: string
  page_title: string
  page_type: string
  page_purpose: string
  target_audience?: string
  key_messages?: unknown[]
  status: PageStatus
  display_order: number
  show_in_nav: boolean
  is_policy_page: boolean
  sections?: unknown[]
  content?: Record<string, unknown>
  meta_title?: string
  meta_description?: string
  build_notes?: string
  created_at?: string
  updated_at?: string
}

export interface DesignElement {
  id: string
  customer_id: string
  website_version_id?: string
  element_type: string
  element_key: string
  element_value: unknown
  source: string
  display_label?: string
  description?: string
  created_at?: string
}

export interface UploadedFile {
  id: string
  customer_id: string
  file_type: string
  original_filename: string
  stored_filename?: string
  storage_path?: string
  file_size_bytes?: number
  mime_type?: string
  uploaded_via?: string
  purpose: string
  processing_status: string
  processing_error?: string
  metadata?: Record<string, unknown>
  created_at?: string
}

export interface WebsiteVersion {
  id: string
  customer_id: string
  version_number: number
  status: string
  preview_url?: string
  live_url?: string
  google_doc_url?: string
  design_notes?: Record<string, unknown>
  feedback?: Record<string, unknown>
  generation_metadata?: Record<string, unknown>
  content_locked: boolean
  html_stored_path?: string
  css_stored_path?: string
  js_stored_path?: string
  assets_folder_path?: string
  created_at?: string
  deployed_at?: string
}

// =============================================================================
// Google Drive Files
// =============================================================================

export interface DriveFile {
  id: string
  url: string
  title: string
}

export interface ChecklistFileItem {
  id: string
  customer_id: string
  item_key: 'logo' | 'content_images' | 'business_photos'
  item_label: string
  status: DataStatus
  content_data: {
    files: DriveFile[]
    folder_id?: string
    folder_url?: string
  }
  created_at?: string
  updated_at?: string
}

export interface CustomerDocument {
  id: string
  customer_id: string
  document_url: string
  document_type: string
  title: string | null
  status: string
  items_extracted: number
  google_file_id: string
  mime_type: string | null
  shared_at: string
  processed_at: string | null
  notes: string | null
  message_content: string | null
  created_at?: string
  updated_at?: string
}

export interface CustomerAssets {
  logos: DriveFile[]
  images: DriveFile[]
  businessPhotos: DriveFile[]
  documents: CustomerDocument[]
  hasOAuthAccess: boolean
}

// Extended client data with all website tables
export interface ExtendedClientData extends MaxClientData {
  subscription_plan?: SubscriptionPlan
  website_pages?: WebsitePage[]
  design_elements?: DesignElement[]
  uploaded_files?: UploadedFile[]
  website_versions?: WebsiteVersion[]
  customer_subscriptions?: CustomerSubscription[]
  primary_product?: Product & ProductPlan
  product_plan?: ProductPlan
  checklist_files?: ChecklistFileItem[]
  customer_documents?: CustomerDocument[]
  customer_assets?: CustomerAssets
}

// =============================================================================
// Constants
// =============================================================================

export const REQUIRED_ITEMS: ItemKey[] = [
  'business_name',
  'services',
  'target_audience',
  'pain_points',
  'solutions',
  'about_story',
  'inspiration_sites',
  'mood_feeling',
  'color_preferences',
  'brand_colors',
]

export const OPTIONAL_ITEMS: ItemKey[] = [
  'unique_value',
  'success_stories',
  'testimonials',
  'professional_image',
  'photo_style',
  'aesthetic',
  'icon_style',
]

// =============================================================================
// Helper Functions
// =============================================================================

export function isItemRequired(key: ItemKey): boolean {
  return REQUIRED_ITEMS.includes(key)
}

export function getItemPriority(key: ItemKey): PriorityGroup {
  const priorities: Record<ItemKey, PriorityGroup> = {
    inspiration_sites: 1,
    mood_feeling: 1,
    brand_colors: 1,
    color_preferences: 1,
    business_name: 2,
    services: 2,
    target_audience: 2,
    pain_points: 3,
    solutions: 3,
    about_story: 3,
    unique_value: 3,
    testimonials: 4,
    success_stories: 4,
    professional_image: 5,
    photo_style: 5,
    aesthetic: 5,
    icon_style: 5,
  }
  return priorities[key] || 5
}

export function getItemValue(item: DataItem): string | string[] | null {
  if (!item.extracted_data) return null
  return item.extracted_data.value as string | string[]
}
