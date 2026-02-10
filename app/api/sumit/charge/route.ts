import { NextRequest, NextResponse } from "next/server";

const APP_API_URL = process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL || "https://app.staging.upgradeshop.ai";

interface ChargeRequest {
  token: string;
  orderId: string;
  amount: number;
  currency?: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
}

/**
 * POST /api/sumit/charge
 *
 * Proxies charge request to dashboard which has access to private SUMIT API key
 */
export async function POST(request: NextRequest) {
  try {
    const body: ChargeRequest = await request.json();
    const { token, orderId, amount, currency = "USD", customer, items } = body;

    console.log("[Charge Proxy] Request received:", { orderId, amount, currency });
    console.log("[Charge Proxy] Currency type:", typeof currency, "| value:", currency);

    if (!token || !orderId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const proxyBody = {
      token,
      orderId,
      amount,
      currency,
      customer,
      items,
    };
    console.log("[Charge Proxy] Sending to dashboard:", JSON.stringify(proxyBody, null, 2));

    // Proxy to dashboard's charge endpoint which has access to private API key
    const chargeResponse = await fetch(`${APP_API_URL}/api/public/sumit/charge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proxyBody),
    });

    const chargeResult = await chargeResponse.json();

    if (!chargeResponse.ok) {
      console.error("[Charge Proxy] Dashboard charge failed:", chargeResult);
      return NextResponse.json(
        {
          success: false,
          error: chargeResult.error || "Payment failed"
        },
        { status: chargeResponse.status }
      );
    }

    return NextResponse.json(chargeResult);

  } catch (error) {
    console.error("[Charge Proxy] Error processing payment:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
