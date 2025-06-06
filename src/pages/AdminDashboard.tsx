import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Users,
  Package,
  AlertTriangle,
  TrendingUp,
  Activity,
  DollarSign,
  Eye,
  Check,
  X,
  Star,
  Clock,
  RefreshCw,
  Settings,
  Shield,
  Database,
  Bell,
  Store,
  Tag,
  Plus,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Admin-specific data
const adminStats = {
  totalDeals: 1247,
  activeDeals: 890,
  pendingApprovals: 23,
  totalUsers: 8932,
  activeUsers: 4561,
  newUsersToday: 45,
  totalRevenue: 125000,
  monthlyRevenue: 25000,
  triggeredAlerts: 156,
  totalStores: 25,
  totalCategories: 10,
  systemHealth: 98.5,
};

const recentActivity = [
  {
    id: "1",
    type: "deal_submitted",
    message: "New deal submitted: iPhone 15 Pro Max",
    user: "john_doe",
    timestamp: "2 minutes ago",
    status: "pending",
  },
  {
    id: "2",
    type: "user_registered",
    message: "New user registration",
    user: "sarah_wilson",
    timestamp: "5 minutes ago",
    status: "completed",
  },
  {
    id: "3",
    type: "deal_approved",
    message: "Deal approved: Samsung Galaxy S24",
    user: "admin",
    timestamp: "10 minutes ago",
    status: "completed",
  },
  {
    id: "4",
    type: "alert_triggered",
    message: "Price alert triggered for Sony Headphones",
    user: "mike_jones",
    timestamp: "15 minutes ago",
    status: "completed",
  },
];

const pendingDeals = [
  {
    id: "1",
    title: "Sony WH-1000XM5 Headphones",
    store: "Sony",
    submittedBy: "john_doe",
    originalPrice: 399,
    salePrice: 279,
    discount: 30,
    submittedAt: "2024-01-20 14:30",
    category: "Electronics",
  },
  {
    id: "2",
    title: "Nintendo Switch OLED Console",
    store: "GameStop",
    submittedBy: "sarah_wilson",
    originalPrice: 349,
    salePrice: 299,
    discount: 14,
    submittedAt: "2024-01-20 12:15",
    category: "Gaming",
  },
];

