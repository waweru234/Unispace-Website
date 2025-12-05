import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, MessageSquare, TrendingUp } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalOrders: number;
  totalMessages: number;
  pendingOrders: number;
}

export const AdminOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalOrders: 0,
    totalMessages: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch total users
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Fetch total orders
      const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

      // Fetch pending orders
      const { count: pendingCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // Fetch total messages
      const { count: messagesCount } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      setStats({
        totalUsers: usersCount || 0,
        totalOrders: ordersCount || 0,
        totalMessages: messagesCount || 0,
        pendingOrders: pendingCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      description: "Registered users",
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      description: `${stats.pendingOrders} pending`,
      icon: Package,
      color: "text-accent",
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      description: "Contact inquiries",
      icon: MessageSquare,
      color: "text-green-medium",
    },
    {
      title: "Growth",
      value: "↑ 12%",
      description: "vs last month",
      icon: TrendingUp,
      color: "text-gold",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-32 bg-muted"></CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Platform performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Order Success Rate</span>
              <span className="text-sm font-medium">94%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: "94%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">User Engagement</span>
              <span className="text-sm font-medium">78%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: "78%" }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Response Rate</span>
              <span className="text-sm font-medium">89%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-green-medium h-2 rounded-full" style={{ width: "89%" }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
