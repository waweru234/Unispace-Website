import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

export const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ status: "read" })
        .eq("id", messageId);

      if (error) throw error;

      setMessages(
        messages.map((msg) =>
          msg.id === messageId ? { ...msg, status: "read" } : msg
        )
      );

      toast({
        title: "Success",
        description: "Message marked as read",
      });
    } catch (error) {
      console.error("Error updating message:", error);
      toast({
        title: "Error",
        description: "Failed to update message status",
        variant: "destructive",
      });
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

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Messages</CardTitle>
        <CardDescription>
          View and manage contact form submissions ({messages.length} total, {unreadCount} unread)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`border rounded-lg p-4 transition-all ${
                  message.status === "unread"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:shadow-md"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-semibold text-foreground">{message.name}</h3>
                      <Badge
                        variant={message.status === "unread" ? "default" : "secondary"}
                      >
                        {message.status}
                      </Badge>
                    </div>

                    <div className="text-sm text-muted-foreground space-y-2">
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a
                          href={`mailto:${message.email}`}
                          className="hover:text-primary transition-colors"
                        >
                          {message.email}
                        </a>
                      </p>
                      {message.phone && (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <a
                            href={`tel:${message.phone}`}
                            className="hover:text-primary transition-colors"
                          >
                            {message.phone}
                          </a>
                        </p>
                      )}
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {new Date(message.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  </div>

                  {message.status === "unread" && (
                    <div>
                      <Button
                        onClick={() => handleMarkAsRead(message.id)}
                        size="sm"
                        className="whitespace-nowrap"
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Mark as Read
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
