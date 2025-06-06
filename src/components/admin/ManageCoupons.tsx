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
  Ticket,
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
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleCoupons = [
  {
    id: "1",
    code: "WELCOME20",
    title: "Welcome New Users",
    description: "20% off for new user registrations",
    type: "percentage",
    value: 20,
    minOrderValue: 50,
    maxDiscount: 100,
    usageLimit: 1000,
    usageCount: 245,
    userLimit: 1,
    status: "active",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    categories: ["All"],
    stores: ["All"],
    createdBy: "admin",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    code: "ELECTRONICS50",
    title: "Electronics Flash Sale",
    description: "$50 off on electronics purchases over $200",
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
    categories: ["Electronics"],
    stores: ["Amazon", "Best Buy"],
    createdBy: "admin",
    createdAt: "2024-01-15",
  },
  {
    id: "3",
    code: "FASHION15",
    title: "Fashion Week Special",
    description: "15% off on all fashion items",
    type: "percentage",
    value: 15,
    minOrderValue: 75,
    maxDiscount: 75,
    usageLimit: 750,
    usageCount: 423,
    userLimit: 2,
    status: "active",
    startDate: "2024-01-20",
    endDate: "2024-01-30",
    categories: ["Fashion"],
    stores: ["Nike", "Adidas"],
    createdBy: "admin",
    createdAt: "2024-01-20",
  },
  {
    id: "4",
    code: "EXPIRED10",
    title: "Holiday Special",
    description: "10% off holiday deals (expired)",
    type: "percentage",
    value: 10,
    minOrderValue: 30,
    maxDiscount: 50,
    usageLimit: 2000,
    usageCount: 1847,
    userLimit: 1,
    status: "expired",
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    categories: ["All"],
    stores: ["All"],
    createdBy: "admin",
    createdAt: "2023-12-01",
  },
  {
    id: "5",
    code: "VIP25",
    title: "VIP Member Exclusive",
    description: "25% off for VIP members only",
    type: "percentage",
    value: 25,
    minOrderValue: 100,
    maxDiscount: 150,
    usageLimit: 100,
    usageCount: 12,
    userLimit: 3,
    status: "paused",
    startDate: "2024-01-01",
    endDate: "2024-06-30",
    categories: ["All"],
    stores: ["All"],
    createdBy: "admin",
    createdAt: "2024-01-01",
  },
];

