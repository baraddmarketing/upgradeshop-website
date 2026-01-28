import { NextRequest, NextResponse } from "next/server";

const SUMIT_API_URL = "https://api.sumit.co.il";
const APP_API_URL = process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL || "https://app.staging.upgradeshop.ai";

interface ChargeRequest {
  token: string;
  orderId: string;
  amount: number;
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

interface SumitChargeResponse {
  Status: number; // 0 = success
  UserErrorMessage?: string;
  TechnicalErrorDetails?: string;
  Data?: {
    PaymentID: number;
    DocumentID: number;
    AuthNum: string;
    CardOwnerName?: string;
    CardLastDigits?: string;
    CardExpirationMonth?: number;
    CardExpirationYear?: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ChargeRequest = await request.json();
    const { token, orderId, amount, customer, items } = body;

    if (!token || !orderId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get SUMIT credentials from the dashboard API
    const configResponse = await fetch(`${APP_API_URL}/api/public/sumit-config`);

    if (!configResponse.ok) {
      console.error("Failed to fetch SUMIT config:", await configResponse.text());
      return NextResponse.json(
        { error: "Payment system not configured" },
        { status: 500 }
      );
    }

    const config = await configResponse.json();

    // We need the private APIKey for charging - fetch from internal endpoint
    // For now, we'll proxy through the dashboard's charge endpoint
    const chargeResponse = await fetch(`${APP_API_URL}/api/public/sumit/charge`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        orderId,
        amount,
        customer,
        items,
        companyId: config.companyId,
      }),
    });

    const chargeResult = await chargeResponse.json();

    if (!chargeResponse.ok) {
      console.error("SUMIT charge failed:", chargeResult);
      return NextResponse.json(
        {
          success: false,
          error: chargeResult.error || "Payment failed"
        },
        { status: chargeResponse.status }
      );
    }

    return NextResponse.json({
      success: true,
      paymentId: chargeResult.paymentId,
      documentId: chargeResult.documentId,
      orderId,
    });

  } catch (error) {
    console.error("Error processing SUMIT charge:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}
