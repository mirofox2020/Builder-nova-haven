import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchBar } from "./SearchBar";
import { Navigation } from "./Navigation";
import { Search, Menu, Bell, User, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
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
            >
              <Bell className="h-4 w-4 mr-2" />
              Create Alert
            </Button>

            {/* Post Deal Button */}
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post
            </Button>

            {/* Login/Register */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex hover:bg-gray-50 border-gray-300"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-out px-4 sm:px-6 lg:px-8",
          isMenuOpen ? "max-h-20 pb-4 opacity-100" : "max-h-0 opacity-0"
        )}>
        >
          <SearchBar />
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </header>
  );
};