import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/Sidebar";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

// Extended sample deals data
const allDeals = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
    description:
      "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system. Free shipping included.",
    image: "/placeholder.svg",
    originalPrice: 1199,
    discountedPrice: 999,
    discount: 17,
    merchant: "eBay",
    timePosted: "2h ago",
    votes: 156,
    comments: 23,
    promoCode: "IPHONE15",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: 'Samsung 65" 4K QLED Smart TV - QN65Q80C',
    description:
      "Quantum HDR, Object Tracking Sound+, and Alexa Built-in. Perfect for gaming and streaming.",
    image: "/placeholder.svg",
    originalPrice: 1299,
    discountedPrice: 899,
    discount: 31,
    merchant: "Best Buy",
    timePosted: "4h ago",
    votes: 89,
    comments: 12,
    isAvailable: true,
  },
  {
    id: "3",
    title: 'Nike Air Jordan 1 Retro High OG "Chicago"',
    description:
      "Classic colorway in premium leather. Authentic Nike product with original packaging.",
    image: "/placeholder.svg",
    originalPrice: 170,
    discountedPrice: 119,
    discount: 30,
    merchant: "Nike",
    timePosted: "6h ago",
    votes: 234,
    comments: 45,
    promoCode: "JORDAN30",
    isAvailable: true,
  },
  {
    id: "4",
    title: 'MacBook Air 13" M2 Chip 8GB RAM 256GB SSD',
    description:
      "Ultra-thin laptop with M2 chip performance. Perfect for students and professionals.",
    image: "/placeholder.svg",
    originalPrice: 1199,
    discountedPrice: 949,
    discount: 21,
    merchant: "Amazon",
    timePosted: "8h ago",
    votes: 67,
    comments: 8,
    isAvailable: true,
  },
  {
    id: "5",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    description:
      "Industry-leading noise cancellation with 30-hour battery life and premium sound quality.",
    image: "/placeholder.svg",
    originalPrice: 399,
    discountedPrice: 279,
    discount: 30,
    merchant: "Sony",
    timePosted: "12h ago",
    votes: 145,
    comments: 19,
    promoCode: "SONY30OFF",
    isAvailable: true,
  },
  {
    id: "6",
    title: "LEGO Creator Expert Big Ben Building Kit",
    description:
      "Detailed replica of London's iconic clock tower. 4,163 pieces for experienced builders.",
    image: "/placeholder.svg",
    originalPrice: 249,
    discountedPrice: 199,
    discount: 20,
    merchant: "LEGO",
    timePosted: "1d ago",
    votes: 78,
    comments: 15,
    isAvailable: false,
  },
  // Additional deals for pagination
  {
    id: "7",
    title: "Google Pixel 8 Pro 256GB - Bay Blue",
    description:
      "AI-powered photography with Magic Eraser and Real Tone. Pure Android experience.",
    image: "/placeholder.svg",
    originalPrice: 999,
    discountedPrice: 699,
    discount: 30,
    merchant: "Google Store",
    timePosted: "1d ago",
    votes: 134,
    comments: 18,
    isAvailable: true,
  },
  {
    id: "8",
    title: "Dyson V15 Detect Cordless Vacuum Cleaner",
    description:
      "Laser technology reveals microscopic dust. Up to 60 minutes of runtime.",
    image: "/placeholder.svg",
    originalPrice: 749,
    discountedPrice: 549,
    discount: 27,
    merchant: "Dyson",
    timePosted: "1d ago",
    votes: 92,
    comments: 14,
    promoCode: "DYSON27",
    isAvailable: true,
  },
  {
    id: "9",
    title: "Microsoft Surface Pro 9 13-inch - Platinum",
    description:
      "Laptop versatility with tablet portability. Intel 12th Gen processors and all-day battery.",
    image: "/placeholder.svg",
    originalPrice: 1299,
    discountedPrice: 999,
    discount: 23,
    merchant: "Microsoft",
    timePosted: "2d ago",
    votes: 76,
    comments: 11,
    isAvailable: true,
  },
  {
    id: "10",
    title: "Nintendo Switch OLED Model - Neon Red/Blue",
    description:
      "Enhanced gaming experience with vibrant OLED screen and improved audio.",
    image: "/placeholder.svg",
    originalPrice: 349,
    discountedPrice: 299,
    discount: 14,
    merchant: "Nintendo",
    timePosted: "2d ago",
    votes: 198,
    comments: 31,
    isAvailable: true,
  },
  {
    id: "11",
    title: "Bose QuietComfort 45 Wireless Headphones",
    description:
      "World-class noise cancellation and premium audio quality for all-day comfort.",
    image: "/placeholder.svg",
    originalPrice: 329,
    discountedPrice: 229,
    discount: 30,
    merchant: "Bose",
    timePosted: "2d ago",
    votes: 87,
    comments: 16,
    promoCode: "BOSE30",
    isAvailable: true,
  },
  {
    id: "12",
    title: "Apple AirPods Pro 2nd Generation",
    description:
      "Enhanced Active Noise Cancellation and Adaptive Transparency with spatial audio.",
    image: "/placeholder.svg",
    originalPrice: 249,
    discountedPrice: 199,
    discount: 20,
    merchant: "Apple",
    timePosted: "3d ago",
    votes: 156,
    comments: 28,
    isAvailable: true,
  },
  {
    id: "13",
    title: "Samsung Galaxy Watch 6 Classic 47mm",
    description:
      "Advanced health monitoring with rotating bezel and premium design.",
    image: "/placeholder.svg",
    originalPrice: 429,
    discountedPrice: 329,
    discount: 23,
    merchant: "Samsung",
    timePosted: "3d ago",
    votes: 94,
    comments: 12,
    isAvailable: true,
  },
  {
    id: "14",
    title: "Tesla Model S Plaid Performance Upgrade",
    description:
      "Track-focused aerodynamics package with carbon fiber spoiler and brake upgrade.",
    image: "/placeholder.svg",
    originalPrice: 4999,
    discountedPrice: 3999,
    discount: 20,
    merchant: "Tesla",
    timePosted: "3d ago",
    votes: 312,
    comments: 67,
    isAvailable: true,
  },
  {
    id: "15",
    title: "Canon EOS R8 Mirrorless Camera Body",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor and 4K video recording.",
    image: "/placeholder.svg",
    originalPrice: 1499,
    discountedPrice: 1199,
    discount: 20,
    merchant: "Canon",
    timePosted: "4d ago",
    votes: 73,
    comments: 9,
    promoCode: "CANON20",
    isAvailable: true,
  },
];

