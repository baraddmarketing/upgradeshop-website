import Link from "next/link";
import { Container } from "./container";
import { MessageCircle, Mail, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const productLinks = [
  { href: "/pricing#website", label: "Website Builder" },
  { href: "/pricing#crm", label: "CRM" },
  { href: "/pricing#email", label: "Email Marketing" },
  { href: "/pricing#whatsapp", label: "WhatsApp Integration" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <span className="text-foreground font-bold text-sm">U</span>
              </div>
              <span className="font-display text-xl font-semibold">
                The Upgrade Shop
              </span>
            </Link>
            <p className="text-primary-foreground/70 leading-relaxed text-sm mb-6">
              Your digital infrastructure partner. We build it, manage it, and keep improving it — so you can focus on what you do best.
            </p>
            <p className="text-gold text-sm font-medium">
              Handled.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Products
            </h4>
            <nav className="flex flex-col gap-2">
              {productLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="https://wa.me/message/..."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors text-sm group"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <Link
                href="mailto:hello@upgradeshop.ai"
                className="flex items-center gap-2 text-primary-foreground/70 hover:text-gold transition-colors text-sm group"
              >
                <Mail className="h-4 w-4" />
                <span>hello@upgradeshop.ai</span>
                <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-sm text-primary-foreground/70 mb-2">
                Need help now?
              </p>
              <p className="text-sm text-primary-foreground">
                Chat with Max 24/7
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/50 text-sm">
            &copy; {currentYear} The Upgrade Shop. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
