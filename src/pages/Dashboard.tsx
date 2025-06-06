import { useState } from "react";
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
  Bell,
  Settings,
  Plus,
  Heart,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Mail,
  Lock,
  Search,
  DollarSign,
  Package,
  Eye,
  Edit3,
  Trash2,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Sample data
const sampleAlerts = [
  {
    id: "1",
    productName: "Apple iPhone 15 Pro Max 256GB",
    currentPrice: 999,
    targetPrice: 899,
    retailer: "Amazon",
    status: "active",
    createdAt: "2024-01-15",
    lastChecked: "2024-01-20 14:30",
  },
  {
    id: "2",
    productName: "Samsung Galaxy S24 Ultra 512GB",
    currentPrice: 1099,
    targetPrice: 950,
    retailer: "Best Buy",
    status: "triggered",
    createdAt: "2024-01-10",
    lastChecked: "2024-01-20 12:15",
  },
  {
    id: "3",
    productName: "Sony WH-1000XM5 Headphones",
    currentPrice: 279,
    targetPrice: 200,
    retailer: "Sony",
    status: "active",
    createdAt: "2024-01-08",
    lastChecked: "2024-01-20 16:45",
  },
];

const sampleSubmittedDeals = [
  {
    id: "1",
    title: "MacBook Air M2 Special Discount",
    dateSubmitted: "2024-01-18",
    status: "approved",
    votes: 45,
    comments: 8,
  },
  {
    id: "2",
    title: "Gaming Chair 50% Off Limited Time",
    dateSubmitted: "2024-01-16",
    status: "pending",
    votes: 12,
    comments: 3,
  },
  {
    id: "3",
    title: "Wireless Earbuds Flash Sale",
    dateSubmitted: "2024-01-14",
    status: "rejected",
    votes: 8,
    comments: 2,
  },
];

