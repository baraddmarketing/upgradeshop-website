import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * On-demand cache revalidation endpoint
 *
 * Called by the UpgradeShop dashboard after content is saved
 * to immediately update the cached page content.
 *
 * POST /api/revalidate
 * Body: { path: "/", secret: "..." }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, secret } = body;

    // Validate the revalidation secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: "Invalid revalidation secret" },
        { status: 401 }
      );
    }

    if (!path) {
      return NextResponse.json(
        { error: "Path is required" },
        { status: 400 }
      );
    }

    // Revalidate the specified path
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { error: "Failed to revalidate" },
      { status: 500 }
    );
  }
}

/**
 * Health check for the revalidation endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "revalidate",
    timestamp: new Date().toISOString(),
  });
}
