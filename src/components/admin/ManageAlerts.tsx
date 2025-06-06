import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Bell,
  Search,
  Filter,
  User,
  Package,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Smartphone,
  Eye,
  Trash2,
  AlertTriangle,
  Calendar,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleAlerts = [
  {
    id: "1",
    user: {
      name: "John Doe",
      email: "john.doe@email.com",
      avatar: "JD",
      totalAlerts: 5,
    },
    product: {
      name: "Apple iPhone 15 Pro Max 256GB",
      currentPrice: 999,
      targetPrice: 899,
      store: "Amazon",
      category: "Electronics",
      imageUrl: "/placeholder.svg",
    },
    alert: {
      type: "price_drop",
      status: "active",
      method: "email",
      created: "2024-01-15",
      lastChecked: "2024-01-22 14:30",
      triggered: false,
      triggerCount: 0,
    },
  },
  {
    id: "2",
    user: {
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      avatar: "SW",
      totalAlerts: 8,
    },
    product: {
      name: "Samsung Galaxy S24 Ultra 512GB",
      currentPrice: 1099,
      targetPrice: 950,
      store: "Best Buy",
      category: "Electronics",
      imageUrl: "/placeholder.svg",
    },
    alert: {
      type: "price_drop",
      status: "triggered",
      method: "both",
      created: "2024-01-10",
      lastChecked: "2024-01-20 12:15",
      triggered: true,
      triggerCount: 2,
    },
  },
  {
    id: "3",
    user: {
      name: "Mike Jones",
      email: "mike.jones@email.com",
      avatar: "MJ",
      totalAlerts: 12,
    },
    product: {
      name: "Sony WH-1000XM5 Headphones",
      currentPrice: 279,
      targetPrice: 200,
      store: "Sony Store",
      category: "Electronics",
      imageUrl: "/placeholder.svg",
    },
    alert: {
      type: "price_drop",
      status: "active",
      method: "push",
      created: "2024-01-08",
      lastChecked: "2024-01-22 16:45",
      triggered: false,
      triggerCount: 0,
    },
  },
  {
    id: "4",
    user: {
      name: "Emily Chen",
      email: "emily.chen@email.com",
      avatar: "EC",
      totalAlerts: 3,
    },
    product: {
      name: "MacBook Air M2 13-inch",
      currentPrice: 999,
      targetPrice: 850,
      store: "Apple Store",
      category: "Electronics",
      imageUrl: "/placeholder.svg",
    },
    alert: {
      type: "price_drop",
      status: "paused",
      method: "email",
      created: "2024-01-12",
      lastChecked: "2024-01-18 10:00",
      triggered: false,
      triggerCount: 1,
    },
  },
  {
    id: "5",
    user: {
      name: "David Brown",
      email: "david.brown@email.com",
      avatar: "DB",
      totalAlerts: 15,
    },
    product: {
      name: "Nike Air Max 270 Running Shoes",
      currentPrice: 89,
      targetPrice: 70,
      store: "Nike",
      category: "Fashion",
      imageUrl: "/placeholder.svg",
    },
    alert: {
      type: "price_drop",
      status: "triggered",
      method: "email",
      created: "2024-01-05",
      lastChecked: "2024-01-21 08:30",
      triggered: true,
      triggerCount: 1,
    },
  },
];

