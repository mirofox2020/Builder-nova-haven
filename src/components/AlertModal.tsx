import { useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Bell,
  Search,
  DollarSign,
  Mail,
  Smartphone,
  X,
  Plus,
  CheckCircle,
} from "lucide-react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AlertModal = ({ isOpen, onClose }: AlertModalProps) => {
  const [alertForm, setAlertForm] = useState({
    productUrl: "",
    productName: "",
    currentPrice: "",
    targetPrice: "",
    store: "",
    notificationMethod: "email",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const stores = [
    { id: "amazon", name: "Amazon" },
    { id: "walmart", name: "Walmart" },
    { id: "bestbuy", name: "Best Buy" },
    { id: "target", name: "Target" },
    { id: "nike", name: "Nike" },
    { id: "apple", name: "Apple Store" },
    { id: "other", name: "Other" },
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
      setAlertForm({
        productUrl: "",
        productName: "",
        currentPrice: "",
        targetPrice: "",
        store: "",
        notificationMethod: "email",
      });
      onClose();
    }, 2000);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setAlertForm({
        productUrl: "",
        productName: "",
        currentPrice: "",
        targetPrice: "",
        store: "",
        notificationMethod: "email",
      });
      setIsSuccess(false);
      onClose();
    }
  };

  const calculateSavings = () => {
    const current = parseFloat(alertForm.currentPrice);
    const target = parseFloat(alertForm.targetPrice);
    if (current > 0 && target > 0 && current > target) {
      return (current - target).toFixed(2);
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
              Alert Created Successfully!
            </h3>
            <p className="text-gray-600 mb-4">
              We'll notify you when the price drops to your target.
            </p>
            <Button
              onClick={handleClose}
              className="bg-green-600 hover:bg-green-700"
            >
              Got it!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-orange-500" />
            Create Price Alert
          </DialogTitle>
          <DialogDescription>
            Get notified when your favorite products go on sale
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Product Information */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Product Information</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Product URL or Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Enter product URL or search for product"
                    value={alertForm.productUrl}
                    onChange={(e) =>
                      setAlertForm((prev) => ({
                        ...prev,
                        productUrl: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <Input
                  placeholder="Enter product name"
                  value={alertForm.productName}
                  onChange={(e) =>
                    setAlertForm((prev) => ({
                      ...prev,
                      productName: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Store
                </label>
                <Select
                  value={alertForm.store}
                  onValueChange={(value) =>
                    setAlertForm((prev) => ({ ...prev, store: value }))
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    {stores.map((store) => (
                      <SelectItem key={store.id} value={store.name}>
                        {store.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Price & Notification Settings */}
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">
                Price & Notifications
              </h3>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Current Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={alertForm.currentPrice}
                    onChange={(e) =>
                      setAlertForm((prev) => ({
                        ...prev,
                        currentPrice: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Target Price ($)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={alertForm.targetPrice}
                    onChange={(e) =>
                      setAlertForm((prev) => ({
                        ...prev,
                        targetPrice: e.target.value,
                      }))
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {calculateSavings() && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700">
                    <strong>Potential Savings: ${calculateSavings()}</strong>
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Notification Method
                </label>
                <Select
                  value={alertForm.notificationMethod}
                  onValueChange={(value) =>
                    setAlertForm((prev) => ({
                      ...prev,
                      notificationMethod: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </div>
                    </SelectItem>
                    <SelectItem value="push">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Push Notification
                      </div>
                    </SelectItem>
                    <SelectItem value="both">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        Both
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Alert Benefits */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">
              Why create price alerts?
            </h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Get notified instantly when prices drop</li>
              <li>• Never miss a deal on your favorite products</li>
              <li>• Save money by buying at the right time</li>
              <li>• Track multiple products simultaneously</li>
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
                  Creating Alert...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Alert
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
