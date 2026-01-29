import { fetchProductsFromDB, fetchWebsiteVariantsFromDB } from '@/lib/db-products';
import { mergeWithStaticProducts } from '@/lib/fetch-products';
import { modules, websiteAddons, landingPageProduct } from '@/lib/products';
import PricingClient from './pricing-client';

// Enable ISR - page will be regenerated every 60 seconds
export const revalidate = 60;

export default async function PricingPage() {
  // Fetch products and website variants from database
  const [dbProducts, websiteVariants] = await Promise.all([
    fetchProductsFromDB(),
    fetchWebsiteVariantsFromDB(),
  ]);

  console.log('[pricing] Got', dbProducts.length, 'products from DB');
  console.log('[pricing] Got', websiteVariants.length, 'website variants from DB');

  // Merge with static products (database prices override static prices)
  const mergedModules = mergeWithStaticProducts(
    dbProducts.filter(p => p.category === 'module' && p.id !== landingPageProduct.id),
    modules
  );

  const mergedAddons = mergeWithStaticProducts(
    dbProducts.filter(p => p.category === 'addon'),
    websiteAddons
  );

  // Check if landing page product has updated price in database
  const dbLandingPage = dbProducts.find(p => p.id === landingPageProduct.id);
  console.log('[pricing] landingPageProduct.id:', landingPageProduct.id);
  console.log('[pricing] dbLandingPage found:', !!dbLandingPage);
  if (dbLandingPage) {
    console.log('[pricing] dbLandingPage.price:', dbLandingPage.price);
  }

  const mergedLandingPage = dbLandingPage
    ? { ...landingPageProduct, ...dbLandingPage }
    : landingPageProduct;

  console.log('[pricing] mergedLandingPage.price:', mergedLandingPage.price);

  // Create a map of website variant prices by USD price (to match with static tiers)
  const variantPriceMap: Record<number, Record<string, number> | null> = {};
  websiteVariants.forEach(v => {
    variantPriceMap[v.price] = v.prices;
  });

  return (
    <PricingClient
      modules={mergedModules}
      websiteAddons={mergedAddons}
      landingPageProduct={mergedLandingPage}
      websiteVariantPrices={variantPriceMap}
    />
  );
}
