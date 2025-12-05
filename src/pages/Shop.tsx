import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Search, Filter, ShoppingCart, Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock: number;
}

export default function Shop() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<Record<string, number>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateCartCount } = useCart();

  useEffect(() => {
    fetchProducts();
    fetchCartItems();

    // Subscribe to cart changes
    const channel = supabase
      .channel("cart-changes-shop")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cart_items",
        },
        () => {
          fetchCartItems();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const fetchCartItems = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      setCartItems({});
      return;
    }

    const { data } = await supabase
      .from("cart_items")
      .select("product_id, quantity")
      .eq("user_id", user.id);

    const cartMap: Record<string, number> = {};
    data?.forEach(item => {
      if (item.product_id) {
        cartMap[item.product_id] = item.quantity || 0;
      }
    });
    setCartItems(cartMap);
  };

  const addToCart = async (productId: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to cart",
      });
      navigate("/auth");
      return;
    }

    // Optimistic update
    setCartItems(prev => ({ ...prev, [productId]: 1 }));
    updateCartCount(1);

    const { error } = await supabase
      .from("cart_items")
      .insert({ user_id: user.id, product_id: productId, quantity: 1 });

    if (error) {
      // Revert on error
      setCartItems(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
      updateCartCount(-1);
      toast({
        title: "Error",
        description: "Failed to add to cart",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Added to Cart",
        description: "Item added to your cart",
      });
    }
  };

  const updateCartQuantity = async (productId: string, newQuantity: number) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return;

    const previousQuantity = cartItems[productId];
    const delta = newQuantity - previousQuantity;

    // Optimistic update
    if (newQuantity <= 0) {
      setCartItems(prev => {
        const updated = { ...prev };
        delete updated[productId];
        return updated;
      });
    } else {
      setCartItems(prev => ({ ...prev, [productId]: newQuantity }));
    }
    updateCartCount(delta);

    if (newQuantity <= 0) {
      // Remove from cart
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);

      if (error) {
        // Revert on error
        setCartItems(prev => ({ ...prev, [productId]: previousQuantity }));
        updateCartCount(-delta);
        toast({
          title: "Error",
          description: "Failed to remove from cart",
          variant: "destructive",
        });
      }
    } else {
      // Update quantity
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (existingItem) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("id", existingItem.id);

        if (error) {
          // Revert on error
          setCartItems(prev => ({ ...prev, [productId]: previousQuantity }));
          updateCartCount(-delta);
          toast({
            title: "Error",
            description: "Failed to update cart",
            variant: "destructive",
          });
        }
      }
    }
  };

  const categories = ["All", "Power Tools", "Hand Tools", "Measuring Tools", "Safety Equipment", "Hardware", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-8 animate-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-foreground">Our Shop</h1>
          <p className="text-muted-foreground text-lg">Browse our collection of quality products and services</p>
        </div>

        <div className="flex flex-col gap-4 mb-8">
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-lg border-2 border-primary/30 focus:border-primary bg-background shadow-md rounded-xl"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="bg-muted h-48 rounded mb-4" />
                <div className="bg-muted h-6 rounded mb-2" />
                <div className="bg-muted h-4 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-700"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-6xl text-muted-foreground/40">🔧</div>
                  )}
                  <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">KSh {product.price.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      View Details
                    </Button>
                    {cartItems[product.id] ? (
                      <div className="flex-1 flex items-center border border-border rounded-lg bg-background">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCartQuantity(product.id, cartItems[product.id] - 1);
                          }}
                          className="h-full"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="flex-1 text-center font-semibold">{cartItems[product.id]}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            updateCartQuantity(product.id, cartItems[product.id] + 1);
                          }}
                          className="h-full"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product.id);
                        }}
                        className="flex-1"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}