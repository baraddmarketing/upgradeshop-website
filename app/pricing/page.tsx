import { fetchProductsFromDB } from '@/lib/db-products';
import { mergeWithStaticProducts } from '@/lib/fetch-products';
import { modules, websiteAddons, landingPageProduct } from '@/lib/products';
import PricingClient from './pricing-client';

// Enable ISR - page will be regenerated every 60 seconds
export const revalidate = 60;

export default async function PricingPage() {
  // Fetch products directly from database
  const dbProducts = await fetchProductsFromDB();

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
  const mergedLandingPage = dbLandingPage
    ? { ...landingPageProduct, ...dbLandingPage }
    : landingPageProduct;

  return (
    <PricingClient
      modules={mergedModules}
      websiteAddons={mergedAddons}
      landingPageProduct={mergedLandingPage}
    />
  );
}
