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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.05),transparent_70%)] pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.05),transparent_50%)] pointer-events-none" />

      <Header />

      <main className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-6 lg:space-y-8">
            {/* Section Header */}
            <div className="space-y-3 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                Deals for you
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
                Discover the best deals, discounts, and offers from top brands.
                Save money on electronics, fashion, home goods, and more with
                our carefully curated selection.
              </p>
            </div>

            {/* Deals Grid */}
            <div className="space-y-6">
              {sampleDeals.map((deal) => (
                <DealCard key={deal.id} {...deal} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center pt-8">
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 text-gray-700 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 font-semibold text-lg hover:-translate-y-1">
                Load More Deals
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 order-first xl:order-last">
            <div className="sticky top-24 lg:top-28">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-white/80 backdrop-blur-sm border-t border-gray-200/50 mt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Help</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Guidelines
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Legal</h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Follow Us
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-orange-600 transition-colors duration-200"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">D</span>
              </div>
              <span className="font-bold text-gray-900">DealsHub</span>
            </div>
            <p className="text-gray-600">
              &copy; 2024 DealsHub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
