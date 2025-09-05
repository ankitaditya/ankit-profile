import { Button } from "@/components/ui/button";
import { User, FileText } from "lucide-react";

export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text">AI Engineer</span><br />
            <span className="text-foreground">& Developer</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8" data-testid="text-hero-description">
            Freelance AI Engineer with 5+ years of experience designing and deploying scalable, 
            AI-first systems. Proven expertise in LLM orchestration, serverless microservices, 
            and real-time API delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => scrollToSection("resume")}
              className="hover-lift"
              data-testid="button-view-resume"
            >
              <User className="mr-2 h-4 w-4" />
              View Resume
            </Button>
            <Button 
              variant="outline"
              onClick={() => scrollToSection("blog")}
              className="hover-lift"
              data-testid="button-read-blog"
            >
              <FileText className="mr-2 h-4 w-4" />
              Read Blog
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
