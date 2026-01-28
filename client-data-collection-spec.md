# Client Data Collection Specification

**For: Website Builder AI Agent**
**Source: Max (WhatsApp Onboarding Agent)**
**Last Updated: December 2024**

---

## Overview

Max is the WhatsApp-based AI assistant that collects information from clients before website creation. This document specifies all data points Max collects, their importance, and how the website builder agent should use them.

---

## Data Structure

All collected data is stored in the `onboarding_checklist_items` table with the following key fields:
- `item_key` - Unique identifier for the data point
- `status` - "completed", "not_started", or "skipped"
- `extracted_data` - JSON with structured data (value, confidence, source)
- `full_text` - The customer's original response in their language

---

## Required Information (Must Have)

These items are essential for website creation. Max will actively ask for all of these.

### Part 1: Business Information

| Item Key | Label | Description | How Website Builder Should Use It |
|----------|-------|-------------|-----------------------------------|
| `business_name` | Business name and type | The name of their business and what type it is | Use for header, footer, title tag, about page heading |
| `services` | Services or products offered | What services/products they offer to customers | Create services section, service cards, pricing structure |
| `target_audience` | Target audience | Who their ideal customers are | Tailor messaging tone, choose appropriate imagery, write copy that resonates |
| `pain_points` | Client pain points | Problems/challenges their clients face | Use in hero section to show understanding, create "problems we solve" section |
| `solutions` | How they solve problems | Their approach/methodology to helping clients | Create "how we help" or "our process" section, unique value propositions |
| `about_story` | About/story/credentials | Their background, story, credentials | Create about page, founder bio, trust-building elements |

### Part 2: Design Preferences

| Item Key | Label | Description | How Website Builder Should Use It |
|----------|-------|-------------|-----------------------------------|
| `inspiration_sites` | Inspiration websites | Websites they like as reference | **CRITICAL** - Analyze these sites for layout, style, components to emulate |
| `mood_feeling` | Overall mood and feeling | Emotional tone (professional, playful, elegant, modern, warm) | Drive overall design direction, font choices, spacing, imagery style |
| `color_preferences` | Color preferences | Colors they like or want to avoid | Primary/secondary color selection, avoid disliked colors |
| `brand_colors` | Existing brand colors or logo | If they have existing branding | **Must match** existing brand colors if they have them, incorporate logo |

---

## Optional Information (Nice to Have)

These items enhance the website but are not critical. Max may collect these if the conversation flows naturally.

### Business Information (Optional)

| Item Key | Label | Description | How Website Builder Should Use It |
|----------|-------|-------------|-----------------------------------|
| `unique_value` | What makes them unique | Their differentiators, unique value proposition | Create "why choose us" section, highlight in hero/about |
| `success_stories` | Success stories and results | Case studies, results achieved | Create testimonials section, case study pages, social proof |
| `testimonials` | Testimonials and social proof | Client reviews and feedback | Testimonial carousel, review badges, trust elements |

### Design Preferences (Optional)

| Item Key | Label | Description | How Website Builder Should Use It |
|----------|-------|-------------|-----------------------------------|
| `professional_image` | Formal vs casual style | Professional/formal or casual/friendly tone | Typography choices, imagery style, copy tone |
| `photo_style` | Photo and image style | Natural, professional, illustrated, etc. | Image selection, stock photo style, illustration vs photos |
| `aesthetic` | Minimal vs detailed | Clean/minimal or detailed/rich design | Component density, whitespace usage, decorative elements |
| `icon_style` | Icon style preference | Minimal, detailed, playful, professional | Icon set selection, icon weight/style |

---

## Data Format Examples

### Extracted Data Structure
```json
{
  "value": "יוגה עם אופיר",
  "confidence": "high",
  "source": "direct_mention"
}
```

### Full Text (Customer's Words)
The `full_text` field contains the customer's actual response, preserved in their original language (Hebrew/English). This is valuable for:
- Understanding nuance and tone
- Extracting exact quotes for testimonials
- Matching their voice in website copy

---

## Handling Missing Data

### If Required Item is "skipped"
- Customer said "I don't know" or skipped the question
- Website builder should use sensible defaults or generic content
- Flag for human review if critical

### If Required Item is "not_started"
- Max didn't get to this item (rare - indicates incomplete onboarding)
- Website builder should NOT proceed without this data
- Request re-engagement with customer

### If Optional Item is Missing
- Use defaults based on business type and industry
- Infer from other collected data where possible

---

## Priority Order for Website Building

When building the website, process data in this order:

### 1. Foundation (Design Direction)
1. `inspiration_sites` - Analyze first to understand desired style
2. `mood_feeling` - Sets the emotional direction
3. `brand_colors` - Must match if they exist
4. `color_preferences` - Apply if no brand colors

### 2. Structure (Content Architecture)
1. `business_name` - Header, title, branding
2. `services` - Main content sections
3. `target_audience` - Tailor all messaging

### 3. Messaging (Copy & Content)
1. `pain_points` - Problem-aware headlines
2. `solutions` - Solution-focused content
3. `about_story` - About page content
4. `unique_value` - Differentiators

### 4. Trust Elements
1. `testimonials` - Social proof sections
2. `success_stories` - Case studies/results

### 5. Polish (Visual Refinement)
1. `professional_image` - Tone refinement
2. `photo_style` - Image selection
3. `aesthetic` - Density/spacing
4. `icon_style` - Icon selection

---

## Database Query Example

To get all collected data for a customer:

```sql
SELECT
    item_key,
    item_label,
    status,
    extracted_data,
    full_text,
    is_required
FROM onboarding_checklist_items
WHERE customer_id = 'CUSTOMER_UUID'
ORDER BY priority;
```

---

## Integration Notes

### Customer Identification
- Each customer has a unique `customer_id` (UUID)
- Customer data is in the `customers` table
- Link via `customer_id` foreign key

### Conversation Context
- Full conversation history in `messages` table
- Useful for understanding context and extracting additional details
- Messages are ordered by `timestamp`

### Stage Tracking
- Current onboarding stage in `onboarding_progress` table
- Stages: "welcome", "business_info", "design_preferences", "content_collection", "review", "completed"

---

## Summary

**Total Items: 17**
- **Required: 10** (6 business + 4 design)
- **Optional: 7** (3 business + 4 design)

**Most Critical for Website Creation:**
1. `inspiration_sites` - Drives entire design direction
2. `business_name` - Core branding element
3. `services` - Main content structure
4. `mood_feeling` - Emotional design direction
5. `brand_colors` - Must match existing branding

**Can Use Defaults If Missing:**
- `icon_style` - Use based on mood
- `photo_style` - Infer from business type
- `aesthetic` - Default to clean/modern
- `professional_image` - Infer from business type
