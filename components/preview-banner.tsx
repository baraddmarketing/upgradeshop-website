"use client";

import { useState } from "react";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL ||
  process.env.NEXT_PUBLIC_PLATFORM_URL ||
  "https://app.upgradeshop.ai";

export function PreviewBanner({ token }: { token: string }) {
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);
  const [done, setDone] = useState(false);

  async function handleAction(action: "approve" | "reject") {
    setLoading(action);
    try {
      const res = await fetch(`${PLATFORM_URL}/api/public/preview/action`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, action }),
      });
      if (!res.ok) throw new Error("Failed");
      setDone(true);
      const url = new URL(window.location.href);
      url.searchParams.delete("preview");
      setTimeout(() => {
        window.location.href = url.toString();
      }, 1500);
    } catch {
      alert(action === "approve" ? "Error approving changes" : "Error rejecting changes");
      setLoading(null);
    }
  }

  if (done) {
    return (
      <div className="fixed top-0 inset-x-0 z-[9999] bg-green-600 text-white text-center py-3 px-4 text-sm font-medium shadow-lg">
        Changes published successfully! Reloading...
      </div>
    );
  }

  return (
    <div className="fixed top-0 inset-x-0 z-[9999] bg-amber-500 text-amber-950 text-center py-3 px-4 shadow-lg flex items-center justify-center gap-4 flex-wrap">
      <span className="text-sm font-bold">Preview Mode — Changes not yet published</span>
      <div className="flex gap-2">
        <button
          onClick={() => handleAction("approve")}
          disabled={loading !== null}
          className="bg-green-700 hover:bg-green-800 text-white text-sm font-bold px-4 py-1.5 rounded-md disabled:opacity-50 transition-colors"
        >
          {loading === "approve" ? "Publishing..." : "Approve & Publish"}
        </button>
        <button
          onClick={() => handleAction("reject")}
          disabled={loading !== null}
          className="bg-red-700 hover:bg-red-800 text-white text-sm font-bold px-4 py-1.5 rounded-md disabled:opacity-50 transition-colors"
        >
          {loading === "reject" ? "Rejecting..." : "Reject"}
        </button>
      </div>
    </div>
  );
}
