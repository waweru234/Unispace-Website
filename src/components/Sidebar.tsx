import { Home, Mail, Hammer, X, Award, BookOpen, ShoppingBag, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: ShoppingBag, label: "Shop", href: "/shop" },
  { icon: Hammer, label: "Services", href: "/services" },
  { icon: BookOpen, label: "About Us", href: "/about" },
  { icon: Award, label: "Blog", href: "/blog" },
  { icon: Mail, label: "Contact", href: "/contact" },
  { icon: User, label: "My Account", href: "/dashboard" },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(href);
    }
    onClose();
  };

  return (
    <>
      {/* Backdrop with enhanced blur */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 backdrop-blur-md z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar with premium design */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-primary to-primary/95 z-50 transition-transform duration-300 ease-out shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className="relative p-6 border-b border-primary-foreground/10">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                {/* Logo Image */}
                <div className="relative">
                  <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center ring-2 ring-accent/30 transition-all duration-300 hover:ring-accent/50">
                    <img 
                      src="/logo.png" 
                      alt="UNISPACE Logo" 
                      className="w-10 h-10 object-contain drop-shadow-lg"
                    />
                  </div>
                  <div className="absolute inset-0 bg-accent/10 rounded-xl blur-xl -z-10" />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-primary-foreground tracking-tight">UNISPACE</h2>
                  <p className="text-xs text-primary-foreground/60 font-medium">Opportunities Ltd</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-accent transition-all duration-200"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Tagline with enhanced styling */}
            <p className="text-sm text-primary-foreground/75 leading-relaxed font-medium">
              ✨ Building dreams, creating opportunities across East Africa.
            </p>
          </div>

          {/* Navigation with enhanced styling */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-accent/30 scrollbar-track-transparent">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.href)}
                className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl text-primary-foreground/85 hover:text-primary-foreground hover:bg-primary-foreground/10 active:bg-primary-foreground/15 transition-all duration-200 group relative overflow-hidden"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex items-center gap-3">
                  <item.icon className="h-5 w-5 group-hover:scale-110 group-hover:text-accent transition-all duration-200" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </button>
            ))}
          </nav>

          {/* CTA Section with premium styling */}
          <div className="p-6 border-t border-primary-foreground/10 bg-gradient-to-t from-primary/50 to-transparent">
            <div className="relative bg-gradient-to-br from-accent/20 to-accent/5 rounded-xl p-4 backdrop-blur-md border border-accent/20 overflow-hidden group hover:border-accent/40 transition-all duration-300">
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/10 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
              
              <div className="relative">
                <h3 className="font-bold text-accent mb-2 text-sm uppercase tracking-wider">Need Help?</h3>
                <p className="text-xs text-primary-foreground/70 mb-4 leading-relaxed">
                  Get expert guidance for your project
                </p>
                <Button 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg hover:shadow-gold transition-all duration-300 font-semibold"
                  onClick={() => {
                    handleNavigation('/contact');
                  }}
                >
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
