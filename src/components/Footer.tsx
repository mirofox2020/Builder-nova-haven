import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Heart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Zap,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,165,0,0.1),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(219,39,119,0.1),transparent_50%)] pointer-events-none" />

      {/* Newsletter Section */}
      <div className="relative border-b border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div
              className={
                'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-20'
              }
            ></div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Never Miss a Deal!
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Get exclusive deals, flash sales, and money-saving tips
                delivered straight to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30 focus:border-white/50 h-12 text-lg"
                />
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 font-bold h-12 px-8 whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </div>
              <p className="text-sm text-white/70 mt-4">
                Join 50K+ subscribers • Unsubscribe anytime • No spam, ever
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold text-white">DealsHub</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Your ultimate destination for the best deals, exclusive discounts,
              and money-saving opportunities.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-12 h-12 bg-white/10 hover:bg-orange-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 hover:bg-pink-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { label: "Browse Deals", href: "/deals" },
                { label: "Discount Codes", href: "/discount-codes" },
                { label: "Categories", href: "/categories" },
                { label: "Hot Deals", href: "/?filter=hottest" },
                { label: "Trending", href: "/?filter=trending" },
                { label: "Submit Deal", href: "/submit" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Support</h3>
            <ul className="space-y-4">
              {[
                { label: "Help Center", href: "/help" },
                { label: "Contact Us", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Submit Feedback", href: "/feedback" },
                { label: "Report Issue", href: "/report" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email us at</p>
                  <a
                    href="mailto:hello@dealshub.com"
                    className="text-white hover:text-orange-400 transition-colors duration-200"
                  >
                    hello@dealshub.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Call us</p>
                  <a
                    href="tel:+1-555-DEALS"
                    className="text-white hover:text-orange-400 transition-colors duration-200"
                  >
                    +1 (555) DEALS
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Visit us</p>
                  <p className="text-white">
                    123 Savings Street
                    <br />
                    Deal City, DC 12345
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-gray-400">
              <p className="text-center md:text-left">
                © 2024 DealsHub. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a
                  href="/privacy"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="hover:text-orange-400 transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>for deal hunters</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
