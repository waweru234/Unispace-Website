import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Target, Eye, Award, Users, Heart, Lightbulb, ArrowRight, CheckCircle2, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import showroomInterior from "@/assets/showroom-interior.jpg";
import loungeArea from "@/assets/lounge-area.jpg";

export default function AboutUs() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "15+", label: "Years Experience" },
    { number: "200+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
  ];

  const values = [
    {
      icon: Award,
      title: "Quality Excellence",
      description: "We never compromise on quality, ensuring every project meets the highest standards of craftsmanship.",
      color: "primary"
    },
    {
      icon: Users,
      title: "Client Focus",
      description: "Your satisfaction is our priority. We work closely with you at every step of the journey.",
      color: "accent"
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We embrace new ideas and technologies to deliver cutting-edge solutions for modern spaces.",
      color: "primary"
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Honesty and transparency guide every interaction. We build trust through our actions.",
      color: "accent"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 mt-16">
        {/* Hero Section */}
        <section className="relative h-[600px] overflow-hidden">
          <img
            src={showroomInterior}
            alt="About Unispace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          
          {/* Decorative elements */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-700">
                <span className="inline-block bg-accent/20 backdrop-blur-sm text-accent px-4 py-2 rounded-full text-sm font-semibold border border-accent/30 mb-6">
                  About Us
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-primary-foreground leading-tight">
                  Building Dreams,
                  <br />
                  <span className="text-accent">Creating Opportunities</span>
                </h1>
                <p className="text-xl text-primary-foreground/90 max-w-2xl leading-relaxed">
                  Transforming spaces and lives across East Africa with exceptional craftsmanship and innovative design solutions since our inception.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="bg-primary py-8 relative -mt-20 mx-4 md:mx-8 rounded-2xl shadow-2xl z-10 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '200ms' }}>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center animate-in fade-in zoom-in-95 duration-500"
                  style={{ animationDelay: `${300 + index * 100}ms` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.number}</div>
                  <div className="text-primary-foreground/80 text-sm md:text-base">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
                <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
                  Our Story
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
                  A Journey of 
                  <span className="text-primary"> Excellence</span>
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground">
                  <p>
                    Unispace Opportunities Ltd was founded with a vision to transform spaces and create lasting value for our clients across East Africa. What started as a small fabrication workshop has grown into a comprehensive construction and interior design company.
                  </p>
                  <p>
                    We specialize in metalwork, custom furniture, interior design, and construction services. Our team of skilled craftsmen and designers work tirelessly to bring your vision to life.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Expert Craftsmen",
                    "Modern Equipment", 
                    "Quality Materials",
                    "Timely Delivery"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-foreground font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  size="lg"
                  className="mt-6 bg-primary hover:bg-primary/90"
                  onClick={() => navigate("/contact")}
                >
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="relative animate-in fade-in slide-in-from-right-8 duration-700" style={{ animationDelay: '200ms' }}>
                <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-2xl" />
                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl border-4 border-background">
                  <img
                    src={loungeArea}
                    alt="Our Work"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-2xl shadow-xl animate-in zoom-in-95 duration-700" style={{ animationDelay: '500ms' }}>
                  <div className="text-4xl font-bold">15+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
                What Drives Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Mission & Vision
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div 
                className="group bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-left-8 duration-700"
                style={{ animationDelay: '100ms' }}
              >
                <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To deliver exceptional construction, fabrication, and interior design services that exceed our clients' expectations while maintaining the highest standards of quality and professionalism in every project we undertake.
                </p>
              </div>
              
              <div 
                className="group bg-card border border-border rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-right-8 duration-700"
                style={{ animationDelay: '200ms' }}
              >
                <div className="bg-gradient-to-br from-accent to-accent/80 text-accent-foreground w-20 h-20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Eye className="h-10 w-10" />
                </div>
                <h3 className="text-3xl font-bold mb-4 text-foreground">Our Vision</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To be East Africa's leading provider of innovative space transformation solutions, recognized for our craftsmanship, creativity, and unwavering commitment to creating opportunities for communities we serve.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Our Principles
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Core Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="group text-center p-8 rounded-3xl bg-card border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in zoom-in-95 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    value.color === 'primary' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-accent/10 text-accent'
                  }`}>
                    <value.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">{value.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-in fade-in zoom-in-95 duration-700">
              <Quote className="h-16 w-16 text-accent mx-auto mb-8 opacity-50" />
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-medium text-primary-foreground leading-relaxed mb-8">
                "We don't just build structures, we create spaces that inspire, comfort, and stand the test of time. Every project is a testament to our commitment to excellence."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-2xl font-bold text-accent-foreground">
                  U
                </div>
                <div className="text-left">
                  <div className="text-primary-foreground font-semibold text-lg">Unispace Team</div>
                  <div className="text-primary-foreground/70">Leadership</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-secondary/50 to-accent/10 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="absolute inset-0 bg-grid-pattern opacity-5" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Ready to Transform Your Space?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Let's discuss your project and bring your vision to life with our expert team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => navigate("/contact")}
                  >
                    Contact Us Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/shop")}
                  >
                    Browse Our Shop
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
