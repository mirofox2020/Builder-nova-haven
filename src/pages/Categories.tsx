import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Filter,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, Category } from "@/data/categories";

// Enhanced deals data with category and subcategory information
const allCategoryDeals = [
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
    category: "electronics",
    subcategory: "smartphones",
    type: "deal",
  },
  {
    id: "2",
    title: "Samsung Galaxy Buds2 Pro Wireless Earbuds",
    description:
      "Active noise cancellation, premium sound quality, and long battery life.",
    image: "/placeholder.svg",
    originalPrice: 229,
    discountedPrice: 149,
    discount: 35,
    merchant: "Best Buy",
    timePosted: "4h ago",
    votes: 89,
    comments: 12,
    isAvailable: true,
    category: "electronics",
    subcategory: "headphones",
    type: "deal",
  },
  {
    id: "3",
    title: "Sony WH-1000XM5 Wireless Headphones",
    description:
      "Industry-leading noise cancellation with 30-hour battery life.",
    image: "/placeholder.svg",
    originalPrice: 399,
    discountedPrice: 279,
    discount: 30,
    merchant: "Sony",
    timePosted: "6h ago",
    votes: 234,
    comments: 45,
    promoCode: "SONY30OFF",
    isAvailable: true,
    category: "electronics",
    subcategory: "headphones",
    type: "deal",
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
    category: "electronics",
    subcategory: "laptops",
    type: "deal",
  },
  {
    id: "5",
    title: "iPad Pro 12.9-inch M2 Wi-Fi 128GB",
    description:
      "Most advanced iPad with M2 chip, Liquid Retina XDR display, and Apple Pencil support.",
    image: "/placeholder.svg",
    originalPrice: 1099,
    discountedPrice: 899,
    discount: 18,
    merchant: "Apple",
    timePosted: "10h ago",
    votes: 123,
    comments: 19,
    isAvailable: true,
    category: "electronics",
    subcategory: "tablets",
    type: "deal",
  },
  {
    id: "6",
    title: "Canon EOS R8 Mirrorless Camera Body",
    description:
      "Full-frame mirrorless camera with 24.2MP sensor and 4K video recording.",
    image: "/placeholder.svg",
    originalPrice: 1499,
    discountedPrice: 1199,
    discount: 20,
    merchant: "Canon",
    timePosted: "12h ago",
    votes: 73,
    comments: 9,
    promoCode: "CANON20",
    isAvailable: true,
    category: "electronics",
    subcategory: "cameras",
    type: "deal",
  },
  {
    id: "7",
    title: "PlayStation 5 Console Digital Edition",
    description:
      "Experience lightning-fast loading with ultra-high speed SSD and ray tracing.",
    image: "/placeholder.svg",
    originalPrice: 399,
    discountedPrice: 349,
    discount: 13,
    merchant: "PlayStation",
    timePosted: "14h ago",
    votes: 298,
    comments: 67,
    isAvailable: true,
    category: "electronics",
    subcategory: "gaming",
    type: "deal",
  },
  {
    id: "8",
    title: 'Samsung 65" QLED 4K Smart TV',
    description:
      "Quantum HDR, Object Tracking Sound+, and Alexa Built-in. Perfect for gaming and streaming.",
    image: "/placeholder.svg",
    originalPrice: 1299,
    discountedPrice: 899,
    discount: 31,
    merchant: "Best Buy",
    timePosted: "16h ago",
    votes: 156,
    comments: 32,
    isAvailable: true,
    category: "electronics",
    subcategory: "tv-audio",
    type: "deal",
  },
  {
    id: "9",
    title: "Nike Air Jordan 1 Retro High OG",
    description:
      "Classic colorway in premium leather. Authentic Nike product with original packaging.",
    image: "/placeholder.svg",
    originalPrice: 170,
    discountedPrice: 119,
    discount: 30,
    merchant: "Nike",
    timePosted: "1d ago",
    votes: 234,
    comments: 45,
    promoCode: "JORDAN30",
    isAvailable: true,
    category: "fashion",
    subcategory: "shoes",
    type: "deal",
  },
  {
    id: "10",
    title: "Levi's 501 Original Jeans",
    description:
      "Classic straight-leg jeans with authentic 501 styling. Available in multiple washes.",
    image: "/placeholder.svg",
    originalPrice: 89,
    discountedPrice: 59,
    discount: 34,
    merchant: "Levi's",
    timePosted: "1d ago",
    votes: 89,
    comments: 12,
    isAvailable: true,
    category: "fashion",
    subcategory: "mens-clothing",
    type: "deal",
  },
  {
    id: "11",
    title: "KitchenAid Stand Mixer Classic Series",
    description:
      "Professional-grade stand mixer with 4.5-quart stainless steel bowl. Perfect for baking.",
    image: "/placeholder.svg",
    originalPrice: 379,
    discountedPrice: 279,
    discount: 26,
    merchant: "KitchenAid",
    timePosted: "1d ago",
    votes: 167,
    comments: 28,
    isAvailable: true,
    category: "home-kitchen",
    subcategory: "appliances",
    type: "deal",
  },
  {
    id: "12",
    title: "Dyson V15 Detect Cordless Vacuum",
    description:
      "Laser technology reveals microscopic dust. Up to 60 minutes of runtime.",
    image: "/placeholder.svg",
    originalPrice: 749,
    discountedPrice: 549,
    discount: 27,
    merchant: "Dyson",
    timePosted: "2d ago",
    votes: 145,
    comments: 22,
    isAvailable: true,
    category: "home-kitchen",
    subcategory: "appliances",
    type: "deal",
  },
];

