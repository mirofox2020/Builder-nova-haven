import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tag,
  Percent,
  Gift,
  MessageCircle,
  Filter,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainCategories = [
  { id: "categories", label: "Categories", icon: Tag },
  { id: "codes", label: "Discount Codes", icon: Percent },
  { id: "deals", label: "Deals", icon: Gift, active: true },
  { id: "freebies", label: "Freebies", icon: Gift },
  { id: "discussions", label: "Discussions", icon: MessageCircle },
];

const feedTabs = [
  { id: "for-you", label: "For you", active: true },
  { id: "hottest", label: "Hottest" },
  { id: "trending", label: "Trending" },
  { id: "all", label: "All" },
];

export const Navigation = () => {
  const [activeCategory, setActiveCategory] = useState("deals");
  const [activeTab, setActiveTab] = useState("for-you");

  return (
    <div className="bg-gray-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        {/* Main Categories */}
        <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-hide">
          {mainCategories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium whitespace-nowrap",
                  isActive && "bg-blue-600 text-white hover:bg-blue-700",
                )}
              >
                <Icon className="h-4 w-4" />
                {category.label}
              </Button>
            );
          })}
        </div>

        {/* Secondary Navigation */}
        <div className="flex items-center justify-between py-3 border-t border-gray-200">
          {/* Feed Tabs */}
          <div className="flex items-center gap-1">
            {feedTabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <Button
                  key={tab.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "text-sm font-medium",
                    isActive
                      ? "text-blue-600 bg-blue-50 hover:bg-blue-100"
                      : "text-gray-600 hover:text-gray-900",
                  )}
                >
                  {tab.label}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Filter Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
