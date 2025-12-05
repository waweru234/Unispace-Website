import { Button } from "@/components/ui/button";
import { Menu, Phone } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export const Navbar = ({ onMenuClick }: NavbarProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-primary/10 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Unispace Logo" className="w-10 h-10 object-contain" />
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-foreground">UNISPACE</h1>
              <p className="text-xs text-muted-foreground">Opportunities Ltd</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="tel:+254707877847" 
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>+254 70 7877 847</span>
          </a>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
            Request Quote
          </Button>
        </div>
      </div>
    </nav>
  );
};