const sampleNotifications = [
  {
    id: "1",
    type: "alert",
    message: "Price drop alert: Samsung Galaxy S24 Ultra is now $950!",
    timestamp: "2024-01-20 12:15",
    read: false,
  },
  {
    id: "2",
    type: "approval",
    message: "Your deal 'MacBook Air M2 Special Discount' has been approved!",
    timestamp: "2024-01-19 09:30",
    read: false,
  },
  {
    id: "3",
    type: "system",
    message: "New feature: You can now set multiple price alerts per product.",
    timestamp: "2024-01-18 14:00",
    read: true,
  },
];

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    productUrl: "",
    retailer: "",
    targetPrice: "",
    alertType: "email",
  });
  const [userSettings, setUserSettings] = useState({
    email: "user@example.com",
    emailNotifications: true,
    pushNotifications: true,
  });

  const sidebarItems = [
    {
      id: "overview",
      label: "Dashboard Overview",
      icon: BarChart3,
    },
    {
      id: "alerts",
      label: "My Alerts",
      icon: Bell,
    },
    {
      id: "submitted",
      label: "My Submitted Deals",
      icon: Package,
    },
    {
      id: "profile",
      label: "Profile Settings",
      icon: Settings,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: AlertCircle,
    },
  ];

  const handleCreateAlert = () => {
    // Handle alert creation logic
    console.log("Creating alert:", newAlert);
    setNewAlert({
      productUrl: "",
      retailer: "",
      targetPrice: "",
      alertType: "email",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "triggered":
        return <AlertCircle className="h-4 w-4 text-orange-600" />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Overview
            </h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Heart className="h-8 w-8 text-red-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Saved Deals
                      </p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Bell className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Active Alerts
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {
                          sampleAlerts.filter((a) => a.status === "active")
                            .length
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <Package className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Submitted Deals
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {sampleSubmittedDeals.length}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <DollarSign className="h-8 w-8 text-yellow-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Savings
                      </p>
                      <p className="text-2xl font-bold text-gray-900">$2,340</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleNotifications.slice(0, 5).map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-2",
                          notification.read ? "bg-gray-300" : "bg-orange-500",
                        )}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "alerts":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">My Alerts</h1>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add New Alert
              </Button>
            </div>

            {/* Add New Alert Form */}
            <Card>
              <CardHeader>
                <CardTitle>Create Price Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Product URL or Search
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Enter product URL or search for product"
                        value={newAlert.productUrl}
                        onChange={(e) =>
                          setNewAlert({
                            ...newAlert,
                            productUrl: e.target.value,
                          })
                        }
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Retailer
                    </label>
                    <Select
                      value={newAlert.retailer}
                      onValueChange={(value) =>
                        setNewAlert({ ...newAlert, retailer: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select retailer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="walmart">Walmart</SelectItem>
                        <SelectItem value="bestbuy">Best Buy</SelectItem>
                        <SelectItem value="target">Target</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Target Price ($)
                    </label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={newAlert.targetPrice}
                      onChange={(e) =>
                        setNewAlert({
                          ...newAlert,
                          targetPrice: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Alert Type
                    </label>
                    <Select
                      value={newAlert.alertType}
                      onValueChange={(value) =>
                        setNewAlert({ ...newAlert, alertType: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  onClick={handleCreateAlert}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  Create Alert
                </Button>
              </CardContent>
            </Card>

            {/* Alerts List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Price Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {alert.productName}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                            <div>
                              <span className="text-gray-500">
                                Current Price:
                              </span>
                              <span className="font-medium ml-2">
                                ${alert.currentPrice}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">
                                Target Price:
                              </span>
                              <span className="font-medium ml-2">
                                ${alert.targetPrice}
                              </span>
                            </div>
                            <div>
                              <span className="text-gray-500">Retailer:</span>
                              <span className="font-medium ml-2">
                                {alert.retailer}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(alert.status)}
                              <span className="capitalize">{alert.status}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-2">
                            Last checked: {alert.lastChecked}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "submitted":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              My Submitted Deals
            </h1>

            <Card>
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Deal Title</TableHead>
                      <TableHead>Date Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Votes</TableHead>
                      <TableHead>Comments</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleSubmittedDeals.map((deal) => (
                      <TableRow key={deal.id}>
                        <TableCell className="font-medium">
                          {deal.title}
                        </TableCell>
                        <TableCell>{deal.dateSubmitted}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(deal.status)}
                            <Badge
                              variant={
                                deal.status === "approved"
                                  ? "default"
                                  : deal.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                              className={cn(
                                deal.status === "approved" &&
                                  "bg-green-100 text-green-800",
                                deal.status === "pending" &&
                                  "bg-yellow-100 text-yellow-800",
                              )}
                            >
                              {deal.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{deal.votes}</TableCell>
                        <TableCell>{deal.comments}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              Profile Settings
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Account Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          value={userSettings.email}
                          onChange={(e) =>
                            setUserSettings({
                              ...userSettings,
                              email: e.target.value,
                            })
                          }
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Update Account
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Email Notifications
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive alerts and updates via email
                        </p>
                      </div>
                      <Button
                        variant={
                          userSettings.emailNotifications
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setUserSettings({
                            ...userSettings,
                            emailNotifications:
                              !userSettings.emailNotifications,
                          })
                        }
                      >
                        {userSettings.emailNotifications
                          ? "Enabled"
                          : "Disabled"}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          Push Notifications
                        </h4>
                        <p className="text-sm text-gray-500">
                          Receive instant push notifications
                        </p>
                      </div>
                      <Button
                        variant={
                          userSettings.pushNotifications ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setUserSettings({
                            ...userSettings,
                            pushNotifications: !userSettings.pushNotifications,
                          })
                        }
                      >
                        {userSettings.pushNotifications
                          ? "Enabled"
                          : "Disabled"}
                      </Button>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Save Preferences
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                Notifications
              </h1>
              <Button variant="outline">Mark All as Read</Button>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {sampleNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-lg border transition-colors duration-200",
                        notification.read
                          ? "bg-gray-50 border-gray-200"
                          : "bg-orange-50 border-orange-200",
                      )}
                    >
                      <div
                        className={cn(
                          "w-3 h-3 rounded-full mt-1 flex-shrink-0",
                          notification.read ? "bg-gray-300" : "bg-orange-500",
                        )}
                      />
                      <div className="flex-1">
                        <p
                          className={cn(
                            "text-sm",
                            notification.read
                              ? "text-gray-700"
                              : "text-gray-900 font-medium",
                          )}
                        >
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.timestamp}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs",
                            notification.type === "alert" &&
                              "border-red-200 text-red-700",
                            notification.type === "approval" &&
                              "border-green-200 text-green-700",
                            notification.type === "system" &&
                              "border-blue-200 text-blue-700",
                          )}
                        >
                          {notification.type}
                        </Badge>
                        {!notification.read && (
                          <Button variant="ghost" size="sm" className="text-xs">
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const SidebarContent = () => (
    <div className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Dashboard</h2>
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
                  ? "bg-orange-100 text-orange-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
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
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
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

          <div className="p-6 lg:p-8">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
