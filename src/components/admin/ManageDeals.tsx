import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Package,
  Edit3,
  Trash2,
  Eye,
  Star,
  Calendar,
  Search,
  Filter,
  MoreHorizontal,
  ExternalLink,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleDeals = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max 256GB",
    store: "Amazon",
    originalPrice: 1199,
    salePrice: 999,
    discount: 17,
    category: "Electronics",
    subcategory: "Smartphones",
    status: "published",
    featured: true,
    expiresAt: "2024-02-15",
    views: 2340,
    votes: 156,
    submittedBy: "admin",
    dateSubmitted: "2024-01-20",
  },
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra 512GB",
    store: "Best Buy",
    originalPrice: 1399,
    salePrice: 1099,
    discount: 21,
    category: "Electronics",
    subcategory: "Smartphones",
    status: "pending",
    featured: false,
    expiresAt: "2024-02-20",
    views: 890,
    votes: 67,
    submittedBy: "john_doe",
    dateSubmitted: "2024-01-18",
  },
  {
    id: "3",
    title: "Sony WH-1000XM5 Headphones",
    store: "Sony Store",
    originalPrice: 399,
    salePrice: 279,
    discount: 30,
    category: "Electronics",
    subcategory: "Headphones",
    status: "published",
    featured: true,
    expiresAt: "2024-02-10",
    views: 1567,
    votes: 203,
    submittedBy: "admin",
    dateSubmitted: "2024-01-15",
  },
  {
    id: "4",
    title: "MacBook Air M2 13-inch",
    store: "Apple Store",
    originalPrice: 1199,
    salePrice: 999,
    discount: 17,
    category: "Electronics",
    subcategory: "Laptops",
    status: "expired",
    featured: false,
    expiresAt: "2024-01-25",
    views: 3421,
    votes: 412,
    submittedBy: "admin",
    dateSubmitted: "2024-01-10",
  },
  {
    id: "5",
    title: "Nike Air Max 270 Sneakers",
    store: "Nike",
    originalPrice: 150,
    salePrice: 89,
    discount: 41,
    category: "Fashion",
    subcategory: "Shoes",
    status: "published",
    featured: false,
    expiresAt: "2024-02-28",
    views: 756,
    votes: 89,
    submittedBy: "sarah_wilson",
    dateSubmitted: "2024-01-22",
  },
];

const ManageDeals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "expired":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "expired":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleStatusToggle = (dealId: string, currentStatus: string) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";
    console.log(`Toggling deal ${dealId} status to ${newStatus}`);
  };

  const handleFeatureToggle = (dealId: string, currentFeatured: boolean) => {
    console.log(
      `Toggling deal ${dealId} featured status to ${!currentFeatured}`,
    );
  };

  const handleDelete = (dealId: string) => {
    console.log(`Deleting deal ${dealId}`);
  };

  const filteredDeals = sampleDeals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || deal.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || deal.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manage Deals
          </h1>
          <p className="text-gray-600 mt-1">
            Full CRUD control for all deals in the system
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">{filteredDeals.length} deals found</Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Package className="h-4 w-4 mr-2" />
            Add New Deal
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search deals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Fashion">Fashion</SelectItem>
                  <SelectItem value="Home">Home & Kitchen</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Created</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                  <SelectItem value="votes">Most Votes</SelectItem>
                  <SelectItem value="discount">Highest Discount</SelectItem>
                  <SelectItem value="expires">Expiration Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Deals ({filteredDeals.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Deal</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Performance</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <img
                          src="/placeholder.svg"
                          alt=""
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">
                              {deal.title}
                            </p>
                            {deal.featured && (
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500">
                            by {deal.submittedBy}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{deal.store}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">
                            ${deal.salePrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${deal.originalPrice}
                          </span>
                        </div>
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          -{deal.discount}%
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Badge variant="outline">{deal.category}</Badge>
                        <p className="text-xs text-gray-500">
                          {deal.subcategory}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(deal.status)}
                        <Badge
                          variant="outline"
                          className={getStatusColor(deal.status)}
                        >
                          {deal.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {deal.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {deal.votes}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {deal.expiresAt}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusToggle(deal.id, deal.status)
                          }
                          className={cn(
                            deal.status === "published"
                              ? "text-orange-600 hover:text-orange-700"
                              : "text-green-600 hover:text-green-700",
                          )}
                        >
                          {deal.status === "published" ? (
                            <XCircle className="h-4 w-4" />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleFeatureToggle(deal.id, deal.featured)
                          }
                          className={cn(
                            deal.featured
                              ? "text-yellow-600 hover:text-yellow-700"
                              : "text-gray-600 hover:text-gray-700",
                          )}
                        >
                          <Star
                            className={cn(
                              "h-4 w-4",
                              deal.featured && "fill-current",
                            )}
                          />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(deal.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredDeals.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No deals found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Bulk Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Publish Selected
            </Button>
            <Button variant="outline">
              <XCircle className="h-4 w-4 mr-2" />
              Unpublish Selected
            </Button>
            <Button variant="outline">
              <Star className="h-4 w-4 mr-2" />
              Feature Selected
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Extend Expiry
            </Button>
            <Button
              variant="outline"
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageDeals;