const DEALS_PER_PAGE = 6;

const Categories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [category, setCategory] = useState<Category | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      const foundCategory = categories.find((cat) => cat.id === categoryId);
      setCategory(foundCategory || null);
      setSelectedSubcategory("all"); // Reset subcategory filter when category changes
      setCurrentPage(1); // Reset pagination
    }
  }, [categoryId]);

  // Filter deals based on category and subcategory
  const filteredDeals = useMemo(() => {
    let filtered = allCategoryDeals;

    // Filter by category
    if (category) {
      filtered = filtered.filter((deal) => deal.category === category.id);
    }

    // Filter by subcategory if selected
    if (selectedSubcategory !== "all") {
      filtered = filtered.filter(
        (deal) => deal.subcategory === selectedSubcategory,
      );
    }

    return filtered;
  }, [category, selectedSubcategory]);

  const displayedDeals = filteredDeals.slice(0, currentPage * DEALS_PER_PAGE);
  const hasMoreDeals = displayedDeals.length < filteredDeals.length;

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API loading delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentPage(currentPage + 1);
    setIsLoading(false);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    setSelectedSubcategory(subcategoryId);
    setCurrentPage(1); // Reset pagination when filter changes
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <Header />
        <main className="relative w-full">
          <div className="w-full py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Category Not Found
              </h1>
              <p className="text-gray-600 mb-6">
                The category you're looking for doesn't exist or has been moved.
              </p>
              <div className="flex gap-3 justify-center">
                <Button onClick={() => window.history.back()}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/")}
                >
                  Browse All Deals
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              {/* Category Header */}
              <div className="space-y-3 text-center lg:text-left">
                <div className="flex items-center gap-4 mb-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.history.back()}
                    className="hover:bg-gray-100"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      {category.name}
                    </h1>
                  </div>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                  Discover the best deals in {category.name.toLowerCase()}. Save
                  money with our carefully curated selection of verified offers
                  and discounts.
                </p>
              </div>

              {/* Subcategory Filters */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filter by Category
                  </h2>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ChevronLeft className="h-3 w-3" />
                    <span>Slide to see more</span>
                    <ChevronRight className="h-3 w-3" />
                  </div>
                </div>
                <div className="relative">
                  {/* Left Scroll Indicator */}
                  <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-white to-transparent pointer-events-none opacity-50 z-10" />

                  {/* Horizontal Scrollable Container */}
                  <div
                    id="filter-container"
                    className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth px-4"
                  >
                    <div className="flex gap-3 min-w-max">
                      {/* All Categories Filter */}
                      <Button
                        variant={
                          selectedSubcategory === "all" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleSubcategoryChange("all")}
                        className={cn(
                          "flex items-center gap-2 whitespace-nowrap transition-all duration-200 flex-shrink-0",
                          selectedSubcategory === "all"
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                            : "hover:bg-gray-50",
                        )}
                      >
                        <span className="text-lg">🏷️</span>
                        <span>All</span>
                        <Badge
                          variant="secondary"
                          className="bg-white/20 text-white border-0"
                        >
                          {filteredDeals.length}
                        </Badge>
                      </Button>

                      {/* Subcategory Filters */}
                      {category.subcategories.map((subcategory) => {
                        const subcategoryCount = allCategoryDeals.filter(
                          (deal) =>
                            deal.category === category.id &&
                            deal.subcategory === subcategory.id,
                        ).length;

                        if (subcategoryCount === 0) return null;

                        return (
                          <Button
                            key={subcategory.id}
                            variant={
                              selectedSubcategory === subcategory.id
                                ? "default"
                                : "outline"
                            }
                            size="sm"
                            onClick={() =>
                              handleSubcategoryChange(subcategory.id)
                            }
                            className={cn(
                              "flex items-center gap-2 whitespace-nowrap transition-all duration-200 flex-shrink-0",
                              selectedSubcategory === subcategory.id
                                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                                : "hover:bg-gray-50",
                            )}
                          >
                            <span className="text-lg">{subcategory.icon}</span>
                            <span>{subcategory.name}</span>
                            <Badge
                              variant="secondary"
                              className={cn(
                                "text-xs",
                                selectedSubcategory === subcategory.id
                                  ? "bg-white/20 text-white border-0"
                                  : "bg-gray-100 text-gray-600",
                              )}
                            >
                              {subcategoryCount}
                            </Badge>
                          </Button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Scroll Indicator */}
                  <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-50 z-10" />

                  {/* Scroll Buttons for Desktop */}
                  <button
                    onClick={() => {
                      const container =
                        document.getElementById("filter-container");
                      if (container) {
                        container.scrollBy({ left: -200, behavior: "smooth" });
                      }
                    }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-1 shadow-sm z-20 hidden lg:flex items-center justify-center"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-600" />
                  </button>

                  <button
                    onClick={() => {
                      const container =
                        document.getElementById("filter-container");
                      if (container) {
                        container.scrollBy({ left: 200, behavior: "smooth" });
                      }
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-1 shadow-sm z-20 hidden lg:flex items-center justify-center"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Active Filter Display */}
              {selectedSubcategory !== "all" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    Showing deals for:
                  </span>
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <span>
                      {
                        category.subcategories.find(
                          (sub) => sub.id === selectedSubcategory,
                        )?.icon
                      }
                    </span>
                    <span>
                      {
                        category.subcategories.find(
                          (sub) => sub.id === selectedSubcategory,
                        )?.name
                      }
                    </span>
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSubcategoryChange("all")}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear filter
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Found {filteredDeals.length} deals
                  {selectedSubcategory !== "all" && (
                    <span>
                      {" "}
                      in{" "}
                      {
                        category.subcategories.find(
                          (sub) => sub.id === selectedSubcategory,
                        )?.name
                      }
                    </span>
                  )}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  More Filters
                </Button>
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
                      <span className="text-2xl mr-3">🔍</span>
                      No deals found in this category. Try browsing other
                      subcategories or check back later for new deals.
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
                    You've seen all available deals in this category! Check back
                    later for more.
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

export default Categories;
