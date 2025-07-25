import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Gift, TrendingUp, Tag, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

// Deals data (items without promo codes or specific product deals)
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
    isAvailable: true,
    isFeatured: true,
    type: "deal",
    category: "electronics",
    subcategory: "smartphones",
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
    type: "deal",
    category: "electronics",
    subcategory: "tv-audio",
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
    isAvailable: true,
    type: "deal",
    category: "fashion",
    subcategory: "shoes",
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
    type: "deal",
    category: "electronics",
    subcategory: "laptops",
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
    isAvailable: true,
    type: "deal",
    category: "electronics",
    subcategory: "headphones",
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
    type: "deal",
    category: "toys-games",
    subcategory: "building-sets",
  },
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
    type: "deal",
    category: "electronics",
    subcategory: "smartphones",
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
    isAvailable: true,
    type: "deal",
    category: "home-kitchen",
    subcategory: "appliances",
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
    type: "deal",
    category: "electronics",
    subcategory: "laptops",
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
    type: "deal",
    category: "electronics",
    subcategory: "gaming",
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
    isAvailable: true,
    type: "deal",
    category: "electronics",
    subcategory: "headphones",
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
    type: "deal",
    category: "electronics",
    subcategory: "headphones",
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
    type: "deal",
    category: "electronics",
    subcategory: "wearables",
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
    type: "deal",
    category: "automotive",
    subcategory: "parts",
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
    isAvailable: true,
    type: "deal",
    category: "electronics",
    subcategory: "cameras",
  },
];

const DEALS_PER_PAGE = 6;

// Store name mapping for filtering
const storeMapping: { [key: string]: string } = {
  amazon: "Amazon",
  bestbuy: "Best Buy",
  walmart: "Walmart",
  nike: "Nike",
  sony: "Sony",
  apple: "Apple",
  ebay: "eBay",
  lego: "LEGO",
  google: "Google Store",
  dyson: "Dyson",
  microsoft: "Microsoft",
  nintendo: "Nintendo",
  bose: "Bose",
  samsung: "Samsung",
  tesla: "Tesla",
  canon: "Canon",
};

const Deals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    stores: string[];
    discountRanges: string[];
  }>({
    stores: [],
    discountRanges: [],
  });

  // Filter deals based on selected filters
  const filteredDeals = useMemo(() => {
    let filtered = allDeals;

    // Filter by stores
    if (filters.stores.length > 0) {
      filtered = filtered.filter((deal) => {
        const storeName = deal.merchant;
        return filters.stores.some(
          (storeId) =>
            storeMapping[storeId]?.toLowerCase() === storeName.toLowerCase(),
        );
      });
    }

    // Filter by discount ranges
    if (filters.discountRanges.length > 0) {
      filtered = filtered.filter((deal) => {
        return filters.discountRanges.some((rangeId) => {
          switch (rangeId) {
            case "10-20":
              return deal.discount >= 10 && deal.discount < 20;
            case "20-30":
              return deal.discount >= 20 && deal.discount < 30;
            case "30-40":
              return deal.discount >= 30 && deal.discount < 40;
            case "40-50":
              return deal.discount >= 40 && deal.discount < 50;
            case "50+":
              return deal.discount >= 50;
            default:
              return false;
          }
        });
      });
    }

    return filtered;
  }, [filters]);

  const displayedDeals = filteredDeals.slice(0, currentPage * DEALS_PER_PAGE);
  const hasMoreDeals = displayedDeals.length < filteredDeals.length;

  const handleLoadMore = async () => {
    setIsLoading(true);

    // Simulate API loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    setIsLoading(false);
  };

  const handleFiltersChange = (newFilters: {
    stores: string[];
    discountRanges: string[];
  }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
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
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl flex items-center justify-center">
                      <Gift className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      Deals for you
                    </h1>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                  Discover the best deals, discounts, and offers from top
                  brands. Save money on electronics, fashion, home goods, and
                  more with our carefully curated selection.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-orange-500" />
                    <span>{allDeals.length} active deals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Updated hourly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-red-500" />
                    <span>Hot offers</span>
                  </div>
                </div>
              </div>

              {/* Featured Deals Banner */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Flame className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Hot Deals Right Now
                    </h3>
                    <p className="text-sm text-gray-600">
                      Limited-time offers with the biggest discounts
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {allDeals
                    .filter((deal) => deal.discount >= 30)
                    .slice(0, 3)
                    .map((deal) => (
                      <div
                        key={deal.id}
                        className="bg-white rounded-lg p-4 border border-blue-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <img
                            src={deal.image}
                            alt={deal.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-sm line-clamp-1">
                              {deal.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {deal.merchant}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-green-600">
                              ${deal.discountedPrice}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${deal.originalPrice}
                            </span>
                          </div>
                          <Badge className="bg-red-100 text-red-700">
                            {deal.discount}% off
                          </Badge>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Deals Grid */}
              <div className="space-y-6 lg:space-y-6">
                {displayedDeals.length > 0 ? (
                  displayedDeals.map((deal) => (
                    <DealCard key={deal.id} {...deal} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center px-6 py-3 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl">
                      <Gift className="h-5 w-5 mr-3" />
                      No deals found with current filters. Try adjusting your
                      filter settings.
                    </div>
                  </div>
                )}
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
                      `Load More Deals (${filteredDeals.length - displayedDeals.length} remaining)`
                    )}
                  </Button>
                </div>
              )}

              {/* All Deals Loaded Message */}
              {!hasMoreDeals && displayedDeals.length > 0 && (
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

export default Deals;
