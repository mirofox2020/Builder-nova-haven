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
  AlertTriangle,
  Check,
  X,
  Eye,
  Search,
  Filter,
  Clock,
  User,
  Calendar,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleSubmissions = [
  {
    id: "1",
    title: "Apple AirPods Pro 2nd Generation",
    user: {
      name: "John Doe",
      email: "john.doe@email.com",
      avatar: "JD",
      joinDate: "2024-01-15",
      totalSubmissions: 12,
    },
    product: {
      originalPrice: 249,
      salePrice: 199,
      discount: 20,
      store: "Amazon",
      category: "Electronics",
      subcategory: "Headphones",
      url: "https://amazon.com/airpods-pro",
      imageUrl: "/placeholder.svg",
    },
    submission: {
      dateSubmitted: "2024-01-22 14:30",
      status: "pending",
      priority: "high",
      notes: "Flash sale ending tonight",
      votes: 0,
      views: 0,
    },
  },
  {
    id: "2",
    title: "Samsung Galaxy Watch 6 Classic",
    user: {
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      avatar: "SW",
      joinDate: "2024-01-10",
      totalSubmissions: 8,
    },
    product: {
      originalPrice: 399,
      salePrice: 299,
      discount: 25,
      store: "Best Buy",
      category: "Electronics",
      subcategory: "Wearables",
      url: "https://bestbuy.com/galaxy-watch",
      imageUrl: "/placeholder.svg",
    },
    submission: {
      dateSubmitted: "2024-01-21 09:15",
      status: "pending",
      priority: "medium",
      notes: "Limited time offer",
      votes: 0,
      views: 0,
    },
  },
  {
    id: "3",
    title: "Nike Air Max 270 Running Shoes",
    user: {
      name: "Mike Jones",
      email: "mike.jones@email.com",
      avatar: "MJ",
      joinDate: "2024-01-05",
      totalSubmissions: 15,
    },
    product: {
      originalPrice: 150,
      salePrice: 89,
      discount: 41,
      store: "Nike",
      category: "Fashion",
      subcategory: "Shoes",
      url: "https://nike.com/air-max-270",
      imageUrl: "/placeholder.svg",
    },
    submission: {
      dateSubmitted: "2024-01-20 16:45",
      status: "approved",
      priority: "low",
      notes: "Great deal on popular model",
      votes: 45,
      views: 234,
    },
  },
  {
    id: "4",
    title: "MacBook Air M2 13-inch Laptop",
    user: {
      name: "Emily Chen",
      email: "emily.chen@email.com",
      avatar: "EC",
      joinDate: "2024-01-12",
      totalSubmissions: 6,
    },
    product: {
      originalPrice: 1199,
      salePrice: 999,
      discount: 17,
      store: "Apple Store",
      category: "Electronics",
      subcategory: "Laptops",
      url: "https://apple.com/macbook-air",
      imageUrl: "/placeholder.svg",
    },
    submission: {
      dateSubmitted: "2024-01-19 11:20",
      status: "rejected",
      priority: "medium",
      notes: "Price already posted this week",
      votes: 0,
      views: 0,
    },
  },
  {
    id: "5",
    title: "Sony WH-1000XM5 Wireless Headphones",
    user: {
      name: "David Brown",
      email: "david.brown@email.com",
      avatar: "DB",
      joinDate: "2024-01-08",
      totalSubmissions: 20,
    },
    product: {
      originalPrice: 399,
      salePrice: 279,
      discount: 30,
      store: "Sony Store",
      category: "Electronics",
      subcategory: "Headphones",
      url: "https://sony.com/headphones",
      imageUrl: "/placeholder.svg",
    },
    submission: {
      dateSubmitted: "2024-01-18 13:10",
      status: "pending",
      priority: "high",
      notes: "Excellent discount on premium headphones",
      votes: 0,
      views: 0,
    },
  },
];

