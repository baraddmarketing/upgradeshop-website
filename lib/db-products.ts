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
 * Fetch products directly from database
 * Used in Server Components for optimal performance
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
        compare_at_price,
        prices,
        product_type,
        is_featured,
        category,
        metadata
      FROM store.products
      WHERE customer_id = '00000000-0000-0000-0000-000000000001'
        AND status = 'active'
      ORDER BY position ASC
    `);

    return result.rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.name,
      shortDescription: row.short_description || row.description?.substring(0, 100) || '',
      description: row.description || '',
      price: row.price ? parseFloat(row.price) : 0,
      compareAtPrice: row.compare_at_price ? parseFloat(row.compare_at_price) : undefined,
      prices: row.prices || null,
      billingCycle: 'monthly' as const,
      features: row.metadata?.features || [],
      isPopular: row.is_featured || false,
      category: (row.metadata?.category || 'module') as 'module' | 'addon',
      requires: row.metadata?.requires,
    }));
  } catch (error) {
    console.error('Error fetching products from database:', error);
    // Return empty array on error, components will fall back to static data
    return [];
  } finally {
    if (client) client.release();
  }
}
