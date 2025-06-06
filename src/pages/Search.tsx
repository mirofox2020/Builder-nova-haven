import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  RefreshCw,
  Search as SearchIcon,
  Filter,
  X,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced search database with all types of content
const searchDatabase = {
  deals: [
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
      tags: [
        "apple",
        "iphone",
        "smartphone",
        "titanium",
        "pro max",
        "mobile",
        "phone",
        "ios",
      ],
    },
    {
      id: "2",
      title: "Samsung Galaxy S24 Ultra 512GB",
      description:
        "Latest Samsung flagship with S Pen and incredible camera system. Features AI-enhanced photography.",
      image: "/placeholder.svg",
      originalPrice: 1399,
      discountedPrice: 1099,
      discount: 21,
      merchant: "Best Buy",
      timePosted: "4h ago",
      votes: 89,
      comments: 12,
      promoCode: "SAMSUNG21",
      isAvailable: true,
      category: "electronics",
      subcategory: "smartphones",
      type: "deal",
      tags: [
        "samsung",
        "galaxy",
        "smartphone",
        "s pen",
        "android",
        "mobile",
        "phone",
        "camera",
      ],
    },
    {
      id: "3",
      title: "Sony WH-1000XM5 Wireless Headphones",
      description:
        "Industry-leading noise cancellation with 30-hour battery life and premium sound quality.",
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
      tags: [
        "sony",
        "headphones",
        "wireless",
        "noise cancellation",
        "audio",
        "music",
        "bluetooth",
      ],
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
      tags: [
        "apple",
        "macbook",
        "laptop",
        "m2",
        "computer",
        "mac",
        "ultrabook",
        "portable",
      ],
    },
    {
      id: "5",
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
      tags: [
        "nike",
        "jordan",
        "shoes",
        "sneakers",
        "basketball",
        "retro",
        "high",
        "leather",
      ],
    },
    {
      id: "6",
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
      tags: [
        "playstation",
        "ps5",
        "gaming",
        "console",
        "digital",
        "sony",
        "games",
        "entertainment",
      ],
    },
    {
      id: "7",
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
      tags: [
        "kitchenaid",
        "mixer",
        "baking",
        "kitchen",
        "appliance",
        "cooking",
        "stand mixer",
      ],
    },
    {
      id: "8",
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
      tags: [
        "dyson",
        "vacuum",
        "cordless",
        "cleaning",
        "laser",
        "home",
        "appliance",
      ],
    },
  ],
  coupons: [
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
      tags: [
        "apple",
        "coupon",
        "discount",
        "10%",
        "store",
        "iphone",
        "ipad",
        "mac",
      ],
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
      tags: ["nike", "coupon", "$20 off", "shoes", "apparel", "sports", "gear"],
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
      tags: [
        "amazon",
        "coupon",
        "electronics",
        "15%",
        "laptops",
        "phones",
        "tablets",
        "smart home",
      ],
    },
  ],
  categories: [
    {
      id: "electronics",
      name: "Electronics",
      icon: "📱",
      dealCount: 156,
      tags: [
        "electronics",
        "phones",
        "laptops",
        "gadgets",
        "technology",
        "computers",
        "audio",
      ],
    },
    {
      id: "fashion",
      name: "Fashion",
      icon: "👕",
      dealCount: 89,
      tags: [
        "fashion",
        "clothing",
        "shoes",
        "apparel",
        "style",
        "outfit",
        "dress",
      ],
    },
    {
      id: "home-kitchen",
      name: "Home & Kitchen",
      icon: "🏠",
      dealCount: 67,
      tags: [
        "home",
        "kitchen",
        "appliances",
        "furniture",
        "decor",
        "cooking",
        "household",
      ],
    },
    {
      id: "sports-outdoors",
      name: "Sports & Outdoors",
      icon: "⚽",
      dealCount: 45,
      tags: [
        "sports",
        "outdoors",
        "fitness",
        "exercise",
        "camping",
        "running",
        "cycling",
      ],
    },
  ],
};

const ITEMS_PER_PAGE = 6;

