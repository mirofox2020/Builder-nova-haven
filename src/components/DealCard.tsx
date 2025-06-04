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

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-shadow duration-200",
        !isAvailable && "opacity-75",
        isFeatured && "ring-2 ring-orange-200",
      )}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Vote Section */}
          <div className="flex sm:flex-col items-center sm:items-start gap-2 p-4 sm:pr-2">
            <VoteButtons initialVotes={votes} />
            <div className="flex sm:flex-col items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{timePosted}</span>
            </div>
          </div>

          {/* Product Image */}
          <div className="sm:w-32 sm:h-32 flex-shrink-0">
            <img
              src={image}
              alt={title}
              className="w-full h-48 sm:h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 p-4 sm:pl-4">
            <div className="space-y-3">
              {/* Title and Description */}
              <div>
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                  {title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {description}
                </p>
              </div>

              {/* Price and Discount */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    ${discountedPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ${originalPrice}
                  </span>
                </div>
                <Badge variant="destructive" className="text-xs">
                  -{discount}%
                </Badge>
              </div>

              {/* Merchant and Availability */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-3 w-3" />
                  <span>{merchant}</span>
                  <Badge
                    variant={isAvailable ? "secondary" : "outline"}
                    className="text-xs"
                  >
                    {isAvailable ? "Available" : "Expired"}
                  </Badge>
                </div>
              </div>

              {/* Promo Code */}
              {promoCode && (
                <div className="bg-gray-50 rounded-lg p-3 border-2 border-dashed border-gray-200">
                  <div className="flex items-center justify-between gap-2">
                    <div className="font-mono text-sm font-semibold text-gray-900">
                      {promoCode}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCopyCode}
                        className="text-xs"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        {codeCopied ? "Copied!" : "Copy"}
                      </Button>
                      <Button
                        size="sm"
                        className="text-xs bg-orange-500 hover:bg-orange-600"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Get Deal
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">{comments}</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <Share2 className="h-4 w-4 mr-1" />
                    <span className="text-xs">Share</span>
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={cn(
                      "text-gray-600 hover:text-gray-900",
                      isBookmarked && "text-orange-500 hover:text-orange-600",
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
                    className="bg-orange-500 hover:bg-orange-600 text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
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