const DEALS_PER_PAGE = 6;

const Index = () => {
  const [displayedDeals, setDisplayedDeals] = useState(
    allDeals.slice(0, DEALS_PER_PAGE),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const hasMoreDeals = displayedDeals.length < allDeals.length;

  const handleLoadMore = async () => {
    setIsLoading(true);

    // Simulate API loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const nextPage = currentPage + 1;
    const newDeals = allDeals.slice(0, nextPage * DEALS_PER_PAGE);

    setDisplayedDeals(newDeals);
    setCurrentPage(nextPage);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.05),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.05),transparent_50%)] pointer-events-none" />

      <Header />

      <main className="relative w-full">
        <div className="w-full py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="xl:col-span-3 space-y-6 lg:space-y-8">
              {/* Section Header */}
              <div className="space-y-3 text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                  Deals for you
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                  Discover the best deals, discounts, and offers from top
                  brands. Save money on electronics, fashion, home goods, and
                  more with our carefully curated selection.
                </p>
              </div>

              {/* Deals Grid */}
              <div className="space-y-6 lg:space-y-6">
                {displayedDeals.map((deal) => (
                  <DealCard key={deal.id} {...deal} />
                ))}
              </div>

              {/* Load More */}
              {hasMoreDeals && (
                <div className="text-center pt-8">
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      `Load More Deals (${allDeals.length - displayedDeals.length} remaining)`
                    )}
                  </Button>
                </div>
              )}

              {/* All Deals Loaded Message */}
              {!hasMoreDeals && (
                <div className="text-center pt-8">
                  <div className="inline-flex items-center px-6 py-3 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    You've seen all available deals! Check back later for more.
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Desktop Only */}
            <div className="hidden xl:block xl:col-span-1">
              <div className="sticky top-24 lg:top-28">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-16 w-full">
        <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Help</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Legal</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Follow Us
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="font-bold text-gray-900">DealsHub</span>
            </div>
            <p className="text-gray-600">
              &copy; 2024 DealsHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
