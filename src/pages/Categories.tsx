import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, Category } from "@/data/categories";

// Sample deals data for categories (same as homepage)
const categoryDeals = [
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
];

const Categories = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (categoryId) {
      const foundCategory = categories.find((cat) => cat.id === categoryId);
      setCategory(foundCategory || null);
    }
  }, [categoryId]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.05),transparent_70%)] pointer-events-none" />
        <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.05),transparent_50%)] pointer-events-none" />

        <Header />
        <main className="relative w-full">
          <div className="w-full py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Category Not Found
              </h1>
              <Button onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
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
                  money with our carefully curated selection.
                </p>
              </div>

              {/* Subcategory Filters */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Filter by Category
                </h2>
                <div className="relative">
                  {/* Horizontal Scrollable Container */}
                  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 scroll-smooth">
                    <div className="flex gap-3 min-w-max">
                      {/* All Categories Filter */}
                      <Button
                        variant={
                          selectedSubcategory === "all" ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() => setSelectedSubcategory("all")}
                        className={cn(
                          "flex items-center gap-2 whitespace-nowrap transition-all duration-200 flex-shrink-0",
                          selectedSubcategory === "all"
                            ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                            : "hover:bg-gray-50",
                        )}
                      >
                        <span className="text-lg">🏷️</span>
                        <span>All</span>
                      </Button>

                      {/* Subcategory Filters */}
                      {category.subcategories.map((subcategory) => (
                        <Button
                          key={subcategory.id}
                          variant={
                            selectedSubcategory === subcategory.id
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          onClick={() => setSelectedSubcategory(subcategory.id)}
                          className={cn(
                            "flex items-center gap-2 whitespace-nowrap transition-all duration-200 flex-shrink-0",
                            selectedSubcategory === subcategory.id
                              ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
                              : "hover:bg-gray-50",
                          )}
                        >
                          <span className="text-lg">{subcategory.icon}</span>
                          <span>{subcategory.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Gradient Fade on Right */}
                  <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none opacity-50" />
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
                    onClick={() => setSelectedSubcategory("all")}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear filter
                  </Button>
                </div>
              )}

              {/* Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Found {categoryDeals.length} deals in {category.name}
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

              {/* Deals Grid - Same as Homepage */}
              <div className="space-y-6 lg:space-y-6">
                {categoryDeals.map((deal) => (
                  <DealCard key={deal.id} {...deal} />
                ))}
              </div>

              {/* Load More */}
              <div className="text-center pt-8">
                <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:-translate-y-1">
                  Load More Deals
                </button>
              </div>
            </div>

            {/* Sidebar Desktop Only - Same as Homepage */}
            <div className="hidden xl:block xl:col-span-1">
              <div className="sticky top-24 lg:top-28">
                <Sidebar />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Same as Homepage */}
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
