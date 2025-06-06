import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tag,
  Plus,
  Edit3,
  Trash2,
  BarChart3,
  GripVertical,
  Save,
  X,
  Package,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import categories from existing data
import { categories } from "@/data/categories";

const ManageCategories = () => {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingSubcategory, setEditingSubcategory] = useState<string | null>(
    null,
  );
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddSubcategory, setShowAddSubcategory] = useState<string | null>(
    null,
  );

  // Mock statistics for each category
  const categoryStats = {
    electronics: { deals: 342, submissions: 45, views: 125000 },
    fashion: { deals: 289, submissions: 32, views: 98000 },
    "home-kitchen": { deals: 156, submissions: 23, views: 67000 },
    "health-beauty": { deals: 134, submissions: 18, views: 54000 },
    books: { deals: 98, submissions: 12, views: 43000 },
    sports: { deals: 167, submissions: 21, views: 76000 },
    automotive: { deals: 87, submissions: 9, views: 32000 },
    travel: { deals: 76, submissions: 8, views: 28000 },
    food: { deals: 198, submissions: 28, views: 89000 },
    toys: { deals: 123, submissions: 15, views: 56000 },
  };

  const handleSaveCategory = (categoryId: string, newName: string) => {
    console.log(`Saving category ${categoryId} with name: ${newName}`);
    setEditingCategory(null);
  };

  const handleDeleteCategory = (categoryId: string) => {
    console.log(`Deleting category: ${categoryId}`);
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      console.log(`Adding new category: ${newCategoryName}`);
      setNewCategoryName("");
      setShowAddCategory(false);
    }
  };

  const handleSaveSubcategory = (
    categoryId: string,
    subcategoryId: string,
    newName: string,
  ) => {
    console.log(
      `Saving subcategory ${subcategoryId} in ${categoryId} with name: ${newName}`,
    );
    setEditingSubcategory(null);
  };

  const handleDeleteSubcategory = (
    categoryId: string,
    subcategoryId: string,
  ) => {
    console.log(`Deleting subcategory ${subcategoryId} from ${categoryId}`);
  };

  const handleAddSubcategory = (categoryId: string) => {
    if (newSubcategoryName.trim()) {
      console.log(
        `Adding new subcategory "${newSubcategoryName}" to category ${categoryId}`,
      );
      setNewSubcategoryName("");
      setShowAddSubcategory(null);
    }
  };

  const getStats = (categoryId: string) => {
    const key = categoryId.toLowerCase().replace(/\s+/g, "-");
    return (
      categoryStats[key as keyof typeof categoryStats] || {
        deals: 0,
        submissions: 0,
        views: 0,
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Manage Categories
          </h1>
          <p className="text-gray-600 mt-1">
            Add, edit, and organize categories and subcategories
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">{categories.length} categories</Badge>
          <Button
            onClick={() => setShowAddCategory(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </div>
      </div>

      {/* Add New Category */}
      {showAddCategory && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Button
                onClick={handleAddCategory}
                className="bg-green-600 hover:bg-green-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddCategory(false);
                  setNewCategoryName("");
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {categories.map((category) => {
          const stats = getStats(category.id);

          return (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Tag className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      {editingCategory === category.id ? (
                        <div className="flex items-center gap-2">
                          <Input
                            defaultValue={category.name}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSaveCategory(
                                  category.id,
                                  e.currentTarget.value,
                                );
                              }
                            }}
                            className="h-8"
                          />
                          <Button
                            size="sm"
                            onClick={(e) => {
                              const input =
                                e.currentTarget.parentElement?.querySelector(
                                  "input",
                                );
                              if (input) {
                                handleSaveCategory(category.id, input.value);
                              }
                            }}
                          >
                            <Save className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingCategory(null)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <CardTitle className="text-lg font-bold text-gray-900">
                          {category.name}
                        </CardTitle>
                      )}
                      <p className="text-sm text-gray-600">
                        {category.subcategories.length} subcategories
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingCategory(category.id)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Category Statistics */}
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="font-bold text-blue-600">
                        {stats.deals}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Deals</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Plus className="h-4 w-4 text-green-600" />
                      <span className="font-bold text-green-600">
                        {stats.submissions}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Submissions</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <span className="font-bold text-purple-600">
                        {stats.views.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Views</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Subcategories</h4>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setShowAddSubcategory(category.id)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>

                  {/* Add New Subcategory */}
                  {showAddSubcategory === category.id && (
                    <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                      <Input
                        placeholder="Subcategory name"
                        value={newSubcategoryName}
                        onChange={(e) => setNewSubcategoryName(e.target.value)}
                        className="h-8"
                      />
                      <Button
                        size="sm"
                        onClick={() => handleAddSubcategory(category.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setShowAddSubcategory(null);
                          setNewSubcategoryName("");
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}

                  {/* Subcategories List */}
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                          <span className="text-lg">{subcategory.icon}</span>

                          {editingSubcategory ===
                          `${category.id}-${subcategory.id}` ? (
                            <Input
                              defaultValue={subcategory.name}
                              onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                  handleSaveSubcategory(
                                    category.id,
                                    subcategory.id,
                                    e.currentTarget.value,
                                  );
                                }
                              }}
                              className="h-7 text-sm"
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-700">
                              {subcategory.name}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          {editingSubcategory ===
                          `${category.id}-${subcategory.id}` ? (
                            <>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  const input =
                                    e.currentTarget.parentElement?.parentElement?.querySelector(
                                      "input",
                                    );
                                  if (input) {
                                    handleSaveSubcategory(
                                      category.id,
                                      subcategory.id,
                                      input.value,
                                    );
                                  }
                                }}
                              >
                                <Save className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => setEditingSubcategory(null)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setEditingSubcategory(
                                    `${category.id}-${subcategory.id}`,
                                  )
                                }
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleDeleteSubcategory(
                                    category.id,
                                    subcategory.id,
                                  )
                                }
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Category Management Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Category Management Tools
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <GripVertical className="h-6 w-6 mb-2" />
              <span>Reorder Categories</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />
              <span>Bulk Import</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Analytics Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Category Performance Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.slice(0, 5).map((category) => {
              const stats = getStats(category.id);
              const totalDeals = Object.values(categoryStats).reduce(
                (sum, stat) => sum + stat.deals,
                0,
              );
              const percentage = (stats.deals / totalDeals) * 100;

              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {category.name}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{stats.deals} deals</span>
                      <span>{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageCategories;
