import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Upload,
  Download,
  Link,
  Eye,
  Check,
  X,
  AlertTriangle,
  Package,
  Sparkles,
  Globe,
  Store,
  Tag,
  RefreshCw,
  FileText,
  Trash2,
  Play,
  Pause,
} from "lucide-react";
import { cn } from "@/lib/utils";

const MassUpload = () => {
  const [uploadMethod, setUploadMethod] = useState("urls");
  const [urlList, setUrlList] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedDeals, setProcessedDeals] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Sample processed deals for preview
  const sampleProcessedDeals = [
    {
      id: "1",
      url: "https://amazon.com/iphone-15-pro-max",
      title: "Apple iPhone 15 Pro Max 256GB",
      originalPrice: 1199,
      salePrice: 999,
      discount: 17,
      store: "Amazon",
      category: "Electronics",
      subcategory: "Smartphones",
      description:
        "Experience the premium quality of Apple iPhone 15 Pro Max 256GB at an unbeatable price! This exclusive offer from Amazon brings you cutting-edge technology and superior craftsmanship.",
      imageUrl: "/placeholder.svg",
      status: "ready",
      error: null,
    },
    {
      id: "2",
      url: "https://bestbuy.com/samsung-galaxy-s24",
      title: "Samsung Galaxy S24 Ultra 512GB",
      originalPrice: 1399,
      salePrice: 1099,
      discount: 21,
      store: "Best Buy",
      category: "Electronics",
      subcategory: "Smartphones",
      description:
        "Discover the incredible Samsung Galaxy S24 Ultra 512GB with this amazing deal from Best Buy. Advanced features and premium design at an exceptional value.",
      imageUrl: "/placeholder.svg",
      status: "ready",
      error: null,
    },
    {
      id: "3",
      url: "https://nike.com/air-max-270-invalid",
      title: "",
      originalPrice: 0,
      salePrice: 0,
      discount: 0,
      store: "",
      category: "",
      subcategory: "",
      description: "",
      imageUrl: "",
      status: "error",
      error: "Product not found or invalid URL",
    },
    {
      id: "4",
      url: "https://walmart.com/macbook-air-m2",
      title: "MacBook Air M2 13-inch Laptop",
      originalPrice: 1199,
      salePrice: 999,
      discount: 17,
      store: "Walmart",
      category: "Electronics",
      subcategory: "Laptops",
      description:
        "Get the powerful MacBook Air M2 13-inch Laptop at this fantastic price from Walmart. Perfect for professionals and students alike.",
      imageUrl: "/placeholder.svg",
      status: "processing",
      error: null,
    },
  ];

  const stores = [
    { id: "amazon", name: "Amazon" },
    { id: "walmart", name: "Walmart" },
    { id: "bestbuy", name: "Best Buy" },
    { id: "target", name: "Target" },
    { id: "auto", name: "Auto-detect" },
  ];

  const categories = [
    { id: "electronics", name: "Electronics" },
    { id: "fashion", name: "Fashion" },
    { id: "home", name: "Home & Kitchen" },
    { id: "health", name: "Health & Beauty" },
    { id: "auto", name: "Auto-detect" },
  ];

  const handleProcessUrls = async () => {
    if (!urlList.trim()) {
      alert("Please enter URLs to process");
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);

    // Simulate processing with progress
    const urls = urlList
      .trim()
      .split("\n")
      .filter((url) => url.trim());
    const totalUrls = urls.length;

    for (let i = 0; i < totalUrls; i++) {
      setTimeout(() => {
        setUploadProgress(((i + 1) / totalUrls) * 100);
      }, i * 500);
    }

    // Simulate completion after processing
    setTimeout(
      () => {
        setProcessedDeals(sampleProcessedDeals);
        setIsProcessing(false);
        setUploadProgress(100);
      },
      totalUrls * 500 + 1000,
    );
  };

  const handlePublishSelected = () => {
    const readyDeals = processedDeals.filter((deal) => deal.status === "ready");
    console.log(`Publishing ${readyDeals.length} deals:`, readyDeals);
    alert(`${readyDeals.length} deals published successfully!`);
  };

  const handleDeleteDeal = (dealId: string) => {
    setProcessedDeals((prev) => prev.filter((deal) => deal.id !== dealId));
  };

  const handleRetryDeal = (dealId: string) => {
    setProcessedDeals((prev) =>
      prev.map((deal) =>
        deal.id === dealId ? { ...deal, status: "processing" } : deal,
      ),
    );

    // Simulate retry
    setTimeout(() => {
      setProcessedDeals((prev) =>
        prev.map((deal) =>
          deal.id === dealId
            ? {
                ...deal,
                status: "ready",
                error: null,
                title: "Retried Product Title",
              }
            : deal,
        ),
      );
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "error":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <Check className="h-4 w-4 text-green-600" />;
      case "processing":
        return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      case "error":
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const readyCount = processedDeals.filter(
    (deal) => deal.status === "ready",
  ).length;
  const errorCount = processedDeals.filter(
    (deal) => deal.status === "error",
  ).length;
  const processingCount = processedDeals.filter(
    (deal) => deal.status === "processing",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Mass Deal Upload
          </h1>
          <p className="text-gray-600 mt-1">
            Upload multiple deals at once via URLs with automatic detection
          </p>
        </div>
        <div className="flex items-center gap-3">
          {processedDeals.length > 0 && (
            <Badge variant="outline" className="text-green-600">
              {readyCount} ready to publish
            </Badge>
          )}
          <Button
            onClick={handlePublishSelected}
            disabled={readyCount === 0}
            className="bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            <Package className="h-4 w-4 mr-2" />
            Publish Selected
          </Button>
        </div>
      </div>

      {/* Upload Method Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setUploadMethod("urls")}
              className={cn(
                "p-4 border-2 rounded-lg text-left transition-colors",
                uploadMethod === "urls"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300",
              )}
            >
              <Link className="h-6 w-6 text-blue-500 mb-2" />
              <h3 className="font-medium text-gray-900">Product URLs</h3>
              <p className="text-sm text-gray-500">
                Paste multiple product URLs, one per line
              </p>
            </button>

            <button
              onClick={() => setUploadMethod("csv")}
              className={cn(
                "p-4 border-2 rounded-lg text-left transition-colors",
                uploadMethod === "csv"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300",
              )}
            >
              <FileText className="h-6 w-6 text-green-500 mb-2" />
              <h3 className="font-medium text-gray-900">CSV Upload</h3>
              <p className="text-sm text-gray-500">
                Upload a CSV file with product details
              </p>
            </button>

            <button
              onClick={() => setUploadMethod("api")}
              className={cn(
                "p-4 border-2 rounded-lg text-left transition-colors",
                uploadMethod === "api"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300",
              )}
            >
              <Globe className="h-6 w-6 text-purple-500 mb-2" />
              <h3 className="font-medium text-gray-900">API Import</h3>
              <p className="text-sm text-gray-500">
                Import deals directly from store APIs
              </p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* URL Upload Form */}
      {uploadMethod === "urls" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5" />
              Product URLs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Store
                </label>
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or auto-detect" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.id}>
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4" />
                          {store.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select or auto-detect" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  AI Description
                </label>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Auto-generate descriptions
                  </span>
                  <Button
                    variant={autoGenerate ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoGenerate(!autoGenerate)}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {autoGenerate ? "Enabled" : "Disabled"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Product URLs (one per line)
              </label>
              <Textarea
                placeholder={`https://amazon.com/product1
https://walmart.com/product2
https://bestbuy.com/product3`}
                rows={8}
                value={urlList}
                onChange={(e) => setUrlList(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                Supported stores: Amazon, Walmart, Best Buy, Target, and more
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleProcessUrls}
                disabled={isProcessing || !urlList.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Process URLs
                  </>
                )}
              </Button>

              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Sample CSV
              </Button>
            </div>

            {/* Progress Bar */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Processing URLs...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Processing Results */}
      {processedDeals.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Processing Results
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600">
                {readyCount} ready
              </Badge>
              {errorCount > 0 && (
                <Badge variant="outline" className="text-red-600">
                  {errorCount} errors
                </Badge>
              )}
              {processingCount > 0 && (
                <Badge variant="outline" className="text-blue-600">
                  {processingCount} processing
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Store</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processedDeals.map((deal) => (
                    <TableRow key={deal.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(deal.status)}
                          <Badge
                            variant="outline"
                            className={getStatusColor(deal.status)}
                          >
                            {deal.status}
                          </Badge>
                        </div>
                        {deal.error && (
                          <p className="text-xs text-red-600 mt-1">
                            {deal.error}
                          </p>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-3">
                          {deal.imageUrl && (
                            <img
                              src={deal.imageUrl}
                              alt=""
                              className="w-12 h-12 rounded object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">
                              {deal.title || "Processing..."}
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-xs">
                              {deal.url}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {deal.store && (
                          <Badge variant="outline">{deal.store}</Badge>
                        )}
                      </TableCell>

                      <TableCell>
                        {deal.salePrice > 0 && (
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-green-600">
                                ${deal.salePrice}
                              </span>
                              {deal.originalPrice > deal.salePrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${deal.originalPrice}
                                </span>
                              )}
                            </div>
                            {deal.discount > 0 && (
                              <Badge className="bg-red-100 text-red-700 text-xs">
                                -{deal.discount}%
                              </Badge>
                            )}
                          </div>
                        )}
                      </TableCell>

                      <TableCell>
                        {deal.category && (
                          <div className="space-y-1">
                            <Badge variant="outline">{deal.category}</Badge>
                            {deal.subcategory && (
                              <p className="text-xs text-gray-500">
                                {deal.subcategory}
                              </p>
                            )}
                          </div>
                        )}
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>

                          {deal.status === "error" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleRetryDeal(deal.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteDeal(deal.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-blue-500" />
            Upload Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">
                Supported Features
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Automatic product information extraction
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  AI-generated product descriptions
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Auto-detection of store and category
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Duplicate deal detection
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Batch processing with preview
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-gray-900 mb-3">Best Practices</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  Ensure URLs are direct product links
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  Check for duplicate deals before uploading
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  Verify pricing accuracy after processing
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  Review AI-generated descriptions
                </li>
                <li className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  Process in smaller batches for better accuracy
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MassUpload;
