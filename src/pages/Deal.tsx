import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { VoteButtons } from "@/components/VoteButtons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ExternalLink,
  Copy,
  Check,
  MapPin,
  Clock,
  Calendar,
  Share2,
  Bookmark,
  MessageCircle,
  User,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Home,
  Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Enhanced deals database with category and subcategory information
const dealsDatabase = {
  "1": {
    id: "1",
    title: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
    description:
      "Experience the ultimate iPhone with the iPhone 15 Pro Max. Featuring a stunning 6.7-inch Super Retina XDR display with ProMotion technology, the powerful A17 Pro chip, and an advanced camera system that captures incredible detail. The titanium design makes it lighter yet incredibly durable.",
    fullDescription: `The iPhone 15 Pro Max represents the pinnacle of Apple's smartphone innovation. This flagship device combines cutting-edge technology with premium materials to deliver an unparalleled user experience.

**Key Features:**
• A17 Pro chip with 6-core CPU and 6-core GPU for lightning-fast performance
• 6.7-inch Super Retina XDR display with ProMotion and Always-On technology
• Advanced Triple-camera system with 48MP Main, Ultra Wide, and Telephoto cameras
• Up to 29 hours of video playback battery life
• Titanium design - lighter, stronger, and more premium than ever
• USB-C connectivity for universal compatibility
• Action Button for quick access to your favorite features
• iOS 17 with enhanced privacy and productivity features

**What's Included:**
• iPhone 15 Pro Max
• USB-C to USB-C Cable
• Documentation

**Technical Specifications:**
• Storage: 256GB
• Color: Natural Titanium
• Network: 5G capable
• Water Resistance: IP68
• Face ID for secure authentication
• Wireless and MagSafe charging support

This deal includes free shipping and comes with Apple's standard one-year limited warranty. Don't miss this incredible opportunity to own the latest and greatest iPhone at an unbeatable price!`,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    originalPrice: 1199,
    discountedPrice: 999,
    discount: 17,
    merchant: "eBay",
    timePosted: "2h ago",
    expiresAt: "2024-02-15",
    votes: 156,
    comments: 23,
    promoCode: "IPHONE15",
    isAvailable: true,
    isFeatured: true,
    category: "electronics",
    subcategory: "smartphones",
    type: "deal",
  },
  "2": {
    id: "2",
    title: "Samsung Galaxy S24 Ultra 512GB",
    description:
      "Latest Samsung flagship with S Pen and incredible camera system. Features AI-enhanced photography and all-day battery life.",
    fullDescription: `The Samsung Galaxy S24 Ultra sets new standards for Android flagship smartphones with its cutting-edge features and premium design.

**Key Features:**
• Snapdragon 8 Gen 3 processor for ultimate performance
• 6.8-inch Dynamic AMOLED 2X display with 120Hz refresh rate
• 200MP main camera with advanced zoom capabilities
• Built-in S Pen for productivity and creativity
• 5000mAh battery with 45W fast charging
• Titanium frame for durability and premium feel
• AI-powered camera features and editing tools
• Samsung DeX for desktop-like experience

**What's Included:**
• Galaxy S24 Ultra
• USB-C Cable
• S Pen
• Documentation

**Technical Specifications:**
• Storage: 512GB
• RAM: 12GB
• Network: 5G capable
• Water Resistance: IP68
• Wireless charging and PowerShare support

This is an excellent deal on Samsung's most advanced smartphone with a significant discount and fast shipping!`,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    originalPrice: 1399,
    discountedPrice: 1099,
    discount: 21,
    merchant: "Best Buy",
    timePosted: "4h ago",
    expiresAt: "2024-02-20",
    votes: 89,
    comments: 12,
    promoCode: "SAMSUNG21",
    isAvailable: true,
    isFeatured: false,
    category: "electronics",
    subcategory: "smartphones",
    type: "deal",
  },
  // Default deal for unknown IDs
  default: {
    id: "default",
    title: "Amazing Product Deal",
    description:
      "This is an incredible deal on a high-quality product. Don't miss out on this limited-time offer!",
    fullDescription: `This product offers exceptional value and quality at an unbeatable price.

**Key Features:**
• High-quality construction and materials
• Latest technology and features
• Excellent customer reviews and ratings
• Fast shipping and reliable service
• Manufacturer warranty included

**What's Included:**
• Product with original packaging
• All necessary accessories
• Documentation and warranty information

**Why This Deal:**
• Significant savings compared to regular price
• Limited-time offer - act fast!
• Trusted merchant with excellent reputation
• Fast and free shipping included

Don't miss this opportunity to get an amazing product at a fantastic price!`,
    images: [
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
      "/placeholder.svg",
    ],
    originalPrice: 299,
    discountedPrice: 199,
    discount: 33,
    merchant: "DealsHub Store",
    timePosted: "1h ago",
    expiresAt: "2024-02-25",
    votes: 45,
    comments: 8,
    promoCode: "DEAL33",
    isAvailable: true,
    isFeatured: false,
    category: "general",
    subcategory: "products",
    type: "deal",
  },
};

