// Analytics API client for fetching configuration from UpgradeShop platform

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL || "https://app.upgradeshop.ai";
const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "upgradeshop.ai";

export interface AnalyticsConfig {
  enabled: boolean;
  googleAnalyticsId?: string;
  metaPixelId?: string;
}

export interface WebsiteConfigResponse {
  found: boolean;
  analytics: AnalyticsConfig | null;
  googleSiteVerification?: string;
}

/**
 * Fetches full website configuration from the UpgradeShop platform.
 * Includes analytics config and Google Site Verification token.
 * Uses ISR with 60-second revalidation.
 */
export async function fetchWebsiteConfig(): Promise<WebsiteConfigResponse | null> {
  try {
    const url = `${PLATFORM_URL}/api/public/website-config?domain=${SITE_DOMAIN}`;
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.warn(`[Website Config API] Failed to fetch config: ${response.status}`);
      return null;
    }

    const data: WebsiteConfigResponse = await response.json();

    if (!data.found) {
      return null;
    }

    return data;
  } catch (error) {
    console.warn("[Website Config API] Error fetching config:", error);
    return null;
  }
}
