"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, AlertCircle, CreditCard, Lock } from "lucide-react";

// SUMIT JavaScript API types (OfficeGuy.Payments)
declare global {
  interface Window {
    OfficeGuy?: {
      Payments: {
        BindFormSubmit: (config: SumitBindConfig) => void;
        CreateToken: (config: SumitBindConfig) => boolean;
        InitEditors: (selector?: string) => void;
      };
    };
    jQuery?: any;
  }
}

interface SumitBindConfig {
  CompanyID: number;
  APIPublicKey: string;
  FormSelector: string;
  Environment?: "api" | "dev";
  ErrorsClass?: string;
  ResponseLanguage?: string;
  Callback?: (token: string | null) => void;
  ResponseCallback?: (response: SumitTokenResponse) => void;
  IgnoreBind?: () => boolean;
}

interface SumitTokenResponse {
  Status: number; // 0 = success
  UserErrorMessage?: string;
  TechnicalErrorDetails?: string;
  Data?: {
    SingleUseToken: string;
  };
}

interface SumitPaymentProps {
  companyId: number;
  apiPublicKey: string;
  orderId: string;
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
  total: number;
  currency?: string; // Currency code (e.g., "USD", "ILS")
  country: string; // ISO country code (e.g., "IL" for Israel)
  onSuccess: (response: { token: string; orderId: string }) => void;
  onCancel?: () => void;
  onError?: (error: string) => void;
  isTest?: boolean;
}

