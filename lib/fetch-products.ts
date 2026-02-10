import { Product, allProducts } from './products';

/**
 * Enrich database products with static features/descriptions when DB doesn't have them.
 *
 * The database is the source of truth for prices. Static products.ts is only used
 * as fallback for features and descriptions that aren't yet stored in the database.
 */
export function enrichWithStaticData(dbProducts: Product[]): Product[] {
  return dbProducts.map((dbProduct) => {
    const staticProduct = allProducts.find((p) => p.id === dbProduct.id);
    if (!staticProduct) return dbProduct;

    return {
      ...staticProduct,       // Start with static (features, descriptions)
      ...dbProduct,           // Override with everything from DB
      price: dbProduct.price, // Explicit: DB price always wins
      prices: dbProduct.prices,
      // Use DB features if available, otherwise fall back to static
      features: dbProduct.features.length > 0 ? dbProduct.features : staticProduct.features,
    };
  });
}

/**
 * @deprecated Use enrichWithStaticData instead. Kept for backwards compatibility.
 */
export function mergeWithStaticProducts(
  dbProducts: Product[],
  staticProducts: Product[]
): Product[] {
  return enrichWithStaticData(dbProducts.length > 0 ? dbProducts : staticProducts);
}
