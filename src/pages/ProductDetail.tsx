import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Minus, Plus, Package, Truck, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
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

export default function ProductDetail() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateCartCount } = useCart();

  useEffect(() => {
    if (id) {
      fetchProduct();
      fetchCartQuantity();
    }

    // Subscribe to cart changes
    const channel = supabase
      .channel("cart-changes-detail")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cart_items",
        },
        () => {
          fetchCartQuantity();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load product",
        variant: "destructive",
      });
      navigate("/shop");
    } else {
      setProduct(data);
      setSelectedImage(data.image_url);
      fetchRelatedProducts(data.category);
    }
    setLoading(false);
  };

  const fetchRelatedProducts = async (category: string) => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("category", category)
      .neq("id", id)
      .limit(4);

    setRelatedProducts(data || []);
  };

  const fetchCartQuantity = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user || !id) {
      setCartQuantity(0);
      return;
    }

    const { data } = await supabase
      .from("cart_items")
      .select("quantity")
      .eq("user_id", user.id)
      .eq("product_id", id)
      .maybeSingle();

    setCartQuantity(data?.quantity || 0);
  };

  const addToCart = async () => {
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
    setCartQuantity(quantity);
    updateCartCount(quantity);

    const { error } = await supabase
      .from("cart_items")
      .insert({
        user_id: user.id,
        product_id: id,
        quantity: quantity
      });

    if (error) {
      // Revert on error
      setCartQuantity(0);
      updateCartCount(-quantity);
      toast({
        title: "Error",
        description: "Failed to add to cart",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Added to Cart",
        description: `${quantity} item(s) added to your cart`,
      });
    }
  };

  const updateCartQuantity = async (newQuantity: number) => {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !id) return;

    const previousQuantity = cartQuantity;
    const delta = newQuantity - previousQuantity;

    // Optimistic update
    setCartQuantity(newQuantity);
    updateCartCount(delta);

    if (newQuantity <= 0) {
      // Remove from cart
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", id);

      if (error) {
        // Revert on error
        setCartQuantity(previousQuantity);
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
        .eq("product_id", id)
        .maybeSingle();

      if (existingItem) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("id", existingItem.id);

        if (error) {
          // Revert on error
          setCartQuantity(previousQuantity);
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 container mx-auto px-4 py-8 mt-16">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  const stockStatus = product.stock > 10 ? "In Stock" : product.stock > 0 ? "Low Stock" : "Out of Stock";
  const stockColor = product.stock > 10 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/shop")}
          className="mb-6"
        >
          ← Back to Shop
        </Button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div 
              className="relative aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => setFullscreenImage(true)}
            >
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-9xl text-muted-foreground/40">🔧</div>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-lg font-semibold">Click to enlarge</span>
              </div>
            </div>
            
            {/* Thumbnail gallery - placeholder for multiple images */}
            <div className="grid grid-cols-4 gap-2">
              {product.image_url && (
                <div 
                  className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 ${
                    selectedImage === product.image_url ? 'border-primary' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedImage(product.image_url)}
                >
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-3xl font-bold text-primary">KSh {product.price.toLocaleString()}</span>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stockColor}`} />
                  <span className="text-sm font-medium">{stockStatus}</span>
                  <span className="text-sm text-muted-foreground">({product.stock} available)</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description || "High-quality tool perfect for professional and DIY projects. Built to last with premium materials and ergonomic design."}
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <h2 className="text-xl font-semibold mb-3">Specifications</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Category:</span>
                  <p className="font-medium">{product.category}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Stock:</span>
                  <p className="font-medium">{product.stock} units</p>
                </div>
                <div>
                  <span className="text-muted-foreground">SKU:</span>
                  <p className="font-medium">#{product.id.slice(0, 8).toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Availability:</span>
                  <p className="font-medium">{stockStatus}</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="border-t border-border pt-6">
              {cartQuantity > 0 ? (
                <div>
                  <label className="text-sm font-medium mb-2 block">In Cart</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-primary rounded-lg bg-primary/5">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateCartQuantity(cartQuantity - 1)}
                        className="h-12"
                      >
                        <Minus className="h-5 w-5" />
                      </Button>
                      <span className="px-8 py-2 font-bold text-lg">{cartQuantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateCartQuantity(cartQuantity + 1)}
                        disabled={cartQuantity >= product.stock}
                        className="h-12"
                      >
                        <Plus className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button 
                      onClick={() => navigate("/cart")}
                      className="flex-1"
                      size="lg"
                    >
                      View Cart
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="text-sm font-medium mb-2 block">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-6 py-2 font-semibold">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button 
                      onClick={addToCart}
                      disabled={product.stock === 0}
                      className="flex-1"
                      size="lg"
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
              <div className="text-center space-y-2">
                <Package className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm font-medium">Quality Guaranteed</p>
              </div>
              <div className="text-center space-y-2">
                <Truck className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm font-medium">Fast Delivery</p>
              </div>
              <div className="text-center space-y-2">
                <Shield className="h-8 w-8 mx-auto text-primary" />
                <p className="text-sm font-medium">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-border pt-12">
            <h2 className="text-3xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div
                  key={relatedProduct.id}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => navigate(`/product/${relatedProduct.id}`)}
                >
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                    {relatedProduct.image_url ? (
                      <img 
                        src={relatedProduct.image_url} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="text-6xl text-muted-foreground/40">🔧</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1 group-hover:text-primary transition-colors">{relatedProduct.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{relatedProduct.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">KSh {relatedProduct.price.toLocaleString()}</span>
                      <span className="text-xs text-muted-foreground">{relatedProduct.stock} in stock</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setFullscreenImage(false)}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10"
            onClick={() => setFullscreenImage(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <img 
            src={selectedImage} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
