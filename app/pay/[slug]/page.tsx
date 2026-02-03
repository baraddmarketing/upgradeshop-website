import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentPageCheckout } from "@/components/payment-pages/payment-page-checkout";

const PLATFORM_URL = process.env.NEXT_PUBLIC_UPGRADESHOP_API_URL || "https://app.staging.upgradeshop.ai";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://anahata.staging.upgradeshop.ai";

interface PageProps {
  params: { slug: string };
}

async function fetchPaymentPage(slug: string) {
  try {
    const domain = new URL(SITE_URL).hostname;
    const response = await fetch(
      `${PLATFORM_URL}/api/public/payment-pages/${slug}?domain=${domain}`,
      {
        next: { revalidate: 60 }, // ISR with 60 second revalidation
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.found ? data.paymentPage : null;
  } catch (error) {
    console.error("Error fetching payment page:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const paymentPage = await fetchPaymentPage(params.slug);

  if (!paymentPage) {
    return {
      title: "Payment Page Not Found",
    };
  }

  return {
    title: paymentPage.title,
    description: paymentPage.description || `Checkout for ${paymentPage.title}`,
  };
}

export default async function PaymentPagePage({ params }: PageProps) {
  const paymentPage = await fetchPaymentPage(params.slug);

  if (!paymentPage) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <PaymentPageCheckout paymentPage={paymentPage} slug={params.slug} />
      </div>
    </div>
  );
}