const Search = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  // Get query from URL params with fallback
  const query =
    searchParams.get("q") ||
    new URLSearchParams(location.search).get("q") ||
    "";

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  // Reset pagination when query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Search and filter logic
  const searchResults = useMemo(() => {
    if (!query.trim())
      return { deals: [], coupons: [], categories: [], total: 0 };

    const searchTerm = query.toLowerCase();

    // Search deals
    const filteredDeals = searchDatabase.deals.filter(
      (deal) =>
        deal.title.toLowerCase().includes(searchTerm) ||
        deal.description.toLowerCase().includes(searchTerm) ||
        deal.merchant.toLowerCase().includes(searchTerm) ||
        deal.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );

    // Search coupons
    const filteredCoupons = searchDatabase.coupons.filter(
      (coupon) =>
        coupon.title.toLowerCase().includes(searchTerm) ||
        coupon.description.toLowerCase().includes(searchTerm) ||
        coupon.merchant.toLowerCase().includes(searchTerm) ||
        coupon.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );

    // Search categories
    const filteredCategories = searchDatabase.categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm) ||
        category.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );

    return {
      deals: filteredDeals,
      coupons: filteredCoupons,
      categories: filteredCategories,
      total:
        filteredDeals.length +
        filteredCoupons.length +
        filteredCategories.length,
    };
  }, [query]);

  // Apply filters
  const filteredResults = useMemo(() => {
    let items: any[] = [];

    switch (selectedFilter) {
      case "deals":
        items = searchResults.deals;
        break;
      case "coupons":
        items = searchResults.coupons;
        break;
      case "categories":
        items = searchResults.categories;
        break;
      default:
        items = [
          ...searchResults.deals,
          ...searchResults.coupons,
          ...searchResults.categories,
        ];
    }

    // Sort results
    switch (sortBy) {
      case "discount":
        items = items.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case "newest":
        items = items.sort((a, b) => {
          if (a.timePosted && b.timePosted) {
            return a.timePosted.localeCompare(b.timePosted);
          }
          return 0;
        });
        break;
      case "popular":
        items = items.sort(
          (a, b) =>
            (b.votes || b.dealCount || 0) - (a.votes || a.dealCount || 0),
        );
        break;
      default: // relevance
        // Keep original order (most relevant first based on search algorithm)
        break;
    }

    return items;
  }, [searchResults, selectedFilter, sortBy]);

  const displayedItems = filteredResults.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMoreItems = displayedItems.length < filteredResults.length;

  const handleLoadMore = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCurrentPage(currentPage + 1);
    setIsLoading(false);
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const clearSearch = () => {
    window.location.href = "/";
  };

  const renderSearchResult = (item: any, index: number) => {
    if (item.type === "deal" || item.type === "coupon") {
      return <DealCard key={`${item.type}-${item.id}`} {...item} />;
    }

    // Category result
    if (item.name) {
      return (
        <Card
          key={`category-${item.id}`}
          className="group cursor-pointer hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:-translate-y-1"
          onClick={() => (window.location.href = `/categories/${item.id}`)}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center text-2xl">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                  {item.name}
                </h3>
                <p className="text-gray-600 mt-1">
                  {item.dealCount} active deals
                </p>
                <Badge variant="secondary" className="mt-2">
                  Category
                </Badge>
              </div>
              <div className="text-gray-400 group-hover:text-orange-500 transition-colors duration-200">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return null;
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
              {/* Search Header */}
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
                    <SearchIcon className="h-8 w-8 text-orange-500" />
                    <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      Search Results
                    </h1>
                  </div>
                </div>

                {query ? (
                  <div className="space-y-2">
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Showing results for{" "}
                      <span className="font-semibold text-gray-900">
                        "{query}"
                      </span>
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{searchResults.total} total results found</span>
                      <span>•</span>
                      <button
                        onClick={clearSearch}
                        className="text-orange-600 hover:text-orange-700 transition-colors duration-200"
                      >
                        Clear search
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <SearchIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      No search query
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Enter a search term to find deals, coupons, and categories
                    </p>
                    <Button
                      onClick={() => (window.location.href = "/")}
                      className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                    >
                      Browse All Deals
                    </Button>
                  </div>
                )}
              </div>

              {/* Filters and Sort */}
              {query && searchResults.total > 0 && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/50 backdrop-blur-sm rounded-lg p-4">
                  {/* Filter Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "all", label: "All", count: searchResults.total },
                      {
                        id: "deals",
                        label: "Deals",
                        count: searchResults.deals.length,
                      },
                      {
                        id: "coupons",
                        label: "Coupons",
                        count: searchResults.coupons.length,
                      },
                      {
                        id: "categories",
                        label: "Categories",
                        count: searchResults.categories.length,
                      },
                    ].map((filter) => (
                      <Button
                        key={filter.id}
                        variant={
                          selectedFilter === filter.id ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => handleFilterChange(filter.id)}
                        className={cn(
                          "transition-all duration-200",
                          selectedFilter === filter.id
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                            : "hover:bg-gray-50",
                        )}
                        disabled={filter.count === 0}
                      >
                        {filter.label}
                        <Badge
                          variant="secondary"
                          className={cn(
                            "ml-2 text-xs",
                            selectedFilter === filter.id
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-600",
                          )}
                        >
                          {filter.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="newest">Newest</option>
                      <option value="discount">Highest Discount</option>
                      <option value="popular">Most Popular</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Search Results */}
              {query && (
                <div className="space-y-6 lg:space-y-6">
                  {filteredResults.length > 0 ? (
                    <>
                      {displayedItems.map((item, index) =>
                        renderSearchResult(item, index),
                      )}

                      {/* Load More */}
                      {hasMoreItems && (
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
                              `Load More Results (${filteredResults.length - displayedItems.length} remaining)`
                            )}
                          </Button>
                        </div>
                      )}

                      {/* All Results Loaded */}
                      {!hasMoreItems && displayedItems.length > 0 && (
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
                            You've seen all search results for "{query}"
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    /* No Results Found */
                    <div className="text-center py-12">
                      <div className="inline-flex items-center px-6 py-4 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl mb-6">
                        <SearchIcon className="h-6 w-6 mr-3" />
                        <div className="text-left">
                          <p className="font-medium">
                            No results found for "{query}"
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Try different keywords or browse categories below
                          </p>
                        </div>
                      </div>

                      {/* Suggested Searches */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Try searching for:
                        </h3>
                        <div className="flex flex-wrap justify-center gap-2">
                          {[
                            "iPhone",
                            "Samsung",
                            "Nike",
                            "PlayStation",
                            "MacBook",
                            "Headphones",
                            "Gaming",
                            "Kitchen",
                          ].map((suggestion) => (
                            <Button
                              key={suggestion}
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                (window.location.href = `/search?q=${suggestion}`)
                              }
                              className="hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
                            >
                              <SearchIcon className="h-3 w-3 mr-1" />
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Browse Categories */}
                      <div className="mt-8 pt-8 border-t border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                          Or browse by category:
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {searchDatabase.categories.map((category) => (
                            <button
                              key={category.id}
                              onClick={() =>
                                (window.location.href = `/categories/${category.id}`)
                              }
                              className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all duration-200 text-center"
                            >
                              <div className="text-2xl mb-2">
                                {category.icon}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {category.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {category.dealCount} deals
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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

export default Search;
