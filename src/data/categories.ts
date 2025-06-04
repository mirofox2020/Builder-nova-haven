export interface Subcategory {
  id: string;
  name: string;
  icon: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    icon: "📱",
    subcategories: [
      { id: "smartphones", name: "Smartphones", icon: "📱" },
      { id: "laptops", name: "Laptops", icon: "💻" },
      { id: "tablets", name: "Tablets", icon: "📱" },
      { id: "headphones", name: "Headphones", icon: "🎧" },
      { id: "cameras", name: "Cameras", icon: "📷" },
      { id: "gaming", name: "Gaming", icon: "🎮" },
      { id: "tv-audio", name: "TV & Audio", icon: "📺" },
      { id: "accessories", name: "Accessories", icon: "🔌" },
    ],
  },
  {
    id: "fashion",
    name: "Fashion",
    icon: "👕",
    subcategories: [
      { id: "mens-clothing", name: "Men's Clothing", icon: "👔" },
      { id: "womens-clothing", name: "Women's Clothing", icon: "👗" },
      { id: "shoes", name: "Shoes", icon: "👟" },
      { id: "bags", name: "Bags", icon: "👜" },
      { id: "jewelry", name: "Jewelry", icon: "💍" },
      { id: "watches", name: "Watches", icon: "⌚" },
      { id: "sunglasses", name: "Sunglasses", icon: "🕶️" },
      { id: "activewear", name: "Activewear", icon: "🏃" },
    ],
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    icon: "🏠",
    subcategories: [
      { id: "furniture", name: "Furniture", icon: "🪑" },
      { id: "appliances", name: "Appliances", icon: "🔧" },
      { id: "cookware", name: "Cookware", icon: "🍳" },
      { id: "bedding", name: "Bedding", icon: "🛏️" },
      { id: "decor", name: "Home Decor", icon: "🕯️" },
      { id: "lighting", name: "Lighting", icon: "💡" },
      { id: "storage", name: "Storage", icon: "📦" },
      { id: "cleaning", name: "Cleaning", icon: "🧽" },
    ],
  },
  {
    id: "health-beauty",
    name: "Health & Beauty",
    icon: "💄",
    subcategories: [
      { id: "skincare", name: "Skincare", icon: "🧴" },
      { id: "makeup", name: "Makeup", icon: "💄" },
      { id: "haircare", name: "Hair Care", icon: "💇" },
      { id: "fragrances", name: "Fragrances", icon: "🌸" },
      { id: "vitamins", name: "Vitamins", icon: "💊" },
      { id: "fitness", name: "Fitness", icon: "💪" },
      { id: "personal-care", name: "Personal Care", icon: "🧼" },
      { id: "wellness", name: "Wellness", icon: "🧘" },
    ],
  },
  {
    id: "sports-outdoors",
    name: "Sports & Outdoors",
    icon: "⚽",
    subcategories: [
      { id: "exercise", name: "Exercise", icon: "🏋️" },
      { id: "outdoor-gear", name: "Outdoor Gear", icon: "🎒" },
      { id: "camping", name: "Camping", icon: "⛺" },
      { id: "cycling", name: "Cycling", icon: "🚴" },
      { id: "running", name: "Running", icon: "🏃" },
      { id: "swimming", name: "Swimming", icon: "🏊" },
      { id: "team-sports", name: "Team Sports", icon: "⚽" },
      { id: "winter-sports", name: "Winter Sports", icon: "⛷️" },
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "🚗",
    subcategories: [
      { id: "car-accessories", name: "Car Accessories", icon: "🚗" },
      { id: "tools", name: "Tools", icon: "🔧" },
      { id: "car-care", name: "Car Care", icon: "🧽" },
      { id: "electronics", name: "Electronics", icon: "📱" },
      { id: "tires", name: "Tires", icon: "🛞" },
      { id: "parts", name: "Parts", icon: "⚙️" },
      { id: "motorcycle", name: "Motorcycle", icon: "🏍️" },
      { id: "rv", name: "RV & Camping", icon: "🚐" },
    ],
  },
  {
    id: "books-media",
    name: "Books & Media",
    icon: "📚",
    subcategories: [
      { id: "books", name: "Books", icon: "📖" },
      { id: "ebooks", name: "E-books", icon: "📱" },
      { id: "audiobooks", name: "Audiobooks", icon: "🎧" },
      { id: "movies", name: "Movies", icon: "🎬" },
      { id: "music", name: "Music", icon: "🎵" },
      { id: "magazines", name: "Magazines", icon: "📰" },
      { id: "comics", name: "Comics", icon: "📚" },
      { id: "educational", name: "Educational", icon: "🎓" },
    ],
  },
  {
    id: "toys-games",
    name: "Toys & Games",
    icon: "🧸",
    subcategories: [
      { id: "action-figures", name: "Action Figures", icon: "🤖" },
      { id: "board-games", name: "Board Games", icon: "🎲" },
      { id: "puzzles", name: "Puzzles", icon: "🧩" },
      { id: "dolls", name: "Dolls", icon: "🪆" },
      { id: "educational-toys", name: "Educational", icon: "🎓" },
      { id: "outdoor-toys", name: "Outdoor Toys", icon: "🏀" },
      { id: "building-sets", name: "Building Sets", icon: "🧱" },
      { id: "arts-crafts", name: "Arts & Crafts", icon: "🎨" },
    ],
  },
  {
    id: "garden-outdoors",
    name: "Garden & Outdoors",
    icon: "🌱",
    subcategories: [
      { id: "plants", name: "Plants", icon: "🌱" },
      { id: "garden-tools", name: "Garden Tools", icon: "🪴" },
      { id: "outdoor-furniture", name: "Outdoor Furniture", icon: "🪑" },
      { id: "grilling", name: "Grilling", icon: "🔥" },
      { id: "patio", name: "Patio", icon: "🏡" },
      { id: "lawn-care", name: "Lawn Care", icon: "🌿" },
      { id: "irrigation", name: "Irrigation", icon: "💧" },
      { id: "lighting", name: "Outdoor Lighting", icon: "💡" },
    ],
  },
  {
    id: "baby-kids",
    name: "Baby & Kids",
    icon: "👶",
    subcategories: [
      { id: "baby-gear", name: "Baby Gear", icon: "🍼" },
      { id: "clothing", name: "Kids Clothing", icon: "👕" },
      { id: "toys", name: "Toys", icon: "🧸" },
      { id: "nursery", name: "Nursery", icon: "🛏️" },
      { id: "feeding", name: "Feeding", icon: "🍼" },
      { id: "safety", name: "Safety", icon: "🔒" },
      { id: "school", name: "School Supplies", icon: "📝" },
      { id: "books", name: "Kids Books", icon: "📚" },
    ],
  },
];
