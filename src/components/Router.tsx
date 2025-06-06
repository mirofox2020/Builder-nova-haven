import { useState, useEffect } from "react";

// Import all page components
import Index from "@/pages/Index";
import Deal from "@/pages/Deal";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import Search from "@/pages/Search";

interface RouterProps {
  path: string;
}

export const Router = ({ path }: RouterProps) => {
  const [currentPath, setCurrentPath] = useState(path);

  useEffect(() => {
    // Listen for navigation events
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Simple routing logic based on path
  const renderPage = () => {
    // Remove leading slash and split path
    const pathSegments = currentPath.replace(/^\//, "").split("/");
    const basePath = pathSegments[0];

    switch (basePath) {
      case "":
        return <Index />;

      case "deal":
        return <Deal />;

      case "categories":
        return <Categories />;

      case "dashboard":
        return <Dashboard />;

      case "admin":
        return <Admin />;

      case "search":
        return <Search />;

      default:
        // 404 page or redirect to home
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
            {/* Background Pattern */}
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.05),transparent_70%)] pointer-events-none" />
            <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.05),transparent_50%)] pointer-events-none" />

            <div className="relative text-center z-10">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-3xl">404</span>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Page Not Found
                </h1>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  The page you're looking for doesn't exist or has been moved.
                  Let's get you back to finding great deals!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200 font-semibold"
                >
                  🏠 Go Home
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
                >
                  ← Go Back
                </button>
              </div>

              {/* Quick Links */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Pages
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                  {[
                    {
                      name: "Electronics",
                      icon: "📱",
                      path: "/categories/electronics",
                    },
                    {
                      name: "Fashion",
                      icon: "👕",
                      path: "/categories/fashion",
                    },
                    {
                      name: "Home & Kitchen",
                      icon: "🏠",
                      path: "/categories/home-kitchen",
                    },
                    {
                      name: "Sports",
                      icon: "⚽",
                      path: "/categories/sports-outdoors",
                    },
                  ].map((category) => (
                    <button
                      key={category.name}
                      onClick={() => (window.location.href = category.path)}
                      className="p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-orange-300 transition-all duration-200 text-center"
                    >
                      <div className="text-2xl mb-2">{category.icon}</div>
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderPage();
};
