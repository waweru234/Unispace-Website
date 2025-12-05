import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Calendar, User } from "lucide-react";
import corridorInterior from "@/assets/corridor-interior.jpg";
import treeBench from "@/assets/tree-bench-work.jpg";
import ceilingWork from "@/assets/ceiling-design-work.jpg";

const blogPosts = [
  {
    title: "Modern Interior Design Trends in Kenya",
    excerpt: "Discover the latest interior design trends transforming Kenyan homes and offices in 2025.",
    image: corridorInterior,
    date: "January 15, 2025",
    author: "Unispace Team",
  },
  {
    title: "Custom Furniture: Why Handcrafted Matters",
    excerpt: "Learn why investing in handcrafted custom furniture provides better value and quality than mass-produced alternatives.",
    image: treeBench,
    date: "January 10, 2025",
    author: "Unispace Team",
  },
  {
    title: "Gypsum Ceiling Installation Guide",
    excerpt: "A comprehensive guide to gypsum ceiling installation, design patterns, and maintenance tips.",
    image: ceilingWork,
    date: "January 5, 2025",
    author: "Unispace Team",
  },
];

export default function Blog() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 mt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green/20 via-background to-gold/20 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog & Insights</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert tips, project showcases, and industry insights from the Unispace team
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <article
                  key={index}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 hover:text-green transition-colors cursor-pointer">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <button className="text-green font-semibold hover:underline">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="bg-green text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest projects, tips, and exclusive offers
            </p>
            <div className="max-w-md mx-auto flex gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <button className="bg-gold text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-gold/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
