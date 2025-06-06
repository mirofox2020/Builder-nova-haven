import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, TrendingUp, Clock, Vote, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample deals data for sidebar (should match the main deals data)
const sidebarDeals = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
    image: "/placeholder.svg",
    originalPrice: 1199,
    discountedPrice: 999,
    discount: 17,
    merchant: "eBay",
    timePosted: "2h ago",
    votes: 312, // High votes for hottest
    comments: 67,
    isAvailable: true,
  },
  {
    id: "3",
    title: 'Nike Air Jordan 1 Retro High OG "Chicago"',
    image: "/placeholder.svg",
    originalPrice: 170,
    discountedPrice: 119,
    discount: 30,
    merchant: "Nike",
    timePosted: "6h ago",
    votes: 298, // High votes
    comments: 45,
    isAvailable: true,
  },
  {
    id: "14",
    title: "Tesla Model S Plaid Performance Upgrade",
    image: "/placeholder.svg",
    originalPrice: 4999,
    discountedPrice: 3999,
    discount: 20,
    merchant: "Tesla",
    timePosted: "3d ago",
    votes: 267, // High votes
    comments: 48,
    isAvailable: true,
  },
  {
    id: "5",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    image: "/placeholder.svg",
    originalPrice: 399,
    discountedPrice: 279,
    discount: 30,
    merchant: "Sony",
    timePosted: "12h ago",
    votes: 234,
    comments: 19,
    isAvailable: true,
  },
  {
    id: "10",
    title: "Nintendo Switch OLED Model - Neon Red/Blue",
    image: "/placeholder.svg",
    originalPrice: 349,
    discountedPrice: 299,
    discount: 14,
    merchant: "Nintendo",
    timePosted: "2d ago",
    votes: 198,
    comments: 31,
    isAvailable: true,
  },
];

// Categories for quick access
const quickCategories = [
  { name: "Electronics", icon: "📱", deals: 234 },
  { name: "Fashion", icon: "👕", deals: 156 },
  { name: "Home & Kitchen", icon: "🏠", deals: 89 },
  { name: "Sports", icon: "⚽", deals: 67 },
];

export const Sidebar = () => {
  // Sort deals by votes to show hottest deals
  const hottestDeals = sidebarDeals
    .sort((a, b) => b.votes - a.votes)
    .slice(0, 5);

  const handleDealClick = (dealId: string) => {
    window.location.href = `/deal/${dealId}`;
  };

  const handleCategoryClick = (categoryName: string) => {
    const categoryId = categoryName
      .toLowerCase()
      .replace(/ & /g, "-")
      .replace(/ /g, "-");
    window.location.href = `/categories/${categoryId}`;
  };

  return (
    <div className="space-y-6">
      {/* Hottest Deals */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Flame className="h-5 w-5 text-red-500" />
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Hottest Deals
            </span>
          </CardTitle>
          <p className="text-xs text-gray-500">Most voted deals right now</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {hottestDeals.map((deal, index) => (
            <div
              key={deal.id}
              className="group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 border border-gray-100 hover:border-orange-200 hover:shadow-sm"
              onClick={() => handleDealClick(deal.id)}
            >
              <div className="flex gap-3">
                <div className="relative flex-shrink-0">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                  />
                  {index < 3 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-normal text-sm text-gray-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors duration-200">
                    {deal.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-bold text-green-600">
                      ${deal.discountedPrice}
                    </span>
                    <Badge className="bg-gray-200 text-black text-xs px-1.5 py-0.5">
                      {deal.discount}% off
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Vote className="h-3 w-3" />
                      <span>{deal.votes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <span>{deal.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{deal.timePosted}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 text-red-600 border-red-200 hover:bg-red-50"
            onClick={() => (window.location.href = "/deals")}
          >
            <Flame className="h-3 w-3 mr-2" />
            View All Hot Deals
          </Button>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-lg text-white">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-white">
            <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
              💡
            </div>
            Pro Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-white/90 leading-relaxed">
                Vote on deals to help others find the best
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-white/90 leading-relaxed">
                Set up alerts for your favorite brands
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-white/90 leading-relaxed">
                Check expiry dates before purchasing
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-sm text-white/90 leading-relaxed">
                Share great deals with friends
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card className="bg-gradient-to-br from-orange-50 to-pink-50 border-orange-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-gray-900">Today's Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">New Deals</span>
            <span className="font-bold text-orange-600">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Hot Offers</span>
            <span className="font-bold text-red-600">8</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Codes</span>
            <span className="font-bold text-purple-600">156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Savings</span>
            <span className="font-bold text-green-600">$47K</span>
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0">
        <CardContent className="p-6 text-center">
          <h3 className="font-bold text-lg mb-2">Never Miss a Deal!</h3>
          <p className="text-gray-300 text-sm mb-4">
            Get the hottest deals delivered to your inbox
          </p>
          <div className="space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:bg-white/20 focus:border-white/40 transition-all duration-200"
            />
            <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white border-0">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
