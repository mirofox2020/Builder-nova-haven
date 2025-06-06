import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample search suggestions
const trendingSearches = [
  "iPhone 15 Pro Max",
  "PlayStation 5",
  "MacBook Air M2",
  "Samsung Galaxy S24",
  "Nike Air Jordan",
  "Sony WH-1000XM5",
  "iPad Pro",
  "Nintendo Switch",
];

const recentSearches = [
  "wireless headphones",
  "gaming laptop",
  "kitchen appliances",
  "smart watch",
];

export const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Simulate search with debouncing
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        // Simulate API search results
        const mockResults = [
          {
            id: "1",
            title: "Apple iPhone 15 Pro Max 256GB",
            type: "deal",
            price: "$999",
            originalPrice: "$1199",
            merchant: "eBay",
            image: "/placeholder.svg",
          },
          {
            id: "2",
            title: "Samsung Galaxy S24 Ultra",
            type: "deal",
            price: "$1099",
            originalPrice: "$1299",
            merchant: "Best Buy",
            image: "/placeholder.svg",
          },
          {
            id: "3",
            title: "Electronics Category",
            type: "category",
            count: "1,245 deals",
          },
          {
            id: "4",
            title: "Apple Store 10% Off",
            type: "coupon",
            code: "APPLE10",
            merchant: "Apple",
          },
        ].filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        setSearchResults(mockResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to search results page
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setIsSearchOpen(false);
    // Navigate to search results
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const handleResultClick = (result: any) => {
    setIsSearchOpen(false);
    if (result.type === "deal") {
      navigate(`/deal/${result.id}`);
    } else if (result.type === "category") {
      navigate(`/categories/${result.id}`);
    } else if (result.type === "coupon") {
      navigate(`/search?q=${encodeURIComponent(result.title)}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Search for deals, products, stores..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsSearchOpen(true)}
          className="w-full pl-10 pr-20 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-2">
          {searchQuery && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-6 w-6 p-0 hover:bg-gray-100"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleSearch}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white text-xs px-3"
          >
            Search
          </Button>
        </div>
      </div>

      {/* Search Dropdown */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center">
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500 mr-2"></div>
                <span className="text-sm text-gray-600">Searching...</span>
              </div>
            </div>
          )}

          {/* Search Results */}
          {!isLoading && searchResults.length > 0 && (
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 px-2 py-1 mb-2">
                Search Results
              </div>
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors duration-200 text-left"
                >
                  {result.type === "deal" && (
                    <>
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {result.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm font-bold text-green-600">
                            {result.price}
                          </span>
                          <span className="text-xs text-gray-500 line-through">
                            {result.originalPrice}
                          </span>
                          <span className="text-xs text-gray-500">
                            at {result.merchant}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {result.type === "category" && (
                    <>
                      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                        <span className="text-xl">📂</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {result.title}
                        </p>
                        <p className="text-xs text-gray-500">{result.count}</p>
                      </div>
                    </>
                  )}
                  {result.type === "coupon" && (
                    <>
                      <div className="w-10 h-10 bg-orange-100 rounded flex items-center justify-center">
                        <span className="text-xl">🏷️</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {result.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded">
                            {result.code}
                          </span>
                          <span className="text-xs text-gray-500">
                            at {result.merchant}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading &&
            searchQuery.trim().length > 2 &&
            searchResults.length === 0 && (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-600">
                  No results found for "{searchQuery}"
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Try different keywords or browse categories
                </p>
              </div>
            )}

          {/* Suggestions (when no search query or short query) */}
          {!isLoading && searchQuery.trim().length <= 2 && (
            <div className="p-2">
              {/* Trending Searches */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 px-2 py-1 mb-2">
                  <TrendingUp className="h-3 w-3" />
                  Trending Searches
                </div>
                <div className="space-y-1">
                  {trendingSearches.slice(0, 4).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors duration-200 text-left"
                    >
                      <TrendingUp className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-700">{search}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-500 px-2 py-1 mb-2">
                  <Clock className="h-3 w-3" />
                  Recent Searches
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors duration-200 text-left"
                    >
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{search}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="border-t border-gray-100 p-2">
            <button
              onClick={() => {
                navigate("/");
                setIsSearchOpen(false);
              }}
              className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-md transition-colors duration-200 text-left"
            >
              <span className="text-lg">🏠</span>
              <span className="text-sm text-gray-700">Browse All Deals</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
