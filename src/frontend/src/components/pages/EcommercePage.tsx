import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  Search,
  ShoppingBag,
  ShoppingCart,
  Star,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CATEGORIES = [
  "All",
  "Organic Food",
  "Handicrafts",
  "Clothing",
  "Health & Beauty",
  "Electronics",
];

const PRODUCTS = [
  {
    id: "e1",
    name: "Pure Organic Honey 500g",
    price: 350,
    originalPrice: 450,
    category: "Organic Food",
    rating: 4.8,
    reviews: 124,
    image: "/assets/generated/product-organic-honey.dim_400x400.jpg",
    badge: "Bestseller",
    description: "Pure raw honey from tribal beekeepers. No sugar added.",
  },
  {
    id: "e2",
    name: "Handmade Clay Pot Set",
    price: 850,
    originalPrice: 1200,
    category: "Handicrafts",
    rating: 4.6,
    reviews: 87,
    image: "/assets/generated/product-handicraft-pottery.dim_400x400.jpg",
    badge: "Handmade",
    description: "Beautiful hand-crafted clay pot set by local artisans.",
  },
  {
    id: "e3",
    name: "Organic Turmeric 200g",
    price: 180,
    originalPrice: 240,
    category: "Organic Food",
    rating: 4.7,
    reviews: 203,
    image: "/assets/generated/product-organic-honey.dim_400x400.jpg",
    description: "100% pure organic turmeric, high curcumin content.",
  },
  {
    id: "e4",
    name: "Bamboo Craft Set",
    price: 650,
    originalPrice: 900,
    category: "Handicrafts",
    rating: 4.4,
    reviews: 43,
    image: "/assets/generated/product-handicraft-pottery.dim_400x400.jpg",
    description: "Hand-crafted bamboo items for home decor.",
  },
  {
    id: "e5",
    name: "Moringa Powder 100g",
    price: 220,
    category: "Health & Beauty",
    rating: 4.9,
    reviews: 89,
    image: "/assets/generated/product-organic-honey.dim_400x400.jpg",
    badge: "New",
    description: "Superfood moringa packed with nutrients.",
  },
  {
    id: "e6",
    name: "Jute Shopping Bag",
    price: 299,
    originalPrice: 399,
    category: "Handicrafts",
    rating: 4.5,
    reviews: 156,
    image: "/assets/generated/product-handicraft-pottery.dim_400x400.jpg",
    badge: "SHG Product",
    description: "Eco-friendly handwoven jute bag by SHG members.",
  },
  {
    id: "e7",
    name: "Herbal Kadha Mix 100g",
    price: 150,
    originalPrice: 200,
    category: "Health & Beauty",
    rating: 4.6,
    reviews: 312,
    image: "/assets/generated/product-organic-honey.dim_400x400.jpg",
    description: "Traditional Ayurvedic immunity booster mix.",
  },
  {
    id: "e8",
    name: "Khadi Cotton Kurta",
    price: 750,
    originalPrice: 1000,
    category: "Clothing",
    rating: 4.3,
    reviews: 67,
    image: "/assets/generated/product-handicraft-pottery.dim_400x400.jpg",
    badge: "Handloom",
    description: "Authentic khadi cotton kurta, hand-spun by artisans.",
  },
];

interface CartItem {
  product: (typeof PRODUCTS)[0];
  qty: number;
}

