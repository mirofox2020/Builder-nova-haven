import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Percent, Gift, Tag, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Coupon codes data (items with promo codes)
const allCoupons = [
  {
    id: "c1",
    title: "Apple Store - 10% Off Entire Purchase",
    description:
      "Save 10% on all Apple products including iPhone, iPad, Mac, and accessories. Valid for new customers only.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 10,
    merchant: "Apple",
    timePosted: "1h ago",
    votes: 89,
    comments: 12,
    promoCode: "APPLE10NEW",
    isAvailable: true,
    isFeatured: true,
    type: "coupon",
    category: "electronics",
    subcategory: "general",
  },
  {
    id: "c2",
    title: "Nike - $20 Off Orders Over $100",
    description:
      "Get $20 discount when you spend $100 or more on Nike shoes, apparel, and gear.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 20,
    merchant: "Nike",
    timePosted: "3h ago",
    votes: 156,
    comments: 23,
    promoCode: "NIKE20OFF",
    isAvailable: true,
    type: "coupon",
    category: "fashion",
    subcategory: "shoes",
  },
  {
    id: "c3",
    title: "Amazon - 15% Off Electronics",
    description:
      "Save 15% on electronics including laptops, phones, tablets, and smart home devices.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 15,
    merchant: "Amazon",
    timePosted: "5h ago",
    votes: 234,
    comments: 45,
    promoCode: "ELECTRONICS15",
    isAvailable: true,
    type: "coupon",
    category: "electronics",
    subcategory: "general",
  },
  {
    id: "c4",
    title: "Best Buy - Free Shipping + 5% Off",
    description:
      "Get free shipping on any order plus additional 5% off with student discount.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 5,
    merchant: "Best Buy",
    timePosted: "8h ago",
    votes: 67,
    comments: 8,
    promoCode: "STUDENT5",
    isAvailable: true,
    type: "coupon",
    category: "electronics",
    subcategory: "general",
  },
  {
    id: "c5",
    title: "Sony - 25% Off Headphones & Audio",
    description:
      "Save 25% on all Sony headphones, speakers, and audio equipment. Limited time offer.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 25,
    merchant: "Sony",
    timePosted: "12h ago",
    votes: 123,
    comments: 19,
    promoCode: "SONY25AUDIO",
    isAvailable: true,
    type: "coupon",
    category: "electronics",
    subcategory: "headphones",
  },
  {
    id: "c6",
    title: "LEGO - Buy 2 Get 1 Free",
    description:
      "Buy any 2 LEGO sets and get the third one free. Mix and match from entire collection.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 33,
    merchant: "LEGO",
    timePosted: "1d ago",
    votes: 198,
    comments: 34,
    promoCode: "LEGO3FOR2",
    isAvailable: true,
    type: "coupon",
    category: "toys-games",
    subcategory: "building-sets",
  },
  {
    id: "c7",
    title: "Samsung - Student Discount 20% Off",
    description:
      "Verify your student status and get 20% off Galaxy phones, tablets, and accessories.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 20,
    merchant: "Samsung",
    timePosted: "1d ago",
    votes: 145,
    comments: 28,
    promoCode: "STUDENT20",
    isAvailable: true,
    type: "coupon",
    category: "electronics",
    subcategory: "smartphones",
  },
  {
    id: "c8",
    title: "Microsoft - Office 365 Family Plan Discount",
    description:
      "Get 30% off Microsoft 365 Family subscription for first year. Includes all Office apps.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 30,
    merchant: "Microsoft",
    timePosted: "2d ago",
    votes: 92,
    comments: 15,
    promoCode: "OFFICE30FAM",
    isAvailable: true,
    type: "coupon",
    category: "electronics",
    subcategory: "software",
  },
  {
    id: "c9",
    title: "Adidas - 30% Off Sportswear Collection",
    description:
      "Save 30% on the latest Adidas sportswear, running shoes, and athletic gear.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 30,
    merchant: "Adidas",
    timePosted: "2d ago",
    votes: 178,
    comments: 31,
    promoCode: "ADIDAS30",
    isAvailable: true,
    type: "coupon",
    category: "fashion",
    subcategory: "activewear",
  },
  {
    id: "c10",
    title: "Target - $10 Off Home & Kitchen Items",
    description:
      "Get $10 off when you spend $50 or more on home and kitchen essentials.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 20,
    merchant: "Target",
    timePosted: "3d ago",
    votes: 134,
    comments: 21,
    promoCode: "HOME10OFF",
    isAvailable: true,
    type: "coupon",
    category: "home-kitchen",
    subcategory: "general",
  },
  {
    id: "c11",
    title: "PlayStation Store - 25% Off Games",
    description:
      "Save 25% on digital game downloads and DLC content. Valid for all platforms.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 25,
    merchant: "PlayStation",
    timePosted: "3d ago",
    votes: 267,
    comments: 48,
    promoCode: "GAMES25",
    isAvailable: true,
    type: "coupon",
    category: "electronics",
    subcategory: "gaming",
  },
  {
    id: "c12",
    title: "Sephora - Free Shipping + Beauty Samples",
    description:
      "Free shipping on any order plus 3 free beauty samples with orders over $35.",
    image: "/placeholder.svg",
    originalPrice: null,
    discountedPrice: null,
    discount: 0,
    merchant: "Sephora",
    timePosted: "4d ago",
    votes: 89,
    comments: 16,
    promoCode: "FREESHIP",
    isAvailable: true,
    type: "coupon",
    category: "health-beauty",
    subcategory: "makeup",
  },
];