export function SumitPayment({
  companyId,
  apiPublicKey,
  orderId,
  customer,
  items,
  total,
  currency = "USD",
  country,
  onSuccess,
  onCancel,
  onError,
  isTest = false,
}: SumitPaymentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [formBound, setFormBound] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const boundRef = useRef(false);

  // Load jQuery (required by SUMIT SDK)
  useEffect(() => {
    if (window.jQuery) {
      loadSumitSDK();
      return;
    }

    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    jqueryScript.async = true;

    jqueryScript.onload = () => {
      loadSumitSDK();
    };

    jqueryScript.onerror = () => {
      setError("Failed to load payment dependencies.");
      setIsLoading(false);
      onError?.("Failed to load jQuery");
    };

    document.head.appendChild(jqueryScript);

    return () => {
      if (jqueryScript.parentNode) {
        jqueryScript.parentNode.removeChild(jqueryScript);
      }
    };
  }, []);

  const loadSumitSDK = () => {
    if (window.OfficeGuy?.Payments) {
      console.log("[SUMIT] SDK already loaded");
      setSdkLoaded(true);
      setIsLoading(false);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://app.sumit.co.il/scripts/payments.js";
    script.async = true;

    script.onload = () => {
      console.log("[SUMIT] SDK script loaded");
      setSdkLoaded(true);
      setIsLoading(false);
    };

    script.onerror = () => {
      setError("Failed to load payment system. Please try again.");
      setIsLoading(false);
      onError?.("Failed to load SUMIT SDK");
    };

    document.head.appendChild(script);
  };

  // Bind SUMIT to the form AFTER both the SDK is loaded AND the form is in the DOM
  useEffect(() => {
    if (!sdkLoaded || !formRef.current || boundRef.current) return;
    if (!window.OfficeGuy?.Payments) {
      console.error("[SUMIT] SDK loaded flag set but OfficeGuy not available");
      setError("Payment system not available");
      return;
    }

    boundRef.current = true;
    console.log("[SUMIT] Binding form - SDK loaded and form is in DOM");

    try {
      window.OfficeGuy.Payments.InitEditors("#sumit-payment-form");
      console.log("[SUMIT] Card editors initialized");

      window.OfficeGuy.Payments.BindFormSubmit({
        CompanyID: companyId,
        APIPublicKey: apiPublicKey,
        FormSelector: "#sumit-payment-form",
        Environment: isTest ? "dev" : "api",
        ErrorsClass: ".og-errors",
        ResponseLanguage: "he",
        ResponseCallback: handleTokenResponse,
      });
      console.log("[SUMIT] Form binding complete");
      setFormBound(true);
    } catch (err) {
      console.error("[SUMIT] Initialization error:", err);
      setError("Failed to initialize payment. Please try again.");
      onError?.("Initialization failed");
    }
  }, [sdkLoaded]);

  const handleTokenResponse = async (response: SumitTokenResponse) => {
    console.log("[SUMIT] Token response received:", response);

    if (response.Status !== 0) {
      // Error from SUMIT
      const errorMsg = response.UserErrorMessage || response.TechnicalErrorDetails || "Payment failed";
      console.error("[SUMIT] Token error:", errorMsg);
      setError(errorMsg);
      setIsProcessing(false);
      onError?.(errorMsg);
      return;
    }

    const token = response.Data?.SingleUseToken;
    if (!token) {
      setError("Failed to process card. Please try again.");
      setIsProcessing(false);
      onError?.("No token received");
      return;
    }

    // Token received successfully - now charge the card via server
    try {
      const chargeResponse = await fetch("/api/sumit/charge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          orderId,
          amount: total,
          currency,
          customer,
          items,
        }),
      });

      const chargeResult = await chargeResponse.json();

      if (!chargeResponse.ok || !chargeResult.success) {
        throw new Error(chargeResult.error || "Payment failed");
      }

      // Payment successful!
      onSuccess({ token, orderId });
    } catch (err: any) {
      console.error("[SUMIT] Charge error:", err);
      setError(err.message || "Payment failed. Please try again.");
      setIsProcessing(false);
      onError?.(err.message);
    }
  };

  // SUMIT's BindFormSubmit handles form submission automatically.
  // We just track the processing state via the submit button click.
  const handlePayClick = () => {
    console.log("[SUMIT] Pay button clicked, SUMIT SDK will handle form submission");
    setError(null);
    setIsProcessing(true);

    // If SUMIT doesn't respond within 30 seconds, reset
    setTimeout(() => {
      setIsProcessing((current) => {
        if (current) {
          console.warn("[SUMIT] Payment timeout - no response received");
          setError("Payment timed out. Please try again.");
        }
        return false;
      });
    }, 30000);
  };

  return (
    <div className="space-y-6">
      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
          <p className="text-foreground/60">Loading secure payment form...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-600 font-medium">Payment Error</p>
            <p className="text-red-600/80 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Payment Form - always in DOM so SUMIT can bind to it, hidden while loading */}
      <form
        ref={formRef}
        id="sumit-payment-form"
        data-og="form"
        className={`space-y-6 ${isLoading ? 'hidden' : ''}`}
      >
          {/* Card Number */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Card Number
            </label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
              <input
                type="text"
                data-og="cardnumber"
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                className="w-full pl-10 pr-4 py-3 bg-background border border-foreground/20 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                required
                autoComplete="cc-number"
              />
            </div>
          </div>

          {/* Expiry and CVV Row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Expiry Month */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Month
              </label>
              <select
                data-og="expirationmonth"
                className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                required
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const month = (i + 1).toString().padStart(2, "0");
                  return (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Expiry Year */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Year
              </label>
              <select
                data-og="expirationyear"
                className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                required
              >
                <option value="">YY</option>
                {Array.from({ length: 15 }, (_, i) => {
                  const year = (new Date().getFullYear() + i).toString().slice(-2);
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* CVV */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                CVV
              </label>
              <input
                type="text"
                data-og="cvv"
                placeholder="123"
                maxLength={4}
                className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                required
                autoComplete="cc-csc"
              />
            </div>
          </div>

          {/* ID Number (required for Israeli credit cards) */}
          {country === "IL" && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                ID Number
              </label>
              <input
                type="text"
                data-og="citizenid"
                placeholder="Enter your ID number"
                maxLength={9}
                className="w-full px-4 py-3 bg-background border border-foreground/20 rounded-xl focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                autoComplete="off"
              />
              <p className="text-xs text-foreground/50">
                Required for Israeli credit cards
              </p>
            </div>
          )}

          {/* Error display for SUMIT - SDK injects errors here */}
          <div className="og-errors text-red-600 text-sm font-medium min-h-[24px] p-2 bg-red-50 rounded-lg empty:hidden border border-red-200"></div>

          {/* Submit Button - type="submit" triggers SUMIT's BindFormSubmit */}
          <button
            type="submit"
            disabled={isProcessing || !formBound}
            onClick={handlePayClick}
            className="w-full py-4 bg-gold hover:bg-gold-dark text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                Pay {currency === 'ILS' ? '₪' : '$'}{total.toFixed(currency === 'ILS' ? 0 : 2)}
              </>
            )}
          </button>
        </form>

      {/* Security Notice */}
      <div className="bg-card/50 rounded-xl p-4">
        <p className="text-foreground/60 text-sm text-center flex items-center justify-center gap-2">
          <Lock className="h-4 w-4" />
          Your payment is securely processed by SUMIT. We never store your card details.
        </p>
      </div>
    </div>
  );
}
