import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    "15+ Years of Excellence",
    "500+ Completed Projects",
    "Certified Professionals"
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container relative z-10 px-4 md:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 animate-in fade-in slide-in-from-left-8 duration-700"
            >
              <span className="bg-accent/20 backdrop-blur-md text-accent px-5 py-2.5 rounded-full text-sm font-semibold border border-accent/30 flex items-center gap-2 shadow-lg">
                <Sparkles className="h-4 w-4" />
                Award-Winning Construction Company
              </span>
            </div>
            
            {/* Main Heading */}
            <div className="space-y-4 animate-in fade-in slide-in-from-left-8 duration-700" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.1] tracking-tight">
                Crafting{" "}
                <span className="relative inline-block">
                  <span className="text-accent">Excellence</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 4 150 4 198 10" stroke="hsl(48 95% 53%)" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
                <br />
                Building{" "}
                <span className="text-accent">Legacies</span>
              </h1>
            </div>
            
            {/* Description */}
            <p 
              className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-xl animate-in fade-in slide-in-from-left-8 duration-700"
              style={{ animationDelay: '200ms' }}
            >
              From stunning interiors to custom woodwork — transforming visions into reality with unmatched craftsmanship across East Africa.
            </p>

            {/* Features */}
            <div 
              className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-left-8 duration-700"
              style={{ animationDelay: '300ms' }}
            >
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/20"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-primary-foreground">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-left-8 duration-700"
              style={{ animationDelay: '400ms' }}
            >
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-7 transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg group"
                onClick={scrollToProjects}
              >
                View Our Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-primary-foreground/10 backdrop-blur-sm border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-7 transition-all duration-300 hover:scale-105 group"
                onClick={scrollToContact}
              >
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Request Quote
              </Button>
            </div>
          </div>

          {/* Stats Card */}
          <div className="hidden lg:block animate-in fade-in slide-in-from-right-8 duration-1000" style={{ animationDelay: '300ms' }}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 rounded-3xl blur-2xl" />
              
              {/* Main card */}
              <div className="relative bg-primary-foreground/5 backdrop-blur-xl rounded-3xl p-8 border border-primary-foreground/20 shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
                
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "500+", label: "Projects Completed", delay: "0ms" },
                    { number: "15+", label: "Years Experience", delay: "100ms" },
                    { number: "100%", label: "Client Satisfaction", delay: "200ms" },
                    { number: "50+", label: "Expert Team", delay: "300ms" },
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className="relative bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 border border-accent/20 hover:border-accent/50 hover:bg-primary-foreground/15 transition-all duration-500 hover:scale-105 group cursor-pointer animate-in fade-in zoom-in-95 duration-500"
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div className="text-4xl font-bold text-accent mb-1 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                        <div className="text-primary-foreground/70 text-sm">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative element */}
                <div className="mt-6 pt-6 border-t border-primary-foreground/10">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent/50 border-2 border-primary-foreground/20 flex items-center justify-center text-xs font-bold text-accent-foreground">
                          {i}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-primary-foreground/80">
                      <span className="text-accent font-semibold">200+ Happy Clients</span>
                      <br />across East Africa
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-primary-foreground/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-accent rounded-full animate-pulse" />
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};
