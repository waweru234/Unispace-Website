import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

interface CartContextType {
  cartCount: number;
  updateCartCount: (delta: number) => void;
  refreshCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data } = await supabase
        .from("cart_items")
        .select("quantity")
        .eq("user_id", user.id);

      const total = data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
      setCartCount(total);
    } else {
      setCartCount(0);
    }
  };

  const updateCartCount = (delta: number) => {
    setCartCount(prev => Math.max(0, prev + delta));
  };

  const refreshCartCount = async () => {
    await fetchCartCount();
  };

  useEffect(() => {
    fetchCartCount();

    // Subscribe to cart changes
    const channel = supabase
      .channel("cart-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "cart_items",
        },
        () => {
          fetchCartCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};