const topPerformingDeals = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max",
    views: 15420,
    votes: 2340,
    conversions: 456,
    revenue: 15600,
  },
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra",
    views: 12890,
    votes: 1876,
    conversions: 334,
    revenue: 12200,
  },
  {
    id: "3",
    title: "MacBook Air M2",
    views: 9870,
    votes: 1456,
    conversions: 287,
    revenue: 18900,
  },
];

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "admin" || user.email === "admin@dealshub.com") {
      setIsAdmin(true);
    } else {
      window.location.href = "/";
    }
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleApprove = (dealId: string) => {
    console.log(`Approving deal ${dealId}`);
  };

  const handleReject = (dealId: string) => {
    console.log(`Rejecting deal ${dealId}`);
  };

  const sidebarItems = [
    {
      id: "overview",
      label: "Dashboard Overview",
      icon: BarChart3,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: TrendingUp,
    },
    {
      id: "activity",
      label: "Real-time Activity",
      icon: Activity,
    },
    {
      id: "approvals",
      label: "Pending Approvals",
      icon: AlertTriangle,
    },
    {
      id: "performance",
      label: "Top Performing",
      icon: Star,
    },
  ];

  const SidebarContent = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Admin Dashboard
      </h2>
      <nav className="space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors duration-200",
                "text-gray-700 hover:bg-blue-50 hover:text-blue-700",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions in Sidebar */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-gray-500 mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => (window.location.href = "/admin")}
          >
            <Settings className="h-4 w-4 mr-2" />
            Admin Panel
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-4">Admin privileges required.</p>
            <Button onClick={() => (window.location.href = "/")}>
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
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
            <h2 className="text-lg font-semibold text-gray-900">
              Admin Dashboard
            </h2>
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

          <div className="p-4 sm:p-6 lg:p-8">
            {/* Admin Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg mb-8">
              <div className="px-6 py-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-3">
                      <Shield className="h-8 w-8" />
                      Admin Dashboard
                    </h1>
                    <p className="text-blue-100 mt-1">
                      Welcome back, Administrator
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-white/20 text-white border-white/30"
                    >
                      System Health: {adminStats.systemHealth}%
                    </Badge>
                    <Button
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                      onClick={() => (window.location.href = "/admin")}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Admin Panel
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">
                        Total Deals
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {adminStats.totalDeals.toLocaleString()}
                      </p>
                      <p className="text-blue-100 text-xs mt-1">
                        +12% from last month
                      </p>
                    </div>
                    <Package className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">
                        Total Users
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {adminStats.totalUsers.toLocaleString()}
                      </p>
                      <p className="text-green-100 text-xs mt-1">
                        +{adminStats.newUsersToday} today
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">
                        Pending Approvals
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        {adminStats.pendingApprovals}
                      </p>
                      <p className="text-orange-100 text-xs mt-1">
                        Needs attention
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">
                        Monthly Revenue
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold">
                        ${adminStats.monthlyRevenue.toLocaleString()}
                      </p>
                      <p className="text-purple-100 text-xs mt-1">
                        +8% vs last month
                      </p>
                    </div>
                    <DollarSign className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Package className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {adminStats.activeDeals}
                    </p>
                    <p className="text-xs text-gray-500">Active Deals</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Users className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {adminStats.activeUsers.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">Active Users</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Store className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {adminStats.totalStores}
                    </p>
                    <p className="text-xs text-gray-500">Partner Stores</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <Bell className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">
                      {adminStats.triggeredAlerts}
                    </p>
                    <p className="text-xs text-gray-500">Alert Triggers</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Recent Activity */}
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    Real-time Activity
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full mt-2",
                            activity.status === "pending"
                              ? "bg-orange-500"
                              : "bg-green-500",
                          )}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.message}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">
                              by {activity.user}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-gray-500">
                              {activity.timestamp}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            activity.status === "pending"
                              ? "secondary"
                              : "default"
                          }
                          className={cn(
                            "text-xs",
                            activity.status === "pending" &&
                              "bg-orange-100 text-orange-700",
                          )}
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl font-bold flex items-center gap-2">
                    <Settings className="h-5 w-5 text-purple-500" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Deal
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="h-4 w-4 mr-2" />
                      Manage Users
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Store className="h-4 w-4 mr-2" />
                      Manage Stores
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Tag className="h-4 w-4 mr-2" />
                      Categories
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      System Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pending Approvals */}
            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  Pending Deal Approvals
                </CardTitle>
                <Badge variant="secondary">{pendingDeals.length} pending</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src="/placeholder.svg"
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {deal.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>Store: {deal.store}</span>
                            <span>By: {deal.submittedBy}</span>
                            <span>{deal.submittedAt}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="font-bold text-green-600">
                              ${deal.salePrice}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ${deal.originalPrice}
                            </span>
                            <Badge className="bg-red-100 text-red-700 text-xs">
                              -{deal.discount}%
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(deal.id)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(deal.id)}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Deals */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  Top Performing Deals
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Deal
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Views
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Votes
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Conversions
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">
                          Revenue
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPerformingDeals.map((deal, index) => (
                        <tr key={deal.id} className="border-b border-gray-100">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-orange-500">
                                #{index + 1}
                              </span>
                              <span className="font-medium">{deal.title}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {deal.views.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {deal.votes.toLocaleString()}
                          </td>
                          <td className="py-3 px-4 text-gray-600">
                            {deal.conversions}
                          </td>
                          <td className="py-3 px-4 font-bold text-green-600">
                            ${deal.revenue.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
