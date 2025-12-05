import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import gazebo from "@/assets/projects/gazebo-outhouse.jpg";
import ceiling from "@/assets/projects/ceiling-design.jpg";
import yellowInterior from "@/assets/projects/yellow-interior.jpeg";
import reception from "@/assets/projects/reception-area.jpg";
import ledSignage from "@/assets/projects/led-signage.jpg";
import ropeLighting from "@/assets/projects/rope-lighting.jpg";
import fencing from "@/assets/projects/palette-fencing.jpg";
import treeBench from "@/assets/projects/tree-bench.jpg";

const projects = [
  {
    image: reception,
    title: "Modern Reception Design",
    category: "Interior Design",
    description: "Elegant reception area with ambient LED lighting and natural stone accents",
  },
  {
    image: ceiling,
    title: "Luxury Ceiling Installation",
    category: "Ceiling Design",
    description: "Contemporary ceiling design with integrated LED strip lighting",
  },
  {
    image: gazebo,
    title: "Outdoor Entertainment Space",
    category: "Custom Furniture",
    description: "Custom pallet furniture gazebo with entertainment setup",
  },
  {
    image: yellowInterior,
    title: "Pendant Lighting Design",
    category: "Interior Design",
    description: "Warm interior spaces with custom pendant lighting solutions",
  },
  {
    image: ledSignage,
    title: "LED Signage Installation",
    category: "Commercial",
    description: "Professional LED signage for Sports, Arts & Social Development Fund",
  },
  {
    image: ropeLighting,
    title: "Decorative Rope Lighting",
    category: "Interior Design",
    description: "Custom rope lighting fixture adding character to interior spaces",
  },
  {
    image: fencing,
    title: "Pallet Fencing & Planters",
    category: "Outdoor",
    description: "Sustainable pallet wood fencing with integrated planter boxes",
  },
  {
    image: treeBench,
    title: "Tree Bench Design",
    category: "Custom Furniture",
    description: "Hexagonal bench design built around landscape trees",
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-secondary/20 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16 space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <span className="inline-block bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-semibold">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Successful Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of completed projects across East Africa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="group overflow-hidden border-border/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-in fade-in slide-in-from-bottom-4 duration-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-square">
                <img 
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-none shadow-lg">
                  {project.category}
                </Badge>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                    <Eye className="h-7 w-7 text-accent-foreground" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-sm text-primary-foreground/90 line-clamp-2">{project.description}</p>
                </div>
              </div>
              <CardContent className="p-4 bg-card">
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{project.category}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
