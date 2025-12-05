import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Calendar, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface OrderItem {
  id: string;
  product_id: string;
  quantity: number;
  price: number;
  products: {
    name: string;
  };
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  phone_number: string;
  mpesa_code: string | null;
  created_at: string;
  user_name?: string;
  user_email?: string;
  order_items?: OrderItem[];
}

export const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            id,
            product_id,
            quantity,
            price,
            products (
              name
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      // Fetch user details from profiles table
      const ordersWithUsers = await Promise.all(
        (ordersData || []).map(async (order) => {
          const { data: profileData } = await supabase
            .from("profiles")
            .select("full_name, phone")
            .eq("id", order.user_id)
            .maybeSingle();

          return {
            ...order,
            user_name: profileData?.full_name || "Customer",
            user_email: profileData?.phone || order.phone_number,
          };
        })
      );

      setOrders(ordersWithUsers);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);

      if (error) throw error;

      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      toast({
        title: "Success",
        description: "Order status updated successfully",
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast({
        title: "Error",
        description: "Failed to update order status",
        variant: "destructive",
      });
    }
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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="h-8 bg-muted animate-pulse rounded"></div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Management</CardTitle>
        <CardDescription>
          View and manage all orders ({orders.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders yet</p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-foreground">
                        Order #{order.id.slice(0, 8).toUpperCase()}
                      </h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
                        <div>
                          <p className="font-medium text-foreground mb-1">Customer</p>
                          <p>{order.user_name}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">Email</p>
                          <p>{order.user_email}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                            <Phone className="h-4 w-4" /> Phone
                          </p>
                          <p>{order.phone_number}</p>
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" /> Amount
                          </p>
                          <p className="text-lg font-bold text-primary">
                            KSh {order.total_amount.toLocaleString()}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                            <MapPin className="h-4 w-4" /> Delivery Address
                          </p>
                          <p>{order.delivery_address}</p>
                        </div>
                        {order.mpesa_code && (
                          <div>
                            <p className="font-medium text-foreground mb-1">M-Pesa Transaction ID</p>
                            <p className="font-mono bg-muted px-2 py-1 rounded">{order.mpesa_code}</p>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-foreground mb-1 flex items-center gap-2">
                            <Calendar className="h-4 w-4" /> Date
                          </p>
                          <p>
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>

                      {order.order_items && order.order_items.length > 0 && (
                        <div className="border-t border-border pt-3">
                          <p className="font-medium text-foreground mb-2">Ordered Products:</p>
                          <div className="space-y-2">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex justify-between items-center bg-muted/50 px-3 py-2 rounded">
                                <span className="text-sm">
                                  {item.products.name} <span className="text-muted-foreground">x{item.quantity}</span>
                                </span>
                                <span className="text-sm font-semibold">
                                  KSh {(item.price * item.quantity).toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:w-48">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Update Status
                    </label>
                    <Select
                      value={order.status}
                      onValueChange={(value) => handleStatusUpdate(order.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
