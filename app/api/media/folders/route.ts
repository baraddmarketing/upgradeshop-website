import { NextRequest, NextResponse } from "next/server";
import { rm, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const apiKey = request.headers.get("X-API-Key");

    // Verify API key
    if (apiKey !== process.env.UPLOAD_API_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { parentPath, name } = body;

    if (!name) {
      return NextResponse.json({ error: "Folder name is required" }, { status: 400 });
    }

    // Construct folder path
    const folderPath = parentPath
      ? join(process.cwd(), "public", "images", parentPath, name)
      : join(process.cwd(), "public", "images", name);

    // Create folder
    await mkdir(folderPath, { recursive: true });

    const relativePath = parentPath ? `${parentPath}/${name}` : name;

    return NextResponse.json({
      success: true,
      folder: {
        name,
        path: relativePath,
      },
    });
  } catch (error) {
    console.error("Create folder error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Create folder failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const apiKey = request.headers.get("X-API-Key");
    const url = new URL(request.url);
    const path = url.searchParams.get("path");

    console.log("[Delete Folder API] Request received - path:", path);

    // Verify API key
    if (apiKey !== process.env.UPLOAD_API_KEY) {
      console.error("[Delete Folder API] Invalid API key");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!path) {
      console.error("[Delete Folder API] No path provided");
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Construct absolute folder path
    // Path comes as "gallery" or "photos/originals"
    const folderPath = join(process.cwd(), "public", "images", path);

    console.log("[Delete Folder API] Deleting folder:", folderPath);

    // Delete the folder recursively
    await rm(folderPath, { recursive: true, force: true });

    console.log("[Delete Folder API] Folder deleted successfully");

    return NextResponse.json({
      success: true,
      message: "Folder deleted successfully",
    });
  } catch (error) {
    console.error("[Delete Folder API] Error:", error);

    // If folder doesn't exist, that's ok
    if ((error as any)?.code === "ENOENT") {
      console.log("[Delete Folder API] Folder not found, considering it deleted");
      return NextResponse.json({
        success: true,
        message: "Folder not found (already deleted)",
      });
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Delete failed" },
      { status: 500 }
    );
  }
}