export function EcommercePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof PRODUCTS)[0] | null
  >(null);
  const [sortBy, setSortBy] = useState("default");
  const [checkoutStep, setCheckoutStep] = useState<
    "cart" | "checkout" | "success"
  >("cart");
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const filtered = PRODUCTS.filter((p) => {
    const matchCat =
      selectedCategory === "All" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  }).sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const addToCart = (product: (typeof PRODUCTS)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.product.id === product.id);
      if (existing)
        return prev.map((c) =>
          c.product.id === product.id ? { ...c, qty: c.qty + 1 } : c,
        );
      return [...prev, { product, qty: 1 }];
    });
    toast.success("Added to cart!");
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((c) => c.product.id !== id));
  const cartTotal = cart.reduce((sum, c) => sum + c.product.price * c.qty, 0);
  const cartCount = cart.reduce((sum, c) => sum + c.qty, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep("success");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #166534 0%, #14532d 100%)",
        }}
        className="py-8 px-4"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-7 h-7" /> AUG E-Commerce
            </h1>
            <p className="text-green-100 text-sm mt-1">
              Authentic products from our members & SHG groups
            </p>
          </div>
          <Button
            onClick={() => {
              setShowCart(true);
              setCheckoutStep("cart");
            }}
            className="relative bg-white text-green-800 hover:bg-green-50"
            data-ocid="ecommerce.cart.button"
          >
            <ShoppingCart className="w-4 h-4 mr-2" /> Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full lg:w-48 flex-shrink-0">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  data-ocid={`ecommerce.category.${cat.toLowerCase().replace(/ /g, "_")}.button`}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-green-100 text-green-800 font-semibold"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
                data-ocid="ecommerce.search_input"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                className="w-full sm:w-44"
                data-ocid="ecommerce.sort.select"
              >
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div
            className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="ecommerce.list"
          >
            {filtered.length === 0 ? (
              <div
                className="col-span-4 text-center py-16 text-gray-400"
                data-ocid="ecommerce.empty_state"
              >
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No products found</p>
              </div>
            ) : (
              filtered.map((product, idx) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  data-ocid={`ecommerce.item.${idx + 1}`}
                >
                  <button
                    type="button"
                    className="relative block w-full"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover"
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
                      <span className="text-xs text-gray-500">
                        {product.rating}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="font-bold text-green-700 text-sm">
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
                      data-ocid={`ecommerce.add_to_cart.${idx + 1}`}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>

      {/* Cart / Checkout Dialog */}
      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-md" data-ocid="ecommerce.cart.dialog">
          {checkoutStep === "cart" && (
            <>
              <DialogHeader>
                <DialogTitle>🛒 Cart ({cartCount} items)</DialogTitle>
              </DialogHeader>
              {cart.length === 0 ? (
                <div
                  className="text-center py-8 text-gray-400"
                  data-ocid="ecommerce.cart.empty_state"
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
                          ₹{item.product.price} × {item.qty} = ₹
                          {item.product.price * item.qty}
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
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold text-green-700">
                      ₹{cartTotal}
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    style={{ backgroundColor: "#166534" }}
                    onClick={() => setCheckoutStep("checkout")}
                    data-ocid="ecommerce.checkout.button"
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </>
          )}
          {checkoutStep === "checkout" && (
            <>
              <DialogHeader>
                <DialogTitle>📦 Delivery Details</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input
                    required
                    value={orderDetails.name}
                    onChange={(e) =>
                      setOrderDetails((p) => ({ ...p, name: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="ecommerce.checkout.name.input"
                  />
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input
                    required
                    type="tel"
                    value={orderDetails.phone}
                    onChange={(e) =>
                      setOrderDetails((p) => ({ ...p, phone: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="ecommerce.checkout.phone.input"
                  />
                </div>
                <div>
                  <Label>Delivery Address *</Label>
                  <Input
                    required
                    value={orderDetails.address}
                    onChange={(e) =>
                      setOrderDetails((p) => ({
                        ...p,
                        address: e.target.value,
                      }))
                    }
                    className="mt-1"
                    data-ocid="ecommerce.checkout.address.input"
                  />
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-green-800">Order Summary</p>
                  <p>
                    Items: {cartCount} | Total: ₹{cartTotal}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Payment: Cash on Delivery
                  </p>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  style={{ backgroundColor: "#166534" }}
                  data-ocid="ecommerce.order.submit_button"
                >
                  Place Order (COD)
                </Button>
              </form>
            </>
          )}
          {checkoutStep === "success" && (
            <div
              className="text-center py-8"
              data-ocid="ecommerce.order.success_state"
            >
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-green-800 mb-2">
                Order Placed!
              </h3>
              <p className="text-gray-600 mb-4">
                Your order has been confirmed. Our team will contact you
                shortly.
              </p>
              <Button
                onClick={() => {
                  setCart([]);
                  setShowCart(false);
                  setCheckoutStep("cart");
                }}
                style={{ backgroundColor: "#166534" }}
                data-ocid="ecommerce.order.close_button"
              >
                Continue Shopping
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
        <DialogContent data-ocid="ecommerce.product.dialog">
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
                data-ocid="ecommerce.product.add_to_cart.button"
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
