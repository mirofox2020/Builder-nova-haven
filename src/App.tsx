import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Deal from "./pages/Deal";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import Search from "./pages/Search";
import DiscountCodes from "./pages/DiscountCodes";
import Deals from "./pages/Deals";
import NotFound from "./pages/NotFound";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/categories/:categoryId" element={<Categories />} />
        <Route path="/deal/:dealId" element={<Deal />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/search" element={<Search />} />
        <Route path="/discount-codes" element={<DiscountCodes />} />
        <Route path="/deals" element={<Deals />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
