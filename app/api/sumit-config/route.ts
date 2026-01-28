import { NextResponse } from "next/server";

/**
 * GET /api/sumit-config
 *
 * Proxies to dashboard API to get public SUMIT configuration
 */
export async function GET() {
  try {
    const dashboardUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.upgradeshop.ai";
    const response = await fetch(`${dashboardUrl}/api/public/sumit-config`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || "Failed to fetch SUMIT config" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("[SUMIT Config] Error fetching config:", error);
    return NextResponse.json(
      { error: "Failed to load payment configuration" },
      { status: 500 }
    );
  }
}
