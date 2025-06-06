import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./SearchBar";
import { Navigation } from "./Navigation";
import { LoginModal } from "./LoginModal";
import { AlertModal } from "./AlertModal";
import { PostDealModal } from "./PostDealModal";
import {
  Search,
  Menu,
  Bell,
  User,
  Plus,
  X,
  LogOut,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isPostDealModalOpen, setIsPostDealModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    setShowProfileDropdown(false);
    window.location.href = "/";
  };

  const handleCreateAlert = () => {
    if (isLoggedIn) {
      setIsAlertModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handlePostDeal = () => {
    if (isLoggedIn) {
      setIsPostDealModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = (userData: any) => {
    handleLogin(userData);
    setIsLoginModalOpen(false);

    // If user was trying to access a feature before login, open it now
    // You could add logic here to remember what they were trying to do
  };

  return (
    <>
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm w-full">
        {/* Top Header */}
        <div className="w-full">
          <div className="flex items-center justify-between h-16 lg:h-18 px-4 sm:px-6 lg:px-8">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent font-sans">
                  DealsHub
                </h1>
              </div>
            </div>

            {/* Center - Search Bar (Hidden on mobile) */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <SearchBar />
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>

              {/* Create Alert */}
              <Button
                variant="outline"
                size="sm"
                className="hidden lg:flex hover:bg-gray-50 border-gray-300"
                onClick={handleCreateAlert}
              >
                <Bell className="h-4 w-4 mr-2" />
                Create Alert
              </Button>

              {/* Post Deal Button / Login Button (Mobile) */}
              <Button
                size="sm"
                className={cn(
                  "font-medium shadow-md hover:shadow-lg transition-all duration-200",
                  isLoggedIn
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white lg:bg-gradient-to-r lg:from-orange-500 lg:to-pink-500 lg:hover:from-orange-600 lg:hover:to-pink-600",
                )}
                onClick={
                  isLoggedIn ? handlePostDeal : () => setIsLoginModalOpen(true)
                }
              >
                {isLoggedIn ? (
                  <>
                    <Plus className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Post Deal</span>
                    <span className="sm:hidden">Post</span>
                  </>
                ) : (
                  <>
                    <User className="h-4 w-4 mr-2 lg:hidden" />
                    <Plus className="h-4 w-4 mr-2 hidden lg:inline" />
                    <span className="lg:hidden">Login</span>
                    <span className="hidden lg:inline">Post Deal</span>
                  </>
                )}
              </Button>

              {/* Login/Register or Profile */}
              {isLoggedIn ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                  >
                    <img
                      src={user?.avatar || "/placeholder.svg"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">View Profile</p>
                    </div>
                  </button>

                  {/* Profile Dropdown */}
                  {showProfileDropdown && (
                    <div className="absolute right-0 top-12 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3">
                          <img
                            src={user?.avatar || "/placeholder.svg"}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">
                              {user?.name || "User"}
                            </p>
                            <p className="text-sm text-gray-500">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => {
                            setShowProfileDropdown(false);
                            const dashboardUrl =
                              user?.role === "admin"
                                ? "/admin-dashboard"
                                : "/dashboard";
                            window.location.href = dashboardUrl;
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <Settings className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            {user?.role === "admin"
                              ? "Admin Dashboard"
                              : "Dashboard"}
                          </span>
                        </button>

                        <button
                          onClick={() => {
                            setShowProfileDropdown(false);
                            window.location.href = "/";
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md transition-colors"
                        >
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">
                            Profile Settings
                          </span>
                        </button>

                        <div className="border-t border-gray-200 my-2"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-red-50 rounded-md transition-colors text-red-600"
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="hidden sm:flex hover:bg-gray-50 border-gray-300"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-out px-4 sm:px-6 lg:px-8",
              isMenuOpen ? "max-h-20 pb-4 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <SearchBar />
          </div>

          {/* Mobile Action Buttons */}
          <div
            className={cn(
              "lg:hidden overflow-hidden transition-all duration-300 ease-out px-4 sm:px-6 lg:px-8",
              isMenuOpen ? "max-h-20 pb-4 opacity-100" : "max-h-0 opacity-0",
            )}
          >
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={handleCreateAlert}
              >
                <Bell className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
                onClick={handlePostDeal}
              >
                <Plus className="h-4 w-4 mr-2" />
                Post Deal
              </Button>
              {!isLoggedIn && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex-1"
                >
                  <User className="h-4 w-4 mr-2" />
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <Navigation />
      </header>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLoginSuccess}
      />

      {/* Alert Modal */}
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
      />

      {/* Post Deal Modal */}
      <PostDealModal
        isOpen={isPostDealModalOpen}
        onClose={() => setIsPostDealModalOpen(false)}
      />

      {/* Click outside to close dropdown */}
      {showProfileDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </>
  );
};