// Enhanced recommended deals with category information
const recommendedDeals = [
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra 512GB",
    description: "Latest Samsung flagship with S Pen and incredible camera.",
    image: "/placeholder.svg",
    originalPrice: 1399,
    discountedPrice: 1099,
    discount: 21,
    merchant: "Best Buy",
    timePosted: "4h ago",
    votes: 89,
    comments: 12,
    isAvailable: true,
    category: "electronics",
    subcategory: "smartphones",
  },
  {
    id: "3",
    title: "Google Pixel 8 Pro 256GB",
    description: "AI-powered photography and pure Android experience.",
    image: "/placeholder.svg",
    originalPrice: 999,
    discountedPrice: 699,
    discount: 30,
    merchant: "Google Store",
    timePosted: "6h ago",
    votes: 134,
    comments: 18,
    isAvailable: true,
    category: "electronics",
    subcategory: "smartphones",
  },
  {
    id: "4",
    title: "OnePlus 12 512GB",
    description: "Flagship performance with ultra-fast charging.",
    image: "/placeholder.svg",
    originalPrice: 899,
    discountedPrice: 649,
    discount: 28,
    merchant: "OnePlus",
    timePosted: "8h ago",
    votes: 67,
    comments: 8,
    isAvailable: true,
    category: "electronics",
    subcategory: "smartphones",
  },
  {
    id: "5",
    title: "Xiaomi 14 Pro 256GB",
    description: "Premium camera phone with Leica partnership.",
    image: "/placeholder.svg",
    originalPrice: 799,
    discountedPrice: 599,
    discount: 25,
    merchant: "Xiaomi",
    timePosted: "10h ago",
    votes: 92,
    comments: 15,
    isAvailable: true,
    category: "electronics",
    subcategory: "smartphones",
  },
  {
    id: "6",
    title: "Nothing Phone (2) 128GB",
    description: "Unique transparent design with Glyph interface.",
    image: "/placeholder.svg",
    originalPrice: 699,
    discountedPrice: 499,
    discount: 29,
    merchant: "Nothing",
    timePosted: "12h ago",
    votes: 78,
    comments: 9,
    isAvailable: true,
    category: "electronics",
    subcategory: "smartphones",
  },
  {
    id: "7",
    title: "Asus ROG Phone 8 Pro",
    description: "Ultimate gaming phone with cooling system.",
    image: "/placeholder.svg",
    originalPrice: 1199,
    discountedPrice: 899,
    discount: 25,
    merchant: "Asus",
    timePosted: "14h ago",
    votes: 156,
    comments: 22,
    isAvailable: true,
    category: "electronics",
    subcategory: "gaming",
  },
  {
    id: "8",
    title: "Sony Xperia 1 VI",
    description: "Professional camera phone for creators.",
    image: "/placeholder.svg",
    originalPrice: 1299,
    discountedPrice: 999,
    discount: 23,
    merchant: "Sony",
    timePosted: "16h ago",
    votes: 87,
    comments: 11,
    isAvailable: true,
    category: "electronics",
    subcategory: "cameras",
  },
  {
    id: "9",
    title: "Motorola Edge 50 Pro",
    description: "Curved display with premium build quality.",
    image: "/placeholder.svg",
    originalPrice: 599,
    discountedPrice: 399,
    discount: 33,
    merchant: "Motorola",
    timePosted: "18h ago",
    votes: 64,
    comments: 7,
    isAvailable: true,
    category: "electronics",
    subcategory: "smartphones",
  },
  {
    id: "10",
    title: "Realme GT 5 Pro",
    description: "Flagship killer with powerful performance.",
    image: "/placeholder.svg",
    originalPrice: 499,
    discountedPrice: 349,
    discount: 30,
    merchant: "Realme",
    timePosted: "20h ago",
    votes: 113,
    comments: 16,
    isAvailable: true,
    category: "electronics",
    subcategory: "smartphones",
  },
  {
    id: "11",
    title: "Honor Magic 6 Pro",
    description: "AI-powered smartphone with amazing battery.",
    image: "/placeholder.svg",
    originalPrice: 899,
    discountedPrice: 699,
    discount: 22,
    merchant: "Honor",
    timePosted: "22h ago",
    votes: 95,
    comments: 13,
    isAvailable: true,
    category: "electronics",
    subcategory: "smartphones",
  },
];

