import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

export const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-secondary/30 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your project? Reach out to us for a free consultation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <Card className="border-2 border-border/50 hover:border-accent/50 transition-colors duration-300">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Full Name *
                      </label>
                      <Input 
                        placeholder="John Doe" 
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number *
                      </label>
                      <Input 
                        placeholder="+254 XXX XXX XXX" 
                        required
                        className="border-border/50 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email Address *
                    </label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      required
                      className="border-border/50 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Project Type
                    </label>
                    <Input 
                      placeholder="e.g., Interior Design, Construction" 
                      className="border-border/50 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us about your project..." 
                      rows={5}
                      required
                      className="border-border/50 focus:border-primary resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold"
                  >
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary to-green-medium text-primary-foreground border-none shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapPin className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Address</h4>
                      <p className="text-primary-foreground/90">
                        P.O BOX 20657-00200<br />
                        City Square, Nairobi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <a 
                        href="tel:+254707877847" 
                        className="text-primary-foreground/90 hover:text-accent transition-colors"
                      >
                        +254 70 7877 847
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Working Hours</h4>
                      <p className="text-primary-foreground/90">
                        Monday - Saturday<br />
                        10:00 AM - 18:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-border/50">
              <div className="h-64 bg-muted relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.819799511454!2d36.81724831475394!3d-1.2833614359969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6b8c2b5e5%3A0x5c6a8f2c4d8e6f0!2sCity%20Square%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1635789012345"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Unispace Location"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
