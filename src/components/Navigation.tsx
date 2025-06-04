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
  Fire,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const mainCategories = [
  { id: "categories", label: "Categories", icon: Tag },
  { id: "codes", label: "Discount Codes", icon: Percent, badge: "234" },
  { id: "deals", label: "Deals", icon: Gift, active: true },
  { id: "freebies", label: "Freebies", icon: Gift, badge: "Hot" },
  { id: "discussions", label: "Discussions", icon: MessageCircle },
];

const feedTabs = [
  { id: "for-you", label: "For you", active: true, icon: null },
  { id: "hottest", label: "Hottest", icon: Fire },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "all", label: "All", icon: null },
];

export const Navigation = () => {
  const [activeCategory, setActiveCategory] = useState("deals");
  const [activeTab, setActiveTab] = useState("for-you");

  return (
    <div className="bg-white/50 backdrop-blur-sm border-b border-gray-200/70">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Categories */}
        <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
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
                  "flex items-center gap-2 text-sm font-medium whitespace-nowrap rounded-full px-4 py-2 transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md hover:shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
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

        {/* Secondary Navigation */}
        <div className="flex items-center justify-between py-3 border-t border-gray-200/50">
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

          {/* Filter Button */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2 rounded-lg border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
