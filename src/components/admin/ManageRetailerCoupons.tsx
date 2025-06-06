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
  Store,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Copy,
  Search,
  Filter,
  Calendar,
  Percent,
  DollarSign,
  Users,
  Package,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Save,
  X,
  Star,
  Gift,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleRetailerCoupons = [
  {
    id: "1",
    code: "AMZ20OFF",
    title: "Amazon - 20% Off Electronics",
    description: "Get 20% off on electronics from Amazon",
    retailer: "Amazon",
    type: "percentage",
    value: 20,
    minOrderValue: 100,
    maxDiscount: 200,
    usageLimit: 1000,
    usageCount: 345,
    userLimit: 1,
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    categories: ["Electronics"],
    featured: true,
    createdBy: "admin",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    code: "WALMART50",
    title: "Walmart - $50 Off Home & Kitchen",
    description: "$50 off on home & kitchen items at Walmart",
    retailer: "Walmart",
    type: "fixed",
    value: 50,
    minOrderValue: 200,
    maxDiscount: 50,
    usageLimit: 500,
    usageCount: 156,
    userLimit: 1,
    status: "active",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    categories: ["Home & Kitchen"],
    featured: false,
    createdBy: "admin",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    code: "BESTBUY15",
    title: "Best Buy - 15% Off Gaming",
    description: "15% off on gaming products at Best Buy",
    retailer: "Best Buy",
    type: "percentage",
    value: 15,
    minOrderValue: 75,
    maxDiscount: 150,
    usageLimit: 750,
    usageCount: 423,
    userLimit: 2,
    status: "active",
    startDate: "2024-01-20",
    endDate: "2024-01-30",
    categories: ["Gaming"],
    featured: true,
    createdBy: "admin",
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    code: "TARGET25",
    title: "Target - 25% Off Fashion",
    description: "25% off on fashion items at Target",
    retailer: "Target",
    type: "percentage",
    value: 25,
    minOrderValue: 50,
    maxDiscount: 100,
    usageLimit: 300,
    usageCount: 89,
    userLimit: 1,
    status: "paused",
    startDate: "2024-01-10",
    endDate: "2024-03-10",
    categories: ["Fashion"],
    featured: false,
    createdBy: "admin",
    createdAt: "2024-01-10",
  },
  {
    id: "5",
    code: "NIKE30OFF",
    title: "Nike Store - 30% Off Sneakers",
    description: "Exclusive 30% off on sneakers at Nike",
    retailer: "Nike",
    type: "percentage",
    value: 30,
    minOrderValue: 80,
    maxDiscount: 120,
    usageLimit: 200,
    usageCount: 167,
    userLimit: 1,
    status: "active",
    startDate: "2024-01-05",
    endDate: "2024-02-05",
    categories: ["Fashion", "Sports"],
    featured: true,
    createdBy: "admin",
    createdAt: "2024-01-05",
  },
];

