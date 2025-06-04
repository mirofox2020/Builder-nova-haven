import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { categories, Category } from "@/data/categories";

// Sample deals data for categories
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
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Category Not Found
            </h1>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
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

      <main className="relative w-full py-6 lg:py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <div className="mb-6">
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
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent font-sans">
                  {category.name}
                </h1>
              </div>
            </div>
            <p className="text-gray-600 text-lg">
              Discover the best deals in {category.name.toLowerCase()}. Save
              money with our curated selection.
            </p>
          </div>

          {/* Subcategory Filters */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Filter by Category
            </h2>
            <div className="flex flex-wrap gap-3 overflow-x-auto scrollbar-hide pb-2">
              {/* All Categories Filter */}
              <Button
                variant={selectedSubcategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubcategory("all")}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap transition-all duration-200",
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
                    "flex items-center gap-2 whitespace-nowrap transition-all duration-200",
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

          {/* Active Filter Display */}
          {selectedSubcategory !== "all" && (
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Showing deals for:
                </span>
                <Badge variant="secondary" className="flex items-center gap-1">
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
            </div>
          )}

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
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

          {/* Deals Grid */}
          <div className="space-y-6">
            {/* Desktop Layout - Hidden on Mobile */}
            <div className="hidden lg:block space-y-6">
              {categoryDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>

            {/* Mobile Grid Layout - Hidden on Desktop */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:hidden">
              {categoryDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>
          </div>

          {/* Load More */}
          <div className="text-center pt-8">
            <Button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:-translate-y-1">
              Load More Deals
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Categories;
