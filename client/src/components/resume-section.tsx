import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Linkedin, Github, User, Briefcase, Trophy, GraduationCap, Code, Bookmark, CheckCircle } from "lucide-react";

export default function ResumeSection() {
  const [activeSkillFilter, setActiveSkillFilter] = useState("all");

  const skills = [
    { name: "LLM", category: "ai" },
    { name: "Text-to-Speech", category: "ai" },
    { name: "OCR", category: "ai" },
    { name: "AI Agents", category: "ai" },
    { name: "Python", category: "backend" },
    { name: "Node.js", category: "backend" },
    { name: "TypeScript", category: "backend" },
    { name: "React", category: "backend" },
    { name: "AWS SageMaker", category: "cloud" },
    { name: "Lambda", category: "cloud" },
    { name: "DynamoDB", category: "cloud" },
    { name: "S3", category: "cloud" },
    { name: "Terraform", category: "cloud" },
    { name: "Docker", category: "cloud" },
  ];

  const filteredSkills = activeSkillFilter === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeSkillFilter);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getSkillColor = (category: string) => {
    switch (category) {
      case "ai": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "backend": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "cloud": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <section id="resume" className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Resume</h2>
          <p className="text-lg text-muted-foreground">Comprehensive overview of my experience and skills</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Contact & Skills */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <Card className="hover-lift animate-slide-up">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Phone className="mr-2 text-accent h-5 w-5" />
                  Contact
                </h3>
                <div className="space-y-3">
                  <a 
                    href="tel:+918368601560" 
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-accent/10 transition-colors"
                    data-testid="link-phone"
                  >
                    <Phone className="text-accent h-4 w-4" />
                    <span className="text-sm">+91 83686 01560</span>
                  </a>
                  <a 
                    href="mailto:ankit.see@gmail.com" 
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-accent/10 transition-colors"
                    data-testid="link-email"
                  >
                    <Mail className="text-accent h-4 w-4" />
                    <span className="text-sm">ankit.see@gmail.com</span>
                  </a>
                  <a 
                    href="https://linkedin.com/in/adykits" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-accent/10 transition-colors"
                    data-testid="link-linkedin"
                  >
                    <Linkedin className="text-accent h-4 w-4" />
                    <span className="text-sm">linkedin.com/in/adykits</span>
                  </a>
                  <a 
                    href="https://github.com/ankitaditya" 
                    target="_blank" 
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-accent/10 transition-colors"
                    data-testid="link-github"
                  >
                    <Github className="text-accent h-4 w-4" />
                    <span className="text-sm">github.com/ankitaditya</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Skills Card */}
            <Card className="hover-lift animate-slide-up">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Code className="mr-2 text-accent h-5 w-5" />
                  Core Skills
                </h3>
                
                {/* Skill Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {["all", "ai", "cloud", "backend"].map((filter) => (
                    <Button
                      key={filter}
                      variant={activeSkillFilter === filter ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setActiveSkillFilter(filter)}
                      className="text-xs"
                      data-testid={`button-filter-${filter}`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>
                  ))}
                </div>
                
                {/* Skills Grid */}
                <div className="flex flex-wrap gap-2" data-testid="container-skills">
                  {filteredSkills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${getSkillColor(skill.category)}`}
                      data-testid={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Navigation */}
            <Card className="hover-lift animate-slide-up">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <Bookmark className="mr-2 text-accent h-5 w-5" />
                  Quick Links
                </h3>
                <div className="space-y-2">
                  {[
                    { id: "summary", label: "Summary" },
                    { id: "experience", label: "Experience" },
                    { id: "achievements", label: "Achievements" },
                    { id: "education", label: "Education" },
                  ].map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className="block p-2 rounded-lg text-sm hover:bg-accent/10 transition-colors w-full text-left"
                      data-testid={`link-${link.id}`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Summary */}
            <Card id="summary" className="hover-lift animate-slide-up">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4 flex items-center">
                  <User className="mr-3 text-accent h-6 w-6" />
                  Summary
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4" data-testid="text-summary">
                  Freelance AI Engineer with 5+ years of experience designing and deploying scalable, AI-first systems in education, electric-mobility, publishing, and surveillance. Proven expertise in serverless microservices, large-language-model orchestration, OCR/TTS pipelines, no-code automation, and real-time API delivery.
                </p>
                <div className="bg-accent/10 border-l-4 border-accent p-4 rounded-r-lg">
                  <p className="font-medium text-sm" data-testid="text-impact-highlight">
                    <strong>Impact Highlight:</strong> Delivered AI solutions adopted by 20+ enterprise and startup clients, cutting cloud costs by up to 40% and driving 40% higher product adoption rates.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card id="experience" className="hover-lift animate-slide-up">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-6 flex items-center">
                  <Briefcase className="mr-3 text-accent h-6 w-6" />
                  Professional Experience
                </h3>
                
                {/* Timeline */}
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
                  
                  {/* Current Role */}
                  <div className="relative pl-10 pb-8">
                    <div className="absolute left-2 top-2 w-4 h-4 bg-accent rounded-full border-2 border-background"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="font-semibold text-lg" data-testid="text-current-role">Freelancer — Artificial Intelligence</h4>
                        <span className="text-sm text-muted-foreground">Jan 2025 – Present</span>
                      </div>
                      <p className="text-sm text-muted-foreground">New Delhi, India</p>
                      <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 h-3 w-3 flex-shrink-0" />
                          Delivered LLM, voice-cloning, OCR, and inference pipelines as RESTful APIs; optimized model serving to reduce latency by 30%.
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 h-3 w-3 flex-shrink-0" />
                          Implemented secure, role-based access with Keycloak; achieved GDPR & SOC-2 compliance.
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 h-3 w-3 flex-shrink-0" />
                          Designed no-code automation builder driving 40% increase in client adoption.
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 h-3 w-3 flex-shrink-0" />
                          Launched production infrastructure on ECS/EKS using Terraform/CDK for 99.9% uptime.
                        </li>
                      </ul>
                      <details className="mt-4">
                        <summary className="cursor-pointer text-sm font-medium text-accent hover:text-accent/80">Show tech stack</summary>
                        <div className="mt-2 p-3 bg-muted rounded-lg">
                          <p className="text-sm font-mono">Python, Node.js, TypeScript, FastAPI, Express, Docker, Terraform, AWS (SageMaker, Lambda, Step Functions, ECS/EKS), Keycloak, OpenSearch, Redis.</p>
                        </div>
                      </details>
                    </div>
                  </div>

                  {/* Previous Role */}
                  <div className="relative pl-10">
                    <div className="absolute left-2 top-2 w-4 h-4 bg-muted rounded-full border-2 border-background"></div>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="font-semibold text-lg" data-testid="text-previous-role">Zenarate — Software Engineer III</h4>
                        <span className="text-sm text-muted-foreground">May 2021 – Jun 2024</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Remote + Palo Alto, CA</p>
                      <ul className="space-y-2 text-sm text-muted-foreground mt-3">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 h-3 w-3 flex-shrink-0" />
                          Built sub-100ms latency NLP simulators via WebSockets; increased real-time engagement by 20%.
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 h-3 w-3 flex-shrink-0" />
                          Architected microservices using AWS Lambda + Step Functions; reduced infrastructure spend by 40%.
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 h-3 w-3 flex-shrink-0" />
                          Optimized React frontends with code-splitting; lowered TTI by 35%.
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="text-accent mt-0.5 h-3 w-3 flex-shrink-0" />
                          Developed Elasticsearch-based feedback search adopted by 10+ enterprise clients.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card id="achievements" className="hover-lift animate-slide-up">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4 flex items-center">
                  <Trophy className="mr-3 text-accent h-6 w-6" />
                  Key Achievements
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20" data-testid="achievement-cost-optimization">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <h4 className="font-medium">Cost Optimization</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Reduced cloud infrastructure costs by up to 40% through serverless architecture optimization</p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20" data-testid="achievement-client-success">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <h4 className="font-medium">Client Success</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Delivered AI solutions to 20+ enterprise and startup clients with high satisfaction rates</p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20" data-testid="achievement-performance">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <h4 className="font-medium">Performance</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Achieved 99.9% uptime and 30% latency reduction in production systems</p>
                  </div>
                  <div className="p-4 bg-accent/5 rounded-lg border border-accent/20" data-testid="achievement-innovation">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <h4 className="font-medium">Innovation</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">Created no-code automation platform driving 40% increase in product adoption</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Education */}
            <Card id="education" className="hover-lift animate-slide-up">
              <CardContent className="p-6">
                <h3 className="font-semibold text-xl mb-4 flex items-center">
                  <GraduationCap className="mr-3 text-accent h-6 w-6" />
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary/30 rounded-lg" data-testid="education-degree">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h4 className="font-medium">Bachelor's in Computer Science & Engineering</h4>
                      <span className="text-sm text-muted-foreground">2017 - 2021</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Specialization in Artificial Intelligence and Machine Learning</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
