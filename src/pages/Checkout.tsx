import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Phone, MapPin, CreditCard, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
  };
}

export default function Checkout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [mpesaCode, setMpesaCode] = useState("");
  const [loading, setLoading] = useState(false);
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
      .select("id, quantity, product_id, products(id, name, price)")
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
  };

  const total = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      navigate("/auth");
      return;
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: total,
        phone_number: phoneNumber,
        delivery_address: deliveryAddress,
        mpesa_code: mpesaCode || null,
        status: "pending",
      })
      .select()
      .single();

    if (orderError) {
      toast({
        title: "Error",
        description: "Failed to create order",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Create order items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      toast({
        title: "Error",
        description: "Failed to save order items",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Clear cart
    const { error: clearError } = await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    if (clearError) {
      console.error("Failed to clear cart:", clearError);
    }

    toast({
      title: "Order Placed Successfully!",
      description: "We'll contact you shortly to confirm your order",
    });

    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Checkout</h1>
          <p className="text-muted-foreground">Complete your order securely</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-xl text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => navigate("/shop")}>
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                    <Phone className="h-5 w-5 text-primary" />
                    Contact Information
                  </h2>
                  <div>
                    <Label htmlFor="phone">Phone Number (M-Pesa)</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0712345678"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                      className="mt-1"
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      We'll use this for M-Pesa payment and order updates
                    </p>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    Delivery Address
                  </h2>
                  <div>
                    <Label htmlFor="address">Full Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete delivery address including building, street, city..."
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      required
                      rows={4}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                    <CreditCard className="h-5 w-5 text-primary" />
                    Payment Information
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
                      <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <span className="h-2 w-2 bg-primary rounded-full animate-pulse"></span>
                        M-Pesa Payment Instructions
                      </h3>
                      <ol className="text-sm space-y-2 list-decimal list-inside text-foreground/80">
                        <li>Go to M-Pesa menu on your phone</li>
                        <li>Select <strong>Lipa Na M-Pesa</strong></li>
                        <li>Select <strong>Buy Goods and Services</strong></li>
                        <li>Enter Till Number: <span className="font-bold text-primary">123456</span></li>
                        <li>Enter amount: <span className="font-bold text-primary">KSh {total.toLocaleString()}</span></li>
                        <li>Enter your M-Pesa PIN and confirm</li>
                        <li>Copy the M-Pesa code from the SMS</li>
                      </ol>
                    </div>
                    <div>
                      <Label htmlFor="mpesa">M-Pesa Transaction Code (Optional)</Label>
                      <Input
                        id="mpesa"
                        type="text"
                        placeholder="e.g., QBR2X1Y3Z4"
                        value={mpesaCode}
                        onChange={(e) => setMpesaCode(e.target.value.toUpperCase())}
                        className="mt-1 uppercase"
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        You can add this later if you haven't paid yet
                      </p>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 text-lg font-semibold" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing Order...
                    </>
                  ) : (
                    <>Place Order - KSh {total.toLocaleString()}</>
                  )}
                </Button>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24 shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-foreground">Order Summary</h2>
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm py-2 border-b border-border/50 last:border-0">
                      <span className="text-foreground/80">{item.products.name} <span className="text-muted-foreground">x{item.quantity}</span></span>
                      <span className="font-semibold text-foreground">KSh {(item.products.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">KSh {total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="text-sm text-muted-foreground">Calculated after review</span>
                  </div>
                  <div className="flex justify-between text-xl pt-2 border-t border-border">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-primary">KSh {total.toLocaleString()}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                  <p className="text-xs text-muted-foreground text-center">
                    🔒 Your order information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}