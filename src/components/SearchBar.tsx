import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp } from "lucide-react";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Searching for:", searchQuery);
  };

  const trendingSearches = [
    "iPhone 15",
    "Black Friday",
    "Gaming Laptop",
    "Nike Shoes",
  ];

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 z-10" />
        <Input
          type="text"
          placeholder="Search for deals, products, stores..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          className="pl-12 pr-24 h-11 text-sm bg-gray-50/50 border-gray-200 focus:bg-white focus:border-orange-300 focus:ring-2 focus:ring-orange-100 transition-all duration-200 rounded-xl"
        />
        <Button
          type="submit"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 px-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-xs rounded-lg"
        >
          Search
        </Button>
      </div>

      {/* Search Suggestions Dropdown */}
      {isFocused && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 z-50 overflow-hidden">
          <div className="p-3">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <TrendingUp className="h-3 w-3" />
              <span>Trending searches</span>
            </div>
            <div className="space-y-1">
              {trendingSearches.map((term, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-150"
                  onClick={() => setSearchQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
