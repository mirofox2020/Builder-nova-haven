import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VoteButtons } from "./VoteButtons";
import {
  ExternalLink,
  TrendingUp,
  Flame,
  Users,
  DollarSign,
  Activity,
  Lightbulb,
} from "lucide-react";

interface HotDeal {
  id: string;
  title: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  votes: number;
  merchant: string;
}

const hotDeals: HotDeal[] = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max",
    image: "/placeholder.svg",
    originalPrice: 1199,
    discountedPrice: 999,
    discount: 17,
    votes: 342,
    merchant: "Amazon",
  },
  {
    id: "2",
    title: "Samsung Galaxy Buds2 Pro",
    image: "/placeholder.svg",
    originalPrice: 229,
    discountedPrice: 149,
    discount: 35,
    votes: 156,
    merchant: "Best Buy",
  },
  {
    id: "3",
    title: "Nike Air Max 270",
    image: "/placeholder.svg",
    originalPrice: 150,
    discountedPrice: 89,
    discount: 41,
    votes: 89,
    merchant: "Nike",
  },
  {
    id: "4",
    title: "MacBook Air M2",
    image: "/placeholder.svg",
    originalPrice: 1199,
    discountedPrice: 949,
    discount: 21,
    votes: 234,
    merchant: "Apple",
  },
];

export const Sidebar = () => {
  return (
    <div className="space-y-6">
      {/* Hottest Deals */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Flame className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Hottest Deals
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hotDeals.map((deal, index) => (
            <div key={deal.id} className="group">
              <div className="flex gap-3 px-3 py-0 rounded-xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 transition-all duration-200 border border-transparent hover:border-orange-200">
                {/* Product Image */}
                <div className="w-14 h-14 flex-shrink-0 relative">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                  />
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">#1</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-normal text-sm text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {deal.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-sm text-gray-900">
                      ${deal.discountedPrice}
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      ${deal.originalPrice}
                    </span>
                    <Badge className="bg-gray-200 text-black text-xs py-0 border-0">
                      -{deal.discount}%
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-500 mt-1 font-medium">
                    {deal.merchant}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button
            variant="outline"
            className="w-full text-sm border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-200"
            size="sm"
          >
            View All Hot Deals
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Pro Tips */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 border-0 shadow-lg text-white overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 -translate-x-10"></div>
          <div className="relative space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-bold text-lg text-white">Pro Tips</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/90 text-sm leading-relaxed">
                  Vote on deals to help others find the best
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/90 text-sm leading-relaxed">
                  Set up alerts for your favorite brands
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/90 text-sm leading-relaxed">
                  Check expiry dates before purchasing
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/90 text-sm leading-relaxed">
                  Share great deals with friends
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Premium Ad Space */}
      <Card className="bg-gradient-to-br from-orange-500 to-pink-500 border-0 shadow-lg text-white overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-10 -translate-x-10"></div>
          <div className="relative text-center space-y-4">
            <div className="space-y-2">
              <h3 className="font-bold text-lg">Get Premium</h3>
              <p className="text-white/90 text-sm leading-relaxed">
                Unlock exclusive deals, early access, and ad-free browsing
              </p>
            </div>
            <Button
              size="sm"
              className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold shadow-md"
            >
              Upgrade Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
