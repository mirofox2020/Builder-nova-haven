import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ExternalLink,
  Key,
  Package,
  TrendingUp,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Save,
  X,
  Upload,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleStores = [
  {
    id: "1",
    name: "Amazon",
    logo: "🛒",
    logoUrl: "/placeholder.svg",
    website: "https://amazon.com",
    apiKey: "AMZ_API_KEY_123",
    integrationKey: "amazon_affiliate_id",
    commissionRate: 5.0,
    status: "active",
    dealCount: 342,
    totalRevenue: 15600,
    lastSync: "2024-01-22 14:30",
    category: "marketplace",
    contactEmail: "partner@amazon.com",
    notes: "Primary marketplace partner",
  },
  {
    id: "2",
    name: "Best Buy",
    logo: "🔵",
    logoUrl: "/placeholder.svg",
    website: "https://bestbuy.com",
    apiKey: "BBY_API_KEY_456",
    integrationKey: "bestbuy_partner_id",
    commissionRate: 4.5,
    status: "active",
    dealCount: 198,
    totalRevenue: 8900,
    lastSync: "2024-01-22 12:15",
    category: "electronics",
    contactEmail: "affiliates@bestbuy.com",
    notes: "Electronics specialist",
  },
  {
    id: "3",
    name: "Walmart",
    logo: "🏪",
    logoUrl: "/placeholder.svg",
    website: "https://walmart.com",
    apiKey: "WMT_API_KEY_789",
    integrationKey: "walmart_affiliate_id",
    commissionRate: 3.5,
    status: "active",
    dealCount: 267,
    totalRevenue: 12300,
    lastSync: "2024-01-22 16:45",
    category: "marketplace",
    contactEmail: "partners@walmart.com",
    notes: "General merchandise partner",
  },
  {
    id: "4",
    name: "Nike",
    logo: "👟",
    logoUrl: "/placeholder.svg",
    website: "https://nike.com",
    apiKey: "NIKE_API_KEY_101",
    integrationKey: "nike_brand_partner",
    commissionRate: 7.0,
    status: "active",
    dealCount: 89,
    totalRevenue: 6700,
    lastSync: "2024-01-22 10:20",
    category: "fashion",
    contactEmail: "digital@nike.com",
    notes: "Sports and lifestyle brand",
  },
  {
    id: "5",
    name: "Apple Store",
    logo: "🍎",
    logoUrl: "/placeholder.svg",
    website: "https://apple.com",
    apiKey: "APPLE_API_KEY_202",
    integrationKey: "apple_affiliate_token",
    commissionRate: 2.5,
    status: "pending",
    dealCount: 45,
    totalRevenue: 8900,
    lastSync: "2024-01-20 08:00",
    category: "electronics",
    contactEmail: "affiliate@apple.com",
    notes: "Premium electronics, lower commission",
  },
  {
    id: "6",
    name: "Target",
    logo: "🎯",
    logoUrl: "/placeholder.svg",
    website: "https://target.com",
    apiKey: "",
    integrationKey: "",
    commissionRate: 4.0,
    status: "inactive",
    dealCount: 0,
    totalRevenue: 0,
    lastSync: "Never",
    category: "marketplace",
    contactEmail: "partnerships@target.com",
    notes: "Pending API integration setup",
  },
];

