"use client";

import { useState, useEffect, useRef } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Language,
  LANGUAGES,
  getCurrentLanguage,
  saveLanguage,
  updateHtmlAttributes,
} from "@/lib/i18n";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "desktop" | "mobile";
  onLanguageChange?: (lang: Language) => void;
}

export function LanguageSwitcher({
  className,
  variant = "desktop",
  onLanguageChange,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>("en");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Get current language on mount
    const lang = getCurrentLanguage();
    setCurrentLang(lang);
    updateHtmlAttributes(lang);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang: Language) => {
    setCurrentLang(lang);
    saveLanguage(lang);
    updateHtmlAttributes(lang);
    setIsOpen(false);
    onLanguageChange?.(lang);

    // Trigger a page reload to apply currency changes across all components
    // This ensures all price displays update correctly
    window.location.reload();
  };

  const currentConfig = LANGUAGES[currentLang];

  if (variant === "mobile") {
    return (
      <div className={cn("flex flex-col gap-2", className)}>
        <span className="text-sm text-foreground/60 font-medium">Language</span>
        <div className="flex gap-2">
          {Object.values(LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={cn(
                "flex-1 py-2 px-4 rounded-lg border transition-colors font-medium",
                currentLang === lang.code
                  ? "bg-gold border-gold text-foreground"
                  : "bg-background border-border text-foreground/70 hover:border-gold/50"
              )}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-foreground/70 hover:text-foreground transition-colors py-1 px-2 rounded-lg hover:bg-sand/50"
        aria-label="Select language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">{currentConfig.code.toUpperCase()}</span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-background border border-border rounded-xl shadow-lg overflow-hidden min-w-[140px] z-50">
          {Object.values(LANGUAGES).map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className={cn(
                "w-full flex items-center justify-between gap-3 px-4 py-2.5 text-left transition-colors",
                currentLang === lang.code
                  ? "bg-gold/10 text-foreground"
                  : "hover:bg-sand text-foreground/70 hover:text-foreground"
              )}
            >
              <span className="font-medium">{lang.nativeName}</span>
              {currentLang === lang.code && (
                <Check className="h-4 w-4 text-gold" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
