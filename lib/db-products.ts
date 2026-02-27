import { Pool } from 'pg';
import { Product, WebsiteTier } from './products';

export interface WebsiteVariant {
  id: string;
  title: string;
  sku: string;
  price: number;
  prices: Record<string, number> | null;
}

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
        is_featured,
        metadata
      FROM store.products
      WHERE customer_id = '00000000-0000-0000-0000-000000000001'
        AND status = 'active'
      ORDER BY name ASC
    `);

    return result.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      shortDescription: row.short_description || row.description?.substring(0, 100) || '',
      description: row.description || '',
      price: row.price ? parseFloat(row.price) : 0,
      compareAtPrice: row.sale_price ? parseFloat(row.sale_price) : undefined,
      prices: row.metadata?.currency_prices || row.prices || null,
      billingCycle: 'monthly' as const,
      features: row.metadata?.features || [],
      category: (row.metadata?.category || 'module') as Product['category'],
      requires: row.metadata?.requires,
    }));
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

/**
 * Fetch website variants (tiers) from database
 * Returns variants with their ILS prices for the Website variable product
 */
export async function fetchWebsiteVariantsFromDB(): Promise<WebsiteVariant[]> {
  let client;

  try {
    client = await pool.connect();

    const result = await client.query(`
      SELECT
        v.id,
        v.title,
        v.sku,
        v.price,
        v.prices
      FROM store.product_variants v
      JOIN store.products p ON v.product_id = p.id
      WHERE p.customer_id = '00000000-0000-0000-0000-000000000001'
        AND p.name = 'Website'
        AND p.product_type = 'variable'
      ORDER BY v.price ASC
    `);

    return result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      sku: row.sku,
      price: row.price ? parseFloat(row.price) : 0,
      prices: row.prices || null,
    }));
  } catch (error) {
    console.error('Error fetching website variants from database:', error);
    return [];
  } finally {
    if (client) client.release();
  }
}
