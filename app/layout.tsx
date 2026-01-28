import type { Metadata } from "next";
import { Newsreader, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/components/cart/cart-provider";
import { ScrollListener } from "@/components/scroll-listener";

// Body font - elegant, readable serif
const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display font - Plus Jakarta Sans for headings (modern, professional, warm)
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Upgrade Shop | Your Digital Foundation, Handled",
  description:
    "Professional digital infrastructure for small businesses. We build it for you, manage it for you, and keep improving it. Focus on what you do best — we handle the rest.",
  keywords: [
    "digital infrastructure",
    "small business",
    "website builder",
    "CRM",
    "email marketing",
    "WhatsApp business",
    "managed services",
  ],
  openGraph: {
    title: "The Upgrade Shop | Your Digital Foundation, Handled",
    description:
      "Professional digital infrastructure for small businesses. Focus on what you do best — we handle the rest.",
    url: "https://upgradeshop.ai",
    siteName: "The Upgrade Shop",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${plusJakartaSans.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <ScrollListener />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
