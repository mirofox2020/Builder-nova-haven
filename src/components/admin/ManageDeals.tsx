import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Plus,
  Save,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const initialDeals = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max 256GB",
    description:
      "Latest iPhone with titanium design and advanced camera system",
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
    promoCode: "IPHONE15",
    url: "https://amazon.com/iphone-15-pro-max",
  },
  {
    id: "2",
    title: "Samsung Galaxy S24 Ultra 512GB",
    description: "Latest Samsung flagship with S Pen and incredible camera",
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
    promoCode: "SAMSUNG21",
    url: "https://bestbuy.com/galaxy-s24-ultra",
  },
  {
    id: "3",
    title: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise cancellation headphones",
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
    promoCode: "SONY30OFF",
    url: "https://sony.com/headphones",
  },
  {
    id: "4",
    title: "MacBook Air M2 13-inch",
    description: "Ultra-thin laptop with M2 chip performance",
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
    url: "https://apple.com/macbook-air",
  },
  {
    id: "5",
    title: "Nike Air Max 270 Sneakers",
    description: "Comfortable running shoes with Air Max technology",
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
    promoCode: "NIKE41OFF",
    url: "https://nike.com/air-max-270",
  },
];

const ManageDeals = () => {
  const [deals, setDeals] = useState(initialDeals);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedDeals, setSelectedDeals] = useState<string[]>([]);
  const [viewDeal, setViewDeal] = useState<any>(null);
  const [editDeal, setEditDeal] = useState<any>(null);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null,
  );

  const [newDeal, setNewDeal] = useState({
    title: "",
    description: "",
    store: "",
    originalPrice: "",
    salePrice: "",
    category: "Electronics",
    subcategory: "",
    promoCode: "",
    url: "",
    expiresAt: "",
    image: "",
  });

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

  const handleView = (deal: any) => {
    setViewDeal(deal);
  };

  const handleEdit = (deal: any) => {
    setEditDeal({ ...deal });
  };

  const handleSaveEdit = () => {
    if (editDeal) {
      setDeals(
        deals.map((deal) => (deal.id === editDeal.id ? editDeal : deal)),
      );
      setEditDeal(null);
      alert("Deal updated successfully!");
    }
  };

  const handleStatusToggle = (dealId: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "pending" : "published";
    setDeals(
      deals.map((deal) =>
        deal.id === dealId ? { ...deal, status: newStatus } : deal,
      ),
    );
    alert(`Deal status changed to ${newStatus}`);
  };

  const handleFeatureToggle = (dealId: string, currentFeatured: boolean) => {
    setDeals(
      deals.map((deal) =>
        deal.id === dealId ? { ...deal, featured: !currentFeatured } : deal,
      ),
    );
    alert(`Deal ${!currentFeatured ? "featured" : "unfeatured"} successfully`);
  };

  const handleDelete = (dealId: string) => {
    setDeals(deals.filter((deal) => deal.id !== dealId));
    setShowDeleteConfirm(null);
    alert("Deal deleted successfully!");
  };

  const handleAddDeal = () => {
    if (
      !newDeal.title ||
      !newDeal.store ||
      !newDeal.originalPrice ||
      !newDeal.salePrice ||
      !newDeal.image
    ) {
      alert("Please fill in all required fields including the main image");
      return;
    }

    const discount = Math.round(
      ((parseFloat(newDeal.originalPrice) - parseFloat(newDeal.salePrice)) /
        parseFloat(newDeal.originalPrice)) *
        100,
    );

    const deal = {
      id: (deals.length + 1).toString(),
      ...newDeal,
      originalPrice: parseFloat(newDeal.originalPrice),
      salePrice: parseFloat(newDeal.salePrice),
      discount,
      status: "pending",
      featured: false,
      views: 0,
      votes: 0,
      submittedBy: "admin",
      dateSubmitted: new Date().toISOString().split("T")[0],
    };

    setDeals([deal, ...deals]);
    setNewDeal({
      title: "",
      description: "",
      store: "",
      originalPrice: "",
      salePrice: "",
      category: "Electronics",
      subcategory: "",
      promoCode: "",
      url: "",
      expiresAt: "",
      image: "",
    });
    setShowAddDeal(false);
    alert("Deal added successfully!");
  };

  const handleBulkAction = (action: string) => {
    if (selectedDeals.length === 0) {
      alert("Please select deals first");
      return;
    }

    switch (action) {
      case "publish":
        setDeals(
          deals.map((deal) =>
            selectedDeals.includes(deal.id)
              ? { ...deal, status: "published" }
              : deal,
          ),
        );
        alert(`${selectedDeals.length} deals published`);
        break;
      case "unpublish":
        setDeals(
          deals.map((deal) =>
            selectedDeals.includes(deal.id)
              ? { ...deal, status: "pending" }
              : deal,
          ),
        );
        alert(`${selectedDeals.length} deals unpublished`);
        break;
      case "feature":
        setDeals(
          deals.map((deal) =>
            selectedDeals.includes(deal.id)
              ? { ...deal, featured: true }
              : deal,
          ),
        );
        alert(`${selectedDeals.length} deals featured`);
        break;
      case "delete":
        if (
          confirm(
            `Are you sure you want to delete ${selectedDeals.length} deals?`,
          )
        ) {
          setDeals(deals.filter((deal) => !selectedDeals.includes(deal.id)));
          alert(`${selectedDeals.length} deals deleted`);
        }
        break;
    }
    setSelectedDeals([]);
  };

  const filteredDeals = deals.filter((deal) => {
    const matchesSearch =
      deal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      deal.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || deal.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || deal.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case "views":
        return b.views - a.views;
      case "votes":
        return b.votes - a.votes;
      case "discount":
        return b.discount - a.discount;
      case "expires":
        return (
          new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()
        );
      default:
        return (
          new Date(b.dateSubmitted).getTime() -
          new Date(a.dateSubmitted).getTime()
        );
    }
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
          <Badge variant="outline">{sortedDeals.length} deals found</Badge>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowAddDeal(true)}
          >
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

      {/* Bulk Actions */}
      {selectedDeals.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedDeals.length} deal(s) selected
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleBulkAction("publish")}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Publish Selected
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleBulkAction("unpublish")}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Unpublish Selected
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleBulkAction("feature")}
                >
                  <Star className="h-4 w-4 mr-2" />
                  Feature Selected
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleBulkAction("delete")}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            All Deals ({sortedDeals.length})
            <div className="ml-auto">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedDeals(sortedDeals.map((deal) => deal.id));
                  } else {
                    setSelectedDeals([]);
                  }
                }}
                checked={
                  selectedDeals.length === sortedDeals.length &&
                  sortedDeals.length > 0
                }
                className="mr-2"
              />
              Select All
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">Select</TableHead>
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
                {sortedDeals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedDeals.includes(deal.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDeals([...selectedDeals, deal.id]);
                          } else {
                            setSelectedDeals(
                              selectedDeals.filter((id) => id !== deal.id),
                            );
                          }
                        }}
                      />
                    </TableCell>
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(deal)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(deal)}
                        >
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
                          onClick={() => setShowDeleteConfirm(deal.id)}
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

          {sortedDeals.length === 0 && (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No deals found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Deal Modal */}
      <Dialog open={!!viewDeal} onOpenChange={() => setViewDeal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>View Deal</DialogTitle>
            <DialogDescription>Deal details and information</DialogDescription>
          </DialogHeader>
          {viewDeal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <p className="text-sm text-gray-900">{viewDeal.title}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Store
                  </label>
                  <p className="text-sm text-gray-900">{viewDeal.store}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Original Price
                  </label>
                  <p className="text-sm text-gray-900">
                    ${viewDeal.originalPrice}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Sale Price
                  </label>
                  <p className="text-sm text-gray-900">${viewDeal.salePrice}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Discount
                  </label>
                  <p className="text-sm text-gray-900">{viewDeal.discount}%</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <Badge className={getStatusColor(viewDeal.status)}>
                    {viewDeal.status}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <p className="text-sm text-gray-900">{viewDeal.description}</p>
              </div>
              {viewDeal.url && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    URL
                  </label>
                  <a
                    href={viewDeal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {viewDeal.url} <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Deal Modal */}
      <Dialog open={!!editDeal} onOpenChange={() => setEditDeal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Deal</DialogTitle>
            <DialogDescription>Update deal information</DialogDescription>
          </DialogHeader>
          {editDeal && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <Input
                    value={editDeal.title}
                    onChange={(e) =>
                      setEditDeal({ ...editDeal, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Store
                  </label>
                  <Input
                    value={editDeal.store}
                    onChange={(e) =>
                      setEditDeal({ ...editDeal, store: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Original Price
                  </label>
                  <Input
                    type="number"
                    value={editDeal.originalPrice}
                    onChange={(e) =>
                      setEditDeal({
                        ...editDeal,
                        originalPrice: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Sale Price
                  </label>
                  <Input
                    type="number"
                    value={editDeal.salePrice}
                    onChange={(e) =>
                      setEditDeal({
                        ...editDeal,
                        salePrice: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <Select
                    value={editDeal.category}
                    onValueChange={(value) =>
                      setEditDeal({ ...editDeal, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Fashion">Fashion</SelectItem>
                      <SelectItem value="Home">Home & Kitchen</SelectItem>
                      <SelectItem value="Books">Books</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Expires At
                  </label>
                  <Input
                    type="date"
                    value={editDeal.expiresAt}
                    onChange={(e) =>
                      setEditDeal({ ...editDeal, expiresAt: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  value={editDeal.description}
                  onChange={(e) =>
                    setEditDeal({ ...editDeal, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">URL</label>
                <Input
                  value={editDeal.url || ""}
                  onChange={(e) =>
                    setEditDeal({ ...editDeal, url: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditDeal(null)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Deal Modal */}
      <Dialog open={showAddDeal} onOpenChange={setShowAddDeal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Deal</DialogTitle>
            <DialogDescription>Create a new deal</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Title *
                </label>
                <Input
                  value={newDeal.title}
                  onChange={(e) =>
                    setNewDeal({ ...newDeal, title: e.target.value })
                  }
                  placeholder="Deal title"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Store *
                </label>
                <Input
                  value={newDeal.store}
                  onChange={(e) =>
                    setNewDeal({ ...newDeal, store: e.target.value })
                  }
                  placeholder="Store name"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Original Price *
                </label>
                <Input
                  type="number"
                  value={newDeal.originalPrice}
                  onChange={(e) =>
                    setNewDeal({ ...newDeal, originalPrice: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Sale Price *
                </label>
                <Input
                  type="number"
                  value={newDeal.salePrice}
                  onChange={(e) =>
                    setNewDeal({ ...newDeal, salePrice: e.target.value })
                  }
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <Select
                  value={newDeal.category}
                  onValueChange={(value) =>
                    setNewDeal({ ...newDeal, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                    <SelectItem value="Fashion">Fashion</SelectItem>
                    <SelectItem value="Home">Home & Kitchen</SelectItem>
                    <SelectItem value="Books">Books</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Expires At
                </label>
                <Input
                  type="date"
                  value={newDeal.expiresAt}
                  onChange={(e) =>
                    setNewDeal({ ...newDeal, expiresAt: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Main Image *
              </label>
              <div className="space-y-3">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // Create a preview URL for the uploaded image
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        setNewDeal({
                          ...newDeal,
                          image: e.target?.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {newDeal.image && (
                  <div className="relative">
                    <img
                      src={newDeal.image}
                      alt="Deal preview"
                      className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setNewDeal({ ...newDeal, image: "" })}
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-red-100 hover:bg-red-200 text-red-600"
                    >
                      ×
                    </Button>
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  Upload a high-quality image (JPG, PNG, GIF) for your coupon or
                  deal. Recommended size: 400x300px
                </p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                value={newDeal.description}
                onChange={(e) =>
                  setNewDeal({ ...newDeal, description: e.target.value })
                }
                placeholder="Deal description"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Promo Code
              </label>
              <Input
                value={newDeal.promoCode}
                onChange={(e) =>
                  setNewDeal({ ...newDeal, promoCode: e.target.value })
                }
                placeholder="Optional promo code"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">URL</label>
              <Input
                value={newDeal.url}
                onChange={(e) =>
                  setNewDeal({ ...newDeal, url: e.target.value })
                }
                placeholder="Deal URL"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowAddDeal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddDeal}>
                <Plus className="h-4 w-4 mr-2" />
                Add Deal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!showDeleteConfirm}
        onOpenChange={() => setShowDeleteConfirm(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this deal? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                showDeleteConfirm && handleDelete(showDeleteConfirm)
              }
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Deal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageDeals;
