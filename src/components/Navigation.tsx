import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tag,
  Percent,
  Gift,
  MessageCircle,
  Filter,
  ChevronDown,
  Flame,
  TrendingUp,
  Store,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/categories";

interface NavigationProps {
  onFiltersChange?: (filters: {
    stores: string[];
    discountRanges: string[];
    contentType: string;
  }) => void;
}

const mainCategories = [
  {
    id: "categories",
    label: "Categories",
    icon: Tag,
    hasDropdown: true,
  },
  { id: "codes", label: "Discount Codes", icon: Percent, badge: "234" },
  { id: "deals", label: "Deals", icon: Gift, active: true },
  { id: "freebies", label: "Freebies", icon: Gift, badge: "Hot" },
];

const feedTabs = [
  { id: "for-you", label: "For you", active: true, icon: null },
  { id: "hottest", label: "Hottest", icon: Flame },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "all", label: "All", icon: null },
];

const availableStores = [
  { id: "amazon", name: "Amazon", logo: "🛒" },
  { id: "bestbuy", name: "Best Buy", logo: "🔵" },
  { id: "walmart", name: "Walmart", logo: "🏪" },
  { id: "nike", name: "Nike", logo: "👟" },
  { id: "sony", name: "Sony", logo: "📺" },
  { id: "apple", name: "Apple", logo: "🍎" },
  { id: "ebay", name: "eBay", logo: "🛍️" },
  { id: "lego", name: "LEGO", logo: "🧩" },
  { id: "google", name: "Google Store", logo: "🔍" },
  { id: "dyson", name: "Dyson", logo: "🌪️" },
  { id: "microsoft", name: "Microsoft", logo: "💻" },
  { id: "nintendo", name: "Nintendo", logo: "🎮" },
  { id: "bose", name: "Bose", logo: "🎧" },
  { id: "samsung", name: "Samsung", logo: "📱" },
  { id: "tesla", name: "Tesla", logo: "🚗" },
  { id: "canon", name: "Canon", logo: "📷" },
];

const discountRanges = [
  { id: "10-20", label: "10% - 20% off", min: 10, max: 20 },
  { id: "20-30", label: "20% - 30% off", min: 20, max: 30 },
  { id: "30-40", label: "30% - 40% off", min: 30, max: 40 },
  { id: "40-50", label: "40% - 50% off", min: 40, max: 50 },
  { id: "50+", label: "50%+ off", min: 50, max: 100 },
];