const COUPONS_PER_PAGE = 6;

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
  adidas: "Adidas",
  target: "Target",
  playstation: "PlayStation",
  sephora: "Sephora",
};

const DiscountCodes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<{
    stores: string[];
    discountRanges: string[];
  }>({
    stores: [],
    discountRanges: [],
  });

  // Filter coupons based on selected filters
  const filteredCoupons = useMemo(() => {
    let filtered = allCoupons;

    // Filter by stores
    if (filters.stores.length > 0) {
      filtered = filtered.filter((coupon) => {
        const storeName = coupon.merchant;
        return filters.stores.some(
          (storeId) =>
            storeMapping[storeId]?.toLowerCase() === storeName.toLowerCase(),
        );
      });
    }

    // Filter by discount ranges
    if (filters.discountRanges.length > 0) {
      filtered = filtered.filter((coupon) => {
        return filters.discountRanges.some((rangeId) => {
          switch (rangeId) {
            case "10-20":
              return coupon.discount >= 10 && coupon.discount < 20;
            case "20-30":
              return coupon.discount >= 20 && coupon.discount < 30;
            case "30-40":
              return coupon.discount >= 30 && coupon.discount < 40;
            case "40-50":
              return coupon.discount >= 40 && coupon.discount < 50;
            case "50+":
              return coupon.discount >= 50;
            default:
              return false;
          }
        });
      });
    }

    return filtered;
  }, [filters]);

  const displayedCoupons = filteredCoupons.slice(
    0,
    currentPage * COUPONS_PER_PAGE,
  );
  const hasMoreCoupons = displayedCoupons.length < filteredCoupons.length;

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
                      <Percent className="h-6 w-6 text-white" />
                    </div>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      Discount Codes
                    </h1>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                  Discover the best discount codes and coupon offers from top
                  brands. Save money with verified promo codes for electronics,
                  fashion, home goods, and more.
                </p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-orange-500" />
                    <span>{allCoupons.length} active codes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <span>Updated daily</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-purple-500" />
                    <span>Verified offers</span>
                  </div>
                </div>
              </div>

              {/* Featured Codes Banner */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Percent className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      Featured Discount Codes
                    </h3>
                    <p className="text-sm text-gray-600">
                      Limited-time offers with the biggest savings
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {allCoupons
                    .filter((coupon) => coupon.isFeatured)
                    .slice(0, 3)
                    .map((coupon) => (
                      <div
                        key={coupon.id}
                        className="bg-white rounded-lg p-4 border border-orange-200"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">🏷️</span>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {coupon.merchant}
                            </p>
                            <p className="text-sm text-gray-600">
                              {coupon.discount}% off
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-100 rounded px-3 py-1 text-center">
                          <code className="text-sm font-mono font-bold text-gray-900">
                            {coupon.promoCode}
                          </code>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Coupons Grid */}
              <div className="space-y-6 lg:space-y-6">
                {displayedCoupons.length > 0 ? (
                  displayedCoupons.map((coupon) => (
                    <DealCard key={coupon.id} {...coupon} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center px-6 py-3 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl">
                      <Percent className="h-5 w-5 mr-3" />
                      No discount codes found with current filters. Try
                      adjusting your filter settings.
                    </div>
                  </div>
                )}
              </div>

              {/* Load More */}
              {hasMoreCoupons && (
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
                      `Load More Codes (${filteredCoupons.length - displayedCoupons.length} remaining)`
                    )}
                  </Button>
                </div>
              )}

              {/* All Codes Loaded Message */}
              {!hasMoreCoupons && displayedCoupons.length > 0 && (
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
                    You've seen all available discount codes! Check back later
                    for more.
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

export default DiscountCodes;
