import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green/20 via-background to-gold/20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Have a project in mind? We'd love to hear from you. Reach out to us for consultations and quotes.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="bg-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Phone</h3>
                <p className="text-muted-foreground">+254 707 877 847</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-gold" />
                </div>
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-muted-foreground">info@unispace.co.ke</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="bg-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-muted-foreground">Nairobi, Kenya</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
