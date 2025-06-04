export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  icon: string;
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
      { id: "smart-home", name: "Smart Home", icon: "🏠" },
      { id: "wearables", name: "Wearables", icon: "⌚" },
    ],
  },
  {
    id: "fashion",
    name: "Clothing & Fashion",
    icon: "👔",
    subcategories: [
      { id: "mens-clothing", name: "Men's Clothing", icon: "👔" },
      { id: "womens-clothing", name: "Women's Clothing", icon: "👗" },
      { id: "shoes", name: "Shoes", icon: "👟" },
      { id: "accessories", name: "Accessories", icon: "👜" },
      { id: "jewelry", name: "Jewelry", icon: "💍" },
      { id: "watches", name: "Watches", icon: "⌚" },
      { id: "kids-clothing", name: "Kids' Clothing", icon: "👶" },
      { id: "activewear", name: "Activewear", icon: "🏃‍♂️" },
    ],
  },
  {
    id: "home-kitchen",
    name: "Home & Kitchen",
    icon: "🏠",
    subcategories: [
      { id: "furniture", name: "Furniture", icon: "🛋️" },
      { id: "appliances", name: "Appliances", icon: "🔌" },
      { id: "cookware", name: "Cookware", icon: "🍳" },
      { id: "decor", name: "Home Decor", icon: "🖼️" },
      { id: "bedding", name: "Bedding", icon: "🛏️" },
      { id: "lighting", name: "Lighting", icon: "💡" },
      { id: "storage", name: "Storage", icon: "📦" },
      { id: "cleaning", name: "Cleaning", icon: "🧽" },
    ],
  },
  {
    id: "beauty",
    name: "Health & Beauty",
    icon: "💄",
    subcategories: [
      { id: "skincare", name: "Skincare", icon: "🧴" },
      { id: "makeup", name: "Makeup", icon: "💄" },
      { id: "haircare", name: "Hair Care", icon: "💇‍♀️" },
      { id: "fragrance", name: "Fragrance", icon: "🌸" },
      { id: "health", name: "Health", icon: "💊" },
      { id: "wellness", name: "Wellness", icon: "🧘‍♀️" },
      { id: "personal-care", name: "Personal Care", icon: "🪥" },
      { id: "supplements", name: "Supplements", icon: "💊" },
    ],
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    icon: "⚽",
    subcategories: [
      { id: "fitness", name: "Fitness", icon: "🏋️‍♂️" },
      { id: "outdoor-gear", name: "Outdoor Gear", icon: "🏕️" },
      { id: "team-sports", name: "Team Sports", icon: "⚽" },
      { id: "water-sports", name: "Water Sports", icon: "🏊‍♂️" },
      { id: "cycling", name: "Cycling", icon: "🚴‍♂️" },
      { id: "running", name: "Running", icon: "🏃‍♂️" },
      { id: "winter-sports", name: "Winter Sports", icon: "⛷️" },
      { id: "hunting", name: "Hunting & Fishing", icon: "🎣" },
    ],
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "🚗",
    subcategories: [
      { id: "car-parts", name: "Car Parts", icon: "🔧" },
      { id: "accessories", name: "Car Accessories", icon: "🚗" },
      { id: "tools", name: "Tools", icon: "🛠️" },
      { id: "electronics", name: "Car Electronics", icon: "📻" },
      { id: "exterior", name: "Exterior", icon: "🚙" },
      { id: "interior", name: "Interior", icon: "🪑" },
      { id: "maintenance", name: "Maintenance", icon: "🔧" },
      { id: "motorcycle", name: "Motorcycle", icon: "🏍️" },
    ],
  },
  {
    id: "books",
    name: "Books & Media",
    icon: "📚",
    subcategories: [
      { id: "fiction", name: "Fiction", icon: "📖" },
      { id: "non-fiction", name: "Non-Fiction", icon: "📚" },
      { id: "textbooks", name: "Textbooks", icon: "📝" },
      { id: "ebooks", name: "E-books", icon: "📱" },
      { id: "audiobooks", name: "Audiobooks", icon: "🎧" },
      { id: "magazines", name: "Magazines", icon: "📰" },
      { id: "movies", name: "Movies & TV", icon: "🎬" },
      { id: "music", name: "Music", icon: "🎵" },
    ],
  },
  {
    id: "toys",
    name: "Toys & Games",
    icon: "🧸",
    subcategories: [
      { id: "action-figures", name: "Action Figures", icon: "🦸‍♂️" },
      { id: "board-games", name: "Board Games", icon: "🎲" },
      { id: "puzzles", name: "Puzzles", icon: "🧩" },
      { id: "educational", name: "Educational", icon: "📚" },
      { id: "outdoor-toys", name: "Outdoor Toys", icon: "🏀" },
      { id: "dolls", name: "Dolls", icon: "🪆" },
      { id: "building-sets", name: "Building Sets", icon: "🧱" },
      { id: "video-games", name: "Video Games", icon: "🎮" },
    ],
  },
  {
    id: "garden",
    name: "Garden & Outdoors",
    icon: "🌱",
    subcategories: [
      { id: "plants", name: "Plants & Seeds", icon: "🌱" },
      { id: "tools", name: "Garden Tools", icon: "🛠️" },
      { id: "furniture", name: "Outdoor Furniture", icon: "🪑" },
      { id: "grills", name: "Grills & BBQ", icon: "🔥" },
      { id: "decor", name: "Outdoor Decor", icon: "🌸" },
      { id: "irrigation", name: "Irrigation", icon: "💧" },
      { id: "pest-control", name: "Pest Control", icon: "🐛" },
      { id: "lawn-care", name: "Lawn Care", icon: "🌿" },
    ],
  },
  {
    id: "baby",
    name: "Baby & Kids",
    icon: "👶",
    subcategories: [
      { id: "baby-gear", name: "Baby Gear", icon: "🍼" },
      { id: "diapers", name: "Diapers", icon: "👶" },
      { id: "feeding", name: "Feeding", icon: "🍼" },
      { id: "clothing", name: "Baby Clothing", icon: "👶" },
      { id: "safety", name: "Safety", icon: "🔒" },
      { id: "furniture", name: "Baby Furniture", icon: "🛏️" },
      { id: "bath", name: "Bath & Potty", icon: "🛁" },
      { id: "travel", name: "Travel Gear", icon: "🚗" },
    ],
  },
];