const DealSubmissions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleApprove = (submissionId: string) => {
    console.log(`Approving submission ${submissionId}`);
  };

  const handleReject = (submissionId: string) => {
    console.log(`Rejecting submission ${submissionId}`);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} on`, selectedSubmissions);
  };

  const filteredSubmissions = sampleSubmissions.filter((submission) => {
    const matchesSearch =
      submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.product.store.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || submission.submission.status === statusFilter;
    const matchesPriority =
      priorityFilter === "all" ||
      submission.submission.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const pendingCount = sampleSubmissions.filter(
    (s) => s.submission.status === "pending",
  ).length;
  const approvedCount = sampleSubmissions.filter(
    (s) => s.submission.status === "approved",
  ).length;
  const rejectedCount = sampleSubmissions.filter(
    (s) => s.submission.status === "rejected",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Deal Submissions
          </h1>
          <p className="text-gray-600 mt-1">
            Review and moderate user-submitted deals
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-yellow-600">
            {pendingCount} pending
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Review Queue
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Clock className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-xs text-gray-500">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Check className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {approvedCount}
              </p>
              <p className="text-xs text-gray-500">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <X className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {rejectedCount}
              </p>
              <p className="text-xs text-gray-500">Rejected</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <User className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {new Set(sampleSubmissions.map((s) => s.user.email)).size}
              </p>
              <p className="text-xs text-gray-500">Active Contributors</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
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
                  placeholder="Search submissions..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Priority
              </label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
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
                  <SelectItem value="date">Date Submitted</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="discount">Discount %</SelectItem>
                  <SelectItem value="user">User Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedSubmissions.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedSubmissions.length} submission(s) selected
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleBulkAction("approve")}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve Selected
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleBulkAction("reject")}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submissions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            User Submissions ({filteredSubmissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSubmissions(
                            filteredSubmissions.map((s) => s.id),
                          );
                        } else {
                          setSelectedSubmissions([]);
                        }
                      }}
                      checked={
                        selectedSubmissions.length ===
                          filteredSubmissions.length &&
                        filteredSubmissions.length > 0
                      }
                    />
                  </TableHead>
                  <TableHead>Deal & User</TableHead>
                  <TableHead>Product Details</TableHead>
                  <TableHead>Submission Info</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubmissions.map((submission) => (
                  <TableRow key={submission.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedSubmissions.includes(submission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSubmissions((prev) => [
                              ...prev,
                              submission.id,
                            ]);
                          } else {
                            setSelectedSubmissions((prev) =>
                              prev.filter((id) => id !== submission.id),
                            );
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        {/* Deal Title */}
                        <p className="font-medium text-gray-900">
                          {submission.title}
                        </p>

                        {/* User Info */}
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-medium">
                            {submission.user.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-700">
                              {submission.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {submission.user.totalSubmissions} submissions
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        {/* Price Info */}
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-green-600">
                            ${submission.product.salePrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${submission.product.originalPrice}
                          </span>
                          <Badge className="bg-red-100 text-red-700 text-xs">
                            -{submission.product.discount}%
                          </Badge>
                        </div>

                        {/* Store & Category */}
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {submission.product.store}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {submission.product.category}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {submission.submission.dateSubmitted}
                          </span>
                        </div>
                        <Badge
                          variant="outline"
                          className={getPriorityColor(
                            submission.submission.priority,
                          )}
                        >
                          {submission.submission.priority} priority
                        </Badge>
                        {submission.submission.notes && (
                          <div className="flex items-start gap-1 mt-1">
                            <MessageSquare className="h-3 w-3 text-gray-400 mt-0.5" />
                            <p className="text-xs text-gray-600">
                              {submission.submission.notes}
                            </p>
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(submission.submission.status)}
                      >
                        {submission.submission.status}
                      </Badge>
                      {submission.submission.status === "approved" && (
                        <div className="mt-1 text-xs text-gray-500">
                          {submission.submission.votes} votes,{" "}
                          {submission.submission.views} views
                        </div>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>

                        {submission.submission.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApprove(submission.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(submission.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}

                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No submissions found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DealSubmissions;
