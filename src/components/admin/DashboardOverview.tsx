import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Package,
  Bell,
  TrendingUp,
  Activity,
  Eye,
  AlertTriangle,
  DollarSign,
  Store,
  Tag,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminStats = {
  activeDeals: 1247,
  newSubmissions: 23,
  totalUsers: 8932,
  triggeredAlerts: 156,
  pendingDeals: 45,
  featuredDeals: 89,
  totalStores: 25,
  totalCategories: 10,
  monthlyRevenue: 25000,
  dailyRevenue: 1250,
  conversionRate: 3.2,
  avgOrderValue: 85.5,
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
  {
    id: "5",
    type: "deal_expired",
    message: "Deal expired: MacBook Air M2 Discount",
    user: "system",
    timestamp: "1 hour ago",
    status: "expired",
  },
];

const DashboardOverview = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-1">
            Real-time platform statistics and activity
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-600 border-green-200">
            System Operational
          </Badge>
          <Button variant="outline" size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Deals
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminStats.activeDeals.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1">+12% this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  New Submissions
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminStats.newSubmissions}
                </p>
                <p className="text-xs text-orange-600 mt-1">Awaiting review</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminStats.totalUsers.toLocaleString()}
                </p>
                <p className="text-xs text-green-600 mt-1">+234 this week</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <Bell className="h-8 w-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Triggered Alerts
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {adminStats.triggeredAlerts}
                </p>
                <p className="text-xs text-purple-600 mt-1">Last 24h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Package className="h-6 w-6 text-gray-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">
                {adminStats.pendingDeals}
              </p>
              <p className="text-xs text-gray-500">Pending Deals</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Store className="h-6 w-6 text-gray-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">
                {adminStats.totalStores}
              </p>
              <p className="text-xs text-gray-500">Partner Stores</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Tag className="h-6 w-6 text-gray-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">
                {adminStats.totalCategories}
              </p>
              <p className="text-xs text-gray-500">Categories</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-gray-500 mx-auto mb-2" />
              <p className="text-lg font-bold text-gray-900">
                {adminStats.featuredDeals}
              </p>
              <p className="text-xs text-gray-500">Featured Deals</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  ${adminStats.monthlyRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-xs text-green-600">+8.2% vs last month</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  ${adminStats.dailyRevenue.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">Daily Revenue</p>
                <p className="text-xs text-blue-600">+15% vs yesterday</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {adminStats.conversionRate}%
                </p>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-xs text-purple-600">+0.3% improvement</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  ${adminStats.avgOrderValue}
                </p>
                <p className="text-sm text-gray-500">Avg Order Value</p>
                <p className="text-xs text-orange-600">+$2.50 vs last week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-blue-500" />
            Recent Activity
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
                      : activity.status === "expired"
                        ? "bg-red-500"
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
                      : activity.status === "expired"
                        ? "destructive"
                        : "default"
                  }
                  className={cn(
                    "text-xs",
                    activity.status === "pending" &&
                      "bg-orange-100 text-orange-700",
                    activity.status === "expired" && "bg-red-100 text-red-700",
                  )}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-500" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Server Response Time
                </span>
                <Badge variant="outline" className="text-green-600">
                  124ms
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Database Queries</span>
                <Badge variant="outline" className="text-blue-600">
                  45ms avg
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">API Uptime</span>
                <Badge variant="outline" className="text-green-600">
                  99.9%
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cache Hit Rate</span>
                <Badge variant="outline" className="text-purple-600">
                  89.2%
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Package className="h-4 w-4 mr-2" />
                Review Pending Deals ({adminStats.newSubmissions})
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage User Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="h-4 w-4 mr-2" />
                Check Alert Queue ({adminStats.triggeredAlerts})
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Generate Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
