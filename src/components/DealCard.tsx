import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { VoteButtons } from "./VoteButtons";
import {
  MessageCircle,
  Share2,
  Bookmark,
  ExternalLink,
  Copy,
  Clock,
  MapPin,
  Zap,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DealCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  merchant: string;
  timePosted: string;
  votes: number;
  comments: number;
  promoCode?: string;
  isAvailable: boolean;
  isFeatured?: boolean;
}

export const DealCard = ({
  id,
  title,
  description,
  image,
  originalPrice,
  discountedPrice,
  discount,
  merchant,
  timePosted,
  votes,
  comments,
  promoCode,
  isAvailable,
  isFeatured = false,
}: DealCardProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const handleCopyCode = () => {
    if (promoCode) {
      navigator.clipboard.writeText(promoCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const handleShare = () => {
    // Share functionality
    navigator.share?.({
      title: title,
      text: description,
      url: window.location.href + `/deal/${id}`,
    });
  };

  const savings = originalPrice - discountedPrice;

  return (
    <Card
      className={cn(
        "group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:-translate-y-1",
        !isAvailable && "opacity-75",
        isFeatured &&
          "ring-2 ring-gradient-to-r from-orange-400 to-pink-400 shadow-lg",
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row">
          {/* Product Image - Made Bigger */}
          <div className="lg:w-48 lg:h-48 flex-shrink-0 relative overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-56 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {isFeatured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0 text-sm">
                  <Zap className="h-3 w-3 mr-1" />
                  Featured
                </Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-4 lg:p-6">
            <div className="space-y-4">
              {/* Vote and Time at Top */}
              <div className="flex items-center justify-between">
                <VoteButtons initialVotes={votes} compact />
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  <span className="font-medium">{timePosted}</span>
                </div>
              </div>

              {/* Title and Description */}
              <div>
                <h3 className="font-bold text-gray-900 text-base lg:text-lg line-clamp-2 group-hover:text-orange-600 transition-colors duration-200">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Price and Discount */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <span
                    className="text-2xl font-bold"
                    style={{ color: "rgba(111, 162, 37, 1)" }}
                  >
                    ${discountedPrice}
                  </span>
                  <span className="text-lg text-gray-500 line-through">
                    ${originalPrice}
                  </span>
                </div>
                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 text-sm px-3 py-1">
                  -{discount}%
                </Badge>
                <div className="text-sm text-green-600 font-semibold">
                  Save ${savings}
                </div>
              </div>

              {/* Merchant and Availability */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="font-medium">{merchant}</span>
                  </div>
                  <Badge
                    variant={isAvailable ? "secondary" : "outline"}
                    className={cn(
                      "text-xs font-medium",
                      isAvailable
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-red-100 text-red-700 border-red-200",
                    )}
                  >
                    {isAvailable ? "Available" : "Expired"}
                  </Badge>
                </div>
              </div>

              {/* Promo Code */}
              {promoCode && (
                <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-4 border border-orange-200">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-600 font-medium">
                        Promo Code:
                      </span>
                      <div
                        className="font-mono text-lg font-bold text-gray-900 px-3 py-1 bg-white rounded-lg border-2 border-dashed border-orange-300"
                        style={{
                          fontFamily:
                            'Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                        }}
                      >
                        {promoCode}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyCode}
                        className={cn(
                          "text-xs transition-all duration-200",
                          codeCopied &&
                            "bg-green-50 border-green-300 text-green-700",
                        )}
                      >
                        {codeCopied ? (
                          <>
                            <Check className="h-3 w-3 mr-1" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-md"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Get Deal
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 flex-wrap gap-4">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">{comments}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Share</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={cn(
                      "text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200",
                      isBookmarked && "text-yellow-500 bg-yellow-50",
                    )}
                  >
                    <Bookmark
                      className={cn("h-4 w-4", isBookmarked && "fill-current")}
                    />
                  </Button>
                </div>

                {!promoCode && (
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Get Deal
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
