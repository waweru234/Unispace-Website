import { Card, CardContent } from "@/components/ui/card";
import { Award, Lightbulb, Users, Shield, TrendingUp, Clock } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Certified Professionals",
    description: "Our team consists of qualified experts with years of experience in architecture, engineering, and design.",
    stat: "15+ Years",
  },
  {
    icon: Lightbulb,
    title: "Innovative Solutions",
    description: "We use creative approaches and modern technology to achieve efficient and aesthetic results.",
    stat: "100+ Designs",
  },
  {
    icon: Users,
    title: "Client-Centered",
    description: "Every project begins and ends with your satisfaction. We build with integrity and transparency.",
    stat: "500+ Happy Clients",
  },
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "We stand behind our work with comprehensive warranties and quality assurance processes.",
    stat: "100% Quality",
  },
  {
    icon: TrendingUp,
    title: "Proven Track Record",
    description: "Hundreds of successful projects across residential, commercial, and industrial sectors.",
    stat: "500+ Projects",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description: "We respect your time and budget with efficient project management and timely completion.",
    stat: "98% On Time",
  },
];

export const WhyChooseUs = () => {
  return (
    <section id="why-choose" className="py-24 bg-gradient-to-b from-background to-secondary/20 scroll-mt-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            Our Advantages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose Unispace?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Decades of excellence in transforming spaces across East Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden border-2 border-transparent hover:border-accent transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-8 relative">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-medium rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <span className="text-accent font-bold text-2xl">{feature.stat}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
