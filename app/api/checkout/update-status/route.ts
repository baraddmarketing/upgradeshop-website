import { NextRequest, NextResponse } from "next/server";

const APP_API_URL = process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL || "https://app.staging.upgradeshop.ai";

/**
 * POST /api/checkout/update-status
 *
 * Proxies to dashboard's post-payment endpoint which:
 * 1. Updates order status to paid
 * 2. Creates subscriptions for subscription products
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${APP_API_URL}/api/public/sumit/post-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("[Update Status] Dashboard post-payment failed:", result);
      return NextResponse.json(
        { success: false, error: result.error || "Failed to update order" },
        { status: response.status }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("[Update Status] Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
