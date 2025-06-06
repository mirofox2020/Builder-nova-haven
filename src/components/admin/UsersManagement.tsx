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
  Users,
  Search,
  Filter,
  Shield,
  User,
  Calendar,
  Mail,
  Package,
  Bell,
  TrendingUp,
  Eye,
  Edit3,
  Ban,
  UserCheck,
  Crown,
  Activity,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    avatar: "JD",
    role: "user",
    status: "active",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-22 14:30",
    activity: {
      dealsSubmitted: 12,
      alertsCreated: 5,
      commentsPosted: 23,
      votes: 145,
    },
    stats: {
      totalSavings: 450,
      favoriteDealCategories: ["Electronics", "Fashion"],
      averageSessionTime: "15m",
    },
    location: "New York, USA",
    verified: true,
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah.wilson@email.com",
    avatar: "SW",
    role: "user",
    status: "active",
    joinDate: "2024-01-10",
    lastLogin: "2024-01-22 09:15",
    activity: {
      dealsSubmitted: 8,
      alertsCreated: 12,
      commentsPosted: 31,
      votes: 89,
    },
    stats: {
      totalSavings: 320,
      favoriteDealCategories: ["Health & Beauty", "Home & Kitchen"],
      averageSessionTime: "22m",
    },
    location: "Los Angeles, USA",
    verified: true,
  },
  {
    id: "3",
    name: "Mike Jones",
    email: "mike.jones@email.com",
    avatar: "MJ",
    role: "moderator",
    status: "active",
    joinDate: "2024-01-05",
    lastLogin: "2024-01-22 16:45",
    activity: {
      dealsSubmitted: 25,
      alertsCreated: 8,
      commentsPosted: 67,
      votes: 234,
    },
    stats: {
      totalSavings: 780,
      favoriteDealCategories: ["Electronics", "Sports"],
      averageSessionTime: "35m",
    },
    location: "Chicago, USA",
    verified: true,
  },
  {
    id: "4",
    name: "Emily Chen",
    email: "emily.chen@email.com",
    avatar: "EC",
    role: "user",
    status: "suspended",
    joinDate: "2024-01-12",
    lastLogin: "2024-01-18 11:20",
    activity: {
      dealsSubmitted: 3,
      alertsCreated: 2,
      commentsPosted: 8,
      votes: 15,
    },
    stats: {
      totalSavings: 120,
      favoriteDealCategories: ["Books", "Electronics"],
      averageSessionTime: "8m",
    },
    location: "Seattle, USA",
    verified: false,
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@email.com",
    avatar: "DB",
    role: "admin",
    status: "active",
    joinDate: "2024-01-01",
    lastLogin: "2024-01-22 18:00",
    activity: {
      dealsSubmitted: 45,
      alertsCreated: 15,
      commentsPosted: 156,
      votes: 567,
    },
    stats: {
      totalSavings: 1250,
      favoriteDealCategories: ["Electronics", "Automotive", "Tools"],
      averageSessionTime: "45m",
    },
    location: "Austin, USA",
    verified: true,
  },
  {
    id: "6",
    name: "Lisa Garcia",
    email: "lisa.garcia@email.com",
    avatar: "LG",
    role: "user",
    status: "inactive",
    joinDate: "2024-01-08",
    lastLogin: "2024-01-15 14:00",
    activity: {
      dealsSubmitted: 2,
      alertsCreated: 1,
      commentsPosted: 0,
      votes: 5,
    },
    stats: {
      totalSavings: 50,
      favoriteDealCategories: ["Fashion"],
      averageSessionTime: "5m",
    },
    location: "Miami, USA",
    verified: false,
  },
];

const UsersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("joinDate");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "moderator":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "user":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-purple-600" />;
      case "moderator":
        return <Shield className="h-4 w-4 text-blue-600" />;
      case "user":
        return <User className="h-4 w-4 text-green-600" />;
      default:
        return null;
    }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    console.log(`Changing user ${userId} role to ${newRole}`);
  };

  const handleStatusToggle = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    console.log(`Toggling user ${userId} status to ${newStatus}`);
  };

  const handlePromoteToAdmin = (userId: string) => {
    console.log(`Promoting user ${userId} to admin`);
  };

  const handleBulkAction = (action: string) => {
    console.log(`Performing bulk action: ${action} on`, selectedUsers);
  };

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const userStats = {
    total: sampleUsers.length,
    active: sampleUsers.filter((u) => u.status === "active").length,
    admins: sampleUsers.filter((u) => u.role === "admin").length,
    moderators: sampleUsers.filter((u) => u.role === "moderator").length,
    suspended: sampleUsers.filter((u) => u.status === "suspended").length,
    newThisWeek: sampleUsers.filter(
      (u) =>
        new Date(u.joinDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ).length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Users Management
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage all registered users and their activities
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-green-600">
            {userStats.active} active users
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Users className="h-4 w-4 mr-2" />
            User Analytics
          </Button>
        </div>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {userStats.total}
              </p>
              <p className="text-xs text-gray-500">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Activity className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {userStats.active}
              </p>
              <p className="text-xs text-gray-500">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Crown className="h-6 w-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {userStats.admins}
              </p>
              <p className="text-xs text-gray-500">Admins</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Shield className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {userStats.moderators}
              </p>
              <p className="text-xs text-gray-500">Moderators</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <Ban className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {userStats.suspended}
              </p>
              <p className="text-xs text-gray-500">Suspended</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <TrendingUp className="h-6 w-6 text-orange-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">
                {userStats.newThisWeek}
              </p>
              <p className="text-xs text-gray-500">New This Week</p>
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
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Role</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
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
                  <SelectItem value="joinDate">Join Date</SelectItem>
                  <SelectItem value="lastLogin">Last Login</SelectItem>
                  <SelectItem value="activity">Most Active</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                {selectedUsers.length} user(s) selected
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleBulkAction("activate")}
                >
                  <UserCheck className="h-4 w-4 mr-2" />
                  Activate Selected
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("suspend")}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Suspend Selected
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBulkAction("promote")}
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Promote Selected
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Users ({filteredUsers.length})
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
                          setSelectedUsers(filteredUsers.map((u) => u.id));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                      checked={
                        selectedUsers.length === filteredUsers.length &&
                        filteredUsers.length > 0
                      }
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role & Status</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Statistics</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers((prev) => [...prev, user.id]);
                          } else {
                            setSelectedUsers((prev) =>
                              prev.filter((id) => id !== user.id),
                            );
                          }
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-medium">
                          {user.avatar}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-gray-900">
                              {user.name}
                            </p>
                            {user.verified && (
                              <UserCheck className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <Calendar className="h-3 w-3" />
                            Joined {user.joinDate}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          {getRoleIcon(user.role)}
                          <Badge
                            variant="outline"
                            className={getRoleColor(user.role)}
                          >
                            {user.role}
                          </Badge>
                        </div>
                        <Badge
                          variant="outline"
                          className={getStatusColor(user.status)}
                        >
                          {user.status}
                        </Badge>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Package className="h-3 w-3" />
                            {user.activity.dealsSubmitted}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bell className="h-3 w-3" />
                            {user.activity.alertsCreated}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {user.activity.commentsPosted}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {user.activity.votes}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="space-y-1 text-sm">
                        <div>
                          <span className="font-medium text-green-600">
                            ${user.stats.totalSavings}
                          </span>
                          <span className="text-gray-500 ml-1">saved</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Avg session: {user.stats.averageSessionTime}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {user.stats.favoriteDealCategories
                            .slice(0, 2)
                            .map((category) => (
                              <Badge
                                key={category}
                                variant="outline"
                                className="text-xs"
                              >
                                {category}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {user.lastLogin}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        {user.role !== "admin" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePromoteToAdmin(user.id)}
                            className="text-purple-600 hover:text-purple-700"
                          >
                            <Crown className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleStatusToggle(user.id, user.status)
                          }
                          className={cn(
                            user.status === "active"
                              ? "text-red-600 hover:text-red-700"
                              : "text-green-600 hover:text-green-700",
                          )}
                        >
                          {user.status === "active" ? (
                            <Ban className="h-4 w-4" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No users found matching your criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Management Tools */}
      <Card>
        <CardHeader>
          <CardTitle>User Management Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <Mail className="h-6 w-6 mb-2" />
              <span>Send Bulk Email</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <TrendingUp className="h-6 w-6 mb-2" />
              <span>User Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Activity className="h-6 w-6 mb-2" />
              <span>Activity Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span>Export User Data</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;
