import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

interface CartItem {
  id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string | null;
  };
}

export default function Cart() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    const { data, error } = await supabase
      .from("cart_items")
      .select("id, quantity, products(id, name, price, image_url)")
      .eq("user_id", user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load cart",
        variant: "destructive",
      });
    } else {
      setCartItems(data || []);
    }
    setLoading(false);
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update quantity",
        variant: "destructive",
      });
    } else {
      fetchCartItems();
    }
  };

  const removeItem = async (id: string) => {
    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to remove item",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
      fetchCartItems();
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">Review your items and proceed to checkout</p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="bg-muted h-24 w-24 rounded" />
                  <div className="flex-1">
                    <div className="bg-muted h-6 rounded mb-2" />
                    <div className="bg-muted h-4 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
            <p className="text-xl font-semibold mb-2">Your cart is empty</p>
            <p className="text-muted-foreground mb-6">Start shopping to add items to your cart</p>
            <Button onClick={() => navigate("/shop")}>Browse Products</Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="bg-card border border-border rounded-lg p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded overflow-hidden flex-shrink-0">
                      {item.products.image_url ? (
                        <img 
                          src={item.products.image_url} 
                          alt={item.products.name} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-4xl text-muted-foreground/40">🔧</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{item.products.name}</h3>
                      <p className="text-2xl font-bold text-primary mb-4">KSh {item.products.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2 bg-muted rounded border border-border">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-4 font-semibold min-w-[3rem] text-center">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                        <span className="text-sm text-muted-foreground ml-auto">
                          Subtotal: <span className="font-semibold text-foreground">KSh {(item.products.price * item.quantity).toLocaleString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">KSh {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-semibold">Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-xl">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-green">KSh {total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full mt-3"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}