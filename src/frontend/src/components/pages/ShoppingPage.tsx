import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search, ShoppingCart, Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  badge?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Pure Organic Honey (500g)",
    price: 350,
    originalPrice: 450,
    category: "organic",
    image: "/assets/generated/product-organic-honey.dim_400x400.jpg",
    rating: 4.8,
    reviews: 124,
    description:
      "Pure raw honey sourced directly from tribal beekeepers. No added sugar, 100% natural.",
    badge: "Bestseller",
  },
  {
    id: "p2",
    name: "Handmade Clay Pottery Set",
    price: 850,
    originalPrice: 1200,
    category: "handicraft",
    image: "/assets/generated/product-handicraft-pottery.dim_400x400.jpg",
    rating: 4.6,
    reviews: 87,
    description:
      "Beautiful hand-crafted pottery set made by local artisans. Set of 6 pieces.",
    badge: "Handmade",
  },
  {
    id: "p3",
    name: "Organic Turmeric Powder (200g)",
    price: 180,
    originalPrice: 240,
    category: "organic",
    image: "/assets/generated/hero-ngo-activities.dim_1400x600.jpg",
    rating: 4.7,
    reviews: 203,
    description:
      "100% pure organic turmeric from certified farms. Rich in curcumin.",
  },
  {
    id: "p4",
    name: "Hand-Woven Jute Bag",
    price: 299,
    originalPrice: 399,
    category: "handicraft",
    image: "/assets/generated/product-handicraft-pottery.dim_400x400.jpg",
    rating: 4.5,
    reviews: 156,
    description:
      "Eco-friendly hand-woven jute bag by SHG women members. Sturdy and stylish.",
    badge: "SHG Product",
  },
  {
    id: "p5",
    name: "Moringa Powder (100g)",
    price: 220,
    category: "organic",
    image: "/assets/generated/product-organic-honey.dim_400x400.jpg",
    rating: 4.9,
    reviews: 89,
    description: "Superfood moringa powder packed with vitamins and minerals.",
    badge: "New",
  },
  {
    id: "p6",
    name: "Bamboo Craft Showpiece",
    price: 650,
    originalPrice: 900,
    category: "handicraft",
    image: "/assets/generated/product-handicraft-pottery.dim_400x400.jpg",
    rating: 4.4,
    reviews: 43,
    description:
      "Beautifully crafted bamboo showpiece. Perfect for home decor.",
  },
];

const CATEGORIES = [
  { value: "all", label: "All Products" },
  { value: "organic", label: "Organic Products" },
  { value: "handicraft", label: "Handicrafts" },
  { value: "shg", label: "SHG Products" },
];

interface CartItem {
  product: Product;
  qty: number;
}

export function ShoppingPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "all" || p.category === category;
    return matchSearch && matchCat;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing) {
        return prev.map((c) =>
          c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((c) => c.product.id !== id));
  };

  const cartTotal = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero */}
      <div
        className="py-10 md:py-16 text-white text-center px-4"
        style={{
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-3">🛍️ AUG Shopping</h1>
        <p className="text-green-100 max-w-xl mx-auto text-sm md:text-base">
          Buy authentic organic products and handcrafted items from our SHG
          members
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              data-ocid="shop.search_input"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger
              className="w-full sm:w-48"
              data-ocid="shop.category.select"
            >
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={() => setShowCart(true)}
            data-ocid="shop.cart.button"
            className="relative"
            style={{ backgroundColor: "#166534" }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>

        {/* Product Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          data-ocid="shop.list"
        >
          {filtered.length === 0 ? (
            <div
              className="col-span-4 text-center py-16 text-gray-400"
              data-ocid="shop.empty_state"
            >
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No products found</p>
            </div>
          ) : (
            filtered.map((product, idx) => (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                data-ocid={`shop.item.${idx + 1}`}
              >
                <button
                  type="button"
                  className="relative cursor-pointer block w-full"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 object-cover"
                  />
                  {product.badge && (
                    <Badge
                      className="absolute top-2 left-2 text-xs"
                      style={{ backgroundColor: "#166534" }}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </button>
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="font-bold text-green-700">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                  </div>
                  <Button
                    size="sm"
                    className="w-full text-xs"
                    style={{ backgroundColor: "#166534" }}
                    onClick={() => addToCart(product)}
                    data-ocid={`shop.add_to_cart.${idx + 1}`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Cart Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-md" data-ocid="shop.cart.dialog">
          <DialogHeader>
            <DialogTitle>🛒 Shopping Cart ({cartCount} items)</DialogTitle>
          </DialogHeader>
          {cart.length === 0 ? (
            <div
              className="text-center py-8 text-gray-400"
              data-ocid="shop.cart.empty_state"
            >
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-green-700">
                      ₹{item.product.price} × {item.qty}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-green-700 text-lg">
                  ₹{cartTotal}
                </span>
              </div>
              <Button
                className="w-full"
                style={{ backgroundColor: "#166534" }}
                onClick={() => {
                  toast.success(
                    "Order placed! Our team will contact you shortly.",
                  );
                  setCart([]);
                  setShowCart(false);
                }}
                data-ocid="shop.checkout.button"
              >
                Place Order (COD)
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Product Detail Dialog */}
      <Dialog
        open={!!selectedProduct}
        onOpenChange={() => setSelectedProduct(null)}
      >
        <DialogContent className="max-w-md" data-ocid="shop.product.dialog">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm">
                  {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                {selectedProduct.description}
              </p>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold text-green-700">
                  ₹{selectedProduct.price}
                </span>
                {selectedProduct.originalPrice && (
                  <span className="text-gray-400 line-through">
                    ₹{selectedProduct.originalPrice}
                  </span>
                )}
              </div>
              <Button
                className="w-full"
                style={{ backgroundColor: "#166534" }}
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                data-ocid="shop.product.add_to_cart.button"
              >
                <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