export const Navigation = ({ onFiltersChange }: NavigationProps) => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState("deals");
  const [activeTab, setActiveTab] = useState("for-you");
  const [selectedStores, setSelectedStores] = useState<string[]>([]);
  const [selectedDiscountRanges, setSelectedDiscountRanges] = useState<
    string[]
  >([]);

  // Only show secondary menu on homepage
  const isHomepage = location.pathname === "/";

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "categories") {
      // Handle categories dropdown - will be handled by dropdown component
      return;
    }
    setActiveCategory(categoryId);

    // Notify parent component of content type change
    onFiltersChange?.({
      stores: selectedStores,
      discountRanges: selectedDiscountRanges,
      contentType: categoryId,
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    // Navigate to category page
    window.location.href = `/categories/${categoryId}`;
  };

  const handleStoreToggle = (storeId: string) => {
    const newSelectedStores = selectedStores.includes(storeId)
      ? selectedStores.filter((id) => id !== storeId)
      : [...selectedStores, storeId];

    setSelectedStores(newSelectedStores);

    // Notify parent component of filter changes
    onFiltersChange?.({
      stores: newSelectedStores,
      discountRanges: selectedDiscountRanges,
      contentType: activeCategory,
    });
  };

  const handleDiscountToggle = (rangeId: string) => {
    const newSelectedRanges = selectedDiscountRanges.includes(rangeId)
      ? selectedDiscountRanges.filter((id) => id !== rangeId)
      : [...selectedDiscountRanges, rangeId];

    setSelectedDiscountRanges(newSelectedRanges);

    // Notify parent component of filter changes
    onFiltersChange?.({
      stores: selectedStores,
      discountRanges: newSelectedRanges,
      contentType: activeCategory,
    });
  };

  const handleClearFilters = () => {
    setSelectedStores([]);
    setSelectedDiscountRanges([]);

    onFiltersChange?.({
      stores: [],
      discountRanges: [],
      contentType: activeCategory,
    });
  };

  const hasActiveFilters =
    selectedStores.length > 0 || selectedDiscountRanges.length > 0;
  const activeFiltersCount =
    selectedStores.length + selectedDiscountRanges.length;

  return (
    <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200/70">
      <div className="w-full">
        {/* Main Categories */}
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8">
          {mainCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            if (category.hasDropdown) {
              return (
                <DropdownMenu key={category.id}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium whitespace-nowrap rounded-full px-4 py-2 transition-all duration-200",
                        "text-black hover:text-black hover:bg-gray-100",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {category.label}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
                    {categories.map((cat) => (
                      <DropdownMenuItem
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.id)}
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-50"
                      >
                        <span className="text-lg">{cat.icon}</span>
                        <span className="font-medium">{cat.name}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium whitespace-nowrap rounded-full px-4 py-2 transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg"
                    : "text-black hover:text-black hover:bg-gray-100",
                )}
              >
                <Icon className="h-4 w-4" />
                {category.label}
                {category.badge && (
                  <Badge
                    variant={isActive ? "secondary" : "outline"}
                    className={cn(
                      "text-xs h-5",
                      isActive ? "bg-white/20 text-white border-white/30" : "",
                    )}
                  >
                    {category.badge}
                  </Badge>
                )}
              </Button>
            );
          })}
        </div>

        {/* Secondary Navigation - Only on Homepage */}
        {isHomepage && (
          <div className="flex items-center justify-between py-3 border-t border-gray-200/50 px-4 sm:px-6 lg:px-8">
            {/* Feed Tabs */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {feedTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;

                return (
                  <Button
                    key={tab.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "relative text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200",
                      isActive
                        ? "text-orange-600 bg-orange-50 hover:bg-orange-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="h-4 w-4" />}
                      {tab.label}
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full" />
                    )}
                  </Button>
                );
              })}
            </div>

            {/* Filter Button with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 rounded-lg border-gray-300 hover:bg-gray-50 transition-all duration-200 relative",
                    hasActiveFilters &&
                      "border-orange-500 bg-orange-50 text-orange-600",
                  )}
                >
                  <Filter className="h-4 w-4" />
                  <span className="hidden sm:inline">Filter</span>
                  {hasActiveFilters && (
                    <Badge className="bg-orange-500 text-white text-xs h-5 px-1.5 ml-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-80 max-h-96 overflow-y-auto"
                align="end"
              >
                {/* Filter Header */}
                <div className="flex items-center justify-between p-3 border-b">
                  <DropdownMenuLabel className="text-base font-semibold">
                    Filter Deals
                  </DropdownMenuLabel>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearFilters}
                      className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 h-auto p-1"
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Clear All
                    </Button>
                  )}
                </div>

                {/* Stores Filter */}
                <div className="py-2">
                  <DropdownMenuLabel className="flex items-center gap-2 text-sm font-medium text-gray-700 px-3 py-2">
                    <Store className="h-4 w-4" />
                    Stores
                  </DropdownMenuLabel>
                  <div className="max-h-48 overflow-y-auto">
                    {availableStores.map((store) => (
                      <DropdownMenuCheckboxItem
                        key={store.id}
                        checked={selectedStores.includes(store.id)}
                        onCheckedChange={() => handleStoreToggle(store.id)}
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                      >
                        <span className="text-base">{store.logo}</span>
                        <span className="text-sm">{store.name}</span>
                      </DropdownMenuCheckboxItem>
                    ))}
                  </div>
                </div>

                <DropdownMenuSeparator />

                {/* Discount Ranges Filter */}
                <div className="py-2">
                  <DropdownMenuLabel className="flex items-center gap-2 text-sm font-medium text-gray-700 px-3 py-2">
                    <Percent className="h-4 w-4" />
                    Discount Range
                  </DropdownMenuLabel>
                  {discountRanges.map((range) => (
                    <DropdownMenuCheckboxItem
                      key={range.id}
                      checked={selectedDiscountRanges.includes(range.id)}
                      onCheckedChange={() => handleDiscountToggle(range.id)}
                      className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                    >
                      <span className="text-sm font-medium text-green-600">
                        {range.label}
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>

                {/* Active Filters Summary */}
                {hasActiveFilters && (
                  <>
                    <DropdownMenuSeparator />
                    <div className="p-3 bg-gray-50">
                      <p className="text-xs text-gray-600 mb-2">
                        Active Filters:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {selectedStores.map((storeId) => {
                          const store = availableStores.find(
                            (s) => s.id === storeId,
                          );
                          return (
                            <Badge
                              key={storeId}
                              variant="secondary"
                              className="text-xs"
                            >
                              {store?.logo} {store?.name}
                            </Badge>
                          );
                        })}
                        {selectedDiscountRanges.map((rangeId) => {
                          const range = discountRanges.find(
                            (r) => r.id === rangeId,
                          );
                          return (
                            <Badge
                              key={rangeId}
                              variant="secondary"
                              className="text-xs"
                            >
                              {range?.label}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};