const ManageAlerts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "triggered":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "triggered":
        return <Bell className="h-4 w-4 text-orange-600" />;
      case "paused":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "expired":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case "email":
        return <Mail className="h-4 w-4 text-blue-600" />;
      case "push":
        return <Smartphone className="h-4 w-4 text-purple-600" />;
      case "both":
        return <Bell className="h-4 w-4 text-green-600" />;
      default:
        return null;
    }
  };

  const handleToggleStatus = (alertId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    console.log(`Toggling alert ${alertId} status to ${newStatus}`);
  };

  const handleDelete = (alertId: string) => {
    console.log(`Deleting alert ${alertId}`);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} on`, selectedAlerts);
  };

  const filteredAlerts = sampleAlerts.filter((alert) => {
    const matchesSearch =
      alert.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.product.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || alert.alert.status === statusFilter;
    const matchesMethod =
      methodFilter === "all" || alert.alert.method === methodFilter;

    return matchesSearch && matchesStatus && matchesMethod;
  });

  const alertStats = {
    total: sampleAlerts.length,
    active: sampleAlerts.filter((a) => a.alert.status === "active").length,
    triggered: sampleAlerts.filter((a) => a.alert.status === "triggered")
      .length,
    paused: sampleAlerts.filter((a) => a.alert.status === "paused").length,
    totalTriggers: sampleAlerts.reduce(
      (sum, a) => sum + a.alert.triggerCount,
      0,
    ),
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manage Alerts
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage all user price alerts
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-orange-600">
            {alertStats.triggered} triggered
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Bell className="h-4 w-4 mr-2" />
            Alert Queue
          </Button>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Bell className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {alertStats.total}
              </p>
              <p className="text-xs text-gray-500">Total Alerts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {alertStats.active}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <AlertTriangle className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {alertStats.triggered}
              </p>
              <p className="text-xs text-gray-500">Triggered</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {alertStats.paused}
              </p>
              <p className="text-xs text-gray-500">Paused</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingDown className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {alertStats.totalTriggers}
              </p>
              <p className="text-xs text-gray-500">Total Triggers</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
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
                  <SelectItem value="triggered">Triggered</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Notification Method
              </label>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="email">Email Only</SelectItem>
                  <SelectItem value="push">Push Only</SelectItem>
                  <SelectItem value="both">Both Methods</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Date Created</SelectItem>
                  <SelectItem value="lastChecked">Last Checked</SelectItem>
                  <SelectItem value="triggers">Most Triggered</SelectItem>
                  <SelectItem value="targetPrice">Target Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedAlerts.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedAlerts.length} alert(s) selected
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

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            User Alerts ({filteredAlerts.length})
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
                          setSelectedAlerts(filteredAlerts.map((a) => a.id));
                        } else {
                          setSelectedAlerts([]);
                        }
                      }}
                      checked={
                        selectedAlerts.length === filteredAlerts.length &&
                        filteredAlerts.length > 0
                      }
                    />
                  </TableHead>
                  <TableHead>User & Product</TableHead>
                  <TableHead>Price Target</TableHead>
                  <TableHead>Alert Details</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAlerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedAlerts.includes(alert.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAlerts((prev) => [...prev, alert.id]);
                          } else {
                            setSelectedAlerts((prev) =>
                              prev.filter((id) => id !== alert.id),
                            );
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        {/* User Info */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {alert.user.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {alert.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {alert.user.totalAlerts} total alerts
                            </p>
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="flex items-center gap-2">
                          <img
                            src={alert.product.imageUrl}
                            alt=""
                            className="w-8 h-8 rounded object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {alert.product.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {alert.product.store}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {alert.product.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">
                            Current: ${alert.product.currentPrice}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-3 w-3 text-green-600" />
                          <span className="text-sm font-bold text-green-600">
                            Target: ${alert.product.targetPrice}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          {alert.product.currentPrice >
                          alert.product.targetPrice ? (
                            <span className="text-orange-600">
                              $
                              {alert.product.currentPrice -
                                alert.product.targetPrice}{" "}
                              above target
                            </span>
                          ) : (
                            <span className="text-green-600">
                              Target reached!
                            </span>
                          )}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(alert.alert.method)}
                          <span className="text-sm text-gray-600">
                            {alert.alert.method}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            Created: {alert.alert.created}
                          </span>
                        </div>
                        {alert.alert.triggerCount > 0 && (
                          <div className="text-xs text-orange-600">
                            Triggered {alert.alert.triggerCount} time(s)
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(alert.alert.status)}
                        <Badge
                          variant="outline"
                          className={getStatusColor(alert.alert.status)}
                        >
                          {alert.alert.status}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {alert.alert.lastChecked}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleToggleStatus(alert.id, alert.alert.status)
                          }
                          className={cn(
                            alert.alert.status === "active"
                              ? "text-yellow-600 hover:text-yellow-700"
                              : "text-green-600 hover:text-green-700",
                          )}
                        >
                          {alert.alert.status === "active" ? (
                            <Clock className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(alert.id)}
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

          {filteredAlerts.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No alerts found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alert Management Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Management Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Bell className="h-6 w-6 mb-2" />
              <span>Test Alert System</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingDown className="h-6 w-6 mb-2" />
              <span>Price Check All</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />
              <span>Export Alert Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageAlerts;