const ManageStores = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingStore, setEditingStore] = useState<string | null>(null);
  const [showAddStore, setShowAddStore] = useState(false);
  const [newStore, setNewStore] = useState({
    name: "",
    website: "",
    logo: "",
    apiKey: "",
    integrationKey: "",
    commissionRate: "",
    category: "",
    contactEmail: "",
    notes: "",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Eye className="h-4 w-4 text-yellow-600" />;
      case "inactive":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const handleStatusToggle = (storeId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    console.log(`Toggling store ${storeId} status to ${newStatus}`);
  };

  const handleDelete = (storeId: string) => {
    console.log(`Deleting store ${storeId}`);
  };

  const handleAddStore = () => {
    console.log("Adding new store:", newStore);
    setNewStore({
      name: "",
      website: "",
      logo: "",
      apiKey: "",
      integrationKey: "",
      commissionRate: "",
      category: "",
      contactEmail: "",
      notes: "",
    });
    setShowAddStore(false);
  };

  const handleSync = (storeId: string) => {
    console.log(`Syncing store ${storeId}`);
  };

  const filteredStores = sampleStores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.website.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || store.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || store.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalDeals = sampleStores.reduce(
    (sum, store) => sum + store.dealCount,
    0,
  );
  const totalRevenue = sampleStores.reduce(
    (sum, store) => sum + store.totalRevenue,
    0,
  );
  const activeStores = sampleStores.filter(
    (store) => store.status === "active",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manage Stores
          </h1>
          <p className="text-gray-600 mt-1">
            Add, edit, and manage partner stores and their integrations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">{activeStores} active stores</Badge>
          <Button
            onClick={() => setShowAddStore(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Store
          </Button>
        </div>
      </div>

      {/* Store Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Store className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {sampleStores.length}
              </p>
              <p className="text-xs text-gray-500">Total Stores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{activeStores}</p>
              <p className="text-xs text-gray-500">Active Stores</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Package className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{totalDeals}</p>
              <p className="text-xs text-gray-500">Total Deals</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Store Form */}
      {showAddStore && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Store
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Store Name *
                </label>
                <Input
                  placeholder="Enter store name"
                  value={newStore.name}
                  onChange={(e) =>
                    setNewStore((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Website URL *
                </label>
                <Input
                  placeholder="https://..."
                  value={newStore.website}
                  onChange={(e) =>
                    setNewStore((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Logo Emoji
                </label>
                <Input
                  placeholder="🛒"
                  value={newStore.logo}
                  onChange={(e) =>
                    setNewStore((prev) => ({ ...prev, logo: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Input
                  placeholder="marketplace, electronics, fashion..."
                  value={newStore.category}
                  onChange={(e) =>
                    setNewStore((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  API Key
                </label>
                <Input
                  placeholder="API key for integration"
                  value={newStore.apiKey}
                  onChange={(e) =>
                    setNewStore((prev) => ({ ...prev, apiKey: e.target.value }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Integration Key
                </label>
                <Input
                  placeholder="Partner/affiliate ID"
                  value={newStore.integrationKey}
                  onChange={(e) =>
                    setNewStore((prev) => ({
                      ...prev,
                      integrationKey: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Commission Rate (%)
                </label>
                <Input
                  type="number"
                  placeholder="5.0"
                  value={newStore.commissionRate}
                  onChange={(e) =>
                    setNewStore((prev) => ({
                      ...prev,
                      commissionRate: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Contact Email
                </label>
                <Input
                  type="email"
                  placeholder="partner@store.com"
                  value={newStore.contactEmail}
                  onChange={(e) =>
                    setNewStore((prev) => ({
                      ...prev,
                      contactEmail: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-gray-700">
                  Notes
                </label>
                <Input
                  placeholder="Additional notes about this store..."
                  value={newStore.notes}
                  onChange={(e) =>
                    setNewStore((prev) => ({ ...prev, notes: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddStore(false);
                  setNewStore({
                    name: "",
                    website: "",
                    logo: "",
                    apiKey: "",
                    integrationKey: "",
                    commissionRate: "",
                    category: "",
                    contactEmail: "",
                    notes: "",
                  });
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button
                onClick={handleAddStore}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Add Store
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
            Filters
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
                  placeholder="Search stores..."
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
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="marketplace">Marketplace</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stores Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Partner Stores ({filteredStores.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Store</TableHead>
                  <TableHead>Integration</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Commission</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStores.map((store) => (
                  <TableRow key={store.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <span className="text-lg">{store.logo}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {store.name}
                          </p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Globe className="h-3 w-3" />
                            <a
                              href={store.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-600"
                            >
                              {store.website}
                            </a>
                          </div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {store.category}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Key className="h-3 w-3 text-gray-400" />
                          <span className="text-xs font-mono text-gray-600">
                            {store.apiKey ? "API Configured" : "No API"}
                          </span>
                        </div>
                        {store.integrationKey && (
                          <p className="text-xs text-gray-500">
                            ID: {store.integrationKey}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {store.dealCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />$
                            {store.totalRevenue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="outline">{store.commissionRate}%</Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(store.status)}
                        <Badge
                          variant="outline"
                          className={getStatusColor(store.status)}
                        >
                          {store.status}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {store.lastSync}
                      </span>
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
                          onClick={() => handleSync(store.id)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusToggle(store.id, store.status)
                          }
                          className={cn(
                            store.status === "active"
                              ? "text-orange-600 hover:text-orange-700"
                              : "text-green-600 hover:text-green-700",
                          )}
                        >
                          {store.status === "active" ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(store.id)}
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

          {filteredStores.length === 0 && (
            <div className="text-center py-8">
              <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No stores found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Operations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Sync All Active
            </Button>
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Activate Selected
            </Button>
            <Button variant="outline">
              <XCircle className="h-4 w-4 mr-2" />
              Deactivate Selected
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageStores;