// Sample comments
const sampleComments = [
  {
    id: "1",
    user: "TechDealer23",
    avatar: "/placeholder.svg",
    comment:
      "Great deal! Just ordered mine. The titanium color looks amazing in person.",
    timeAgo: "2h ago",
    likes: 5,
  },
  {
    id: "2",
    user: "SaverMom",
    avatar: "/placeholder.svg",
    comment:
      "Has anyone tried this seller before? The price seems too good to be true.",
    timeAgo: "4h ago",
    likes: 2,
  },
  {
    id: "3",
    user: "MobileExpert",
    avatar: "/placeholder.svg",
    comment:
      "This is legit! I bought the 128GB version last week and it arrived quickly. Seller is reliable.",
    timeAgo: "6h ago",
    likes: 8,
  },
];

const Deal = () => {
  const { dealId } = useParams<{ dealId: string }>();

  // Get deal data based on dealId, fallback to default if not found
  const dealData =
    dealsDatabase[dealId as keyof typeof dealsDatabase] ||
    dealsDatabase.default;

  // Filter out current deal from recommendations and prioritize same category
  const filteredRecommendations = recommendedDeals
    .filter((deal) => deal.id !== dealId)
    .sort((a, b) => {
      // Prioritize same category/subcategory
      if (a.category === dealData.category && b.category !== dealData.category)
        return -1;
      if (b.category === dealData.category && a.category !== dealData.category)
        return 1;
      if (
        a.subcategory === dealData.subcategory &&
        b.subcategory !== dealData.subcategory
      )
        return -1;
      if (
        b.subcategory === dealData.subcategory &&
        a.subcategory !== dealData.subcategory
      )
        return 1;
      return 0;
    });

  const [selectedImage, setSelectedImage] = useState(0);
  const [codeCopied, setCodeCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [votes, setVotes] = useState(dealData.votes);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(sampleComments);

  // Check login status
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleCopyCode = () => {
    if (dealData.promoCode) {
      navigator.clipboard.writeText(dealData.promoCode);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      setVotes((prev) => prev + (type === "up" ? -1 : 1));
      setUserVote(null);
    } else {
      const change =
        userVote === null ? (type === "up" ? 1 : -1) : type === "up" ? 2 : -2;
      setVotes((prev) => prev + change);
      setUserVote(type);
    }
  };

  const handleShare = () => {
    navigator.share?.({
      title: dealData.title,
      text: dealData.description,
      url: window.location.href,
    });
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() && isLoggedIn) {
      const comment = {
        id: Date.now().toString(),
        user: "CurrentUser",
        avatar: "/placeholder.svg",
        comment: newComment.trim(),
        timeAgo: "now",
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const navigateToCategory = () => {
    if (dealData.category && dealData.category !== "general") {
      window.location.href = `/categories/${dealData.category}`;
    }
  };

  const navigateToHome = () => {
    window.location.href = "/";
  };

  const handleGetDeal = () => {
    // In a real app, this would track the click and redirect to merchant
    window.open(`https://${dealData.merchant.toLowerCase()}.com`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.05),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.05),transparent_50%)] pointer-events-none" />

      <Header />

      <main className="relative w-full py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <button
              onClick={navigateToHome}
              className="hover:text-orange-600 transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
            </button>
            <span>/</span>
            {dealData.category !== "general" && (
              <>
                <button
                  onClick={navigateToCategory}
                  className="hover:text-orange-600 transition-colors duration-200 capitalize"
                >
                  {dealData.category}
                </button>
                <span>/</span>
              </>
            )}
            <span className="text-gray-400">Deal</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
            className="hover:bg-gray-100 mt-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deals
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Deal Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            {/* Images Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
                <img
                  src={dealData.images[selectedImage]}
                  alt={dealData.title}
                  className="w-full h-full object-contain p-8"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 overflow-x-auto pb-2">
                {dealData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "flex-shrink-0 w-20 h-20 bg-white rounded-lg border-2 overflow-hidden transition-all duration-200",
                      selectedImage === index
                        ? "border-orange-500 shadow-md"
                        : "border-gray-200 hover:border-gray-300",
                    )}
                  >
                    <img
                      src={image}
                      alt={`${dealData.title} ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Deal Details */}
            <div className="space-y-6">
              {/* Category Badge */}
              {dealData.category !== "general" && (
                <button
                  onClick={navigateToCategory}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm hover:bg-blue-100 transition-colors duration-200"
                >
                  <Tag className="h-3 w-3" />
                  <span className="capitalize">{dealData.category}</span>
                </button>
              )}

              {/* Vote Icons and Title */}
              <div className="space-y-4">
                {/* Vote Icons with Save and Share */}
                <div className="flex items-center justify-between">
                  {/* Vote Icons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleVote("up")}
                      className="flex items-center justify-center hover:bg-green-100 rounded-full p-2 transition-colors duration-200"
                    >
                      <ThumbsUp
                        className={cn(
                          "h-6 w-6 text-black font-bold",
                          userVote === "up" && "text-green-600 fill-current",
                        )}
                      />
                    </button>

                    <span className="text-lg font-bold text-gray-900 min-w-[40px] text-center">
                      {votes}
                    </span>

                    <button
                      onClick={() => handleVote("down")}
                      className="flex items-center justify-center hover:bg-red-100 rounded-full p-2 transition-colors duration-200"
                    >
                      <ThumbsDown
                        className={cn(
                          "h-6 w-6 text-black font-bold",
                          userVote === "down" && "text-red-600 fill-current",
                        )}
                      />
                    </button>
                  </div>

                  {/* Save and Share Icons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={cn(
                        "flex items-center justify-center rounded-full p-2 transition-all duration-200",
                        isBookmarked
                          ? "bg-yellow-100 hover:bg-yellow-200"
                          : "hover:bg-gray-100",
                      )}
                    >
                      <Bookmark
                        className={cn(
                          "h-6 w-6 text-black font-bold",
                          isBookmarked && "text-yellow-600 fill-current",
                        )}
                      />
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center justify-center hover:bg-blue-100 rounded-full p-2 transition-colors duration-200"
                    >
                      <Share2 className="h-6 w-6 text-black font-bold" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  {dealData.title}
                </h1>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-green-600">
                      ${dealData.discountedPrice}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${dealData.originalPrice}
                    </span>
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-lg px-3 py-1">
                    {dealData.discount}% off
                  </Badge>
                </div>
              </div>

              {/* Merchant and Availability */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium text-black">
                    {dealData.merchant}
                  </span>
                  <Badge
                    variant="secondary"
                    className={cn(
                      dealData.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700",
                    )}
                  >
                    {dealData.isAvailable ? "Available" : "Expired"}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Posted {dealData.timePosted}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>Expires {dealData.expiresAt}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              {dealData.promoCode && (
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="text-orange-600 font-medium">
                          🏷️ Promo Code:
                        </span>
                        <div className="font-mono text-lg font-bold text-gray-900 px-3 py-1 bg-white border-2 border-dashed border-orange-300 rounded">
                          {dealData.promoCode}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCopyCode}
                          className={cn(
                            "transition-all duration-200",
                            codeCopied &&
                              "bg-green-50 border-green-300 text-green-700",
                          )}
                        >
                          {codeCopied ? (
                            <>
                              <Check className="h-4 w-4 mr-2" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  onClick={handleGetDeal}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-lg py-3"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Get This Deal
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={cn(
                    "transition-all duration-200",
                    isBookmarked &&
                      "bg-yellow-50 border-yellow-300 text-yellow-700",
                  )}
                >
                  <Bookmark
                    className={cn("h-5 w-5", isBookmarked && "fill-current")}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShare}
                  className="hover:bg-blue-50"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Voting Section */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <p className="text-lg text-gray-700">
                  Your votes help us show the best deals. What do you think?
                </p>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => handleVote("up")}
                    className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                  >
                    <ThumbsUp
                      className={cn(
                        "h-7 w-7",
                        userVote === "up"
                          ? "text-green-600 fill-current"
                          : "text-gray-600",
                      )}
                    />
                  </button>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {votes}
                    </div>
                    <div className="text-sm text-gray-500">votes</div>
                  </div>

                  <button
                    onClick={() => handleVote("down")}
                    className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                  >
                    <ThumbsDown
                      className={cn(
                        "h-7 w-7",
                        userVote === "down"
                          ? "text-red-600 fill-current"
                          : "text-gray-600",
                      )}
                    />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description Section */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h2>
              <div className="prose prose-gray max-w-none">
                <div className="whitespace-pre-line text-black leading-relaxed">
                  {dealData.fullDescription}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="h-6 w-6 text-gray-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Comments ({comments.length})
                </h2>
              </div>

              {/* Comment Form */}
              <div className="mb-6">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Share your thoughts about this deal..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="min-h-[100px]"
                    />
                    <div className="flex justify-end">
                      <Button
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim()}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Login to join the conversation
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Share your thoughts and help other shoppers make informed
                      decisions
                    </p>
                    <div className="flex gap-3 justify-center">
                      <Button
                        variant="outline"
                        onClick={() => (window.location.href = "/login")}
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => (window.location.href = "/register")}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Register
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex gap-3">
                      <img
                        src={comment.avatar}
                        alt={comment.user}
                        className="w-10 h-10 rounded-full bg-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {comment.user}
                          </span>
                          <span className="text-sm text-gray-500">
                            {comment.timeAgo}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.comment}</p>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsUp className="h-3 w-3" />
                          {comment.likes}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* You May Also Like */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Section Header */}
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                      You may also like
                    </h2>
                    <p className="text-gray-600">
                      More great deals in {dealData.category} you might be
                      interested in
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const container =
                          document.getElementById("deals-carousel");
                        if (container) {
                          container.scrollBy({
                            left: -400,
                            behavior: "smooth",
                          });
                        }
                      }}
                      className="w-10 h-10 p-0 rounded-full border-gray-300 hover:bg-orange-50 hover:border-orange-300"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const container =
                          document.getElementById("deals-carousel");
                        if (container) {
                          container.scrollBy({ left: 400, behavior: "smooth" });
                        }
                      }}
                      className="w-10 h-10 p-0 rounded-full border-gray-300 hover:bg-orange-50 hover:border-orange-300"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Desktop & Tablet: 6-item grid that slides horizontally */}
                <div className="hidden sm:block">
                  <div
                    id="deals-carousel"
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                    style={{ scrollSnapType: "x mandatory" }}
                  >
                    {filteredRecommendations.map((deal, index) => (
                      <div
                        key={deal.id}
                        className="group transform transition-all duration-300 hover:-translate-y-2 cursor-pointer flex-shrink-0 w-64"
                        onClick={() =>
                          (window.location.href = `/deal/${deal.id}`)
                        }
                        style={{
                          animationDelay: `${index * 100}ms`,
                          scrollSnapAlign: "start",
                        }}
                      >
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-orange-200 h-full">
                          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-4 relative overflow-hidden">
                            <img
                              src={deal.image}
                              alt={deal.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                              -{deal.discount}%
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-sm text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200 leading-tight mb-2">
                              {deal.title}
                            </h3>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-green-600">
                                  ${deal.discountedPrice}
                                </span>
                                <span className="text-sm text-gray-500 line-through">
                                  ${deal.originalPrice}
                                </span>
                              </div>
                              <Badge className="bg-gray-200 text-black text-xs px-2 py-1">
                                {deal.merchant}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile: Simplified horizontal scroll */}
                <div className="sm:hidden">
                  <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 scroll-smooth">
                    {filteredRecommendations.slice(0, 8).map((deal, index) => (
                      <div
                        key={deal.id}
                        className="group transform transition-all duration-300 hover:-translate-y-1 cursor-pointer flex-shrink-0 w-40"
                        onClick={() =>
                          (window.location.href = `/deal/${deal.id}`)
                        }
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-orange-200">
                          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-3 relative overflow-hidden">
                            <img
                              src={deal.image}
                              alt={deal.title}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-1.5 py-0.5 rounded-full text-xs font-bold shadow-lg">
                              -{deal.discount}%
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-bold text-xs text-gray-900 line-clamp-2 group-hover:text-orange-600 transition-colors duration-200 leading-tight mb-1">
                              {deal.title}
                            </h3>
                            <div className="text-xs text-green-600 font-bold">
                              ${deal.discountedPrice}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View More Button */}
                <div className="text-center pt-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={navigateToCategory}
                    className="px-8 py-3 text-gray-700 border-gray-300 hover:bg-gradient-to-r hover:from-orange-50 hover:to-pink-50 hover:border-orange-300 transition-all duration-300 font-semibold"
                  >
                    View More in {dealData.category}
                    <TrendingUp className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-16 w-full">
        <div className="w-full py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Help</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Legal</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Follow Us
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="font-bold text-gray-900">DealsHub</span>
            </div>
            <p className="text-gray-600">
              &copy; 2024 DealsHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Deal;
