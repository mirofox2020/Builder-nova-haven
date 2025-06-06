import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  BarChart3,
  Users,
  Package,
  AlertTriangle,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Check,
  X,
  Settings,
  Store,
  Tag,
  Bell,
  Upload,
  Download,
  Star,
  TrendingUp,
  Activity,
  DollarSign,
  Menu,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  Calendar,
  Clock,
  Globe,
  Key,
  Mail,
  Shield,
  Database,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample admin data
const adminStats = {
  activeDeals: 1247,
  newSubmissions: 23,
  totalUsers: 8932,
  triggeredAlerts: 156,
  pendingDeals: 45,
  featuredDeals: 89,
  totalStores: 25,
  totalCategories: 10,
};

const sampleDeals = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max 256GB",
    store: "Amazon",
    originalPrice: 1199,
    salePrice: 999,
    discount: 17,
    category: "Electronics",
    subcategory: "Smartphones",
    status: "published",
    featured: true,
    expiresAt: "2024-02-15",
    views: 2340,
    votes: 156,
    submittedBy: "admin",
    dateSubmitted: "2024-01-20",
  },
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra 512GB",
    store: "Best Buy",
    originalPrice: 1399,
    salePrice: 1099,
    discount: 21,
    category: "Electronics",
    subcategory: "Smartphones",
    status: "pending",
    featured: false,
    expiresAt: "2024-02-20",
    views: 890,
    votes: 67,
    submittedBy: "user123",
    dateSubmitted: "2024-01-19",
  },
];

const sampleSubmissions = [
  {
    id: "1",
    user: "john_doe",
    userEmail: "john@example.com",
    productTitle: "Sony WH-1000XM5 Headphones",
    store: "Sony",
    originalPrice: 399,
    salePrice: 279,
    productUrl: "https://sony.com/headphones",
    dateSubmitted: "2024-01-20 14:30",
    status: "pending",
  },
  {
    id: "2",
    user: "sarah_wilson",
    userEmail: "sarah@example.com",
    productTitle: "Nintendo Switch OLED",
    store: "GameStop",
    originalPrice: 349,
    salePrice: 299,
    productUrl: "https://gamestop.com/nintendo",
    dateSubmitted: "2024-01-19 16:45",
    status: "pending",
  },
];

const sampleStores = [
  {
    id: "1",
    name: "Amazon",
    logo: "/placeholder.svg",
    apiKey: "amz_abc123",
    isActive: true,
    dealsCount: 450,
  },
  {
    id: "2",
    name: "Best Buy",
    logo: "/placeholder.svg",
    apiKey: "bb_def456",
    isActive: true,
    dealsCount: 230,
  },
];

const sampleUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-01-15",
    dealsSubmitted: 5,
    alertsCreated: 12,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "user",
    status: "active",
    joinDate: "2024-01-10",
    dealsSubmitted: 8,
    alertsCreated: 6,
  },
];

