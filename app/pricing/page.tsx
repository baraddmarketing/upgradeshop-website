import { fetchProductsFromDB, fetchWebsiteVariantsFromDB, fetchStoreExchangeRates } from '@/lib/db-products';
import { enrichWithStaticData } from '@/lib/fetch-products';
import { modules, websiteAddons, landingPageAddons, landingPageProduct } from '@/lib/products';
import PricingClient from './pricing-client';

// Enable ISR - page will be regenerated every 60 seconds
export const revalidate = 60;

export default async function PricingPage() {
  // Database is the source of truth - fetch everything from there
  const [dbProducts, websiteVariants, exchangeRates] = await Promise.all([
    fetchProductsFromDB(),
    fetchWebsiteVariantsFromDB(),
    fetchStoreExchangeRates(),
  ]);

  // Enrich DB products with static features (DB prices always win)
  const allDbProducts = enrichWithStaticData(dbProducts);

  // Group products by their database category
  // If DB is empty (connection error), fall back to static products
  const hasDbData = allDbProducts.length > 0;

  const finalModules = hasDbData
    ? allDbProducts.filter(p => p.category === 'module')
    : modules;

  const finalWebsiteAddons = hasDbData
    ? allDbProducts.filter(p => p.category === 'website-addon')
    : websiteAddons;

  const finalLandingPageAddons = hasDbData
    ? allDbProducts.filter(p => p.category === 'landing-addon')
    : landingPageAddons;

  const finalAiAgentProduct = hasDbData
    ? allDbProducts.find(p => p.category === 'ai-agent') || null
    : null;

  const finalLandingPage = hasDbData
    ? allDbProducts.find(p => p.category === 'landing-page') || landingPageProduct
    : landingPageProduct;

  // Create a map of website variant prices by USD price (to match with static tiers)
  const variantPriceMap: Record<number, Record<string, number> | null> = {};
  websiteVariants.forEach(v => {
    variantPriceMap[v.price] = v.prices;
  });

  return (
    <PricingClient
      modules={finalModules}
      websiteAddons={finalWebsiteAddons}
      landingPageAddons={finalLandingPageAddons}
      aiAgentProduct={finalAiAgentProduct}
      landingPageProduct={finalLandingPage}
      websiteVariantPrices={variantPriceMap}
      exchangeRates={exchangeRates}
    />
  );
}
