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

  return (
    <>
      {/* Desktop Layout */}
      <Card
        className={cn(
          "group overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:-translate-y-1 hidden lg:block",
          !isAvailable && "opacity-75",
        )}
      >
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image - Bigger and Centered, No Badges */}
            <div className="lg:w-56 lg:h-56 flex-shrink-0 relative overflow-hidden flex items-center justify-center bg-gray-50">
              <img
                src={image}
                alt={title}
                className="w-full h-64 lg:h-full object-contain group-hover:scale-105 transition-transform duration-300 p-4"
                style={{ margin: "auto 0" }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4 lg:p-6">
              <div className="space-y-4">
                {/* Vote and Time at Top - Bigger Vote Buttons */}
                <div className="flex items-center justify-between">
                  <VoteButtons initialVotes={votes} compact size="lg" />
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

                {/* Price and Merchant Info - Restructured Layout */}
                <div className="flex flex-col">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {/* Price Column */}
                    <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
                      <div className="flex items-center gap-4 flex-wrap mt-4">
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
                        <div className="text-sm font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">
                          {discount}% off
                        </div>
                      </div>
                    </div>

                    {/* Merchant Column */}
                    <div className="flex flex-col w-1/2 ml-5 max-md:ml-0 max-md:w-full">
                      <div className="flex items-center justify-between flex-wrap gap-2 mt-4 ml-auto max-md:ml-0">
                        <div className="flex items-center gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="h-4 w-4" />
                            <span
                              className="font-medium"
                              style={{ color: "rgba(5, 5, 5, 1)" }}
                            >
                              {merchant}
                            </span>
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
                    </div>
                  </div>
                </div>

                {/* Promo Code - Styled like in the image */}
                {promoCode && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3">
                        <span className="text-orange-600 text-sm font-medium">
                          🏷️ Promo Code:
                        </span>
                        <div
                          className="font-mono text-lg font-bold text-gray-900 px-3 py-1 bg-white border-2 border-dashed border-orange-300 rounded"
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
                            "text-xs transition-all duration-200 border-gray-300",
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
                          className="text-xs bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View Deal
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
                        className={cn(
                          "h-4 w-4",
                          isBookmarked && "fill-current",
                        )}
                      />
                    </Button>
                  </div>

                  {!promoCode && (
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-all duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Deal
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Layout - 2 Sections: Left (Image & Vote) + Right (Product Details) */}
      <div className="lg:hidden">
        <a
          href={`/deal/${id}`}
          className={cn(
            "block relative bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 hover:border-orange-300 p-3 max-sm:px-1.5 max-sm:py-0",
            !isAvailable && "opacity-75"
          )}
          style={{
            cursor: 'pointer',
            display: 'block',
            fontWeight: '400',
            lineHeight: '24px',
            overflowWrap: 'break-word',
            position: 'relative',
            transitionDuration: '0.3s',
            transitionProperty: 'box-shadow, border-color',
            transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            wordBreak: 'break-word',
            backgroundColor: 'rgb(255, 255, 255)'
          }}
            '@media (max-width: 640px)': {
              padding: '0 5px'
            }
          }}
          }}
        >
          {/* Mobile Layout: 2 Sections */}
          <div className="flex gap-4">
            {/* LEFT SECTION: Image, Vote & Share/Comment - with same background as image */}
            <div className="flex flex-col items-center space-y-3 bg-gradient-to-br from-gray-50 to-gray-100 p-3 rounded-lg border border-gray-200/50">
              {/* Vote Buttons */}
              <VoteButtons initialVotes={votes} compact size="sm" />

              {/* Mobile Image */}
              <div className="w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center border border-gray-200/50">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-contain p-2"
                />
                {discount > 0 && (
                  <div className="absolute top-1 left-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-xs font-semibold shadow-sm">
                    {discount}%
                  </div>
                )}
              </div>

              {/* Share and Comment Icons - Under Image */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle comment
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                >
                  <MessageCircle className="h-3 w-3 text-gray-600" />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleShare();
                  }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
                >
                  <Share2 className="h-3 w-3 text-gray-600" />
                </button>
              </div>
            </div>

            {/* RIGHT SECTION: Product Details */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Title */}
              <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight">
                {title}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span
                  className="text-lg font-bold"
                  style={{ color: "rgba(111, 162, 37, 1)" }}
                >
                  ${discountedPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ${originalPrice}
                </span>
              </div>

              {/* Merchant and Time */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span className="text-black sm:text-gray-500">
                    {merchant}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{timePosted}</span>
                </div>
              </div>

              {/* Promo Code for Mobile */}
              {promoCode && (
                <div className="bg-orange-50 border border-orange-200 rounded p-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-orange-600 font-medium">
                      Code: {promoCode}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopyCode();
                      }}
                      className="text-xs h-5 px-2"
                    >
                      <Copy className="h-2 w-2 mr-1" />
                      {codeCopied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Mobile Actions - Only Get Deal Button */}
              <div className="flex justify-end">
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle get deal action
                  }}
                  className="text-xs bg-blue-600 hover:bg-blue-700 text-white h-6 px-3"
                >
                  <ExternalLink className="h-2 w-2 mr-1" />
                  Get Deal
                </Button>
              </div>
            </div>
          </div>
        </a>
      </div>
    </>
  );
};