import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Hammer, Lightbulb, PaintBucket, Trees, Wrench, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Construction",
    description: "From office buildings to retail spaces, we create structures that inspire and function flawlessly.",
    color: "from-green-medium to-primary",
  },
    {
    icon: PaintBucket,
    title: "Interior Design",
    description: "Transform your spaces with our expert design solutions tailored to your vision.",
    color: "from-primary to-green-medium",
  },
  {
    icon: Hammer,
    title: "Custom Carpentry",
    description: "Handcrafted wooden furniture and installations that blend beauty with durability.",
    color: "from-accent to-gold-dark",
  },

  {
    icon: Lightbulb,
    title: "Ceiling & Lighting",
    description: "Stunning ceiling designs with integrated lighting solutions for ambiance and functionality.",
    color: "from-gold-dark to-accent",
  },
  {
    icon: Trees,
    title: "Outdoor Spaces",
    description: "Beautiful outdoor furniture and landscaping solutions for your exterior spaces.",
    color: "from-green-medium to-primary",
  },
  {
    icon: Wrench,
    title: "Renovation Services",
    description: "Breathe new life into existing spaces with our comprehensive renovation expertise.",
    color: "from-accent to-gold-dark",
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background scroll-mt-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Our Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive construction and design solutions tailored to bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-border/50 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0">
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-green-medium rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                    <service.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Button 
                    variant="ghost" 
                    className="text-primary hover:text-accent group/btn p-0 h-auto font-semibold"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
