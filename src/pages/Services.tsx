import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Hammer, Paintbrush, Wrench, Sofa, Building2, Lightbulb } from "lucide-react";
import constructionWork from "@/assets/construction-work.jpg";
import interiorDesign from "@/assets/interior-design.jpg";
import customFurniture from "@/assets/custom-furniture.jpg";
import ceilingWork from "@/assets/ceiling-design-work.jpg";
import lightingDesign from "@/assets/lighting-design.jpg";
import outdoorFurniture from "@/assets/outdoor-furniture.jpg";

const services = [
  {
    icon: Building2,
    title: "Construction & Fabrication",
    description: "Professional metalwork, welding, and structural fabrication for residential and commercial projects.",
    image: constructionWork,
  },
  {
    icon: Paintbrush,
    title: "Interior Design",
    description: "Complete interior design solutions including gypsum ceiling, painting, and space transformation.",
    image: interiorDesign,
  },
  {
    icon: Sofa,
    title: "Custom Furniture",
    description: "Handcrafted furniture from pallets and premium wood, tailored to your unique specifications.",
    image: customFurniture,
  },
  {
    icon: Hammer,
    title: "Ceiling Installation",
    description: "Expert gypsum ceiling design and installation with modern patterns and lighting integration.",
    image: ceilingWork,
  },
  {
    icon: Lightbulb,
    title: "Lighting Solutions",
    description: "Creative lighting design and installation for both residential and commercial spaces.",
    image: lightingDesign,
  },
  {
    icon: Wrench,
    title: "Outdoor Furniture",
    description: "Durable outdoor furniture and seating solutions designed for Kenyan weather conditions.",
    image: outdoorFurniture,
  },
];

export default function Services() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 mt-16">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          <div className="container mx-auto px-4 text-center relative z-10 animate-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transforming spaces across East Africa with quality craftsmanship and innovative design solutions
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <service.icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-primary text-primary-foreground py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-green-medium to-primary opacity-90" />
          <div className="container mx-auto px-4 text-center relative z-10 animate-in fade-in duration-700">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote
            </p>
            <a
              href="#contact"
              className="inline-block bg-accent text-accent-foreground px-8 py-4 rounded-lg font-semibold hover:bg-accent/90 transition-all hover:scale-105 shadow-gold"
            >
              Get Started
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
