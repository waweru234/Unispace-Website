import { Building2, Home, Mail, Hammer, X, Award, BookOpen, ShoppingBag, User } from "lucide-react";
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
  { icon: User, label: "My Account", href: "/dashboard" },
  { icon: Hammer, label: "Services", href: "/services" },
  { icon: BookOpen, label: "About Us", href: "/about" },
  { icon: Mail, label: "Contact", href: "/contact" },
  { icon: Award, label: "Blog", href: "/blog" },
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
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-primary z-50 transition-transform duration-300 ease-out shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-primary-foreground/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center shadow-gold">
                  <span className="text-accent-foreground font-bold text-2xl">U</span>
                </div>
                <div>
                  <h2 className="font-bold text-lg text-primary-foreground">UNISPACE</h2>
                  <p className="text-xs text-primary-foreground/70">Opportunities Ltd</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Building dreams, creating opportunities across East Africa.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.href)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all duration-200 group"
              >
                <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-primary-foreground/10">
            <div className="bg-accent/10 rounded-lg p-4 backdrop-blur-sm">
              <h3 className="font-semibold text-accent mb-2">Need Help?</h3>
              <p className="text-sm text-primary-foreground/70 mb-3">
                Contact us for a free consultation
              </p>
              <Button 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={() => {
                  handleNavigation('#contact');
                }}
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
