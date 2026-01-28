import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'upgradeshop',
  user: process.env.DB_USER || 'upgradeu_ops',
  password: process.env.DB_PASSWORD || '',
});

// Cache for 60 seconds
export const revalidate = 60;

/**
 * GET /api/products - Fetch products from the database
 *
 * This endpoint fetches products from the dashboard's database
 * and returns them in the format expected by the pricing page.
 */
export async function GET() {
  try {
    const client = await pool.connect();

    try {
      // Fetch products for UpgradeShop (customer_id = 00000000-0000-0000-0000-000000000001)
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

      const products = result.rows.map((row) => ({
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

      return NextResponse.json({ products }, {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
