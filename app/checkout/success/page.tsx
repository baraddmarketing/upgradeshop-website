"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, MessageCircle, Mail } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber") || "Your order";
  const pendingPayment = searchParams.get("pendingPayment") === "true";

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-8"
          >
            <CheckCircle className="h-10 w-10 text-green-600" />
          </motion.div>

          {/* Heading */}
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Thank You for Your Order!
          </h1>

          {/* Pending Payment Notice */}
          {pendingPayment && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
              <p className="text-amber-900 text-sm">
                <strong>Payment Pending:</strong> Your order has been created successfully.
                We'll send you a secure payment link via email within the hour.
              </p>
            </div>
          )}

          {/* Order Number */}
          <div className="inline-block bg-card rounded-xl px-6 py-3 mb-8">
            <p className="text-foreground/60 text-sm mb-1">Order Number</p>
            <p className="font-display text-xl font-semibold text-foreground">
              {orderNumber}
            </p>
          </div>

          {/* What's Next */}
          <div className="bg-card rounded-2xl p-8 mb-8 text-left">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
              What Happens Next?
            </h2>

            <ol className="space-y-4">
              {[
                {
                  step: "1",
                  title: "Check Your Email",
                  description:
                    "We've sent a confirmation email with your order details and payment instructions.",
                },
                {
                  step: "2",
                  title: "Complete Payment",
                  description:
                    "You'll receive a secure payment link within the hour. Pay at your convenience.",
                },
                {
                  step: "3",
                  title: "Meet Max",
                  description:
                    "Our AI assistant Max will reach out to start your onboarding. Max will gather your requirements and connect you with our team.",
                },
                {
                  step: "4",
                  title: "Go Live",
                  description:
                    "Typically within 1-2 weeks, your setup will be complete and live. We'll handle everything.",
                },
              ].map((item) => (
                <li key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-gold font-semibold text-sm">
                      {item.step}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-foreground/60 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://wa.me/message/..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card rounded-xl text-foreground hover:bg-foreground/5 transition-colors"
            >
              <MessageCircle className="h-5 w-5 text-green-600" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href="mailto:hello@upgradeshop.ai"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-card rounded-xl text-foreground hover:bg-foreground/5 transition-colors"
            >
              <Mail className="h-5 w-5 text-gold" />
              <span>Email Us</span>
            </a>
          </div>

          {/* Back to Home */}
          <Link href="/">
            <Button
              variant="ghost"
              className="text-foreground/60 hover:text-foreground"
            >
              Return to Homepage
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground/60">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
