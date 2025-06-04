import { Header } from "@/components/Header";
import { DealCard } from "@/components/DealCard";
import { Sidebar } from "@/components/Sidebar";

// Sample deals data
const sampleDeals = [
  {
    id: "1",
    title: "Apple iPhone 15 Pro Max 256GB - Natural Titanium",
    description:
      "Latest iPhone with titanium design, A17 Pro chip, and advanced camera system. Free shipping included.",
    image: "/placeholder.svg",
    originalPrice: 1199,
    discountedPrice: 999,
    discount: 17,
    merchant: "eBay",
    timePosted: "2h ago",
    votes: 156,
    comments: 23,
    promoCode: "IPHONE15",
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: "2",
    title: 'Samsung 65" 4K QLED Smart TV - QN65Q80C',
    description:
      "Quantum HDR, Object Tracking Sound+, and Alexa Built-in. Perfect for gaming and streaming.",
    image: "/placeholder.svg",
    originalPrice: 1299,
    discountedPrice: 899,
    discount: 31,
    merchant: "Best Buy",
    timePosted: "4h ago",
    votes: 89,
    comments: 12,
    isAvailable: true,
  },
  {
    id: "3",
    title: 'Nike Air Jordan 1 Retro High OG "Chicago"',
    description:
      "Classic colorway in premium leather. Authentic Nike product with original packaging.",
    image: "/placeholder.svg",
    originalPrice: 170,
    discountedPrice: 119,
    discount: 30,
    merchant: "Nike",
    timePosted: "6h ago",
    votes: 234,
    comments: 45,
    promoCode: "JORDAN30",
    isAvailable: true,
  },
  {
    id: "4",
    title: 'MacBook Air 13" M2 Chip 8GB RAM 256GB SSD',
    description:
      "Ultra-thin laptop with M2 chip performance. Perfect for students and professionals.",
    image: "/placeholder.svg",
    originalPrice: 1199,
    discountedPrice: 949,
    discount: 21,
    merchant: "Amazon",
    timePosted: "8h ago",
    votes: 67,
    comments: 8,
    isAvailable: true,
  },
  {
    id: "5",
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    description:
      "Industry-leading noise cancellation with 30-hour battery life and premium sound quality.",
    image: "/placeholder.svg",
    originalPrice: 399,
    discountedPrice: 279,
    discount: 30,
    merchant: "Sony",
    timePosted: "12h ago",
    votes: 145,
    comments: 19,
    promoCode: "SONY30OFF",
    isAvailable: true,
  },
  {
    id: "6",
    title: "LEGO Creator Expert Big Ben Building Kit",
    description:
      "Detailed replica of London's iconic clock tower. 4,163 pieces for experienced builders.",
    image: "/placeholder.svg",
    originalPrice: 249,
    discountedPrice: 199,
    discount: 20,
    merchant: "LEGO",
    timePosted: "1d ago",
    votes: 78,
    comments: 15,
    isAvailable: false,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Section Header */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">
                Deals for you
              </h1>
              <p className="text-gray-600">
                Discover the best deals, discounts, and offers from top brands.
                Save money on electronics, fashion, home goods, and more.
              </p>
            </div>

            {/* Deals Grid */}
            <div className="space-y-4">
              {sampleDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center pt-6">
              <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Load More Deals
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Help</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Follow Us</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-gray-900">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-600">
            <p>&copy; 2024 DealsHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
