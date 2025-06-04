import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VoteButtons } from "./VoteButtons";
import { ExternalLink, TrendingUp } from "lucide-react";

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
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-500" />
            Hottest Deals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {hotDeals.map((deal) => (
            <div key={deal.id} className="group">
              <div className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                {/* Vote Buttons */}
                <VoteButtons
                  initialVotes={deal.votes}
                  size="sm"
                  className="self-start"
                />

                {/* Product Image */}
                <div className="w-12 h-12 flex-shrink-0">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {deal.title}
                  </h4>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-sm text-gray-900">
                      ${deal.discountedPrice}
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      ${deal.originalPrice}
                    </span>
                    <Badge variant="destructive" className="text-xs py-0">
                      -{deal.discount}%
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-500 mt-1">
                    {deal.merchant}
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Button variant="outline" className="w-full text-sm" size="sm">
            View All Hot Deals
            <ExternalLink className="h-3 w-3 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* Ad Space */}
      <Card>
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
              <div className="text-gray-500 text-sm">Advertisement Space</div>
            </div>
            <Button size="sm" className="w-full">
              Learn More
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Today's Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">New Deals</span>
            <span className="font-semibold text-green-600">+47</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Active Codes</span>
            <span className="font-semibold text-blue-600">234</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Savings</span>
            <span className="font-semibold text-purple-600">$1.2M</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
