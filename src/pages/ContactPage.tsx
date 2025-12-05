
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { Phone, Mail, MapPin } from "lucide-react";

// Quotes Section Component
import gandhiImg from "@/assets/projects/Ooz2-htma-my.jpg";
import confuciusImg from "@/assets/projects/fucius-quotes.jpg";
import einsteinImg from "@/assets/projects/alb-23-ei045.jpg";

const quotes = [
  {
    img: gandhiImg,
    text: "A man is but a product of his thoughts.",
    author: "Mahatma Gandhi",
  },
  {
    img: confuciusImg,
    text: "Choose a job you love, and you’ll never have to work a day in your life.",
    author: "Confucius",
  },
  {
    img: einsteinImg,
    text: "Imagination is more important than knowledge.",
    author: "Albert Einstein",
  },
];

const InspirationalQuotes: React.FC = () => (
  <section className="py-20 bg-gradient-to-br from-accent/10 via-background to-primary/5">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
        <span className="inline-block bg-accent/20 text-accent px-6 py-2 rounded-full shadow">
          Inspirations We Live By
        </span>
      </h2>
      <div className="flex flex-wrap justify-center gap-8">
        {quotes.map((q, i) => (
          <div
            key={i}
            className="bg-white/90 dark:bg-card/80 rounded-2xl shadow-xl p-8 max-w-xs flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg mb-4 border-4 border-accent/40">
              <img
                src={q.img}
                alt={q.author}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <blockquote className="relative text-lg font-medium text-foreground mb-4">
              <span className="text-accent text-3xl absolute -left-4 -top-2">“</span>
              {q.text}
              <span className="text-accent text-3xl absolute -right-4 -bottom-2">”</span>
            </blockquote>
            <span className="mt-2 font-semibold text-accent">{q.author}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

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
  <InspirationalQuotes />
      </main>

      <Footer />
    </div>
  );
}