const Admin = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: "",
    store: "",
    originalPrice: "",
    salePrice: "",
    productUrl: "",
    imageUrl: "",
    category: "",
    subcategory: "",
    description: "",
    tags: "",
    featured: false,
  });
  const [newStore, setNewStore] = useState({
    name: "",
    logo: "",
    apiKey: "",
  });
  const [bulkUrls, setBulkUrls] = useState("");

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "admin" || user.email === "admin@dealshub.com") {
      setIsAdmin(true);
    } else {
      // Redirect to login or show access denied
      window.location.href = "/";
    }
  }, []);

  const sidebarItems = [
    { id: "overview", label: "Dashboard Overview", icon: BarChart3 },
    { id: "deals", label: "Manage Deals", icon: Package },
    { id: "add-deal", label: "Add New Deal", icon: Plus },
    { id: "submissions", label: "Deal Submissions", icon: Upload },
    { id: "categories", label: "Manage Categories", icon: Tag },
    { id: "stores", label: "Manage Stores", icon: Store },
    { id: "alerts", label: "Manage Alerts", icon: Bell },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "System Settings", icon: Settings },
    { id: "bulk-upload", label: "Mass Deal Upload", icon: Download },
  ];

  const handleCreateDeal = () => {
    console.log("Creating deal:", newDeal);
    // Reset form
    setNewDeal({
      title: "",
      store: "",
      originalPrice: "",
      salePrice: "",
      productUrl: "",
      imageUrl: "",
      category: "",
      subcategory: "",
      description: "",
      tags: "",
      featured: false,
    });
  };

  const handleBulkUpload = () => {
    const urls = bulkUrls.split("\n").filter((url) => url.trim());
    console.log("Processing bulk URLs:", urls);
    setBulkUrls("");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card>
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center">
                    <Package className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                    <div className="ml-2 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        Active Deals
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {adminStats.activeDeals}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center">
                    <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-orange-500" />
                    <div className="ml-2 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        New Submissions
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {adminStats.newSubmissions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                    <div className="ml-2 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        Total Users
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {adminStats.totalUsers}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3 sm:p-6">
                  <div className="flex items-center">
                    <Bell className="h-6 w-6 sm:h-8 sm:w-8 text-red-500" />
                    <div className="ml-2 sm:ml-4">
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        Triggered Alerts
                      </p>
                      <p className="text-lg sm:text-2xl font-bold text-gray-900">
                        {adminStats.triggeredAlerts}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleSubmissions.slice(0, 3).map((submission) => (
                      <div
                        key={submission.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">
                            {submission.productTitle}
                          </p>
                          <p className="text-xs text-gray-500">
                            by {submission.user}
                          </p>
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Top Performing Deals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sampleDeals.slice(0, 3).map((deal) => (
                      <div
                        key={deal.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{deal.title}</p>
                          <p className="text-xs text-gray-500">
                            {deal.views} views • {deal.votes} votes
                          </p>
                        </div>
                        {deal.featured && (
                          <Star className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "deals":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Manage Deals
              </h1>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Deal
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-3 sm:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Deal</TableHead>
                        <TableHead>Store</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Stats</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleDeals.map((deal) => (
                        <TableRow key={deal.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src="/placeholder.svg"
                                alt=""
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium">{deal.title}</p>
                                <p className="text-xs text-gray-500">
                                  {deal.category}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{deal.store}</TableCell>
                          <TableCell>
                            <div>
                              <span className="font-bold text-green-600">
                                ${deal.salePrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${deal.originalPrice}
                              </span>
                              <Badge className="ml-2 bg-red-100 text-red-700 text-xs">
                                -{deal.discount}%
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  deal.status === "published"
                                    ? "default"
                                    : "secondary"
                                }
                              >
                                {deal.status}
                              </Badge>
                              {deal.featured && (
                                <Star className="h-4 w-4 text-yellow-500" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{deal.views} views</p>
                              <p>{deal.votes} votes</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
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
          </div>
        );

      case "add-deal":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Add New Deal
            </h1>

            <Card>
              <CardHeader>
                <CardTitle>Deal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Product Title
                    </label>
                    <Input
                      placeholder="Enter product title"
                      value={newDeal.title}
                      onChange={(e) =>
                        setNewDeal({ ...newDeal, title: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Store
                    </label>
                    <Select
                      value={newDeal.store}
                      onValueChange={(value) =>
                        setNewDeal({ ...newDeal, store: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select store" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="bestbuy">Best Buy</SelectItem>
                        <SelectItem value="walmart">Walmart</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Original Price ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newDeal.originalPrice}
                      onChange={(e) =>
                        setNewDeal({
                          ...newDeal,
                          originalPrice: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Sale Price ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newDeal.salePrice}
                      onChange={(e) =>
                        setNewDeal({ ...newDeal, salePrice: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Product URL
                    </label>
                    <Input
                      placeholder="https://..."
                      value={newDeal.productUrl}
                      onChange={(e) =>
                        setNewDeal({ ...newDeal, productUrl: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Image URL
                    </label>
                    <Input
                      placeholder="https://..."
                      value={newDeal.imageUrl}
                      onChange={(e) =>
                        setNewDeal({ ...newDeal, imageUrl: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <Select
                      value={newDeal.category}
                      onValueChange={(value) =>
                        setNewDeal({ ...newDeal, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="home">Home & Kitchen</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <Input
                      placeholder="laptop, gaming, tech (comma separated)"
                      value={newDeal.tags}
                      onChange={(e) =>
                        setNewDeal({ ...newDeal, tags: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea
                    placeholder="Product description..."
                    value={newDeal.description}
                    onChange={(e) =>
                      setNewDeal({ ...newDeal, description: e.target.value })
                    }
                    className="min-h-[100px]"
                  />
                  <Button variant="outline" size="sm" className="mt-2">
                    Generate with AI
                  </Button>
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={newDeal.featured}
                    onChange={(e) =>
                      setNewDeal({ ...newDeal, featured: e.target.checked })
                    }
                  />
                  <label htmlFor="featured" className="text-sm text-gray-700">
                    Mark as Featured Deal
                  </label>
                </div>

                <div className="mt-6 flex gap-3">
                  <Button
                    onClick={handleCreateDeal}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Publish Deal
                  </Button>
                  <Button variant="outline">Save as Draft</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "submissions":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Deal Submissions
              </h1>
              <Badge variant="secondary">
                {sampleSubmissions.length} pending
              </Badge>
            </div>

            <Card>
              <CardContent className="p-3 sm:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Store</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleSubmissions.map((submission) => (
                        <TableRow key={submission.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{submission.user}</p>
                              <p className="text-xs text-gray-500">
                                {submission.userEmail}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">
                              {submission.productTitle}
                            </p>
                          </TableCell>
                          <TableCell>{submission.store}</TableCell>
                          <TableCell>
                            <div>
                              <span className="font-bold text-green-600">
                                ${submission.salePrice}
                              </span>
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${submission.originalPrice}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-sm">
                            {submission.dateSubmitted}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="destructive">
                                <X className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
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
          </div>
        );

      case "bulk-upload":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Mass Deal Upload
            </h1>

            <Card>
              <CardHeader>
                <CardTitle>Bulk Upload via URLs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Product URLs (one per line)
                    </label>
                    <Textarea
                      placeholder={`https://amazon.com/product1
https://bestbuy.com/product2
https://walmart.com/product3`}
                      value={bulkUrls}
                      onChange={(e) => setBulkUrls(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Default Store
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Auto-detect or select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">Auto-detect</SelectItem>
                          <SelectItem value="amazon">Amazon</SelectItem>
                          <SelectItem value="bestbuy">Best Buy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Default Category
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="home">Home & Kitchen</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="ai-descriptions" />
                    <label
                      htmlFor="ai-descriptions"
                      className="text-sm text-gray-700"
                    >
                      Generate descriptions with AI
                    </label>
                  </div>

                  <Button
                    onClick={handleBulkUpload}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Process URLs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "stores":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Manage Stores
              </h1>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Store
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleStores.map((store) => (
                <Card key={store.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{store.name}</h3>
                        <p className="text-sm text-gray-500">
                          {store.dealsCount} deals
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">API Key:</span>{" "}
                        {store.apiKey}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Status:</span>
                        <Badge
                          variant={store.isActive ? "default" : "secondary"}
                        >
                          {store.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case "users":
        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Manage Users
              </h1>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-3 sm:p-6">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500">
                                {user.email}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.role === "admin" ? "default" : "secondary"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p>{user.dealsSubmitted} deals</p>
                              <p>{user.alertsCreated} alerts</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Shield className="h-4 w-4" />
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
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              System Settings
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        OpenAI API Key
                      </label>
                      <Input type="password" placeholder="sk-..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Amazon API Key
                      </label>
                      <Input type="password" placeholder="AKIAI..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Walmart API Key
                      </label>
                      <Input type="password" placeholder="wmt..." />
                    </div>
                    <Button className="w-full">Save API Keys</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Email Notifications
                      </label>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Push Notifications
                      </label>
                      <Button variant="outline" size="sm">
                        Enabled
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        Auto-Upload Features
                      </label>
                      <Button variant="outline" size="sm">
                        Disabled
                      </Button>
                    </div>
                    <Button className="w-full">Save Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">
              You need admin privileges to access this page.
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const SidebarContent = () => (
    <div className="p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Admin Panel</h2>
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsMobileSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors duration-200",
                activeSection === item.id
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          <SidebarContent />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-gray-600 bg-opacity-75"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Mobile Menu Button */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
