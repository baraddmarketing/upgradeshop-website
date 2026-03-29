import { Pool } from 'pg';
import { Product } from './products';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'upgradeshop',
  user: process.env.DB_USER || 'upgradeu_ops',
  password: process.env.DB_PASSWORD || '',
});

/**
 * Fetch products directly from database (source of truth)
 * Used in Server Components for optimal performance.
 * Database prices always override any static fallback.
 */
export async function fetchProductsFromDB(): Promise<Product[]> {
  let client;

  try {
    client = await pool.connect();

    const result = await client.query(`
      SELECT
        id,
        name,
        slug,
        description,
        short_description,
        price,
        sale_price,
        prices,
        product_type,
        billing_cycle,
        parent_product_id,
        addon_type,
        is_featured,
        metadata
      FROM store.products
      WHERE customer_id = '00000000-0000-0000-0000-000000000001'
        AND status = 'active'
      ORDER BY name ASC
    `);

    return result.rows.map((row) => {
      // Determine category from DB structure
      let category: Product['category'] = 'module';
      if (row.metadata?.category) {
        category = row.metadata.category;
      } else if (row.parent_product_id) {
        category = 'website-addon';
      } else if (row.slug?.startsWith('ai-actions-')) {
        category = 'ai-actions' as Product['category'];
      } else if (!row.billing_cycle) {
        category = 'service';
      } else if (row.metadata?.is_bundle) {
        category = 'bundle';
      }

      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        shortDescription: row.short_description || row.description?.substring(0, 100) || '',
        description: row.description || '',
        price: row.price ? parseFloat(row.price) : 0,
        compareAtPrice: row.sale_price ? parseFloat(row.sale_price) : undefined,
        prices: row.metadata?.currency_prices || row.prices || null,
        billingCycle: row.billing_cycle ? 'monthly' as const : 'one-time' as const,
        features: row.metadata?.features || [],
        category,
        requires: row.metadata?.requires,
        isBundle: row.metadata?.is_bundle || false,
        pricePrefix: row.metadata?.price_prefix,
      };
    });
  } catch (error) {
    console.error('[db-products] Error fetching products:', error);
    return [];
  } finally {
    if (client) client.release();
  }
}

/**
 * Fetch store exchange rates from database
 * Returns a map of currency code → units per 1 USD (e.g. { ILS: 3.1 })
 */
export async function fetchStoreExchangeRates(): Promise<Record<string, number>> {
  let client;

  try {
    client = await pool.connect();

    const result = await client.query(`
      SELECT settings->'currency'->'exchangeRates' as exchange_rates
      FROM store.configs
      WHERE customer_id = '00000000-0000-0000-0000-000000000001'
    `);

    const raw = result.rows[0]?.exchange_rates;
    if (!raw) return {};

    const rates: Record<string, number> = {};
    for (const [k, v] of Object.entries(raw)) {
      const num = Number(v);
      if (!isNaN(num) && num > 0) rates[k] = num;
    }
    return rates;
  } catch (error) {
    console.error('[db-products] Error fetching exchange rates:', error);
    return {};
  } finally {
    if (client) client.release();
  }
}

