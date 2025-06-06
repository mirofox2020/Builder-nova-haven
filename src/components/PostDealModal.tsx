import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Plus,
  DollarSign,
  Link,
  Image,
  Store,
  Tag,
  Calendar,
  CheckCircle,
  Upload,
  Percent,
} from "lucide-react";

interface PostDealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PostDealModal = ({ isOpen, onClose }: PostDealModalProps) => {
  const [dealForm, setDealForm] = useState({
    title: "",
    description: "",
    originalPrice: "",
    salePrice: "",
    dealUrl: "",
    imageUrl: "",
    store: "",
    category: "",
    expirationDate: "",
    dealCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const stores = [
    { id: "amazon", name: "Amazon", logo: "🛒" },
    { id: "walmart", name: "Walmart", logo: "🏪" },
    { id: "bestbuy", name: "Best Buy", logo: "🔵" },
    { id: "target", name: "Target", logo: "🎯" },
    { id: "nike", name: "Nike", logo: "👟" },
    { id: "apple", name: "Apple Store", logo: "🍎" },
    { id: "other", name: "Other", logo: "🛍️" },
  ];

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Health & Beauty",
    "Sports & Outdoors",
    "Books",
    "Gaming",
    "Automotive",
    "Toys",
    "Food & Beverages",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success
    setIsSuccess(true);
    setIsSubmitting(false);

    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false);
      setDealForm({
        title: "",
        description: "",
        originalPrice: "",
        salePrice: "",
        dealUrl: "",
        imageUrl: "",
        store: "",
        category: "",
        expirationDate: "",
        dealCode: "",
      });
      onClose();
    }, 3000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setDealForm({
        title: "",
        description: "",
        originalPrice: "",
        salePrice: "",
        dealUrl: "",
        imageUrl: "",
        store: "",
        category: "",
        expirationDate: "",
        dealCode: "",
      });
      setIsSuccess(false);
      onClose();
    }
  };

  const calculateDiscount = () => {
    const original = parseFloat(dealForm.originalPrice);
    const sale = parseFloat(dealForm.salePrice);
    if (original > 0 && sale > 0 && original > sale) {
      return Math.round(((original - sale) / original) * 100);
    }
    return 0;
  };

  const calculateSavings = () => {
    const original = parseFloat(dealForm.originalPrice);
    const sale = parseFloat(dealForm.salePrice);
    if (original > 0 && sale > 0 && original > sale) {
      return (original - sale).toFixed(2);
    }
    return null;
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Deal Submitted Successfully!
            </h3>
            <p className="text-gray-600 mb-4">
              Your deal is now pending review. We'll notify you once it's
              approved and live on the platform.
            </p>
            <Button
              onClick={handleClose}
              className="bg-green-600 hover:bg-green-700"
            >
              Awesome!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-6 w-6 text-orange-500" />
            Submit a Deal
          </DialogTitle>
          <DialogDescription>
            Share amazing deals with the community and help others save money
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Basic Information</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Deal Title *
                </label>
                <Input
                  placeholder="e.g., iPhone 15 Pro Max - 20% Off"
                  value={dealForm.title}
                  onChange={(e) =>
                    setDealForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  placeholder="Describe the deal, what makes it special, any limitations..."
                  rows={4}
                  value={dealForm.description}
                  onChange={(e) =>
                    setDealForm((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Original Price ($) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      value={dealForm.originalPrice}
                      onChange={(e) =>
                        setDealForm((prev) => ({
                          ...prev,
                          originalPrice: e.target.value,
                        }))
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Sale Price ($) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="number"
                      placeholder="0.00"
                      step="0.01"
                      value={dealForm.salePrice}
                      onChange={(e) =>
                        setDealForm((prev) => ({
                          ...prev,
                          salePrice: e.target.value,
                        }))
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              {(calculateDiscount() > 0 || calculateSavings()) && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-4">
                    {calculateDiscount() > 0 && (
                      <div className="flex items-center gap-1">
                        <Percent className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-700">
                          {calculateDiscount()}% OFF
                        </span>
                      </div>
                    )}
                    {calculateSavings() && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-bold text-green-700">
                          Save ${calculateSavings()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Deal URL *
                </label>
                <div className="relative">
                  <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="https://..."
                    value={dealForm.dealUrl}
                    onChange={(e) =>
                      setDealForm((prev) => ({
                        ...prev,
                        dealUrl: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Product Image URL
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="https://..."
                    value={dealForm.imageUrl}
                    onChange={(e) =>
                      setDealForm((prev) => ({
                        ...prev,
                        imageUrl: e.target.value,
                      }))
                    }
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Store & Category Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Store & Category</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Store *
                </label>
                <Select
                  value={dealForm.store}
                  onValueChange={(value) =>
                    setDealForm((prev) => ({ ...prev, store: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.name}>
                        <div className="flex items-center gap-2">
                          <span>{store.logo}</span>
                          <span>{store.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Category *
                </label>
                <Select
                  value={dealForm.category}
                  onValueChange={(value) =>
                    setDealForm((prev) => ({ ...prev, category: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Coupon/Deal Code
                </label>
                <Input
                  placeholder="Enter coupon code if applicable"
                  value={dealForm.dealCode}
                  onChange={(e) =>
                    setDealForm((prev) => ({
                      ...prev,
                      dealCode: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Expiration Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="date"
                    value={dealForm.expirationDate}
                    onChange={(e) =>
                      setDealForm((prev) => ({
                        ...prev,
                        expirationDate: e.target.value,
                      }))
                    }
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Preview */}
              {dealForm.imageUrl && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Image Preview
                  </label>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <img
                      src={dealForm.imageUrl}
                      alt="Product preview"
                      className="w-full h-32 object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Submission Guidelines */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              Submission Guidelines
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Ensure the deal is currently active and available</li>
              <li>• Provide accurate pricing and product information</li>
              <li>• Include a direct link to the product page</li>
              <li>• Avoid duplicate deals that are already posted</li>
              <li>• All submissions are reviewed before going live</li>
            </ul>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Deal...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Submit Deal
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