const ManageCoupons = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showAddCoupon, setShowAddCoupon] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<string | null>(null);
  const [selectedCoupons, setSelectedCoupons] = useState<string[]>([]);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    title: "",
    description: "",
    type: "percentage",
    value: "",
    minOrderValue: "",
    maxDiscount: "",
    usageLimit: "",
    userLimit: "1",
    startDate: "",
    endDate: "",
    categories: "All",
    stores: "All",
  });

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
    console.log(`Toggling coupon ${couponId} status to ${newStatus}`);
  };

  const handleDelete = (couponId: string) => {
    console.log(`Deleting coupon ${couponId}`);
  };

  const handleCopyCouponCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon code "${code}" copied to clipboard!`);
  };

  const handleAddCoupon = () => {
    console.log("Adding new coupon:", newCoupon);
    setNewCoupon({
      code: "",
      title: "",
      description: "",
      type: "percentage",
      value: "",
      minOrderValue: "",
      maxDiscount: "",
      usageLimit: "",
      userLimit: "1",
      startDate: "",
      endDate: "",
      categories: "All",
      stores: "All",
    });
    setShowAddCoupon(false);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} on`, selectedCoupons);
  };

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon((prev) => ({ ...prev, code: code }));
  };

  const filteredCoupons = sampleCoupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || coupon.status === statusFilter;
    const matchesType = typeFilter === "all" || coupon.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const couponStats = {
    total: sampleCoupons.length,
    active: sampleCoupons.filter((c) => c.status === "active").length,
    paused: sampleCoupons.filter((c) => c.status === "paused").length,
    expired: sampleCoupons.filter((c) => c.status === "expired").length,
    totalUsage: sampleCoupons.reduce((sum, c) => sum + c.usageCount, 0),
    totalSavings: sampleCoupons.reduce(
      (sum, c) => sum + c.usageCount * c.value,
      0,
    ),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manage Coupons
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage discount coupons and promotional codes
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-600">
            {couponStats.active} active coupons
          </Badge>
          <Button
            onClick={() => setShowAddCoupon(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Coupon
          </Button>
        </div>
      </div>

      {/* Coupon Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Ticket className="h-6 w-6 text-blue-500 mx-auto mb-2" />
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
              <XCircle className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {couponStats.expired}
              </p>
              <p className="text-xs text-gray-500">Expired</p>
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
              <DollarSign className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                ${couponStats.totalSavings.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Total Savings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Coupon Form */}
      {showAddCoupon && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create New Coupon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Basic Information</h3>

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
                    >
                      Generate
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Coupon Title *
                  </label>
                  <Input
                    placeholder="Enter coupon title"
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

              {/* Conditions & Limits */}
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">
                  Conditions & Limits
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

                <div className="grid grid-cols-2 gap-4">
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
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Categories</SelectItem>
                        <SelectItem value="Electronics">Electronics</SelectItem>
                        <SelectItem value="Fashion">Fashion</SelectItem>
                        <SelectItem value="Home">Home & Kitchen</SelectItem>
                        <SelectItem value="Health">Health & Beauty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Stores
                    </label>
                    <Select
                      value={newCoupon.stores}
                      onValueChange={(value) =>
                        setNewCoupon((prev) => ({ ...prev, stores: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Stores</SelectItem>
                        <SelectItem value="Amazon">Amazon</SelectItem>
                        <SelectItem value="Walmart">Walmart</SelectItem>
                        <SelectItem value="Best Buy">Best Buy</SelectItem>
                        <SelectItem value="Target">Target</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddCoupon(false);
                  setNewCoupon({
                    code: "",
                    title: "",
                    description: "",
                    type: "percentage",
                    value: "",
                    minOrderValue: "",
                    maxDiscount: "",
                    usageLimit: "",
                    userLimit: "1",
                    startDate: "",
                    endDate: "",
                    categories: "All",
                    stores: "All",
                  });
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleAddCoupon}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Coupon
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
                  placeholder="Search coupons..."
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
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed Amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedCoupons.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedCoupons.length} coupon(s) selected
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleBulkAction("activate")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Activate Selected
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("pause")}
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Pause Selected
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleBulkAction("delete")}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Coupons Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            All Coupons ({filteredCoupons.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCoupons(filteredCoupons.map((c) => c.id));
                        } else {
                          setSelectedCoupons([]);
                        }
                      }}
                      checked={
                        selectedCoupons.length === filteredCoupons.length &&
                        filteredCoupons.length > 0
                      }
                    />
                  </TableHead>
                  <TableHead>Coupon Details</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Validity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCoupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedCoupons.includes(coupon.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCoupons((prev) => [...prev, coupon.id]);
                          } else {
                            setSelectedCoupons((prev) =>
                              prev.filter((id) => id !== coupon.id),
                            );
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
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
                        <p className="font-medium text-gray-900">
                          {coupon.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {coupon.description}
                        </p>
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
                            Min order: ${coupon.minOrderValue}
                          </p>
                        )}
                        {coupon.maxDiscount > 0 &&
                          coupon.type === "percentage" && (
                            <p className="text-xs text-gray-500">
                              Max discount: ${coupon.maxDiscount}
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
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${Math.min((coupon.usageCount / coupon.usageLimit) * 100, 100)}%`,
                            }}
                          />
                        </div>
                        <p className="text-xs text-gray-500">
                          {Math.round(
                            (coupon.usageCount / coupon.usageLimit) * 100,
                          )}
                          % used
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {coupon.startDate}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          to {coupon.endDate}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="text-xs">
                            {coupon.categories}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {coupon.stores}
                          </Badge>
                        </div>
                      </div>
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
              <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No coupons found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Coupon Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Coupon Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCoupons.slice(0, 3).map((coupon) => {
              const usagePercentage =
                (coupon.usageCount / coupon.usageLimit) * 100;
              const performanceLevel =
                usagePercentage > 70
                  ? "high"
                  : usagePercentage > 30
                    ? "medium"
                    : "low";

              return (
                <div
                  key={coupon.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-3 h-3 rounded-full",
                        performanceLevel === "high"
                          ? "bg-green-500"
                          : performanceLevel === "medium"
                            ? "bg-yellow-500"
                            : "bg-red-500",
                      )}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{coupon.code}</p>
                      <p className="text-sm text-gray-500">{coupon.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {Math.round(usagePercentage)}%
                    </p>
                    <p className="text-sm text-gray-500">Usage Rate</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCoupons;
