import { Product } from './products';

const API_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://upgradeshop.ai';

/**
 * Fetch products from the database via API
 *
 * This function is used in Server Components to fetch real-time product data
 * from the dashboard's database. ISR caching is handled by the API route.
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_URL}/api/products`, {
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!response.ok) {
      console.error('Failed to fetch products from API, falling back to static data');
      // Fallback to static products if API fails
      return [];
    }

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    // Return empty array on error, components will fall back to static data
    return [];
  }
}

/**
 * Merge database products with static product definitions
 *
 * This ensures we always have product data even if the database is empty
 * or unavailable. Database prices override static prices.
 */
export function mergeWithStaticProducts(
  dbProducts: Product[],
  staticProducts: Product[]
): Product[] {
  const merged = [...staticProducts];

  dbProducts.forEach((dbProduct) => {
    const index = merged.findIndex((p) => p.id === dbProduct.id);
    if (index >= 0) {
      // Update existing product with database data
      merged[index] = {
        ...merged[index],
        ...dbProduct,
        price: dbProduct.price, // Always use database price
        prices: dbProduct.prices,
        features: dbProduct.features.length > 0 ? dbProduct.features : merged[index].features,
      };
    } else {
      // Add new product from database
      merged.push(dbProduct);
    }
  });

  return merged;
}
