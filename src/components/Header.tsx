import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchBar } from "./SearchBar";
import { Navigation } from "./Navigation";
import { Search, Menu, Bell, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      {/* Top Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">DealsHub</h1>
          </div>

          {/* Center - Search Bar (Hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            {/* Search Icon for Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Create Alert */}
            <Button variant="outline" size="sm" className="hidden lg:flex">
              <Bell className="h-4 w-4 mr-2" />
              Create Alert
            </Button>

            {/* Post Deal Button */}
            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post
            </Button>

            {/* Login/Register */}
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-200",
            isMenuOpen ? "max-h-20 pb-4" : "max-h-0",
          )}
        >
          <SearchBar />
        </div>
      </div>

      {/* Navigation */}
      <Navigation />
    </header>
  );
};