const ManageRetailerCoupons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [retailerFilter, setRetailerFilter] = useState("all");
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    title: "",
    description: "",
    retailer: "",
    type: "percentage",
    value: "",
    minOrderValue: "",
    maxDiscount: "",
    usageLimit: "",
    userLimit: "1",
    startDate: "",
    endDate: "",
    categories: "",
    featured: false,
  });

  const retailers = [
    { id: "amazon", name: "Amazon", logo: "🛒" },
    { id: "walmart", name: "Walmart", logo: "🏪" },
    { id: "bestbuy", name: "Best Buy", logo: "🔵" },
    { id: "target", name: "Target", logo: "🎯" },
    { id: "nike", name: "Nike", logo: "👟" },
    { id: "apple", name: "Apple Store", logo: "🍎" },
  ];

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Health & Beauty",
    "Sports",
    "Gaming",
    "Books",
    "Automotive",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      case "scheduled":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "paused":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "expired":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  const handleStatusToggle = (couponId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    console.log(`Toggling retailer coupon ${couponId} status to ${newStatus}`);
  };

  const handleDelete = (couponId: string) => {
    console.log(`Deleting retailer coupon ${couponId}`);
  };

  const handleCopyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Retailer coupon code "${code}" copied to clipboard!`);
  };

  const handleAddCoupon = () => {
    console.log("Adding new retailer coupon:", newCoupon);
    setNewCoupon({
      code: "",
      title: "",
      description: "",
      retailer: "",
      type: "percentage",
      value: "",
      minOrderValue: "",
      maxDiscount: "",
      usageLimit: "",
      userLimit: "1",
      startDate: "",
      endDate: "",
      categories: "",
      featured: false,
    });
    setShowAddCoupon(false);
  };

  const generateCouponCode = () => {
    const retailerCode = newCoupon.retailer.toUpperCase().substring(0, 3);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = retailerCode;
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon((prev) => ({ ...prev, code: code }));
  };

  const filteredCoupons = sampleRetailerCoupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.retailer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || coupon.status === statusFilter;
    const matchesRetailer =
      retailerFilter === "all" ||
      coupon.retailer.toLowerCase() === retailerFilter;

    return matchesSearch && matchesStatus && matchesRetailer;
  });

  const couponStats = {
    total: sampleRetailerCoupons.length,
    active: sampleRetailerCoupons.filter((c) => c.status === "active").length,
    paused: sampleRetailerCoupons.filter((c) => c.status === "paused").length,
    expired: sampleRetailerCoupons.filter((c) => c.status === "expired").length,
    featured: sampleRetailerCoupons.filter((c) => c.featured).length,
    totalUsage: sampleRetailerCoupons.reduce((sum, c) => sum + c.usageCount, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Retailer Coupons
          </h1>
          <p className="text-gray-600 mt-1">
            Manage discount coupons and promotional codes from partner retailers
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-600">
            {couponStats.active} active
          </Badge>
          <Badge variant="outline" className="text-purple-600">
            {couponStats.featured} featured
          </Badge>
          <Button
            onClick={() => setShowAddCoupon(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Retailer Coupon
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Store className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {couponStats.total}
              </p>
              <p className="text-xs text-gray-500">Total Coupons</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {couponStats.active}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Star className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {couponStats.featured}
              </p>
              <p className="text-xs text-gray-500">Featured</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {couponStats.paused}
              </p>
              <p className="text-xs text-gray-500">Paused</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Users className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {couponStats.totalUsage.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Total Uses</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Ticket className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {new Set(sampleRetailerCoupons.map((c) => c.retailer)).size}
              </p>
              <p className="text-xs text-gray-500">Partner Stores</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Retailer Coupon Form */}
      {showAddCoupon && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Retailer Coupon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Basic Information</h3>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Retailer *
                  </label>
                  <Select
                    value={newCoupon.retailer}
                    onValueChange={(value) =>
                      setNewCoupon((prev) => ({ ...prev, retailer: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select retailer" />
                    </SelectTrigger>
                    <SelectContent>
                      {retailers.map((retailer) => (
                        <SelectItem key={retailer.id} value={retailer.name}>
                          <div className="flex items-center gap-2">
                            <span>{retailer.logo}</span>
                            <span>{retailer.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Coupon Code *
                  </label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={newCoupon.code}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          code: e.target.value.toUpperCase(),
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateCouponCode}
                      disabled={!newCoupon.retailer}
                    >
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <Input
                    placeholder="e.g., Amazon - 20% Off Electronics"
                    value={newCoupon.title}
                    onChange={(e) =>
                      setNewCoupon((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <Textarea
                    placeholder="Enter coupon description"
                    rows={3}
                    value={newCoupon.description}
                    onChange={(e) =>
                      setNewCoupon((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Discount Type *
                    </label>
                    <Select
                      value={newCoupon.type}
                      onValueChange={(value) =>
                        setNewCoupon((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">
                          Percentage (%)
                        </SelectItem>
                        <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      {newCoupon.type === "percentage"
                        ? "Percentage"
                        : "Amount"}{" "}
                      *
                    </label>
                    <Input
                      type="number"
                      placeholder={
                        newCoupon.type === "percentage" ? "20" : "50"
                      }
                      value={newCoupon.value}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Conditions & Settings */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  Conditions & Settings
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Min Order Value
                    </label>
                    <Input
                      type="number"
                      placeholder="0"
                      value={newCoupon.minOrderValue}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          minOrderValue: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Max Discount
                    </label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={newCoupon.maxDiscount}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          maxDiscount: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Usage Limit
                    </label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={newCoupon.usageLimit}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          usageLimit: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      User Limit
                    </label>
                    <Input
                      type="number"
                      placeholder="1"
                      value={newCoupon.userLimit}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          userLimit: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Start Date *
                    </label>
                    <Input
                      type="date"
                      value={newCoupon.startDate}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      End Date *
                    </label>
                    <Input
                      type="date"
                      value={newCoupon.endDate}
                      onChange={(e) =>
                        setNewCoupon((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Categories
                  </label>
                  <Select
                    value={newCoupon.categories}
                    onValueChange={(value) =>
                      setNewCoupon((prev) => ({ ...prev, categories: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Featured Coupon
                    </h4>
                    <p className="text-sm text-gray-500">
                      Show in featured section
                    </p>
                  </div>
                  <Button
                    variant={newCoupon.featured ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setNewCoupon((prev) => ({
                        ...prev,
                        featured: !prev.featured,
                      }))
                    }
                  >
                    <Star
                      className={cn(
                        "h-4 w-4 mr-2",
                        newCoupon.featured && "fill-current",
                      )}
                    />
                    {newCoupon.featured ? "Featured" : "Not Featured"}
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button variant="outline" onClick={() => setShowAddCoupon(false)}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleAddCoupon}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Add Retailer Coupon
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search retailer coupons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Retailer
              </label>
              <Select value={retailerFilter} onValueChange={setRetailerFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Retailers</SelectItem>
                  {retailers.map((retailer) => (
                    <SelectItem
                      key={retailer.id}
                      value={retailer.name.toLowerCase()}
                    >
                      <div className="flex items-center gap-2">
                        <span>{retailer.logo}</span>
                        <span>{retailer.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Retailer Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Retailer Coupons ({filteredCoupons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Retailer & Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="font-medium">
                            {coupon.retailer}
                          </Badge>
                          {coupon.featured && (
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono font-bold">
                            {coupon.code}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyCouponCode(coupon.code)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600">{coupon.title}</p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {coupon.type === "percentage" ? (
                            <Percent className="h-4 w-4 text-green-600" />
                          ) : (
                            <DollarSign className="h-4 w-4 text-blue-600" />
                          )}
                          <span className="font-bold text-lg">
                            {coupon.type === "percentage"
                              ? `${coupon.value}%`
                              : `$${coupon.value}`}
                          </span>
                        </div>
                        {coupon.minOrderValue > 0 && (
                          <p className="text-xs text-gray-500">
                            Min: ${coupon.minOrderValue}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {coupon.usageCount}
                          </span>
                          <span className="text-gray-400">/</span>
                          <span className="text-gray-600">
                            {coupon.usageLimit}
                          </span>
                        </div>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min((coupon.usageCount / coupon.usageLimit) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {Array.isArray(coupon.categories)
                          ? coupon.categories.join(", ")
                          : coupon.categories}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(coupon.status)}
                        <Badge
                          variant="outline"
                          className={getStatusColor(coupon.status)}
                        >
                          {coupon.status}
                        </Badge>
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
                          onClick={() =>
                            handleStatusToggle(coupon.id, coupon.status)
                          }
                          className={cn(
                            coupon.status === "active"
                              ? "text-yellow-600 hover:text-yellow-700"
                              : "text-green-600 hover:text-green-700",
                          )}
                        >
                          {coupon.status === "active" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(coupon.id)}
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

          {filteredCoupons.length === 0 && (
            <div className="text-center py-8">
              <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No retailer coupons found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageRetailerCoupons;
