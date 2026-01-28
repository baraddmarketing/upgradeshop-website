"use client";

import { useEffect } from "react";

export function ScrollListener() {
  useEffect(() => {
    // Check if we're embedded in an iframe (editor mode)
    let isInIframe = false;
    try {
      isInIframe = window.self !== window.top;
    } catch (e) {
      // Cross-origin iframe will throw error when accessing window.top
      isInIframe = true;
    }

    // Handle messages from dashboard
    const handleMessage = (event: MessageEvent) => {
      // Security: Only accept messages from upgradeshop.ai dashboard
      if (!event.origin.includes("upgradeshop.ai")) {
        return;
      }

      if (event.data.type === "preview-update") {
        const { fieldId, content } = event.data;

        // Strip HTML tags for plain text display (Tiptap sends HTML)
        const stripHtml = (html: string): string => {
          if (!html) return html;
          return html
            .replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .trim();
        };

        // Find element by data-field-id attribute
        const element = document.querySelector(`[data-field-id="${fieldId}"]`);

        if (element) {
          if (element instanceof HTMLImageElement) {
            element.src = content;
          } else {
            // Strip HTML tags before displaying
            element.textContent = stripHtml(content);
          }
        }
      } else if (event.data.type === "scroll-to-section") {
        const { sectionKey } = event.data;

        // Find section by data-section-key attribute
        const targetSection = document.querySelector(`[data-section-key="${sectionKey}"]`);
        console.log("[ScrollListener] Scrolling to section:", sectionKey, "found:", !!targetSection);

        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
          console.log("[ScrollListener] Scrolled to section");
        } else {
          console.log("[ScrollListener] Section not found");
        }
      } else if (event.data.type === "highlight-section") {
        const { sectionKey, highlight } = event.data;

        // Find section by data-section-key attribute
        const section = document.querySelector(`[data-section-key="${sectionKey}"]`) as HTMLElement;

        if (section) {
          if (highlight) {
            section.style.outline = "2px solid #3b82f6";
            section.style.outlineOffset = "4px";
          } else {
            section.style.outline = "";
            section.style.outlineOffset = "";
          }
        }
      }
    };

    // Handle clicks to select sections (only in editor/iframe mode)
    const handleClick = (e: MouseEvent) => {
      // Check iframe status dynamically each time
      let inIframe = false;
      try {
        inIframe = window.self !== window.top;
      } catch (err) {
        inIframe = true;
      }

      if (!inIframe) return;

      const target = e.target as HTMLElement;
      const section = target.closest("[data-section-key]");

      if (section instanceof HTMLElement && section.dataset.sectionKey) {
        // Send message to parent dashboard
        window.parent.postMessage(
          {
            type: "section-clicked",
            sectionKey: section.dataset.sectionKey,
          },
          "*" // Parent origin validated on receive side
        );
      }
    };

    window.addEventListener("message", handleMessage);
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("message", handleMessage);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
