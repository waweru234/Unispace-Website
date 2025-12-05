import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User as UserIcon, 
  Package, 
  ShoppingBag, 
  LogOut,
  Mail,
  Phone,
  MapPin,
  Home,
  Briefcase,
  FileText,
  Info
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  full_name: string | null;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
}

interface Order {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  phone_number: string;
}

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);
    await fetchProfile(user.id);
    await fetchOrders(user.id);
    setLoading(false);
  };

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching profile:", error);
      return;
    }

    setProfile(data);
  };

  const fetchOrders = async (userId: string) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching orders:", error);
      return;
    }

    setOrders(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-light text-green-dark";
      case "processing":
        return "bg-accent/20 text-accent-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      case "cancelled":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const quickLinks = [
    { icon: Home, label: "Home", path: "/" },
    { icon: ShoppingBag, label: "Shop", path: "/shop" },
    { icon: Briefcase, label: "Services", path: "/#services" },
    { icon: Info, label: "About Us", path: "/#about" },
    { icon: FileText, label: "Blog", path: "/#blog" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Welcome back, {profile?.full_name || user?.email?.split("@")[0]}!
          </h1>
          <p className="text-muted-foreground">Manage your account and view your orders</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-3">
                {profile?.full_name && (
                  <div className="flex items-start gap-3">
                    <UserIcon className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Full Name</p>
                      <p className="font-medium">{profile.full_name}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user?.email}</p>
                  </div>
                </div>

                {profile?.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{profile.phone}</p>
                    </div>
                  </div>
                )}

                {profile?.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{profile.address}</p>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleLogout} 
                variant="outline" 
                className="w-full mt-4"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </CardContent>
          </Card>

          {/* Quick Links */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Navigate to different sections of the website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {quickLinks.map((link) => (
                  <Button
                    key={link.path}
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center justify-center gap-2 hover:bg-primary/5 hover:border-primary transition-all"
                    onClick={() => {
                      if (link.path.includes("#")) {
                        navigate("/");
                        setTimeout(() => {
                          const id = link.path.split("#")[1];
                          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                        }, 100);
                      } else {
                        navigate(link.path);
                      }
                    }}
                  >
                    <link.icon className="h-6 w-6 text-primary" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Your Orders
            </CardTitle>
            <CardDescription>
              {orders.length === 0
                ? "You haven't placed any orders yet"
                : `You have ${orders.length} order${orders.length > 1 ? "s" : ""}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No orders yet</p>
                <Button onClick={() => navigate("/shop")}>
                  Start Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <p className="font-semibold text-foreground">
                            Order #{order.id.slice(0, 8).toUpperCase()}
                          </p>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            {order.delivery_address}
                          </p>
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {order.phone_number}
                          </p>
                          <p>
                            Placed on {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          KSh {order.total_amount.toLocaleString()}
                        </p>
                        {order.status === "pending" && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Awaiting confirmation
                          </p>
                        )}
                        {order.status === "processing" && (
                          <p className="text-xs text-accent-foreground mt-1">
                            Being prepared
                          </p>
                        )}
                        {order.status === "completed" && (
                          <p className="text-xs text-green-medium mt-1">
                            Delivered
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
