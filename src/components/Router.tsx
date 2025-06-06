import { useState, useEffect } from "react";

// Import all page components
import Index from "@/pages/Index";
import Deal from "@/pages/Deal";
import Categories from "@/pages/Categories";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";

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
        // Handle search page - could extend Index with search functionality
        return <Index />;

      default:
        // 404 page or redirect to home
        return (
          <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
              <p className="text-gray-600 mb-6">Page not found</p>
              <button
                onClick={() => (window.location.href = "/")}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 transition-all duration-200"
              >
                Go Home
              </button>
            </div>
          </div>
        );
    }
  };

  return renderPage();
};
