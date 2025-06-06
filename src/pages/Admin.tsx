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
  Plus,
  Settings,
  Store,
  Tag,
  Bell,
  Upload,
  Menu,
  X,
  Shield,
  Database,
  Globe,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import admin components
import DashboardOverview from "@/components/admin/DashboardOverview";
import ManageDeals from "@/components/admin/ManageDeals";
import AddNewDeal from "@/components/admin/AddNewDeal";
import DealSubmissions from "@/components/admin/DealSubmissions";
import ManageCategories from "@/components/admin/ManageCategories";
import ManageStores from "@/components/admin/ManageStores";
import ManageAlerts from "@/components/admin/ManageAlerts";
import UsersManagement from "@/components/admin/UsersManagement";
import SystemSettings from "@/components/admin/SystemSettings";
import MassUpload from "@/components/admin/MassUpload";
import ManageCoupons from "@/components/admin/ManageCoupons";

const Admin = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check admin access
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "admin" || user.email === "admin@dealshub.com") {
      setIsAdmin(true);
    } else {
      window.location.href = "/";
    }
  }, []);

  const sidebarItems = [
    {
      id: "dashboard",
      label: "Dashboard Overview",
      icon: BarChart3,
    },
    {
      id: "manage-deals",
      label: "Manage Deals",
      icon: Package,
    },
    {
      id: "add-deal",
      label: "Add New Deal",
      icon: Plus,
    },
    {
      id: "submissions",
      label: "Deal Submissions",
      icon: AlertTriangle,
    },
    {
      id: "categories",
      label: "Manage Categories",
      icon: Tag,
    },
    {
      id: "stores",
      label: "Manage Stores",
      icon: Store,
    },
    {
      id: "coupons",
      label: "Manage Coupons",
      icon: Ticket,
    },
    {
      id: "alerts",
      label: "Manage Alerts",
      icon: Bell,
    },
    {
      id: "users",
      label: "Users",
      icon: Users,
    },
    {
      id: "settings",
      label: "System Settings",
      icon: Settings,
    },
    {
      id: "mass-upload",
      label: "Mass Upload",
      icon: Upload,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview />;
      case "manage-deals":
        return <ManageDeals />;
      case "add-deal":
        return <AddNewDeal />;
      case "submissions":
        return <DealSubmissions />;
      case "categories":
        return <ManageCategories />;
      case "stores":
        return <ManageStores />;
      case "coupons":
        return <ManageCoupons />;
      case "alerts":
        return <ManageAlerts />;
      case "users":
        return <UsersManagement />;
      case "settings":
        return <SystemSettings />;
      case "mass-upload":
        return <MassUpload />;
      default:
        return <DashboardOverview />;
    }
  };

  const SidebarContent = () => (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-8 w-8 text-blue-600" />
        <div>
          <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
          <p className="text-xs text-gray-500">Management Console</p>
        </div>
      </div>

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
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Quick Stats in Sidebar */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-gray-600">Active Deals</span>
            <span className="text-xs font-bold text-blue-600">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-600">Pending</span>
            <span className="text-xs font-bold text-orange-600">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-600">Users</span>
            <span className="text-xs font-bold text-green-600">8,932</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3">
          Quick Actions
        </h3>
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start text-blue-600 border-blue-200"
            onClick={() => (window.location.href = "/admin-dashboard")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Admin Dashboard
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start"
            onClick={() => setActiveSection("add-deal")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Deal
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
        <div className="hidden lg:block w-72 bg-white border-r border-gray-200 min-h-screen">
          <SidebarContent />
        </div>

        {/* Mobile Sidebar */}
        <div
          className={cn(
            "lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out",
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">
                Admin Panel
              </h2>
            </div>
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
