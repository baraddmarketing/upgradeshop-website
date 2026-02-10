"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShoppingCart, AlertCircle, CheckCircle2, ChevronDown, MapPin } from "lucide-react";
import { formatPriceSimple as formatPrice } from "@/lib/currency";

const PLATFORM_URL = process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL || "https://app.staging.upgradeshop.ai";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anahata.staging.upgradeshop.ai";

interface PaymentPageCheckoutProps {
  paymentPage: any;
  slug: string;
}

export function PaymentPageCheckout({ paymentPage, slug }: PaymentPageCheckoutProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [viewId, setViewId] = useState<string | null>(null);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Address fields (optional)
  const [showAddress, setShowAddress] = useState(false);
  const [company, setCompany] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Track page view on mount
  useEffect(() => {
    const recordView = async () => {
      try {
        const domain = new URL(SITE_URL).hostname;
        const response = await fetch(
          `${PLATFORM_URL}/api/public/payment-pages/${slug}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              domain,
              visitorIp: null, // Server will capture this
              userAgent: navigator.userAgent,
              referrer: document.referrer,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Store view ID if needed for conversion tracking
          if (data.viewId) {
            setViewId(data.viewId);
          }
        }
      } catch (error) {
        console.error("Failed to record view:", error);
      }
    };

    recordView();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!termsAccepted) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      const domain = new URL(SITE_URL).hostname;
      const response = await fetch(
        `${PLATFORM_URL}/api/public/payment-pages/${slug}/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            domain,
            customerData: {
              firstName,
              lastName,
              email,
              phone,
              // Include address if any field is filled
              ...(company || street || city || postalCode || country ? {
                address: {
                  company: company || undefined,
                  street: street || undefined,
                  city: city || undefined,
                  postalCode: postalCode || undefined,
                  country: country || undefined,
                }
              } : {}),
            },
            viewId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Checkout failed");
      }

      const result = await response.json();

      // Show success
      setSuccess(true);

      // Redirect after delay
      setTimeout(() => {
        if (result.redirectUrl) {
          window.location.href = result.redirectUrl;
        } else if (paymentPage.customSuccessMessage) {
          // Stay on page with success message
        } else {
          // Default: go to home
          router.push("/");
        }
      }, 2000);
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check for restrictions
  const hasRestrictions =
    paymentPage.restrictions?.expiresAt || paymentPage.restrictions?.usageRemaining !== null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column - Products & Summary */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              {paymentPage.title}
            </CardTitle>
            {paymentPage.description && (
              <CardDescription>{paymentPage.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Products List */}
            <div className="space-y-4">
              {paymentPage.items.map((item: any) => (
                <div key={item.product.id} className="flex gap-4">
                  {item.product.image_url && (
                    <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.product.image_url}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    {item.product.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.product.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </span>
                      {item.effectivePrice < item.originalPrice && (
                        <>
                          <span className="text-sm line-through text-muted-foreground">
                            {formatPrice(item.originalPrice, item.product.currency)}
                          </span>
                          <span className="text-sm font-medium text-green-600">
                            {formatPrice(item.effectivePrice, item.product.currency)}
                          </span>
                        </>
                      )}
                      {item.effectivePrice === item.originalPrice && (
                        <span className="text-sm font-medium">
                          {formatPrice(item.effectivePrice, item.product.currency)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            {/* Coupon */}
            {paymentPage.coupon && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  Coupon: <code className="font-mono">{paymentPage.coupon.code}</code>
                </span>
                <span className="text-green-600">Applied</span>
              </div>
            )}

            {/* Price Summary */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span>{formatPrice(paymentPage.subtotal, paymentPage.items[0]?.product.currency || "ILS")}</span>
              </div>
              {paymentPage.discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Discount:</span>
                  <span>-{formatPrice(paymentPage.discount, paymentPage.items[0]?.product.currency || "ILS")}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatPrice(paymentPage.total, paymentPage.items[0]?.product.currency || "ILS")}</span>
              </div>
            </div>

            {/* Restrictions Notice */}
            {hasRestrictions && (
              <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t">
                {paymentPage.restrictions.expiresAt && (
                  <p>
                    Expires: {new Date(paymentPage.restrictions.expiresAt).toLocaleDateString()}
                  </p>
                )}
                {paymentPage.restrictions.usageRemaining !== null && (
                  <p>
                    Limited availability: {paymentPage.restrictions.usageRemaining} remaining
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Checkout Form */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
            <CardDescription>Complete your purchase</CardDescription>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center py-8 space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
                <h3 className="text-xl font-semibold">Order Placed Successfully!</h3>
                {paymentPage.customSuccessMessage ? (
                  <p className="text-muted-foreground">{paymentPage.customSuccessMessage}</p>
                ) : (
                  <p className="text-muted-foreground">
                    Thank you for your purchase. You'll receive a confirmation email shortly.
                  </p>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
                    <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}

                {/* First Name */}
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                {/* Address Section (Optional) */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => setShowAddress(!showAddress)}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Add Address Details (Optional)
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${showAddress ? "rotate-180" : ""}`}
                    />
                  </Button>

                  {showAddress && (
                    <div className="space-y-3 pt-2 border-t">
                      {/* Company */}
                      <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Optional"
                        />
                      </div>

                      {/* Street */}
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="Optional"
                        />
                      </div>

                      {/* City */}
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Optional"
                        />
                      </div>

                      {/* Postal Code & Country (side by side) */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            placeholder="Optional"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-2">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the terms and conditions and privacy policy
                  </label>
                </div>

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="h-4 w-4 me-2 animate-spin" />}
                  {loading ? "Processing..." : `Pay ${formatPrice(paymentPage.total, paymentPage.items[0]?.product.currency || "ILS")}`}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Secure checkout powered by Anahata
                </p>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
